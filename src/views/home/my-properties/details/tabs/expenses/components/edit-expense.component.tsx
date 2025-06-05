import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@components/ui/dialog';
import { Button } from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExpensesForm } from '../types';
import { EXPENSES_FORM_SCHEMA, EXPENSES_FORM_FIELDS } from '../constants/expenses.const';
import { useEditExpense } from '../hooks/use-edit-expense.hook';
import { ExpensesCategoriesEnum } from '@store';
import { useEffect } from 'react';
import { Input } from '@components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import { Textarea } from '@components/ui/textarea';
import { DatePicker } from '@components/ui/date-picker';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { useWatch } from 'react-hook-form';

interface EditExpenseProps {
    expenseId: number;
    onEdit: (data: ExpensesForm) => void;
    categories: { id: number; name: string }[];
    isOtherExpense?: boolean;
    onClose: () => void;
}

export const EditExpense = ({ expenseId, onEdit, categories, isOtherExpense, onClose }: EditExpenseProps) => {
    const { expense, isLoading, openDialog, closeDialog, isOpen, getInitialFormData } = useEditExpense(
        expenseId,
        !!isOtherExpense,
    );

    useEffect(() => {
        if (expenseId) {
            openDialog();
        }
    }, [expenseId, openDialog]);

    const form = useForm<ExpensesForm>({
        resolver: zodResolver(EXPENSES_FORM_SCHEMA),
        defaultValues: {
            category: '',
            value: '',
            date: '',
            description: '',
        },
    });

    const selectedCategoryId = useWatch({
        control: form.control,
        name: EXPENSES_FORM_FIELDS.category,
    });

    useEffect(() => {
        if (!isLoading && expense) {
            const initialData = getInitialFormData();
            if (initialData) {
                form.reset(initialData);
            }
        }
    }, [expense, isLoading, form, getInitialFormData]);

    const onSubmit = (data: ExpensesForm) => {
        onEdit(data);
        closeDialog();
    };

    const handleClose = () => {
        closeDialog();
        form.reset();
        onClose();
    };

    if (isLoading) {
        return (
            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent>
                    <div className="flex items-center justify-center p-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    const isOtherCosts = selectedCategoryId === String(ExpensesCategoriesEnum.OtherCosts);

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Expense</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 items-end w-full">
                        <FormField
                            control={form.control}
                            name={EXPENSES_FORM_FIELDS.category}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-black">Category*</FormLabel>
                                    <Select
                                        value={field.value ? String(field.value) : ''}
                                        onValueChange={field.onChange}
                                        disabled={isOtherExpense}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={String(category.id)}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {isOtherCosts && (
                            <FormField
                                control={form.control}
                                name={EXPENSES_FORM_FIELDS.name}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="text-black">Name*</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <FormField
                            control={form.control}
                            name={EXPENSES_FORM_FIELDS.value}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-black">Value (€)*</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Value (€)"
                                            {...field}
                                            onChange={(e) => {
                                                let inputValue = e.target.value.replace(',', '.');
                                                if (!/^[0-9]*\.?[0-9]*$/.test(inputValue)) return;
                                                const parts = inputValue.split('.');
                                                if (parts[1]?.length > 2) {
                                                    inputValue = `${parts[0]}.${parts[1].slice(0, 2)}`;
                                                }
                                                field.onChange(inputValue);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={EXPENSES_FORM_FIELDS.date}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-black">Date*</FormLabel>
                                    <FormControl>
                                        <DatePicker
                                            date={field.value ? new Date(field.value) : undefined}
                                            onSelect={(date) => field.onChange(date?.toISOString())}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={EXPENSES_FORM_FIELDS.description}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-black">Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Description" className="max-h-52" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="flex items-center gap-2 w-full justify-end mt-2">
                            <Button type="button" variant="ghost" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="default">
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
