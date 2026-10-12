import { ApiClient } from './apiClient';
import { User } from '../context/AuthContext';

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  user: User;
}

export const authService = {
  async login(email: string, password?: string): Promise<AuthResponse> {
    return ApiClient.post<AuthResponse>('/auth/login', { email, password });
  },

  async signup(name: string, email: string, password: string, workspaceName?: string): Promise<AuthResponse> {
    return ApiClient.post<AuthResponse>('/auth/signup', { name, email, password, workspaceName });
  },

  async getMe(): Promise<User> {
    return ApiClient.get<User>('/auth/me');
  },
};
