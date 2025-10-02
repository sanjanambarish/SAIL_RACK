import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WagonCard = ({ 
  wagon, 
  isDragging, 
  onDragStart, 
  onDragEnd, 
  onRemove, 
  onEdit,
  showActions = true 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-success text-success-foreground';
      case 'assigned': return 'bg-warning text-warning-foreground';
      case 'maintenance': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div
      draggable={showActions}
      onDragStart={(e) => onDragStart && onDragStart(e, wagon)}
      onDragEnd={onDragEnd}
      className={`bg-card border border-border rounded-lg p-4 transition-all duration-200 ${
        isDragging ? 'opacity-50 scale-95' : 'hover:elevation-2'
      } ${showActions ? 'cursor-move' : ''}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Train" size={20} className="text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{wagon?.id}</h4>
            <p className="text-sm text-muted-foreground">{wagon?.type}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(wagon?.status)}`}>
          {wagon?.status}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <p className="text-xs text-muted-foreground">Capacity</p>
          <p className="font-medium text-foreground">{wagon?.capacity}T</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Current Load</p>
          <p className="font-medium text-foreground">{wagon?.currentLoad}T</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Destination</p>
          <p className="font-medium text-foreground">{wagon?.destination}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Priority</p>
          <p className={`font-medium capitalize ${getPriorityColor(wagon?.priority)}`}>
            {wagon?.priority}
          </p>
        </div>
      </div>
      {wagon?.material && (
        <div className="mb-3">
          <p className="text-xs text-muted-foreground">Material</p>
          <p className="text-sm font-medium text-foreground">{wagon?.material}</p>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={14} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{wagon?.location}</span>
        </div>
        {showActions && (
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit && onEdit(wagon)}
              className="w-8 h-8"
            >
              <Icon name="Edit" size={14} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove && onRemove(wagon?.id)}
              className="w-8 h-8 text-error hover:text-error"
            >
              <Icon name="Trash2" size={14} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WagonCard;