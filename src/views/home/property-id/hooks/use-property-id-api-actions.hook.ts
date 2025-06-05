import { useCreatePropertyMutation, useProcessDocumentMutation, useUploadPropertyDocumentsMutation } from '@store';
import { PropertyIdForm } from '../types';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { UseFormReset } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export function usePropertyIdApiActions() {
    const navigate = useNavigate();

    const [_uploadPropertyDocuments, { isLoading: isUploadFilesLoading }] = useUploadPropertyDocumentsMutation();
    const [_processDocument, { isLoading: isProcessingDocument }] = useProcessDocumentMutation();
    const [_createProperty, { isLoading: isCreatePropertyLoading }] = useCreatePropertyMutation();

    const _handleUploadFiles = useCallback((files: File[]) => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });

        _uploadPropertyDocuments({ formData, propertyId: undefined })
            .unwrap()
            .then(() => toast.success('Files uploaded successfully'))
            .catch(() => toast.error('Failed to upload files'));
    }, []);

    const _handleProcessDocument = useCallback(async (fileUrl: string, _uploadForm: UseFormReset<PropertyIdForm>) => {
        _processDocument({ fileUrl })
            .unwrap()
            .then(({ fields }) => {
                toast.success('Document processed successfully');
                _uploadForm(fields);
            })
            .catch(() => toast.error('Failed to process document'));
    }, []);

    const _handleCreateProperty = useCallback((data: PropertyIdForm) => {
        const numericFields = [
            'acquisitionValue',
            'privateGrossArea',
            'dependentGrossArea',
            'garden',
            'balcony',
            'assetValue',
            'monthlyIncome',
            'price',
            'stampDuty',
            'deedExpenses',
            'imtPaid',
        ] as const;

        const processedData = {
            ...data,
            ...numericFields.reduce(
                (acc, field) => {
                    const value = data[field] as string | number | undefined;
                    if (value !== undefined && value !== '') {
                        acc[field] = Number(value);
                    }

                    if (value === '') {
                        acc[field] = null;
                    }
                    return acc;
                },
                {} as { [key: string]: number | null },
            ),
        };

        _createProperty(processedData)
            .unwrap()
            .then(() => {
                toast.success('Property created successfully');
                navigate('/home/my-properties');
            })
            .catch(() => toast.error('Failed to create property'));
    }, []);

    return {
        isUploadFilesLoading,
        isProcessingDocument,
        isCreatePropertyLoading,
        _handleUploadFiles,
        _handleProcessDocument,
        _handleCreateProperty,
    };
}
