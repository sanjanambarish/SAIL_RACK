/*
  # Phase 6: Sample Data Seeding

  ## Populates database with realistic test data
  - 4 stockyards (major Indian steel plants)
  - 50+ wagons of various types
  - 5 major railway routes
  - Sample formation plans
*/

-- Stockyards
INSERT INTO stockyards (name, location_coords, max_capacity_tonnes, current_utilization, status) VALUES
('Rourkela Steel Plant', '{"lat": 22.2604, "lng": 84.8536}', 500000, 75, 'Active'),
('Bhilai Steel Plant', '{"lat": 21.2140, "lng": 81.3785}', 450000, 82, 'Active'),
('Durgapur Steel Plant', '{"lat": 23.5204, "lng": 87.3119}', 400000, 68, 'Active'),
('Bokaro Steel Plant', '{"lat": 23.6693, "lng": 86.1511}', 480000, 71, 'Active')
ON CONFLICT (name) DO NOTHING;

-- Wagons
INSERT INTO wagons (id, wagon_type, capacity_tonnes, current_load_tonnes, status, current_stockyard_id, material, destination, priority) VALUES
-- Rourkela wagons
('BOXN-45231', 'BOXN', 58, 55, 'Available', 1, 'Coal', 'Mumbai Port', 'High'),
('BOXN-45232', 'BOXN', 58, 52, 'Available', 1, 'Coal', 'Mumbai Port', 'High'),
('BOBRN-78901', 'BOBRN', 61, 0, 'Available', 1, NULL, NULL, 'Low'),
('BOXN-45233', 'BOXN', 58, 48, 'Available', 1, 'Iron Ore', 'Chennai Port', 'Medium'),
('BOXN-45234', 'BOXN', 58, 0, 'Maintenance', 1, NULL, NULL, 'Low'),
('BOBRN-78902', 'BOBRN', 61, 59, 'Available', 1, 'Iron Ore', 'Mumbai Port', 'High'),
('BCN-10001', 'BCN', 55, 0, 'Available', 1, NULL, NULL, 'Low'),
('BCN-10002', 'BCN', 55, 45, 'Available', 1, 'Steel Products', 'Kolkata', 'Medium'),
('BCNA-20001', 'BCNA', 60, 57, 'Available', 1, 'Steel Coils', 'Delhi', 'High'),
('BCNA-20002', 'BCNA', 60, 0, 'Available', 1, NULL, NULL, 'Low'),

-- Bhilai wagons
('BCN-12345', 'BCN', 55, 48, 'Available', 2, 'Steel Products', 'Chennai Port', 'Medium'),
('BCNA-67890', 'BCNA', 60, 57, 'Available', 2, 'Steel Coils', 'Chennai Port', 'Low'),
('BOXN-12001', 'BOXN', 58, 54, 'Available', 2, 'Coal', 'Visakhapatnam', 'Medium'),
('BOXN-12002', 'BOXN', 58, 0, 'Available', 2, NULL, NULL, 'Low'),
('BOBRN-12003', 'BOBRN', 61, 58, 'Available', 2, 'Iron Ore', 'Mumbai Port', 'High'),
('BCN-12004', 'BCN', 55, 0, 'Maintenance', 2, NULL, NULL, 'Low'),
('BCN-12005', 'BCN', 55, 52, 'Available', 2, 'Steel Products', 'Delhi', 'High'),
('BCNA-12006', 'BCNA', 60, 0, 'Available', 2, NULL, NULL, 'Low'),
('BOXN-12007', 'BOXN', 58, 56, 'Available', 2, 'Coal', 'Chennai Port', 'Medium'),
('BOBRN-12008', 'BOBRN', 61, 60, 'Available', 2, 'Iron Ore', 'Kolkata', 'High'),

-- Durgapur wagons
('BOXN-99001', 'BOXN', 58, 0, 'Available', 3, NULL, NULL, 'Low'),
('BOBRN-99002', 'BOBRN', 61, 0, 'Available', 3, NULL, NULL, 'Low'),
('BCN-99003', 'BCN', 55, 0, 'Available', 3, NULL, NULL, 'Low'),
('BCNA-99004', 'BCNA', 60, 0, 'Available', 3, NULL, NULL, 'Low'),
('BOXN-99005', 'BOXN', 58, 53, 'Available', 3, 'Coal', 'Kolkata Port', 'High'),
('BOXN-99006', 'BOXN', 58, 51, 'Available', 3, 'Coal', 'Kolkata Port', 'High'),
('BOBRN-99007', 'BOBRN', 61, 58, 'Available', 3, 'Iron Ore', 'Mumbai Port', 'Medium'),
('BCN-99008', 'BCN', 55, 49, 'Available', 3, 'Steel Products', 'Delhi', 'Medium'),
('BCN-99009', 'BCN', 55, 0, 'Maintenance', 3, NULL, NULL, 'Low'),
('BCNA-99010', 'BCNA', 60, 55, 'Available', 3, 'Steel Coils', 'Chennai Port', 'Medium'),

