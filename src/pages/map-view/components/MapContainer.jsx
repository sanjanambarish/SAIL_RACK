import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';

const MapContainer = ({ 
  selectedFilters, 
  onMarkerClick, 
  onRouteClick,
  mapStyle,
  showRealTimeTracking 
}) => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [rakePositions, setRakePositions] = useState([]);

  // Mock stockyard data
  const stockyards = [
    {
      id: 'sy001',
      name: 'Rourkela Steel Plant',
      lat: 22.2604,
      lng: 84.8536,
      inventory: 15000,
      capacity: 25000,
      costPerTon: 2500,
      priority: 'high',
      products: ['Steel Coils', 'Billets', 'Plates']
    },
    {
      id: 'sy002', 
      name: 'Bokaro Steel Plant',
      lat: 23.6693,
      lng: 86.1511,
      inventory: 12000,
      capacity: 20000,
      costPerTon: 2300,
      priority: 'medium',
      products: ['Rails', 'Wire Rods', 'TMT Bars']
    },
    {
      id: 'sy003',
      name: 'Bhilai Steel Plant',
      lat: 21.1938,
      lng: 81.3509,
      inventory: 18000,
      capacity: 30000,
      costPerTon: 2200,
      priority: 'high',
      products: ['Structural Steel', 'Plates', 'Coils']
    },
    {
      id: 'sy004',
      name: 'Durgapur Steel Plant',
      lat: 23.5204,
      lng: 87.3119,
      inventory: 8000,
      capacity: 15000,
      costPerTon: 2600,
      priority: 'low',
      products: ['Alloy Steel', 'Special Steel']
    }
  ];

  // Mock customer destinations
  const customers = [
    {
      id: 'cust001',
      name: 'Mumbai Port',
      lat: 19.0760,
      lng: 72.8777,
      orderQuantity: 5000,
      deliveryDate: '2025-01-15',
      priority: 'urgent',
      products: ['Steel Coils']
    },
    {
      id: 'cust002',
      name: 'Chennai Industrial Hub',
      lat: 13.0827,
      lng: 80.2707,
      orderQuantity: 3500,
      deliveryDate: '2025-01-20',
      priority: 'high',
      products: ['TMT Bars', 'Wire Rods']
    },
    {
      id: 'cust003',
      name: 'Delhi Construction Zone',
      lat: 28.7041,
      lng: 77.1025,
      orderQuantity: 7000,
      deliveryDate: '2025-01-18',
      priority: 'medium',
      products: ['Structural Steel', 'Plates']
    },
    {
      id: 'cust004',
      name: 'Kolkata Shipyard',
      lat: 22.5726,
      lng: 88.3639,
      orderQuantity: 2500,
      deliveryDate: '2025-01-25',
      priority: 'low',
      products: ['Special Steel', 'Alloy Steel']
    }
  ];

  // Mock rake positions for real-time tracking
  const mockRakePositions = [
    {
      id: 'rake001',
      lat: 22.8604,
      lng: 85.2536,
      status: 'in_transit',
      destination: 'Mumbai Port',
      cargo: 'Steel Coils - 1200 tons',
      speed: 45,
      eta: '2025-01-14 18:30'
    },
    {
      id: 'rake002',
      lat: 23.1693,
      lng: 86.8511,
      status: 'loading',
      destination: 'Chennai Industrial Hub',
      cargo: 'TMT Bars - 800 tons',
      speed: 0,
      eta: '2025-01-19 14:00'
    },
    {
      id: 'rake003',
      lat: 24.2938,
      lng: 82.1509,
      status: 'in_transit',
      destination: 'Delhi Construction Zone',
      cargo: 'Structural Steel - 1500 tons',
      speed: 52,
      eta: '2025-01-17 22:15'
    }
  ];

  // Mock routes data
  const routes = [
    {
      id: 'route001',
      from: 'sy001',
      to: 'cust001',
      coordinates: [
        [84.8536, 22.2604],
        [84.2536, 22.1604],
        [83.8536, 21.8604],
        [82.8536, 21.2604],
        [81.8536, 20.5604],
        [80.8536, 19.8604],
        [79.8536, 19.4604],
        [78.8536, 19.2604],
        [77.8536, 19.1604],
        [76.8536, 19.0604],
        [75.8536, 19.0604],
        [74.8536, 19.0604],
        [73.8536, 19.0604],
        [72.8777, 19.0760]
      ],
      priority: 'high',
      cost: 125000,
      distance: 1250
    },
    {
      id: 'route002',
      from: 'sy002',
      to: 'cust002',
      coordinates: [
        [86.1511, 23.6693],
        [85.8511, 23.2693],
        [85.4511, 22.6693],
        [84.9511, 21.9693],
        [84.3511, 21.1693],
        [83.6511, 20.2693],
        [82.8511, 19.2693],
        [82.0511, 18.1693],
        [81.2511, 16.9693],
        [80.6511, 15.6693],
        [80.2511, 14.2693],
        [80.2707, 13.0827]
      ],
      priority: 'medium',
      cost: 98000,
      distance: 980
    }
  ];

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showRealTimeTracking) {
      setRakePositions(mockRakePositions);
      
      // Simulate real-time position updates
      const interval = setInterval(() => {
        setRakePositions(prev => prev?.map(rake => ({
          ...rake,
          lat: rake?.lat + (Math.random() - 0.5) * 0.01,
          lng: rake?.lng + (Math.random() - 0.5) * 0.01
        })));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [showRealTimeTracking]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return '#DC2626';
      case 'high': return '#F59E0B';
      case 'medium': return '#059669';
      case 'low': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_transit': return '#059669';
      case 'loading': return '#F59E0B';
      case 'unloading': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const handleMarkerClick = (marker, type) => {
    onMarkerClick({ ...marker, type });
  };

  if (!mapLoaded) {
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading interactive map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-slate-100 overflow-hidden">
      {/* Map Background with Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      {/* Stockyard Markers */}
      {stockyards?.map((stockyard) => (
        <div
          key={stockyard?.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          style={{
            left: `${((stockyard?.lng - 70) / 25) * 100}%`,
            top: `${((30 - stockyard?.lat) / 15) * 100}%`
          }}
          onClick={() => handleMarkerClick(stockyard, 'stockyard')}
        >
          <div className="relative">
            <div 
              className="w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
              style={{ backgroundColor: getPriorityColor(stockyard?.priority) }}
            >
              <Icon name="Factory" size={14} color="white" />
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-64">
              <h4 className="font-semibold text-popover-foreground mb-2">{stockyard?.name}</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Inventory:</span>
                  <span className="font-medium">{stockyard?.inventory?.toLocaleString('en-IN')} tons</span>
                </div>
                <div className="flex justify-between">
                  <span>Capacity:</span>
                  <span className="font-medium">{stockyard?.capacity?.toLocaleString('en-IN')} tons</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost/Ton:</span>
                  <span className="font-medium">₹{stockyard?.costPerTon?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Utilization:</span>
                  <span className="font-medium">{Math.round((stockyard?.inventory / stockyard?.capacity) * 100)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Customer Markers */}
      {customers?.map((customer) => (
        <div
          key={customer?.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          style={{
            left: `${((customer?.lng - 70) / 25) * 100}%`,
            top: `${((30 - customer?.lat) / 15) * 100}%`
          }}
          onClick={() => handleMarkerClick(customer, 'customer')}
        >
          <div className="relative">
            <div 
              className="w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
              style={{ backgroundColor: getPriorityColor(customer?.priority) }}
            >
              <Icon name="MapPin" size={14} color="white" />
            </div>
            
            {/* Priority Badge */}
            {customer?.priority === 'urgent' && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full animate-pulse"></div>
            )}

            {/* Tooltip */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-64">
              <h4 className="font-semibold text-popover-foreground mb-2">{customer?.name}</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Order Qty:</span>
                  <span className="font-medium">{customer?.orderQuantity?.toLocaleString('en-IN')} tons</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span className="font-medium">{new Date(customer.deliveryDate)?.toLocaleDateString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Priority:</span>
                  <span className={`font-medium capitalize ${
                    customer?.priority === 'urgent' ? 'text-error' : 
                    customer?.priority === 'high' ? 'text-warning' : 
                    customer?.priority === 'medium' ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {customer?.priority}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Routes */}
      {routes?.map((route) => {
        const fromStockyard = stockyards?.find(s => s?.id === route?.from);
        const toCustomer = customers?.find(c => c?.id === route?.to);
        
        if (!fromStockyard || !toCustomer) return null;

        return (
          <svg
            key={route?.id}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            <defs>
              <marker
                id={`arrowhead-${route?.id}`}
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill={getPriorityColor(route?.priority)}
                />
              </marker>
            </defs>
            <polyline
              points={route?.coordinates?.map(coord => 
                `${((coord?.[0] - 70) / 25) * 100},${((30 - coord?.[1]) / 15) * 100}`
              )?.join(' ')}
              fill="none"
              stroke={getPriorityColor(route?.priority)}
              strokeWidth="2"
              strokeDasharray="5,5"
              markerEnd={`url(#arrowhead-${route?.id})`}
              className="cursor-pointer pointer-events-auto hover:stroke-width-3 transition-all"
              onClick={() => onRouteClick(route)}
            />
          </svg>
        );
      })}
      {/* Real-time Rake Positions */}
      {showRealTimeTracking && rakePositions?.map((rake) => (
        <div
          key={rake?.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group animate-pulse"
          style={{
            left: `${((rake?.lng - 70) / 25) * 100}%`,
            top: `${((30 - rake?.lat) / 15) * 100}%`,
            zIndex: 10
          }}
          onClick={() => handleMarkerClick(rake, 'rake')}
        >
          <div className="relative">
            <div 
              className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
              style={{ backgroundColor: getStatusColor(rake?.status) }}
            >
              <Icon name="Train" size={16} color="white" />
            </div>
            
            {/* Movement indicator */}
            {rake?.status === 'in_transit' && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-ping"></div>
            )}

            {/* Tooltip */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 w-72">
              <h4 className="font-semibold text-popover-foreground mb-2">Rake {rake?.id?.toUpperCase()}</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={`font-medium capitalize ${
                    rake?.status === 'in_transit' ? 'text-success' : 
                    rake?.status === 'loading' ? 'text-warning' : 'text-error'
                  }`}>
                    {rake?.status?.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Destination:</span>
                  <span className="font-medium">{rake?.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cargo:</span>
                  <span className="font-medium">{rake?.cargo}</span>
                </div>
                <div className="flex justify-between">
                  <span>Speed:</span>
                  <span className="font-medium">{rake?.speed} km/h</span>
                </div>
                <div className="flex justify-between">
                  <span>ETA:</span>
                  <span className="font-medium">{rake?.eta}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-4 shadow-lg">
        <h4 className="font-semibold text-card-foreground mb-3">Legend</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-error rounded-full flex items-center justify-center">
              <Icon name="Factory" size={10} color="white" />
            </div>
            <span>High Priority Stockyard</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-warning rounded-full flex items-center justify-center">
              <Icon name="MapPin" size={10} color="white" />
            </div>
            <span>Customer Destination</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-success rounded-full flex items-center justify-center">
              <Icon name="Train" size={10} color="white" />
            </div>
            <span>Active Rake</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-1 bg-primary"></div>
            <span>Planned Route</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapContainer;