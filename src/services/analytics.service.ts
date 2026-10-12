import { ApiClient } from './apiClient';

export interface RetrievalMetrics {
  precisionAt3: number;
  precisionAt5: number;
  mrr: number;
  citationCoverage: number;
  groundednessScore: number;
  avgLatencyMs: number;
  totalQueries: number;
  userSatisfactionRatio: number;
  totalDocuments?: number;
  totalChunks?: number;
  totalRepositories?: number;
}

export const analyticsService = {
  async getMetrics(): Promise<RetrievalMetrics> {
    return ApiClient.get<RetrievalMetrics>('/analytics/metrics');
  },
};
