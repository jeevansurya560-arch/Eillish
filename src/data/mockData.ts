import { 
  Document, 
  Repository, 
  ActivityEvent, 
  KnowledgeOverviewStats, 
  KnowledgeGrowthPoint,
  AIAnswer 
} from '../types';

export const mockOverviewStats: KnowledgeOverviewStats = {
  totalDocuments: 1284,
  totalChunks: 8421,
  totalRepositories: 12,
  indexingPercentage: 94,
  documentsDelta: '+18 this week',
  chunksDelta: '+342 new chunks',
  repositoriesDelta: 'All active',
};

export const mockGrowthData: KnowledgeGrowthPoint[] = [
  { date: '2026-08-16', label: 'Aug 16', documents: 890, chunks: 5200 },
  { date: '2026-08-20', label: 'Aug 20', documents: 940, chunks: 5620 },
  { date: '2026-08-24', label: 'Aug 24', documents: 995, chunks: 6100 },
  { date: '2026-08-28', label: 'Aug 28', documents: 1050, chunks: 6640 },
  { date: '2026-09-01', label: 'Sep 01', documents: 1110, chunks: 7120 },
  { date: '2026-09-05', label: 'Sep 05', documents: 1180, chunks: 7650 },
  { date: '2026-09-09', label: 'Sep 09', documents: 1235, chunks: 8040 },
  { date: '2026-09-13', label: 'Sep 13', documents: 1270, chunks: 8310 },
  { date: '2026-09-15', label: 'Today', documents: 1284, chunks: 8421 },
];

export const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    title: 'FastAPI Authentication & JWT Lifecycle',
    path: 'backend/authentication.md',
    repository: 'Eillish',
    type: 'markdown',
    description: 'Authentication flow using JWT tokens, signature validation, and FastAPI middleware for route protection.',
    tags: ['Python', 'FastAPI', 'JWT', 'Security'],
    updatedAt: '2 hours ago',
    chunksCount: 18,
    linesCount: 142,
    content: `# FastAPI Authentication & JWT Lifecycle

## Overview
Authentication in the Eillish backend is implemented through asymmetric JWT (JSON Web Tokens) with RS256 signature verification.

## Middleware Pipeline
The middleware interceptor intercepts every incoming HTTP request to inspect the \`Authorization: Bearer <token>\` header.

\`\`\`python
from fastapi import Request, HTTPException, Depends
from jose import jwt, JWTError

async def verify_jwt_token(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or malformed bearer token")
    
    token = auth_header.split(" ")[1]
    try:
        payload = jwt.decode(token, PUBLIC_KEY, algorithms=["RS256"])
        request.state.user = payload
        return payload
    except JWTError as e:
        raise HTTPException(status_code=401, detail=f"Token invalid: {str(e)}")
\`\`\`

## Token Expiry and Refresh Strategy
Access tokens have a 15-minute lifespan to minimize the attack window, paired with HTTP-only refresh cookies.
`
  },
  {
    id: 'doc-2',
    title: 'VectorStore & pgvector Indexing Pipeline',
    path: 'backend/core/vector_store.py',
    repository: 'Eillish',
    type: 'code',
    description: 'Hierarchical chunk indexing with IVFFlat cosine similarity distance calculation and batch chunk upsert.',
    tags: ['Python', 'pgvector', 'PostgreSQL', 'Embeddings'],
    updatedAt: '5 hours ago',
    chunksCount: 24,
    linesCount: 218,
    content: `# backend/core/vector_store.py
import asyncpg
from typing import List, Dict, Any

class PgVectorStore:
    def __init__(self, dsn: str, dimension: int = 1536):
        self.dsn = dsn
        self.dimension = dimension

    async def hybrid_search(self, query_vector: List[float], query_text: str, top_k: int = 5):
        query = """
        WITH semantic_search AS (
            SELECT id, document_id, content, 1 - (embedding <=> $1::vector) AS score
            FROM document_chunks
            ORDER BY embedding <=> $1::vector
            LIMIT $2
        ),
        keyword_search AS (
            SELECT id, document_id, content, ts_rank(tsv, websearch_to_tsquery('english', $3)) AS score
            FROM document_chunks
            WHERE tsv @@ websearch_to_tsquery('english', $3)
            LIMIT $2
        )
        SELECT COALESCE(s.id, k.id) AS id, ...
        """
        ...
`
  },
  {
    id: 'doc-3',
    title: 'Semantic Chunking & Overlap Strategy',
    path: 'docs/chunking_strategy.md',
    repository: 'Eillish-Knowledge',
    type: 'documentation',
    description: 'Recursive boundary splitting by Markdown AST headers and sentence boundaries with 10% token overlap.',
    tags: ['RAG', 'Chunking', 'Tokenization', 'NLP'],
    updatedAt: '1 day ago',
    chunksCount: 12,
    linesCount: 96,
  },
  {
    id: 'doc-4',
    title: 'RAG Retrieval & Reranker Orchestration',
    path: 'ai/rag_pipeline.py',
    repository: 'Eillish',
    type: 'code',
    description: 'Two-stage hybrid dense-sparse retrieval combining BM25 keyword matching with bi-encoder cosine embeddings.',
    tags: ['RAG', 'Retrieval', 'Cross-Encoder', 'AI'],
    updatedAt: '2 days ago',
    chunksCount: 32,
    linesCount: 284,
  },
  {
    id: 'doc-5',
    title: 'GitHub Webhook Ingestion & Git Tree Polling',
    path: 'services/sync/worker.go',
    repository: 'Eillish-Sync',
    type: 'code',
    description: 'High-throughput Git commit log scanner and delta sync worker detecting file modification events.',
    tags: ['Go', 'GitHub-API', 'Webhooks', 'Sync'],
    updatedAt: '3 days ago',
    chunksCount: 14,
    linesCount: 165,
  }
];

