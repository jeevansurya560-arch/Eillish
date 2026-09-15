import React, { useState } from 'react';
import {
  RefreshCw,
  Database,
  MessageSquareText,
  FileEdit,
  Search,
  X,
} from 'lucide-react';
import { mockActivityEvents } from '../data/mockData';
import { ActivityEvent } from '../types';
import { Badge } from '../components/common/Badge';

export const ActivityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState('');

  const tabs = [
    { id: 'All', label: 'All Events' },
    { id: 'Repositories', label: 'Repositories' },
    { id: 'Indexing', label: 'Indexing' },
    { id: 'Search', label: 'Queries' },
    { id: 'Knowledge', label: 'Documents' },
  ];

  const filteredEvents = mockActivityEvents.filter((evt) => {
    // Category match
    let categoryMatch = true;
    if (activeTab === 'Repositories') categoryMatch = evt.type === 'repo_sync';
    if (activeTab === 'Indexing') categoryMatch = evt.type === 'knowledge_indexed';
    if (activeTab === 'Search') categoryMatch = evt.type === 'ai_query';
    if (activeTab === 'Knowledge') categoryMatch = evt.type === 'doc_updated';

    // Search match
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

      {/* Filter Tabs & Search */}
      <div className="ui-card" style={{ padding: '8px 12px' }}>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {/* Category Tabs */}
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '5px 11px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12.5px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  background: activeTab === tab.id ? 'var(--text-primary)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--text-inverse)' : 'var(--text-secondary)',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-2" style={{ minWidth: 220 }}>
            <Search size={14} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search activity events..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{ fontSize: '13px', color: 'var(--text-primary)' }}
            />
            {searchFilter && (
              <button onClick={() => setSearchFilter('')} style={{ color: 'var(--text-muted)' }}>
                <X size={12} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Timeline Events List */}
      <div className="ui-card" style={{ padding: '16px 20px' }}>
        <div className="timeline-list">
          {filteredEvents.map((evt, i) => (
            <div key={evt.id} className="timeline-item">
              {i < filteredEvents.length - 1 && <div className="timeline-track-line" />}

              {getEventIcon(evt.type)}

              <div className="timeline-body">
                <div className="timeline-header-row">
                  <div className="flex items-center gap-2">
                    <span className="timeline-title">{evt.title}</span>
                    <Badge variant="emerald" dot>
                      Success
                    </Badge>
                  </div>
                  <span className="timeline-time">{evt.timestamp}</span>
                </div>

                <div className="timeline-desc" style={{ marginTop: 3 }}>
                  {evt.description}
                </div>

                {evt.metadata && (
                  <div
                    className="flex items-center gap-3 type-metadata"
                    style={{
                      marginTop: 6,
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-muted)',
                      fontSize: '11px',
                    }}
                  >
                    {evt.metadata.repository && <span>repo: {evt.metadata.repository}</span>}
                    {evt.metadata.filesProcessed && (
                      <span>files: {evt.metadata.filesProcessed}</span>
                    )}
                    {evt.metadata.chunksAdded && (
                      <span>chunks: +{evt.metadata.chunksAdded}</span>
                    )}
                    {evt.metadata.filePath && <span>path: {evt.metadata.filePath}</span>}
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredEvents.length === 0 && (
            <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
              No events found matching current criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