-- Bokaro wagons
('BOXN-88001', 'BOXN', 58, 56, 'Available', 4, 'Coal', 'Delhi', 'High'),
('BOXN-88002', 'BOXN', 58, 54, 'Available', 4, 'Coal', 'Delhi', 'High'),
('BOBRN-88003', 'BOBRN', 61, 60, 'Available', 4, 'Iron Ore', 'Mumbai Port', 'High'),
('BCN-88004', 'BCN', 55, 50, 'Available', 4, 'Steel Products', 'Kolkata', 'Medium'),
('BCN-88005', 'BCN', 55, 0, 'Available', 4, NULL, NULL, 'Low'),
('BCNA-88006', 'BCNA', 60, 58, 'Available', 4, 'Steel Coils', 'Hyderabad', 'Medium'),
('BOXN-88007', 'BOXN', 58, 0, 'Maintenance', 4, NULL, NULL, 'Low'),
('BOBRN-88008', 'BOBRN', 61, 0, 'Available', 4, NULL, NULL, 'Low'),
('BCN-88009', 'BCN', 55, 52, 'Available', 4, 'Steel Products', 'Chennai Port', 'High'),
('BCNA-88010', 'BCNA', 60, 0, 'Available', 4, NULL, NULL, 'Low'),

-- Additional mixed wagons
('BOXN-77001', 'BOXN', 58, 0, 'In-Transit', NULL, NULL, 'Mumbai Port', 'Medium'),
('BOBRN-77002', 'BOBRN', 61, 59, 'In-Transit', NULL, 'Iron Ore', 'Chennai Port', 'High'),
('BCN-77003', 'BCN', 55, 0, 'Available', 1, NULL, NULL, 'Low'),
('BCNA-77004', 'BCNA', 60, 56, 'Available', 2, 'Steel Coils', 'Delhi', 'Medium'),
('BOXN-77005', 'BOXN', 58, 57, 'Available', 3, 'Coal', 'Visakhapatnam', 'High'),
('BOBRN-77006', 'BOBRN', 61, 0, 'Available', 4, NULL, NULL, 'Low'),
('BCN-77007', 'BCN', 55, 51, 'Available', 1, 'Steel Products', 'Mumbai Port', 'High'),
('BCNA-77008', 'BCNA', 60, 0, 'Maintenance', 2, NULL, NULL, 'Low'),
('BOXN-77009', 'BOXN', 58, 55, 'Available', 3, 'Coal', 'Kolkata Port', 'Critical'),
('BOBRN-77010', 'BOBRN', 61, 60, 'Available', 4, 'Iron Ore', 'Mumbai Port', 'Critical')
ON CONFLICT (id) DO NOTHING;

-- Routes
INSERT INTO routes (route_name, origin, destination, distance_km, estimated_duration_hours, waypoints, status) VALUES
('Rourkela-Mumbai Express', 'Rourkela Steel Plant', 'Mumbai Port', 1850, 28,
 '[{"name": "Rourkela", "lat": 22.2604, "lng": 84.8536}, {"name": "Nagpur Junction", "lat": 21.1458, "lng": 79.0882}, {"name": "Mumbai Port", "lat": 18.9388, "lng": 72.8354}]'::jsonb,
 'Active'),
('Bhilai-Chennai Freight', 'Bhilai Steel Plant', 'Chennai Port', 1320, 22,
 '[{"name": "Bhilai", "lat": 21.2140, "lng": 81.3785}, {"name": "Visakhapatnam Junction", "lat": 17.6869, "lng": 83.2185}, {"name": "Chennai Port", "lat": 13.0827, "lng": 80.2707}]'::jsonb,
 'Active'),
('Durgapur-Kolkata Route', 'Durgapur Steel Plant', 'Kolkata Port', 210, 6,
 '[{"name": "Durgapur", "lat": 23.5204, "lng": 87.3119}, {"name": "Asansol Junction", "lat": 23.6839, "lng": 86.9929}, {"name": "Kolkata Port", "lat": 22.5726, "lng": 88.3639}]'::jsonb,
 'Active'),
('Bokaro-Delhi Express', 'Bokaro Steel Plant', 'Delhi', 1150, 18,
 '[{"name": "Bokaro", "lat": 23.6693, "lng": 86.1511}, {"name": "Gaya Junction", "lat": 24.7955, "lng": 85.0002}, {"name": "Delhi", "lat": 28.6139, "lng": 77.2090}]'::jsonb,
 'Active'),
('Rourkela-Visakhapatnam Route', 'Rourkela Steel Plant', 'Visakhapatnam Port', 685, 12,
 '[{"name": "Rourkela", "lat": 22.2604, "lng": 84.8536}, {"name": "Visakhapatnam Port", "lat": 17.6869, "lng": 83.2185}]'::jsonb,
 'Active')
ON CONFLICT (route_name) DO NOTHING;
