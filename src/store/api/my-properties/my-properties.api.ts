import { createApi } from '@reduxjs/toolkit/query/react';
import { baseApi } from '../base-api';
import {
    AddExpense,
    AddOtherExpense,
    MyPropertyMetadata,
    MyPropertyResponse,
    PropertyExpenses,
    PropertyExpensesParams,
} from './types';
import { BasePaginationParams } from '../types';

export const myPropertiesApi = createApi({
    reducerPath: 'api/my-properties',
    baseQuery: baseApi,
    endpoints: (builder) => ({
        getMyProperties: builder.query<MyPropertyResponse, BasePaginationParams>({
            query: (params) => ({
                url: '/my-properties',
                params,
            }),
        }),
        getExpenses: builder.query<PropertyExpenses, PropertyExpensesParams>({
            query: ({ propertyId, categoryId }) => ({
                url: `/my-properties/${propertyId}/expenses`,
                params: { categoryId },
            }),
        }),
        getMyPropertyMetadata: builder.query<MyPropertyMetadata, void>({
            query: () => ({
                url: '/my-properties/metadata',
            }),
        }),
        addExpense: builder.mutation<void, { propertyId: number; data: AddExpense }>({
            query: ({ propertyId, data }) => ({
                url: `/my-properties/${propertyId}/expenses`,
                method: 'POST',
                body: data,
            }),
        }),
        addOtherExpense: builder.mutation<void, { propertyId: number; data: AddOtherExpense }>({
            query: ({ propertyId, data }) => ({
                url: `/my-properties/${propertyId}/expenses/other`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useGetMyPropertiesQuery,
    useGetExpensesQuery,
    useGetMyPropertyMetadataQuery,
    useAddExpenseMutation,
    useAddOtherExpenseMutation,
} = myPropertiesApi;
