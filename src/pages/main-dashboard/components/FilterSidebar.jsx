import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterSidebar = ({ isOpen, onToggle, filters, onFiltersChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const stockyardOptions = [
    { value: 'all', label: 'All Stockyards' },
    { value: 'sy001', label: 'Stockyard A - Rourkela' },
    { value: 'sy002', label: 'Stockyard B - Durgapur' },
    { value: 'sy003', label: 'Stockyard C - Bokaro' },
    { value: 'sy004', label: 'Stockyard D - Bhilai' }
  ];

  const shiftOptions = [
    { value: 'all', label: 'All Shifts' },
    { value: 'morning', label: 'Morning (06:00-14:00)' },
    { value: 'evening', label: 'Evening (14:00-22:00)' },
    { value: 'night', label: 'Night (22:00-06:00)' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      dateFrom: '',
      dateTo: '',
      shift: 'all',
      stockyard: 'all',
      priority: 'all'
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex flex-col w-80 bg-card border-r border-border h-full transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Filter" size={20} className="mr-2" />
            Filters & Controls
          </h2>
          <Button variant="ghost" size="icon" onClick={onToggle}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Date Range Filter */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground flex items-center">
              <Icon name="Calendar" size={16} className="mr-2" />
              Date Range
            </h3>
            <div className="space-y-3">
              <Input
                label="From Date"
                type="date"
                value={localFilters?.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
                className="w-full"
              />
              <Input
                label="To Date"
                type="date"
                value={localFilters?.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Shift Filter */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground flex items-center">
              <Icon name="Clock" size={16} className="mr-2" />
              Shift Selection
            </h3>
            <Select
              options={shiftOptions}
              value={localFilters?.shift}
              onChange={(value) => handleFilterChange('shift', value)}
              placeholder="Select shift"
            />
          </div>

          {/* Stockyard Filter */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground flex items-center">
              <Icon name="MapPin" size={16} className="mr-2" />
              Stockyard
            </h3>
            <Select
              options={stockyardOptions}
              value={localFilters?.stockyard}
              onChange={(value) => handleFilterChange('stockyard', value)}
              placeholder="Select stockyard"
            />
          </div>

          {/* Priority Filter */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground flex items-center">
              <Icon name="AlertTriangle" size={16} className="mr-2" />
              Order Priority
            </h3>
            <Select
              options={priorityOptions}
              value={localFilters?.priority}
              onChange={(value) => handleFilterChange('priority', value)}
              placeholder="Select priority"
            />
          </div>

          {/* Active Filters Summary */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Active Filters</h3>
            <div className="space-y-2">
              {localFilters?.dateFrom && (
                <div className="flex items-center justify-between bg-muted p-2 rounded-md">
                  <span className="text-xs text-muted-foreground">From: {localFilters?.dateFrom}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleFilterChange('dateFrom', '')}
                    className="h-4 w-4"
                  >
                    <Icon name="X" size={12} />
                  </Button>
                </div>
              )}
              {localFilters?.dateTo && (
                <div className="flex items-center justify-between bg-muted p-2 rounded-md">
                  <span className="text-xs text-muted-foreground">To: {localFilters?.dateTo}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleFilterChange('dateTo', '')}
                    className="h-4 w-4"
                  >
                    <Icon name="X" size={12} />
                  </Button>
                </div>
              )}
              {localFilters?.shift !== 'all' && (
                <div className="flex items-center justify-between bg-muted p-2 rounded-md">
                  <span className="text-xs text-muted-foreground">
                    Shift: {shiftOptions?.find(s => s?.value === localFilters?.shift)?.label}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleFilterChange('shift', 'all')}
                    className="h-4 w-4"
                  >
                    <Icon name="X" size={12} />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="w-full"
            iconName="RotateCcw"
            iconPosition="left"
          >
            Clear All Filters
          </Button>
        </div>
      </div>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={onToggle}>
          <div className="fixed left-0 top-0 h-full w-80 bg-card" onClick={(e) => e?.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground flex items-center">
                <Icon name="Filter" size={20} className="mr-2" />
                Filters & Controls
              </h2>
              <Button variant="ghost" size="icon" onClick={onToggle}>
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="overflow-y-auto p-4 space-y-6" style={{ height: 'calc(100vh - 80px)' }}>
              {/* Same content as desktop */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground flex items-center">
                  <Icon name="Calendar" size={16} className="mr-2" />
                  Date Range
                </h3>
                <div className="space-y-3">
                  <Input
                    label="From Date"
                    type="date"
                    value={localFilters?.dateFrom}
                    onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
                    className="w-full"
                  />
                  <Input
                    label="To Date"
                    type="date"
                    value={localFilters?.dateTo}
                    onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground flex items-center">
                  <Icon name="Clock" size={16} className="mr-2" />
                  Shift Selection
                </h3>
                <Select
                  options={shiftOptions}
                  value={localFilters?.shift}
                  onChange={(value) => handleFilterChange('shift', value)}
                  placeholder="Select shift"
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground flex items-center">
                  <Icon name="MapPin" size={16} className="mr-2" />
                  Stockyard
                </h3>
                <Select
                  options={stockyardOptions}
                  value={localFilters?.stockyard}
                  onChange={(value) => handleFilterChange('stockyard', value)}
                  placeholder="Select stockyard"
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground flex items-center">
                  <Icon name="AlertTriangle" size={16} className="mr-2" />
                  Order Priority
                </h3>
                <Select
                  options={priorityOptions}
                  value={localFilters?.priority}
                  onChange={(value) => handleFilterChange('priority', value)}
                  placeholder="Select priority"
                />
              </div>

              <div className="pt-4">
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="w-full"
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;