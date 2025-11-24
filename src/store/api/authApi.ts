import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';

// API base URL - adjust this based on your backend
const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

// Types for API requests and responses
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface User {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'user' | 'admin';
    status: 'active' | 'blocked';
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    success: boolean;
    statusCode: number;
    message: string;
    token?: string;
    data: User;
}

// Create the auth API slice
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/signin',
                method: 'POST',
                body: credentials,
            }),
        }),

        register: builder.mutation<AuthResponse, RegisterRequest>({
            query: (userData) => ({
                url: '/users/create-user',
                method: 'POST',
                body: userData,
            }),
        }),

        getCurrentUser: builder.query<AuthResponse, void>({
            query: () => '/auth/me',
            providesTags: ['Auth'],
        }),
    }),
});

// Export hooks for usage in components
export const {
    useLoginMutation,
    useRegisterMutation,
    useGetCurrentUserQuery,
} = authApi;
