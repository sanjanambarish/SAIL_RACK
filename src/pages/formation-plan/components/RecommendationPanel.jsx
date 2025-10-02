import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationPanel = ({ recommendations, onAcceptRecommendation, onDismissRecommendation }) => {
  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'optimization': return 'Zap';
      case 'cost_saving': return 'DollarSign';
      case 'efficiency': return 'TrendingUp';
      case 'route': return 'Route';
      default: return 'Lightbulb';
    }
  };

  const getRecommendationColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-error bg-error/5';
      case 'medium': return 'border-warning bg-warning/5';
      case 'low': return 'border-success bg-success/5';
      default: return 'border-border bg-muted/5';
    }
  };

  const getImpactColor = (impact) => {
    if (impact >= 80) return 'text-success';
    if (impact >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">AI Recommendations</h3>
          <p className="text-sm text-muted-foreground">
            {recommendations?.length} optimization suggestions
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground">Live Analysis</span>
        </div>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {recommendations?.length > 0 ? (
          recommendations?.map(recommendation => (
            <div
              key={recommendation?.id}
              className={`border rounded-lg p-4 transition-all duration-200 hover:elevation-1 ${
                getRecommendationColor(recommendation?.priority)
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    recommendation?.priority === 'high' ? 'bg-error/10' :
                    recommendation?.priority === 'medium' ? 'bg-warning/10' : 'bg-success/10'
                  }`}>
                    <Icon 
                      name={getRecommendationIcon(recommendation?.type)} 
                      size={20} 
                      className={
                        recommendation?.priority === 'high' ? 'text-error' :
                        recommendation?.priority === 'medium' ? 'text-warning' : 'text-success'
                      }
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{recommendation?.title}</h4>
                    <p className="text-xs text-muted-foreground capitalize">
                      {recommendation?.type?.replace('_', ' ')} • {recommendation?.priority} priority
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${getImpactColor(recommendation?.impact)}`}>
                    {recommendation?.impact}% Impact
                  </p>
                </div>
              </div>

              <p className="text-sm text-foreground mb-4 leading-relaxed">
                {recommendation?.description}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-muted/30 rounded-lg">
                <div className="text-center">
                  <p className="text-lg font-bold text-success">
                    ₹{recommendation?.costSavings?.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-muted-foreground">Cost Savings</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-primary">
                    {recommendation?.timeSavings}h
                  </p>
                  <p className="text-xs text-muted-foreground">Time Saved</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-warning">
                    {recommendation?.efficiencyGain}%
                  </p>
                  <p className="text-xs text-muted-foreground">Efficiency</p>
                </div>
              </div>

              {/* Justification */}
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Justification:</p>
                <ul className="text-sm text-foreground space-y-1">
                  {recommendation?.justification?.map((point, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Icon name="Clock" size={12} />
                  <span>Generated {recommendation?.timestamp}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDismissRecommendation && onDismissRecommendation(recommendation?.id)}
                  >
                    Dismiss
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onAcceptRecommendation && onAcceptRecommendation(recommendation)}
                    iconName="Check"
                    iconPosition="left"
                  >
                    Accept
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="Lightbulb" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">No recommendations available</p>
            <p className="text-sm text-muted-foreground">
              AI analysis will appear here as you modify formations
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationPanel;