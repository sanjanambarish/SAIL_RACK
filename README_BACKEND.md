# SAIL DSS - Backend Architecture

## Overview

The SAIL Decision Support System backend is built on **Supabase**, providing:
- PostgreSQL database with Row Level Security (RLS)
- Real-time subscriptions for live data updates
- Edge Functions for serverless API endpoints
- Built-in authentication and authorization

---

## Quick Start

### Prerequisites
```bash
# Ensure environment variables are set in .env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Install Dependencies
```bash
npm install
```

### Check Deployment Status
Review `DEPLOYMENT_STATUS.md` for current backend status.

---

## Architecture

### Database Schema (11 Tables)

#### Core Tables
1. **profiles** - User profiles with roles (Planner, Manager, Admin)
2. **stockyards** - Steel plant locations and capacity tracking
3. **wagons** - Railway wagon inventory (50+ wagons)

#### Formation Management
4. **formation_plans** - Rake formation plans created by users
5. **plan_wagon_assignments** - Junction table for wagon assignments

#### Real-time Tracking
6. **rake_movements** - GPS position history and live tracking
7. **routes** - Pre-defined railway routes with waypoints

#### AI & Analytics
8. **kpi_snapshots** - Daily performance metrics and KPIs
9. **ai_recommendations** - AI-generated optimization suggestions
10. **conflicts** - Detected scheduling and resource conflicts

#### Communication
11. **notifications** - Real-time user notifications and alerts

### Security Model

#### Row Level Security (RLS)
All tables have RLS enabled by default with specific policies:

**Profiles**: Users access only their own data
```sql
USING (auth.uid() = user_id)
```

**Formation Plans**: Users see their own; Managers see all
```sql
-- User access
USING (created_by = auth.uid())

-- Manager access
USING (EXISTS (
  SELECT 1 FROM profiles
  WHERE user_id = auth.uid()
  AND role IN ('Manager', 'Admin')
))
```

**Stockyards & Wagons**: All authenticated users can read
```sql
USING (true) -- for SELECT
```

#### Role Hierarchy
1. **Planner** (Default)
   - Create formation plans
   - Assign wagons
   - View own data

2. **Manager**
   - All Planner permissions
   - View all formation plans
   - Approve/reject plans
   - Manage stockyards

3. **Admin**
   - All Manager permissions
   - Manage users
   - Delete records
   - Full system access

---

## API Endpoints

### Authentication
```javascript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password'
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});

// Sign out
await supabase.auth.signOut();
```

### Database Queries

#### Read Data
```javascript
// Get all stockyards
const { data, error } = await supabase
  .from('stockyards')
  .select('*');

// Get available wagons
const { data, error } = await supabase
  .from('wagons')
  .select('*')
  .eq('status', 'Available');

// Get user's formation plans
const { data, error } = await supabase
  .from('formation_plans')
  .select(`
    *,
    stockyards (name, location_coords),
    plan_wagon_assignments (
      *,
      wagons (*)
    )
  `)
  .order('created_at', { ascending: false });
```

#### Create Data
```javascript
// Create formation plan
const { data, error } = await supabase
  .from('formation_plans')
  .insert({
    plan_name: 'Rourkela-Mumbai Express',
    route: 'Rourkela → Mumbai',
    origin_stockyard_id: 1,
    destination: 'Mumbai Port',
    priority: 'High'
  })
  .select()
  .single();

// Assign wagon to plan
const { data, error } = await supabase
  .from('plan_wagon_assignments')
  .insert({
    plan_id: planId,
    wagon_id: 'BOXN-45231',
    sequence_order: 1
  });
```

#### Update Data
```javascript
// Update wagon status
const { data, error } = await supabase
  .from('wagons')
  .update({ status: 'Assigned' })
  .eq('id', 'BOXN-45231');

// Submit plan for approval
const { data, error } = await supabase
  .from('formation_plans')
  .update({
    status: 'Submitted',
    submitted_at: new Date().toISOString()
  })
  .eq('id', planId);
```

### Real-time Subscriptions

#### Subscribe to Table Changes
```javascript
// Listen to formation plan updates
const subscription = supabase
  .channel('formation_plans_channel')
  .on('postgres_changes', {
    event: '*', // or 'INSERT', 'UPDATE', 'DELETE'
    schema: 'public',
    table: 'formation_plans'
  }, (payload) => {
    console.log('Change received!', payload);
    // Update UI
  })
  .subscribe();

// Unsubscribe when component unmounts
subscription.unsubscribe();
```

#### User-specific Notifications
```javascript
const userId = (await supabase.auth.getUser()).data.user.id;

const notificationSub = supabase
  .channel('user_notifications')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'notifications',
    filter: `user_id=eq.${userId}`
  }, (payload) => {
    // Show notification toast
    showNotification(payload.new);
  })
  .subscribe();
```

---

## Edge Functions (To Be Deployed)

### Formation Management
- **create-formation-plan**: Create new formation plan
- **assign-wagon-to-plan**: Assign wagon with validation
- **remove-wagon-from-plan**: Remove wagon and update status
- **submit-plan-for-approval**: Submit to manager with notification

### Dashboard & Tracking
- **get-dashboard-metrics**: Aggregate real-time statistics
- **update-rake-position**: Record GPS position
- **get-real-time-tracking**: Retrieve live tracking data

### AI & Optimization
- **run-formation-optimization**: Execute optimization algorithm
- **generate-ai-recommendations**: Generate AI suggestions
- **detect-conflicts**: Identify conflicts automatically
- **calculate-and-store-kpis**: Daily KPI calculation (cron)
- **export-analytics-report**: Export data as CSV/JSON

### Notifications
- **mark-notification-read**: Mark single notification
- **mark-all-notifications-read**: Mark all as read
- **get-unread-count**: Get unread count

---

## Data Models

### Formation Plan Workflow

```
1. Planner creates plan (status: 'Draft')
   ↓
