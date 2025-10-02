import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import TimelineHeader from './components/TimelineHeader';
import TimelineChart from './components/TimelineChart';
import CriticalPathPanel from './components/CriticalPathPanel';
import RealTimeStatus from './components/RealTimeStatus';
import ScheduleModal from './components/ScheduleModal';

const TimelineView = () => {
  const [dateRange, setDateRange] = useState({
    start: '2025-01-26',
    end: '2025-01-28'
  });
  const [selectedRoute, setSelectedRoute] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedFormationType, setSelectedFormationType] = useState('all');
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock timeline data
  const timelineData = [
    {
      id: 'RAKE001',
      rakeId: 'RAKE-BH-001',
      route: 'Bhilai - Mumbai',
      priority: 'critical',
      status: 'completed',
      plannedDispatch: '2025-01-26T06:00:00',
      plannedArrival: '2025-01-26T18:00:00',
      actualDispatch: '2025-01-26T06:15:00',
      actualArrival: '2025-01-26T18:30:00',
      delay: 15,
      wagonCount: 58,
      currentLocation: 'Mumbai Terminal'
    },
    {
      id: 'RAKE002',
      rakeId: 'RAKE-RK-002',
      route: 'Rourkela - Chennai',
      priority: 'high',
      status: 'in-progress',
      plannedDispatch: '2025-01-26T08:00:00',
      plannedArrival: '2025-01-27T02:00:00',
      actualDispatch: '2025-01-26T08:30:00',
      actualArrival: null,
      delay: 30,
      wagonCount: 45,
      currentLocation: 'Visakhapatnam Junction'
    },
    {
      id: 'RAKE003',
      rakeId: 'RAKE-DG-003',
      route: 'Durgapur - Kolkata',
      priority: 'medium',
      status: 'delayed',
      plannedDispatch: '2025-01-26T10:00:00',
      plannedArrival: '2025-01-26T16:00:00',
      actualDispatch: '2025-01-26T11:45:00',
      actualArrival: null,
      delay: 105,
      wagonCount: 32,
      currentLocation: 'Asansol Junction'
    },
    {
      id: 'RAKE004',
      rakeId: 'RAKE-BK-004',
      route: 'Bokaro - Delhi',
      priority: 'high',
      status: 'scheduled',
      plannedDispatch: '2025-01-26T14:00:00',
      plannedArrival: '2025-01-27T08:00:00',
      actualDispatch: null,
      actualArrival: null,
      delay: 0,
      wagonCount: 58,
      currentLocation: 'Bokaro Steel Plant'
    },
    {
      id: 'RAKE005',
      rakeId: 'RAKE-BP-005',
      route: 'Burnpur - Hyderabad',
      priority: 'medium',
      status: 'in-progress',
      plannedDispatch: '2025-01-26T12:00:00',
      plannedArrival: '2025-01-27T06:00:00',
      actualDispatch: '2025-01-26T12:00:00',
      actualArrival: null,
      delay: 0,
      wagonCount: 40,
      currentLocation: 'Nagpur Junction'
    }
  ];

  // Mock critical path data
  const criticalPathData = [
    {
      id: 'CP001',
      title: 'Visakhapatnam Junction Congestion',
      description: 'Heavy traffic causing delays for Chennai-bound rakes',
      impact: 'high',
      affectedRakes: 3,
      delayImpact: '45-60 min',
      costImpact: '2,50,000',
      customerImpact: 5,
      route: 'Rourkela - Chennai',
      priority: 'critical',
      estimatedResolution: '2 hours',
      hasRecommendation: true
    },
    {
      id: 'CP002',
      title: 'Asansol Junction Signal Issues',
      description: 'Technical problems with signaling system affecting Kolkata route',
      impact: 'medium',
      affectedRakes: 2,
      delayImpact: '30-45 min',
      costImpact: '1,80,000',
      customerImpact: 3,
      route: 'Durgapur - Kolkata',
      priority: 'high',
      estimatedResolution: '4 hours',
      hasRecommendation: true
    },
    {
      id: 'CP003',
      title: 'Weather Conditions - Northern Route',
      description: 'Fog conditions affecting visibility on Delhi route',
      impact: 'low',
      affectedRakes: 1,
      delayImpact: '15-30 min',
      costImpact: '75,000',
      customerImpact: 2,
      route: 'Bokaro - Delhi',
      priority: 'medium',
      estimatedResolution: '6 hours',
      hasRecommendation: false
    }
  ];

  // Mock real-time data
  const realTimeData = [
    {
      id: 'RT001',
      rakeId: 'RAKE-RK-002',
      route: 'Rourkela - Chennai',
      status: 'moving',
      location: 'Visakhapatnam Junction',
      currentPosition: 'Platform 3, Visakhapatnam',
      kmFromOrigin: 485,
      estimatedArrival: '02:30 AM',
      delayMinutes: 30,
      currentSpeed: 65,
      loadPercentage: 95,
      wagonCount: 45,
      progressPercentage: 68,
      hasAlert: true,
      isTracked: true
    },
    {
      id: 'RT002',
      rakeId: 'RAKE-DG-003',
      route: 'Durgapur - Kolkata',
      status: 'waiting',
      location: 'Asansol Junction',
      currentPosition: 'Yard 2, Asansol',
      kmFromOrigin: 165,
      estimatedArrival: '18:45 PM',
      delayMinutes: 105,
      currentSpeed: 0,
      loadPercentage: 88,
      wagonCount: 32,
      progressPercentage: 45,
      hasAlert: true,
      isTracked: true
    },
    {
      id: 'RT003',
      rakeId: 'RAKE-BP-005',
      route: 'Burnpur - Hyderabad',
      status: 'moving',
      location: 'Nagpur Junction',
      currentPosition: 'Main Line, Nagpur',
      kmFromOrigin: 720,
      estimatedArrival: '06:00 AM',
      delayMinutes: 0,
      currentSpeed: 72,
      loadPercentage: 92,
      wagonCount: 40,
      progressPercentage: 75,
      hasAlert: false,
      isTracked: true
    }
  ];

  const handleRefresh = () => {
    // Simulate data refresh
    console.log('Refreshing timeline data...');
  };

  const handleReschedule = () => {
    console.log('Opening reschedule interface...');
  };

  const handleUpdatePriorities = () => {
    console.log('Opening priority update interface...');
  };

  const handleGenerateRecoveryPlan = () => {
    console.log('Generating recovery plan...');
  };

  const handleScheduleClick = (schedule) => {
    setSelectedSchedule(schedule);
    setIsModalOpen(true);
  };

  const handleRakeClick = (rake) => {
    console.log('Viewing rake details:', rake);
  };

  const handleOptimize = () => {
    console.log('Running optimization...');
  };

  const handleViewDetails = (item) => {
    console.log('Viewing critical path details:', item);
  };

  const handleRakeSelect = (rake) => {
    console.log('Selected rake for tracking:', rake);
  };

  const handleSaveSchedule = (updatedSchedule) => {
    console.log('Saving schedule changes:', updatedSchedule);
    // Update timeline data with new schedule
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          <TimelineHeader
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            selectedRoute={selectedRoute}
            onRouteChange={setSelectedRoute}
            selectedPriority={selectedPriority}
            onPriorityChange={setSelectedPriority}
            selectedFormationType={selectedFormationType}
            onFormationTypeChange={setSelectedFormationType}
            onRefresh={handleRefresh}
            onReschedule={handleReschedule}
            onUpdatePriorities={handleUpdatePriorities}
            onGenerateRecoveryPlan={handleGenerateRecoveryPlan}
          />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Main Timeline Chart */}
            <div className="xl:col-span-2">
              <TimelineChart
                timelineData={timelineData}
                onScheduleClick={handleScheduleClick}
                onRakeClick={handleRakeClick}
              />
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              <RealTimeStatus
                realTimeData={realTimeData}
                onRakeSelect={handleRakeSelect}
              />
            </div>
          </div>

          {/* Critical Path Analysis */}
          <div className="mt-6">
            <CriticalPathPanel
              criticalPathData={criticalPathData}
              onOptimize={handleOptimize}
              onViewDetails={handleViewDetails}
            />
          </div>
        </div>
      </main>

      {/* Schedule Modal */}
      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        scheduleData={selectedSchedule}
        onSave={handleSaveSchedule}
      />
    </div>
  );
};

export default TimelineView;