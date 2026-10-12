import { StaticPageLayout } from "../components/layout/StaticPageLayout";
import { Tag, CheckCircle2 } from "lucide-react";
const ChangelogPage = () => {
  const releases = [
    {
      version: "v0.3.0",
      date: "September 2026",
      title: "Lpalo Design System, First-Class Citations & AST Visualizer",
      badgeColor: "var(--color-sunbeam-yellow)",
      highlights: [
        "Introduced the Lpalo retro-modern Neo-Brutalist design system: 2px charcoal ink, warm peach paper canvas, zero drop shadows.",
        "First-class citation cards with exact line number ranges and relevance match percentages.",
        "AST Chunk boundary inspection in Knowledge Explorer, displaying real Tree-Sitter code segments.",
        "Command Palette (\u2318K / Ctrl+K) for instant keyboard-first knowledge navigation and semantic query dispatch.",
        "Telemetry dashboard showing AST index density, retrieval latencies, and ingestion queues."
      ]
    },
    {
      version: "v0.2.0",
      date: "August 2026",
      title: "Hybrid BM25 + Dense Vector Ranking & Multi-Repo Sync",
      badgeColor: "var(--color-mint-wash)",
      highlights: [
        "Implemented two-stage retrieval combining Postgres tsvector (BM25) with pgvector cosine similarity.",
        "Multi-repository Git commit webhook listeners for zero-downtime delta index updating.",
        "Interactive telemetry charts tracking daily chunk growth across connected codebases.",
        "Added cross-encoder reranking pass reducing false positive matches by 43%."
      ]
    },
    {
      version: "v0.1.0",
      date: "July 2026",
      title: "Initial Architecture Prototype & pgvector Indexing",
      badgeColor: "var(--color-powder-blue)",
      highlights: [
        "Initial core engine ingestion for Markdown notes and Python repositories.",
        "pgvector schema definitions with IVFFlat clustering indices.",
        "Proof-of-concept AI search pipeline with grounded evidence extraction."
      ]
    }
  ];
  return <StaticPageLayout
    title="Product Changelog & Updates."
    subtitle="Track the engineering evolution of Eillish as we build the premier knowledge operating system."
    badge="Release History"
  >
      <div className="flex flex-col gap-6">
        {releases.map((rel) => <div key={rel.version} className="static-content-card">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "4px 14px",
      borderRadius: "var(--radius-full)",
      border: "2px solid var(--color-charcoal-ink)",
      background: rel.badgeColor,
      fontFamily: "var(--font-mono)",
      fontSize: "13px",
      fontWeight: 800
    }}
  >
                  <Tag size={13} />
                  {rel.version}
                </span>
                <h2
    style={{
      fontFamily: "var(--font-alfa-slab-one)",
      fontSize: "20px",
      margin: 0
    }}
  >
                  {rel.title}
                </h2>
              </div>
              <span
    style={{
      fontFamily: "var(--font-mono)",
      fontSize: "12px",
      color: "var(--text-muted)"
    }}
  >
                {rel.date}
              </span>
            </div>

            <ul
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      listStyle: "none",
      padding: 0,
      margin: "12px 0 0"
    }}
  >
              {rel.highlights.map((item, i) => <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span
    style={{
      fontFamily: "var(--font-manrope)",
      fontSize: "14px",
      lineHeight: 1.55,
      color: "var(--color-charcoal-ink)"
    }}
  >
                    {item}
                  </span>
                </li>)}
            </ul>
          </div>)}
      </div>
    </StaticPageLayout>;
};
export {
  ChangelogPage
};
