import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  KeyRound,
  FileCheck,
  Eye,
  Server,
  AlertTriangle,
  ArrowRight,
  GitBranch,
} from 'lucide-react';
import { StaticPageLayout } from '../components/layout/StaticPageLayout';

export const SecurityPage: React.FC = () => {
  const securitySections = [
    {
      icon: KeyRound,
      title: 'Authentication',
      badge: 'Identity Layer',
      badgeColor: 'var(--color-mint-wash)',
      headline: 'Cryptographic JWT tokens and GitHub OAuth',
      points: [
        'Passwords hashed using salted bcrypt (cost factor 12) via passlib on the FastAPI service.',
        'Cryptographic JSON Web Tokens (JWT) signed with HS256 and configured with 24-hour expiration.',
        'GitHub OAuth flows request only the minimum required read-only repository scopes.',
        'Session persistence strictly stores standard JWT bearer tokens—passwords and client secrets are never retained in browser storage.',
      ],
    },
    {
      icon: Lock,
      title: 'Authorization & Tenant Isolation',
      badge: 'Access Control',
      badgeColor: 'var(--color-powder-blue)',
      headline: 'Strict workspace boundary enforcement verified on every API request',
      points: [
        'Tenancy is verified server-side on every route: User A cannot read User B repositories, embeddings, or queries.',
        'Never relies on hiding UI buttons—all PostgreSQL queries filter by authenticated user_id or authorized workspace_id.',
        'Row-Level Security (RLS) and foreign-key constraints prevent cross-tenant vector retrieval in pgvector.',
      ],
    },
    {
      icon: GitBranch,
      title: 'GitHub Permissions & Scope Minimization',
      badge: 'OAuth Hygiene',
      badgeColor: 'var(--color-sunbeam-yellow)',
      headline: 'Read-only repository access with explicit repository-level selection',
      points: [
        'Eillish requests read-only access to repository contents, commit trees, and webhook delivery.',
        'We never ask for write, delete, or administrative permissions to your GitHub account or repositories.',
        'Users can grant access to individual repositories rather than their entire organization or profile.',
        'OAuth tokens can be revoked at any moment from GitHub Settings > Applications with immediate disconnection.',
      ],
    },
    {
      icon: Server,
      title: 'Data Isolation & Embeddings Storage',
      badge: 'Database Layer',
      badgeColor: 'var(--color-peach-paper)',
      headline: 'Dedicated pgvector schemas with strict tenant isolation',
      points: [
        'Source code chunks and embeddings are indexed in PostgreSQL using pgvector with tenant-keyed partitions.',
        'Raw source code is never used to train generalized foundation models.',
        'Embeddings and AST chunks are deleted immediately if a repository is disconnected or removed from a workspace.',
      ],
    },
    {
      icon: FileCheck,
      title: 'Source Traceability & Line Audits',
      badge: 'Evidence Verifiability',
      badgeColor: 'var(--color-mint-wash)',
      headline: 'Every statement links to commit hashes and file line spans',
      points: [
        'AI reasoning answers must produce verified AST chunk citations (repository, file path, lineStart, lineEnd).',
        'If the retrieved context does not contain verifiable evidence, the system is designed to disclose insufficient data rather than extrapolate.',
        'Citations link back to verifiable git commit blobs so engineering teams can confirm veracity before acting.',
      ],
    },
    {
      icon: Eye,
      title: 'Audit Trail & Event Logging',
      badge: 'Telemetry',
      badgeColor: 'var(--color-powder-blue)',
      headline: 'Immutable chronological event records of all knowledge modifications',
      points: [
        'Repository syncs, AST parsing runs, user queries, and citation clicks produce auditable telemetry events.',
        'The Activity Timeline records timestamp, actor, target entity, status, and processing duration.',
        'Provides full visibility into when documents were updated, which chunks were refreshed, and query performance metrics.',
      ],
    },
  ];

  return (
    <StaticPageLayout
      title="Security & Trust Model"
      subtitle="A transparent, factual breakdown of authentication, authorization boundaries, GitHub permissions, and tenant data isolation."
      badge="Security Architecture"
    >
      {/* Guiding Principle Banner */}
      <section style={{ maxWidth: 'var(--page-max-width)', margin: '0 auto 36px auto', width: '100%' }}>
        <div
          style={{
            background: 'var(--color-snow)',
            border: '2px solid var(--color-charcoal-ink)',
            borderRadius: 'var(--radius-cards)',
            padding: '28px 32px',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-sm)',
              border: '2px solid var(--color-charcoal-ink)',
              background: 'var(--color-sunbeam-yellow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ShieldCheck size={26} style={{ color: 'var(--color-charcoal-ink)' }} />
          </div>
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                margin: '0 0 4px 0',
              }}
            >
              Factual Security Over Marketing Claims
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-manrope)',
                fontSize: '13.5px',
                color: 'var(--color-charcoal-ink)',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              We do not invent certifications, compliance badges, or unprovable claims. Eillish is engineered with deterministic boundaries: server-enforced tenancy, read-only GitHub authorization, encrypted credentials, and line-traceable evidence.
            </p>
          </div>
        </div>
      </section>

      {/* Grid of Security Core Pillars */}
      <section style={{ maxWidth: 'var(--page-max-width)', margin: '0 auto 48px auto', width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: 24,
          }}
        >
          {securitySections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div
                key={idx}
                style={{
                  background: 'var(--color-snow)',
                  border: '2px solid var(--color-charcoal-ink)',
                  borderRadius: 'var(--radius-cards)',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 16,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 'var(--radius-sm)',
                        border: '2px solid var(--color-charcoal-ink)',
                        background: 'var(--color-peach-paper)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '18px',
                        margin: 0,
                      }}
                    >
                      {sec.title}
                    </h3>
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-manrope)',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-full)',
                      border: '2px solid var(--color-charcoal-ink)',
                      background: sec.badgeColor,
                    }}
                  >
                    {sec.badge}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-manrope)',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    color: 'var(--color-charcoal-ink)',
                    marginBottom: 16,
                  }}
                >
                  {sec.headline}
                </p>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  {sec.points.map((pt, pIdx) => (
                    <li
                      key={pIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        fontFamily: 'var(--font-manrope)',
                        fontSize: '12.5px',
                        lineHeight: 1.45,
                        color: 'var(--text-primary)',
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: 'var(--color-charcoal-ink)',
                          marginTop: 6,
                          flexShrink: 0,
                        }}
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Security Boundaries & Limitations Disclosure */}
      <section style={{ maxWidth: 'var(--page-max-width)', margin: '0 auto 48px auto', width: '100%' }}>
        <div
          style={{
            background: 'var(--color-peach-paper)',
            border: '2px solid var(--color-charcoal-ink)',
            borderRadius: 'var(--radius-cards)',
            padding: '32px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <AlertTriangle size={22} style={{ color: 'var(--color-ember-orange)' }} />
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                margin: 0,
              }}
            >
              Explicit Security Boundaries & Non-Guarantees
            </h3>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-manrope)',
              fontSize: '13.5px',
              lineHeight: 1.55,
              marginBottom: 16,
            }}
          >
            Engineering honesty requires stating what a system does <em>not</em> do:
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 16,
            }}
          >
            <div
              style={{
                background: 'var(--color-snow)',
                border: '2px solid var(--color-charcoal-ink)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}
              >
                No Model Fine-Tuning
              </div>
              <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '12.5px', lineHeight: 1.45, margin: 0 }}>
                Eillish does not fine-tune public LLMs on your proprietary code. Context is passed ephemerally strictly during RAG query synthesis.
              </p>
            </div>

            <div
              style={{
                background: 'var(--color-snow)',
                border: '2px solid var(--color-charcoal-ink)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}
              >
                Secrets In Code
              </div>
              <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '12.5px', lineHeight: 1.45, margin: 0 }}>
                While Eillish excludes common .env files, repositories should never commit plaintext production credentials to Git history.
              </p>
            </div>

            <div
              style={{
                background: 'var(--color-snow)',
                border: '2px solid var(--color-charcoal-ink)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}
              >
                Air-Gapped Deployments
              </div>
              <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '12.5px', lineHeight: 1.45, margin: 0 }}>
                Local-only or on-premise air-gapped instances require self-hosting the FastAPI backend with local vector models (e.g. Ollama / BGE).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Navigation CTA */}
      <section style={{ maxWidth: 'var(--page-max-width)', margin: '0 auto', width: '100%', textAlign: 'center' }}>
        <div
          style={{
            background: 'var(--color-snow)',
            border: '2px solid var(--color-charcoal-ink)',
            borderRadius: 'var(--radius-cards)',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', margin: 0 }}>
            Have specific security architecture requirements?
          </h3>
          <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '13.5px', maxWidth: '480px', margin: 0 }}>
            Inspect our open architecture documentation or test the tenant isolation boundaries directly in the developer workspace.
          </p>
          <div className="flex items-center gap-3">
            <Link
              to="/docs"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 22px',
                borderRadius: 'var(--radius-full)',
                border: '2px solid var(--color-charcoal-ink)',
                background: 'var(--color-charcoal-ink)',
                color: 'var(--color-snow)',
                fontFamily: 'var(--font-manrope)',
                fontSize: '13px',
                fontWeight: 800,
                textDecoration: 'none',
              }}
            >
              <span>View Architecture Docs</span>
              <ArrowRight size={13} />
            </Link>
            <Link
              to="/auth/login"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 22px',
                borderRadius: 'var(--radius-full)',
                border: '2px solid var(--color-charcoal-ink)',
                background: 'var(--color-sunbeam-yellow)',
                color: 'var(--color-charcoal-ink)',
                fontFamily: 'var(--font-manrope)',
                fontSize: '13px',
                fontWeight: 800,
                textDecoration: 'none',
              }}
            >
              <span>Sign In to Workspace</span>
            </Link>
          </div>
        </div>
      </section>
    </StaticPageLayout>
  );
};
