import { z } from 'zod';
import { ExpensesForm } from '../types';
import { ExpensesCategoriesEnum } from '@store';

export const EXPENSES_FORM_FIELDS = {
    category: 'category' as const,
    name: 'name' as const,
    value: 'value' as const,
    date: 'date' as const,
    description: 'description' as const,
} as const;

export const EXPENSES_FORM_SCHEMA = z
    .object({
        category: z.string().nonempty('Category is required'),
        name: z.string().optional(),
        value: z.string().nonempty('Value is required'),
        date: z.string().nonempty('Date is required'),
        description: z.string().optional(),
    })
    .refine(
        (data) => {
            if (data.category === String(ExpensesCategoriesEnum.OtherCosts)) {
                return !!data.name;
            }
            return true;
        },
        {
            message: 'Name is required',
            path: ['name'],
        },
    ) satisfies z.ZodType<ExpensesForm>;
