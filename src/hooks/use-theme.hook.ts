import { useState, useEffect } from 'react';

export function useTheme() {
    const [dark, setDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return (
                localStorage.getItem('theme') === 'dark' ||
                (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'))
            );
        }
        return false;
    });

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [dark]);

    const toggleTheme = () => setDark((d) => !d);

    return { dark, toggleTheme };
}
