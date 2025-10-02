import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ 
  title, 
  value, 
  unit, 
  change, 
  changeType, 
  icon, 
  description,
  trend = [] 
}) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1 transition-hover hover:elevation-2">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground/80">{description}</p>
          </div>
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={16} />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-bold text-foreground">{value}</span>
        {unit && <span className="text-lg text-muted-foreground">{unit}</span>}
      </div>
      {trend?.length > 0 && (
        <div className="mt-4 h-8">
          <div className="flex items-end space-x-1 h-full">
            {trend?.map((point, index) => (
              <div
                key={index}
                className="bg-primary/20 rounded-sm flex-1"
                style={{ height: `${(point / Math.max(...trend)) * 100}%` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricCard;