import { useAppParam } from '@hooks';
import { ExpensesCategories, useGetExpensesQuery, useGetMyPropertyMetadataQuery } from '@store';
import { Resolver, useForm } from 'react-hook-form';
import { ExpensesForm } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { EXPENSES_FORM_SCHEMA } from '../constants';
import { useMemo, useState } from 'react';

function useExpensesForm() {
    return useForm<ExpensesForm>({
        resolver: zodResolver(EXPENSES_FORM_SCHEMA) as unknown as Resolver<ExpensesForm>,
        mode: 'onChange',
    });
}

function useExpensesCategories() {
    const { data: metadata } = useGetMyPropertyMetadataQuery();

    return useMemo(
        () =>
            metadata?.categories.reduce(
                (acc, category) => {
                    acc.indexed[category.id] = category;
                    acc.categories.push(category);
                    return acc;
                },
                {
                    categories: [],
                    indexed: {},
                } as {
                    categories: ExpensesCategories[];
                    indexed: { [key: string]: ExpensesCategories };
                    // add more if needed
                },
            ),
        [metadata],
    );
}

export function useExpensesViewModel() {
    const propertyId = useAppParam('propertyId', (propertyId) => +propertyId);

    const [categoryId, _setCategoryId] = useState<number | undefined>();

    const { data: expenses, isLoading: areExpensesLoading } = useGetExpensesQuery({
        propertyId,
        categoryId,
    });

    const expensesCategories = useExpensesCategories();

    const expensesForm = useExpensesForm();

    return {
        propertyId,
        categoryId,
        isLoading: areExpensesLoading,
        expensesCategories,
        expenses: expenses ?? [],
        expensesForm,
        _setCategoryId,
    };
}
