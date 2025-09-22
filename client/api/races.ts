import { apiClient, AxiosResponse } from './client';
import { Race } from '@shared/types';

export const racesApi = {
  /**
   * Get all
   * GET /races
   */
  getAllRaces: async (): Promise<AxiosResponse<Race[]>> => {
    return await apiClient.get('/races');
  },

  /**
   *  Create a new race
   *  POST /races
   */
  createRace: async (race: Race): Promise<AxiosResponse<Race>> => {
    return await apiClient.post('/races', race);
  },

  /**
   * Update an existing race
   * PUT /races/:id
   */
  updateRace: async (id: string, race: Race): Promise<AxiosResponse<Race>> => {
    return await apiClient.put(`/races/${id}`, race);
  },

  /**
   * Delete an existing race
   * DELETE /races/:id
   */
  deleteRace: async (id: string): Promise<AxiosResponse<void>> => {
    return await apiClient.delete(`/races/${id}`);
  },
};
