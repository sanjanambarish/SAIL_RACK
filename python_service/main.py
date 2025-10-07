#!/usr/bin/env python3
"""FastAPI service for ML and OR models"""
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import uvicorn

from api.ml_models import DelayPredictor, FulfillmentPredictor
from api.optimizer import RakeFormationOptimizer

app = FastAPI(title="SAIL Rake Optimizer - ML/OR Service")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize models
delay_predictor = DelayPredictor()
fulfillment_predictor = FulfillmentPredictor()

# Pydantic models for request/response
class WagonData(BaseModel):
    wagon_type: str
    capacity_tonnes: float
    current_load_tonnes: float
    current_stockyard_id: Optional[int] = None
    id: Optional[str] = None
    material: Optional[str] = None
    destination: Optional[str] = None

class RouteData(BaseModel):
    distance_km: float
    estimated_duration_hours: float
    id: Optional[int] = None

class DelayPredictionRequest(BaseModel):
    wagon: WagonData
    route: RouteData

class FulfillmentPredictionRequest(BaseModel):
    capacity_allocated: float
    required_capacity: float
    distance_km: float

class OptimizationRequest(BaseModel):
    wagons: List[Dict]
    orders: List[Dict]
    cost_matrix: Dict

@app.get("/")
async def root():
    return {
        "service": "SAIL Rake Optimizer - ML/OR Service",
        "status": "running",
        "endpoints": [
            "/predict/delay",
            "/predict/fulfillment",
            "/optimize/formation"
        ]
    }

@app.post("/predict/delay")
async def predict_delay(request: DelayPredictionRequest):
    """Predict delay for a wagon on a route"""
    try:
        wagon_dict = request.wagon.model_dump()
        route_dict = request.route.model_dump()
        
        delay = delay_predictor.predict_delay(wagon_dict, route_dict)
        
        return {
            "predicted_delay_minutes": delay,
            "wagon": wagon_dict,
            "route": route_dict
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/fulfillment")
async def predict_fulfillment(request: FulfillmentPredictionRequest):
    """Predict order fulfillment probability"""
    try:
        assignment_dict = request.model_dump()
        
        probability = fulfillment_predictor.predict_fulfillment_probability(assignment_dict)
        
        return {
            "fulfillment_probability": probability,
            "fulfillment_percentage": round(probability * 100, 1),
            "assignment": assignment_dict
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/optimize/formation")
async def optimize_formation(request: OptimizationRequest):
    """Optimize rake formation using OR-Tools"""
    try:
        optimizer = RakeFormationOptimizer(
            wagons=request.wagons,
            orders=request.orders,
            cost_matrix=request.cost_matrix
        )
        
        result = optimizer.optimize()
        
        if 'error' in result:
            raise HTTPException(status_code=400, detail=result['error'])
        
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy", "models": "loaded"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
