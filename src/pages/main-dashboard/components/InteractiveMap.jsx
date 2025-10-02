import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveMap = ({ selectedStockyard, onMarkerClick, realTimeData }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapView, setMapView] = useState('satellite');

  const stockyards = [
    {
      id: 'sy001',
      name: 'Stockyard A - Rourkela',
      lat: 22.2604,
      lng: 84.8536,
      inventory: 15420,
      capacity: 25000,
      costPerTon: 2850,
      priority: 'high',
      status: 'active'
    },
    {
      id: 'sy002',
      name: 'Stockyard B - Durgapur',
      lat: 23.5204,
      lng: 87.3119,
      inventory: 8750,
      capacity: 20000,
      costPerTon: 3100,
      priority: 'medium',
      status: 'active'
    },
    {
      id: 'sy003',
      name: 'Stockyard C - Bokaro',
      lat: 23.6693,
      lng: 86.1511,
      inventory: 12300,
      capacity: 18000,
      costPerTon: 2950,
      priority: 'high',
      status: 'maintenance'
    },
    {
      id: 'sy004',
      name: 'Stockyard D - Bhilai',
      lat: 21.1938,
      lng: 81.3509,
      inventory: 19800,
      capacity: 30000,
      costPerTon: 2750,
      priority: 'high',
      status: 'active'
    }
  ];

  const customers = [
    {
      id: 'cust001',
      name: 'Steel Corp Mumbai',
      lat: 19.0760,
      lng: 72.8777,
      orderQuantity: 5000,
      priority: 'high',
      deliveryDate: '2025-09-28'
    },
    {
      id: 'cust002',
      name: 'Industrial Ltd Chennai',
      lat: 13.0827,
      lng: 80.2707,
      orderQuantity: 3500,
      priority: 'medium',
      deliveryDate: '2025-09-30'
    },
    {
      id: 'cust003',
      name: 'Manufacturing Co Delhi',
      lat: 28.7041,
      lng: 77.1025,
      orderQuantity: 7200,
      priority: 'high',
      deliveryDate: '2025-09-27'
    }
  ];

  const rakePositions = [
    {
      id: 'rake001',
      name: 'RAKE-001',
      lat: 22.5726,
      lng: 88.3639,
      status: 'in-transit',
      destination: 'Mumbai',
      eta: '2025-09-27 14:30'
    },
    {
      id: 'rake002',
      name: 'RAKE-002',
      lat: 21.1458,
      lng: 79.0882,
      status: 'loading',
      destination: 'Chennai',
      eta: '2025-09-28 09:15'
    }
  ];

  const handleMarkerClick = (marker, type) => {
    setSelectedMarker({ ...marker, type });
    if (onMarkerClick) {
      onMarkerClick(marker, type);
    }
  };

  const getMarkerColor = (item, type) => {
    if (type === 'stockyard') {
      if (item?.status === 'maintenance') return 'bg-warning';
      return item?.priority === 'high' ? 'bg-error' : 'bg-primary';
    }
    if (type === 'customer') {
      return item?.priority === 'high' ? 'bg-error' : 'bg-accent';
    }
    if (type === 'rake') {
      return item?.status === 'in-transit' ? 'bg-success' : 'bg-secondary';
    }
    return 'bg-primary';
  };

  const calculateUtilization = (inventory, capacity) => {
    return Math.round((inventory / capacity) * 100);
  };

  return (
    <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <div className="bg-card border border-border rounded-lg p-2 elevation-2">
          <div className="flex space-x-1">
            <Button
              variant={mapView === 'satellite' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMapView('satellite')}
            >
              Satellite
            </Button>
            <Button
              variant={mapView === 'terrain' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMapView('terrain')}
            >
              Terrain
            </Button>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-2 elevation-2">
          <Button variant="ghost" size="icon">
            <Icon name="ZoomIn" size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="ZoomOut" size={20} />
          </Button>
        </div>
      </div>
      {/* Map Legend */}
      <div className="absolute top-4 left-4 z-10 bg-card border border-border rounded-lg p-3 elevation-2">
        <h4 className="text-sm font-medium text-foreground mb-2">Legend</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>Stockyards</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span>Customers</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span>Active Rakes</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 border-2 border-primary rounded-full"></div>
            <span>Routes</span>
          </div>
        </div>
      </div>
      {/* Embedded Google Map */}
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        title="SAIL Railway Network Map"
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps?q=22.2604,84.8536&z=6&output=embed"
        className="w-full h-full"
      />
      {/* Overlay Markers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Stockyard Markers */}
        {stockyards?.map((stockyard) => (
          <div
            key={stockyard?.id}
            className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${((stockyard?.lng + 180) / 360) * 100}%`,
              top: `${((90 - stockyard?.lat) / 180) * 100}%`
            }}
            onClick={() => handleMarkerClick(stockyard, 'stockyard')}
          >
            <div className={`w-4 h-4 ${getMarkerColor(stockyard, 'stockyard')} rounded-full border-2 border-white elevation-1 hover:scale-110 transition-transform`}>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded px-2 py-1 text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                {stockyard?.name}
              </div>
            </div>
          </div>
        ))}

        {/* Customer Markers */}
        {customers?.map((customer) => (
          <div
            key={customer?.id}
            className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${((customer?.lng + 180) / 360) * 100}%`,
              top: `${((90 - customer?.lat) / 180) * 100}%`
            }}
            onClick={() => handleMarkerClick(customer, 'customer')}
          >
            <div className={`w-3 h-3 ${getMarkerColor(customer, 'customer')} rounded-full border border-white elevation-1 hover:scale-110 transition-transform`}>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded px-2 py-1 text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                {customer?.name}
              </div>
            </div>
          </div>
        ))}

        {/* Rake Position Markers */}
        {rakePositions?.map((rake) => (
          <div
            key={rake?.id}
            className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${((rake?.lng + 180) / 360) * 100}%`,
              top: `${((90 - rake?.lat) / 180) * 100}%`
            }}
            onClick={() => handleMarkerClick(rake, 'rake')}
          >
            <div className={`w-3 h-3 ${getMarkerColor(rake, 'rake')} rounded-full border border-white elevation-1 animate-pulse hover:scale-110 transition-transform`}>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded px-2 py-1 text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                {rake?.name} - {rake?.status}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Marker Details Popup */}
      {selectedMarker && (
        <div className="absolute bottom-4 left-4 right-4 bg-card border border-border rounded-lg p-4 elevation-3 z-20">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-foreground">{selectedMarker?.name}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedMarker(null)}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          {selectedMarker?.type === 'stockyard' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Inventory</p>
                <p className="font-medium">{selectedMarker?.inventory?.toLocaleString('en-IN')} tons</p>
              </div>
              <div>
                <p className="text-muted-foreground">Capacity</p>
                <p className="font-medium">{selectedMarker?.capacity?.toLocaleString('en-IN')} tons</p>
              </div>
              <div>
                <p className="text-muted-foreground">Utilization</p>
                <p className="font-medium">{calculateUtilization(selectedMarker?.inventory, selectedMarker?.capacity)}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Cost/Ton</p>
                <p className="font-medium">₹{selectedMarker?.costPerTon?.toLocaleString('en-IN')}</p>
              </div>
            </div>
          )}

          {selectedMarker?.type === 'customer' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Order Quantity</p>
                <p className="font-medium">{selectedMarker?.orderQuantity?.toLocaleString('en-IN')} tons</p>
              </div>
              <div>
                <p className="text-muted-foreground">Priority</p>
                <p className="font-medium capitalize">{selectedMarker?.priority}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Delivery Date</p>
                <p className="font-medium">{new Date(selectedMarker.deliveryDate)?.toLocaleDateString('en-IN')}</p>
              </div>
            </div>
          )}

          {selectedMarker?.type === 'rake' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Status</p>
                <p className="font-medium capitalize">{selectedMarker?.status}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Destination</p>
                <p className="font-medium">{selectedMarker?.destination}</p>
              </div>
              <div>
                <p className="text-muted-foreground">ETA</p>
                <p className="font-medium">{new Date(selectedMarker.eta)?.toLocaleString('en-IN')}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;