import { createApi } from '@reduxjs/toolkit/query/react';
import { baseApi } from '../base-api';
import {
    AddExpense,
    AddOtherExpense,
    MyPropertyMetadata,
    MyPropertyResponse,
    PropertyExpenses,
    PropertyExpensesParams,
    Expense,
    OtherExpense,
} from './types';
import { BasePaginationParams } from '../types';

export const myPropertiesApi = createApi({
    reducerPath: 'api/my-properties',
    baseQuery: baseApi,
    tagTypes: ['MyProperties', 'Expenses', 'Expense', 'OtherExpense', 'Metadata'],
    endpoints: (builder) => ({
        getMyProperties: builder.query<MyPropertyResponse, BasePaginationParams>({
            query: (params) => ({
                url: '/my-properties',
                params,
            }),
            providesTags: ['MyProperties'],
        }),
        getExpenses: builder.query<PropertyExpenses, PropertyExpensesParams>({
            query: ({ propertyId, categoryId }) => ({
                url: `/my-properties/${propertyId}/expenses`,
                params: { categoryId },
            }),
            providesTags: (result, error, { propertyId }) => [{ type: 'Expenses', id: propertyId }],
        }),
        getExpenseById: builder.query<Expense | OtherExpense, number>({
            query: (id) => ({
                url: `/my-properties/expenses/${id}`,
            }),
            providesTags: (result, error, id) => [{ type: 'Expense', id }],
        }),
        getOtherExpenseById: builder.query<OtherExpense, number>({
            query: (id) => ({
                url: `/my-properties/expenses/other/${id}`,
            }),
            providesTags: (result, error, id) => [{ type: 'OtherExpense', id }],
        }),
        getMyPropertyMetadata: builder.query<MyPropertyMetadata, void>({
            query: () => ({
                url: '/my-properties/metadata',
            }),
            providesTags: ['Metadata'],
        }),
        addExpense: builder.mutation<void, { propertyId: number; data: AddExpense }>({
            query: ({ propertyId, data }) => ({
                url: `/my-properties/${propertyId}/expenses`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error, { propertyId }) => [{ type: 'Expenses', id: propertyId }, 'MyProperties'],
        }),
        addOtherExpense: builder.mutation<void, { propertyId: number; data: AddOtherExpense }>({
            query: ({ propertyId, data }) => ({
                url: `/my-properties/${propertyId}/expenses/other`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error, { propertyId }) => [{ type: 'Expenses', id: propertyId }, 'MyProperties'],
        }),
        updateExpense: builder.mutation<void, { expenseId: number; data: AddExpense }>({
            query: ({ expenseId, data }) => ({
                url: `/my-properties/expenses/${expenseId}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { expenseId }) => [
                { type: 'Expense', id: expenseId },
                'Expenses',
                'MyProperties',
            ],
        }),
        updateOtherExpense: builder.mutation<void, { otherExpenseId: number; data: AddOtherExpense }>({
            query: ({ otherExpenseId, data }) => ({
                url: `/my-properties/expenses/other/${otherExpenseId}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { otherExpenseId }) => [
                { type: 'OtherExpense', id: otherExpenseId },
                'Expenses',
                'MyProperties',
            ],
        }),
        deleteExpense: builder.mutation<void, number>({
            query: (expenseId) => ({
                url: `/my-properties/expenses/${expenseId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, expenseId) => [
                { type: 'Expense', id: expenseId },
                'Expenses',
                'MyProperties',
            ],
        }),
        deleteOtherExpense: builder.mutation<void, number>({
            query: (otherExpenseId) => ({
                url: `/my-properties/expenses/other/${otherExpenseId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, otherExpenseId) => [
                { type: 'OtherExpense', id: otherExpenseId },
                'Expenses',
                'MyProperties',
            ],
        }),
    }),
});

export const {
    useGetMyPropertiesQuery,
    useGetExpensesQuery,
    useGetExpenseByIdQuery,
    useGetOtherExpenseByIdQuery,
    useGetMyPropertyMetadataQuery,
    useAddExpenseMutation,
    useAddOtherExpenseMutation,
    useUpdateExpenseMutation,
    useUpdateOtherExpenseMutation,
    useDeleteExpenseMutation,
    useDeleteOtherExpenseMutation,
} = myPropertiesApi;
