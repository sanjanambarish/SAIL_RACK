import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ScheduleModal = ({ isOpen, onClose, scheduleData, onSave }) => {
  const [formData, setFormData] = useState({
    plannedDispatch: scheduleData?.plannedDispatch || '',
    plannedArrival: scheduleData?.plannedArrival || '',
    priority: scheduleData?.priority || 'medium',
    notes: scheduleData?.notes || ''
  });

  const priorityOptions = [
    { value: 'critical', label: 'Critical Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave({
      ...scheduleData,
      ...formData
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto elevation-3">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="Calendar" size={24} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Schedule Details</h2>
              <p className="text-sm text-muted-foreground">
                {scheduleData?.rakeId} - {scheduleData?.route}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Current Status */}
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3">Current Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium text-foreground">{scheduleData?.status}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Location</p>
                <p className="font-medium text-foreground">{scheduleData?.currentLocation || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Delay</p>
                <p className="font-medium text-foreground">
                  {scheduleData?.delay > 0 ? `+${scheduleData?.delay} minutes` : 'On time'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Wagons</p>
                <p className="font-medium text-foreground">{scheduleData?.wagonCount || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Schedule Form */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Update Schedule</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Planned Dispatch"
                type="datetime-local"
                value={formData?.plannedDispatch}
                onChange={(e) => handleInputChange('plannedDispatch', e?.target?.value)}
              />
              <Input
                label="Planned Arrival"
                type="datetime-local"
                value={formData?.plannedArrival}
                onChange={(e) => handleInputChange('plannedArrival', e?.target?.value)}
              />
            </div>

            <Select
              label="Priority Level"
              options={priorityOptions}
              value={formData?.priority}
              onChange={(value) => handleInputChange('priority', value)}
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Notes
              </label>
              <textarea
                value={formData?.notes}
                onChange={(e) => handleInputChange('notes', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                rows={4}
                placeholder="Add any additional notes or comments..."
              />
            </div>
          </div>

          {/* Historical Data */}
          {scheduleData?.history && (
            <div>
              <h3 className="font-medium text-foreground mb-3">Schedule History</h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {scheduleData?.history?.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between text-sm border-b border-border pb-2">
                    <span className="text-muted-foreground">{entry?.timestamp}</span>
                    <span className="text-foreground">{entry?.action}</span>
                    <span className="text-muted-foreground">{entry?.user}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            iconName="Save"
            iconPosition="left"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;