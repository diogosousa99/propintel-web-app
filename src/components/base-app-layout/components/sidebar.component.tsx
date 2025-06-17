import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import { SidebarMenu } from '@types';
import { Logo } from '@components/logo.component';
import { LogoCompact } from '../../logo-compact.component';
import { HeaderMenu } from '@types';
import { Separator } from '@components/ui/separator';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@components/ui/dropdown-menu';
import { useSessionUser } from '@store';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Button } from '@components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
    sidebarMenu: SidebarMenu[];
    userMenu: HeaderMenu[];
};

function getInitials(name: string) {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();
}

export function Sidebar({ sidebarMenu, userMenu }: Props) {
    const { name, email } = useSessionUser();

    const sidebarItemClassNames = (isActive: boolean, mini = false) =>
        clsx(
            'flex items-center w-full',
            mini ? 'justify-center h-12' : 'gap-1.5 px-4 py-2',
            'transition-all duration-200 ease-in-out rounded-md',
            {
                'bg-white/20': isActive,
                'hover:bg-white/10': !isActive,
            },
        );

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

    const SidebarContent = ({ mini = false }: { mini?: boolean }) => (
        <nav
            className={`fixed top-0 left-0 ${mini ? 'w-20' : 'w-56'} h-screen text-white min-h-full p-4 flex flex-col items-center`}
            style={{ backgroundColor: '#089c77' }}
        >
            <div className="flex justify-center h-16 pb-6 items-center w-full">
                {mini ? <Logo width={32} height={32} /> : <LogoCompact />}
            </div>
            <div className="flex-1 w-full flex flex-col items-center gap-2 mb-6">
                {sidebarMenu.map(({ icon, name, to }) => (
                    <NavLink key={to} to={to} className={`w-full`}>
                        {({ isActive }) => (
                            <div
                                className={clsx(
                                    sidebarItemClassNames(isActive, mini),
                                    'h-12 rounded-md',
                                    mini ? 'w-12' : '',
                                )}
                            >
                                {icon}
                                {!mini && <span className="text-sm">{name}</span>}
                            </div>
                        )}
                    </NavLink>
                ))}
            </div>
            <Separator className="bg-white my-4 w-full" />
            <div className="flex items-center gap-2 w-full justify-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="w-full">
                        <button
                            className={clsx(
                                'flex items-center gap-2 w-full px-3 py-2 rounded-md transition-all hover:bg-white/10 focus:bg-white/20 focus:outline-none',
                                mini && 'justify-center px-0',
                            )}
                        >
                            <div className="w-8 h-8 rounded-full bg-green-800 flex items-center justify-center text-white font-bold text-base">
                                {getInitials(name)}
                            </div>
                            {!mini && (
                                <>
                                    <span className="text-sm font-semibold truncate max-w-[90px]">{name}</span>
                                    <ChevronDownIcon className="w-5 h-5 text-green-100" />
                                </>
                            )}
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        side="right"
                        align="end"
                        sideOffset={32}
                        className="w-56 mt-2 p-0 overflow-hidden"
                    >
                        <div className="px-4 py-3 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center text-white font-bold text-lg">
                                {getInitials(name)}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="font-semibold text-base text-green-900 dark:text-white truncate">
                                    {name}
                                </span>
                                {email && (
                                    <span className="text-xs text-green-900/70 dark:text-green-100/70 truncate">
                                        {email}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="border-t border-green-200 my-1" />
                        <div className="py-1">
                            <DropdownMenuItem
                                onClick={() => setDark((d) => !d)}
                                className="cursor-pointer px-4 py-2 hover:bg-green-700/20 focus:bg-green-700/30 text-green-900 dark:text-white flex items-center gap-2"
                            >
                                {dark ? (
                                    <>
                                        <Sun className="w-4 h-4" />
                                        <span>Toggle Light Mode</span>
                                    </>
                                ) : (
                                    <>
                                        <Moon className="w-4 h-4" />
                                        <span>Toggle Dark Mode</span>
                                    </>
                                )}
                            </DropdownMenuItem>
                            {userMenu.map(({ name, action }) => (
                                <DropdownMenuItem
                                    key={name}
                                    onClick={action}
                                    className="cursor-pointer px-4 py-2 hover:bg-green-700/20 focus:bg-green-700/30 text-green-900 dark:text-white"
                                >
                                    {name}
                                </DropdownMenuItem>
                            ))}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );

    return (
        <>
            <div className="block lg:hidden">
                <SidebarContent mini />
            </div>
            <div className="hidden lg:block">
                <SidebarContent />
            </div>
        </>
    );
}
