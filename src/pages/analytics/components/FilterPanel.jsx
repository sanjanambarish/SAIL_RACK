import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onExport, 
  onRefresh,
  isLoading = false 
}) => {
  const dateRangeOptions = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const stockyardOptions = [
    { value: 'all', label: 'All Stockyards' },
    { value: 'rourkela', label: 'Rourkela Steel Plant' },
    { value: 'bhilai', label: 'Bhilai Steel Plant' },
    { value: 'bokaro', label: 'Bokaro Steel Plant' },
    { value: 'durgapur', label: 'Durgapur Steel Plant' },
    { value: 'burnpur', label: 'IISCO Steel Plant' }
  ];

  const customerSegmentOptions = [
    { value: 'all', label: 'All Customers' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'construction', label: 'Construction' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'export', label: 'Export' }
  ];

  const formationTypeOptions = [
    { value: 'all', label: 'All Formation Types' },
    { value: 'full', label: 'Full Rake (58 wagons)' },
    { value: 'partial', label: 'Partial Rake (29-57 wagons)' },
    { value: 'mixed', label: 'Mixed Load' },
    { value: 'express', label: 'Express Formation' }
  ];

  const exportOptions = [
    { value: 'pdf', label: 'Export as PDF' },
    { value: 'excel', label: 'Export as Excel' },
    { value: 'csv', label: 'Export as CSV' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <span>Analytics Filters</span>
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            loading={isLoading}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Refresh
          </Button>
          <Select
            options={exportOptions}
            placeholder="Export Report"
            value=""
            onChange={(value) => onExport(value)}
            className="w-40"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => onFilterChange('dateRange', value)}
          className="w-full"
        />

        <Select
          label="Stockyard"
          options={stockyardOptions}
          value={filters?.stockyard}
          onChange={(value) => onFilterChange('stockyard', value)}
          className="w-full"
        />

        <Select
          label="Customer Segment"
          options={customerSegmentOptions}
          value={filters?.customerSegment}
          onChange={(value) => onFilterChange('customerSegment', value)}
          className="w-full"
        />

        <Select
          label="Formation Type"
          options={formationTypeOptions}
          value={filters?.formationType}
          onChange={(value) => onFilterChange('formationType', value)}
          className="w-full"
        />
      </div>
      {filters?.dateRange === 'custom' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Start Date</label>
            <input
              type="date"
              value={filters?.startDate || ''}
              onChange={(e) => onFilterChange('startDate', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">End Date</label>
            <input
              type="date"
              value={filters?.endDate || ''}
              onChange={(e) => onFilterChange('endDate', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;