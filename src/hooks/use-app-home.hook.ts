import { useUserSessionQuery } from '@store';
import { useEffect } from 'react';
import { routes } from '@constants';

export function useAppHome() {
    const { data } = useUserSessionQuery();

    const currentPath = routes.state.location.pathname;

    useEffect(() => {
        if (currentPath === '/home') {
            routes.navigate('/home/property-id');
        }
    }, [data]);
}
