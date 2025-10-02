import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const CostTrendChart = ({ data, title, isLoading = false }) => {
  const formatCurrency = (value) => {
    return `₹${(value / 100000)?.toFixed(1)}L`;
  };

  const formatTooltip = (value, name) => {
    if (name === 'actualCost' || name === 'projectedCost' || name === 'savings') {
      return [formatCurrency(value), name === 'actualCost' ? 'Actual Cost' : name === 'projectedCost' ? 'Projected Cost' : 'Savings'];
    }
    return [value, name];
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 elevation-1">
        <div className="flex items-center justify-center h-80">
          <div className="flex items-center space-x-3 text-muted-foreground">
            <Icon name="Loader2" size={24} className="animate-spin" />
            <span>Loading chart data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} />
          <span>{title}</span>
        </h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Actual Cost</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <span className="text-muted-foreground">Projected Cost</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Savings</span>
          </div>
        </div>
      </div>

      <div className="w-full h-80" aria-label="Cost Trend Analysis Chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              tickFormatter={formatCurrency}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
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
            <Line 
              type="monotone" 
              dataKey="actualCost" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              name="Actual Cost"
            />
            <Line 
              type="monotone" 
              dataKey="projectedCost" 
              stroke="var(--color-secondary)" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 4 }}
              name="Projected Cost"
            />
            <Line 
              type="monotone" 
              dataKey="savings" 
              stroke="var(--color-success)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
              name="Cost Savings"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CostTrendChart;