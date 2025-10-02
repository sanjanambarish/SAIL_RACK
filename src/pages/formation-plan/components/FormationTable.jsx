import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import WagonCard from './WagonCard';

const FormationTable = ({ 
  formations, 
  onReorderWagons, 
  onRemoveWagon, 
  onEditWagon,
  onSaveFormation,
  onGenerateAlternative 
}) => {
  const [draggedWagon, setDraggedWagon] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (e, wagon) => {
    setDraggedWagon(wagon);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedWagon(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e, index) => {
    e?.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e, targetIndex, formationId) => {
    e?.preventDefault();
    if (draggedWagon && onReorderWagons) {
      onReorderWagons(draggedWagon, targetIndex, formationId);
    }
    setDraggedWagon(null);
    setDragOverIndex(null);
  };

  const calculateFormationMetrics = (wagons) => {
    const totalCapacity = wagons?.reduce((sum, wagon) => sum + wagon?.capacity, 0);
    const totalLoad = wagons?.reduce((sum, wagon) => sum + wagon?.currentLoad, 0);
    const utilization = totalCapacity > 0 ? (totalLoad / totalCapacity) * 100 : 0;
    
    return {
      totalCapacity,
      totalLoad,
      utilization: Math.round(utilization),
      wagonCount: wagons?.length
    };
  };

  return (
    <div className="space-y-6">
      {formations?.map((formation) => {
        const metrics = calculateFormationMetrics(formation?.wagons);
        
        return (
          <div key={formation?.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Train" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{formation?.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Route: {formation?.route} • Priority: {formation?.priority}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onGenerateAlternative && onGenerateAlternative(formation?.id)}
                  iconName="Shuffle"
                  iconPosition="left"
                >
                  Alternative
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onSaveFormation && onSaveFormation(formation?.id)}
                  iconName="Save"
                  iconPosition="left"
                >
                  Save
                </Button>
              </div>
            </div>
            {/* Formation Metrics */}
            <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{metrics?.wagonCount}</p>
                <p className="text-xs text-muted-foreground">Wagons</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{metrics?.totalCapacity}T</p>
                <p className="text-xs text-muted-foreground">Total Capacity</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{metrics?.totalLoad}T</p>
                <p className="text-xs text-muted-foreground">Current Load</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold ${
                  metrics?.utilization >= 90 ? 'text-success' : 
                  metrics?.utilization >= 70 ? 'text-warning' : 'text-error'
                }`}>
                  {metrics?.utilization}%
                </p>
                <p className="text-xs text-muted-foreground">Utilization</p>
              </div>
            </div>
            {/* Wagons Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">Wagon Configuration</h4>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Move" size={16} />
                  <span>Drag to reorder</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {formation?.wagons?.map((wagon, index) => (
                  <div
                    key={wagon?.id}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index, formation?.id)}
                    className={`transition-all duration-200 ${
                      dragOverIndex === index ? 'scale-105 ring-2 ring-primary/50' : ''
                    }`}
                  >
                    <WagonCard
                      wagon={wagon}
                      isDragging={draggedWagon?.id === wagon?.id}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      onRemove={(wagonId) => onRemoveWagon && onRemoveWagon(wagonId, formation?.id)}
                      onEdit={onEditWagon}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Cost Impact */}
            <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name="TrendingUp" size={20} className="text-success" />
                  <div>
                    <p className="font-medium text-success">Projected Savings</p>
                    <p className="text-sm text-muted-foreground">
                      Compared to previous formation
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-success">₹{formation?.projectedSavings?.toLocaleString('en-IN')}</p>
                  <p className="text-sm text-muted-foreground">
                    {formation?.timeSavings} hours saved
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FormationTable;