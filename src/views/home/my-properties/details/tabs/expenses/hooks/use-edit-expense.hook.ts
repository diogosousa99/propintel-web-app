import { useGetExpenseByIdQuery, useGetOtherExpenseByIdQuery, Expense, OtherExpense } from '@store';
import { useCallback, useState } from 'react';
import { ExpensesForm } from '../types';
import { ExpensesCategoriesEnum } from '@store';

function isOtherExpenseType(expense: Expense | OtherExpense): expense is OtherExpense {
    return 'name' in expense;
}

export function useEditExpense(expenseId: number, isOtherExpense: boolean) {
    const { data: regularExpense, isLoading: isRegularLoading } = useGetExpenseByIdQuery(expenseId, {
        skip: !expenseId || isOtherExpense,
    });

    const { data: otherExpense, isLoading: isOtherLoading } = useGetOtherExpenseByIdQuery(expenseId, {
        skip: !expenseId || isOtherExpense === false,
    });

    const expense = isOtherExpense ? otherExpense : regularExpense;
    const isLoading = isOtherLoading || isRegularLoading;
    const [isOpen, setIsOpen] = useState(false);

    const openDialog = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeDialog = useCallback(() => {
        setIsOpen(false);
    }, []);

    const getInitialFormData = useCallback((): ExpensesForm | null => {
        if (!expense) return null;

        if (isOtherExpenseType(expense)) {
            return {
                category: String(ExpensesCategoriesEnum.OtherCosts),
                name: expense.name,
                value: String(expense.value),
                date: expense.date,
                description: expense.description || '',
            };
        }

        return {
            category: String(expense.categoryId),
            value: String(expense.value),
            date: expense.date,
            description: expense.description || '',
        };
    }, [expense]);

    return {
        expense,
        isLoading,
        openDialog,
        closeDialog,
        getInitialFormData,
        isOpen,
    };
}
