import React from 'react';
import Icon from '../../../components/AppIcon';

const Features = () => {
  const features = [
    {
      name: 'Real-time Optimization',
      description: 'AI-powered algorithms continuously optimize rake formations and routing for maximum efficiency.',
      icon: 'Zap',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      name: 'Interactive Mapping',
      description: 'Visualize your entire railway network with real-time tracking and geographic insights.',
      icon: 'Map',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      name: 'Advanced Analytics',
      description: 'Comprehensive reporting and analytics to identify trends and optimization opportunities.',
      icon: 'BarChart3',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      name: 'Formation Planning',
      description: 'Intelligent formation planning with conflict detection and automated recommendations.',
      icon: 'Calendar',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    },
    {
      name: 'Timeline Management',
      description: 'Critical path analysis and schedule optimization for improved on-time performance.',
      icon: 'Clock',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      name: 'Cost Optimization',
      description: 'Reduce operational costs through intelligent resource allocation and route optimization.',
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Powerful Features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to optimize railway operations
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our comprehensive platform provides all the tools and insights needed to transform 
            your railway logistics operations with cutting-edge technology.
          </p>
        </div>
        
        <div className="mx-auto mt-12 max-w-2xl sm:mt-16 lg:mt-16 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${feature.bgColor}`}>
                    <Icon name={feature.icon} size={20} className={feature.color} />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a href="#" className="text-sm font-semibold leading-6 text-primary hover:text-primary/80">
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
