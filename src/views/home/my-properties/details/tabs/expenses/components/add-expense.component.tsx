import { useState } from 'react';
import { useExpensesApiActions, useExpensesViewModel } from '../hooks';
import { EXPENSES_FORM_FIELDS } from '../constants';
import { inputClassName } from '@helpers';
import { Controller } from 'react-hook-form';
import { DayPicker } from 'react-day-picker';
import { PlusIcon } from '@heroicons/react/24/outline';

export function AddExpense() {
    const [date, _setDate] = useState<Date | undefined>();

    const { propertyId, expensesCategories, expensesForm } = useExpensesViewModel();

    const {
        control,
        register,
        formState: { errors },
        handleSubmit,
    } = expensesForm;

    const { isAddExpenseLoading, _handleAddExpense } = useExpensesApiActions();

    return (
        <div className="flex justify-end">
            <button
                className="btn w-40"
                onClick={() => (document.getElementById('my_modal_2') as HTMLDialogElement)?.showModal()}
            >
                <PlusIcon height={18} />
                Add Expense
            </button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <form
                        className="flex flex-col gap-2 items-end w-full"
                        onSubmit={handleSubmit((data) => _handleAddExpense(propertyId, data))}
                    >
                        <div className="flex flex-col w-full">
                            <legend className="text-xs pl-2">Category*</legend>
                            <select
                                className="select w-full"
                                {...register(EXPENSES_FORM_FIELDS.category)}
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Select a category
                                </option>
                                {expensesCategories?.categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors[EXPENSES_FORM_FIELDS.category] ? (
                                <span className="text-xs text-error">
                                    {errors[EXPENSES_FORM_FIELDS.category]?.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="flex flex-col w-full">
                            <legend className="text-xs pl-2">Value (€)*</legend>
                            <input
                                className={inputClassName(EXPENSES_FORM_FIELDS.value, errors)}
                                placeholder="Value (€)"
                                {...register(EXPENSES_FORM_FIELDS.value)}
                                onChange={(e) => {
                                    let inputValue = e.target.value.replace(',', '.');

                                    if (!/^\d*\.?\d*$/.test(inputValue)) return;

                                    const parts = inputValue.split('.');
                                    if (parts[1]?.length > 2) {
                                        inputValue = `${parts[0]}.${parts[1].slice(0, 2)}`;
                                    }

                                    e.target.value = inputValue;
                                }}
                            />
                            {errors[EXPENSES_FORM_FIELDS.value] ? (
                                <span className="text-xs text-error">
                                    {errors[EXPENSES_FORM_FIELDS.value]?.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="flex flex-col w-full">
                            <legend className="text-xs pl-2">Date*</legend>
                            <button
                                popoverTarget="rdp-popover"
                                type="button"
                                className={inputClassName(EXPENSES_FORM_FIELDS.date, errors)}
                                style={{ anchorName: '--rdp' } as React.CSSProperties}
                            >
                                {date ? date.toLocaleDateString() : 'Date'}
                            </button>
                            <div
                                popover="auto"
                                id="rdp-popover"
                                className="dropdown"
                                style={{ positionAnchor: '--rdp' } as React.CSSProperties}
                            >
                                <Controller
                                    name={EXPENSES_FORM_FIELDS.date}
                                    control={control}
                                    render={({ field: { onChange } }) => (
                                        <DayPicker
                                            className="react-day-picker"
                                            mode="single"
                                            captionLayout="dropdown"
                                            selected={date}
                                            onSelect={(date) => {
                                                _setDate(date);
                                                onChange(date?.toISOString());
                                                const popover = document.getElementById(
                                                    'rdp-popover',
                                                ) as HTMLDivElement;
                                                if (popover) {
                                                    popover.hidePopover();
                                                }
                                            }}
                                        />
                                    )}
                                />
                            </div>
                            {errors[EXPENSES_FORM_FIELDS.date] ? (
                                <span className="text-xs text-error">{errors[EXPENSES_FORM_FIELDS.date]?.message}</span>
                            ) : null}
                        </div>
                        <div className="flex flex-col w-full">
                            <legend className="text-xs pl-2">Description</legend>
                            <textarea
                                className="textarea w-full max-h-52"
                                placeholder="Description"
                                {...register(EXPENSES_FORM_FIELDS.description)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="btn btn-neutral text-white" type="submit">
                                {isAddExpenseLoading ? (
                                    <span className="loading loading-spinner" />
                                ) : (
                                    <PlusIcon height={18} />
                                )}
                                Add
                            </button>
                            <button
                                className="btn btn-ghost"
                                type="button"
                                onClick={() => (document.getElementById('my_modal_2') as HTMLDialogElement)?.close()}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                </div>
            </dialog>
        </div>
    );
}
