import React from 'react';
import { Badge } from '../common/Badge';
import './Dashboard.css';

export const SystemPipelineCard: React.FC = () => {
  const stages = [
    {
      num: '01',
      name: 'Ingestion & Watchers',
      desc: '12 repositories active',
      sub: 'Status: Active · Webhooks healthy',
      badge: 'Active',
      badgeVariant: 'emerald' as const,
    },
    {
      num: '02',
      name: 'Semantic Chunking',
      desc: '8,421 chunks',
      sub: 'AST-aware boundaries · 10% overlap',
      badge: 'Processed',
      badgeVariant: 'blue' as const,
    },
    {
      num: '03',
      name: 'Vector Index & Graphs',
      desc: 'pgvector IVFFlat',
      sub: 'Synchronized · Cosine similarity',
      badge: 'Synced',
      badgeVariant: 'slate' as const,
    },
    {
      num: '04',
      name: 'Evidence & Reasoning',
      desc: 'Hybrid retrieval + citations',
      sub: 'Exact line-span references',
      badge: 'Ready',
      badgeVariant: 'emerald' as const,
    },
  ];

  return (
    <div className="pipeline-container-card">
      <div className="card-header-clean">
        <div>
          <div className="card-title-main">Knowledge Pipeline</div>
          <div className="card-subtitle-sub">
            From repository ingestion to evidence-backed reasoning
          </div>
        </div>
        <Badge variant="emerald" dot>
          Operational
        </Badge>
      </div>

      <div className="pipeline-stages-list">
        {stages.map((st, i) => (
          <div key={st.num} className="pipeline-stage-item">
            {/* Connecting line */}
            {i < stages.length - 1 && <div className="pipeline-connector-line" />}

            <div className="stage-step-badge">{st.num}</div>

            <div className="stage-content-box">
              <div className="stage-title-row">
                <span className="stage-name">{st.name}</span>
                <Badge variant={st.badgeVariant} dot={st.badgeVariant === 'emerald'}>
                  {st.badge}
                </Badge>
              </div>
              <div className="stage-meta">{st.desc} · <span style={{ color: 'var(--text-muted)' }}>{st.sub}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
