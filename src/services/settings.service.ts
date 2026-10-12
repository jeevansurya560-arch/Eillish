import { ApiClient } from './apiClient';

export interface UserSettingsDTO {
  chunkSize: number;
  chunkOverlap: number;
  embeddingModel: string;
  llmModel: string;
  retrievalK: number;
  searchMode: string;
  astHeadersEnforced: boolean;
  embeddingDimension: number;
  vectorStatus: string;
}

export const settingsService = {
  async getSettings(): Promise<UserSettingsDTO> {
    return ApiClient.get<UserSettingsDTO>('/settings');
  },

  async updateSettings(updates: Partial<UserSettingsDTO>): Promise<UserSettingsDTO> {
    return ApiClient.put<UserSettingsDTO>('/settings', updates);
  },

  async getDatabaseHealth(): Promise<any> {
    const BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
    const rootUrl = BASE_URL.replace('/api/v1', '');
    const resp = await fetch(`${rootUrl}/health/database`);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    return resp.json();
  }
};
