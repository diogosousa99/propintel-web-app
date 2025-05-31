import { createApi } from '@reduxjs/toolkit/query/react';
import { baseApi } from '../base-api';
import { CreateProperty, PropertyIdFileUploadResponse, ProcessDocumentResponse, UserDocumentsResponse } from './types';

export const propertyIdApi = createApi({
    reducerPath: 'api/property-id',
    baseQuery: baseApi,
    endpoints: (builder) => ({
        uploadPropertyDocuments: builder.mutation<PropertyIdFileUploadResponse, FormData>({
            query: (body) => ({
                url: '/property-id/upload-documents',
                method: 'POST',
                body,
            }),
        }),
        processDocument: builder.mutation<ProcessDocumentResponse, { fileUrl: string }>({
            query: (body) => ({
                url: '/property-id/process-document',
                method: 'POST',
                body,
            }),
        }),
        createProperty: builder.mutation<void, CreateProperty>({
            query: (body) => ({
                url: '/property-id/create-property',
                method: 'POST',
                body,
            }),
        }),
        getUserDocuments: builder.query<UserDocumentsResponse, void>({
            query: () => ({
                url: '/property-id/documents',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useUploadPropertyDocumentsMutation,
    useCreatePropertyMutation,
    useProcessDocumentMutation,
    useGetUserDocumentsQuery,
} = propertyIdApi;
