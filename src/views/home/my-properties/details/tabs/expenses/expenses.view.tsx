import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { AddExpense } from './components';
import { useExpensesViewModel } from './hooks';
import { useEffect, useRef, useState } from 'react';

function ManageExpenses() {
    const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef<HTMLUListElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setOpenMenu(false);
            }
        }

        if (openMenu) {
            document.addEventListener('mouseup', handleClickOutside);
        } else {
            document.removeEventListener('mouseup', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        };
    }, [openMenu]);

    return (
        <>
            <button ref={buttonRef} className="btn btn-xs btn-square" onClick={() => setOpenMenu((prev) => !prev)}>
                <EllipsisHorizontalIcon />
            </button>
            {openMenu ? (
                <ul ref={menuRef} className="menu bg-base-200 rounded-box w-56 absolute right-4">
                    <li>
                        <a>Edit</a>
                    </li>
                    <li>
                        <a>Delete</a>
                    </li>
                </ul>
            ) : null}
        </>
    );
}

export default function MyPropertyExpenses() {
    const { expensesCategories, expenses, categoryId, _setCategoryId } = useExpensesViewModel();

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 justify-end">
                    {categoryId ? (
                        <div
                            className="label text-xs cursor-pointer underline"
                            onClick={() => _setCategoryId(undefined)}
                        >
                            Clear filter
                        </div>
                    ) : null}
                    <select className="select" defaultValue="" onChange={(e) => _setCategoryId(+e.target.value)}>
                        <option value="">Filter by category</option>
                        {expensesCategories?.categories.map((category) => (
                            <option key={category.id} value={category.id} selected={categoryId === category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <AddExpense />
                </div>
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                    <table className="table table-fixed">
                        <thead className="sticky top-0 bg-base-100">
                            <tr>
                                <th className="w-1/4 text-left">Category</th>
                                <th className="w-1/4">Value</th>
                                <th className="w-1/4 text-left">Date</th>
                                <th className="w-1/4">Description</th>
                                <th className="w-16"></th>
                            </tr>
                        </thead>
                    </table>
                    <div className="max-h-[300px] overflow-y-auto">
                        <table className="table table-fixed">
                            <tbody>
                                {expenses.map((expense) => (
                                    <tr key={`${expense.id} ${expense.date}`}>
                                        <td className="w-1/4">{expense.categoryName}</td>
                                        <td className="w-1/4">{expense.value}</td>
                                        <td className="w-1/4">{new Date(expense.date).toLocaleDateString()}</td>
                                        <td className="w-1/4">{expense.description}</td>
                                        <td className="w-16">
                                            <ManageExpenses />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
