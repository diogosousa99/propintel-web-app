import { useState } from 'react';
import { useGetUserDocumentsQuery, useUserSessionQuery } from '@store';

export function useMyDocumentsViewModel() {
    const [selectedDocument, _setSelectedDocument] = useState<string | null>(null);
    const [deletingDocument, _setDeletingDocument] = useState<{ id: number; url: string } | null>(null);
    const [isUploadModalOpen, _setIsUploadModalOpen] = useState(false);
    const [selectedFiles, _setSelectedFiles] = useState<File[]>([]);

    const { data: documents, isLoading } = useGetUserDocumentsQuery();
    const { data: sessionData } = useUserSessionQuery();

    const properties = sessionData?.portfolio || [];

    return {
        isLoading,
        documents,
        properties,
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
