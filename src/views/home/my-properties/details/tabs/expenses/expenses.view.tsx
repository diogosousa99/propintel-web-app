import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { AddExpense } from './components';
import { useExpensesViewModel } from './hooks';

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
                                    <tr key={expense.id}>
                                        <td className="w-1/4">
                                            {expensesCategories?.indexed[expense.categoryId].name}
                                        </td>
                                        <td className="w-1/4">{expense.value}</td>
                                        <td className="w-1/4">{new Date(expense.date).toLocaleDateString()}</td>
                                        <td className="w-1/4">{expense.description}</td>
                                        <td className="w-16">
                                            <button className="btn btn-xs btn-square">
                                                <EllipsisHorizontalIcon />
                                            </button>
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
