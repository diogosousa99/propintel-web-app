import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { AddExpense } from './components';
import { useExpensesViewModel } from './hooks';
import { useExpensesApiActions } from './hooks/use-expenses-api-actions.hook';
import { Button } from '@components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table';
import { PropertyExpenses } from '@store';
import { ExpensesForm } from './types/expenses.type';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@components/ui/dialog';
import { useState } from 'react';
import { EditExpense } from './components/edit-expense.component';

type ExpenseRow =
    | (PropertyExpenses['expenses'][number] & { categoryName?: string; isOtherExpense?: boolean })
    | (PropertyExpenses['otherExpenses'][number] & { categoryName?: string; isOtherExpense?: boolean });

function ManageExpenses({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                    <EllipsisHorizontalIcon className="w-5 h-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" onClick={onDelete}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function MyPropertyExpenses() {
    const { expensesCategories, expenses, categoryId, _setCategoryId } = useExpensesViewModel();
    const { _handleEditExpense, _handleEditOtherExpense, _handleDeleteExpense, _handleDeleteOtherExpense } =
        useExpensesApiActions();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [expenseToDelete, setExpenseToDelete] = useState<ExpenseRow | null>(null);
    const [expenseToEdit, setExpenseToEdit] = useState<ExpenseRow | null>(null);

    const handleEdit = (expense: ExpenseRow) => {
        console.log('handleEdit expense:', expense);
        setExpenseToEdit(expense);
    };

    const handleEditSubmit = (data: ExpensesForm) => {
        if (!expenseToEdit) return;
        if (expenseToEdit.isOtherExpense) {
            _handleEditOtherExpense(expenseToEdit.id, data);
        } else {
            _handleEditExpense(expenseToEdit.id, data);
        }
        setExpenseToEdit(null);
    };

    const handleDelete = (expense: ExpenseRow) => {
        setExpenseToDelete(expense);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (!expenseToDelete) return;
        if (expenseToDelete.isOtherExpense) {
            _handleDeleteOtherExpense(expenseToDelete.id);
        } else {
            _handleDeleteExpense(expenseToDelete.id);
        }
        setDeleteDialogOpen(false);
        setExpenseToDelete(null);
    };

    const cancelDelete = () => {
        setDeleteDialogOpen(false);
        setExpenseToDelete(null);
    };

    const handleCloseEdit = () => {
        setExpenseToEdit(null);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col gap-3 max-w-4xl mx-auto w-full">
                <div className="flex items-center gap-2 justify-end">
                    {categoryId ? (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs underline text-muted-foreground hover:text-foreground transition-colors px-2 py-1 h-auto"
                            onClick={() => _setCategoryId(undefined)}
                        >
                            Clear filter
                        </Button>
                    ) : null}
                    <Select
                        value={categoryId ? String(categoryId) : 'all'}
                        onValueChange={(v) => _setCategoryId(v === 'all' ? undefined : +v)}
                    >
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All categories</SelectItem>
                            {expensesCategories?.categories.map((category) => (
                                <SelectItem key={category.id} value={String(category.id)}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <AddExpense />
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/4">Category</TableHead>
                                <TableHead className="w-1/4">Value</TableHead>
                                <TableHead className="w-1/4">Date</TableHead>
                                <TableHead className="w-1/4">Description</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {expenses.map((expense: ExpenseRow) => (
                                <TableRow key={`${expense.id} ${expense.date}`}>
                                    <TableCell className="font-medium">
                                        <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                                            {expense.categoryName}
                                        </span>
                                    </TableCell>
                                    <TableCell>{expense.value}</TableCell>
                                    <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-muted-foreground">{expense.description}</TableCell>
                                    <TableCell>
                                        <ManageExpenses
                                            onEdit={() => handleEdit(expense)}
                                            onDelete={() => handleDelete(expense)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                    </DialogHeader>
                    <div>Are you sure you want to delete this expense?</div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={cancelDelete}>
                            Cancel
                        </Button>
                        <Button type="button" variant="destructive" onClick={confirmDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {expenseToEdit && (
                <EditExpense
                    expenseId={expenseToEdit.id}
                    onEdit={handleEditSubmit}
                    categories={expensesCategories?.categories || []}
                    isOtherExpense={expenseToEdit.isOtherExpense}
                    onClose={handleCloseEdit}
                />
            )}
        </div>
    );
}
