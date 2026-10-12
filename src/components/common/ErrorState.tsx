import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './Button';
import './Common.css';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong loading this knowledge",
  message = "Eillish couldn't retrieve this data right now. Check your connection or try again.",
  onRetry,
  className = '',
}) => {
  return (
    <div className={`ui-error-state ${className}`}>
      <div className="ui-error-icon-wrap">
        <AlertCircle size={24} color="#000000" />
      </div>
      <h3 className="ui-empty-title">{title}</h3>
      <p className="ui-empty-desc">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};
