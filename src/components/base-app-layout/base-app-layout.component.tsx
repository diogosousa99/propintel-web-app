import { Header, Sidebar } from './components';
import { HeaderMenu, SidebarMenu } from '@types';

type Props = {
    children: React.ReactNode | React.ReactNode[];
    headerMenu: HeaderMenu[];
    sidebarMenu: SidebarMenu[];
};

export function BaseAppLayout({ children, headerMenu, sidebarMenu }: Props) {
    return (
        <div className="flex">
            <Sidebar menu={sidebarMenu} />
            <div className="flex flex-col h-screen w-full">
                <Header menu={headerMenu} />
                <main className="flex-1 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
