import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Hero = ({ onGetStarted, onLogin }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-8">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Train" size={24} color="white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">SAIL Rake Optimizer</h1>
            <p className="text-xs text-muted-foreground">Railway Logistics Management</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onLogin}>
            Sign In
          </Button>
          <Button onClick={onGetStarted}>
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-6 sm:pb-20 lg:flex lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-4">
          <div className="mt-8 sm:mt-12 lg:mt-8">
            <div className="inline-flex space-x-6">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold leading-6 text-primary ring-1 ring-inset ring-primary/20">
                Latest updates
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-muted-foreground">
                <span>Just shipped v2.0</span>
                <Icon name="ChevronRight" size={16} />
              </span>
            </div>
          </div>
          
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Optimize Railway Operations with{' '}
            <span className="text-primary">AI-Powered</span> Intelligence
          </h1>
          
          <p className="mt-4 text-lg leading-7 text-muted-foreground">
            Transform your railway logistics with real-time rake formation optimization, 
            intelligent scheduling, and comprehensive analytics. Reduce costs, improve efficiency, 
            and maximize operational performance.
          </p>
          
          <div className="mt-8 flex items-center gap-x-6">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              iconName="ArrowRight"
              iconPosition="right"
            >
              Start Optimizing
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              iconName="Play"
              iconPosition="left"
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-10 flex items-center gap-x-8">
            <div>
              <p className="text-2xl font-bold text-foreground">25%</p>
              <p className="text-sm text-muted-foreground">Cost Reduction</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">40%</p>
              <p className="text-sm text-muted-foreground">Faster Operations</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">99.9%</p>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
          </div>
        </div>
        
        {/* Hero Image/Illustration */}
        <div className="mx-auto mt-12 flex max-w-2xl sm:mt-16 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-20">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="relative rounded-2xl bg-card p-6 shadow-2xl ring-1 ring-border">
              {/* Dashboard Preview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Live Dashboard</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">Live</span>
                  </div>
                </div>
                
                {/* Mock Dashboard Elements */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="Train" size={20} className="text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Active Rakes</p>
                        <p className="text-2xl font-bold text-primary">156</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-success/10 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="TrendingUp" size={20} className="text-success" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Efficiency</p>
                        <p className="text-2xl font-bold text-success">94%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-warning/10 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={20} className="text-warning" />
                      <div>
                        <p className="text-sm font-medium text-foreground">On Time</p>
                        <p className="text-2xl font-bold text-warning">87%</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Mock Chart */}
                <div className="bg-muted/50 rounded-lg p-3 h-24 flex items-end justify-between">
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i}
                      className="bg-primary rounded-t w-4"
                      style={{ height: `${Math.random() * 80 + 20}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  );
};

export default Hero;
