import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const DeliveryAnalysisChart = ({ data, title, isLoading = false }) => {
  const formatTooltip = (value, name) => {
    if (name === 'planned' || name === 'actual') {
      return [value, name === 'planned' ? 'Planned Deliveries' : 'Actual Deliveries'];
    }
    if (name === 'variance') {
      return [`${value}%`, 'Variance'];
    }
    return [value, name];
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 elevation-1">
        <div className="flex items-center justify-center h-80">
          <div className="flex items-center space-x-3 text-muted-foreground">
            <Icon name="Loader2" size={24} className="animate-spin" />
            <span>Loading delivery analysis...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Clock" size={20} />
          <span>{title}</span>
        </h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Planned</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Actual</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-muted-foreground">Variance</span>
          </div>
        </div>
      </div>

      <div className="w-full h-80" aria-label="Planned vs Actual Delivery Analysis Chart">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="week" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              yAxisId="left"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `${value}%`}
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
              yAxisId="left"
              dataKey="planned" 
              fill="var(--color-primary)" 
              name="Planned Deliveries"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              yAxisId="left"
              dataKey="actual" 
              fill="var(--color-success)" 
              name="Actual Deliveries"
              radius={[2, 2, 0, 0]}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="variance" 
              stroke="var(--color-warning)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 5 }}
              name="Variance %"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DeliveryAnalysisChart;