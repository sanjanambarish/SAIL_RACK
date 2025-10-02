import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const TimelineChart = ({ timelineData, onScheduleClick, onRakeClick }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);
  const timelineRef = useRef(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success';
      case 'in-progress': return 'bg-warning';
      case 'delayed': return 'bg-error';
      case 'scheduled': return 'bg-primary';
      case 'cancelled': return 'bg-muted';
      default: return 'bg-secondary';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'border-l-error';
      case 'high': return 'border-l-warning';
      case 'medium': return 'border-l-primary';
      case 'low': return 'border-l-secondary';
      default: return 'border-l-muted';
    }
  };

  const formatTime = (timeString) => {
    return new Date(timeString)?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short'
    });
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev / 1.2, 0.5));
  };

  const handleScroll = (e) => {
    setScrollPosition(e?.target?.scrollLeft);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      {/* Timeline Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-foreground">Dispatch Timeline</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-success rounded"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-warning rounded"></div>
              <span>In Progress</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-error rounded"></div>
              <span>Delayed</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-primary rounded"></div>
              <span>Scheduled</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-muted rounded-lg transition-hover"
            title="Zoom Out"
          >
            <Icon name="ZoomOut" size={16} />
          </button>
          <span className="text-sm text-muted-foreground px-2">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-muted rounded-lg transition-hover"
            title="Zoom In"
          >
            <Icon name="ZoomIn" size={16} />
          </button>
        </div>
      </div>
      {/* Timeline Container */}
      <div 
        ref={timelineRef}
        className="overflow-x-auto overflow-y-hidden"
        onScroll={handleScroll}
        style={{ height: '600px' }}
      >
        <div 
          className="relative"
          style={{ 
            width: `${100 * zoomLevel}%`,
            minWidth: '1200px',
            height: '100%'
          }}
        >
          {/* Time Grid */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-muted/30 border-b border-border">
            <div className="flex items-center h-full px-4">
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className="flex-1 text-center text-xs text-muted-foreground border-r border-border/50">
                  {String(i)?.padStart(2, '0')}:00
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Items */}
          <div className="pt-12 space-y-2">
            {timelineData?.map((item, index) => (
              <div
                key={item?.id}
                className={`relative bg-background border border-border rounded-lg p-4 hover:elevation-1 transition-all cursor-pointer ${getPriorityColor(item?.priority)} border-l-4`}
                onClick={() => onScheduleClick(item)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="Train" size={16} className="text-primary" />
                      <span className="font-medium text-foreground">{item?.rakeId}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item?.route}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item?.status)} text-white`}>
                      {item?.status?.charAt(0)?.toUpperCase() + item?.status?.slice(1)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(item?.plannedDispatch)}
                    </span>
                  </div>
                </div>

                {/* Timeline Bar */}
                <div className="relative h-8 bg-muted rounded-lg overflow-hidden">
                  {/* Planned Schedule Bar */}
                  <div
                    className="absolute top-0 h-4 bg-primary/30 rounded"
                    style={{
                      left: `${(new Date(item.plannedDispatch)?.getHours() / 24) * 100}%`,
                      width: `${((new Date(item.plannedArrival) - new Date(item.plannedDispatch)) / (24 * 60 * 60 * 1000)) * 100}%`
                    }}
                  />
                  
                  {/* Actual Schedule Bar */}
                  {item?.actualDispatch && (
                    <div
                      className={`absolute bottom-0 h-4 rounded ${getStatusColor(item?.status)}`}
                      style={{
                        left: `${(new Date(item.actualDispatch)?.getHours() / 24) * 100}%`,
                        width: `${item?.actualArrival ? 
                          ((new Date(item.actualArrival) - new Date(item.actualDispatch)) / (24 * 60 * 60 * 1000)) * 100 : 
                          ((Date.now() - new Date(item.actualDispatch)) / (24 * 60 * 60 * 1000)) * 100}%`
                      }}
                    />
                  )}

                  {/* Current Time Indicator */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-accent"
                    style={{
                      left: `${(new Date()?.getHours() / 24) * 100}%`
                    }}
                  />
                </div>

                {/* Schedule Details */}
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <span>Planned: {formatTime(item?.plannedDispatch)} - {formatTime(item?.plannedArrival)}</span>
                    {item?.actualDispatch && (
                      <span>Actual: {formatTime(item?.actualDispatch)} - {item?.actualArrival ? formatTime(item?.actualArrival) : 'In Transit'}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {item?.delay > 0 && (
                      <span className="text-error">+{item?.delay}min delay</span>
                    )}
                    <button
                      onClick={(e) => {
                        e?.stopPropagation();
                        onRakeClick(item);
                      }}
                      className="p-1 hover:bg-muted rounded transition-hover"
                    >
                      <Icon name="MapPin" size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineChart;