/*
  # Phase 2: Formation Plan Management Tables

  ## New Tables
  - formation_plans: Master table for rake formation plans
  - plan_wagon_assignments: Junction table linking wagons to plans

  ## Security
  - Users can view/edit their own plans
  - Managers can view all plans
  - Managers can approve/reject plans
*/

CREATE TABLE IF NOT EXISTS formation_plans (
  id serial PRIMARY KEY,
  plan_name text NOT NULL,
  route text NOT NULL,
  created_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status text DEFAULT 'Draft',
  origin_stockyard_id integer NOT NULL REFERENCES stockyards(id),
  destination text NOT NULL,
  priority text DEFAULT 'Medium',
  projected_savings numeric DEFAULT 0,
  time_savings_hours numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  submitted_at timestamptz,
  approved_at timestamptz,
  CONSTRAINT valid_plan_status CHECK (status IN ('Draft', 'Submitted', 'Approved', 'In-Progress', 'Completed', 'Rejected')),
  CONSTRAINT valid_plan_priority CHECK (priority IN ('Low', 'Medium', 'High', 'Critical'))
);

CREATE TABLE IF NOT EXISTS plan_wagon_assignments (
  id serial PRIMARY KEY,
  plan_id integer NOT NULL REFERENCES formation_plans(id) ON DELETE CASCADE,
  wagon_id text NOT NULL REFERENCES wagons(id) ON DELETE CASCADE,
  sequence_order integer NOT NULL,
  assigned_at timestamptz DEFAULT now(),
  CONSTRAINT unique_plan_wagon UNIQUE (plan_id, wagon_id),
  CONSTRAINT unique_plan_sequence UNIQUE (plan_id, sequence_order),
  CONSTRAINT positive_sequence CHECK (sequence_order > 0)
);

CREATE INDEX IF NOT EXISTS idx_formation_plans_created_by ON formation_plans(created_by, status);
CREATE INDEX IF NOT EXISTS idx_formation_plans_status ON formation_plans(status);
CREATE INDEX IF NOT EXISTS idx_plan_assignments_plan_id ON plan_wagon_assignments(plan_id);
CREATE INDEX IF NOT EXISTS idx_plan_assignments_wagon_id ON plan_wagon_assignments(wagon_id);

DROP TRIGGER IF EXISTS update_formation_plans_updated_at ON formation_plans;
CREATE TRIGGER update_formation_plans_updated_at
  BEFORE UPDATE ON formation_plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE formation_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_wagon_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own plans"
  ON formation_plans FOR SELECT
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Managers can view all plans"
  ON formation_plans FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role IN ('Manager', 'Admin')
    )
  );

CREATE POLICY "Users can create plans"
  ON formation_plans FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update own draft plans"
  ON formation_plans FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid() AND status = 'Draft')
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Managers can update any plan"
  ON formation_plans FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role IN ('Manager', 'Admin')
    )
  );

CREATE POLICY "Users can view own plan assignments"
  ON plan_wagon_assignments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM formation_plans
      WHERE formation_plans.id = plan_wagon_assignments.plan_id
      AND formation_plans.created_by = auth.uid()
    )
  );

CREATE POLICY "Managers can view all assignments"
  ON plan_wagon_assignments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role IN ('Manager', 'Admin')
    )
  );

CREATE POLICY "Users can manage own plan assignments"
  ON plan_wagon_assignments FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM formation_plans
      WHERE formation_plans.id = plan_wagon_assignments.plan_id
      AND formation_plans.created_by = auth.uid()
      AND formation_plans.status = 'Draft'
    )
  );
