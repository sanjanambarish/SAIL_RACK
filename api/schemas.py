from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    user: dict
    access_token: str
    token_type: str

class FormationPlanCreate(BaseModel):
    plan_name: str
    route: str
    origin_stockyard_id: int
    destination: str
    priority: Optional[str] = "Medium"

class FormationPlanResponse(BaseModel):
    id: int
    plan_name: str
    route: str
    status: str
    destination: str
    priority: str
    projected_savings: float
    time_savings_hours: float
    created_at: datetime
    
    class Config:
        from_attributes = True

class StockyardResponse(BaseModel):
    id: int
    name: str
    location_coords: str
    max_capacity_tonnes: float
    current_utilization: float
    status: str
    
    class Config:
        from_attributes = True

class WagonResponse(BaseModel):
    id: str
    wagon_type: str
    capacity_tonnes: float
    current_load_tonnes: float
    status: str
    current_stockyard_id: Optional[int]
    material: Optional[str]
    destination: Optional[str]
    priority: str
    
    class Config:
        from_attributes = True

class RouteResponse(BaseModel):
    id: int
    route_name: str
    origin: str
    destination: str
    distance_km: float
    estimated_duration_hours: float
    waypoints: Optional[dict]
    status: str
    
    class Config:
        from_attributes = True
