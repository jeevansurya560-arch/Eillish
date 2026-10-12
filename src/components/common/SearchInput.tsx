import React from 'react';
import { Search, X } from 'lucide-react';
import './Common.css';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  className?: string;
  autoFocus?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search knowledge, code, or documentation...',
  onClear,
  className = '',
  autoFocus = false,
}) => {
  return (
    <div className={`ui-search-box ${className}`}>
      <Search size={16} className="ui-search-icon" />
      <input
        type="text"
        className="ui-search-field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
      {value && (
        <button
          type="button"
          className="ui-search-clear"
          onClick={() => {
            onChange('');
            if (onClear) onClear();
          }}
          aria-label="Clear search input"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};
