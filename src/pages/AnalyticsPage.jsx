import { useState, useEffect } from "react";
import {
  TrendingUp,
  Cpu,
  Target,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Database
} from "lucide-react";
import { analyticsService } from "../services/analytics.service";
import { Badge } from "../components/common/Badge";
const AnalyticsPage = () => {
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let isMounted = true;
    async function loadMetrics() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await analyticsService.getMetrics();
        if (isMounted) setMetrics(data);
      } catch (err) {
        if (isMounted) setError(err.message || "Failed to load telemetry.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadMetrics();
    return () => {
      isMounted = false;
    };
  }, []);
  return <div className="flex flex-col gap-5">
      {
    /* Header */
  }
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="hero-title-group">
          <h1 className="hero-heading">Retrieval & RAG Analytics</h1>
          <p className="hero-subtitle">
            Live diagnostic benchmarks evaluating vector retrieval quality, groundedness, and latency across Supabase pgvector.
          </p>
        </div>

        <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "6px 14px",
      background: "var(--color-mint-wash)",
      border: "2px solid var(--color-charcoal-ink)",
      borderRadius: "var(--radius-full)",
      fontFamily: "var(--font-manrope)",
      fontSize: "11.5px",
      fontWeight: 800
    }}
  >
          <span className="dot dot-pulse" style={{ background: "#10b981" }} />
          <span>Live Telemetry · Supabase pgvector</span>
        </div>
      </div>

      {isLoading ? <div className="ui-card" style={{ padding: "60px", textAlign: "center" }}>
          <div
    style={{
      width: 32,
      height: 32,
      border: "3px solid var(--color-charcoal-ink)",
      borderTopColor: "transparent",
      borderRadius: "50%",
      margin: "0 auto 16px auto",
      animation: "spin 0.8s linear infinite"
    }}
  />
          <div style={{ fontWeight: 700, fontSize: "14px" }}>Loading real diagnostic telemetry...</div>
        </div> : error || !metrics ? <div className="ui-card" style={{ padding: "32px", textAlign: "center", borderColor: "#ef4444" }}>
          <AlertCircle size={28} style={{ color: "#ef4444", margin: "0 auto 12px auto" }} />
          <div style={{ fontWeight: 800, fontSize: "15px", color: "#991b1b", marginBottom: 6 }}>
            Telemetry Unavailable
          </div>
          <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>{error}</p>
        </div> : <>
          {
    /* Top 4 KPI Diagnostics */
  }
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-card-top">
                <span className="kpi-card-label">Precision@3</span>
                <div className="kpi-icon-pill"><Target size={12} /></div>
              </div>
              <div className="kpi-card-middle">
                <div className="kpi-value">{metrics.precisionAt3.toFixed(3)}</div>
                <Badge variant="emerald">Optimal</Badge>
              </div>
              <div className="kpi-card-bottom">
                <span className="kpi-subtext">Semantic ranking precision</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-card-top">
                <span className="kpi-card-label">Groundedness Score</span>
                <div className="kpi-icon-pill"><CheckCircle2 size={12} /></div>
              </div>
              <div className="kpi-card-middle">
                <div className="kpi-value">{metrics.groundednessScore.toFixed(3)}</div>
                <Badge variant="emerald">Grounded</Badge>
              </div>
              <div className="kpi-card-bottom">
                <span className="kpi-subtext">Evidence verification index</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-card-top">
                <span className="kpi-card-label">Mean Latency</span>
                <div className="kpi-icon-pill"><Cpu size={12} /></div>
              </div>
              <div className="kpi-card-middle">
                <div className="kpi-value">{metrics.avgLatencyMs}ms</div>
                <Badge variant="blue">Fast</Badge>
              </div>
              <div className="kpi-card-bottom">
                <span className="kpi-subtext">HNSW cosine vector lookup</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-card-top">
                <span className="kpi-card-label">Total Queries</span>
                <div className="kpi-icon-pill"><TrendingUp size={12} /></div>
              </div>
              <div className="kpi-card-middle">
                <div className="kpi-value">{metrics.totalQueries}</div>
                <Badge variant="amber">Active</Badge>
              </div>
              <div className="kpi-card-bottom">
                <span className="kpi-subtext">Queries executed & logged</span>
              </div>
            </div>
          </div>

          {
    /* Telemetry Breakdown Details */
  }
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
            {
    /* Knowledge Base Volume */
  }
            <div className="ui-card" style={{ padding: "24px" }}>
              <div className="flex items-center gap-2" style={{ marginBottom: 16 }}>
                <Database size={18} />
                <h3 className="type-h3" style={{ fontSize: 16 }}>Database & Vector Capacity</h3>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between" style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                  <span className="type-secondary">Connected Repositories</span>
                  <strong>{metrics.totalRepositories ?? 0}</strong>
                </div>
                <div className="flex items-center justify-between" style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                  <span className="type-secondary">Indexed Documents</span>
                  <strong>{metrics.totalDocuments ?? 0}</strong>
                </div>
                <div className="flex items-center justify-between" style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                  <span className="type-secondary">Vector Chunks in pgvector</span>
                  <strong>{metrics.totalChunks ?? 0}</strong>
                </div>
                <div className="flex items-center justify-between" style={{ padding: "10px 0" }}>
                  <span className="type-secondary">Vector Dimension</span>
                  <code className="type-code">1,536-dim</code>
                </div>
              </div>
            </div>

            {
    /* RAG Diagnostics */
  }
            <div className="ui-card" style={{ padding: "24px" }}>
              <div className="flex items-center gap-2" style={{ marginBottom: 16 }}>
                <Sparkles size={18} />
                <h3 className="type-h3" style={{ fontSize: 16 }}>RAG Retrieval Quality</h3>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between" style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                  <span className="type-secondary">Mean Reciprocal Rank (MRR)</span>
                  <strong>{metrics.mrr.toFixed(3)}</strong>
                </div>
                <div className="flex items-center justify-between" style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                  <span className="type-secondary">Citation Coverage</span>
                  <strong>{(metrics.citationCoverage * 100).toFixed(1)}%</strong>
                </div>
                <div className="flex items-center justify-between" style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                  <span className="type-secondary">User Satisfaction Ratio</span>
                  <strong>{(metrics.userSatisfactionRatio * 100).toFixed(1)}%</strong>
                </div>
                <div className="flex items-center justify-between" style={{ padding: "10px 0" }}>
                  <span className="type-secondary">Hybrid Fusion Constant (k)</span>
                  <code className="type-code">RRF k=60</code>
                </div>
              </div>
            </div>
          </div>
        </>}
    </div>;
};
export {
  AnalyticsPage
};
