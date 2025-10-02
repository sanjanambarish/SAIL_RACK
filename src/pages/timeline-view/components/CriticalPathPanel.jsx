import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CriticalPathPanel = ({ criticalPathData, onOptimize, onViewDetails }) => {
  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getImpactIcon = (impact) => {
    switch (impact) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'AlertCircle';
      case 'low': return 'Info';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-warning rounded-lg">
            <Icon name="TrendingUp" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Critical Path Analysis</h3>
            <p className="text-sm text-muted-foreground">Bottlenecks & Optimization Opportunities</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onOptimize}
          iconName="Zap"
          iconPosition="left"
        >
          Optimize
        </Button>
      </div>
      <div className="space-y-4">
        {criticalPathData?.map((item) => (
          <div
            key={item?.id}
            className="border border-border rounded-lg p-4 hover:elevation-1 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={getImpactIcon(item?.impact)} 
                  size={20} 
                  className={getImpactColor(item?.impact)} 
                />
                <div>
                  <h4 className="font-medium text-foreground">{item?.title}</h4>
                  <p className="text-sm text-muted-foreground">{item?.description}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-sm font-medium ${getImpactColor(item?.impact)}`}>
                  {item?.impact?.charAt(0)?.toUpperCase() + item?.impact?.slice(1)} Impact
                </span>
                <p className="text-xs text-muted-foreground">{item?.affectedRakes} rakes affected</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Clock" size={16} className="text-warning" />
                  <span className="text-sm font-medium text-foreground">Delay Impact</span>
                </div>
                <p className="text-lg font-semibold text-foreground">{item?.delayImpact}</p>
                <p className="text-xs text-muted-foreground">Average delay increase</p>
              </div>

              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="DollarSign" size={16} className="text-error" />
                  <span className="text-sm font-medium text-foreground">Cost Impact</span>
                </div>
                <p className="text-lg font-semibold text-foreground">₹{item?.costImpact}</p>
                <p className="text-xs text-muted-foreground">Additional operational cost</p>
              </div>

              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Users" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Customer Impact</span>
                </div>
                <p className="text-lg font-semibold text-foreground">{item?.customerImpact}</p>
                <p className="text-xs text-muted-foreground">Customers affected</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Route: {item?.route}</span>
                <span>•</span>
                <span>Priority: {item?.priority}</span>
                <span>•</span>
                <span>ETA: {item?.estimatedResolution}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(item)}
                  iconName="Eye"
                  iconPosition="left"
                >
                  View Details
                </Button>
                {item?.hasRecommendation && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Lightbulb"
                    iconPosition="left"
                  >
                    View Recommendation
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {criticalPathData?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No Critical Issues</h4>
          <p className="text-muted-foreground">All schedules are running optimally</p>
        </div>
      )}
    </div>
  );
};

export default CriticalPathPanel;