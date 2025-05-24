import { useToast } from '@hooks';
import { useCreatePropertyMutation, useUploadPropertyDocumentsMutation } from '@store';
import { PropertyIdForm } from '../types';
import { UseFormReset } from 'react-hook-form';
import { useCallback, useState } from 'react';

export function usePropertyIdApiActions() {
    const { _showToast } = useToast();

    const [filePaths, _setFilePaths] = useState<string[]>([]);

    const [_uploadFiles, { isLoading: isUploadFilesLoading }] = useUploadPropertyDocumentsMutation();

    const _handleUploadFiles = useCallback((files: File[], _updateForm: UseFormReset<PropertyIdForm>) => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });

        _uploadFiles(formData)
            .unwrap()
            .then(({ fields, filePaths }) => {
                _updateForm((data) => ({
                    ...data,
                    ...fields,
                }));
                _setFilePaths((prev) => [...prev, ...filePaths]);
                document.getElementById('my_modal_3')?.closest('dialog')?.close();
                _showToast({
                    message: 'Files uploaded successfully',
                    type: 'success',
                });
            })
            .catch(() => {
                _showToast({
                    message: 'Error uploading files. Please try again.',
                    type: 'error',
                });
            });
    }, []);

    const [_createProperty, { isLoading: isCreatePropertyLoading }] = useCreatePropertyMutation();

    const _handleCreateProperty = useCallback(
        async (body: PropertyIdForm) => {
            await _createProperty({
                ...body,
                acquisitionValue: +body.acquisitionValue,
                garden: +body.garden,
                balcony: +body.balcony,
                acquisitionDate: body.acquisitionDate,
                privateGrossArea: +body.privateGrossArea,
                dependentGrossArea: +body.dependentGrossArea,
                assetValue: +body.assetValue,
            })
                .unwrap()
                .then(() => {
                    document.getElementById('my_modal_3')?.closest('dialog')?.close();
                    _showToast({
                        message: 'Property created successfully',
                        type: 'success',
                    });
                })
                .catch(() => {
                    _showToast({
                        message: 'Error creating property. Please try again.',
                        type: 'error',
                    });
                });
        },
        [filePaths],
    );

    return {
        isUploadFilesLoading,
        isCreatePropertyLoading,
        _handleUploadFiles,
        _handleCreateProperty,
    };
}
