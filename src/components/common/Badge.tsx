import React from 'react';
import './Common.css';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'slate' | 'emerald' | 'blue' | 'amber' | 'rose';
  dot?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'slate',
  dot = false,
  className = '',
  icon,
}) => {
  return (
    <span className={`ui-badge ui-badge--${variant} ${className}`}>
      {dot && <span className="ui-badge--dot" />}
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
