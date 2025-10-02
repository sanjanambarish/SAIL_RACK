import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const UtilizationDonutChart = ({ data, title, isLoading = false }) => {
  const COLORS = [
    'var(--color-success)',
    'var(--color-primary)',
    'var(--color-warning)',
    'var(--color-error)',
    'var(--color-accent)'
  ];

  const formatTooltip = (value, name) => {
    return [`${value}%`, name];
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100)?.toFixed(0)}%`}
      </text>
    );
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 elevation-1">
        <div className="flex items-center justify-center h-80">
          <div className="flex items-center space-x-3 text-muted-foreground">
            <Icon name="Loader2" size={24} className="animate-spin" />
            <span>Loading utilization data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="PieChart" size={20} />
          <span>{title}</span>
        </h3>
        <div className="text-sm text-muted-foreground">
          Total Capacity Utilization
        </div>
      </div>
      <div className="w-full h-80" aria-label="Rake Utilization Distribution Chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={100}
              innerRadius={60}
              fill="#8884d8"
              dataKey="value"
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={formatTooltip}
              contentStyle={{
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              wrapperStyle={{ fontSize: '12px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {data?.map((item, index) => (
          <div key={item?.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
              ></div>
              <span className="text-sm font-medium text-foreground">{item?.name}</span>
            </div>
            <span className="text-sm font-bold text-foreground">{item?.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UtilizationDonutChart;