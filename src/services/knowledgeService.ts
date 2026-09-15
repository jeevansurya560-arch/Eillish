import {
  KnowledgeOverviewStats,
  KnowledgeGrowthPoint,
  Document,
  Repository,
  ActivityEvent,
  AIAnswer,
} from '../types';
import {
  mockOverviewStats,
  mockGrowthData,
  mockDocuments,
  mockRepositories,
  mockActivityEvents,
  mockSampleSearchAnswer,
} from '../data/mockData';

/**
 * Service abstraction for the Eillish Knowledge Operating System.
 * In production, these methods will point to FastAPI endpoints:
 * e.g., /api/v1/stats, /api/v1/documents, /api/v1/search
 */
export const knowledgeService = {
  /**
   * Get high-level knowledge overview stats
   */
  async getOverviewStats(): Promise<KnowledgeOverviewStats> {
    // Simulating light async resolution
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockOverviewStats), 80);
    });
  },

  /**
   * Get knowledge growth points over time
   */
  async getGrowthTimeline(): Promise<KnowledgeGrowthPoint[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockGrowthData), 100);
    });
  },

  /**
   * Get list of indexed documents with optional limit
   */
  async getRecentDocuments(limit = 5): Promise<Document[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockDocuments.slice(0, limit)), 90);
    });
  },

  /**
   * Get single document by ID
   */
  async getDocumentById(id: string): Promise<Document | null> {
    return new Promise((resolve) => {
      const doc = mockDocuments.find((d) => d.id === id) || null;
      setTimeout(() => resolve(doc), 60);
    });
  },

  /**
   * Get recent activity events
   */
  async getRecentActivity(limit = 6): Promise<ActivityEvent[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockActivityEvents.slice(0, limit)), 80);
    });
  },

  /**
   * Get connected repositories
   */
  async getRepositories(): Promise<Repository[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockRepositories), 90);
    });
  },

  /**
   * Mock search query against knowledge
   */
  async searchKnowledge(query: string): Promise<AIAnswer> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...mockSampleSearchAnswer,
          query: query || mockSampleSearchAnswer.query,
        });
      }, 350);
    });
  },
};
