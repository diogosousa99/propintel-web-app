import { BasePagination } from '../../types';

export type MyProperty = {
    id: number;
    name: string;
    category: string;
    localization: string;
    createdAt: string;
};

export type MyPropertyResponse = BasePagination<MyProperty>;

export type PropertyExpenses = {
    id: number;
    propertyId: number;
    categoryId: number;
    value: number;
    date: string;
    description?: string;
};

export type PropertyExpensesParams = {
    propertyId: number;
    categoryId?: number;
};

export type ExpensesCategories = {
    id: number;
    name: string;
    key: string;
    createdAt: string;
    updatedAt: string;
};

export type MyPropertyMetadata = {
    categories: ExpensesCategories[];
};

export type AddExpense = {
    categoryId: number;
    value: number;
    date: string;
    description?: string;
};
