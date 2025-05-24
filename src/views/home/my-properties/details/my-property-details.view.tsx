import clsx from 'clsx';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppParam } from '@hooks';

export default function MyPropertyDetails() {
    const propertyId = useAppParam('propertyId', (propertyId) => +propertyId);

    const navigate = useNavigate();

    const tabsClassName = (currentPath: string, basePath: string) =>
        clsx('tab', { 'tab-active': currentPath.includes(basePath) });

    return (
        <div className="flex flex-col gap-6 px-12 py-22 h-full">
            <div className="flex gap-4 items-center">
                <h1 className="text-3xl font-bold text-black">Property 1</h1>
                <div role="tablist" className="tabs tabs-border">
                    <a
                        role="tab"
                        className={tabsClassName(location.pathname, '/expenses')}
                        onClick={() => navigate(`/home/my-properties/${propertyId}/expenses`)}
                    >
                        Expenses
                    </a>
                    <a
                        role="tab"
                        className={tabsClassName(location.pathname, '/kpis')}
                        onClick={() => navigate(`/home/my-properties/${propertyId}/kpis`)}
                    >
                        KPIs
                    </a>
                </div>
            </div>
            <Outlet />
        </div>
    );
}
