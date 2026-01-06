/**
 * Tournament Service
 * API service for tournament-related operations
 */
import { ApiResponse, CategoriesResponse, EventFeeItem, GetUserTournamentResponse, PaginatedResponse, Tournament, TournamentApiResponse } from '@/types';

import apiClient from './client';
import qs from 'qs'
import AppConfig from '@/config/app.config';
import { fetchWrapper } from '@/utils/fetch.utils';

const BASE_API_URL = AppConfig.api.baseUrl
class TournamentService {
    /**
     * Get all tournaments
     */
    async getTournaments(params?: {
        page?: number;
        status?: string;
        search?: string;
    }): Promise<TournamentApiResponse> {
        const queryString = qs.stringify(params)
        const url = `${BASE_API_URL}/tournaments?${queryString}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

        return response.json();
    }

    /**
     * Get tournament by ID
     */
    async getTournamentById(id: string): Promise<Tournament> {
        const response = await fetch(`${BASE_API_URL}/tournaments/${id}`);
        if (!response.ok) {
            throw new Error('Không thể tải chi tiết tournaments');
        }
        const result: { data: Tournament } = await response.json();
        return result.data;
    }

    /**
     * Get categories
     */
    async getTournamentCategories(id: string): Promise<CategoriesResponse<EventFeeItem>> {
        const url = `${BASE_API_URL}/tournament/${id}/categories`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

        return response.json();
    }

    /**
     * post tournament
     */
    // async postTournament(data: CreateCategoryData): Promise<TournamentCategory> {
    //     const response = await fetch('https://your-api.com/api/categories', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //     });

    //     if (!response.ok) {
    //         throw new Error('Failed to create category');
    //     }

    //     return response.json();
    // }

    /**
     * Delete tournament
     */
    async getUserTournament() {
        return await fetchWrapper<GetUserTournamentResponse>("/user/tournaments");
    }

    /**
     * Register for tournament
     */
    async registerForTournament(tournamentId: string, categoryId: string): Promise<ApiResponse<any>> {
        return apiClient.post(`/tournaments/${tournamentId}/register`, { categoryId });
    }

    /**
     * Get user's registered tournaments
     */
    async getMyTournaments(): Promise<ApiResponse<Tournament[]>> {
        return apiClient.get<Tournament[]>('/tournaments/my');
    }
}

export default new TournamentService();
