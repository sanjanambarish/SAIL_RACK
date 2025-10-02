import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MarkerPopup = ({ marker, onClose, onAction }) => {
  if (!marker) return null;

  const renderStockyardPopup = () => (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: marker?.priority === 'high' ? '#DC2626' : marker?.priority === 'medium' ? '#F59E0B' : '#6B7280' }}
          >
            <Icon name="Factory" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-popover-foreground">{marker?.name}</h3>
            <p className="text-sm text-muted-foreground">Steel Production Plant</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={16} />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">Current Inventory</span>
            <Icon name="Package" size={14} className="text-muted-foreground" />
          </div>
          <p className="text-xl font-bold text-foreground">{marker?.inventory?.toLocaleString('en-IN')}</p>
          <p className="text-xs text-muted-foreground">tons</p>
        </div>

        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">Capacity</span>
            <Icon name="Warehouse" size={14} className="text-muted-foreground" />
          </div>
          <p className="text-xl font-bold text-foreground">{marker?.capacity?.toLocaleString('en-IN')}</p>
          <p className="text-xs text-muted-foreground">tons</p>
        </div>

        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">Cost per Ton</span>
            <Icon name="IndianRupee" size={14} className="text-muted-foreground" />
          </div>
          <p className="text-xl font-bold text-foreground">₹{marker?.costPerTon?.toLocaleString('en-IN')}</p>
        </div>

        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">Utilization</span>
            <Icon name="TrendingUp" size={14} className="text-muted-foreground" />
          </div>
          <p className="text-xl font-bold text-foreground">{Math.round((marker?.inventory / marker?.capacity) * 100)}%</p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-foreground mb-2">Available Products</h4>
        <div className="flex flex-wrap gap-2">
          {marker?.products?.map((product, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
            >
              {product}
            </span>
          ))}
        </div>
      </div>

      <div className="flex space-x-2 pt-2">
        <Button
          variant="default"
          size="sm"
          onClick={() => onAction('view_details', marker)}
          iconName="Eye"
          iconPosition="left"
          iconSize={14}
          className="flex-1"
        >
          View Details
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAction('create_plan', marker)}
          iconName="Plus"
          iconPosition="left"
          iconSize={14}
          className="flex-1"
        >
          Create Plan
        </Button>
      </div>
    </div>
  );

  const renderCustomerPopup = () => (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: marker?.priority === 'urgent' ? '#DC2626' : marker?.priority === 'high' ? '#F59E0B' : marker?.priority === 'medium' ? '#059669' : '#6B7280' }}
          >
            <Icon name="MapPin" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-popover-foreground">{marker?.name}</h3>
            <p className="text-sm text-muted-foreground">Customer Destination</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={16} />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">Order Quantity</span>
            <Icon name="ShoppingCart" size={14} className="text-muted-foreground" />
          </div>
          <p className="text-xl font-bold text-foreground">{marker?.orderQuantity?.toLocaleString('en-IN')}</p>
          <p className="text-xs text-muted-foreground">tons</p>
        </div>

        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">Delivery Date</span>
            <Icon name="Calendar" size={14} className="text-muted-foreground" />
          </div>
          <p className="text-lg font-bold text-foreground">{new Date(marker.deliveryDate)?.toLocaleDateString('en-IN')}</p>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Priority Level</span>
          <Icon name="AlertTriangle" size={14} className="text-muted-foreground" />
        </div>
        <div className="flex items-center space-x-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: marker?.priority === 'urgent' ? '#DC2626' : marker?.priority === 'high' ? '#F59E0B' : marker?.priority === 'medium' ? '#059669' : '#6B7280' }}
          ></div>
          <span className={`font-semibold capitalize ${
            marker?.priority === 'urgent' ? 'text-error' : 
            marker?.priority === 'high' ? 'text-warning' : 
            marker?.priority === 'medium' ? 'text-success' : 'text-muted-foreground'
          }`}>
            {marker?.priority}
          </span>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-foreground mb-2">Required Products</h4>
        <div className="flex flex-wrap gap-2">
          {marker?.products?.map((product, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
            >
              {product}
            </span>
          ))}
        </div>
      </div>

      <div className="flex space-x-2 pt-2">
        <Button
          variant="default"
          size="sm"
          onClick={() => onAction('assign_rake', marker)}
          iconName="Truck"
          iconPosition="left"
          iconSize={14}
          className="flex-1"
        >
          Assign Rake
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAction('view_orders', marker)}
          iconName="FileText"
          iconPosition="left"
          iconSize={14}
          className="flex-1"
        >
          View Orders
        </Button>
      </div>
    </div>
  );

  const renderRakePopup = () => (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: marker?.status === 'in_transit' ? '#059669' : marker?.status === 'loading' ? '#F59E0B' : '#DC2626' }}
          >
            <Icon name="Train" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-popover-foreground">Rake {marker?.id?.toUpperCase()}</h3>
            <p className="text-sm text-muted-foreground">Active Railway Rake</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={16} />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">Current Status</span>
            <Icon name="Activity" size={14} className="text-muted-foreground" />
          </div>
          <p className={`text-lg font-bold capitalize ${
            marker?.status === 'in_transit' ? 'text-success' : 
            marker?.status === 'loading' ? 'text-warning' : 'text-error'
          }`}>
            {marker?.status?.replace('_', ' ')}
          </p>
        </div>

        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">Current Speed</span>
            <Icon name="Gauge" size={14} className="text-muted-foreground" />
          </div>
          <p className="text-lg font-bold text-foreground">{marker?.speed}</p>
          <p className="text-xs text-muted-foreground">km/h</p>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Destination</span>
          <Icon name="Navigation" size={14} className="text-muted-foreground" />
        </div>
        <p className="font-semibold text-foreground">{marker?.destination}</p>
        <p className="text-sm text-muted-foreground mt-1">ETA: {marker?.eta}</p>
      </div>

      <div className="bg-muted rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Current Cargo</span>
          <Icon name="Package2" size={14} className="text-muted-foreground" />
        </div>
        <p className="font-semibold text-foreground">{marker?.cargo}</p>
      </div>

      <div className="flex space-x-2 pt-2">
        <Button
          variant="default"
          size="sm"
          onClick={() => onAction('track_rake', marker)}
          iconName="MapPin"
          iconPosition="left"
          iconSize={14}
          className="flex-1"
        >
          Track Route
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAction('rake_details', marker)}
          iconName="Info"
          iconPosition="left"
          iconSize={14}
          className="flex-1"
        >
          Details
        </Button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-popover border border-border rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          {marker?.type === 'stockyard' && renderStockyardPopup()}
          {marker?.type === 'customer' && renderCustomerPopup()}
          {marker?.type === 'rake' && renderRakePopup()}
        </div>
      </div>
    </div>
  );
};

export default MarkerPopup;