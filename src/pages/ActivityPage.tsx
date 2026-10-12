import React, { useState, useEffect } from 'react';
import {
  RefreshCw,
  Database,
  MessageSquareText,
  FileEdit,
  Search,
  X,
  AlertCircle,
  Activity,
} from 'lucide-react';
import { ApiClient } from '../services/apiClient';
import { ActivityEvent } from '../types';
import { Badge } from '../components/common/Badge';

export const ActivityPage: React.FC = () => {
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState('');

  const loadActivities = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await ApiClient.get<ActivityEvent[]>('/activity');
      setEvents(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch activity logs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const tabs = [
    { id: 'All', label: 'All Events' },
    { id: 'Repositories', label: 'Repositories' },
    { id: 'Indexing', label: 'Indexing' },
    { id: 'Search', label: 'Queries' },
    { id: 'Knowledge', label: 'Documents' },
  ];

  const filteredEvents = events.filter((evt) => {
    let categoryMatch = true;
    if (activeTab === 'Repositories') categoryMatch = evt.type === 'repo_sync';
    if (activeTab === 'Indexing') categoryMatch = evt.type === 'knowledge_indexed';
    if (activeTab === 'Search') categoryMatch = evt.type === 'ai_query';
    if (activeTab === 'Knowledge') categoryMatch = evt.type === 'doc_updated';

    const searchMatch =
      evt.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchFilter.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const getEventIcon = (type: ActivityEvent['type']) => {
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
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="hero-title-group">
        <h1 className="hero-heading">Activity Timeline</h1>
        <p className="hero-subtitle">
          Continuous, searchable audit log of repository synchronization, vector re-indexing, and knowledge queries.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="ui-card" style={{ padding: '8px 12px' }}>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {/* Category Tabs */}
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: activeTab === tab.id ? 'var(--color-charcoal-ink)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--color-snow)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background var(--transition-fast)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Filter */}
          <div
            className="flex items-center gap-2"
            style={{
              background: 'var(--surface-subtle)',
              border: '1.5px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '4px 10px',
              minWidth: '200px',
            }}
          >
            <Search size={13} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search event title or description..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '12px',
                fontFamily: 'var(--font-sans)',
                color: 'var(--text-primary)',
                width: '100%',
              }}
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  display: 'flex',
                }}
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Activity Timeline Feed */}
      {isLoading ? (
        <div className="ui-card" style={{ padding: '60px', textAlign: 'center' }}>
          <div
            style={{
              width: 32,
              height: 32,
              border: '3px solid var(--color-charcoal-ink)',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              margin: '0 auto 16px auto',
              animation: 'spin 0.8s linear infinite',
            }}
          />
          <div style={{ fontWeight: 700, fontSize: '14px' }}>Loading real system activity...</div>
        </div>
      ) : error ? (
        <div className="ui-card" style={{ padding: '32px', textAlign: 'center', borderColor: '#ef4444' }}>
          <AlertCircle size={28} style={{ color: '#ef4444', margin: '0 auto 12px auto' }} />
          <div style={{ fontWeight: 800, fontSize: '15px', color: '#991b1b', marginBottom: 6 }}>
            Error Loading Activities
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{error}</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="ui-card" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <div className="flex flex-col items-center gap-3">
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 'var(--radius-sm)',
                background: 'var(--surface-subtle)',
                border: '2px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Activity size={20} style={{ color: 'var(--text-muted)' }} />
            </div>
            <h3 className="type-h3" style={{ fontSize: 16 }}>No activity events recorded</h3>
            <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '14px', color: 'var(--text-secondary)', maxWidth: 420 }}>
              {searchFilter
                ? 'No activities matched your search criteria.'
                : 'Activity events will appear here as repositories are synced, chunks indexed, and queries executed.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="ui-card" style={{ padding: '16px 20px' }}>
          <div className="activity-timeline">
            {filteredEvents.map((evt) => (
              <div key={evt.id} className="timeline-node">
                <div className="timeline-marker">
                  {getEventIcon(evt.type)}
                  <div className="timeline-connector" />
                </div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <span className="timeline-title">{evt.title}</span>
                    <span className="type-timestamp">{evt.timestamp}</span>
                  </div>
                  <div className="timeline-desc">{evt.description}</div>
                  {evt.metadata && (
                    <div className="timeline-meta-chips">
                      {evt.metadata.repository && (
                        <Badge variant="slate">{evt.metadata.repository}</Badge>
                      )}
                      {evt.metadata.chunksAdded && (
                        <Badge variant="emerald">+{evt.metadata.chunksAdded} chunks</Badge>
                      )}
                      {evt.metadata.filesProcessed && (
                        <Badge variant="blue">{evt.metadata.filesProcessed} files</Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
