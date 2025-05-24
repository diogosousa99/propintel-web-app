import { createApi } from '@reduxjs/toolkit/query/react';
import { baseApi } from '../base-api';
import { CreateProperty, PropertyIdFileUploadResponse } from './types';

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
        createProperty: builder.mutation<void, CreateProperty>({
            query: (body) => ({
                url: '/property-id/create-property',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useUploadPropertyDocumentsMutation, useCreatePropertyMutation } = propertyIdApi;
