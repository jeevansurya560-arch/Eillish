import { ApiClient } from './apiClient';
import {
  Document,
  KnowledgeOverviewStats,
  KnowledgeGrowthPoint,
  Repository,
  ActivityEvent,
  AIAnswer
} from '../types';

export const knowledgeService = {
  async getOverviewStats(): Promise<KnowledgeOverviewStats> {
    return ApiClient.get<KnowledgeOverviewStats>('/knowledge/stats');
  },

  async getGrowthTimeline(): Promise<KnowledgeGrowthPoint[]> {
    return ApiClient.get<KnowledgeGrowthPoint[]>('/knowledge/growth');
  },

  async getDocuments(params?: { repository?: string; type?: string; search?: string }): Promise<Document[]> {
    const queryParts = [];
    if (params?.repository) queryParts.push(`repository=${encodeURIComponent(params.repository)}`);
    if (params?.type) queryParts.push(`type=${encodeURIComponent(params.type)}`);
    if (params?.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
    const qs = queryParts.length ? `?${queryParts.join('&')}` : '';
    return ApiClient.get<Document[]>(`/knowledge${qs}`);
  },

  async getDocumentById(id: string): Promise<Document | null> {
    try {
      return await ApiClient.get<Document>(`/knowledge/${id}`);
    } catch {
      return null;
    }
  },

  async getRecentDocuments(limit: number = 5): Promise<Document[]> {
    const docs = await this.getDocuments();
    return docs.slice(0, limit);
  },

  async getRecentActivity(limit: number = 6): Promise<ActivityEvent[]> {
    try {
      const activities = await ApiClient.get<ActivityEvent[]>('/activity');
      return activities.slice(0, limit);
    } catch {
      return [];
    }
  },

  async getRepositories(): Promise<Repository[]> {
    return ApiClient.get<Repository[]>('/repositories');
  },

  async searchKnowledge(query: string): Promise<AIAnswer> {
    return ApiClient.post<AIAnswer>('/search', { query });
  }
};
