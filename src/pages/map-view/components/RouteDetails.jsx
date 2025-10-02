import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RouteDetails = ({ route, onClose, onOptimize }) => {
  if (!route) return null;

  const mockRouteDetails = {
    id: route?.id,
    name: `Route ${route?.id?.toUpperCase()}`,
    from: 'Rourkela Steel Plant',
    to: 'Mumbai Port',
    distance: route?.distance || 1250,
    estimatedTime: '18 hours 30 minutes',
    cost: route?.cost || 125000,
    priority: route?.priority || 'high',
    status: 'active',
    rakes: [
      {
        id: 'rake001',
        status: 'in_transit',
        progress: 65,
        eta: '2025-01-14 18:30',
        cargo: 'Steel Coils - 1200 tons'
      }
    ],
    waypoints: [
      { name: 'Rourkela Junction', time: '00:00', status: 'completed' },
      { name: 'Jharsuguda', time: '02:30', status: 'completed' },
      { name: 'Bilaspur', time: '06:15', status: 'completed' },
      { name: 'Nagpur', time: '11:45', status: 'current' },
      { name: 'Pune', time: '16:20', status: 'pending' },
      { name: 'Mumbai Port', time: '18:30', status: 'pending' }
    ],
    metrics: {
      fuelEfficiency: '2.8 km/l',
      carbonFootprint: '450 kg CO2',
      utilizationRate: '95%',
      onTimePerformance: '87%'
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'current': return 'text-warning';
      case 'pending': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'current': return 'Clock';
      case 'pending': return 'Circle';
      default: return 'Circle';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-popover border border-border rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Route" size={24} color="white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-popover-foreground">{mockRouteDetails?.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {mockRouteDetails?.from} → {mockRouteDetails?.to}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Route Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Distance</span>
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
              </div>
              <p className="text-xl font-bold text-foreground">{mockRouteDetails?.distance}</p>
              <p className="text-xs text-muted-foreground">kilometers</p>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Est. Time</span>
                <Icon name="Clock" size={16} className="text-muted-foreground" />
              </div>
              <p className="text-lg font-bold text-foreground">18h 30m</p>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Cost</span>
                <Icon name="IndianRupee" size={16} className="text-muted-foreground" />
              </div>
              <p className="text-xl font-bold text-foreground">₹{mockRouteDetails?.cost?.toLocaleString('en-IN')}</p>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Priority</span>
                <Icon name="AlertTriangle" size={16} className="text-muted-foreground" />
              </div>
              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize ${
                mockRouteDetails?.priority === 'high' ? 'bg-warning/10 text-warning' :
                mockRouteDetails?.priority === 'medium'? 'bg-success/10 text-success' : 'bg-muted-foreground/10 text-muted-foreground'
              }`}>
                {mockRouteDetails?.priority}
              </span>
            </div>
          </div>

          {/* Active Rakes */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-popover-foreground mb-3 flex items-center">
              <Icon name="Train" size={20} className="mr-2" />
              Active Rakes on Route
            </h3>
            <div className="space-y-3">
              {mockRouteDetails?.rakes?.map((rake) => (
                <div key={rake?.id} className="bg-muted rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                        <Icon name="Train" size={16} color="white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Rake {rake?.id?.toUpperCase()}</p>
                        <p className="text-sm text-muted-foreground">{rake?.cargo}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">ETA: {rake?.eta}</p>
                      <p className="text-xs text-muted-foreground capitalize">{rake?.status?.replace('_', ' ')}</p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className="bg-success h-2 rounded-full transition-all duration-300"
                      style={{ width: `${rake?.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{rake?.progress}% Complete</p>
                </div>
              ))}
            </div>
          </div>

          {/* Route Waypoints */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-popover-foreground mb-3 flex items-center">
              <Icon name="Navigation" size={20} className="mr-2" />
              Route Waypoints
            </h3>
            <div className="space-y-3">
              {mockRouteDetails?.waypoints?.map((waypoint, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Icon 
                      name={getStatusIcon(waypoint?.status)} 
                      size={20} 
                      className={getStatusColor(waypoint?.status)}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground">{waypoint?.name}</p>
                      <p className="text-sm text-muted-foreground">{waypoint?.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-popover-foreground mb-3 flex items-center">
              <Icon name="BarChart3" size={20} className="mr-2" />
              Performance Metrics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Fuel Efficiency</span>
                  <Icon name="Fuel" size={14} className="text-muted-foreground" />
                </div>
                <p className="text-lg font-bold text-foreground">{mockRouteDetails?.metrics?.fuelEfficiency}</p>
              </div>

              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Carbon Footprint</span>
                  <Icon name="Leaf" size={14} className="text-muted-foreground" />
                </div>
                <p className="text-lg font-bold text-foreground">{mockRouteDetails?.metrics?.carbonFootprint}</p>
              </div>

              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Utilization Rate</span>
                  <Icon name="TrendingUp" size={14} className="text-muted-foreground" />
                </div>
                <p className="text-lg font-bold text-foreground">{mockRouteDetails?.metrics?.utilizationRate}</p>
              </div>

              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">On-Time Performance</span>
                  <Icon name="Target" size={14} className="text-muted-foreground" />
                </div>
                <p className="text-lg font-bold text-foreground">{mockRouteDetails?.metrics?.onTimePerformance}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-border">
            <Button
              variant="default"
              onClick={() => onOptimize(route)}
              iconName="Zap"
              iconPosition="left"
              iconSize={16}
              className="flex-1"
            >
              Optimize Route
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              iconName="Eye"
              iconPosition="left"
              iconSize={16}
              className="flex-1"
            >
              View Timeline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteDetails;