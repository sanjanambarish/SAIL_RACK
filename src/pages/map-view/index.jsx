import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MapContainer from './components/MapContainer';
import FloatingControls from './components/FloatingControls';
import MarkerPopup from './components/MarkerPopup';
import RouteDetails from './components/RouteDetails';

const MapView = () => {
  const navigate = useNavigate();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [mapStyle, setMapStyle] = useState('standard');
  const [showRealTimeTracking, setShowRealTimeTracking] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [filters, setFilters] = useState({
    stockyard: 'all',
    priority: 'all',
    shift: 'all',
    dateRange: 'today'
  });

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event?.key === 'Escape') {
        if (selectedRoute) {
          setSelectedRoute(null);
        } else if (selectedMarker) {
          setSelectedMarker(null);
        }
      }
      if (event?.key === 'F11') {
        event?.preventDefault();
        setIsFullscreen(!isFullscreen);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedMarker, selectedRoute, isFullscreen]);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleRouteClick = (route) => {
    setSelectedRoute(route);
  };

  const handleMarkerAction = (action, marker) => {
    switch (action) {
      case 'view_details': console.log('Viewing details for:', marker?.name);
        break;
      case 'create_plan': navigate('/formation-plan', { state: { stockyard: marker } });
        break;
      case 'assign_rake': console.log('Assigning rake to:', marker?.name);
        break;
      case 'view_orders': navigate('/analytics', { state: { customer: marker } });
        break;
      case 'track_rake': console.log('Tracking rake:', marker?.id);
        break;
      case 'rake_details': navigate('/timeline-view', { state: { rake: marker } });
        break;
      default:
        break;
    }
    setSelectedMarker(null);
  };

  const handleRouteOptimize = (route) => {
    navigate('/formation-plan', { state: { route } });
    setSelectedRoute(null);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleMapStyleChange = (style) => {
    setMapStyle(style);
  };

  const handleToggleRealTime = () => {
    setShowRealTimeTracking(!showRealTimeTracking);
  };

  const handleToggleRoutes = () => {
    setShowRoutes(!showRoutes);
  };

  const handleZoomIn = () => {
    console.log('Zooming in');
  };

  const handleZoomOut = () => {
    console.log('Zooming out');
  };

  const handleResetView = () => {
    console.log('Resetting view');
    setFilters({
      stockyard: 'all',
      priority: 'all',
      shift: 'all',
      dateRange: 'today'
    });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Interactive Map View</h1>
              <p className="text-muted-foreground">
                Real-time visualization of stockyards, customers, and rake movements across the railway network
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate('/main-dashboard')}
                iconName="ArrowLeft"
                iconPosition="left"
                iconSize={16}
              >
                Back to Dashboard
              </Button>
              
              <Button
                variant="secondary"
                onClick={toggleFullscreen}
                iconName={isFullscreen ? "Minimize2" : "Maximize2"}
                iconPosition="left"
                iconSize={16}
              >
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </Button>
              
              <Button
                variant="default"
                onClick={() => navigate('/formation-plan')}
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
              >
                Create Formation Plan
              </Button>
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-card-foreground">
                    {showRealTimeTracking ? 'Live Tracking Active' : 'Live Tracking Disabled'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">4 Stockyards</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">4 Customers</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Icon name="Train" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">3 Active Rakes</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Last updated: {new Date()?.toLocaleTimeString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className={`relative bg-card border border-border rounded-lg overflow-hidden ${
            isFullscreen ? 'fixed inset-0 z-40 rounded-none' : 'h-[calc(100vh-300px)]'
          }`}>
            {isFullscreen && (
              <div className="absolute top-4 left-4 z-30">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={toggleFullscreen}
                  iconName="Minimize2"
                  iconPosition="left"
                  iconSize={14}
                >
                  Exit Fullscreen
                </Button>
              </div>
            )}

            <MapContainer
              selectedFilters={filters}
              onMarkerClick={handleMarkerClick}
              onRouteClick={handleRouteClick}
              mapStyle={mapStyle}
              showRealTimeTracking={showRealTimeTracking}
              showRoutes={showRoutes}
            />

            <FloatingControls
              onFilterChange={handleFilterChange}
              onMapStyleChange={handleMapStyleChange}
              onToggleRealTime={handleToggleRealTime}
              onToggleRoutes={handleToggleRoutes}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onResetView={handleResetView}
              filters={filters}
              mapStyle={mapStyle}
              showRealTimeTracking={showRealTimeTracking}
              showRoutes={showRoutes}
            />
          </div>

          {/* Quick Actions */}
          {!isFullscreen && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="BarChart3" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">Route Analytics</h3>
                    <p className="text-sm text-muted-foreground">View performance metrics</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/analytics')}
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={14}
                  className="w-full"
                >
                  View Analytics
                </Button>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="Calendar" size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">Formation Planning</h3>
                    <p className="text-sm text-muted-foreground">Create optimized plans</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/formation-plan')}
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={14}
                  className="w-full"
                >
                  Plan Formation
                </Button>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={20} className="text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">Timeline View</h3>
                    <p className="text-sm text-muted-foreground">Track schedules</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/timeline-view')}
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={14}
                  className="w-full"
                >
                  View Timeline
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Marker Popup */}
      {selectedMarker && (
        <MarkerPopup
          marker={selectedMarker}
          onClose={() => setSelectedMarker(null)}
          onAction={handleMarkerAction}
        />
      )}
      {/* Route Details */}
      {selectedRoute && (
        <RouteDetails
          route={selectedRoute}
          onClose={() => setSelectedRoute(null)}
          onOptimize={handleRouteOptimize}
        />
      )}
    </div>
  );
};

export default MapView;