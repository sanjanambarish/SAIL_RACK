import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusOverview = ({ realTimeData }) => {
  const statusCards = [
    {
      id: 'total-rakes',
      title: 'Total Rakes',
      value: '156',
      change: '+12',
      changeType: 'increase',
      icon: 'Train',
      color: 'primary',
      description: 'Active in network'
    },
    {
      id: 'utilization',
      title: 'Utilization Rate',
      value: '78%',
      change: '+5%',
      changeType: 'increase',
      icon: 'TrendingUp',
      color: 'success',
      description: 'Current efficiency'
    },
    {
      id: 'cost-savings',
      title: 'Cost Savings',
      value: '₹2.4M',
      change: '+₹340K',
      changeType: 'increase',
      icon: 'DollarSign',
      color: 'accent',
      description: 'This month'
    },
    {
      id: 'pending-orders',
      title: 'Pending Orders',
      value: '23',
      change: '-8',
      changeType: 'decrease',
      icon: 'AlertTriangle',
      color: 'warning',
      description: 'Awaiting dispatch'
    }
  ];

  const operationalStatus = [
    {
      id: 'stockyards',
      name: 'Stockyards',
      total: 4,
      active: 3,
      maintenance: 1,
      status: 'operational'
    },
    {
      id: 'routes',
      name: 'Active Routes',
      total: 12,
      active: 10,
      maintenance: 2,
      status: 'operational'
    },
    {
      id: 'wagons',
      name: 'Wagon Fleet',
      total: 550,
      active: 453,
      maintenance: 97,
      status: 'operational'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary/10 text-primary border-primary/20',
      success: 'bg-success/10 text-success border-success/20',
      accent: 'bg-accent/10 text-accent border-accent/20',
      warning: 'bg-warning/10 text-warning border-warning/20',
      error: 'bg-error/10 text-error border-error/20'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  const getChangeColor = (changeType) => {
    return changeType === 'increase' ? 'text-success' : 'text-error';
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusCards?.map((card) => (
          <div
            key={card?.id}
            className="bg-card border border-border rounded-lg p-4 elevation-1 hover:elevation-2 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg border ${getColorClasses(card?.color)}`}>
                <Icon name={card?.icon} size={20} />
              </div>
              <div className={`text-xs font-medium ${getChangeColor(card?.changeType)} flex items-center`}>
                <Icon 
                  name={card?.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                  size={12} 
                  className="mr-1" 
                />
                {card?.change}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">{card?.value}</h3>
              <p className="text-sm font-medium text-foreground">{card?.title}</p>
              <p className="text-xs text-muted-foreground">{card?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Operational Status */}
      <div className="bg-card border border-border rounded-lg p-4 elevation-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Activity" size={20} className="mr-2" />
            Operational Status
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Live Updates</span>
          </div>
        </div>

        <div className="space-y-4">
          {operationalStatus?.map((item) => (
            <div key={item?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    item?.status === 'operational' ? 'bg-success' : 'bg-warning'
                  }`}></div>
                  <span className="font-medium text-foreground">{item?.name}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                <div className="text-center">
                  <p className="font-medium text-foreground">{item?.active}</p>
                  <p className="text-xs text-muted-foreground">Active</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-warning">{item?.maintenance}</p>
                  <p className="text-xs text-muted-foreground">Maintenance</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-muted-foreground">{item?.total}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Real-time Updates */}
      <div className="bg-card border border-border rounded-lg p-4 elevation-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Radio" size={20} className="mr-2" />
            Recent Activity
          </h3>
          <span className="text-xs text-muted-foreground">
            Last updated: {new Date()?.toLocaleTimeString('en-IN')}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
            <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">RAKE-001 departed from Rourkela</p>
              <p className="text-xs text-muted-foreground">Destination: Mumbai • ETA: 14:30 • 2 minutes ago</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">New formation plan generated</p>
              <p className="text-xs text-muted-foreground">Route: Bhilai → Delhi • Cost saving: ₹156K • 5 minutes ago</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
            <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Stockyard B capacity updated</p>
              <p className="text-xs text-muted-foreground">Current: 8,750 tons • Utilization: 44% • 8 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusOverview;