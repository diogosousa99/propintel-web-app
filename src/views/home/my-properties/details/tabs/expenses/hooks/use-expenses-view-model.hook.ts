import { useAppParam } from '@hooks';
import { ExpensesCategories, PropertyExpenses, useGetExpensesQuery, useGetMyPropertyMetadataQuery } from '@store';
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

type Categories = {
    categories: ExpensesCategories[];
    indexed: { [key: string]: ExpensesCategories };
};

function useExpensesCategories(): Categories | undefined {
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

function useProcessExpenses(expensesList?: PropertyExpenses, expensesCategories?: Categories) {
    const { expenses, otherExpenses } = expensesList ?? {
        expenses: [],
        otherExpenses: [],
    };

    return useMemo(() => {
        return [
            ...expenses.map((expense) => ({
                ...expense,
                categoryName: expensesCategories?.indexed[expense.categoryId]?.name,
                isOtherExpense: false,
            })),
            ...otherExpenses.map((expense) => ({
                ...expense,
                categoryName: expense.name,
                isOtherExpense: true,
            })),
        ];
    }, [expenses, otherExpenses, expensesCategories]);
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

    const processedExpenses = useProcessExpenses(expenses, expensesCategories);

    return {
        propertyId,
        categoryId,
        isLoading: areExpensesLoading,
        expensesCategories,
        expenses: processedExpenses ?? [],
        expensesForm,
        _setCategoryId,
    };
}
