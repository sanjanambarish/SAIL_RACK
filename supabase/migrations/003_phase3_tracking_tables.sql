/*
  # Phase 3: Real-time Tracking Tables

  ## New Tables
  - rake_movements: GPS tracking and position history
  - routes: Pre-defined railway routes with waypoints
*/

CREATE TABLE IF NOT EXISTS rake_movements (
  id serial PRIMARY KEY,
  plan_id integer NOT NULL REFERENCES formation_plans(id) ON DELETE CASCADE,
  location_coords text NOT NULL,
  current_location_name text,
  current_speed_kmh numeric DEFAULT 0,
  status text DEFAULT 'Scheduled',
  delay_minutes integer DEFAULT 0,
  timestamp timestamptz DEFAULT now(),
  CONSTRAINT valid_movement_status CHECK (status IN ('Scheduled', 'Moving', 'Waiting', 'Delayed', 'Completed')),
  CONSTRAINT valid_speed CHECK (current_speed_kmh >= 0),
  CONSTRAINT valid_delay CHECK (delay_minutes >= 0)
);

CREATE TABLE IF NOT EXISTS routes (
  id serial PRIMARY KEY,
  route_name text UNIQUE NOT NULL,
  origin text NOT NULL,
  destination text NOT NULL,
  distance_km numeric NOT NULL,
  estimated_duration_hours numeric NOT NULL,
  waypoints jsonb,
  status text DEFAULT 'Active',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT positive_distance CHECK (distance_km > 0),
  CONSTRAINT positive_duration CHECK (estimated_duration_hours > 0),
  CONSTRAINT valid_route_status CHECK (status IN ('Active', 'Inactive', 'Under-Maintenance'))
);

CREATE INDEX IF NOT EXISTS idx_rake_movements_plan_time ON rake_movements(plan_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_rake_movements_status ON rake_movements(status);
CREATE INDEX IF NOT EXISTS idx_routes_status ON routes(status);

ALTER TABLE rake_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view movements"
  ON rake_movements FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "System can insert movements"
  ON rake_movements FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view routes"
  ON routes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Managers can manage routes"
  ON routes FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role IN ('Manager', 'Admin')
    )
  );
