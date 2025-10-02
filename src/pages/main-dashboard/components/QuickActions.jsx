import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onGeneratePlan, onOptimize }) => {
  const navigate = useNavigate();

  const quickActionItems = [
    {
      id: 'map-view',
      title: 'Full Map View',
      description: 'Open detailed interactive map',
      icon: 'Map',
      action: () => navigate('/map-view'),
      variant: 'outline'
    },
    {
      id: 'formation-plan',
      title: 'Formation Planning',
      description: 'Create detailed rake formations',
      icon: 'Calendar',
      action: () => navigate('/formation-plan'),
      variant: 'outline'
    },
    {
      id: 'analytics',
      title: 'View Analytics',
      description: 'Comprehensive performance metrics',
      icon: 'BarChart3',
      action: () => navigate('/analytics'),
      variant: 'outline'
    },
    {
      id: 'timeline',
      title: 'Timeline View',
      description: 'Schedule and dispatch timeline',
      icon: 'Clock',
      action: () => navigate('/timeline-view'),
      variant: 'outline'
    }
  ];

  const primaryActions = [
    {
      id: 'generate',
      title: 'Generate Plan',
      description: 'AI-powered rake formation',
      icon: 'Zap',
      action: onGeneratePlan,
      variant: 'default'
    },
    {
      id: 'optimize',
      title: 'Optimize Routes',
      description: 'Enhance current formations',
      icon: 'Settings',
      action: onOptimize,
      variant: 'secondary'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Zap" size={20} className="mr-2" />
          Quick Actions
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground">System Active</span>
        </div>
      </div>
      {/* Primary Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {primaryActions?.map((action) => (
          <Button
            key={action?.id}
            variant={action?.variant}
            onClick={action?.action}
            iconName={action?.icon}
            iconPosition="left"
            className="h-auto p-4 flex-col items-start text-left"
          >
            <div className="w-full">
              <div className="font-medium mb-1">{action?.title}</div>
              <div className="text-xs opacity-80">{action?.description}</div>
            </div>
          </Button>
        ))}
      </div>
      {/* Navigation Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {quickActionItems?.map((item) => (
          <Button
            key={item?.id}
            variant={item?.variant}
            size="sm"
            onClick={item?.action}
            iconName={item?.icon}
            iconPosition="left"
            className="h-auto p-3 flex-col items-center text-center"
          >
            <div className="text-xs font-medium">{item?.title}</div>
          </Button>
        ))}
      </div>
      {/* Status Indicators */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-success">156</p>
            <p className="text-xs text-muted-foreground">Active Rakes</p>
          </div>
          <div>
            <p className="text-lg font-bold text-primary">78%</p>
            <p className="text-xs text-muted-foreground">Utilization</p>
          </div>
          <div>
            <p className="text-lg font-bold text-accent">₹2.4M</p>
            <p className="text-xs text-muted-foreground">Savings</p>
          </div>
          <div>
            <p className="text-lg font-bold text-warning">23</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;