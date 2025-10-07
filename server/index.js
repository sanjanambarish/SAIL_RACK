import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { eq, sql } from 'drizzle-orm';
import ws from 'ws';
import * as schema from '../shared/schema.js';

// Load environment variables
dotenv.config();

// Configure Neon
neonConfig.webSocketConstructor = ws;

// Initialize database
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple auth middleware (stores user in memory - for demo purposes)
const sessions = new Map();

// Auth endpoints
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    
    // In production, hash passwords and store in auth table
    const userId = crypto.randomUUID();
    
    // Create profile
    const [profile] = await db.insert(schema.profiles).values({
      userId,
      fullName: fullName || email.split('@')[0],
      role: 'Planner',
    }).returning();
    
    // Create session
    const sessionId = crypto.randomUUID();
    sessions.set(sessionId, { userId, email });
    
    res.json({
      user: { id: userId, email },
      session: { access_token: sessionId },
      profile,
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // In production, verify password hash
    // For demo, we'll just find existing profile by email simulation
    const sessionId = crypto.randomUUID();
    const userId = crypto.randomUUID(); // In real app, get from auth table
    
    sessions.set(sessionId, { userId, email });
    
    res.json({
      user: { id: userId, email },
      session: { access_token: sessionId },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/signout', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token) {
    sessions.delete(token);
  }
  res.json({ success: true });
});

app.get('/api/auth/session', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const session = sessions.get(token);
  
  if (session) {
    res.json({ user: session });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Profile endpoints
app.get('/api/profiles/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const [profile] = await db.select().from(schema.profiles).where(eq(schema.profiles.userId, userId));
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Stockyards endpoints
app.get('/api/stockyards', async (req, res) => {
  try {
    const stockyardsList = await db.select().from(schema.stockyards);
    res.json(stockyardsList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Wagons endpoints
app.get('/api/wagons', async (req, res) => {
  try {
    const wagonsList = await db.select().from(schema.wagons);
    res.json(wagonsList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Formation plans endpoints
app.get('/api/formation-plans', async (req, res) => {
  try {
    const plans = await db.select().from(schema.formationPlans);
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/formation-plans', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const session = sessions.get(token);
    
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const [plan] = await db.insert(schema.formationPlans).values({
      ...req.body,
      createdBy: session.userId,
    }).returning();
    
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Routes endpoints
app.get('/api/routes', async (req, res) => {
  try {
    const routesList = await db.select().from(schema.routes);
    res.json(routesList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// KPI endpoints
app.get('/api/kpi-snapshots', async (req, res) => {
  try {
    const kpis = await db.select().from(schema.kpiSnapshots);
    res.json(kpis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Recommendations endpoints
app.get('/api/ai-recommendations', async (req, res) => {
  try {
    const recommendations = await db.select().from(schema.aiRecommendations);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Conflicts endpoints
app.get('/api/conflicts', async (req, res) => {
  try {
    const conflictsList = await db.select().from(schema.conflicts);
    res.json(conflictsList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Notifications endpoints
app.get('/api/notifications', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const session = sessions.get(token);
    
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const notificationsList = await db.select()
      .from(schema.notifications)
      .where(eq(schema.notifications.userId, session.userId));
    
    res.json(notificationsList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Dashboard metrics endpoint
app.get('/api/dashboard/metrics', async (req, res) => {
  try {
    const totalWagons = await db.select({ count: sql`count(*)` }).from(schema.wagons);
    const availableWagons = await db.select({ count: sql`count(*)` })
      .from(schema.wagons)
      .where(eq(schema.wagons.status, 'Available'));
    
    const totalStockyards = await db.select({ count: sql`count(*)` }).from(schema.stockyards);
    
    res.json({
      totalRakes: totalWagons[0]?.count || 0,
      utilizationRate: 75,
      costSavings: 2500000,
      pendingOrders: 12,
      totalWagons: totalWagons[0]?.count || 0,
      availableWagons: availableWagons[0]?.count || 0,
      totalStockyards: totalStockyards[0]?.count || 0,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.BACKEND_PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
