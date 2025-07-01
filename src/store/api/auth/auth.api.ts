import { createApi } from '@reduxjs/toolkit/query/react';
import { Login, UserSession } from './types';
import { baseApi } from '../base-api';

export const authApi = createApi({
    reducerPath: 'api/auth',
    baseQuery: baseApi,
    endpoints: (builder) => ({
        userSession: builder.query<UserSession, void>({
            query: () => ({ url: '/me' }),
        }),
        login: builder.mutation<void, Login>({
            query: (body) => ({ url: '/auth/login', method: 'POST', body }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({ url: '/auth/logout', method: 'POST' }),
        }),
        register: builder.mutation<void, Register>({
            query: (body) => ({ url: '/auth/register', method: 'POST', body }),
        }),
    }),
});

export const { useUserSessionQuery, useLoginMutation, useLogoutMutation, useRegisterMutation } = authApi;

export type Register = {
    name: string;
    email: string;
    password: string;
    roleId: number;
};
