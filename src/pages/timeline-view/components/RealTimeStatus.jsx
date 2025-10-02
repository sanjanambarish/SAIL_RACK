import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RealTimeStatus = ({ realTimeData, onRakeSelect }) => {
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'moving': return 'Navigation';
      case 'loading': return 'Package';
      case 'unloading': return 'PackageOpen';
      case 'waiting': return 'Clock';
      case 'maintenance': return 'Wrench';
      default: return 'Train';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'moving': return 'text-success';
      case 'loading': return 'text-warning';
      case 'unloading': return 'text-primary';
      case 'waiting': return 'text-muted-foreground';
      case 'maintenance': return 'text-error';
      default: return 'text-secondary';
    }
  };

  const formatLastUpdate = () => {
    return lastUpdate?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-success rounded-lg">
            <Icon name="Radio" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Real-Time Status</h3>
            <p className="text-sm text-muted-foreground">Live rake positions & updates</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span>Last update: {formatLastUpdate()}</span>
        </div>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {realTimeData?.map((rake) => (
          <div
            key={rake?.id}
            className="border border-border rounded-lg p-4 hover:elevation-1 transition-all cursor-pointer"
            onClick={() => onRakeSelect(rake)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={getStatusIcon(rake?.status)} 
                  size={20} 
                  className={getStatusColor(rake?.status)} 
                />
                <div>
                  <h4 className="font-medium text-foreground">{rake?.rakeId}</h4>
                  <p className="text-sm text-muted-foreground">{rake?.route}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-sm font-medium ${getStatusColor(rake?.status)}`}>
                  {rake?.status?.charAt(0)?.toUpperCase() + rake?.status?.slice(1)}
                </span>
                <p className="text-xs text-muted-foreground">{rake?.location}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="MapPin" size={14} className="text-primary" />
                  <span className="text-xs font-medium text-foreground">Current Position</span>
                </div>
                <p className="text-sm text-foreground">{rake?.currentPosition}</p>
                <p className="text-xs text-muted-foreground">Km {rake?.kmFromOrigin} from origin</p>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Clock" size={14} className="text-warning" />
                  <span className="text-xs font-medium text-foreground">ETA</span>
                </div>
                <p className="text-sm text-foreground">{rake?.estimatedArrival}</p>
                <p className="text-xs text-muted-foreground">
                  {rake?.delayMinutes > 0 ? `+${rake?.delayMinutes}min delay` : 'On time'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>Speed: {rake?.currentSpeed} km/h</span>
                <span>•</span>
                <span>Load: {rake?.loadPercentage}%</span>
                <span>•</span>
                <span>Wagons: {rake?.wagonCount}</span>
              </div>
              <div className="flex items-center space-x-1">
                {rake?.hasAlert && (
                  <Icon name="AlertTriangle" size={16} className="text-warning" />
                )}
                {rake?.isTracked && (
                  <Icon name="Satellite" size={16} className="text-success" />
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Journey Progress</span>
                <span>{rake?.progressPercentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${rake?.progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {realTimeData?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Satellite" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No Active Rakes</h4>
          <p className="text-muted-foreground">No rakes currently in transit</p>
        </div>
      )}
    </div>
  );
};

export default RealTimeStatus;