/*
  # Phase 1: Core Tables - Authentication and Assets

  ## Overview
  Establishes foundational database structure for SAIL DSS including user profiles,
  stockyard locations, and wagon inventory management.

  ## 1. New Tables

  ### profiles
  User profiles with role-based access control
  - id: UUID primary key
  - user_id: References auth.users (unique)
  - full_name: User's display name
  - role: Planner, Manager, or Admin
  - created_at: Timestamp

  ### stockyards
  Steel plant stockyard locations and capacity information
  - id: Serial primary key
  - name: Unique stockyard name
  - location_coords: JSON string with lat/lng
  - max_capacity_tonnes: Maximum capacity
  - current_utilization: Current usage percentage
  - status: Operational status
  - created_at: Timestamp

  ### wagons
  Railway wagon inventory and status tracking
  - id: Text primary key (e.g., "BOXN-12345")
  - wagon_type: Type code (BOXN, BOBRN, BCN, BCNA)
  - capacity_tonnes: Maximum load capacity
  - current_load_tonnes: Current load weight
  - status: Available, Assigned, Maintenance, In-Transit
  - current_stockyard_id: FK to stockyards
  - material: Material type being carried
  - destination: Destination location
  - priority: Low, Medium, High, Critical
  - created_at, updated_at: Timestamps

  ## 2. Security
  - RLS enabled on all tables
  - Users can only access their own profiles
  - All authenticated users can view stockyards and wagons
  - Role-based write permissions

  ## 3. Performance
  - Indexes on frequently queried columns
  - Automatic timestamp updates via triggers
*/

-- =====================================================
-- TABLES
-- =====================================================

-- User profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'Planner',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_role CHECK (role IN ('Planner', 'Manager', 'Admin'))
);

-- Stockyards table
CREATE TABLE IF NOT EXISTS stockyards (
  id serial PRIMARY KEY,
  name text UNIQUE NOT NULL,
  location_coords text NOT NULL,
  max_capacity_tonnes numeric NOT NULL,
  current_utilization numeric DEFAULT 0,
  status text DEFAULT 'Active',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT positive_capacity CHECK (max_capacity_tonnes > 0),
  CONSTRAINT valid_utilization CHECK (current_utilization >= 0 AND current_utilization <= 100),
  CONSTRAINT valid_stockyard_status CHECK (status IN ('Active', 'Inactive', 'Maintenance'))
);

-- Wagons table
CREATE TABLE IF NOT EXISTS wagons (
  id text PRIMARY KEY,
  wagon_type text NOT NULL,
  capacity_tonnes numeric NOT NULL,
  current_load_tonnes numeric DEFAULT 0,
  status text DEFAULT 'Available',
  current_stockyard_id integer REFERENCES stockyards(id) ON DELETE SET NULL,
  material text,
  destination text,
  priority text DEFAULT 'Low',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT positive_capacity CHECK (capacity_tonnes > 0),
  CONSTRAINT valid_load CHECK (current_load_tonnes >= 0 AND current_load_tonnes <= capacity_tonnes),
  CONSTRAINT valid_wagon_status CHECK (status IN ('Available', 'Assigned', 'Maintenance', 'In-Transit')),
  CONSTRAINT valid_priority CHECK (priority IN ('Low', 'Medium', 'High', 'Critical'))
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_wagons_status_stockyard ON wagons(status, current_stockyard_id);
CREATE INDEX IF NOT EXISTS idx_wagons_stockyard ON wagons(current_stockyard_id);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for wagons table
DROP TRIGGER IF EXISTS update_wagons_updated_at ON wagons;
CREATE TRIGGER update_wagons_updated_at
  BEFORE UPDATE ON wagons
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE stockyards ENABLE ROW LEVEL SECURITY;
ALTER TABLE wagons ENABLE ROW LEVEL SECURITY;

-- Profiles RLS Policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Stockyards RLS Policies
CREATE POLICY "Authenticated users can view stockyards"
  ON stockyards FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Managers and Admins can insert stockyards"
  ON stockyards FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role IN ('Manager', 'Admin')
    )
  );

CREATE POLICY "Managers and Admins can update stockyards"
  ON stockyards FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role IN ('Manager', 'Admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role IN ('Manager', 'Admin')
    )
  );

CREATE POLICY "Admins can delete stockyards"
  ON stockyards FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role = 'Admin'
    )
  );

-- Wagons RLS Policies
CREATE POLICY "Authenticated users can view wagons"
  ON wagons FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Planners and above can update wagons"
  ON wagons FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role IN ('Planner', 'Manager', 'Admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role IN ('Planner', 'Manager', 'Admin')
    )
  );

CREATE POLICY "Admins can insert wagons"
  ON wagons FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role = 'Admin'
    )
  );

CREATE POLICY "Admins can delete wagons"
  ON wagons FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role = 'Admin'
    )
  );