2. Planner assigns wagons
   ↓
3. Planner submits (status: 'Submitted')
   ↓ (Manager notified)
4. Manager reviews
   ↓
5a. Manager approves (status: 'Approved')
    ↓
6. Plan execution begins (status: 'In-Progress')
   ↓
7. GPS tracking updates in real-time
   ↓
8. Plan completed (status: 'Completed')

OR

5b. Manager rejects (status: 'Rejected')
    ↓ (Planner notified)
    Back to Draft for revisions
```

### Wagon Status States
- **Available**: Ready for assignment
- **Assigned**: Assigned to formation plan
- **In-Transit**: Currently moving
- **Maintenance**: Under maintenance

### Notification Types
- **info**: General information
- **warning**: Warnings (delays, conflicts)
- **error**: Errors requiring action
- **success**: Successful operations

---

## Sample Data

After running `006_seed_sample_data.sql`:

### Stockyards (4)
- Rourkela Steel Plant
- Bhilai Steel Plant
- Durgapur Steel Plant
- Bokaro Steel Plant

### Wagons (50+)
- BOXN (Box wagons) - Coal, general cargo
- BOBRN (High-capacity box) - Iron ore
- BCN (Covered wagons) - Steel products
- BCNA (Air-braked covered) - Steel coils

### Routes (5)
- Rourkela-Mumbai Express (1850 km)
- Bhilai-Chennai Freight (1320 km)
- Durgapur-Kolkata Route (210 km)
- Bokaro-Delhi Express (1150 km)
- Rourkela-Visakhapatnam Route (685 km)

---

## Performance Optimizations

### Indexes
```sql
-- Wagon queries
CREATE INDEX idx_wagons_status_stockyard ON wagons(status, current_stockyard_id);

-- Formation plan queries
CREATE INDEX idx_formation_plans_created_by ON formation_plans(created_by, status);

-- Real-time tracking
CREATE INDEX idx_rake_movements_plan_time ON rake_movements(plan_id, timestamp DESC);

-- Notifications
CREATE INDEX idx_notifications_user_unread ON notifications(user_id) WHERE is_read = false;
```

### Query Patterns
```javascript
// Efficient: Use select() to fetch only needed columns
await supabase
  .from('wagons')
  .select('id, wagon_type, status, capacity_tonnes')
  .eq('status', 'Available');

// Efficient: Use single() or maybeSingle() for one row
await supabase
  .from('formation_plans')
  .select('*')
  .eq('id', planId)
  .maybeSingle();

// Efficient: Use filters at database level
await supabase
  .from('formation_plans')
  .select('*')
  .eq('created_by', userId)
  .in('status', ['Draft', 'Submitted'])
  .order('created_at', { ascending: false });
```

---

## Troubleshooting

### Common Issues

#### 1. RLS Blocking Access
```javascript
// Check if user has profile
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('user_id', userId)
  .single();

// Profile should exist with correct role
```

#### 2. Real-time Not Working
```javascript
// Ensure realtime is enabled on table (check Supabase dashboard)
// Verify subscription is active
const channels = supabase.getChannels();
console.log('Active channels:', channels);
```

#### 3. Foreign Key Violations
```javascript
// Ensure referenced records exist
// Example: stockyard must exist before creating wagon
const { data: stockyard } = await supabase
  .from('stockyards')
  .select('id')
  .eq('id', stockyardId)
  .single();

if (!stockyard) {
  throw new Error('Stockyard not found');
}
```

---

## Migration History

| Version | File | Description | Date |
|---------|------|-------------|------|
| 001 | phase1_core_tables | Core tables setup | Pending |
| 002 | phase2_formation_tables | Formation management | Pending |
| 003 | phase3_tracking_tables | Real-time tracking | Pending |
| 004 | phase4_analytics_tables | Analytics & AI | Pending |
| 005 | phase5_notifications_table | Notifications | Pending |
| 006 | seed_sample_data | Sample data | Pending |

---

## Next Steps

1. ✅ Migrations created
2. ⏳ Deploy migrations to Supabase
3. ⏳ Create Edge Functions
4. ⏳ Deploy Edge Functions
5. ⏳ Update frontend to use real data
6. ⏳ Test end-to-end workflows
7. ⏳ Performance testing
8. ⏳ Production deployment

---

## Resources

- **Supabase Docs**: https://supabase.com/docs
- **Supabase JS Client**: https://supabase.com/docs/reference/javascript
- **RLS Guide**: https://supabase.com/docs/guides/auth/row-level-security
- **Realtime Guide**: https://supabase.com/docs/guides/realtime
- **Edge Functions**: https://supabase.com/docs/guides/functions

---

**Project**: SAIL Decision Support System
**Backend**: Supabase (PostgreSQL + Realtime + Edge Functions)
**Frontend**: React + Vite + TailwindCSS
**Authentication**: Supabase Auth (Email/Password)
