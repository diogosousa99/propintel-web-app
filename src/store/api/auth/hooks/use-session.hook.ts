import { useMemo } from 'react';
import { useUserSessionQuery } from '../auth.api';

export function useSessionPortfolio() {
    const { data } = useUserSessionQuery();

    return useMemo(() => {
        return data?.portfolio || [];
    }, [data?.portfolio]);
}
