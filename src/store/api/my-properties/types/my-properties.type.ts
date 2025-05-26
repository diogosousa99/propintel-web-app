import { BasePagination } from '../../types';

export type MyProperty = {
    id: number;
    name: string;
    category: string;
    localization: string;
    createdAt: string;
};

export type MyPropertyResponse = BasePagination<MyProperty>;

export type Expense = {
    id: number;
    propertyId: number;
    categoryId: number;
    value: number;
    date: string;
    description?: string;
};

export type OtherExpense = {
    id: number;
    propertyId: number;
    name: string;
    value: number;
    date: string;
    description?: string;
};

export type PropertyExpenses = {
    expenses: Expense[];
    otherExpenses: OtherExpense[];
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

export type AddOtherExpense = {
    name: string;
    value: number;
    date: string;
    description?: string;
};
