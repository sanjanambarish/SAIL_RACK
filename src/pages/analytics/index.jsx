import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MetricCard from './components/MetricCard';
import FilterPanel from './components/FilterPanel';
import CostTrendChart from './components/CostTrendChart';
import PerformanceChart from './components/PerformanceChart';
import DeliveryAnalysisChart from './components/DeliveryAnalysisChart';
import UtilizationDonutChart from './components/UtilizationDonutChart';
import Icon from '../../components/AppIcon';

const Analytics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: '30d',
    stockyard: 'all',
    customerSegment: 'all',
    formationType: 'all',
    startDate: '',
    endDate: ''
  });

  // Mock data for KPI cards
  const kpiData = [
    {
      title: 'Total Cost Savings',
      value: '₹2.4',
      unit: 'Cr',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'TrendingUp',
      description: 'Monthly savings achieved',
      trend: [85, 92, 78, 95, 88, 96, 100]
    },
    {
      title: 'Operational Efficiency',
      value: '94.2',
      unit: '%',
      change: '+3.8%',
      changeType: 'positive',
      icon: 'Zap',
      description: 'Overall system efficiency',
      trend: [88, 90, 89, 92, 91, 93, 94]
    },
    {
      title: 'Rake Utilization',
      value: '87.6',
      unit: '%',
      change: '+5.2%',
      changeType: 'positive',
      icon: 'Train',
      description: 'Average capacity utilization',
      trend: [82, 84, 83, 85, 86, 87, 88]
    },
    {
      title: 'Formation Time',
      value: '4.2',
      unit: 'hrs',
      change: '-18.3%',
      changeType: 'positive',
      icon: 'Clock',
      description: 'Average formation time',
      trend: [5.2, 4.8, 4.9, 4.5, 4.3, 4.1, 4.2]
    },
    {
      title: 'On-Time Delivery',
      value: '91.8',
      unit: '%',
      change: '+2.1%',
      changeType: 'positive',
      icon: 'CheckCircle',
      description: 'Delivery performance',
      trend: [89, 90, 88, 91, 90, 92, 92]
    },
    {
      title: 'Cost per Ton',
      value: '₹1,245',
      unit: '',
      change: '-8.7%',
      changeType: 'positive',
      icon: 'DollarSign',
      description: 'Transportation cost efficiency',
      trend: [1380, 1350, 1320, 1290, 1270, 1250, 1245]
    }
  ];

  // Mock data for cost trend chart
  const costTrendData = [
    { date: '01 Sep', actualCost: 2800000, projectedCost: 3200000, savings: 400000 },
    { date: '08 Sep', actualCost: 2650000, projectedCost: 3100000, savings: 450000 },
    { date: '15 Sep', actualCost: 2750000, projectedCost: 3250000, savings: 500000 },
    { date: '22 Sep', actualCost: 2600000, projectedCost: 3000000, savings: 400000 },
    { date: '29 Sep', actualCost: 2550000, projectedCost: 2950000, savings: 400000 }
  ];

  // Mock data for performance chart
  const performanceData = [
    { period: 'Week 1', efficiency: 92, utilization: 85, onTime: 89 },
    { period: 'Week 2', efficiency: 94, utilization: 87, onTime: 91 },
    { period: 'Week 3', efficiency: 91, utilization: 89, onTime: 88 },
    { period: 'Week 4', efficiency: 96, utilization: 91, onTime: 94 }
  ];

  // Mock data for delivery analysis
  const deliveryData = [
    { week: 'Week 1', planned: 45, actual: 42, variance: -6.7 },
    { week: 'Week 2', planned: 48, actual: 50, variance: 4.2 },
    { week: 'Week 3', planned: 52, actual: 49, variance: -5.8 },
    { week: 'Week 4', planned: 46, actual: 48, variance: 4.3 }
  ];

  // Mock data for utilization donut chart
  const utilizationData = [
    { name: 'Full Load (58 wagons)', value: 45 },
    { name: 'Partial Load (40-57)', value: 28 },
    { name: 'Mixed Load', value: 15 },
    { name: 'Express Formation', value: 8 },
    { name: 'Maintenance', value: 4 }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleExport = (format) => {
    setIsLoading(true);
    // Simulate export process
    setTimeout(() => {
      setIsLoading(false);
      alert(`Exporting analytics report as ${format?.toUpperCase()}...`);
    }, 2000);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    // Simulate initial data loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
                  <Icon name="BarChart3" size={32} className="text-primary" />
                  <span>Analytics Dashboard</span>
                </h1>
                <p className="text-muted-foreground mt-2">
                  Comprehensive performance metrics and cost optimization insights for railway operations
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Calendar" size={16} />
                <span>Last updated: {new Date()?.toLocaleDateString('en-IN', { 
                  day: '2-digit', 
                  month: 'short', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onExport={handleExport}
            onRefresh={handleRefresh}
            isLoading={isLoading}
          />

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {kpiData?.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                unit={metric?.unit}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                description={metric?.description}
                trend={metric?.trend}
              />
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <CostTrendChart
              data={costTrendData}
              title="Cost Trend Analysis"
              isLoading={isLoading}
            />
            <PerformanceChart
              data={performanceData}
              title="Performance Metrics"
              isLoading={isLoading}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <DeliveryAnalysisChart
              data={deliveryData}
              title="Planned vs Actual Deliveries"
              isLoading={isLoading}
            />
            <UtilizationDonutChart
              data={utilizationData}
              title="Rake Utilization Distribution"
              isLoading={isLoading}
            />
          </div>

          {/* Additional Insights Section */}
          <div className="bg-card border border-border rounded-lg p-6 elevation-1">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
              <Icon name="Lightbulb" size={20} />
              <span>Key Insights & Recommendations</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="TrendingUp" size={20} className="text-success mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground">Cost Optimization</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Formation optimization has achieved 12.5% cost reduction this month through improved load planning.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="AlertTriangle" size={20} className="text-warning mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground">Capacity Alert</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Rourkela stockyard showing 95% capacity utilization. Consider load balancing with nearby facilities.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="Target" size={20} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground">Performance Target</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      On-time delivery rate improved to 91.8%. Target of 95% achievable with route optimization.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;