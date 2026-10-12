import { useState } from "react";
import {
  UploadCloud,
  FileCode,
  Layers,
  Network,
  Search,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { StaticPageLayout } from "../components/layout/StaticPageLayout";
import { Button } from "../components/common/Button";
import { useNavigate } from "react-router-dom";
const HowItWorksPage = () => {
  const navigate = useNavigate();
  const [selectedStep, setSelectedStep] = useState(0);
  const steps = [
    {
      name: "INGEST",
      title: "Your knowledge enters Eillish",
      icon: UploadCloud,
      badgeColor: "var(--color-mint-wash)",
      summary: "Connect GitHub repositories, Markdown documentation folders, API specifications, and personal engineering notes. Eillish continuously listens to git commits and file change webhooks.",
      details: [
        "Automatic branch tracking and commit diff detection",
        "Direct support for Markdown, Python, TypeScript, Go, Rust, and JSON",
        "Zero manual copy-pasting\u2014changes in code automatically trigger delta updates"
      ],
      codeSample: `// Webhook payload received from GitHub
{
  "event": "push",
  "repository": "Eillish",
  "commits": 1,
  "modified": ["backend/authentication.md", "backend/core/vector_store.py"]
}`
    },
    {
      name: "UNDERSTAND",
      title: "Content is parsed through Abstract Syntax Trees",
      icon: FileCode,
      badgeColor: "var(--color-sunbeam-yellow)",
      summary: "Standard tools chop text into arbitrary 500-token chunks, splitting classes in half and breaking code logic. Eillish parses real ASTs to identify semantic boundaries: complete functions, classes, and markdown sections.",
      details: [
        "Full AST scope preservation for clean, compilable units",
        "10% context overlap across natural heading and block boundaries",
        "Decorator and interface context attached to method bodies"
      ],
      codeSample: `# AST Chunk Node: Boundary preserved
class PgVectorStore:
    def __init__(self, dsn: str):
        ...
    # Extracted as self-contained logical unit
    async def hybrid_search(...):
        ...`
    },
    {
      name: "INDEX",
      title: "Dual-path vector and keyword indexing",
      icon: Layers,
      badgeColor: "var(--color-powder-blue)",
      summary: "Each semantic chunk is vectorized with high-dimensional embeddings while preserving a full-text inverted index for precise identifier matching.",
      details: [
        "pgvector integration with IVFFlat cosine similarity indexing",
        "Exact BM25 keyword matching for variable names and error codes",
        "Sub-150ms retrieval latency across hundreds of thousands of chunks"
      ],
      codeSample: `-- pgvector hybrid search query
SELECT id, document_id, content,
       (0.7 * cosine_similarity + 0.3 * bm25_rank) AS score
FROM document_chunks
WHERE repository_id = 'eillish'
ORDER BY score DESC LIMIT 5;`
    },
    {
      name: "CONNECT",
      title: "Knowledge graph relationships are associated",
      icon: Network,
      badgeColor: "var(--color-lilac-tint)",
      summary: "Files do not live in isolation. Eillish tracks import hierarchies, shared schemas, documentation links, and cross-repo dependencies to understand how components relate.",
      details: [
        "Cross-repo import resolution across microservices",
        "Documentation-to-implementation link mapping",
        "Dependency graphs updated in real-time during git commits"
      ],
      codeSample: `// Relationship graph edge
{
  "source": "backend/authentication.md",
  "target": "backend/core/vector_store.py",
  "relation": "implements_spec",
  "confidence": 0.94
}`
    },
    {
      name: "RETRIEVE",
      title: "Two-stage hybrid dense-sparse retrieval",
      icon: Search,
      badgeColor: "var(--color-mint-wash)",
      summary: "When you ask a question, Eillish runs parallel vector search and lexical search, followed by a cross-encoder reranker that surfaces the top relevant source chunks.",
      details: [
        "Overcomes vocabulary mismatch while retaining exact symbol accuracy",
        "Reranks top 50 candidates down to 3-5 precise context chunks",
        "Filters by repository, language, branch, and recency"
      ],
      codeSample: `// Retrieval ranking results
[
  { "doc": "authentication.md", "lines": "42-54", "score": 0.94 },
  { "doc": "vector_store.py", "lines": "12-26", "score": 0.87 }
]`
    },
    {
      name: "REASON",
      title: "AI synthesizes answers grounded in retrieved chunks",
      icon: Sparkles,
      badgeColor: "var(--color-ember-orange)",
      summary: "The language model operates strictly over the retrieved evidence. It is forbidden from speculating or hallucinating: every architectural claim must be derived from the indexed code.",
      details: [
        "Strict grounding instructions eliminate fabricated answers",
        "Clear articulation of dependencies, caveats, and design rationale",
        "Fast response generation with verifiable reasoning trail"
      ],
      codeSample: `// Grounded reasoning output
"Authentication in Eillish is implemented through asymmetric
JWT (RS256) signature verification in verify_jwt_token.
Tokens have a 15-minute TTL backed by Redis refresh sessions."`
    },
    {
      name: "EVIDENCE",
      title: "Every sentence is tied to verifiable source lines",
      icon: ShieldCheck,
      badgeColor: "var(--color-sunbeam-yellow)",
      summary: "The critical difference: Eillish never delivers an answer in a vacuum. Every claim includes clickable citations with repository names, file paths, and exact line numbers.",
      details: [
        "Interactive citation tags highlight the exact lines in the source viewer",
        "Direct link to your GitHub repository commit and line range",
        "Confidence score and match telemetry displayed alongside each citation"
      ],
      codeSample: `// Verifiable Citation
[Citation 1]: backend/authentication.md:42-54
[Citation 2]: backend/core/vector_store.py:12-26
[Confidence]: 94.2% verified against commit 8a4f21`
    }
  ];
  const currentStep = steps[selectedStep];
  const StepIcon = currentStep.icon;
  return <StaticPageLayout
    title="How Knowledge Flows Through Eillish."
    subtitle="From scattered git repositories and markdown notes to a unified, queryable knowledge layer with verifiable source evidence."
    badge="The 7-Stage Pipeline"
  >
      {
    /* Visual Pipeline Interactive Navigator */
  }
      <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "8px",
      marginBottom: "28px",
      overflowX: "auto",
      paddingBottom: "8px"
    }}
  >
        {steps.map((step, idx) => {
    const Icon = step.icon;
    const isActive = selectedStep === idx;
    return <button
      key={step.name}
      onClick={() => setSelectedStep(idx)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        padding: "12px 6px",
        background: isActive ? step.badgeColor : "var(--color-snow)",
        border: "2px solid var(--color-charcoal-ink)",
        borderRadius: "var(--radius-cards)",
        cursor: "pointer",
        transition: "all var(--transition-fast)",
        minWidth: "100px"
      }}
    >
              <div
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        background: isActive ? "var(--color-snow)" : step.badgeColor,
        border: "1.5px solid var(--color-charcoal-ink)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
                <Icon size={16} />
              </div>
              <span
      style={{
        fontFamily: "var(--font-alfa-slab-one)",
        fontSize: "11px",
        color: "var(--color-charcoal-ink)"
      }}
    >
                {step.name}
              </span>
            </button>;
  })}
      </div>

      {
    /* Active Step Deep Dive Card */
  }
      <div className="static-content-card">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div
    style={{
      width: "46px",
      height: "46px",
      borderRadius: "50%",
      background: currentStep.badgeColor,
      border: "2px solid var(--color-charcoal-ink)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
              <StepIcon size={22} />
            </div>
            <div>
              <span
    style={{
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      color: "var(--text-muted)"
    }}
  >
                Pipeline Stage {selectedStep + 1} of 7 · {currentStep.name}
              </span>
              <h2
    style={{
      fontFamily: "var(--font-alfa-slab-one)",
      fontSize: "22px",
      color: "var(--color-charcoal-ink)",
      margin: "2px 0 0"
    }}
  >
                {currentStep.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
    variant="secondary"
    size="sm"
    disabled={selectedStep === 0}
    onClick={() => setSelectedStep((prev) => Math.max(0, prev - 1))}
  >
              Previous
            </Button>
            <Button
    variant="secondary"
    size="sm"
    disabled={selectedStep === steps.length - 1}
    onClick={() => setSelectedStep((prev) => Math.min(steps.length - 1, prev + 1))}
  >
              Next Step
            </Button>
          </div>
        </div>

        <p
    style={{
      fontFamily: "var(--font-manrope)",
      fontSize: "15px",
      lineHeight: 1.65,
      color: "var(--color-charcoal-ink)"
    }}
  >
          {currentStep.summary}
        </p>

        <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
      marginTop: "10px"
    }}
  >
          <div
    style={{
      background: "var(--surface-subtle)",
      border: "2px solid var(--color-charcoal-ink)",
      borderRadius: "24px",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }}
  >
            <h3
    style={{
      fontFamily: "var(--font-alfa-slab-one)",
      fontSize: "15px",
      margin: 0
    }}
  >
              Engineering Implementation
            </h3>
            <ul
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      listStyle: "none",
      padding: 0,
      margin: 0
    }}
  >
              {currentStep.details.map((detail, i) => <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span
    style={{
      fontFamily: "var(--font-manrope)",
      fontSize: "13.5px",
      lineHeight: 1.5
    }}
  >
                    {detail}
                  </span>
                </li>)}
            </ul>
          </div>

          <div
    style={{
      background: "#ffffff",
      border: "2px solid var(--color-charcoal-ink)",
      borderRadius: "24px",
      padding: "20px",
      fontFamily: "var(--font-mono)",
      fontSize: "12.5px",
      overflowX: "auto"
    }}
  >
            <div
    style={{
      fontSize: "11px",
      textTransform: "uppercase",
      fontWeight: 700,
      marginBottom: "10px",
      color: "var(--text-muted)"
    }}
  >
              Telemetry Artifact / Code Trace
            </div>
            <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
              <code>{currentStep.codeSample}</code>
            </pre>
          </div>
        </div>
      </div>

      {
    /* Bottom CTA Card */
  }
      <div
    style={{
      marginTop: "32px",
      background: "var(--color-mint-wash)",
      border: "2px solid var(--color-charcoal-ink)",
      borderRadius: "var(--radius-cards)",
      padding: "32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "20px"
    }}
  >
        <div>
          <h3 style={{ fontFamily: "var(--font-alfa-slab-one)", fontSize: "20px", margin: 0 }}>
            Ready to explore the indexed knowledge layer?
          </h3>
          <p
    style={{
      fontFamily: "var(--font-manrope)",
      fontSize: "14px",
      margin: "4px 0 0"
    }}
  >
            Inspect 1,284 documents, run semantic queries, and view AST chunk citations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
    variant="primary"
    size="md"
    icon={<ArrowRight size={15} />}
    onClick={() => navigate("/knowledge")}
  >
            Open Knowledge Explorer
          </Button>
          <Button variant="secondary" size="md" onClick={() => navigate("/search")}>
            Try AI Search
          </Button>
        </div>
      </div>
    </StaticPageLayout>;
};
export {
  HowItWorksPage
};
