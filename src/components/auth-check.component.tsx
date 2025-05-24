import { JSX, useEffect } from 'react';
import { routes } from '@constants';
import { Cookie } from '@helpers';

export function AuthCheck(): JSX.Element {
    useEffect(() => {
        const authValue = Cookie.getByName(import.meta.env.VITE_COOKIE_CHECK as string);

        const statePath =
            routes.state.location.state || `${routes.state.location.pathname}${routes.state.location.search}`;

        if (authValue == '1') {
            if (statePath === '/') routes.navigate('/home');
            else routes.navigate(statePath || '/home');
        } else {
            routes.navigate('/login', { state: statePath });
        }
    }, []);

    return <></>;
}
