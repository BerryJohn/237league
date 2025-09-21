import type { User } from '@shared/types';
import { apiClient, AxiosResponse } from './client';

// User-related API functions
export const userApi = {
  /**
   * Get current user information
   * GET /users/me
   * Requires authentication (bearer token from cookies)
   */
  getCurrentUser: async (): Promise<AxiosResponse<User>> => {
    return await apiClient.get('/users/me');
  },

  /**
   * Get user information by Steam ID
   * GET /users/:steamId
   */
  getUserBySteamId: async (steamId: string): Promise<AxiosResponse<User>> => {
    return await apiClient.get(`/users/${steamId}`);
  },

  /**
   * Update user information
   * PUT /users
   * Requires authentication (bearer token from cookies)
   */
  updateUser: async (
    updateData: Partial<User>
  ): Promise<AxiosResponse<User>> => {
    return await apiClient.put('/users', updateData);
  },
};
