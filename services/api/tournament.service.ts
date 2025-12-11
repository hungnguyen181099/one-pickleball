/**
 * Tournament Service
 * API service for tournament-related operations
 */
import { ApiResponse, PaginatedResponse, Tournament } from '@/types';

import apiClient from './client';

const BASE_API_URL = 'https://onepickleball.vn/api/'
class TournamentService {
    /**
     * Get all tournaments
     */
    async getTournaments(params?: {
        page?: number;
        pageSize?: number;
        status?: string;
        search?: string;
    }): Promise<PaginatedResponse<Tournament>> {
        const url = `${BASE_API_URL}tournaments`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

        return response.json();
    }

    /**
     * Get tournament by ID
     */
    async getTournamentById(id: string): Promise<Tournament> {
        const response = await fetch(`${BASE_API_URL}tournaments/${id}`);
        if (!response.ok) {
            throw new Error('Không thể tải chi tiết tournaments');
        }
        const result: { data: Tournament } = await response.json();
        return result.data;
    }

    /**
     * Create a new tournament
     */
    async createTournament(data: Partial<Tournament>): Promise<ApiResponse<Tournament>> {
        return apiClient.post<Tournament>('/tournaments', data);
    }

    /**
     * Update tournament
     */
    async updateTournament(id: string, data: Partial<Tournament>): Promise<ApiResponse<Tournament>> {
        return apiClient.put<Tournament>(`/tournaments/${id}`, data);
    }

    /**
     * Delete tournament
     */
    async deleteTournament(id: string): Promise<ApiResponse<void>> {
        return apiClient.delete<void>(`/tournaments/${id}`);
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
