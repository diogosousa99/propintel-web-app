import { useMemo } from 'react';
import { useUserSessionQuery } from '../auth.api';
import { Portfolio } from '../types';

export function useSessionUser() {
    const { data } = useUserSessionQuery();

    return useMemo(() => {
        return {
            id: data?.id || '',
            name: data?.name || '',
            email: data?.email || '',
        };
    }, [data]);
}

export function useSessionPortfolio() {
    const { data } = useUserSessionQuery();

    return useMemo(() => {
        return data?.portfolio || [];
    }, [data?.portfolio]);
}

export function useIndexedPortfolio() {
    const { data } = useUserSessionQuery();

    return useMemo(() => {
        return data?.portfolio.reduce(
            (acc, curr) => {
                acc[curr.id] = curr;
                return acc;
            },
            {} as { [key: number]: Portfolio },
        );
    }, [data?.portfolio]);
}