export const mockRepositories: Repository[] = [
  {
    id: 'repo-1',
    name: 'Eillish',
    description: 'Core AI knowledge indexing engine, RAG pipeline, and backend services.',
    provider: 'github',
    filesCount: 143,
    chunksCount: 1842,
    status: 'synced',
    lastSyncedAt: '14 minutes ago',
    branch: 'main',
    url: 'https://github.com/org/eillish'
  },
  {
    id: 'repo-2',
    name: 'Eillish-Docs',
    description: 'System architecture specifications, RFCs, and engineering guidelines.',
    provider: 'github',
    filesCount: 68,
    chunksCount: 892,
    status: 'synced',
    lastSyncedAt: '1 hour ago',
    branch: 'main',
    url: 'https://github.com/org/eillish-docs'
  },
  {
    id: 'repo-3',
    name: 'Eillish-Knowledge',
    description: 'Curated technical notes, research papers, and domain knowledge corpus.',
    provider: 'github',
    filesCount: 312,
    chunksCount: 4110,
    status: 'synced',
    lastSyncedAt: '3 hours ago',
    branch: 'main',
    url: 'https://github.com/org/eillish-knowledge'
  },
  {
    id: 'repo-4',
    name: 'Infrastructure',
    description: 'Kubernetes manifests, Terraform definitions, and pgvector clustering scripts.',
    provider: 'github',
    filesCount: 42,
    chunksCount: 512,
    status: 'needs_attention',
    lastSyncedAt: '1 day ago',
    branch: 'prod',
    url: 'https://github.com/org/infrastructure'
  }
];

export const mockActivityEvents: ActivityEvent[] = [
  {
    id: 'act-1',
    type: 'repo_sync',
    title: 'Repository synchronized',
    description: 'Processed 142 files in repository "Eillish"',
    timestamp: '2 minutes ago',
    metadata: {
      repository: 'Eillish',
      filesProcessed: 142
    }
  },
  {
    id: 'act-2',
    type: 'knowledge_indexed',
    title: 'Knowledge indexed',
    description: '284 new chunks processed and stored in pgvector index',
    timestamp: '4 minutes ago',
    metadata: {
      chunksAdded: 284
    }
  },
  {
    id: 'act-3',
    type: 'doc_updated',
    title: 'Document updated',
    description: 'backend/authentication.md re-chunked and metadata synced',
    timestamp: '2 hours ago',
    targetId: 'doc-1',
    metadata: {
      filePath: 'backend/authentication.md'
    }
  },
  {
    id: 'act-4',
    type: 'ai_query',
    title: 'AI query executed',
    description: '"How does authentication work in this repository?"',
    timestamp: '3 hours ago',
    metadata: {
      query: 'How does authentication work in this repository?'
    }
  },
  {
    id: 'act-5',
    type: 'repo_sync',
    title: 'Repository synchronized',
    description: 'Processed 68 files in repository "Eillish-Docs"',
    timestamp: '5 hours ago',
    metadata: {
      repository: 'Eillish-Docs',
      filesProcessed: 68
    }
  }
];

export const mockSampleSearchAnswer: AIAnswer = {
  id: 'ans-1',
  query: 'How does authentication work in this repository?',
  answerText: `Authentication in Eillish is handled through JWT-based authentication with asymmetric RS256 signature verification. 

When a client initiates a request to a protected endpoint, it passes through the authentication middleware interceptor (\`verify_jwt_token\`). The middleware extracts the \`Authorization: Bearer <token>\` header, verifies the token against the cluster's public key, and injects the decoded user session into \`request.state.user\`.

Access tokens are configured with a strict 15-minute time-to-live, backed by HTTP-only secure refresh tokens stored in Redis.`,
  citations: [
    {
      id: 'cit-1',
      documentId: 'doc-1',
      title: 'authentication.md',
      path: 'backend/authentication.md',
      relevanceScore: 94,
      excerpt: 'The middleware interceptor intercepts every incoming HTTP request to inspect the Authorization: Bearer header...',
      lineStart: 42,
      lineEnd: 54
    },
    {
      id: 'cit-2',
      documentId: 'doc-2',
      title: 'vector_store.py',
      path: 'backend/core/vector_store.py',
      relevanceScore: 87,
      excerpt: 'async def verify_jwt_token(request: Request): ... payload = jwt.decode(token, PUBLIC_KEY, algorithms=["RS256"])',
      lineStart: 12,
      lineEnd: 26
    },
    {
      id: 'cit-3',
      documentId: 'doc-4',
      title: 'rag_pipeline.py',
      path: 'ai/rag_pipeline.py',
      relevanceScore: 81,
      excerpt: 'Route authentication requires valid session context before invoking semantic vector lookup pipeline.',
      lineStart: 78,
      lineEnd: 88
    }
  ],
  modelUsed: 'Eillish-Hybrid-Retriever-v1',
  retrievalLatencyMs: 184,
  totalTokens: 412,
  createdAt: 'Just now'
};
