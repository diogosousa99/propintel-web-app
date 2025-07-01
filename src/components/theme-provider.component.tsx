import { useEffect } from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Inicializa o tema baseado no localStorage ou preferência do sistema
        const theme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (theme === 'dark' || (!theme && prefersDark)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    return <>{children}</>;
}
