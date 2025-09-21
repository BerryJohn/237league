import { apiClient, AxiosResponse } from './client';
import { Season } from '@shared/types';

export const seasonsApi = {
  /**
   * Get all seasons
   * GET /seasons
   */
  getAllSeasons: async (): Promise<AxiosResponse<Season[]>> => {
    return await apiClient.get('/seasons');
  },

  /**
   * Create a new season
   * POST /seasons
   */
  createSeason: async (
    data: Partial<Season>
  ): Promise<AxiosResponse<Season>> => {
    return await apiClient.post('/seasons', data);
  },

  /**
   * Update an existing season
   * PUT /seasons/:id
   */
  updateSeason: async (
    id: string,
    data: Partial<Season>
  ): Promise<AxiosResponse<Season>> => {
    return await apiClient.put(`/seasons/${id}`, data);
  },

  /**
   * Delete a season
   * DELETE /seasons/:id
   */
  deleteSeason: async (id: string): Promise<AxiosResponse<void>> => {
    return await apiClient.delete(`/seasons/${id}`);
  },
};
