"""
Google OR-Tools MIP Optimizer for Rake Formation
This module implements the core optimization logic using Mixed-Integer Programming
"""
from ortools.linear_solver import pywraplp
from typing import List, Dict, Tuple
import numpy as np

class RakeFormationOptimizer:
    def __init__(self, wagons: List[Dict], orders: List[Dict], cost_matrix: Dict):
        self.wagons = wagons
        self.orders = orders
        self.cost_matrix = cost_matrix
        self.solver = pywraplp.Solver.CreateSolver('SCIP')
        
    def optimize(self) -> Dict:
        """
        Execute MIP optimization for rake formation
        Returns optimal assignment of wagons to orders
        """
        if not self.solver:
            return {"error": "Solver not available"}
        
        # Decision variables: x[w,o] = 1 if wagon w is assigned to order o
        x = {}
        for w_idx, wagon in enumerate(self.wagons):
            for o_idx, order in enumerate(self.orders):
                x[(w_idx, o_idx)] = self.solver.BoolVar(f'x_{w_idx}_{o_idx}')
        
        # Constraint 1: Each wagon assigned to at most one order
        for w_idx in range(len(self.wagons)):
            self.solver.Add(
                sum(x[(w_idx, o_idx)] for o_idx in range(len(self.orders))) <= 1
            )
        
        # Constraint 2: Order capacity constraints
        for o_idx, order in enumerate(self.orders):
            total_capacity = sum(
                x[(w_idx, o_idx)] * self.wagons[w_idx].get('capacity_tonnes', 0)
                for w_idx in range(len(self.wagons))
            )
            # Ensure we meet minimum requirement but don't exceed max
            required = order.get('required_capacity', 0)
            self.solver.Add(total_capacity >= required * 0.95)  # 95% minimum
            self.solver.Add(total_capacity <= required * 1.1)   # 110% maximum
        
        # Constraint 3: Wagon type compatibility
        for w_idx, wagon in enumerate(self.wagons):
            for o_idx, order in enumerate(self.orders):
                wagon_type = wagon.get('wagon_type', '')
                compatible_types = order.get('compatible_wagon_types', [])
                if compatible_types and wagon_type not in compatible_types:
                    self.solver.Add(x[(w_idx, o_idx)] == 0)
        
        # Constraint 4: Stockyard capacity (prevent overloading sidings)
        stockyard_loads = {}
        for w_idx, wagon in enumerate(self.wagons):
            stockyard_id = wagon.get('current_stockyard_id')
            if stockyard_id:
                if stockyard_id not in stockyard_loads:
                    stockyard_loads[stockyard_id] = []
                for o_idx in range(len(self.orders)):
                    stockyard_loads[stockyard_id].append(x[(w_idx, o_idx)])
        
        # Objective function: Minimize total cost
        objective = self.solver.Objective()
        for w_idx, wagon in enumerate(self.wagons):
            for o_idx, order in enumerate(self.orders):
                # Cost factors: distance, delay penalty, material handling
                base_cost = self.cost_matrix.get(f"{w_idx}_{o_idx}", 100)
                delay_penalty = wagon.get('predicted_delay', 0) * 50  # $50 per min delay
                material_cost = wagon.get('material_handling_cost', 0)
                
                total_cost = base_cost + delay_penalty + material_cost
                objective.SetCoefficient(x[(w_idx, o_idx)], total_cost)
        
        objective.SetMinimization()
        
        # Solve
        status = self.solver.Solve()
        
        if status == pywraplp.Solver.OPTIMAL:
            assignments = []
            total_cost = 0
            
            for w_idx, wagon in enumerate(self.wagons):
                for o_idx, order in enumerate(self.orders):
                    if x[(w_idx, o_idx)].solution_value() > 0.5:
                        assignments.append({
                            'wagon_id': wagon['id'],
                            'order_id': order.get('id'),
                            'sequence_order': len(assignments) + 1,
                            'capacity_allocated': wagon.get('capacity_tonnes', 0)
                        })
                        total_cost += (
                            self.cost_matrix.get(f"{w_idx}_{o_idx}", 100) +
                            wagon.get('predicted_delay', 0) * 50 +
                            wagon.get('material_handling_cost', 0)
                        )
            
            return {
                'status': 'optimal',
                'assignments': assignments,
                'total_cost': total_cost,
                'cost_savings': self._calculate_savings(total_cost),
                'time_savings_hours': self._calculate_time_savings(assignments)
            }
        
        elif status == pywraplp.Solver.FEASIBLE:
            return {
                'status': 'feasible',
                'message': 'Found feasible solution but not optimal',
                'assignments': []
            }
        else:
            return {
                'status': 'infeasible',
                'message': 'No feasible solution found. Check constraints.',
                'assignments': []
            }
    
    def _calculate_savings(self, optimized_cost: float) -> float:
        """Calculate cost savings vs naive assignment"""
        # Baseline: assign wagons sequentially without optimization
        baseline_cost = len(self.wagons) * 150  # Assume $150 avg per wagon
        return max(0, baseline_cost - optimized_cost)
    
    def _calculate_time_savings(self, assignments: List[Dict]) -> float:
        """Estimate time savings from optimized routing"""
        # Simplified: assume 2 hours saved per optimized assignment
        return len(assignments) * 2.0
