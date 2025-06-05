import { HeaderMenu, SidebarMenu } from '@types';
import { Sidebar } from './components/sidebar.component';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
    children: React.ReactNode | React.ReactNode[];
    userMenu: HeaderMenu[];
    sidebarMenu: SidebarMenu[];
};

export function BaseAppLayout({ children, userMenu, sidebarMenu }: Props) {
    // Dark mode state and effect
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

    return (
        <div className="flex h-screen w-full">
            {/* Dark mode toggle button */}
            <button
                aria-label="Toggle dark mode"
                className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full p-2 shadow-md hover:scale-110 transition-transform"
                onClick={() => setDark((d) => !d)}
            >
                {dark ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-700" />}
            </button>
            <Sidebar sidebarMenu={sidebarMenu} userMenu={userMenu} />
            <main className="flex-1 ml-16 lg:ml-56">{children}</main>
        </div>
    );
}
