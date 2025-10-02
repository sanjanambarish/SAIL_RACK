import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConflictDetection = ({ conflicts, onResolveConflict, onIgnoreConflict }) => {
  const getConflictIcon = (type) => {
    switch (type) {
      case 'scheduling': return 'Calendar';
      case 'capacity': return 'AlertTriangle';
      case 'route': return 'Route';
      case 'resource': return 'Truck';
      default: return 'AlertCircle';
    }
  };

  const getConflictColor = (severity) => {
    switch (severity) {
      case 'critical': return 'border-error bg-error/5 text-error';
      case 'high': return 'border-warning bg-warning/5 text-warning';
      case 'medium': return 'border-accent bg-accent/5 text-accent';
      default: return 'border-muted bg-muted/5 text-muted-foreground';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'AlertTriangle';
      case 'high': return 'AlertCircle';
      case 'medium': return 'Info';
      default: return 'HelpCircle';
    }
  };

  if (!conflicts || conflicts?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Conflict Detection</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-xs text-success">All Clear</span>
          </div>
        </div>
        <div className="text-center py-8">
          <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
          <p className="text-success font-medium mb-2">No Conflicts Detected</p>
          <p className="text-sm text-muted-foreground">
            Current formation plans are optimized and conflict-free
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Conflict Detection</h3>
          <p className="text-sm text-muted-foreground">
            {conflicts?.length} conflict{conflicts?.length !== 1 ? 's' : ''} detected
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
          <span className="text-xs text-error">Issues Found</span>
        </div>
      </div>
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {conflicts?.map(conflict => (
          <div
            key={conflict?.id}
            className={`border rounded-lg p-4 transition-all duration-200 ${
              getConflictColor(conflict?.severity)
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  conflict?.severity === 'critical' ? 'bg-error/10' :
                  conflict?.severity === 'high' ? 'bg-warning/10' : 'bg-accent/10'
                }`}>
                  <Icon 
                    name={getConflictIcon(conflict?.type)} 
                    size={20} 
                    className={
                      conflict?.severity === 'critical' ? 'text-error' :
                      conflict?.severity === 'high' ? 'text-warning' : 'text-accent'
                    }
                  />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{conflict?.title}</h4>
                  <div className="flex items-center space-x-2 text-xs">
                    <Icon 
                      name={getSeverityIcon(conflict?.severity)} 
                      size={12} 
                      className={
                        conflict?.severity === 'critical' ? 'text-error' :
                        conflict?.severity === 'high' ? 'text-warning' : 'text-accent'
                      }
                    />
                    <span className="capitalize text-muted-foreground">
                      {conflict?.severity} • {conflict?.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-foreground mb-4 leading-relaxed">
              {conflict?.description}
            </p>

            {/* Affected Resources */}
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-2">Affected Resources:</p>
              <div className="flex flex-wrap gap-2">
                {conflict?.affectedResources?.map((resource, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-xs rounded-full text-muted-foreground"
                  >
                    {resource}
                  </span>
                ))}
              </div>
            </div>

            {/* Suggested Resolution */}
            <div className="mb-4 p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-2">Suggested Resolution:</p>
              <p className="text-sm text-foreground">{conflict?.suggestedResolution}</p>
            </div>

            {/* Impact Assessment */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-sm font-bold text-error">
                  ₹{conflict?.costImpact?.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-muted-foreground">Cost Impact</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-warning">
                  {conflict?.timeImpact}h
                </p>
                <p className="text-xs text-muted-foreground">Time Delay</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-accent">
                  {conflict?.efficiencyImpact}%
                </p>
                <p className="text-xs text-muted-foreground">Efficiency Loss</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Clock" size={12} />
                <span>Detected {conflict?.detectedAt}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onIgnoreConflict && onIgnoreConflict(conflict?.id)}
                >
                  Ignore
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onResolveConflict && onResolveConflict(conflict)}
                  iconName="Wrench"
                  iconPosition="left"
                >
                  Resolve
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConflictDetection;