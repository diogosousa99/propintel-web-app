import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import { SidebarMenu } from '@types';
import { LogoCompact } from '../../logo-compact.component';

type Props = {
    menu: SidebarMenu[];
};

export function Sidebar({ menu }: Props) {
    const sidebarItemClassNames = (isActive: boolean) => {
        return clsx('flex items-center w-full gap-1.5 px-4 py-2 transition-all duration-200 ease-in-out border-b', {
            'border-white': isActive,
            'border-transparent hover:border-white': !isActive,
        });
    };

    return (
        <nav className="w-3xs bg-primary-content text-white h-screen inv-rad inv-rad-4">
            <div className="flex pt-5 justify-center mb-7">
                <LogoCompact />
            </div>
            {/* <h1 className="flex justify-center mb-10 mt-3.5 text-3xl">PROPINTEL</h1> */}
            {menu.map(({ icon, name, to }) => (
                <NavLink key={to} to={to} className="flex items-center gap-1.5 px-5 py-2 w-full">
                    {({ isActive }) => (
                        <div className={sidebarItemClassNames(isActive)}>
                            {icon}
                            <span className="text-sm">{name}</span>
                        </div>
                    )}
                </NavLink>
            ))}
        </nav>
    );
}
