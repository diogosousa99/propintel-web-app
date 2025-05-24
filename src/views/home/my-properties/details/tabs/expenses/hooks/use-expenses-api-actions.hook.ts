import { useAddExpenseMutation } from '@store';
import { useCallback } from 'react';
import { ExpensesForm } from '../types';

export function useExpensesApiActions() {
    const [_addExpense, { isLoading: isAddExpenseLoading }] = useAddExpenseMutation();

    const _handleAddExpense = useCallback((propertyId: number, data: ExpensesForm) => {
        _addExpense({
            propertyId,
            data: {
                categoryId: +data.category,
                date: data.date,
                value: +data.value,
                description: data.description,
            },
        })
            .unwrap()
            .then((response) => {
                console.log('Expense added successfully:', response);
            })
            .catch((error) => {
                console.error('Error adding expense:', error);
            });
    }, []);

    return {
        isAddExpenseLoading,
        _handleAddExpense,
    };
}
