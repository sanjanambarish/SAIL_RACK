import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo Section */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-xl elevation-2">
          <Icon name="Train" size={32} color="white" />
        </div>
      </div>

      {/* Title and Description */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-foreground">
          SAIL Rake Optimizer
        </h1>
        <p className="text-lg text-muted-foreground">
          Railway Logistics Management System
        </p>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Sign in to access your railway logistics optimization dashboard and manage rake formations efficiently.
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;