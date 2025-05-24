import { Resolver, useForm } from 'react-hook-form';
import { PropertyIdForm } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { PROPERTY_ID_FORM_SCHEMA } from '../constants';

function usePropertyIdForm() {
    return useForm<PropertyIdForm>({
        resolver: zodResolver(PROPERTY_ID_FORM_SCHEMA) as unknown as Resolver<PropertyIdForm>,
        mode: 'onChange',
    });
}

export function usePropertyIdViewModel() {
    const propertyIdForm = usePropertyIdForm();

    return { propertyIdForm };
}
