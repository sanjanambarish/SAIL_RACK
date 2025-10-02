import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginFooter = () => {
  const currentYear = new Date()?.getFullYear();

  return (
    <div className="mt-8 pt-6 border-t border-border">
      {/* Security Notice */}
      <div className="bg-muted rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-primary mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">Secure Access</p>
            <p className="text-muted-foreground">
              This system is for authorized SAIL personnel only. All activities are monitored and logged for security compliance.
            </p>
          </div>
        </div>
      </div>

      {/* Mock Credentials Helper */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-900 mb-2">Demo Credentials</p>
            <div className="space-y-2 text-blue-800">
              <div>
                <p className="font-medium">Planner Access:</p>
                <p>Username: planner@sail.com | Password: planner123</p>
              </div>
              <div>
                <p className="font-medium">Operator Access:</p>
                <p>Username: operator@sail.com | Password: operator123</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <button className="hover:text-foreground transition-hover">
            Privacy Policy
          </button>
          <button className="hover:text-foreground transition-hover">
            Terms of Service
          </button>
          <button className="hover:text-foreground transition-hover">
            Support
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Copyright" size={14} />
          <span>{currentYear} Steel Authority of India Limited. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
};

export default LoginFooter;