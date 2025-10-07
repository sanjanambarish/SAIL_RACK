import dotenv from 'dotenv';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';
import * as schema from '../shared/schema.js';

dotenv.config();
neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema });

async function seed() {
  try {
    console.log('Seeding database...');

    // Insert stockyards
    const stockyardsData = [
      { name: 'Rourkela Steel Plant', locationCoords: '{"lat": 22.2604, "lng": 84.8536}', maxCapacityTonnes: '500000', currentUtilization: '75', status: 'Active' },
      { name: 'Bhilai Steel Plant', locationCoords: '{"lat": 21.2140, "lng": 81.3785}', maxCapacityTonnes: '450000', currentUtilization: '82', status: 'Active' },
      { name: 'Durgapur Steel Plant', locationCoords: '{"lat": 23.5204, "lng": 87.3119}', maxCapacityTonnes: '400000', currentUtilization: '68', status: 'Active' },
      { name: 'Bokaro Steel Plant', locationCoords: '{"lat": 23.6693, "lng": 86.1511}', maxCapacityTonnes: '480000', currentUtilization: '71', status: 'Active' }
    ];

    for (const stockyard of stockyardsData) {
      await db.insert(schema.stockyards).values(stockyard).onConflictDoNothing();
    }
    console.log('✓ Stockyards seeded');

    // Insert wagons
    const wagonsData = [
      // Rourkela wagons
      { id: 'BOXN-45231', wagonType: 'BOXN', capacityTonnes: '58', currentLoadTonnes: '55', status: 'Available', currentStockyardId: 1, material: 'Coal', destination: 'Mumbai Port', priority: 'High' },
      { id: 'BOXN-45232', wagonType: 'BOXN', capacityTonnes: '58', currentLoadTonnes: '52', status: 'Available', currentStockyardId: 1, material: 'Coal', destination: 'Mumbai Port', priority: 'High' },
      { id: 'BOBRN-78901', wagonType: 'BOBRN', capacityTonnes: '61', currentLoadTonnes: '0', status: 'Available', currentStockyardId: 1, material: null, destination: null, priority: 'Low' },
      { id: 'BOXN-45233', wagonType: 'BOXN', capacityTonnes: '58', currentLoadTonnes: '48', status: 'Available', currentStockyardId: 1, material: 'Iron Ore', destination: 'Chennai Port', priority: 'Medium' },
      { id: 'BOXN-45234', wagonType: 'BOXN', capacityTonnes: '58', currentLoadTonnes: '0', status: 'Maintenance', currentStockyardId: 1, material: null, destination: null, priority: 'Low' },
      { id: 'BOBRN-78902', wagonType: 'BOBRN', capacityTonnes: '61', currentLoadTonnes: '59', status: 'Available', currentStockyardId: 1, material: 'Iron Ore', destination: 'Mumbai Port', priority: 'High' },
      { id: 'BCN-10001', wagonType: 'BCN', capacityTonnes: '55', currentLoadTonnes: '0', status: 'Available', currentStockyardId: 1, material: null, destination: null, priority: 'Low' },
      { id: 'BCN-10002', wagonType: 'BCN', capacityTonnes: '55', currentLoadTonnes: '45', status: 'Available', currentStockyardId: 1, material: 'Steel Products', destination: 'Kolkata', priority: 'Medium' },
      { id: 'BCNA-20001', wagonType: 'BCNA', capacityTonnes: '60', currentLoadTonnes: '57', status: 'Available', currentStockyardId: 1, material: 'Steel Coils', destination: 'Delhi', priority: 'High' },
      { id: 'BCNA-20002', wagonType: 'BCNA', capacityTonnes: '60', currentLoadTonnes: '0', status: 'Available', currentStockyardId: 1, material: null, destination: null, priority: 'Low' },
      
      // Bhilai wagons
      { id: 'BCN-12345', wagonType: 'BCN', capacityTonnes: '55', currentLoadTonnes: '48', status: 'Available', currentStockyardId: 2, material: 'Steel Products', destination: 'Chennai Port', priority: 'Medium' },
      { id: 'BCNA-67890', wagonType: 'BCNA', capacityTonnes: '60', currentLoadTonnes: '57', status: 'Available', currentStockyardId: 2, material: 'Steel Coils', destination: 'Chennai Port', priority: 'Low' },
      { id: 'BOXN-12001', wagonType: 'BOXN', capacityTonnes: '58', currentLoadTonnes: '54', status: 'Available', currentStockyardId: 2, material: 'Coal', destination: 'Visakhapatnam', priority: 'Medium' },
      { id: 'BOXN-12002', wagonType: 'BOXN', capacityTonnes: '58', currentLoadTonnes: '0', status: 'Available', currentStockyardId: 2, material: null, destination: null, priority: 'Low' },
      { id: 'BOBRN-12003', wagonType: 'BOBRN', capacityTonnes: '61', currentLoadTonnes: '58', status: 'Available', currentStockyardId: 2, material: 'Iron Ore', destination: 'Mumbai Port', priority: 'High' },
      { id: 'BCN-12004', wagonType: 'BCN', capacityTonnes: '55', currentLoadTonnes: '0', status: 'Maintenance', currentStockyardId: 2, material: null, destination: null, priority: 'Low' },
      { id: 'BCN-12005', wagonType: 'BCN', capacityTonnes: '55', currentLoadTonnes: '52', status: 'Available', currentStockyardId: 2, material: 'Steel Products', destination: 'Delhi', priority: 'High' },
      { id: 'BCNA-12006', wagonType: 'BCNA', capacityTonnes: '60', currentLoadTonnes: '0', status: 'Available', currentStockyardId: 2, material: null, destination: null, priority: 'Low' },
      { id: 'BOXN-12007', wagonType: 'BOXN', capacityTonnes: '58', currentLoadTonnes: '56', status: 'Available', currentStockyardId: 2, material: 'Coal', destination: 'Chennai Port', priority: 'Medium' },
      { id: 'BOBRN-12008', wagonType: 'BOBRN', capacityTonnes: '61', currentLoadTonnes: '60', status: 'Available', currentStockyardId: 2, material: 'Iron Ore', destination: 'Kolkata', priority: 'High' },
      
      // Durgapur wagons
      { id: 'BOXN-99001', wagonType: 'BOXN', capacityTonnes: '58', currentLoadTonnes: '0', status: 'Available', currentStockyardId: 3, material: null, destination: null, priority: 'Low' },
      { id: 'BOBRN-99002', wagonType: 'BOBRN', capacityTonnes: '61', currentLoadTonnes: '0', status: 'Available', currentStockyardId: 3, material: null, destination: null, priority: 'Low' },
      { id: 'BCN-99003', wagonType: 'BCN', capacityTonnes: '55', currentLoadTonnes: '0', status: 'Available', currentStockyardId: 3, material: null, destination: null, priority: 'Low' },
      { id: 'BCNA-99004', wagonType: 'BCNA', capacityTonnes: '60', currentLoadTonnes: '0', status: 'Available', currentStockyardId: 3, material: null, destination: null, priority: 'Low' },
      { id: 'BOXN-99005', wagonType: 'BOXN', capacityTonnes: '58', currentLoadTonnes: '53', status: 'Available', currentStockyardId: 3, material: 'Coal', destination: 'Kolkata Port', priority: 'High' },
      { id: 'BOXN-99006', wagonType: 'BOXN', capacityTonnes: '58', currentLoadTonnes: '51', status: 'Available', currentStockyardId: 3, material: 'Coal', destination: 'Kolkata Port', priority: 'High' },
      { id: 'BOBRN-99007', wagonType: 'BOBRN', capacityTonnes: '61', currentLoadTonnes: '58', status: 'Available', currentStockyardId: 3, material: 'Iron Ore', destination: 'Mumbai Port', priority: 'Medium' },
      { id: 'BCN-99008', wagonType: 'BCN', capacityTonnes: '55', currentLoadTonnes: '49', status: 'Available', currentStockyardId: 3, material: 'Steel Products', destination: 'Delhi', priority: 'Medium' },
      { id: 'BCN-99009', wagonType: 'BCN', capacityTonnes: '55', currentLoadTonnes: '0', status: 'Maintenance', currentStockyardId: 3, material: null, destination: null, priority: 'Low' },
      { id: 'BCNA-99010', wagonType: 'BCNA', capacityTonnes: '60', currentLoadTonnes: '55', status: 'Available', currentStockyardId: 3, material: 'Steel Coils', destination: 'Chennai Port', priority: 'Medium' },
      
      // Bokaro wagons
      { id: 'BOXN-88001', wagonType: 'BOXN', capacityTonnes: '58', currentLoadTonnes: '56', status: 'Available', currentStockyardId: 4, material: 'Coal', destination: 'Delhi', priority: 'High' },
      { id: 'BOXN-88002', wagonType: 'BOXN', capacityTonnes: '58', currentLoadTonnes: '54', status: 'Available', currentStockyardId: 4, material: 'Coal', destination: 'Delhi', priority: 'High' },
      { id: 'BOBRN-88003', wagonType: 'BOBRN', capacityTonnes: '61', currentLoadTonnes: '60', status: 'Available', currentStockyardId: 4, material: 'Iron Ore', destination: 'Mumbai Port', priority: 'High' },
      { id: 'BCN-88004', wagonType: 'BCN', capacityTonnes: '55', currentLoadTonnes: '50', status: 'Available', currentStockyardId: 4, material: 'Steel Products', destination: 'Kolkata', priority: 'Medium' },
      { id: 'BCN-88005', wagonType: 'BCN', capacityTonnes: '55', currentLoadTonnes: '0', status: 'Available', currentStockyardId: 4, material: null, destination: null, priority: 'Low' },
      { id: 'BCNA-88006', wagonType: 'BCNA', capacityTonnes: '60', currentLoadTonnes: '58', status: 'Available', currentStockyardId: 4, material: 'Steel Coils', destination: 'Hyderabad', priority: 'Medium' },
      { id: 'BOXN-88007', wagonType: 'BOXN', capacityTonnes: '58', currentLoadTonnes: '0', status: 'Maintenance', currentStockyardId: 4, material: null, destination: null, priority: 'Low' },
      { id: 'BOBRN-88008', wagonType: 'BOBRN', capacityTonnes: '61', currentLoadTonnes: '0', status: 'Available', currentStockyardId: 4, material: null, destination: null, priority: 'Low' },
      { id: 'BCN-88009', wagonType: 'BCN', capacityTonnes: '55', currentLoadTonnes: '52', status: 'Available', currentStockyardId: 4, material: 'Steel Products', destination: 'Chennai Port', priority: 'High' },
      { id: 'BCNA-88010', wagonType: 'BCNA', capacityTonnes: '60', currentLoadTonnes: '0', status: 'Available', currentStockyardId: 4, material: null, destination: null, priority: 'Low' },
      
      // Additional mixed wagons
      { id: 'BOXN-77001', wagonType: 'BOXN', capacityTonnes: '58', currentLoadTonnes: '0', status: 'In-Transit', currentStockyardId: null, material: null, destination: 'Mumbai Port', priority: 'Medium' },
      { id: 'BOBRN-77002', wagonType: 'BOBRN', capacityTonnes: '61', currentLoadTonnes: '59', status: 'In-Transit', currentStockyardId: null, material: 'Iron Ore', destination: 'Chennai Port', priority: 'High' },
      { id: 'BCN-77003', wagonType: 'BCN', capacityTonnes: '55', currentLoadTonnes: '0', status: 'Available', currentStockyardId: 1, material: null, destination: null, priority: 'Low' },
      { id: 'BCNA-77004', wagonType: 'BCNA', capacityTonnes: '60', currentLoadTonnes: '56', status: 'Available', currentStockyardId: 2, material: 'Steel Coils', destination: 'Delhi', priority: 'Medium' },
      { id: 'BOXN-77005', wagonType: 'BOXN', capacityTonnes: '58', currentLoadTonnes: '57', status: 'Available', currentStockyardId: 3, material: 'Coal', destination: 'Visakhapatnam', priority: 'High' },
      { id: 'BOBRN-77006', wagonType: 'BOBRN', capacityTonnes: '61', currentLoadTonnes: '0', status: 'Available', currentStockyardId: 4, material: null, destination: null, priority: 'Low' },
      { id: 'BCN-77007', wagonType: 'BCN', capacityTonnes: '55', currentLoadTonnes: '51', status: 'Available', currentStockyardId: 1, material: 'Steel Products', destination: 'Mumbai Port', priority: 'High' },
      { id: 'BCNA-77008', wagonType: 'BCNA', capacityTonnes: '60', currentLoadTonnes: '0', status: 'Maintenance', currentStockyardId: 2, material: null, destination: null, priority: 'Low' },
      { id: 'BOXN-77009', wagonType: 'BOXN', capacityTonnes: '58', currentLoadTonnes: '55', status: 'Available', currentStockyardId: 3, material: 'Coal', destination: 'Kolkata Port', priority: 'Critical' },
      { id: 'BOBRN-77010', wagonType: 'BOBRN', capacityTonnes: '61', currentLoadTonnes: '60', status: 'Available', currentStockyardId: 4, material: 'Iron Ore', destination: 'Mumbai Port', priority: 'Critical' }
    ];

    for (const wagon of wagonsData) {
      await db.insert(schema.wagons).values(wagon).onConflictDoNothing();
    }
    console.log('✓ Wagons seeded');

    // Insert routes
    const routesData = [
      {
        routeName: 'Rourkela-Mumbai Express',
        origin: 'Rourkela Steel Plant',
        destination: 'Mumbai Port',
        distanceKm: '1850',
        estimatedDurationHours: '28',
        waypoints: [
          { name: 'Rourkela', lat: 22.2604, lng: 84.8536 },
          { name: 'Nagpur Junction', lat: 21.1458, lng: 79.0882 },
          { name: 'Mumbai Port', lat: 18.9388, lng: 72.8354 }
        ],
        status: 'Active'
      },
      {
        routeName: 'Bhilai-Chennai Freight',
        origin: 'Bhilai Steel Plant',
        destination: 'Chennai Port',
        distanceKm: '1320',
        estimatedDurationHours: '22',
        waypoints: [
          { name: 'Bhilai', lat: 21.2140, lng: 81.3785 },
          { name: 'Visakhapatnam Junction', lat: 17.6869, lng: 83.2185 },
          { name: 'Chennai Port', lat: 13.0827, lng: 80.2707 }
        ],
        status: 'Active'
      },
      {
        routeName: 'Durgapur-Kolkata Route',
        origin: 'Durgapur Steel Plant',
        destination: 'Kolkata Port',
        distanceKm: '210',
        estimatedDurationHours: '6',
        waypoints: [
          { name: 'Durgapur', lat: 23.5204, lng: 87.3119 },
          { name: 'Asansol Junction', lat: 23.6839, lng: 86.9929 },
          { name: 'Kolkata Port', lat: 22.5726, lng: 88.3639 }
        ],
        status: 'Active'
      },
      {
        routeName: 'Bokaro-Delhi Express',
        origin: 'Bokaro Steel Plant',
        destination: 'Delhi',
        distanceKm: '1150',
        estimatedDurationHours: '18',
        waypoints: [
          { name: 'Bokaro', lat: 23.6693, lng: 86.1511 },
          { name: 'Gaya Junction', lat: 24.7955, lng: 85.0002 },
          { name: 'Delhi', lat: 28.6139, lng: 77.2090 }
        ],
        status: 'Active'
      },
      {
        routeName: 'Rourkela-Visakhapatnam Route',
        origin: 'Rourkela Steel Plant',
        destination: 'Visakhapatnam Port',
        distanceKm: '685',
        estimatedDurationHours: '12',
        waypoints: [
          { name: 'Rourkela', lat: 22.2604, lng: 84.8536 },
          { name: 'Visakhapatnam Port', lat: 17.6869, lng: 83.2185 }
        ],
        status: 'Active'
      }
    ];

    for (const route of routesData) {
      await db.insert(schema.routes).values(route).onConflictDoNothing();
    }
    console.log('✓ Routes seeded');

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
