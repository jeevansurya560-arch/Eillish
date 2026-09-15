import React from 'react';
import './Common.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
  interactive?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  interactive = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`ui-card ${hoverable ? 'ui-card--hoverable' : ''} ${
        interactive ? 'ui-card--interactive' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`ui-card-header ${className}`}>{children}</div>;

export const CardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`ui-card-body ${className}`}>{children}</div>;
