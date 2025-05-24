import clsx from 'clsx';
import { FieldErrors, FieldValues } from 'react-hook-form';

export function inputClassName<T extends FieldValues>(field: keyof T, errors: FieldErrors<T>) {
    return clsx('input w-full', {
        'input-error': errors[field],
    });
}
