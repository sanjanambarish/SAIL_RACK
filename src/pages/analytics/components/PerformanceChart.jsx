import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceChart = ({ data, title, isLoading = false }) => {
  const formatPercentage = (value) => `${value}%`;

  const formatTooltip = (value, name) => {
    if (name === 'efficiency' || name === 'utilization' || name === 'onTime') {
      return [`${value}%`, name === 'efficiency' ? 'Operational Efficiency' : name === 'utilization' ? 'Rake Utilization' : 'On-Time Delivery'];
    }
    return [value, name];
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 elevation-1">
        <div className="flex items-center justify-center h-80">
          <div className="flex items-center space-x-3 text-muted-foreground">
            <Icon name="Loader2" size={24} className="animate-spin" />
            <span>Loading performance data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="BarChart3" size={20} />
          <span>{title}</span>
        </h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Efficiency</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-muted-foreground">Utilization</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-muted-foreground">On-Time</span>
          </div>
        </div>
      </div>

      <div className="w-full h-80" aria-label="Performance Metrics Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="period" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              tickFormatter={formatPercentage}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              domain={[0, 100]}
            />
            <Tooltip 
              formatter={formatTooltip}
              labelStyle={{ color: 'var(--color-foreground)' }}
              contentStyle={{
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar 
              dataKey="efficiency" 
              fill="var(--color-primary)" 
              name="Operational Efficiency"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="utilization" 
              fill="var(--color-accent)" 
              name="Rake Utilization"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="onTime" 
              fill="var(--color-success)" 
              name="On-Time Delivery"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;