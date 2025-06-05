import { Outlet, useNavigate } from 'react-router-dom';
import { useAppParam } from '@hooks';
import { Tabs, TabsList, TabsTrigger } from '../../../../components/ui/tabs';
import { useIndexedPortfolio } from '@store';

export default function MyPropertyDetails() {
    const propertyId = useAppParam('propertyId', (propertyId) => +propertyId);
    const navigate = useNavigate();
    const indexedPortfolio = useIndexedPortfolio();

    return (
        <div className="flex flex-col gap-6 p-12 h-full">
            <div className="flex gap-4 items-center">
                <h1 className="text-3xl font-bold text-black text-nowrap">{indexedPortfolio?.[propertyId]?.name}</h1>
                <Tabs
                    defaultValue={location.pathname.includes('/expenses') ? 'expenses' : 'documents'}
                    className="w-full"
                    onValueChange={(value) => {
                        navigate(`/home/my-properties/${propertyId}/${value}`);
                    }}
                >
                    <TabsList>
                        <TabsTrigger value="expenses">Expenses</TabsTrigger>
                        <TabsTrigger value="documents">Documents</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <Outlet />
        </div>
    );
}
