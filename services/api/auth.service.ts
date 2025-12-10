import { ApiResponse, User } from '@/types';
import ApiClient from './client';

export interface RegisterRequest {
    name: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
    role_type: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export const authService = {
    async login(data: LoginRequest): Promise<ApiResponse<any>> {
        return ApiClient.post('auth/login', data);
    },

    async register(data: RegisterRequest): Promise<ApiResponse<any>> {
        return ApiClient.post('auth/register', data);
    },

    async logout(): Promise<ApiResponse<any>> {
        return ApiClient.post('auth/logout');
    },

    async getProfile(): Promise<ApiResponse<User>> {
        return ApiClient.get('auth/me');
    },
};
