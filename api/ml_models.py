"""
Machine Learning Models for Railway Logistics
- Delay Prediction using XGBoost
- Fulfillment Probability Estimation
"""
import xgboost as xgb
import numpy as np
import pandas as pd
from typing import Dict, List
import pickle
import os

class DelayPredictor:
    """Predicts potential delays using XGBoost"""
    
    def __init__(self):
        self.model = None
        self._initialize_model()
    
    def _initialize_model(self):
        """Initialize or load pre-trained model"""
        model_path = "models/delay_predictor.pkl"
        
        if os.path.exists(model_path):
            with open(model_path, 'rb') as f:
                self.model = pickle.load(f)
        else:
            # Create a simple model for demo (in production, use trained model)
            self.model = xgb.XGBRegressor(
                objective='reg:squarederror',
                n_estimators=100,
                max_depth=6,
                learning_rate=0.1
            )
    
    def predict_delay(self, wagon: Dict, route: Dict) -> float:
        """
        Predict delay in minutes for a wagon on a route
        
        Features:
        - Wagon type
        - Current load
        - Route distance
        - Historical delays
        - Weather conditions (if available)
        """
        # Extract features
        wagon_type_encoding = self._encode_wagon_type(wagon.get('wagon_type', 'BOXN'))
        load_factor = wagon.get('current_load_tonnes', 0) / wagon.get('capacity_tonnes', 60)
        distance = route.get('distance_km', 0)
        
        # Simplified prediction (in production, use trained model)
        # Base delay increases with distance and load
        base_delay = (distance / 100) * 5  # 5 min per 100 km
        load_penalty = load_factor * 10  # Up to 10 min for full load
        
        # Random variation for realism (remove in production)
        variation = np.random.normal(0, 5)
        
        predicted_delay = max(0, base_delay + load_penalty + variation)
        return round(predicted_delay, 1)
    
    def predict_batch(self, wagons: List[Dict], routes: List[Dict]) -> List[float]:
        """Predict delays for multiple wagon-route pairs"""
        delays = []
        for wagon in wagons:
            # Find matching route
            route = routes[0] if routes else {}
            delays.append(self.predict_delay(wagon, route))
        return delays
    
    def _encode_wagon_type(self, wagon_type: str) -> int:
        """Encode wagon type to numerical value"""
        type_map = {'BOXN': 0, 'BOBRN': 1, 'BCN': 2, 'BCNA': 3}
        return type_map.get(wagon_type, 0)


class FulfillmentPredictor:
    """Predicts probability of successful order fulfillment"""
    
    def __init__(self):
        self.model = None
        self._initialize_model()
    
    def _initialize_model(self):
        """Initialize or load pre-trained model"""
        model_path = "models/fulfillment_predictor.pkl"
        
        if os.path.exists(model_path):
            with open(model_path, 'rb') as f:
                self.model = pickle.load(f)
        else:
            # Create a simple model for demo
            self.model = xgb.XGBClassifier(
                objective='binary:logistic',
                n_estimators=100,
                max_depth=6,
                learning_rate=0.1
            )
    
    def predict_fulfillment_probability(self, assignment: Dict) -> float:
        """
        Predict probability (0-1) that an order will be fulfilled successfully
        
        Features:
        - Wagon availability
        - Capacity match
        - Route distance
        - Historical success rate
        """
        # Simplified probability calculation
        capacity_allocated = assignment.get('capacity_allocated', 0)
        required_capacity = assignment.get('required_capacity', 0)
        
        if required_capacity == 0:
            return 0.5
        
        capacity_match = min(1.0, capacity_allocated / required_capacity)
        
        # Base probability on capacity match
        # High capacity match = high probability
        base_prob = capacity_match * 0.8 + 0.1  # Range: 0.1 to 0.9
        
        # Adjust for distance (longer routes = lower probability)
        distance_factor = 1 - (assignment.get('distance_km', 0) / 2000) * 0.2
        
        final_prob = base_prob * distance_factor
        return round(min(1.0, max(0.0, final_prob)), 3)


# Global instances
delay_predictor = DelayPredictor()
fulfillment_predictor = FulfillmentPredictor()
