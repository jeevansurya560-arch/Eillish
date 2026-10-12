import React from 'react';
import { FileCode, FileText, Layers, FolderGit2 } from 'lucide-react';
import { Document } from '../../types';
import { Badge } from './Badge';
import './Common.css';

export interface DocumentCardProps {
  document: Document;
  onClick?: () => void;
  className?: string;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  onClick,
  className = '',
}) => {
  const isCode = document.type === 'code';

  return (
    <article
      className={`ui-doc-card ${className}`}
      onClick={onClick}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="ui-doc-header">
        <div className="flex items-center gap-2">
          {isCode ? <FileCode size={16} /> : <FileText size={16} />}
          <span className="ui-doc-title">{document.title}</span>
        </div>
        <Badge
          variant={
            document.type === 'code'
              ? 'blue'
              : document.type === 'markdown'
              ? 'emerald'
              : 'amber'
          }
        >
          {document.type}
        </Badge>
      </div>

      <div className="ui-doc-path">{document.path}</div>
      <p className="ui-doc-desc">{document.description}</p>

      <div className="flex items-center gap-2 flex-wrap">
        {document.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-manrope)',
              fontWeight: 700,
              padding: '2px 8px',
              background: 'var(--surface-subtle)',
              border: '1px solid var(--color-charcoal-ink)',
              borderRadius: 'var(--radius-full)',
            }}
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="ui-doc-footer">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 ui-doc-meta">
            <FolderGit2 size={12} />
            <span>{document.repository}</span>
          </span>
          <span className="flex items-center gap-1 ui-doc-meta">
            <Layers size={12} />
            <span>{document.chunksCount} AST chunks</span>
          </span>
        </div>
        <span className="ui-doc-meta">{document.updatedAt}</span>
      </div>
    </article>
  );
};
