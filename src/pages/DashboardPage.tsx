import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Plus, AlertCircle } from 'lucide-react';
import {
  KnowledgeOverviewStats,
  KnowledgeGrowthPoint,
  Document,
  ActivityEvent,
} from '../types';
import { knowledgeService } from '../services/knowledgeService';
import { OverviewStats } from '../components/dashboard/OverviewStats';
import { KnowledgeGrowthChart } from '../components/dashboard/KnowledgeGrowthChart';
import { SystemPipelineCard } from '../components/dashboard/SystemPipelineCard';
import { RecentKnowledgeList } from '../components/dashboard/RecentKnowledgeList';
import { RecentActivityFeed } from '../components/dashboard/RecentActivityFeed';
import { Button } from '../components/common/Button';
import '../components/dashboard/Dashboard.css';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState<KnowledgeOverviewStats | null>(null);
  const [growthData, setGrowthData] = useState<KnowledgeGrowthPoint[]>([]);
  const [recentDocs, setRecentDocs] = useState<Document[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardData() {
      try {
        setIsLoading(true);
        setError(null);

        const [fetchedStats, fetchedGrowth, fetchedDocs, fetchedActivity] =
          await Promise.all([
            knowledgeService.getOverviewStats(),
            knowledgeService.getGrowthTimeline(),
            knowledgeService.getRecentDocuments(5),
            knowledgeService.getRecentActivity(5),
          ]);

        if (isMounted) {
          setStats(fetchedStats);
          setGrowthData(fetchedGrowth);
          setRecentDocs(fetchedDocs);
          setRecentActivity(fetchedActivity);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch knowledge system data.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div style={{ height: 42, background: 'var(--surface-subtle)', borderRadius: 6 }} />
        <div className="kpi-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ height: 100, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }} />
          ))}
        </div>
        <div className="dashboard-mid-grid">
          <div style={{ height: 260, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }} />
          <div style={{ height: 260, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }} />
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex flex-col items-center justify-center gap-3" style={{ minHeight: '360px' }}>
        <AlertCircle size={26} style={{ color: 'var(--danger)' }} />
        <div className="type-h2">Unable to load knowledge system</div>
        <p className="type-secondary">{error || 'Unknown error occurred.'}</p>
        <Button variant="secondary" size="sm" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Product Hero Banner */}
      <header className="dashboard-hero">
        <div className="hero-title-group">
          <h1 className="hero-heading">Knowledge System</h1>
          <p className="hero-subtitle">
            Your engineering knowledge, indexed and ready to reason over.
          </p>
        </div>

        <div className="hero-actions">
          <Button
            variant="secondary"
            size="sm"
            icon={<Plus size={13} />}
            onClick={() => navigate('/repositories')}
          >
            Connect Repository
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={<Sparkles size={13} />}
            onClick={() => navigate('/search')}
          >
            Ask Knowledge
          </Button>
        </div>
      </header>

      {/* KPI Section with Sparklines */}
      <OverviewStats stats={stats} />

      {/* Middle Grid: Knowledge Growth + Operating Pipeline */}
      <section className="dashboard-mid-grid">
        <KnowledgeGrowthChart growthData={growthData} />
        <SystemPipelineCard />
      </section>

      {/* Bottom Grid: Recent Knowledge + Activity Timeline */}
      <section className="dashboard-bottom-grid">
        <RecentKnowledgeList documents={recentDocs} />
        <RecentActivityFeed activities={recentActivity} />
      </section>
    </div>
  );
};
