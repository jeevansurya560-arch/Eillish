import React from 'react';
import { FileText, Layers, FolderGit2, CheckCircle2, TrendingUp } from 'lucide-react';
import { KnowledgeOverviewStats } from '../../types';
import { Sparkline } from '../common/Sparkline';
import './Dashboard.css';

interface OverviewStatsProps {
  stats: KnowledgeOverviewStats;
}

export const OverviewStats: React.FC<OverviewStatsProps> = ({ stats }) => {
  const cards = [
    {
      label: 'Documents',
      value: stats.totalDocuments.toLocaleString(),
      trend: stats.documentsDelta,
      icon: FileText,
      sparklineData: [1210, 1225, 1238, 1250, 1262, 1274, 1284],
      sparklineColor: '#2563EB',
    },
    {
      label: 'Knowledge Chunks',
      value: stats.totalChunks.toLocaleString(),
      trend: stats.chunksDelta,
      icon: Layers,
      sparklineData: [7820, 7950, 8050, 8160, 8280, 8360, 8421],
      sparklineColor: '#059669',
    },
    {
      label: 'Repositories',
      value: stats.totalRepositories.toString(),
      trend: stats.repositoriesDelta,
      icon: FolderGit2,
      isRepo: true,
    },
    {
      label: 'Indexed Coverage',
      value: `${stats.indexingPercentage}%`,
      trend: '+2.4% this week',
      icon: CheckCircle2,
      isProgress: true,
      progress: stats.indexingPercentage,
    },
  ];

  return (
    <section className="kpi-grid">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div key={c.label} className="kpi-card">
            <div className="kpi-card-top">
              <span className="kpi-card-label">{c.label}</span>
              <div className="kpi-icon-pill">
                <Icon size={13} />
              </div>
            </div>

            <div className="kpi-card-middle">
              <div className="kpi-value">{c.value}</div>
              {c.sparklineData && (
                <Sparkline
                  data={c.sparklineData}
                  width={68}
                  height={22}
                  color={c.sparklineColor}
                />
              )}
              {c.isProgress && (
                <div style={{ width: 68 }}>
                  <div
                    style={{
                      height: 5,
                      width: '100%',
                      background: 'var(--surface-subtle)',
                      border: '1px solid var(--border)',
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${c.progress}%`,
                        background: 'var(--success)',
                        borderRadius: 2,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="kpi-card-bottom">
              <span className="kpi-trend-badge">
                <TrendingUp size={12} />
                <span>{c.trend}</span>
              </span>
              <span className="type-metadata" style={{ fontSize: '11px' }}>
                vs. last period
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
};
