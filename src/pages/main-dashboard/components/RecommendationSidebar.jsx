import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const RecommendationSidebar = ({ isOpen, onToggle, onGeneratePlan, onOptimize }) => {
  const [activeTab, setActiveTab] = useState('recommendations');

  const recommendedPlans = [
    {
      id: 'plan001',
      rakeId: 'RAKE-001',
      route: 'Rourkela → Mumbai',
      wagons: 58,
      capacity: 3480,
      costSaving: 125000,
      timeSaving: 4.5,
      priority: 'high',
      efficiency: 94
    },
    {
      id: 'plan002',
      rakeId: 'RAKE-002',
      route: 'Durgapur → Chennai',
      wagons: 45,
      capacity: 2700,
      costSaving: 89000,
      timeSaving: 3.2,
      priority: 'medium',
      efficiency: 87
    },
    {
      id: 'plan003',
      rakeId: 'RAKE-003',
      route: 'Bhilai → Delhi',
      wagons: 62,
      capacity: 3720,
      costSaving: 156000,
      timeSaving: 5.8,
      priority: 'high',
      efficiency: 96
    }
  ];

  const costSavingsData = [
    { name: 'Jan', savings: 450000 },
    { name: 'Feb', savings: 520000 },
    { name: 'Mar', savings: 480000 },
    { name: 'Apr', savings: 610000 },
    { name: 'May', savings: 580000 },
    { name: 'Jun', savings: 670000 }
  ];

  const utilizationData = [
    { name: 'Utilized', value: 78, color: '#059669' },
    { name: 'Available', value: 22, color: '#E2E8F0' }
  ];

  const wagonUtilization = [
    { type: 'BOX', total: 150, used: 127, percentage: 85 },
    { type: 'BOXN', total: 200, used: 156, percentage: 78 },
    { type: 'BCN', total: 120, used: 98, percentage: 82 },
    { type: 'BRN', total: 80, used: 72, percentage: 90 }
  ];

  const handlePlanSelect = (planId) => {
    console.log('Selected plan:', planId);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex flex-col w-96 bg-card border-l border-border h-full transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Target" size={20} className="mr-2" />
            Recommendations
          </h2>
          <Button variant="ghost" size="icon" onClick={onToggle}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'recommendations' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Plans
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'analytics' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Analytics
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === 'recommendations' && (
            <div className="p-4 space-y-4">
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="default"
                  onClick={onGeneratePlan}
                  iconName="Zap"
                  iconPosition="left"
                  className="w-full"
                >
                  Generate Plan
                </Button>
                <Button
                  variant="outline"
                  onClick={onOptimize}
                  iconName="Settings"
                  iconPosition="left"
                  className="w-full"
                >
                  Optimize
                </Button>
              </div>

              {/* Recommended Plans */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground">Recommended Formation Plans</h3>
                {recommendedPlans?.map((plan) => (
                  <div
                    key={plan?.id}
                    className="bg-muted rounded-lg p-3 border border-border hover:border-primary/50 transition-colors cursor-pointer"
                    onClick={() => handlePlanSelect(plan?.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-foreground">{plan?.rakeId}</h4>
                        <p className="text-xs text-muted-foreground">{plan?.route}</p>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        plan?.priority === 'high' ?'bg-error/10 text-error' :'bg-accent/10 text-accent'
                      }`}>
                        {plan?.priority}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-muted-foreground">Wagons</p>
                        <p className="font-medium">{plan?.wagons}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Capacity</p>
                        <p className="font-medium">{plan?.capacity}T</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Cost Saving</p>
                        <p className="font-medium text-success">₹{plan?.costSaving?.toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Time Saving</p>
                        <p className="font-medium text-success">{plan?.timeSaving}h</p>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Efficiency</span>
                        <span className="font-medium">{plan?.efficiency}%</span>
                      </div>
                      <div className="w-full bg-border rounded-full h-1.5">
                        <div
                          className="bg-success h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${plan?.efficiency}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Wagon Utilization */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground">Wagon Utilization</h3>
                <div className="space-y-2">
                  {wagonUtilization?.map((wagon) => (
                    <div key={wagon?.type} className="bg-muted rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{wagon?.type}</span>
                        <span className="text-xs text-muted-foreground">
                          {wagon?.used}/{wagon?.total}
                        </span>
                      </div>
                      <div className="w-full bg-border rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${wagon?.percentage}%` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {wagon?.percentage}% utilized
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="p-4 space-y-6">
              {/* Cost Savings Chart */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground">Monthly Cost Savings</h3>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={costSavingsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                        axisLine={{ stroke: 'var(--color-border)' }}
                      />
                      <YAxis 
                        tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                        axisLine={{ stroke: 'var(--color-border)' }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'var(--color-card)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px'
                        }}
                        formatter={(value) => [`₹${value?.toLocaleString('en-IN')}`, 'Savings']}
                      />
                      <Bar dataKey="savings" fill="var(--color-success)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Overall Utilization */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground">Overall Utilization</h3>
                <div className="h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={utilizationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={60}
                        dataKey="value"
                      >
                        {utilizationData?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry?.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Utilization']}
                        contentStyle={{
                          backgroundColor: 'var(--color-card)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">78%</p>
                  <p className="text-sm text-muted-foreground">Current Utilization</p>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-success">₹2.4M</p>
                  <p className="text-xs text-muted-foreground">Total Savings</p>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-primary">156</p>
                  <p className="text-xs text-muted-foreground">Active Rakes</p>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-accent">94%</p>
                  <p className="text-xs text-muted-foreground">Avg Efficiency</p>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-warning">23h</p>
                  <p className="text-xs text-muted-foreground">Time Saved</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={onToggle}>
          <div className="fixed right-0 top-0 h-full w-80 bg-card" onClick={(e) => e?.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground flex items-center">
                <Icon name="Target" size={20} className="mr-2" />
                Recommendations
              </h2>
              <Button variant="ghost" size="icon" onClick={onToggle}>
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="flex border-b border-border">
              <button
                onClick={() => setActiveTab('recommendations')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'recommendations' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                Plans
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'analytics' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                Analytics
              </button>
            </div>

            <div className="overflow-y-auto" style={{ height: 'calc(100vh - 120px)' }}>
              {activeTab === 'recommendations' ? (
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="default"
                      onClick={onGeneratePlan}
                      iconName="Zap"
                      iconPosition="left"
                      className="w-full"
                    >
                      Generate
                    </Button>
                    <Button
                      variant="outline"
                      onClick={onOptimize}
                      iconName="Settings"
                      iconPosition="left"
                      className="w-full"
                    >
                      Optimize
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-foreground">Recommended Plans</h3>
                    {recommendedPlans?.slice(0, 2)?.map((plan) => (
                      <div
                        key={plan?.id}
                        className="bg-muted rounded-lg p-3 border border-border"
                        onClick={() => handlePlanSelect(plan?.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-foreground">{plan?.rakeId}</h4>
                            <p className="text-xs text-muted-foreground">{plan?.route}</p>
                          </div>
                          <div className={`px-2 py-1 rounded text-xs font-medium ${
                            plan?.priority === 'high' ?'bg-error/10 text-error' :'bg-accent/10 text-accent'
                          }`}>
                            {plan?.priority}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <p className="text-muted-foreground">Cost Saving</p>
                            <p className="font-medium text-success">₹{plan?.costSaving?.toLocaleString('en-IN')}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Efficiency</p>
                            <p className="font-medium">{plan?.efficiency}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-success">₹2.4M</p>
                      <p className="text-xs text-muted-foreground">Total Savings</p>
                    </div>
                    <div className="bg-muted rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-primary">78%</p>
                      <p className="text-xs text-muted-foreground">Utilization</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecommendationSidebar;