import React from 'react';
import './Common.css';

export interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  icon?: React.ReactNode;
  iconBg?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  delta,
  icon,
  iconBg,
  className = '',
}) => {
  return (
    <div className={`ui-stat-card ${className}`}>
      <div className="ui-stat-top">
        <span className="ui-stat-label">{label}</span>
        {icon && (
          <div
            className="ui-stat-icon-wrapper"
            style={iconBg ? { backgroundColor: iconBg } : undefined}
          >
            {icon}
          </div>
        )}
      </div>
      <div className="ui-stat-value">{value}</div>
      {delta && <div className="ui-stat-delta">{delta}</div>}
    </div>
  );
};
