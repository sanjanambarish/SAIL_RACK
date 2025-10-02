import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FloatingControls = ({ 
  onFilterChange, 
  onMapStyleChange, 
  onToggleRealTime,
  onToggleRoutes,
  onZoomIn,
  onZoomOut,
  onResetView,
  filters,
  mapStyle,
  showRealTimeTracking,
  showRoutes
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const stockyardOptions = [
    { value: 'all', label: 'All Stockyards' },
    { value: 'sy001', label: 'Rourkela Steel Plant' },
    { value: 'sy002', label: 'Bokaro Steel Plant' },
    { value: 'sy003', label: 'Bhilai Steel Plant' },
    { value: 'sy004', label: 'Durgapur Steel Plant' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const mapStyleOptions = [
    { value: 'standard', label: 'Standard View' },
    { value: 'satellite', label: 'Satellite View' },
    { value: 'terrain', label: 'Terrain View' },
    { value: 'dark', label: 'Dark Mode' }
  ];

  const shiftOptions = [
    { value: 'all', label: 'All Shifts' },
    { value: 'morning', label: 'Morning (6AM-2PM)' },
    { value: 'afternoon', label: 'Afternoon (2PM-10PM)' },
    { value: 'night', label: 'Night (10PM-6AM)' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="absolute top-4 right-4 z-20">
      {/* Main Control Panel */}
      <div className={`bg-card border border-border rounded-lg shadow-lg transition-all duration-300 ${
        isExpanded ? 'w-80' : 'w-12'
      }`}>
        {/* Toggle Button */}
        <div className="p-3 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-6 h-6"
          >
            <Icon name={isExpanded ? "X" : "Settings"} size={16} />
          </Button>
        </div>

        {/* Expanded Controls */}
        {isExpanded && (
          <div className="p-4 space-y-4">
            {/* Map Style */}
            <div>
              <Select
                label="Map Style"
                options={mapStyleOptions}
                value={mapStyle}
                onChange={onMapStyleChange}
                className="mb-3"
              />
            </div>

            {/* Filters Section */}
            <div className="border-t border-border pt-4">
              <h4 className="font-semibold text-card-foreground mb-3 flex items-center">
                <Icon name="Filter" size={16} className="mr-2" />
                Filters
              </h4>
              
              <div className="space-y-3">
                <Select
                  label="Stockyard"
                  options={stockyardOptions}
                  value={filters?.stockyard}
                  onChange={(value) => handleFilterChange('stockyard', value)}
                />

                <Select
                  label="Priority"
                  options={priorityOptions}
                  value={filters?.priority}
                  onChange={(value) => handleFilterChange('priority', value)}
                />

                <Select
                  label="Shift"
                  options={shiftOptions}
                  value={filters?.shift}
                  onChange={(value) => handleFilterChange('shift', value)}
                />
              </div>
            </div>

            {/* Layer Controls */}
            <div className="border-t border-border pt-4">
              <h4 className="font-semibold text-card-foreground mb-3 flex items-center">
                <Icon name="Layers" size={16} className="mr-2" />
                Layers
              </h4>
              
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showRealTimeTracking}
                    onChange={onToggleRealTime}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span className="text-sm text-card-foreground">Real-time Tracking</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showRoutes}
                    onChange={onToggleRoutes}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span className="text-sm text-card-foreground">Show Routes</span>
                </label>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border-t border-border pt-4">
              <h4 className="font-semibold text-card-foreground mb-3 flex items-center">
                <Icon name="Zap" size={16} className="mr-2" />
                Quick Actions
              </h4>
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onZoomIn}
                  iconName="ZoomIn"
                  iconPosition="left"
                  iconSize={14}
                >
                  Zoom In
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onZoomOut}
                  iconName="ZoomOut"
                  iconPosition="left"
                  iconSize={14}
                >
                  Zoom Out
                </Button>
              </div>
              
              <Button
                variant="secondary"
                size="sm"
                onClick={onResetView}
                iconName="RotateCcw"
                iconPosition="left"
                iconSize={14}
                className="w-full mt-2"
              >
                Reset View
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Zoom Controls (Always Visible) */}
      <div className="mt-3 bg-card border border-border rounded-lg shadow-lg">
        <div className="flex flex-col">
          <Button
            variant="ghost"
            size="icon"
            onClick={onZoomIn}
            className="w-12 h-12 rounded-b-none border-b border-border"
          >
            <Icon name="Plus" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onZoomOut}
            className="w-12 h-12 rounded-t-none"
          >
            <Icon name="Minus" size={16} />
          </Button>
        </div>
      </div>
      {/* Real-time Status Indicator */}
      {showRealTimeTracking && (
        <div className="mt-3 bg-success text-success-foreground px-3 py-2 rounded-lg shadow-lg flex items-center space-x-2">
          <div className="w-2 h-2 bg-success-foreground rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Live Tracking</span>
        </div>
      )}
    </div>
  );
};

export default FloatingControls;