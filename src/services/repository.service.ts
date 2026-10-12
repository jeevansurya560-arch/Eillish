import { ApiClient } from './apiClient';
import { Repository } from '../types';

export const repositoryService = {
  async getRepositories(): Promise<Repository[]> {
    return ApiClient.get<Repository[]>('/repositories');
  },

  async getRepositoryById(id: string): Promise<Repository | null> {
    try {
      return await ApiClient.get<Repository>(`/repositories/${id}`);
    } catch {
      return null;
    }
  },

  async syncRepository(id: string): Promise<{ success: boolean; message: string; jobId?: string }> {
    return ApiClient.post<{ success: boolean; message: string; jobId?: string }>(
      `/repositories/${id}/sync`,
      {}
    );
  },

  async connectRepository(name: string, url: string): Promise<Repository> {
    return ApiClient.post<Repository>('/repositories/connect', { name, url });
  },
};
