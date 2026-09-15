import React from 'react';
import {
  TrendingUp,
  Cpu,
  Target,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Sparkline } from '../components/common/Sparkline';

export const AnalyticsPage: React.FC = () => {
  // Weekly query volume data
  const queryVolumeDays = [
    { day: 'Mon', count: 142 },
    { day: 'Tue', count: 198 },
    { day: 'Wed', count: 235 },
    { day: 'Thu', count: 210 },
    { day: 'Fri', count: 284 },
    { day: 'Sat', count: 95 },
    { day: 'Sun', count: 82 },
  ];
  const maxQueries = Math.max(...queryVolumeDays.map((q) => q.count));

  const topQueries = [
    { query: 'FastAPI JWT middleware verification', count: 184, avgLatency: '112ms', coverage: '98%' },
    { query: 'pgvector IVFFlat cosine distance indexing', count: 142, avgLatency: '148ms', coverage: '94%' },
    { query: 'Semantic chunk overlap boundary formula', count: 119, avgLatency: '95ms', coverage: '99%' },
    { query: 'GitHub push webhook payload verification', count: 98, avgLatency: '124ms', coverage: '92%' },
    { query: 'Hybrid dense sparse cross-encoder ranker', count: 86, avgLatency: '162ms', coverage: '96%' },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="hero-title-group">
        <h1 className="hero-heading">Retrieval & RAG Analytics</h1>
        <p className="hero-subtitle">
          Real-time diagnostic benchmarks evaluating vector retrieval quality, groundedness, and latency.
        </p>
      </div>

      {/* Top 4 KPI Diagnostics */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-card-label">Precision@K</span>
            <div className="kpi-icon-pill"><Target size={12} /></div>
          </div>
          <div className="kpi-card-middle">
            <div className="kpi-value">0.89</div>
            <Sparkline data={[0.82, 0.84, 0.85, 0.87, 0.86, 0.88, 0.89]} width={64} height={20} color="#2563EB" />
          </div>
          <div className="kpi-card-bottom">
            <span className="kpi-trend-badge"><TrendingUp size={12} /> +4.2%</span>
            <span className="type-metadata">Top-K relevance density</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-card-label">Groundedness</span>
            <div className="kpi-icon-pill"><CheckCircle2 size={12} /></div>
          </div>
          <div className="kpi-card-middle">
            <div className="kpi-value">0.96</div>
            <Sparkline data={[0.91, 0.92, 0.94, 0.93, 0.95, 0.95, 0.96]} width={64} height={20} color="#059669" />
          </div>
          <div className="kpi-card-bottom">
            <span className="kpi-trend-badge"><TrendingUp size={12} /> +1.8%</span>
            <span className="type-metadata">Zero hallucination score</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-card-label">Citation Coverage</span>
            <div className="kpi-icon-pill"><Sparkles size={12} /></div>
          </div>
          <div className="kpi-card-middle">
            <div className="kpi-value">98.2%</div>
            <Sparkline data={[94, 95, 96, 96.5, 97.2, 97.8, 98.2]} width={64} height={20} color="#2563EB" />
          </div>
          <div className="kpi-card-bottom">
            <span className="kpi-trend-badge"><TrendingUp size={12} /> Verified</span>
            <span className="type-metadata">Claims with line refs</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-card-label">Avg Retrieval Latency</span>
            <div className="kpi-icon-pill"><Cpu size={12} /></div>
          </div>
          <div className="kpi-card-middle">
            <div className="kpi-value">142ms</div>
            <Sparkline data={[180, 168, 155, 160, 149, 145, 142]} width={64} height={20} color="#D97706" />
          </div>
          <div className="kpi-card-bottom">
            <span className="kpi-trend-badge" style={{ color: 'var(--success)' }}>-28ms</span>
            <span className="type-metadata">IVFFlat vector distance</span>
          </div>
        </div>
      </div>

      {/* Middle Row: Query Volume Bar Chart + Vector Health */}
      <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 14 }}>
        {/* Weekly Query Volume Bar Chart */}
        <div className="ui-card" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
            <div>
              <div className="type-h3">Weekly Query Volume</div>
              <div className="type-metadata">AI search queries executed across engineering corpus</div>
            </div>
            <Badge variant="blue">1,346 Total Queries</Badge>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 160, gap: 12, paddingBottom: 6 }}>
            {queryVolumeDays.map((q) => {
              const barHeight = (q.count / maxQueries) * 125;
              return (
                <div
                  key={q.day}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    height: '100%',
                    justifyContent: 'flex-end',
                  }}
                >
                  <span className="type-metadata" style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>
                    {q.count}
                  </span>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: 36,
                      height: `${barHeight}px`,
                      background: q.day === 'Fri' ? 'var(--text-primary)' : 'var(--border-strong)',
                      borderRadius: '3px 3px 0 0',
                      transition: 'height 0.3s ease',
                    }}
                  />
                  <span className="type-metadata" style={{ fontWeight: 550 }}>
                    {q.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vector Index Health & Memory */}
        <div className="ui-card" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
            <div>
              <div className="type-h3">pgvector Index Health</div>
              <div className="type-metadata">Storage, cluster distribution & re-indexing status</div>
            </div>
            <Badge variant="emerald" dot>Optimal</Badge>
          </div>

          <div className="flex flex-col gap-3" style={{ flex: 1, justifyContent: 'center' }}>
            <div className="flex items-center justify-between" style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <span className="type-secondary">Active Vector Table</span>
              <code className="type-code">document_chunks_v1</code>
            </div>
            <div className="flex items-center justify-between" style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <span className="type-secondary">Clustering Algorithm</span>
              <span className="type-metadata" style={{ fontWeight: 600 }}>IVFFlat (lists: 100)</span>
            </div>
            <div className="flex items-center justify-between" style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <span className="type-secondary">Index Memory Footprint</span>
              <span className="type-metadata" style={{ fontWeight: 600 }}>412 MB / 8,421 chunks</span>
            </div>
            <div className="flex items-center justify-between" style={{ padding: '8px 0' }}>
              <span className="type-secondary">Cosine Distance Accuracy</span>
              <span className="type-metadata" style={{ color: 'var(--success)', fontWeight: 600 }}>99.8%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Table: Most Queried Knowledge */}
      <div className="ui-card">
        <div className="card-header-clean">
          <div>
            <div className="card-title-main">Most Queried Knowledge Topics</div>
            <div className="card-subtitle-sub">Top ranked engineering inquiries by frequency and citation coverage</div>
          </div>
        </div>

        <div>
          {topQueries.map((item, i) => (
            <div
              key={item.query}
              className="knowledge-row"
              style={{ padding: '12px 18px' }}
            >
              <div className="flex items-center gap-3">
                <span className="type-metadata" style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  0{i + 1}
                </span>
                <span className="type-body" style={{ fontWeight: 500 }}>
                  {item.query}
                </span>
              </div>

              <div className="flex items-center gap-4 type-metadata">
                <span>{item.count} queries</span>
                <span>avg {item.avgLatency}</span>
                <Badge variant="emerald">{item.coverage} coverage</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
