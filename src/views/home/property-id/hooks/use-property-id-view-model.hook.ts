import { Resolver, useForm } from 'react-hook-form';
import { PropertyIdForm } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { PROPERTY_ID_FORM_SCHEMA } from '../constants';
import { useGetUserDocumentsQuery } from '@store';
import { useState } from 'react';

function usePropertyIdForm() {
    return useForm<PropertyIdForm>({
        resolver: zodResolver(PROPERTY_ID_FORM_SCHEMA) as unknown as Resolver<PropertyIdForm>,
        mode: 'onChange',
    });
}

export function usePropertyIdViewModel() {
    const [isUploadModalOpen, _setIsUploadModalOpen] = useState(false);
    const [selectedFiles, _setSelectedFiles] = useState<File[]>([]);

    const propertyIdForm = usePropertyIdForm();

    const { data: userDocuments } = useGetUserDocumentsQuery();

    return {
        isUploadModalOpen,
        propertyIdForm,
        selectedFiles,
        userDocuments,
        _setIsUploadModalOpen,
        _setSelectedFiles,
    };
}
