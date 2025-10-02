import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/main-dashboard', 
      icon: 'LayoutDashboard',
      description: 'Real-time operational overview'
    },
    { 
      label: 'Map View', 
      path: '/map-view', 
      icon: 'Map',
      description: 'Geographic visualization'
    },
    { 
      label: 'Planning', 
      path: '/formation-plan', 
      icon: 'Calendar',
      description: 'Formation and schedule management'
    },
    { 
      label: 'Timeline', 
      path: '/timeline-view', 
      icon: 'Clock',
      description: 'Schedule timeline view'
    },
    { 
      label: 'Analytics', 
      path: '/analytics', 
      icon: 'BarChart3',
      description: 'Performance metrics'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
    setIsUserMenuOpen(false);
  };

  const isActive = (path) => location?.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border elevation-1">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Train" size={24} color="white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-semibold text-foreground">SAIL Rake Optimizer</h1>
            <p className="text-xs text-muted-foreground">Railway Logistics Management</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Button
              key={item?.path}
              variant={isActive(item?.path) ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
              className="px-3 py-2 text-sm font-medium transition-hover"
            >
              {item?.label}
            </Button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
          </Button>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 px-3"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-foreground">Operations Manager</p>
                <p className="text-xs text-muted-foreground">SAIL Railways</p>
              </div>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </Button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg elevation-2 animate-slide-in">
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-medium text-popover-foreground">Operations Manager</p>
                  <p className="text-xs text-muted-foreground">manager@sail.railways</p>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-hover"
                  >
                    <Icon name="User" size={16} className="mr-3" />
                    Profile Settings
                  </button>
                  <button
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-hover"
                  >
                    <Icon name="Settings" size={16} className="mr-3" />
                    Preferences
                  </button>
                  <button
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-hover"
                  >
                    <Icon name="HelpCircle" size={16} className="mr-3" />
                    Help & Support
                  </button>
                  <div className="border-t border-border mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 py-2 text-sm text-error hover:bg-muted transition-hover"
                    >
                      <Icon name="LogOut" size={16} className="mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border elevation-2">
          <nav className="px-4 py-3 space-y-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center w-full px-3 py-3 rounded-lg text-left transition-hover ${
                  isActive(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  className="mr-3" 
                  color={isActive(item?.path) ? 'currentColor' : undefined}
                />
                <div>
                  <p className="font-medium">{item?.label}</p>
                  <p className={`text-xs ${
                    isActive(item?.path) ? 'text-primary-foreground/80' : 'text-muted-foreground'
                  }`}>
                    {item?.description}
                  </p>
                </div>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;