import { pgTable, serial, text, uuid, numeric, timestamp, integer, boolean, jsonb, index, uniqueIndex } from 'drizzle-orm/pg-core';

// Profiles table
export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().unique(),
  fullName: text('full_name').notNull(),
  role: text('role').notNull().default('Planner'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
  userIdIdx: index('idx_profiles_user_id').on(table.userId),
  roleIdx: index('idx_profiles_role').on(table.role),
}));

// Stockyards table
export const stockyards = pgTable('stockyards', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  locationCoords: text('location_coords').notNull(),
  maxCapacityTonnes: numeric('max_capacity_tonnes').notNull(),
  currentUtilization: numeric('current_utilization').default('0'),
  status: text('status').default('Active'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Wagons table
export const wagons = pgTable('wagons', {
  id: text('id').primaryKey(),
  wagonType: text('wagon_type').notNull(),
  capacityTonnes: numeric('capacity_tonnes').notNull(),
  currentLoadTonnes: numeric('current_load_tonnes').default('0'),
  status: text('status').default('Available'),
  currentStockyardId: integer('current_stockyard_id').references(() => stockyards.id, { onDelete: 'set null' }),
  material: text('material'),
  destination: text('destination'),
  priority: text('priority').default('Low'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
  statusStockyardIdx: index('idx_wagons_status_stockyard').on(table.status, table.currentStockyardId),
  stockyardIdx: index('idx_wagons_stockyard').on(table.currentStockyardId),
}));

// Formation plans table
export const formationPlans = pgTable('formation_plans', {
  id: serial('id').primaryKey(),
  planName: text('plan_name').notNull(),
  route: text('route').notNull(),
  createdBy: uuid('created_by').notNull(),
  status: text('status').default('Draft'),
  originStockyardId: integer('origin_stockyard_id').notNull().references(() => stockyards.id),
  destination: text('destination').notNull(),
  priority: text('priority').default('Medium'),
  projectedSavings: numeric('projected_savings').default('0'),
  timeSavingsHours: numeric('time_savings_hours').default('0'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  submittedAt: timestamp('submitted_at', { withTimezone: true }),
  approvedAt: timestamp('approved_at', { withTimezone: true }),
}, (table) => ({
  createdByStatusIdx: index('idx_formation_plans_created_by').on(table.createdBy, table.status),
  statusIdx: index('idx_formation_plans_status').on(table.status),
}));

// Plan wagon assignments table
export const planWagonAssignments = pgTable('plan_wagon_assignments', {
  id: serial('id').primaryKey(),
  planId: integer('plan_id').notNull().references(() => formationPlans.id, { onDelete: 'cascade' }),
  wagonId: text('wagon_id').notNull().references(() => wagons.id, { onDelete: 'cascade' }),
  sequenceOrder: integer('sequence_order').notNull(),
  assignedAt: timestamp('assigned_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
  planIdIdx: index('idx_plan_assignments_plan_id').on(table.planId),
  wagonIdIdx: index('idx_plan_assignments_wagon_id').on(table.wagonId),
  uniquePlanWagon: uniqueIndex('unique_plan_wagon').on(table.planId, table.wagonId),
  uniquePlanSequence: uniqueIndex('unique_plan_sequence').on(table.planId, table.sequenceOrder),
}));

// Rake movements table
export const rakeMovements = pgTable('rake_movements', {
  id: serial('id').primaryKey(),
  planId: integer('plan_id').notNull().references(() => formationPlans.id, { onDelete: 'cascade' }),
  locationCoords: text('location_coords').notNull(),
  currentLocationName: text('current_location_name'),
  currentSpeedKmh: numeric('current_speed_kmh').default('0'),
  status: text('status').default('Scheduled'),
  delayMinutes: integer('delay_minutes').default(0),
  timestamp: timestamp('timestamp', { withTimezone: true }).defaultNow(),
}, (table) => ({
  planTimeIdx: index('idx_rake_movements_plan_time').on(table.planId, table.timestamp),
  statusIdx: index('idx_rake_movements_status').on(table.status),
}));

// Routes table
export const routes = pgTable('routes', {
  id: serial('id').primaryKey(),
  routeName: text('route_name').notNull().unique(),
  origin: text('origin').notNull(),
  destination: text('destination').notNull(),
  distanceKm: numeric('distance_km').notNull(),
  estimatedDurationHours: numeric('estimated_duration_hours').notNull(),
  waypoints: jsonb('waypoints'),
  status: text('status').default('Active'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
  statusIdx: index('idx_routes_status').on(table.status),
}));

// KPI snapshots table
export const kpiSnapshots = pgTable('kpi_snapshots', {
  id: serial('id').primaryKey(),
  date: timestamp('date', { mode: 'date' }).notNull(),
  metricName: text('metric_name').notNull(),
  metricValue: numeric('metric_value').notNull(),
  metricUnit: text('metric_unit'),
  category: text('category'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
  dateIdx: index('idx_kpi_snapshots_date').on(table.date),
  categoryDateIdx: index('idx_kpi_snapshots_category').on(table.category, table.date),
  uniqueDateMetric: uniqueIndex('unique_date_metric').on(table.date, table.metricName),
}));

// AI recommendations table
export const aiRecommendations = pgTable('ai_recommendations', {
  id: serial('id').primaryKey(),
  planId: integer('plan_id').references(() => formationPlans.id, { onDelete: 'cascade' }),
  recommendationType: text('recommendation_type').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  priority: text('priority').default('Medium'),
  impactScore: integer('impact_score'),
  costSavings: numeric('cost_savings').default('0'),
  timeSavingsHours: numeric('time_savings_hours').default('0'),
  justification: jsonb('justification'),
  status: text('status').default('Pending'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
  planIdStatusIdx: index('idx_recommendations_plan_id').on(table.planId, table.status),
  statusPriorityIdx: index('idx_recommendations_status').on(table.status, table.priority),
}));

// Conflicts table
export const conflicts = pgTable('conflicts', {
  id: serial('id').primaryKey(),
  planId: integer('plan_id').references(() => formationPlans.id, { onDelete: 'cascade' }),
  conflictType: text('conflict_type').notNull(),
  severity: text('severity').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  affectedResources: jsonb('affected_resources'),
  suggestedResolution: text('suggested_resolution'),
  costImpact: numeric('cost_impact').default('0'),
  timeImpactHours: numeric('time_impact_hours').default('0'),
  status: text('status').default('Active'),
  detectedAt: timestamp('detected_at', { withTimezone: true }).defaultNow(),
  resolvedAt: timestamp('resolved_at', { withTimezone: true }),
}, (table) => ({
  planIdStatusIdx: index('idx_conflicts_plan_id').on(table.planId, table.status),
  severityStatusIdx: index('idx_conflicts_severity').on(table.severity, table.status),
}));

// Notifications table
export const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull(),
  notificationType: text('notification_type').notNull().default('info'),
  title: text('title').notNull(),
  message: text('message').notNull(),
  relatedEntityType: text('related_entity_type'),
  relatedEntityId: integer('related_entity_id'),
  isRead: boolean('is_read').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
  userReadIdx: index('idx_notifications_user_read').on(table.userId, table.isRead, table.createdAt),
}));
