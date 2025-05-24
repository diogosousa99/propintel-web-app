import { z } from 'zod';
import { ExpensesForm } from '../types';

export const EXPENSES_FORM_FIELDS: { [key in keyof ExpensesForm]: keyof ExpensesForm } = {
    category: 'category',
    value: 'value',
    date: 'date',
    description: 'description',
};

export const EXPENSES_FORM_SCHEMA = z.object({
    [EXPENSES_FORM_FIELDS.category]: z.string().nonempty('Category is required'),
    [EXPENSES_FORM_FIELDS.value]: z.string().nonempty('Value is required'),
    [EXPENSES_FORM_FIELDS.date]: z.string().nonempty('Date is required'),
    [EXPENSES_FORM_FIELDS.description]: z.string().optional(),
});
