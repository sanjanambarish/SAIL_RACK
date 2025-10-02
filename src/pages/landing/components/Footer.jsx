import React from 'react';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const navigation = {
    solutions: [
      { name: 'Rake Optimization', href: '#' },
      { name: 'Route Planning', href: '#' },
      { name: 'Analytics', href: '#' },
      { name: 'Formation Planning', href: '#' },
    ],
    support: [
      { name: 'Documentation', href: '#' },
      { name: 'Guides', href: '#' },
      { name: 'API Reference', href: '#' },
      { name: 'Support Center', href: '#' },
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    legal: [
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
      { name: 'Security', href: '#' },
      { name: 'Compliance', href: '#' },
    ],
    social: [
      {
        name: 'LinkedIn',
        href: '#',
        icon: 'Linkedin',
      },
      {
        name: 'Twitter',
        href: '#',
        icon: 'Twitter',
      },
      {
        name: 'GitHub',
        href: '#',
        icon: 'Github',
      },
      {
        name: 'YouTube',
        href: '#',
        icon: 'Youtube',
      },
    ],
  };

  return (
    <footer className="bg-card" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-12 sm:pt-16 lg:px-8 lg:pt-20">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Icon name="Train" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">SAIL Rake Optimizer</h1>
                <p className="text-xs text-muted-foreground">Railway Logistics Management</p>
              </div>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              Transforming railway operations with AI-powered optimization and intelligent logistics management. 
              Built for the future of railway transportation.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">{item.name}</span>
                  <Icon name={item.icon} size={20} />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-foreground">Solutions</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-foreground">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-foreground">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-foreground">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-6 sm:mt-16 lg:mt-16">
          <div className="flex items-center justify-between">
            <p className="text-xs leading-5 text-muted-foreground">
              &copy; 2024 SAIL Rake Optimizer. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span>Made with ❤️ for Indian Railways</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
