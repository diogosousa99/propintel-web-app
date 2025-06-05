import { useState } from 'react';
import { useGetPropertyDocumentsQuery } from '@store';
import { useParams } from 'react-router-dom';

export function usePropertyDocumentsViewModel() {
    const [selectedDocument, _setSelectedDocument] = useState<string | null>(null);
    const [deletingDocument, _setDeletingDocument] = useState<{ id: number; url: string } | null>(null);
    const [isUploadModalOpen, _setIsUploadModalOpen] = useState(false);
    const [selectedFiles, _setSelectedFiles] = useState<File[]>([]);
    const { propertyId } = useParams<{ propertyId: string }>();

    const { data: documents, isLoading } = useGetPropertyDocumentsQuery(propertyId ? parseInt(propertyId) : 0);

    return {
        isLoading,
        documents,
        selectedDocument,
        deletingDocument,
        isUploadModalOpen,
        selectedFiles,
        _setSelectedDocument,
        _setDeletingDocument,
        _setIsUploadModalOpen,
        _setSelectedFiles,
    };
}
