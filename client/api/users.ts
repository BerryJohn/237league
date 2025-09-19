import { userDataType } from '@/types/user';
import { apiClient, AxiosResponse } from './client';

// User-related API functions
export const userApi = {
  /**
   * Get current user information
   * GET /users/me
   * Requires authentication (bearer token from cookies)
   */
  getCurrentUser: async (): Promise<AxiosResponse<userDataType>> => {
    return await apiClient.get('/users/me');
  },

  /**
   * Get user information by Steam ID
   * GET /users/:steamId
   */
  getUserBySteamId: async (
    steamId: string
  ): Promise<AxiosResponse<userDataType>> => {
    return await apiClient.get(`/users/${steamId}`);
  },

  /**
   * Update user information
   * PUT /users
   * Requires authentication (bearer token from cookies)
   */
  updateUser: async (
    updateData: Partial<userDataType>
  ): Promise<AxiosResponse<userDataType>> => {
    return await apiClient.put('/users', updateData);
  },
};
