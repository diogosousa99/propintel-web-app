import { Sidebar } from './components';
import { HeaderMenu, SidebarMenu } from '@types';

type Props = {
    children: React.ReactNode | React.ReactNode[];
    headerMenu: HeaderMenu[];
    sidebarMenu: SidebarMenu[];
};

export function BaseAppLayout({ children, headerMenu, sidebarMenu }: Props) {
    return (
        <div className="flex">
            <div className="flex flex-col h-screen w-full">
                <Sidebar sidebarMenu={sidebarMenu} headerMenu={headerMenu}>
                    <main className="flex-1 overflow-auto">{children}</main>
                </Sidebar>
            </div>
        </div>
    );
}
