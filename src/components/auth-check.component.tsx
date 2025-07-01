import { JSX, useEffect } from 'react';
import { routes } from '@constants';
import { Cookie } from '@helpers';

// Páginas públicas que não requerem autenticação
const PUBLIC_PAGES = ['/login', '/register'];

export function AuthCheck(): JSX.Element {
    useEffect(() => {
        const authValue = Cookie.getByName(import.meta.env.VITE_COOKIE_CHECK as string);
        const currentPath = routes.state.location.pathname;

        // Se estamos em uma página pública, não fazer redirecionamento
        if (PUBLIC_PAGES.includes(currentPath)) {
            return;
        }

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
