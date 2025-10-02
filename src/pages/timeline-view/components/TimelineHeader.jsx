import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const TimelineHeader = ({ 
  dateRange, 
  onDateRangeChange, 
  selectedRoute, 
  onRouteChange, 
  selectedPriority, 
  onPriorityChange,
  selectedFormationType,
  onFormationTypeChange,
  onRefresh,
  onReschedule,
  onUpdatePriorities,
  onGenerateRecoveryPlan 
}) => {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const routeOptions = [
    { value: 'all', label: 'All Routes' },
    { value: 'bhilai-mumbai', label: 'Bhilai - Mumbai' },
    { value: 'rourkela-chennai', label: 'Rourkela - Chennai' },
    { value: 'durgapur-kolkata', label: 'Durgapur - Kolkata' },
    { value: 'bokaro-delhi', label: 'Bokaro - Delhi' },
    { value: 'burnpur-hyderabad', label: 'Burnpur - Hyderabad' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const formationTypeOptions = [
    { value: 'all', label: 'All Formation Types' },
    { value: 'full-rake', label: 'Full Rake (58 Wagons)' },
    { value: 'partial-rake', label: 'Partial Rake (29-57 Wagons)' },
    { value: 'mini-rake', label: 'Mini Rake (10-28 Wagons)' },
    { value: 'single-wagon', label: 'Single Wagon' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 elevation-1">
      {/* Main Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Clock" size={24} color="white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Timeline View</h1>
            <p className="text-sm text-muted-foreground">Planned vs Actual Dispatch Schedules</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            iconName={isFilterExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            Filters
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Refresh
          </Button>
        </div>
      </div>
      {/* Expandable Filters Section */}
      {isFilterExpanded && (
        <div className="border-t border-border pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Input
                label="Start Date"
                type="date"
                value={dateRange?.start}
                onChange={(e) => onDateRangeChange({ ...dateRange, start: e?.target?.value })}
                className="w-full"
              />
            </div>
            <div>
              <Input
                label="End Date"
                type="date"
                value={dateRange?.end}
                onChange={(e) => onDateRangeChange({ ...dateRange, end: e?.target?.value })}
                className="w-full"
              />
            </div>
            <div>
              <Select
                label="Route"
                options={routeOptions}
                value={selectedRoute}
                onChange={onRouteChange}
                placeholder="Select route"
              />
            </div>
            <div>
              <Select
                label="Priority"
                options={priorityOptions}
                value={selectedPriority}
                onChange={onPriorityChange}
                placeholder="Select priority"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Select
                label="Formation Type"
                options={formationTypeOptions}
                value={selectedFormationType}
                onChange={onFormationTypeChange}
                placeholder="Select formation type"
              />
            </div>
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-border">
        <Button
          variant="default"
          size="sm"
          onClick={onReschedule}
          iconName="Calendar"
          iconPosition="left"
        >
          Reschedule Formation
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onUpdatePriorities}
          iconName="ArrowUpDown"
          iconPosition="left"
        >
          Update Priorities
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onGenerateRecoveryPlan}
          iconName="Zap"
          iconPosition="left"
        >
          Generate Recovery Plan
        </Button>
      </div>
    </div>
  );
};

export default TimelineHeader;