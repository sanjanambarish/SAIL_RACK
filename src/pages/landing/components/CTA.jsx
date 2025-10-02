import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CTA = ({ onGetStarted }) => {
  return (
    <div className="bg-primary">
      <div className="px-6 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to optimize your railway operations?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/80">
            Join leading railway operators who have transformed their logistics with our AI-powered platform. 
            Start your optimization journey today.
          </p>
          <div className="mt-8 flex items-center justify-center gap-x-6">
            <Button 
              variant="secondary"
              size="lg"
              onClick={onGetStarted}
              iconName="ArrowRight"
              iconPosition="right"
            >
              Get Started Free
            </Button>
            <Button 
              variant="ghost"
              size="lg"
              className="text-primary-foreground hover:bg-primary-foreground/10"
              iconName="Phone"
              iconPosition="left"
            >
              Contact Sales
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 flex items-center justify-center space-x-8 text-primary-foreground/60">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} />
              <span className="text-sm">Enterprise Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} />
              <span className="text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={16} />
              <span className="text-sm">ISO Certified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
