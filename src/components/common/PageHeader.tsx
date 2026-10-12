import React from 'react';
import './Common.css';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  actions,
  className = '',
}) => {
  return (
    <header className={`ui-page-header ${className}`}>
      <div className="ui-page-header-text">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="ui-page-title">{title}</h1>
          {badge}
        </div>
        {subtitle && <p className="ui-page-desc">{subtitle}</p>}
      </div>
      {actions && <div className="ui-page-actions">{actions}</div>}
    </header>
  );
};
