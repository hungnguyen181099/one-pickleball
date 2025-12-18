import AppConfig from '@/config/app.config';
import {  NewsApiResponse, NewsArticle, PaginatedResponse } from '@/types';
import qs from 'qs';

const BASE_API_URL = AppConfig.api.baseUrl
class NewService {
    /**
     * Get all NewsArticle
     */
    async getNews(params?: {
        page?: number;
        status?: string;
        search?: string;
        per_page?: number;
    }): Promise<NewsApiResponse> {
        const queryString = qs.stringify(params)
        const url = `${BASE_API_URL}/news?${queryString}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

        return response.json();
    }

    /**
     * Get NewsArticle by ID
     */
    async getNewById(id: string): Promise<NewsArticle> {
        const response = await fetch(`${BASE_API_URL}/news/${id}`);
        if (!response.ok) {
            throw new Error('Không thể tải chi tiết news');
        }
        const result: { data: NewsArticle } = await response.json();
        return result.data;
    }

}

export default new NewService();