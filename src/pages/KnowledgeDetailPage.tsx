import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  FileCode,
  FileText,
  Copy,
  Sparkles,
  Clock,
  Check,
  AlertCircle,
} from 'lucide-react';
import { knowledgeService } from '../services/knowledge.service';
import { Document } from '../types';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const KnowledgeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doc, setDoc] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'chunks' | 'citations'>('content');

  useEffect(() => {
    async function loadDoc() {
      if (!id) return;
      try {
        setIsLoading(true);
        setError(null);
        const data = await knowledgeService.getDocumentById(id);
        if (data) {
          setDoc(data);
        } else {
          setError('Document not found.');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load document details');
      } finally {
        setIsLoading(false);
      }
    }
    loadDoc();
  }, [id]);

  const handleCopyPath = () => {
    if (!doc) return;
    navigator.clipboard?.writeText(doc.path);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px', textAlign: 'center' }}>
        <div
          style={{
            width: 32,
            height: 32,
            border: '3px solid var(--color-charcoal-ink)',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            margin: '0 auto 16px auto',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <div style={{ fontWeight: 700, fontSize: '14px' }}>Loading document inspection data...</div>
      </div>
    );
  }

  if (error || !doc) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px', textAlign: 'center' }}>
        <div className="ui-card" style={{ padding: '40px', borderColor: '#ef4444' }}>
          <AlertCircle size={32} style={{ color: '#ef4444', margin: '0 auto 12px auto' }} />
          <h2 className="type-h2" style={{ color: '#991b1b', marginBottom: 8 }}>Document Not Found</h2>
          <p className="type-secondary" style={{ marginBottom: 20 }}>
            {error || 'The requested document does not exist in the pgvector database.'}
          </p>
          <Button variant="primary" size="sm" onClick={() => navigate('/knowledge')}>
            Return to Knowledge Explorer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px', fontFamily: 'var(--font-manrope)' }}>
      {/* Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '12.5px', marginBottom: 20 }}>
        <Link to="/knowledge" style={{ color: 'var(--color-charcoal-ink)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 700 }}>
          <ArrowLeft size={14} />
          <span>Knowledge Explorer</span>
        </Link>
        <span style={{ color: 'var(--text-muted)' }}>/</span>
        <span style={{ color: 'var(--text-muted)' }}>{doc.repository}</span>
        <span style={{ color: 'var(--text-muted)' }}>/</span>
        <span style={{ fontWeight: 800, color: 'var(--color-charcoal-ink)' }}>{doc.title}</span>
      </div>

      {/* Document Header Box */}
      <div
        style={{
          background: 'var(--color-snow)',
          border: '2px solid var(--color-charcoal-ink)',
          borderRadius: 'var(--radius-cards)',
          padding: '32px',
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 'var(--radius-sm)',
                border: '2px solid var(--color-charcoal-ink)',
                background: 'var(--color-peach-paper)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {doc.type === 'code' ? <FileCode size={22} /> : <FileText size={22} />}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', margin: 0 }}>
                  {doc.title}
                </h1>
                <Badge variant="emerald" dot>Indexed</Badge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '12.5px', color: 'var(--text-muted)' }}>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{doc.path}</span>
                <span>·</span>
                <span>{doc.repository}</span>
                <span>·</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={12} />
                  <span>Updated {doc.updatedAt}</span>
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Button
              variant="secondary"
              size="sm"
              icon={copied ? <Check size={13} /> : <Copy size={13} />}
              onClick={handleCopyPath}
            >
              {copied ? 'Copied Path' : 'Copy Reference'}
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<Sparkles size={13} />}
              onClick={() => navigate(`/search?q=${encodeURIComponent('Explain ' + doc.title)}`)}
            >
              Ask About This
            </Button>
          </div>
        </div>

        {/* AI Summary Banner */}
        <div
          style={{
            background: 'var(--color-peach-paper)',
            border: '2px solid var(--color-charcoal-ink)',
            borderRadius: 'var(--radius-sm)',
            padding: '16px 20px',
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <Sparkles size={14} style={{ color: 'var(--color-charcoal-ink)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>
              Semantic AST Summary
            </span>
          </div>
          <p style={{ fontSize: '13px', lineHeight: 1.5, margin: 0 }}>
            {doc.description || `Document indexed from ${doc.repository} with verified semantic chunk boundaries.`}
          </p>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {doc.tags && doc.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid var(--color-charcoal-ink)',
                background: 'var(--color-sunbeam-yellow)',
              }}
            >
              #{tag}
            </span>
          ))}
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: 8 }}>
            {doc.chunksCount} parsed functional chunks · {doc.linesCount || 0} lines
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button
          onClick={() => setActiveTab('content')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            border: '2px solid var(--color-charcoal-ink)',
            background: activeTab === 'content' ? 'var(--color-charcoal-ink)' : 'var(--color-snow)',
            color: activeTab === 'content' ? 'var(--color-snow)' : 'var(--color-charcoal-ink)',
            fontWeight: 800,
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          Full Content
        </button>
      </div>

      {/* Document Content View */}
      <div
        style={{
          background: 'var(--color-snow)',
          border: '2px solid var(--color-charcoal-ink)',
          borderRadius: 'var(--radius-cards)',
          padding: '24px',
        }}
      >
        <pre
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12.5px',
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
            margin: 0,
            overflowX: 'auto',
          }}
        >
          {doc.content || '// Content indexed in chunks. Open Ask Knowledge to query semantic fragments.'}
        </pre>
      </div>
    </div>
  );
};
