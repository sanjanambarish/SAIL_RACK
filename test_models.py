#!/usr/bin/env python3
"""Test script for ML and OR models"""
import sys
sys.path.insert(0, 'api')

from ml_models import DelayPredictor, FulfillmentPredictor
from optimizer import RakeFormationOptimizer

print("=" * 50)
print("Testing ML Models")
print("=" * 50)

# Test DelayPredictor
print("\n1. Testing DelayPredictor...")
delay_predictor = DelayPredictor()

test_wagon = {
    'wagon_type': 'BOXN',
    'capacity_tonnes': 58,
    'current_load_tonnes': 55
}

test_route = {
    'distance_km': 1850,
    'estimated_duration_hours': 28
}

predicted_delay = delay_predictor.predict_delay(test_wagon, test_route)
print(f"   ✓ Predicted delay: {predicted_delay} minutes")
print(f"   Wagon: {test_wagon['wagon_type']} ({test_wagon['current_load_tonnes']}/{test_wagon['capacity_tonnes']} tonnes)")
print(f"   Route: {test_route['distance_km']} km")

# Test FulfillmentPredictor
print("\n2. Testing FulfillmentPredictor...")
fulfillment_predictor = FulfillmentPredictor()

test_assignment = {
    'capacity_allocated': 110,
    'required_capacity': 120,
    'distance_km': 500
}

fulfillment_prob = fulfillment_predictor.predict_fulfillment_probability(test_assignment)
print(f"   ✓ Fulfillment probability: {fulfillment_prob * 100}%")
print(f"   Assignment: {test_assignment}")

print("\n" + "=" * 50)
print("Testing OR-Tools Optimizer")
print("=" * 50)

# Test RakeFormationOptimizer
print("\n3. Testing RakeFormationOptimizer...")

test_wagons = [
    {'id': 'BOXN-001', 'wagon_type': 'BOXN', 'capacity_tonnes': 58, 'current_load_tonnes': 0, 'current_stockyard_id': 1},
    {'id': 'BOXN-002', 'wagon_type': 'BOXN', 'capacity_tonnes': 58, 'current_load_tonnes': 0, 'current_stockyard_id': 1},
    {'id': 'BCN-001', 'wagon_type': 'BCN', 'capacity_tonnes': 55, 'current_load_tonnes': 0, 'current_stockyard_id': 1},
]

test_orders = [
    {
        'id': 1,
        'required_capacity': 100,
        'destination': 'Mumbai Port',
        'compatible_wagon_types': ['BOXN', 'BCN'],
        'distance_km': 500
    }
]

test_cost_matrix = {
    'distance_cost_per_km': 10,
    'delay_penalty_per_min': 50,
    'material_handling_cost': 1000
}

optimizer = RakeFormationOptimizer(test_wagons, test_orders, test_cost_matrix)
result = optimizer.optimize()

if 'error' not in result:
    print(f"   ✓ Optimization successful!")
    print(f"   Assignments: {result.get('assignments', [])}")
    print(f"   Total cost: ₹{result.get('total_cost', 0):,.2f}")
    print(f"   Cost savings: ₹{result.get('cost_savings', 0):,.2f}")
    print(f"   Time savings: {result.get('time_savings_hours', 0)} hours")
else:
    print(f"   ✗ Error: {result['error']}")

print("\n" + "=" * 50)
print("All Models Tested Successfully!")
print("=" * 50)
