import AppConfig from '@/config/app.config';
import { RefereeData } from '@/types';
import qs from 'qs';
import { fetchWrapper } from '@/utils/fetch.utils';

const BASE_API_URL = AppConfig.api.baseUrl

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
    }): Promise<RefereeData> {
        const queryString = qs.stringify(params)
        return await fetchWrapper<RefereeData>(`/referee/matches?${queryString}`);
    }

    /**
     * Get NewsArticle by ID
     */
    async getRefereeById(id: string): Promise<RefereeData> {
        const response = await fetch(`${BASE_API_URL}/referee/matches/${id}`);
        if (!response.ok) {
            throw new Error('Không thể tải chi tiết news');
        }
        const result: { data: RefereeData } = await response.json();
        return result.data;
    }


}

export default new RefereeService();