import { apiClient, AxiosResponse } from './client';
import { League } from '@shared/types';

// League-related API functions
export const leagueApi = {
  /**
   * Get all leagues
   * GET /leagues
   */
  getAllLeagues: async (): Promise<AxiosResponse<League[]>> => {
    return await apiClient.get('/leagues');
  },

  /**
   * Create a new league
   * POST /leagues
   */
  createLeague: async (data: League): Promise<AxiosResponse<League>> => {
    return await apiClient.post('/leagues', data);
  },

  /**
   * Update an existing league
   * PUT /leagues/:id
   */
  updateLeague: async (
    id: string,
    data: Partial<League>
  ): Promise<AxiosResponse<League>> => {
    return await apiClient.put(`/leagues/${id}`, data);
  },

  /**
   * Delete a league
   * DELETE /leagues/:id
   */
  deleteLeague: async (id: string): Promise<AxiosResponse<void>> => {
    return await apiClient.delete(`/leagues/${id}`);
  },
};
