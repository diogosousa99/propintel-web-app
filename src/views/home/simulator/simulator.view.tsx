import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import SaleSimulator from '../../../components/sale-simulator.component';
import RentSimulator from '../../../components/rent-simulator.component';
import { TrendingUp, Home } from 'lucide-react';
import { ModuleTitle } from '@components/module-title.component';

export default function SimulatorView() {
    return (
        <div className="flex flex-col p-4 sm:p-6 md:p-8 lg:p-12 bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
            <div className="">
                <ModuleTitle
                    title="Profitability Simulator"
                    subtitle="Calculate the profitability of your real estate investments"
                />
            </div>
            <Tabs defaultValue="sale" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-md mb-2 mt-2">
                    <TabsTrigger value="sale" className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Sale
                    </TabsTrigger>
                    <TabsTrigger value="rental" className="flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        Rental
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="sale">
                    <SaleSimulator />
                </TabsContent>
                <TabsContent value="rental">
                    <RentSimulator />
                </TabsContent>
            </Tabs>
        </div>
    );
}
