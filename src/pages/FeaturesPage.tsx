import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  Cpu,
  Search,
  Sparkles,
  BookmarkCheck,
  RotateCw,
  BarChart3,
  Bot,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  LucideIcon,
} from 'lucide-react';
import { StaticPageLayout } from '../components/layout/StaticPageLayout';

interface FeatureWorkflow {
  id: string;
  title: string;
  category: string;
  icon: LucideIcon;
  headline: string;
  whatItDoes: string;
  whyItExists: string;
  problemSolved: string;
  technicalDetails: string[];
  codePreview: string;
}

const workflows: FeatureWorkflow[] = [
  {
    id: 'ingestion',
    title: 'Knowledge Ingestion',
    category: 'Pipeline Stage 01',
    icon: FolderGit2,
    headline: 'Continuous repository file tree polling & parsing',
    whatItDoes: 'Connects to your local or GitHub repositories via read-only webhooks and Git commit diff listeners. Automatically filters binary assets and lockfiles, streaming Markdown, TypeScript, Python, and configuration files into the parsing pipeline.',
    whyItExists: 'Static file uploads fail because code changes constantly. Real engineering knowledge lives in active branches and PRs.',
    problemSolved: 'Eliminates manual re-uploading and prevents stale documentation from lingering in your knowledge system.',
    technicalDetails: [
      'AST-aware parsers for .ts, .tsx, .py, .go, .rs, .md',
      'Excludes node_modules, dist, .git, and binaries automatically',
      'Incremental delta diff parsing via SHA256 tree hashing',
    ],
    codePreview: `// Ingestion pipeline worker (ingest_worker.py)
async def process_repo_delta(repo_id: str, commit_sha: str):
    changed_files = await git_service.get_commit_diff(repo_id, commit_sha)
    for file in changed_files:
        if is_supported_extension(file.path) and not is_ignored(file.path):
            ast_tree = await parse_syntax_tree(file.content, file.language)
            await chunk_ast_boundary(file.id, ast_tree)`,
  },
  {
    id: 'chunking',
    title: 'AST Boundary Chunking',
    category: 'Pipeline Stage 02',
    icon: Cpu,
    headline: 'Preserving functional scopes instead of naive character counts',
    whatItDoes: 'Splits code and documentation along semantic Abstract Syntax Tree boundaries—entire functions, classes, interfaces, and Markdown headers—rather than arbitrary 500-token breaks.',
    whyItExists: 'A function chopped in half loses its argument types and return values, producing hallucinated or broken AI reasoning.',
    problemSolved: 'Preserves context integrity so retrieved chunks represent coherent, runnable engineering units.',
    technicalDetails: [
      'Zero sliced functions or split variable declarations',
      'Markdown chunks preserve full header-to-next-header hierarchies',
      '10% sliding semantic context overlap for cross-scope references',
    ],
    codePreview: `// AST Boundary Preservation (chunker.ts)
export function chunkByAST(source: string, language: string): ASTChunk[] {
  const ast = parser.parse(source, { sourceType: 'module' });
  return ast.body.map((node) => ({
    chunkId: crypto.randomUUID(),
    startLine: node.loc.start.line,
    endLine: node.loc.end.line,
    symbol: node.id?.name ?? 'anonymous',
    content: source.slice(node.start, node.end),
  }));
}`,
  },
  {
    id: 'hybrid-search',
    title: 'Hybrid Vector + BM25',
    category: 'Pipeline Stage 03',
    icon: Search,
    headline: 'Exact keyword matching fused with dense semantic vector embeddings',
    whatItDoes: 'Executes parallel BM25 full-text queries for exact variable names, file paths, and error codes alongside cosine distance queries in pgvector using Reciprocal Rank Fusion (RRF).',
    whyItExists: 'Vector embeddings fail on exact technical tokens like "JWT_SECRET" or "AUTH_REVOCATION_HOOK". Keyword search fails on conceptual questions like "How do we handle session timeouts?".',
    problemSolved: 'Guarantees that exact function identifiers and conceptual explanations both score high in retrieved candidate sets.',
    technicalDetails: [
      'BM25 index powered by PostgreSQL tsvector & tsquery',
      'Dense embeddings via pgvector IVFFlat / HNSW indexes',
      'Reciprocal Rank Fusion (RRF) with constant k=60',
    ],
    codePreview: `SELECT c.id, c.content, c.file_path,
       (0.5 * (1.0 / (60 + rrf.dense_rank))) + 
       (0.5 * (1.0 / (60 + rrf.sparse_rank))) AS combined_score
FROM chunks c
JOIN search_results rrf ON c.id = rrf.chunk_id
ORDER BY combined_score DESC LIMIT 10;`,
  },
  {
    id: 'ask-evidence',
    title: 'Ask & Reasoning',
    category: 'Pipeline Stage 04',
    icon: Sparkles,
    headline: 'Evidence-first RAG synthesis with line-level verifiable proof',
    whatItDoes: 'Feeds only the top reranked context into the reasoning model with strict instructions to generate claims backed by source file paths and line ranges.',
    whyItExists: 'Developers do not trust confident AI text without inspectable proof.',
    problemSolved: 'Eliminates hallucinations by grounding every statement directly to a file excerpt you can open and verify.',
    technicalDetails: [
      'Every claim points to an exact citation [1], [2], etc.',
      'Groundedness evaluation score calculated per synthesized response',
      'One-click citation drawer showing original code with syntax highlighting',
    ],
    codePreview: `// Evidence Prompt Context Construction
const systemPrompt = \`You are Eillish. Answer the user question using ONLY
the retrieved AST chunks below. For every technical claim, append [Source: id].
If the evidence is not present in the chunks, state "Insufficient evidence."\`;`,
  },
  {
    id: 'citations',
    title: 'Citation Auditability',
    category: 'Pipeline Stage 05',
    icon: BookmarkCheck,
    headline: 'Trace any AI answer directly back to git commits and line numbers',
    whatItDoes: 'Each citation displays repository, file path, commit hash, and line range (e.g. auth/middleware.ts#L42-L88). Clicking opens the source drawer without leaving your conversation.',
    whyItExists: 'Enables quick verification during code reviews, debugging sessions, and incident response.',
    problemSolved: 'No more searching through 50 files trying to confirm whether an AI answer is telling the truth.',
    technicalDetails: [
      'Line numbers mapped directly to git commit blobs',
      'Confidence relevance score (e.g. 96% Match) displayed per source',
      'Direct link to open repository file in GitHub or local editor',
    ],
    codePreview: `{
  "citationId": "cite-781",
  "repository": "Eillish-Core",
  "filePath": "src/services/auth.service.ts",
  "lineStart": 42,
  "lineEnd": 88,
  "relevanceScore": 0.962,
  "gitCommit": "b48f91a"
}`,
  },
  {
    id: 'activity-agents',
    title: 'Background Activity & Telemetry',
    category: 'Pipeline Stage 06',
    icon: RotateCw,
    headline: 'Inspect background indexing, webhook runs, and system health',
    whatItDoes: 'Provides an immutable audit log of every background indexing run, webhook arrival, AST parser execution, and query telemetry event.',
    whyItExists: 'Knowledge systems should not be black boxes. You need to know when a file was indexed and why a query returned specific chunks.',
    problemSolved: 'Complete transparency into background tasks, data freshness, and retrieval latency.',
    technicalDetails: [
      'Microsecond latency tracking across hybrid retrieval and LLM generation',
      'Categorized event streams: Repositories, Knowledge, AI, System',
      'Live status pills and manual re-sync triggers',
    ],
    codePreview: `event_logger.log({
    "event_type": "repo_sync_completed",
    "repo_id": "repo-eillish-docs",
    "files_scanned": 42,
    "chunks_updated": 128,
    "latency_ms": 340,
    "status": "success"
})`,
  },
  {
    id: 'analytics-eval',
    title: 'RAG Retrieval Analytics',
    category: 'Pipeline Stage 07',
    icon: BarChart3,
    headline: 'Continuous Precision@K, MRR, and Groundedness evaluation',
    whatItDoes: 'Measures retrieval performance with real IR benchmarks: Mean Reciprocal Rank (MRR), Precision@K, citation coverage, and user feedback ratings.',
    whyItExists: 'Assuming your RAG system works because an LLM sounds articulate leads to silent degradation as codebases scale.',
    problemSolved: 'Provides objective metrics to optimize chunk sizes, embedding models, and reranking parameters.',
    technicalDetails: [
      'Precision@3, Precision@5, and MRR tracked over 30-day windows',
      'User feedback categorized: Helpful vs. Wrong Source or Incomplete',
      'Explicit Demo Data Mode disclosure for clear development tracking',
    ],
    codePreview: `const mrr = queries.reduce((acc, q) => {
  const rank = q.retrievedChunks.findIndex(c => c.isRelevant) + 1;
  return acc + (rank > 0 ? 1 / rank : 0);
}, 0) / queries.length;`,
  },
  {
    id: 'agent-maintenance',
    title: 'Knowledge Maintenance Agents',
    category: 'Pipeline Stage 08',
    icon: Bot,
    headline: 'Automated stale documentation & duplicate code detection',
    whatItDoes: 'Background maintenance agents periodically cluster embeddings to identify outdated README instructions that conflict with updated codebase implementations.',
    whyItExists: 'Code changes faster than documentation. Discrepancies between code and docs cause engineering friction.',
    problemSolved: 'Highlights stale markdown files that reference renamed functions or deprecated endpoints.',
    technicalDetails: [
      'Semantic drift threshold alerts for documentation older than 90 days',
      'Duplicate chunk deduplication across mirrored repos',
      'Non-invasive warnings that appear in the knowledge explorer',
    ],
    codePreview: `// Stale Knowledge Discovery Agent
if (doc.updatedAt < repo.lastMajorRefactor && similarity(doc, refactoredCode) < 0.65) {
  flagKnowledgeHealth(doc.id, "POTENTIAL_STALE_DOCUMENTATION");
}`,
  },
];

