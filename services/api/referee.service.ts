import { MatchDetailResponse, MatchStateResponse, RefereeData } from '@/types';
import qs from 'qs';

import { fetchWrapper } from '@/utils/fetch.utils';

class RefereeService {
  /**
   * Get all NewsArticle
   */
  async getReferees(params?: {
    page?: number;
    status?: string;
    search?: string;
    per_page?: number;
    date_from?: string;
    date_to?: string;
    tournament_id?: string;
  }): Promise<RefereeData> {
    const queryString = qs.stringify(params);
    return await fetchWrapper<RefereeData>(`/referee/matches?${queryString}`);
  }

  /**
   * Get NewsArticle by ID
   */
  async getRefereeById(id: string): Promise<MatchDetailResponse> {
    return await fetchWrapper<MatchDetailResponse>(`/referee/matches/${id}`);
  }

  async getMatchState(id: string) {
    return await fetchWrapper<MatchStateResponse>(`/referee/matches/${id}/state`);
  }

  async startMatch(id: string) {
    return await fetchWrapper(`/referee/matches/${id}/start`, {
      method: 'POST',
    });
  }

  async updateScore(id: string, body: string) {
    return await fetchWrapper(`/referee/matches/${id}/start`, {
      method: 'POST',
      body: body,
    });
  }
}

export default new RefereeService();
