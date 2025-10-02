import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";

// Corrected: Reverted to relative paths that match your configuration
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import Landing from './pages/landing';
import TimelineView from './pages/timeline-view';
import MainDashboard from './pages/main-dashboard';
import MapView from './pages/map-view';
import Login from './pages/login';
import FormationPlan from './pages/formation-plan';
import Analytics from './pages/analytics';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<Landing />} />
          <Route path="/timeline-view" element={<TimelineView />} />
          <Route path="/main-dashboard" element={<MainDashboard />} />
          <Route path="/map-view" element={<MapView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/formation-plan" element={<FormationPlan />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

