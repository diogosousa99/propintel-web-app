import {
    ExpensesCategoriesEnum,
    useAddExpenseMutation,
    useAddOtherExpenseMutation,
    useUpdateExpenseMutation,
    useUpdateOtherExpenseMutation,
    useDeleteExpenseMutation,
    useDeleteOtherExpenseMutation,
} from '@store';
import { useCallback } from 'react';
import { ExpensesForm } from '../types';

export function useExpensesApiActions() {
    const [_addExpense, { isLoading: isAddExpenseLoading }] = useAddExpenseMutation();
    const [_addOtherExpense, { isLoading: isAddOtherExpenseLoading }] = useAddOtherExpenseMutation();
    const [_updateExpense, { isLoading: isUpdateExpenseLoading }] = useUpdateExpenseMutation();
    const [_updateOtherExpense, { isLoading: isUpdateOtherExpenseLoading }] = useUpdateOtherExpenseMutation();
    const [_deleteExpense, { isLoading: isDeleteExpenseLoading }] = useDeleteExpenseMutation();
    const [_deleteOtherExpense, { isLoading: isDeleteOtherExpenseLoading }] = useDeleteOtherExpenseMutation();

    const _handleAddExpense = useCallback((propertyId: number, data: ExpensesForm) => {
        return +data.category === ExpensesCategoriesEnum.OtherCosts
            ? _addOtherExpense({
                  propertyId,
                  data: {
                      name: data.name!,
                      date: data.date,
                      value: +data.value,
                      description: data.description,
                  },
              })
            : _addExpense({
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

    const _handleEditExpense = useCallback((expenseId: number, data: ExpensesForm) => {
        return _updateExpense({
            expenseId,
            data: {
                categoryId: +data.category,
                value: +data.value,
                date: data.date,
                description: data.description,
            },
        })
            .unwrap()
            .then((response) => {
                console.log('Expense updated successfully:', response);
            })
            .catch((error) => {
                console.error('Error updating expense:', error);
            });
    }, []);

    const _handleEditOtherExpense = useCallback((otherExpenseId: number, data: ExpensesForm) => {
        return _updateOtherExpense({
            otherExpenseId,
            data: {
                name: data.name!,
                value: +data.value,
                date: data.date,
                description: data.description,
            },
        })
            .unwrap()
            .then((response) => {
                console.log('Other expense updated successfully:', response);
            })
            .catch((error) => {
                console.error('Error updating other expense:', error);
            });
    }, []);

    const _handleDeleteExpense = useCallback((expenseId: number) => {
        return _deleteExpense(expenseId)
            .unwrap()
            .then(() => {
                console.log('Expense deleted successfully');
            })
            .catch((error) => {
                console.error('Error deleting expense:', error);
            });
    }, []);

    const _handleDeleteOtherExpense = useCallback((otherExpenseId: number) => {
        return _deleteOtherExpense(otherExpenseId)
            .unwrap()
            .then(() => {
                console.log('Other expense deleted successfully');
            })
            .catch((error) => {
                console.error('Error deleting other expense:', error);
            });
    }, []);

    return {
        isLoading:
            isAddExpenseLoading ||
            isAddOtherExpenseLoading ||
            isUpdateExpenseLoading ||
            isUpdateOtherExpenseLoading ||
            isDeleteExpenseLoading ||
            isDeleteOtherExpenseLoading,
        _handleAddExpense,
        _handleEditExpense,
        _handleEditOtherExpense,
        _handleDeleteExpense,
        _handleDeleteOtherExpense,
    };
}
