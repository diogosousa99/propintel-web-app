import { HeaderMenu, SidebarMenu } from '@types';
import { Sidebar } from './components/sidebar.component';

type Props = {
    children: React.ReactNode | React.ReactNode[];
    userMenu: HeaderMenu[];
    sidebarMenu: SidebarMenu[];
};

export function BaseAppLayout({ children, userMenu, sidebarMenu }: Props) {
    return (
        <div className="flex h-screen w-full">
            <Sidebar sidebarMenu={sidebarMenu} userMenu={userMenu} />
            <main className="flex-1 ml-16 lg:ml-56">{children}</main>
        </div>
    );
}
