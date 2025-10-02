import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import FilterSidebar from './components/FilterSidebar';
import InteractiveMap from './components/InteractiveMap';
import RecommendationSidebar from './components/RecommendationSidebar';
import QuickActions from './components/QuickActions';
import StatusOverview from './components/StatusOverview';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MainDashboard = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [realTimeData, setRealTimeData] = useState({
    lastUpdate: new Date(),
    activeRakes: 156,
    utilization: 78
  });

  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    shift: 'all',
    stockyard: 'all',
    priority: 'all'
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        lastUpdate: new Date(),
        activeRakes: prev?.activeRakes + Math.floor(Math.random() * 3) - 1,
        utilization: Math.max(70, Math.min(85, prev?.utilization + Math.floor(Math.random() * 3) - 1))
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
  };

  const handleMarkerClick = (marker, type) => {
    setSelectedMarker({ ...marker, type });
    console.log('Marker clicked:', marker, type);
  };

  const handleGeneratePlan = () => {
    console.log('Generating new formation plan...');
    // Simulate plan generation
    setTimeout(() => {
      console.log('Plan generated successfully');
    }, 2000);
  };

  const handleOptimize = () => {
    console.log('Optimizing current formations...');
    // Simulate optimization
    setTimeout(() => {
      console.log('Optimization completed');
    }, 1500);
  };

  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(!leftSidebarOpen);
  };
  
  const toggleRightSidebar = () => {
    setRightSidebarOpen(!rightSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="flex h-screen relative">
          {/* Left Sidebar - Filters */}
          <div className={`fixed lg:sticky top-16 left-0 z-30 h-[calc(100vh-4rem)] transition-all duration-300 ${
            leftSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}>
            <FilterSidebar
              isOpen={leftSidebarOpen}
              onToggle={toggleLeftSidebar}
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          </div>

          {/* Main Content Area */}
          <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
            leftSidebarOpen ? 'lg:ml-80' : 'lg:ml-0'
          }`}>
            {/* Top Bar with Controls */}
            <div className="bg-card border-b border-border p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleLeftSidebar}
                    className="lg:hidden"
                  >
                    <Icon name="Filter" size={20} />
                  </Button>
                  <div>
                    <Breadcrumb />
                    <h1 className="text-2xl font-bold text-foreground">Railway Logistics Dashboard</h1>
                    <p className="text-sm text-muted-foreground">
                      Real-time rake formation optimization and tracking
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span>Live Updates</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleRightSidebar}
                    className="lg:hidden"
                  >
                    <Icon name="BarChart3" size={20} />
                  </Button>
                </div>
              </div>

              {/* Quick Actions - Mobile/Tablet */}
              <div className="lg:hidden">
                <QuickActions
                  onGeneratePlan={handleGeneratePlan}
                  onOptimize={handleOptimize}
                />
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 overflow-hidden">
              {/* Desktop Layout */}
              <div className="hidden lg:flex h-full">
                {/* Central Map Area */}
                <div className="flex-1 p-4">
                  <div className="h-full bg-card border border-border rounded-lg overflow-hidden">
                    <InteractiveMap
                      selectedStockyard={filters?.stockyard}
                      onMarkerClick={handleMarkerClick}
                      realTimeData={realTimeData}
                    />
                  </div>
                </div>
              </div>

              {/* Mobile/Tablet Layout */}
              <div className="lg:hidden flex-1 overflow-y-auto p-4 space-y-6">
                {/* Status Overview */}
                <StatusOverview realTimeData={realTimeData} />

                {/* Interactive Map */}
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-border">
                    <h3 className="text-lg font-semibold text-foreground flex items-center">
                      <Icon name="Map" size={20} className="mr-2" />
                      Network Overview
                    </h3>
                  </div>
                  <div className="h-80">
                    <InteractiveMap
                      selectedStockyard={filters?.stockyard}
                      onMarkerClick={handleMarkerClick}
                      realTimeData={realTimeData}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Recommendations */}
          <div className={`fixed lg:sticky top-16 right-0 z-30 h-[calc(100vh-4rem)] transition-all duration-300 ${
            rightSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
          }`}>
            <RecommendationSidebar
              isOpen={rightSidebarOpen}
              onToggle={toggleRightSidebar}
              onGeneratePlan={handleGeneratePlan}
              onOptimize={handleOptimize}
            />
          </div>
        </div>

        {/* Desktop Status Overview - Bottom Section */}
        <div className="hidden lg:block bg-card border-t border-border p-6">
          <StatusOverview realTimeData={realTimeData} />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;