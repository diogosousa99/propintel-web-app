import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounce } from './use-debounce.hook';

type ColumnSort = {
    desc: boolean;
    id: string;
};

type SortingState = ColumnSort[];

type TableSortingState = [SortingState, (state: SortingState) => void];

type PaginationState = [
    { page: number; rows: number },
    { _setPage: (page: number) => void; _setRows: (rows: number) => void },
];

function usePagination(): PaginationState {
    const [page, _setPage] = useState<number>(1);

    const [rows, _setRows] = useState<number>(10);

    // when change rows we should reset page to 1
    const _setRowsOverride = useCallback((rows: number) => {
        _setRows(rows);
        _setPage(1);
    }, []);

    return [
        { page, rows },
        { _setPage, _setRows: _setRowsOverride },
    ];
}

function useSorting(): TableSortingState {
    const [sorting, _setSorting] = useState<SortingState>([]);
    const _setSortingOverride = useCallback((state: SortingState) => {
        _setSorting(state);
    }, []);
    return [sorting, _setSortingOverride];
}

export function useApiDataTable() {
    const [search, _setSearch] = useState('');

    const [debounceSearch, _setDebounceSearch] = useState(search);

    const { _debounce } = useDebounce(500);

    useEffect(() => {
        _debounce(() => _setDebounceSearch(search));
    }, [search]);

    const [sorting, _setSorting] = useSorting();

    const [{ page, rows }, { _setPage, _setRows }] = usePagination();

    const sort = useMemo(() => {
        return sorting.reduce(
            (acc, { id, desc }) => {
                acc.sortObject[id] = desc ? 'desc' : 'asc';
                acc.sortString = desc ? `-${id}` : id;
                return acc;
            },
            { sortObject: {} as { [key: string]: 'asc' | 'desc' }, sortString: '' },
        );
    }, [sorting]);

    return {
        sorting: { sorting, _setSorting, sort },
        pagination: { page, rows, _setPage, _setRows },
        search: { search: debounceSearch, _setSearch },
    };
}
