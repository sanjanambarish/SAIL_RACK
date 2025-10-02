import React from 'react';
import * as LucideIcons from 'lucide-react';

/**
 * AppIcon Component
 * A wrapper around Lucide Icons with additional styling and functionality
 * 
 * @param {string} name - Name of the Lucide icon (e.g., 'Home', 'Settings', etc.)
 * @param {string} className - Additional CSS classes to apply to the icon
 * @param {object} props - Additional props to pass to the icon component
 * @returns {React.ReactElement} Rendered icon component
 */
const AppIcon = ({ name, className = '', ...props }) => {
  // Convert the icon name to match Lucide's component naming convention
  const iconName = name?.replace(/[^a-zA-Z0-9]/g, '');
  
  // Get the icon component from Lucide
  const IconComponent = LucideIcons[iconName] || LucideIcons['HelpCircle'];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found. Using HelpCircle as fallback.`);
  }

  return (
    <IconComponent 
      className={`w-5 h-5 ${className}`} 
      aria-hidden="true"
      {...props}
    />
  );
};

export default AppIcon;
