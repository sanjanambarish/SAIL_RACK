from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey, Text, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

from .database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, nullable=False, index=True)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class Profile(Base):
    __tablename__ = "profiles"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(String, unique=True, nullable=False, index=True)
    full_name = Column(String, nullable=False)
    role = Column(String, default="Planner")
    created_at = Column(DateTime, default=datetime.utcnow)

class Stockyard(Base):
    __tablename__ = "stockyards"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    location_coords = Column(Text)
    max_capacity_tonnes = Column(Float)
    current_utilization = Column(Float, default=0)
    status = Column(String, default="Active")
    created_at = Column(DateTime, default=datetime.utcnow)

class Wagon(Base):
    __tablename__ = "wagons"
    
    id = Column(String, primary_key=True)
    wagon_type = Column(String, nullable=False)
    capacity_tonnes = Column(Float, nullable=False)
    current_load_tonnes = Column(Float, default=0)
    status = Column(String, default="Available")
    current_stockyard_id = Column(Integer, ForeignKey("stockyards.id"))
    material = Column(String)
    destination = Column(String)
    priority = Column(String, default="Low")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class FormationPlan(Base):
    __tablename__ = "formation_plans"
    
    id = Column(Integer, primary_key=True, index=True)
    plan_name = Column(String, nullable=False)
    route = Column(String, nullable=False)
    created_by = Column(String, nullable=False)
    status = Column(String, default="Draft")
    origin_stockyard_id = Column(Integer, ForeignKey("stockyards.id"))
    destination = Column(String, nullable=False)
    priority = Column(String, default="Medium")
    projected_savings = Column(Float, default=0)
    time_savings_hours = Column(Float, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    submitted_at = Column(DateTime)
    approved_at = Column(DateTime)

class PlanWagonAssignment(Base):
    __tablename__ = "plan_wagon_assignments"
    
    id = Column(Integer, primary_key=True, index=True)
    plan_id = Column(Integer, ForeignKey("formation_plans.id"))
    wagon_id = Column(String, ForeignKey("wagons.id"))
    sequence_order = Column(Integer, nullable=False)
    assigned_at = Column(DateTime, default=datetime.utcnow)

class Route(Base):
    __tablename__ = "routes"
    
    id = Column(Integer, primary_key=True, index=True)
    route_name = Column(String, unique=True, nullable=False)
    origin = Column(String, nullable=False)
    destination = Column(String, nullable=False)
    distance_km = Column(Float, nullable=False)
    estimated_duration_hours = Column(Float, nullable=False)
    waypoints = Column(JSON)
    status = Column(String, default="Active")
    created_at = Column(DateTime, default=datetime.utcnow)

class RakeMovement(Base):
    __tablename__ = "rake_movements"
    
    id = Column(Integer, primary_key=True, index=True)
    plan_id = Column(Integer, ForeignKey("formation_plans.id"))
    location_coords = Column(Text)
    current_location_name = Column(String)
    current_speed_kmh = Column(Float, default=0)
    status = Column(String, default="Scheduled")
    delay_minutes = Column(Integer, default=0)
    timestamp = Column(DateTime, default=datetime.utcnow)

class KPISnapshot(Base):
    __tablename__ = "kpi_snapshots"
    
    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, nullable=False)
    metric_name = Column(String, nullable=False)
    metric_value = Column(Float, nullable=False)
    metric_unit = Column(String)
    category = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class AIRecommendation(Base):
    __tablename__ = "ai_recommendations"
    
    id = Column(Integer, primary_key=True, index=True)
    plan_id = Column(Integer, ForeignKey("formation_plans.id"))
    recommendation_type = Column(String, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    priority = Column(String, default="Medium")
    impact_score = Column(Integer)
    cost_savings = Column(Float, default=0)
    time_savings_hours = Column(Float, default=0)
    justification = Column(JSON)
    status = Column(String, default="Pending")
    created_at = Column(DateTime, default=datetime.utcnow)

class Conflict(Base):
    __tablename__ = "conflicts"
    
    id = Column(Integer, primary_key=True, index=True)
    plan_id = Column(Integer, ForeignKey("formation_plans.id"))
    conflict_type = Column(String, nullable=False)
    severity = Column(String, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    affected_resources = Column(JSON)
    suggested_resolution = Column(Text)
    cost_impact = Column(Float, default=0)
    time_impact_hours = Column(Float, default=0)
    status = Column(String, default="Active")
    detected_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime)
