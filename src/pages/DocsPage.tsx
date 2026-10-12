import React, { useState } from 'react';
import { StaticPageLayout } from '../components/layout/StaticPageLayout';
import { Database, Terminal, Cpu, GitBranch, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DocsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ast' | 'vector' | 'api' | 'sync'>('ast');

  return (
    <StaticPageLayout
      title="Architecture Specifications & Documentation."
      subtitle="Detailed technical specs on AST chunk parsing, hybrid retrieval formulas, pgvector schemas, and sync workers."
      badge="Technical Documentation"
    >
      <div className="static-content-card">
        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            paddingBottom: '16px',
            borderBottom: '2px solid var(--color-charcoal-ink)',
          }}
        >
          <button
            onClick={() => setActiveTab('ast')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              border: '2px solid var(--color-charcoal-ink)',
              background: activeTab === 'ast' ? 'var(--color-sunbeam-yellow)' : 'var(--color-snow)',
              fontFamily: 'var(--font-manrope)',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <Cpu size={14} />
            <span>AST Semantic Chunking</span>
          </button>

          <button
            onClick={() => setActiveTab('vector')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              border: '2px solid var(--color-charcoal-ink)',
              background: activeTab === 'vector' ? 'var(--color-mint-wash)' : 'var(--color-snow)',
              fontFamily: 'var(--font-manrope)',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <Database size={14} />
            <span>VectorStore & pgvector</span>
          </button>

          <button
            onClick={() => setActiveTab('api')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              border: '2px solid var(--color-charcoal-ink)',
              background: activeTab === 'api' ? 'var(--color-powder-blue)' : 'var(--color-snow)',
              fontFamily: 'var(--font-manrope)',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <Terminal size={14} />
            <span>API & Service Contract</span>
          </button>

          <button
            onClick={() => setActiveTab('sync')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              border: '2px solid var(--color-charcoal-ink)',
              background: activeTab === 'sync' ? 'var(--color-lilac-tint)' : 'var(--color-snow)',
              fontFamily: 'var(--font-manrope)',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <GitBranch size={14} />
            <span>Git Delta Sync Ingestion</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="static-prose">
          {activeTab === 'ast' && (
            <div>
              <h2>Abstract Syntax Tree (AST) Chunking Algorithm</h2>
              <p>
                Standard RAG pipelines chunk text using fixed token lengths (e.g. 512 tokens with 50-token overlap). In
                source code, this cuts through statements, severs variable definitions from their usages, and generates
                fragments that no compiler or human can reason about.
              </p>
              <p>
                Eillish utilizes Tree-Sitter grammar parsers for Python, TypeScript, Go, and Rust, combined with markdown AST
                walkers. Boundaries are constructed around semantic definitions:
              </p>
              <ul>
                <li><strong>Class Definitions:</strong> Captured with class docstrings, decorators, and public property types.</li>
                <li><strong>Functions & Methods:</strong> Captured as whole units with parameter types, return signatures, and inner docstrings.</li>
                <li><strong>Markdown Headings:</strong> Hierarchical sections preserved with parent heading breadcrumbs injected into chunk metadata.</li>
              </ul>
              <pre
                style={{
                  background: '#ffffff',
                  border: '2px solid var(--color-charcoal-ink)',
                  borderRadius: '16px',
                  padding: '16px',
                  marginTop: '16px',
                }}
              >
                <code>{`// AST chunk metadata representation
{
  "chunk_id": "chunk_auth_verify_jwt",
  "document_id": "doc-1",
  "ast_type": "async_function_definition",
  "name": "verify_jwt_token",
  "parent_scope": "module",
  "start_line": 56,
  "end_line": 68,
  "token_count": 142
}`}</code>
              </pre>
            </div>
          )}

          {activeTab === 'vector' && (
            <div>
              <h2>VectorStore Schema & Hybrid Retrieval</h2>
              <p>
                Eillish stores chunk embeddings in PostgreSQL with the <code>pgvector</code> extension. We pair dense vector
                cosine similarity with sparse full-text lexical ranking (BM25 via tsvector) to eliminate vocabulary mismatch
                while maintaining precision for exact identifiers.
              </p>
              <pre
                style={{
                  background: '#ffffff',
                  border: '2px solid var(--color-charcoal-ink)',
                  borderRadius: '16px',
                  padding: '16px',
                  marginTop: '16px',
                }}
              >
                <code>{`-- Core pgvector chunk schema
CREATE TABLE document_chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id VARCHAR(64) NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    repository VARCHAR(64) NOT NULL,
    content TEXT NOT NULL,
    start_line INT NOT NULL,
    end_line INT NOT NULL,
    embedding vector(1536) NOT NULL,
    tsv tsvector GENERATED ALWAYS AS (to_tsvector('english', content)) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_chunks_embedding_ivfflat 
ON document_chunks USING ivfflat (embedding vector_cosine_ops) 
WITH (lists = 100);

CREATE INDEX idx_chunks_tsv ON document_chunks USING gin(tsv);`}</code>
              </pre>
            </div>
          )}

          {activeTab === 'api' && (
            <div>
              <h2>FastAPI Backend Service Contract</h2>
              <p>
                The frontend communicates with a modular service layer. During local prototyping, <code>knowledgeService.ts</code>
                serves mock telemetry. In production, this maps 1-to-1 to the following REST and streaming endpoints:
              </p>
              <ul>
                <li><code>GET /api/v1/overview</code>: Overall index metrics (total docs, chunks, indexing percentage).</li>
                <li><code>GET /api/v1/documents</code>: Queryable list of documents with repository and tag filters.</li>
                <li><code>GET /api/v1/documents/:id</code>: Full document text with AST chunk annotations.</li>
                <li><code>POST /api/v1/search</code>: Hybrid search returning answer text with line-level citations.</li>
                <li><code>POST /api/v1/repositories/:id/sync</code>: Trigger asynchronous git delta sync worker.</li>
              </ul>
            </div>
          )}

          {activeTab === 'sync' && (
            <div>
              <h2>Git Delta Sync Worker</h2>
              <p>
                Instead of re-indexing millions of code lines on every commit, Eillish calculates structural diffs using GitHub
                webhooks. Only modified files are parsed into new AST trees, comparing chunk hashes against existing database
                records. Unmodified chunks remain untouched, ensuring sub-second index freshness.
              </p>
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '2px solid var(--color-charcoal-ink)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <span style={{ fontFamily: 'var(--font-manrope)', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            Need help integrating your team's codebases? Read our <Link to="/how-it-works" style={{ textDecoration: 'underline', fontWeight: 700 }}>How It Works</Link> guide.
          </span>
          <Link
            to="/knowledge"
            className="landing-cta-pill"
          >
            <span>Launch Explorer</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </StaticPageLayout>
  );
};
