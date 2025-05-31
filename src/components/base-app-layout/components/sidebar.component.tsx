import { ReactNode, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { SidebarMenu } from '@types';
import { LogoCompact } from '../../logo-compact.component';
import { Header } from './header.component';
import { HeaderMenu } from '@types';
import { Bars3Icon } from '@heroicons/react/24/outline';

type Props = {
    sidebarMenu: SidebarMenu[];
    headerMenu: HeaderMenu[];
    children: ReactNode;
};

export function Sidebar({ sidebarMenu, headerMenu, children }: Props) {
    const drawerRef = useRef<HTMLInputElement>(null);
    const location = useLocation();

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 1024px)');

        const handleResize = () => {
            if (mediaQuery.matches && drawerRef.current?.checked) {
                drawerRef.current.checked = false;
            }
        };

        mediaQuery.addEventListener('change', handleResize);
        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    useEffect(() => {
        if (drawerRef.current?.checked) {
            drawerRef.current.checked = false;
        }
    }, [location.pathname]);

    const sidebarItemClassNames = (isActive: boolean) =>
        clsx('flex items-center w-full gap-1.5 px-4 py-2 transition-all duration-200 ease-in-out border-b', {
            'border-white': isActive,
            'border-transparent hover:border-white': !isActive,
        });

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" ref={drawerRef} />
            <div className="drawer-content flex flex-col min-h-screen">
                <div className="flex items-center justify-between h-16 bg-primary-content text-white px-4">
                    <div className="lg:hidden flex gap-2 items-center">
                        <label htmlFor="my-drawer" className="btn btn-primary btn-ghost btn-square lg:hidden">
                            <Bars3Icon color="white" height={20} />
                        </label>
                    </div>
                    <Header menu={headerMenu} />
                </div>
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay" />
                <nav className="w-56 bg-primary-content text-white min-h-full p-4">
                    <div className="flex justify-center h-16 pb-6 items-center">
                        <LogoCompact />
                    </div>
                    {sidebarMenu.map(({ icon, name, to }) => (
                        <NavLink key={to} to={to} className="flex items-center gap-1.5 px-1 py-2 w-full">
                            {({ isActive }) => (
                                <div className={sidebarItemClassNames(isActive)}>
                                    {icon}
                                    <span className="text-sm">{name}</span>
                                </div>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    );
}
