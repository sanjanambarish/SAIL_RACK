import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FormationTable from './components/FormationTable';
import AvailableWagons from './components/AvailableWagons';
import RecommendationPanel from './components/RecommendationPanel';
import ConflictDetection from './components/ConflictDetection';

const FormationPlan = () => {
  const [activeTab, setActiveTab] = useState('formations');
  const [formations, setFormations] = useState([]);
  const [availableWagons, setAvailableWagons] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data initialization
  useEffect(() => {
    const mockFormations = [
      {
        id: 'FORM-001',
        name: 'Rourkela-Mumbai Express',
        route: 'Rourkela → Mumbai',
        priority: 'High',
        projectedSavings: 125000,
        timeSavings: 4.5,
        wagons: [
          {
            id: 'BOXN-45231',
            type: 'BOXN',
            capacity: 58,
            currentLoad: 55,
            destination: 'Mumbai Port',
            priority: 'high',
            status: 'assigned',
            location: 'Rourkela Steel Plant',
            material: 'Coal'
          },
          {
            id: 'BOXN-45232',
            type: 'BOXN',
            capacity: 58,
            currentLoad: 52,
            destination: 'Mumbai Port',
            priority: 'high',
            status: 'assigned',
            location: 'Rourkela Steel Plant',
            material: 'Coal'
          },
          {
            id: 'BOBRN-78901',
            type: 'BOBRN',
            capacity: 61,
            currentLoad: 59,
            destination: 'Mumbai Port',
            priority: 'medium',
            status: 'assigned',
            location: 'Rourkela Steel Plant',
            material: 'Iron Ore'
          }
        ]
      },
      {
        id: 'FORM-002',
        name: 'Bhilai-Chennai Freight',
        route: 'Bhilai → Chennai',
        priority: 'Medium',
        projectedSavings: 89000,
        timeSavings: 3.2,
        wagons: [
          {
            id: 'BCN-12345',
            type: 'BCN',
            capacity: 55,
            currentLoad: 48,
            destination: 'Chennai Port',
            priority: 'medium',
            status: 'assigned',
            location: 'Bhilai Steel Plant',
            material: 'Steel Products'
          },
          {
            id: 'BCNA-67890',
            type: 'BCNA',
            capacity: 60,
            currentLoad: 57,
            destination: 'Chennai Port',
            priority: 'low',
            status: 'assigned',
            location: 'Bhilai Steel Plant',
            material: 'Steel Coils'
          }
        ]
      }
    ];

    const mockAvailableWagons = [
      {
        id: 'BOXN-99001',
        type: 'BOXN',
        capacity: 58,
        currentLoad: 0,
        destination: 'Unassigned',
        priority: 'low',
        status: 'available',
        location: 'Rourkela Steel Plant',
        material: null
      },
      {
        id: 'BOBRN-99002',
        type: 'BOBRN',
        capacity: 61,
        currentLoad: 0,
        destination: 'Unassigned',
        priority: 'low',
        status: 'available',
        location: 'Durgapur Steel Plant',
        material: null
      },
      {
        id: 'BCN-99003',
        type: 'BCN',
        capacity: 55,
        currentLoad: 0,
        destination: 'Unassigned',
        priority: 'low',
        status: 'maintenance',
        location: 'Bhilai Steel Plant',
        material: null
      },
      {
        id: 'BCNA-99004',
        type: 'BCNA',
        capacity: 60,
        currentLoad: 0,
        destination: 'Unassigned',
        priority: 'low',
        status: 'assigned',
        location: 'Bokaro Steel Plant',
        material: null
      }
    ];

    const mockRecommendations = [
      {
        id: 'REC-001',
        type: 'optimization',
        priority: 'high',
        title: 'Optimize Wagon Sequence',
        description: `Reordering wagons in FORM-001 based on destination proximity can reduce coupling time by 45 minutes and save fuel costs during shunting operations.`,
        impact: 85,
        costSavings: 25000,
        timeSavings: 2.5,
        efficiencyGain: 12,
        justification: [
          'Heavy wagons positioned at front reduce locomotive strain',
          'Similar destination grouping minimizes shunting operations',
          'Optimal weight distribution improves fuel efficiency'
        ],
        timestamp: '2 minutes ago'
      },
      {
        id: 'REC-002',
        type: 'cost_saving',
        priority: 'medium',
        title: 'Alternative Route Selection',
        description: `Consider routing Bhilai-Chennai freight via Visakhapatnam instead of direct route to utilize available track capacity and reduce congestion charges.`,
        impact: 72,
        costSavings: 18000,
        timeSavings: 1.8,
        efficiencyGain: 8,
        justification: [
          'Visakhapatnam route has 30% lower congestion',
          'Track availability confirmed for next 48 hours',
          'Reduced waiting time at junction points'
        ],
        timestamp: '5 minutes ago'
      }
    ];

    const mockConflicts = [
      {
        id: 'CONF-001',
        type: 'scheduling',
        severity: 'high',
        title: 'Track Capacity Conflict',
        description: `Formation FORM-001 scheduled departure conflicts with maintenance window on Rourkela-Jharsuguda section from 14:00 to 18:00 today.`,
        affectedResources: ['FORM-001', 'Track RJ-Section', 'Maintenance Crew-A'],
        suggestedResolution: 'Reschedule departure to 18:30 or use alternative route via Sambalpur',
        costImpact: 15000,
        timeImpact: 4,
        efficiencyImpact: 15,
        detectedAt: '10 minutes ago'
      },
      {
        id: 'CONF-002',
        type: 'capacity',
        severity: 'medium',
        title: 'Wagon Overloading Risk',
        description: `BOXN-45231 current load (55T) approaches maximum capacity (58T). Weather conditions may affect braking performance on gradient sections.`,
        affectedResources: ['BOXN-45231', 'Route Gradients', 'Safety Margins'],
        suggestedResolution: 'Reduce load to 52T or assign additional braking wagon',
        costImpact: 8000,
        timeImpact: 2,
        efficiencyImpact: 8,
        detectedAt: '15 minutes ago'
      }
    ];

    setFormations(mockFormations);
    setAvailableWagons(mockAvailableWagons);
    setRecommendations(mockRecommendations);
    setConflicts(mockConflicts);
  }, []);

  const handleReorderWagons = (draggedWagon, targetIndex, formationId) => {
    setFormations(prev => prev?.map(formation => {
      if (formation?.id === formationId) {
        const wagons = [...formation?.wagons];
        const draggedIndex = wagons?.findIndex(w => w?.id === draggedWagon?.id);
        
        if (draggedIndex !== -1) {
          const [removed] = wagons?.splice(draggedIndex, 1);
          wagons?.splice(targetIndex, 0, removed);
        }
        
        return { ...formation, wagons };
      }
      return formation;
    }));
  };

  const handleRemoveWagon = (wagonId, formationId) => {
    setFormations(prev => prev?.map(formation => {
      if (formation?.id === formationId) {
        return {
          ...formation,
          wagons: formation?.wagons?.filter(w => w?.id !== wagonId)
        };
      }
      return formation;
    }));

    // Add removed wagon back to available wagons
    const removedWagon = formations?.find(f => f?.id === formationId)
      ?.wagons?.find(w => w?.id === wagonId);
    
    if (removedWagon) {
      setAvailableWagons(prev => [...prev, {
        ...removedWagon,
        status: 'available',
        currentLoad: 0,
        destination: 'Unassigned',
        material: null
      }]);
    }
  };

  const handleAddToFormation = (wagon) => {
    // For demo purposes, add to first formation
    if (formations?.length > 0) {
      setFormations(prev => prev?.map((formation, index) => {
        if (index === 0) {
          return {
            ...formation,
            wagons: [...formation?.wagons, {
              ...wagon,
              status: 'assigned',
              destination: formation?.route?.split(' → ')?.[1],
              priority: 'medium'
            }]
          };
        }
        return formation;
      }));

      // Remove from available wagons
      setAvailableWagons(prev => prev?.filter(w => w?.id !== wagon?.id));
    }
  };

  const handleSaveFormation = (formationId) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`Formation ${formationId} saved successfully!`);
    }, 1000);
  };

  const handleGenerateAlternative = (formationId) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`Alternative plan generated for ${formationId}`);
    }, 1500);
  };

  const handleAcceptRecommendation = (recommendation) => {
    setRecommendations(prev => prev?.filter(r => r?.id !== recommendation?.id));
    alert(`Recommendation "${recommendation?.title}" has been applied to the formation plan.`);
  };

  const handleDismissRecommendation = (recommendationId) => {
    setRecommendations(prev => prev?.filter(r => r?.id !== recommendationId));
  };

  const handleResolveConflict = (conflict) => {
    setConflicts(prev => prev?.filter(c => c?.id !== conflict?.id));
    alert(`Conflict "${conflict?.title}" has been resolved.`);
  };

  const handleIgnoreConflict = (conflictId) => {
    setConflicts(prev => prev?.filter(c => c?.id !== conflictId));
  };

  const handleRefreshWagons = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Wagon data refreshed successfully!');
    }, 1000);
  };

  const handleSubmitForApproval = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Formation plans submitted for approval successfully!');
    }, 1500);
  };

  const tabs = [
    { id: 'formations', label: 'Formation Plans', icon: 'Train', count: formations?.length },
    { id: 'wagons', label: 'Available Wagons', icon: 'Package', count: availableWagons?.length },
    { id: 'recommendations', label: 'AI Recommendations', icon: 'Lightbulb', count: recommendations?.length },
    { id: 'conflicts', label: 'Conflict Detection', icon: 'AlertTriangle', count: conflicts?.length }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Formation Plan</h1>
              <p className="text-muted-foreground mt-2">
                Create and optimize rake formations with AI-powered recommendations
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleRefreshWagons}
                loading={isLoading}
                iconName="RefreshCw"
                iconPosition="left"
              >
                Refresh Data
              </Button>
              <Button
                variant="default"
                onClick={handleSubmitForApproval}
                loading={isLoading}
                iconName="Send"
                iconPosition="left"
              >
                Submit for Approval
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Formations</p>
                  <p className="text-2xl font-bold text-foreground">{formations?.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Train" size={24} className="text-primary" />
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Available Wagons</p>
                  <p className="text-2xl font-bold text-foreground">
                    {availableWagons?.filter(w => w?.status === 'available')?.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Package" size={24} className="text-success" />
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Savings</p>
                  <p className="text-2xl font-bold text-foreground">
                    ₹{formations?.reduce((sum, f) => sum + (f?.projectedSavings || 0), 0)?.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={24} className="text-accent" />
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Conflicts</p>
                  <p className="text-2xl font-bold text-error">{conflicts?.length}</p>
                </div>
                <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={24} className="text-error" />
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-border mb-8">
            <nav className="flex space-x-8">
              {tabs?.map(tab => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                  {tab?.count > 0 && (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      activeTab === tab?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {tab?.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'formations' && (
              <FormationTable
                formations={formations}
                onReorderWagons={handleReorderWagons}
                onRemoveWagon={handleRemoveWagon}
                onEditWagon={(wagon) => alert(`Edit wagon: ${wagon?.id}`)}
                onSaveFormation={handleSaveFormation}
                onGenerateAlternative={handleGenerateAlternative}
              />
            )}

            {activeTab === 'wagons' && (
              <AvailableWagons
                wagons={availableWagons}
                onAddToFormation={handleAddToFormation}
                onRefresh={handleRefreshWagons}
              />
            )}

            {activeTab === 'recommendations' && (
              <RecommendationPanel
                recommendations={recommendations}
                onAcceptRecommendation={handleAcceptRecommendation}
                onDismissRecommendation={handleDismissRecommendation}
              />
            )}

            {activeTab === 'conflicts' && (
              <ConflictDetection
                conflicts={conflicts}
                onResolveConflict={handleResolveConflict}
                onIgnoreConflict={handleIgnoreConflict}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FormationPlan;