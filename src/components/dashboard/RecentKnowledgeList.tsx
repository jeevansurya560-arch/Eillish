import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileCode, FileText, ArrowRight } from 'lucide-react';
import { Document } from '../../types';
import { Badge } from '../common/Badge';
import './Dashboard.css';

interface RecentKnowledgeListProps {
  documents: Document[];
}

export const RecentKnowledgeList: React.FC<RecentKnowledgeListProps> = ({ documents }) => {
  const navigate = useNavigate();

  const getDocIcon = (type: Document['type']) => {
    return type === 'code' ? <FileCode size={14} /> : <FileText size={14} />;
  };

  return (
    <div className="recent-knowledge-box">
      <div className="card-header-clean">
        <div>
          <div className="card-title-main">Recent Knowledge</div>
          <div className="card-subtitle-sub">
            Technical documents and code parsed into semantic chunks
          </div>
        </div>
        <button
          className="ui-button ui-button--ghost ui-button--sm"
          onClick={() => navigate('/knowledge')}
        >
          <span>View all</span>
          <ArrowRight size={12} />
        </button>
      </div>

      <div className="knowledge-rows-list">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="knowledge-row"
            onClick={() => navigate('/knowledge')}
          >
            <div className="knowledge-row-left">
              <div className="file-type-icon">{getDocIcon(doc.type)}</div>
              <div className="doc-info-block">
                <div className="doc-info-title">{doc.title}</div>
                <div className="doc-info-sub">
                  <span className="type-path">{doc.path}</span>
                  <span>·</span>
                  <span>{doc.repository}</span>
                  <span>·</span>
                  <span>Updated {doc.updatedAt}</span>
                </div>
              </div>
            </div>

            <div className="knowledge-row-right">
              <span className="type-metadata" style={{ fontFamily: 'var(--font-mono)' }}>
                {doc.chunksCount} chunks
              </span>
              <Badge variant="emerald" dot>
                Indexed
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
