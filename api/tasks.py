"""
Celery tasks for background processing
"""
from celery import Task
from sqlalchemy.orm import Session
from .celery_app import celery_app
from .database import SessionLocal
from .optimizer import RakeFormationOptimizer
from .ml_models import delay_predictor, fulfillment_predictor
from . import models
import time

class DatabaseTask(Task):
    """Base task with database session"""
    _db = None
    
    @property
    def db(self):
        if self._db is None:
            self._db = SessionLocal()
        return self._db
    
    def after_return(self, *args, **kwargs):
        if self._db is not None:
            self._db.close()
            self._db = None

@celery_app.task(base=DatabaseTask, bind=True)
def optimize_formation_task(self, plan_id: int):
    """
    Background task to optimize rake formation using OR-Tools
    This runs asynchronously and doesn't block the API
    """
    try:
        # Update progress
        self.update_state(state='PROGRESS', meta={'progress': 10})
        
        # Fetch plan from database
        plan = self.db.query(models.FormationPlan).filter(
            models.FormationPlan.id == plan_id
        ).first()
        
        if not plan:
            return {'status': 'error', 'message': 'Plan not found'}
        
        self.update_state(state='PROGRESS', meta={'progress': 20})
        
        # Fetch available wagons at origin stockyard
        wagons = self.db.query(models.Wagon).filter(
            models.Wagon.current_stockyard_id == plan.origin_stockyard_id,
            models.Wagon.status == 'Available'
        ).all()
        
        # Convert to dict format
        wagon_list = [
            {
                'id': w.id,
                'wagon_type': w.wagon_type,
                'capacity_tonnes': float(w.capacity_tonnes),
                'current_load_tonnes': float(w.current_load_tonnes),
                'current_stockyard_id': w.current_stockyard_id,
                'material': w.material,
                'destination': w.destination,
            }
            for w in wagons
        ]
        
        self.update_state(state='PROGRESS', meta={'progress': 40})
        
        # Get routes
        routes = self.db.query(models.Route).filter(
            models.Route.origin.contains(plan.destination) |
            models.Route.destination.contains(plan.destination)
        ).all()
        
        route_list = [
            {
                'id': r.id,
                'distance_km': float(r.distance_km),
                'estimated_duration_hours': float(r.estimated_duration_hours)
            }
            for r in routes
        ]
        
        # ML: Predict delays for wagons
        self.update_state(state='PROGRESS', meta={'progress': 50})
        delays = delay_predictor.predict_batch(wagon_list, route_list)
        for idx, wagon in enumerate(wagon_list):
            wagon['predicted_delay'] = delays[idx] if idx < len(delays) else 0
        
        # Create simplified orders from plan requirements
        orders = [
            {
                'id': 1,
                'required_capacity': 300,  # Example: 300 tonnes needed
                'compatible_wagon_types': ['BOXN', 'BOBRN'],
                'destination': plan.destination
            }
        ]
        
        # Build cost matrix (simplified)
        cost_matrix = {}
        for w_idx in range(len(wagon_list)):
            for o_idx in range(len(orders)):
                # Base cost on distance + material handling
                base_cost = 100 + (w_idx * 10)  # Simplified
                cost_matrix[f"{w_idx}_{o_idx}"] = base_cost
        
        self.update_state(state='PROGRESS', meta={'progress': 60})
        
        # Run OR-Tools optimization
        optimizer = RakeFormationOptimizer(
            wagons=wagon_list,
            orders=orders,
            cost_matrix=cost_matrix
        )
        
        result = optimizer.optimize()
        
        self.update_state(state='PROGRESS', meta={'progress': 80})
        
        # Save optimized assignments to database
        if result['status'] == 'optimal':
            # Delete existing assignments
            self.db.query(models.PlanWagonAssignment).filter(
                models.PlanWagonAssignment.plan_id == plan_id
            ).delete()
            
            # Create new assignments
            for assignment in result['assignments']:
                db_assignment = models.PlanWagonAssignment(
                    plan_id=plan_id,
                    wagon_id=assignment['wagon_id'],
                    sequence_order=assignment['sequence_order']
                )
                self.db.add(db_assignment)
                
                # Update wagon status
                wagon = self.db.query(models.Wagon).filter(
                    models.Wagon.id == assignment['wagon_id']
                ).first()
                if wagon:
                    wagon.status = 'Assigned'
            
            # Update plan with optimization results
            plan.status = 'Approved'
            plan.projected_savings = result['cost_savings']
            plan.time_savings_hours = result['time_savings_hours']
            
            self.db.commit()
            
            self.update_state(state='PROGRESS', meta={'progress': 100})
            
            return {
                'status': 'completed',
                'plan_id': plan_id,
                'assignments': result['assignments'],
                'cost_savings': result['cost_savings'],
                'time_savings_hours': result['time_savings_hours'],
                'total_wagons_assigned': len(result['assignments'])
            }
        else:
            return {
                'status': 'failed',
                'message': result.get('message', 'Optimization failed')
            }
            
    except Exception as e:
        return {
            'status': 'error',
            'message': str(e)
        }
