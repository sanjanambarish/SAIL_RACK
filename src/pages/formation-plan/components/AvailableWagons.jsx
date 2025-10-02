import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import WagonCard from './WagonCard';

const AvailableWagons = ({ wagons, onAddToFormation, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'available', label: 'Available' },
    { value: 'assigned', label: 'Assigned' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'BOXN', label: 'BOXN (Coal)' },
    { value: 'BOBRN', label: 'BOBRN (Iron Ore)' },
    { value: 'BCN', label: 'BCN (General)' },
    { value: 'BCNA', label: 'BCNA (Steel)' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'Rourkela', label: 'Rourkela Steel Plant' },
    { value: 'Durgapur', label: 'Durgapur Steel Plant' },
    { value: 'Bhilai', label: 'Bhilai Steel Plant' },
    { value: 'Bokaro', label: 'Bokaro Steel Plant' }
  ];

  const filteredWagons = wagons?.filter(wagon => {
    const matchesSearch = wagon?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         wagon?.type?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         wagon?.destination?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || wagon?.status === statusFilter;
    const matchesType = typeFilter === 'all' || wagon?.type === typeFilter;
    const matchesLocation = locationFilter === 'all' || wagon?.location === locationFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesLocation;
  });

  const getStatusCount = (status) => {
    return wagons?.filter(wagon => wagon?.status === status)?.length;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Available Wagons</h3>
          <p className="text-sm text-muted-foreground">
            {filteredWagons?.length} of {wagons?.length} wagons
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          iconName="RefreshCw"
          iconPosition="left"
        >
          Refresh
        </Button>
      </div>
      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-success/10 rounded-lg">
          <p className="text-xl font-bold text-success">{getStatusCount('available')}</p>
          <p className="text-xs text-muted-foreground">Available</p>
        </div>
        <div className="text-center p-3 bg-warning/10 rounded-lg">
          <p className="text-xl font-bold text-warning">{getStatusCount('assigned')}</p>
          <p className="text-xs text-muted-foreground">Assigned</p>
        </div>
        <div className="text-center p-3 bg-error/10 rounded-lg">
          <p className="text-xl font-bold text-error">{getStatusCount('maintenance')}</p>
          <p className="text-xs text-muted-foreground">Maintenance</p>
        </div>
      </div>
      {/* Filters */}
      <div className="space-y-4 mb-6">
        <Input
          type="search"
          placeholder="Search wagons by ID, type, or destination..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="w-full"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
          />
          <Select
            placeholder="Filter by type"
            options={typeOptions}
            value={typeFilter}
            onChange={setTypeFilter}
          />
          <Select
            placeholder="Filter by location"
            options={locationOptions}
            value={locationFilter}
            onChange={setLocationFilter}
          />
        </div>
      </div>
      {/* Wagons List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredWagons?.length > 0 ? (
          filteredWagons?.map(wagon => (
            <div key={wagon?.id} className="relative">
              <WagonCard
                wagon={wagon}
                showActions={false}
                isDragging={false}
                onDragStart={() => {}}
                onDragEnd={() => {}}
                onRemove={() => {}}
                onEdit={() => {}}
              />
              <div className="absolute top-4 right-4">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onAddToFormation && onAddToFormation(wagon)}
                  disabled={wagon?.status !== 'available'}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No wagons found matching your criteria</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTypeFilter('all');
                setLocationFilter('all');
              }}
              className="mt-2"
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableWagons;