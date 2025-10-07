from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import os
from dotenv import load_dotenv

from .database import get_db, engine
from . import models, schemas, auth
from .tasks import optimize_formation_task

load_dotenv()

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="SAIL Rake Optimizer API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Auth endpoints
@app.post("/api/v1/auth/signup", response_model=schemas.UserResponse)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        hashed_password=hashed_password,
        full_name=user.full_name
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Create profile
    profile = models.Profile(
        user_id=str(db_user.id),
        full_name=user.full_name,
        role="Planner"
    )
    db.add(profile)
    db.commit()
    
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"user": db_user, "access_token": access_token, "token_type": "bearer"}

@app.post("/api/v1/auth/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not auth.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"user": db_user, "access_token": access_token, "token_type": "bearer"}

# Dashboard endpoints
@app.get("/api/v1/dashboard/metrics")
def get_dashboard_metrics(db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    total_wagons = db.query(models.Wagon).count()
    available_wagons = db.query(models.Wagon).filter(models.Wagon.status == "Available").count()
    total_plans = db.query(models.FormationPlan).count()
    active_plans = db.query(models.FormationPlan).filter(
        models.FormationPlan.status.in_(["Approved", "In-Progress"])
    ).count()
    
    return {
        "totalRakes": active_plans,
        "utilizationRate": round((total_wagons - available_wagons) / total_wagons * 100, 1) if total_wagons > 0 else 0,
        "costSavings": 2500000,
        "pendingOrders": db.query(models.FormationPlan).filter(models.FormationPlan.status == "Draft").count(),
        "totalWagons": total_wagons,
        "availableWagons": available_wagons,
        "totalPlans": total_plans,
    }

# Planning endpoints
@app.get("/api/v1/plans", response_model=List[schemas.FormationPlanResponse])
def get_plans(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    plans = db.query(models.FormationPlan).offset(skip).limit(limit).all()
    return plans

@app.post("/api/v1/plans", response_model=schemas.FormationPlanResponse)
def create_plan(
    plan: schemas.FormationPlanCreate, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    db_plan = models.FormationPlan(
        **plan.dict(),
        created_by=str(current_user.id)
    )
    db.add(db_plan)
    db.commit()
    db.refresh(db_plan)
    return db_plan

@app.post("/api/v1/plans/{plan_id}/optimize")
def optimize_plan(
    plan_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """
    Trigger background optimization job for a formation plan.
    Returns immediately with job ID for polling.
    """
    plan = db.query(models.FormationPlan).filter(models.FormationPlan.id == plan_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
    
    # Trigger Celery task (non-blocking)
    task = optimize_formation_task.delay(plan_id)
    
    return {
        "job_id": task.id,
        "status": "processing",
        "message": "Optimization task started. Use job_id to check status."
    }

@app.get("/api/v1/plans/{plan_id}/optimize/status/{job_id}")
def get_optimization_status(job_id: str):
    """Check status of optimization job"""
    from .celery_app import celery_app
    task_result = celery_app.AsyncResult(job_id)
    
    if task_result.ready():
        if task_result.successful():
            return {
                "status": "completed",
                "result": task_result.result
            }
        else:
            return {
                "status": "failed",
                "error": str(task_result.info)
            }
    else:
        return {
            "status": "processing",
            "progress": task_result.info.get('progress', 0) if isinstance(task_result.info, dict) else 0
        }

# Tracking & Analytics endpoints
@app.get("/api/v1/rakes/live")
def get_live_rakes(db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    movements = db.query(models.RakeMovement).order_by(models.RakeMovement.timestamp.desc()).limit(100).all()
    return movements

@app.get("/api/v1/analytics/kpis")
def get_analytics_kpis(db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    kpis = db.query(models.KPISnapshot).order_by(models.KPISnapshot.date.desc()).limit(30).all()
    return kpis

# Stockyards
@app.get("/api/v1/stockyards", response_model=List[schemas.StockyardResponse])
def get_stockyards(db: Session = Depends(get_db)):
    return db.query(models.Stockyard).all()

# Wagons
@app.get("/api/v1/wagons", response_model=List[schemas.WagonResponse])
def get_wagons(db: Session = Depends(get_db)):
    return db.query(models.Wagon).all()

# Routes
@app.get("/api/v1/routes", response_model=List[schemas.RouteResponse])
def get_routes(db: Session = Depends(get_db)):
    return db.query(models.Route).all()

@app.get("/")
def root():
    return {"message": "SAIL Rake Optimizer API", "version": "1.0.0"}
