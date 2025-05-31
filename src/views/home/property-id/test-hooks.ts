import { useForm } from 'react-hook-form';
import {
    useUploadPropertyDocumentsMutation,
    useProcessDocumentMutation,
    useGetUserDocumentsQuery,
    useCreatePropertyMutation,
} from '@store';
import { PropertyIdForm } from './types';

export const usePropertyIdViewModel = () => {
    const propertyIdForm = useForm<PropertyIdForm>();

    return {
        propertyIdForm,
    };
};

export const usePropertyIdApiActions = () => {
    const [uploadPropertyDocuments, { isLoading: isUploadFilesLoading }] = useUploadPropertyDocumentsMutation();
    const [processDocument, { isLoading: isProcessingDocument }] = useProcessDocumentMutation();
    const [createProperty, { isLoading: isCreatePropertyLoading }] = useCreatePropertyMutation();
    const { data: userDocuments, isLoading: isLoadingDocuments } = useGetUserDocumentsQuery();

    const handleUploadFiles = async (files: File[], reset: () => void) => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });

        try {
            const result = await uploadPropertyDocuments(formData).unwrap();
            // After successful upload, you might want to process the first document automatically
            if (result.files.length > 0) {
                await handleProcessDocument(result.files[0].url);
            }
            reset();
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    const handleProcessDocument = async (fileUrl: string) => {
        try {
            const result = await processDocument({ fileUrl }).unwrap();
            // Here you can handle the extracted fields
            // For example, you might want to update the form with these values
            return result.fields;
        } catch (error) {
            console.error('Error processing document:', error);
        }
    };

    const handleCreateProperty = async (data: PropertyIdForm) => {
        try {
            await createProperty(data).unwrap();
        } catch (error) {
            console.error('Error creating property:', error);
        }
    };

    return {
        isUploadFilesLoading,
        isProcessingDocument,
        isCreatePropertyLoading,
        isLoadingDocuments,
        userDocuments,
        _handleUploadFiles: handleUploadFiles,
        handleProcessDocument,
        _handleCreateProperty: handleCreateProperty,
    };
};
