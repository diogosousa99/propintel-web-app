import { createApi } from '@reduxjs/toolkit/query/react';
import { baseApi } from '../base-api';
import {
    CreateProperty,
    PropertyIdFileUploadResponse,
    ProcessDocumentResponse,
    UserDocumentsResponse,
    ExternalData,
} from './types';

export const propertyIdApi = createApi({
    reducerPath: 'api/property-id',
    baseQuery: baseApi,
    tagTypes: ['Documents'],
    endpoints: (builder) => ({
        uploadPropertyDocuments: builder.mutation<
            PropertyIdFileUploadResponse,
            { formData: FormData; propertyId?: number }
        >({
            query: ({ formData, propertyId }) => {
                if (propertyId) {
                    formData.append('propertyId', propertyId.toString());
                }
                return {
                    url: '/property-id/upload-documents',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['Documents'],
        }),
        processDocument: builder.mutation<ProcessDocumentResponse, { fileUrl: string }>({
            query: (body) => ({
                url: '/property-id/process-document',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Documents'],
        }),
        createProperty: builder.mutation<void, CreateProperty>({
            query: (body) => ({
                url: '/property-id/create-property',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Documents'],
        }),
        getUserDocuments: builder.query<UserDocumentsResponse, void>({
            query: () => ({
                url: '/property-id/documents',
                method: 'GET',
            }),
            providesTags: ['Documents'],
        }),
        deleteDocument: builder.mutation<{ message: string }, { id: number; url: string }>({
            query: ({ id, url }) => ({
                url: `/property-id/documents/${id}`,
                method: 'DELETE',
                body: { url },
            }),
            invalidatesTags: ['Documents'],
        }),
        updateDocumentProperty: builder.mutation<{ message: string }, { id: number; propertyId: number | null }>({
            query: ({ id, propertyId }) => ({
                url: `/property-id/documents/${id}/property`,
                method: 'PATCH',
                body: { propertyId },
            }),
            invalidatesTags: ['Documents'],
        }),
        getPropertyDocuments: builder.query<UserDocumentsResponse, number>({
            query: (propertyId) => ({
                url: `/property-id/documents/property/${propertyId}`,
                method: 'GET',
            }),
            providesTags: ['Documents'],
        }),
        getExternalData: builder.query<ExternalData[], void>({
            query: () => ({
                url: '/external-data',
            }),
        }),
    }),
});

export const {
    useUploadPropertyDocumentsMutation,
    useCreatePropertyMutation,
    useProcessDocumentMutation,
    useGetUserDocumentsQuery,
    useDeleteDocumentMutation,
    useUpdateDocumentPropertyMutation,
    useGetPropertyDocumentsQuery,
    useGetExternalDataQuery,
} = propertyIdApi;
