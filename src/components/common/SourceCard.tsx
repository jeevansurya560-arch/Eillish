import React from 'react';
import { FileCode, FileText, ArrowUpRight } from 'lucide-react';
import { Citation } from '../../types';
import './Common.css';

export interface SourceCardProps {
  citation: Citation;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const SourceCard: React.FC<SourceCardProps> = ({
  citation,
  isActive = false,
  onClick,
  className = '',
}) => {
  const isCode = citation.path.endsWith('.py') || citation.path.endsWith('.ts') || citation.path.endsWith('.go');

  return (
    <div
      className={`ui-source-card ${isActive ? 'active' : ''} ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="ui-source-top">
        <div className="flex items-center gap-2">
          {isCode ? <FileCode size={14} /> : <FileText size={14} />}
          <span className="ui-source-path">{citation.path}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="ui-citation-pill">
            L{citation.lineStart}–L{citation.lineEnd}
          </span>
          <span
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-manrope)',
              fontWeight: 700,
              color: 'var(--color-charcoal-ink)',
            }}
          >
            {citation.relevanceScore}% match
          </span>
          <ArrowUpRight size={13} />
        </div>
      </div>
      <div className="ui-source-excerpt">
        <code>{citation.excerpt}</code>
      </div>
    </div>
  );
};