export const FeaturesPage: React.FC = () => {
  const [activeWorkflowId, setActiveWorkflowId] = useState<string>('ingestion');

  const active = workflows.find((w) => w.id === activeWorkflowId) || workflows[0];
  const ActiveIcon = active.icon;

  return (
    <StaticPageLayout
      title="Architecture & Workflow Capabilities"
      subtitle="Organized by pipeline workflow—from AST-aware repository ingestion to verifiable line-level citations and continuous retrieval evaluation."
      badge="Technical Specifications"
    >
      {/* Workflow Navigation Bar */}
      <section style={{ maxWidth: 'var(--page-max-width)', margin: '0 auto 32px auto', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            paddingBottom: 8,
            borderBottom: '2px solid var(--color-charcoal-ink)',
          }}
        >
          {workflows.map((wf) => {
            const Icon = wf.icon;
            const isSelected = wf.id === activeWorkflowId;
            return (
              <button
                key={wf.id}
                onClick={() => setActiveWorkflowId(wf.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-full)',
                  border: '2px solid var(--color-charcoal-ink)',
                  background: isSelected ? 'var(--color-charcoal-ink)' : 'var(--color-snow)',
                  color: isSelected ? 'var(--color-snow)' : 'var(--color-charcoal-ink)',
                  fontFamily: 'var(--font-manrope)',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                  flexShrink: 0,
                }}
              >
                <Icon size={14} />
                <span>{wf.title}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Deep-Dive Workflow Inspection Card */}
      <section style={{ maxWidth: 'var(--page-max-width)', margin: '0 auto 48px auto', width: '100%' }}>
        <div
          style={{
            background: 'var(--color-snow)',
            border: '2px solid var(--color-charcoal-ink)',
            borderRadius: 'var(--radius-cards)',
            padding: '36px',
          }}
        >
          {/* Header Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
              marginBottom: 24,
              paddingBottom: 20,
              borderBottom: '2px solid var(--color-peach-paper)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 'var(--radius-sm)',
                  border: '2px solid var(--color-charcoal-ink)',
                  background: 'var(--color-sunbeam-yellow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ActiveIcon size={24} />
              </div>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                  }}
                >
                  {active.category}
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '24px',
                    color: 'var(--color-charcoal-ink)',
                    margin: '2px 0 0 0',
                  }}
                >
                  {active.title}
                </h2>
              </div>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                border: '2px solid var(--color-charcoal-ink)',
                background: 'var(--color-mint-wash)',
                fontFamily: 'var(--font-manrope)',
                fontSize: '12px',
                fontWeight: 800,
              }}
            >
              <CheckCircle2 size={13} />
              <span>Production Pipeline</span>
            </div>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-manrope)',
              fontSize: '16px',
              fontWeight: 700,
              color: 'var(--color-charcoal-ink)',
              marginBottom: 28,
            }}
          >
            {active.headline}
          </p>

          {/* 3-Column Problem / Solution / Why It Exists Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
              marginBottom: 32,
            }}
          >
            {/* What It Does */}
            <div
              style={{
                background: 'var(--color-peach-paper)',
                border: '2px solid var(--color-charcoal-ink)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                What It Does
              </div>
              <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '13.5px', lineHeight: 1.5, margin: 0 }}>
                {active.whatItDoes}
              </p>
            </div>

            {/* Why It Exists */}
            <div
              style={{
                background: 'var(--color-peach-paper)',
                border: '2px solid var(--color-charcoal-ink)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                Why It Exists
              </div>
              <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '13.5px', lineHeight: 1.5, margin: 0 }}>
                {active.whyItExists}
              </p>
            </div>

            {/* Problem Solved */}
            <div
              style={{
                background: 'var(--color-peach-paper)',
                border: '2px solid var(--color-charcoal-ink)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                Problem Solved
              </div>
              <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '13.5px', lineHeight: 1.5, margin: 0 }}>
                {active.problemSolved}
              </p>
            </div>
          </div>

          {/* Technical Implementation & Code Artifact */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 24,
            }}
          >
            {/* Technical Bullets */}
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '16px',
                  marginBottom: 14,
                  color: 'var(--color-charcoal-ink)',
                }}
              >
                Technical Guarantees
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {active.technicalDetails.map((detail, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      fontFamily: 'var(--font-manrope)',
                      fontSize: '13px',
                      lineHeight: 1.45,
                    }}
                  >
                    <ShieldCheck size={16} style={{ color: 'var(--color-ember-orange)', flexShrink: 0, marginTop: 2 }} />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Live Pipeline Code Snippet */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 14px',
                  background: 'var(--color-charcoal-ink)',
                  color: 'var(--color-snow)',
                  borderTopLeftRadius: 'var(--radius-sm)',
                  borderTopRightRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                }}
              >
                <span>Pipeline Implementation</span>
                <span>Production Code</span>
              </div>
              <pre
                style={{
                  margin: 0,
                  padding: '16px',
                  background: '#121212',
                  color: '#e2e8f0',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11.5px',
                  lineHeight: 1.6,
                  overflowX: 'auto',
                  borderBottomLeftRadius: 'var(--radius-sm)',
                  borderBottomRightRadius: 'var(--radius-sm)',
                  border: '2px solid var(--color-charcoal-ink)',
                  borderTop: 'none',
                }}
              >
                <code>{active.codePreview}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section style={{ maxWidth: 'var(--page-max-width)', margin: '0 auto', width: '100%', textAlign: 'center' }}>
        <div
          style={{
            background: 'var(--color-sunbeam-yellow)',
            border: '2px solid var(--color-charcoal-ink)',
            borderRadius: 'var(--radius-cards)',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              margin: 0,
            }}
          >
            Ready to ground your engineering knowledge?
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-manrope)',
              fontSize: '14px',
              maxWidth: '520px',
              margin: 0,
            }}
          >
            Connect a GitHub repository or local workspace and start asking questions with verifiable line-level citations.
          </p>
          <div className="flex items-center gap-3">
            <Link
              to="/auth/login"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 26px',
                borderRadius: 'var(--radius-full)',
                border: '2px solid var(--color-charcoal-ink)',
                background: 'var(--color-charcoal-ink)',
                color: 'var(--color-snow)',
                fontFamily: 'var(--font-manrope)',
                fontSize: '13.5px',
                fontWeight: 800,
                textDecoration: 'none',
              }}
            >
              <span>Get Started Free</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/how-it-works"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 26px',
                borderRadius: 'var(--radius-full)',
                border: '2px solid var(--color-charcoal-ink)',
                background: 'var(--color-snow)',
                color: 'var(--color-charcoal-ink)',
                fontFamily: 'var(--font-manrope)',
                fontSize: '13.5px',
                fontWeight: 800,
                textDecoration: 'none',
              }}
            >
              <span>See Pipeline Tour</span>
            </Link>
          </div>
        </div>
      </section>
    </StaticPageLayout>
  );
};
