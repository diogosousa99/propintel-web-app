import { useState } from 'react';
import { useExpensesApiActions, useExpensesViewModel } from '../hooks';
import { EXPENSES_FORM_FIELDS } from '../constants';
import { Controller, useWatch } from 'react-hook-form';
import { PlusIcon } from '@heroicons/react/24/outline';
import { ExpensesCategoriesEnum } from '@store';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@components/ui/dialog';
import { Textarea } from '@components/ui/textarea';
import { DatePicker } from '@components/ui/date-picker';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';

export function AddExpense() {
    const [open, setOpen] = useState(false);

    const { propertyId, expensesCategories, expensesForm } = useExpensesViewModel();

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = expensesForm;

    const { isLoading: isAddExpenseLoading, _handleAddExpense } = useExpensesApiActions();

    const selectedCategoryId = useWatch({
        control,
        name: EXPENSES_FORM_FIELDS.category,
    });

    const handleOpenChange = (val: boolean) => {
        setOpen(val);
        if (!val) {
            reset();
        }
    };

    const isOtherCosts = selectedCategoryId === String(ExpensesCategoriesEnum.OtherCosts);

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="default" className="w-40">
                    <PlusIcon height={18} />
                    Add Expense
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Add Expense</DialogTitle>
                </DialogHeader>
                <Form {...expensesForm}>
                    <form
                        className="flex flex-col gap-4 items-end w-full"
                        onSubmit={handleSubmit((data) => {
                            _handleAddExpense(propertyId, data);
                            setOpen(false);
                        })}
                    >
                        <FormField
                            control={control}
                            name={EXPENSES_FORM_FIELDS.category}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-black">Category*</FormLabel>
                                    <Select
                                        value={field.value ? String(field.value) : ''}
                                        onValueChange={field.onChange}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {expensesCategories?.categories.map((category) => (
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
                                control={control}
                                name={EXPENSES_FORM_FIELDS.name!}
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
                            control={control}
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
                            control={control}
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
                            control={control}
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
                            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="default" disabled={isAddExpenseLoading}>
                                {isAddExpenseLoading ? (
                                    <span className="animate-spin mr-2 h-4 w-4 rounded-full border-2 border-primary border-t-transparent" />
                                ) : (
                                    <PlusIcon height={18} />
                                )}
                                Add
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
