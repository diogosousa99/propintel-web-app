import { useMemo } from 'react';
import { BaseAppLayout } from '@components';
import { useAppHome, useLogoutApiActions } from '@hooks';
import { PlusCircleIcon, DocumentIcon, HomeIcon, ChartPieIcon } from '@heroicons/react/24/outline';

type Props = {
    children?: React.ReactNode | React.ReactNode[];
};

export default function Home({ children }: Props) {
    useAppHome();

    const { _handleLogout } = useLogoutApiActions();

    const SIDEBAR_MENU = useMemo(
        () => [
            {
                name: 'Dashboard',
                icon: <ChartPieIcon height={20} />,
                to: '/home/dashboard',
            },
            {
                name: 'Property ID',
                icon: <PlusCircleIcon height={20} />,
                to: '/home/property-id',
            },
            {
                name: 'My Properties',
                icon: <HomeIcon height={20} />,
                to: '/home/my-properties',
            },
            {
                name: 'My Documents',
                icon: <DocumentIcon height={20} />,
                to: '/home/my-documents',
            },
        ],
        [],
    );

    const HEADER_MENU = useMemo(
        () => [
            {
                name: 'Logout',
                action: _handleLogout,
            },
        ],
        [],
    );

    return (
        <BaseAppLayout sidebarMenu={SIDEBAR_MENU} headerMenu={HEADER_MENU}>
            {children}
        </BaseAppLayout>
    );
}
