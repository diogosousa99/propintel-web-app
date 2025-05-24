import { useApiDataTable } from '@hooks';
import { useGetMyPropertiesQuery } from '@store';

export function useMyPropertiesViewModel() {
    const { pagination, search, sorting } = useApiDataTable();

    const { data, isLoading, isFetching } = useGetMyPropertiesQuery({
        page: pagination.page,
        pageRows: pagination.rows,
        search: search.search,
        orderBy: sorting.sort.sortString,
    });

    return {
        isLoading: isLoading || isFetching,
        data,
        pagination,
        search,
        sorting,
    };
}
