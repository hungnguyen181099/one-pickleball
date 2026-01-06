import { MatchDetailResponse, RefereeData } from '@/types';
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
        const queryString = qs.stringify(params)
        console.log(queryString);
        
        return await fetchWrapper<RefereeData>(`/referee/matches?${queryString}`);
    }

    /**
     * Get NewsArticle by ID
     */
    async getRefereeById(id: string): Promise<MatchDetailResponse> {
        return await fetchWrapper<MatchDetailResponse>(`/referee/matches/${id}`);
    }
}

export default new RefereeService();