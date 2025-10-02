# SAIL Rake Optimizer

## Overview
Railway Logistics Management System designed for optimizing railway operations. The application provides a comprehensive platform for managing rake formations, tracking real-time logistics, analyzing performance, and optimizing routes.

## Project Details
- **Technology Stack**: React 19 + Vite 7 + Tailwind CSS 4
- **Build Tool**: Vite
- **Package Manager**: npm
- **Node Version**: 20.x
- **Port**: 5000 (frontend)

## Key Features
- **Dashboard**: Real-time overview of key metrics (total rakes, utilization rate, cost savings, pending orders)
- **Interactive Map**: Visualizes stockyards, customer locations, and active rakes with filtering and real-time tracking
- **Formation Planning**: Create and manage rake formations with AI-powered recommendations and conflict detection
- **Timeline View**: Displays planned vs. actual dispatch schedules with critical path analysis
- **Analytics**: Detailed insights into cost trends, performance metrics, delivery analysis, and utilization
- **Login System**: Secure access with role-based permissions (Planner, Operator)

## Project Structure
- `/src/pages/` - Main application pages (dashboard, analytics, formation plan, map view, timeline view, login)
- `/src/components/` - Reusable UI components
- `/src/components/ui/` - Base UI components (Button, Input, Select, etc.)
- `/src/utils/` - Utility functions
- `/src/styles/` - Global styles and Tailwind configuration
- `/public/` - Static assets

## Configuration
- **Vite Config**: Configured for port 5000 with allowedHosts: true for Replit proxy support
- **Deployment**: Autoscale deployment with build and preview commands configured

## Development Commands
- `npm run dev` - Start development server on port 5000
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Recent Changes
- 2025-10-02: Initial Replit environment setup and UI styling improvements
  - Updated Vite config to use port 5000
  - Configured allowedHosts: true for Replit proxy compatibility
  - Set up Dev Server workflow
  - Configured autoscale deployment with build and preview commands
  - Migrated to Tailwind CSS v4 syntax with @theme and @import "tailwindcss"
  - Implemented professional dark theme with OKLCH color space for accurate colors
  - Updated color system: dark backgrounds, blue primary accents, green success indicators, orange warnings
  - Enhanced responsive design and visual consistency across all pages
  - All dependencies installed and working

## Project Architecture
- **Frontend Framework**: React 19 with React Router for navigation
- **Styling**: Tailwind CSS 4 with custom components using class-variance-authority
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for iconography
- **Build System**: Vite 7 with React plugin and component tagger
