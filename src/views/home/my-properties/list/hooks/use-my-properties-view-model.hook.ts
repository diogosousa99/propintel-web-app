import { useUserSessionQuery } from '@store';
import { useMemo, useState } from 'react';

type SortableFields = 'name' | 'category' | 'localization' | 'affectation';

type SortConfig = {
    id: SortableFields;
    desc: boolean;
};

export function useMyPropertiesViewModel() {
    const { data: sessionData, isLoading, isFetching } = useUserSessionQuery();
    const [sorting, _setSorting] = useState<SortConfig[]>([]);
    const [search, _setSearch] = useState('');

    const properties = useMemo(() => {
        let portfolio = sessionData?.portfolio || [];

        // Apply search filter
        if (search) {
            portfolio = portfolio.filter((property) => property.name.toLowerCase().includes(search.toLowerCase()));
        }

        // Apply sorting
        if (sorting.length === 0) return portfolio;

        return [...portfolio].sort((a, b) => {
            const sort = sorting[0];
            const aValue = a[sort.id];
            const bValue = b[sort.id];

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sort.desc ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
            }

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sort.desc ? bValue - aValue : aValue - bValue;
            }

            return 0;
        });
    }, [sessionData?.portfolio, sorting, search]);

    return {
        isLoading: isLoading || isFetching,
        data: {
            results: properties,
            total: properties.length,
        },
        sorting,
        _setSorting,
        search,
        _setSearch,
    };
}
