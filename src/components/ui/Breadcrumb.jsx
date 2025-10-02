import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathMap = {
    '/main-dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/map-view': { label: 'Map View', icon: 'Map' },
    '/formation-plan': { label: 'Formation Plan', icon: 'Calendar' },
    '/analytics': { label: 'Analytics', icon: 'BarChart3' },
    '/timeline-view': { label: 'Timeline View', icon: 'Clock' },
    '/login': { label: 'Login', icon: 'LogIn' }
  };

  const currentPath = location?.pathname;
  const currentPage = pathMap?.[currentPath];

  if (!currentPage || currentPath === '/login') {
    return null;
  }

  const handleHomeClick = () => {
    navigate('/main-dashboard');
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      <button
        onClick={handleHomeClick}
        className="flex items-center space-x-1 hover:text-foreground transition-hover"
      >
        <Icon name="Home" size={16} />
        <span>Home</span>
      </button>
      <Icon name="ChevronRight" size={14} className="text-border" />
      <div className="flex items-center space-x-2 text-foreground font-medium">
        <Icon name={currentPage?.icon} size={16} />
        <span>{currentPage?.label}</span>
      </div>
    </nav>
  );
};

export default Breadcrumb;