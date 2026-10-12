import { ApiClient } from './apiClient';
import { AIAnswer } from '../types';

export interface SearchQueryParams {
  query: string;
  scope?: 'all' | 'repo' | 'doc' | 'tag';
  repository?: string;
}

export const searchService = {
  async executeHybridSearch(params: SearchQueryParams): Promise<AIAnswer> {
    return ApiClient.post<AIAnswer, SearchQueryParams>('/search', params);
  },
};
