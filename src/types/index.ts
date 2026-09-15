export type DocumentType = 'markdown' | 'code' | 'documentation' | 'text' | 'pdf';

export interface DocumentChunk {
  id: string;
  documentId: string;
  chunkIndex: number;
  content: string;
  startLine: number;
  endLine: number;
  tokensCount: number;
}

export interface Document {
  id: string;
  title: string;
  path: string;
  repository: string;
  type: DocumentType;
  description: string;
  tags: string[];
  updatedAt: string;
  chunksCount: number;
  linesCount?: number;
  content?: string;
}

export type RepositoryStatus = 'connected' | 'syncing' | 'synced' | 'needs_attention' | 'error';

export interface Repository {
  id: string;
  name: string;
  description: string;
  provider: 'github' | 'local' | 'gitlab';
  filesCount: number;
  chunksCount: number;
  status: RepositoryStatus;
  lastSyncedAt: string;
  branch?: string;
  url?: string;
}

export type ActivityType = 
  | 'repo_sync' 
  | 'knowledge_indexed' 
  | 'doc_updated' 
  | 'ai_query' 
  | 'citation_clicked';

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  targetId?: string;
  metadata?: {
    repository?: string;
    filesProcessed?: number;
    chunksAdded?: number;
    filePath?: string;
    query?: string;
  };
}

export interface KnowledgeOverviewStats {
  totalDocuments: number;
  totalChunks: number;
  totalRepositories: number;
  indexingPercentage: number;
  documentsDelta: string;
  chunksDelta: string;
  repositoriesDelta: string;
}

export interface KnowledgeGrowthPoint {
  date: string;
  label: string;
  documents: number;
  chunks: number;
}

export interface Citation {
  id: string;
  documentId: string;
  title: string;
  path: string;
  relevanceScore: number;
  excerpt: string;
  lineStart: number;
  lineEnd: number;
}

export interface AIAnswer {
  id: string;
  query: string;
  answerText: string;
  citations: Citation[];
  modelUsed: string;
  retrievalLatencyMs: number;
  totalTokens: number;
  createdAt: string;
}
