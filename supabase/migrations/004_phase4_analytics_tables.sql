/*
  # Phase 4: Analytics and Optimization Tables

  ## New Tables
  - kpi_snapshots: Historical performance metrics
  - ai_recommendations: AI-generated optimization suggestions
  - conflicts: Detected scheduling and resource conflicts
*/

CREATE TABLE IF NOT EXISTS kpi_snapshots (
  id serial PRIMARY KEY,
  date date NOT NULL,
  metric_name text NOT NULL,
  metric_value numeric NOT NULL,
  metric_unit text,
  category text,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT unique_date_metric UNIQUE (date, metric_name),
  CONSTRAINT valid_category CHECK (category IN ('cost', 'efficiency', 'performance', 'utilization', 'delivery'))
);

CREATE TABLE IF NOT EXISTS ai_recommendations (
  id serial PRIMARY KEY,
  plan_id integer REFERENCES formation_plans(id) ON DELETE CASCADE,
  recommendation_type text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  priority text DEFAULT 'Medium',
  impact_score integer,
  cost_savings numeric DEFAULT 0,
  time_savings_hours numeric DEFAULT 0,
  justification jsonb,
  status text DEFAULT 'Pending',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_recommendation_type CHECK (recommendation_type IN ('optimization', 'cost_saving', 'efficiency', 'route', 'safety')),
  CONSTRAINT valid_recommendation_priority CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
  CONSTRAINT valid_impact_score CHECK (impact_score >= 1 AND impact_score <= 100),
  CONSTRAINT valid_recommendation_status CHECK (status IN ('Pending', 'Accepted', 'Dismissed'))
);

CREATE TABLE IF NOT EXISTS conflicts (
  id serial PRIMARY KEY,
  plan_id integer REFERENCES formation_plans(id) ON DELETE CASCADE,
  conflict_type text NOT NULL,
  severity text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  affected_resources jsonb,
  suggested_resolution text,
  cost_impact numeric DEFAULT 0,
  time_impact_hours numeric DEFAULT 0,
  status text DEFAULT 'Active',
  detected_at timestamptz DEFAULT now(),
  resolved_at timestamptz,
  CONSTRAINT valid_conflict_type CHECK (conflict_type IN ('scheduling', 'capacity', 'resource', 'route', 'safety')),
  CONSTRAINT valid_conflict_severity CHECK (severity IN ('Low', 'Medium', 'High', 'Critical')),
  CONSTRAINT valid_conflict_status CHECK (status IN ('Active', 'Resolved', 'Ignored'))
);

CREATE INDEX IF NOT EXISTS idx_kpi_snapshots_date ON kpi_snapshots(date DESC);
CREATE INDEX IF NOT EXISTS idx_kpi_snapshots_category ON kpi_snapshots(category, date DESC);
CREATE INDEX IF NOT EXISTS idx_recommendations_plan_id ON ai_recommendations(plan_id, status);
CREATE INDEX IF NOT EXISTS idx_recommendations_status ON ai_recommendations(status, priority);
CREATE INDEX IF NOT EXISTS idx_conflicts_plan_id ON conflicts(plan_id, status);
CREATE INDEX IF NOT EXISTS idx_conflicts_severity ON conflicts(severity, status);

ALTER TABLE kpi_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conflicts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view KPIs"
  ON kpi_snapshots FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "System can insert KPIs"
  ON kpi_snapshots FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view recommendations for own plans"
  ON ai_recommendations FOR SELECT
  TO authenticated
  USING (
    plan_id IS NULL OR
    EXISTS (
      SELECT 1 FROM formation_plans
      WHERE formation_plans.id = ai_recommendations.plan_id
      AND formation_plans.created_by = auth.uid()
    )
  );

CREATE POLICY "Managers can view all recommendations"
  ON ai_recommendations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role IN ('Manager', 'Admin')
    )
  );

CREATE POLICY "Users can update recommendations for own plans"
  ON ai_recommendations FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM formation_plans
      WHERE formation_plans.id = ai_recommendations.plan_id
      AND formation_plans.created_by = auth.uid()
    )
  );

CREATE POLICY "Users can view conflicts for own plans"
  ON conflicts FOR SELECT
  TO authenticated
  USING (
    plan_id IS NULL OR
    EXISTS (
      SELECT 1 FROM formation_plans
      WHERE formation_plans.id = conflicts.plan_id
      AND formation_plans.created_by = auth.uid()
    )
  );

CREATE POLICY "Managers can view all conflicts"
  ON conflicts FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role IN ('Manager', 'Admin')
    )
  );

CREATE POLICY "Users can update conflicts for own plans"
  ON conflicts FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM formation_plans
      WHERE formation_plans.id = conflicts.plan_id
      AND formation_plans.created_by = auth.uid()
    )
  );
