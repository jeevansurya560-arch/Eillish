import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Database, MessageSquareText, FileEdit, ArrowRight } from 'lucide-react';
import { ActivityEvent } from '../../types';
import './Dashboard.css';

interface RecentActivityFeedProps {
  activities: ActivityEvent[];
}

export const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ activities }) => {
  const navigate = useNavigate();

  const getNodeIcon = (type: ActivityEvent['type']) => {
    switch (type) {
      case 'repo_sync':
        return (
          <div className="timeline-node-icon timeline-node-icon--repo">
            <RefreshCw size={11} />
          </div>
        );
      case 'knowledge_indexed':
        return (
          <div className="timeline-node-icon timeline-node-icon--index">
            <Database size={11} />
          </div>
        );
      case 'ai_query':
        return (
          <div className="timeline-node-icon timeline-node-icon--query">
            <MessageSquareText size={11} />
          </div>
        );
      default:
        return (
          <div className="timeline-node-icon">
            <FileEdit size={11} />
          </div>
        );
    }
  };

  return (
    <div className="activity-timeline-card">
      <div className="card-header-clean">
        <div>
          <div className="card-title-main">Recent Activity</div>
          <div className="card-subtitle-sub">Continuous repository ingestion and query log</div>
        </div>
        <button
          className="ui-button ui-button--ghost ui-button--sm"
          onClick={() => navigate('/activity')}
        >
          <span>View all</span>
          <ArrowRight size={12} />
        </button>
      </div>

      <div className="timeline-list">
        {activities.map((act, i) => (
          <div key={act.id} className="timeline-item">
            {/* Connecting line */}
            {i < activities.length - 1 && <div className="timeline-track-line" />}

            {getNodeIcon(act.type)}

            <div className="timeline-body">
              <div className="timeline-header-row">
                <span className="timeline-title">{act.title}</span>
                <span className="timeline-time">{act.timestamp}</span>
              </div>
              <div className="timeline-desc">{act.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
