import { useDeleteDocumentMutation, useUploadPropertyDocumentsMutation } from '@store';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';

export function usePropertyDocumentsApiActions() {
    const [_delete, { isLoading: isDeletingDocument }] = useDeleteDocumentMutation();
    const [_uploadPropertyDocuments, { isLoading: isUploadFilesLoading }] = useUploadPropertyDocumentsMutation();
    const { propertyId } = useParams();
    const _handleDeleteDocument = useCallback((id: number, url: string) => {
        _delete({ id, url })
            .unwrap()
            .then(() => toast.success('Document deleted successfully'))
            .catch(() => toast.error('Failed to delete document'));
    }, []);

    const _handleUploadFiles = useCallback((files: File[]) => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });

        _uploadPropertyDocuments({ formData, propertyId: Number(propertyId) })
            .unwrap()
            .then(() => toast.success('Files uploaded successfully'))
            .catch(() => toast.error('Failed to upload files'));
    }, []);

    return {
        isDeletingDocument,
        isUploadFilesLoading,
        _handleDeleteDocument,
        _handleUploadFiles,
    };
}
