import { useState } from 'react';
import { ModuleTitle } from '../../../components/module-title.component';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, ArcElement } from 'chart.js';
import { useBarChart, useComputeMetrics, useDashboardMetadata, useGetDoughnutChartData } from './hooks';
import { subMonths } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { DatePicker } from '../../../components/ui/date-picker';
import { DateRange } from 'react-day-picker';
import { Home, Euro, TrendingUp, BarChart, Percent, BadgeEuro, PieChart, Building2 } from 'lucide-react';

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

export default function Dashboard() {
    const today = new Date();
    const oneMonthAgo = subMonths(today, 1);

    const [selectedRange, setSelectedRange] = useState<{ from: Date; to: Date } | undefined>({
        from: oneMonthAgo,
        to: today,
    });

    function handleRangeChange(range: DateRange | undefined) {
        setSelectedRange(range as { from: Date; to: Date } | undefined);
    }

    const { portfolio } = useDashboardMetadata();

    const [selectedPropertyId, _setSelectedPropertyId] = useState<number | 'all'>('all');

    const {
        totalProperties,
        totalExpenses,
        totalAssetValue,
        totalBookValue,
        averageAcquisitionM2,
        totalAnnualRentalIncome,
        roi,
        portfolioYield,
        averageRentM2,
        rentalPropertiesCount,
        grossRentYield,
        netRentYield,
        grossMargin,
        netMargin,
        profitMargin,
        tradingPropertiesCount,
    } = useComputeMetrics(selectedPropertyId);

    const barChart = useBarChart(selectedPropertyId, selectedRange);

    const doughnutChart = useGetDoughnutChartData(selectedPropertyId);

    // Show rental KPIs if there is at least one rental property
    const showRentalKPIs = rentalPropertiesCount > 0;
    // Show trading KPIs if there is at least one trading property
    const showTradingKPIs = tradingPropertiesCount > 0;

    return (
        <div className="min-h-screen flex flex-col p-12 bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                <ModuleTitle title="Dashboard" subtitle="Global indicators of the portfolio" />
                <Select
                    value={selectedPropertyId.toString()}
                    onValueChange={(value) => _setSelectedPropertyId(value === 'all' ? 'all' : Number(value))}
                >
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Properties</SelectItem>
                        {portfolio.map(({ id, name }) => (
                            <SelectItem key={id} value={id.toString()}>
                                {name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* GENERAL KPIs Section */}
                <div className="col-span-full">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-8 w-1 bg-blue-500 rounded-full"></div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">GENERAL KPIs</h2>
                    </div>
                </div>
                {/* Properties */}
                <Card className="rounded-2xl border bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                    <CardContent className="py-6 flex flex-col items-center justify-center">
                        <span className="mb-2 flex items-center justify-center">
                            <span className="mr-2">
                                <Home className="text-gray-400 w-6 h-6" />
                            </span>
                            <span
                                className="text-sm text-muted-foreground"
                                title="Number of properties in the portfolio"
                            >
                                Properties
                            </span>
                        </span>
                        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {totalProperties}
                        </span>
                    </CardContent>
                </Card>
                {/* Total Expenses */}
                <Card className="rounded-2xl border bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                    <CardContent className="py-6 flex flex-col items-center justify-center">
                        <span className="mb-2 flex items-center justify-center">
                            <span className="mr-2">
                                <PieChart className="text-gray-400 w-6 h-6" />
                            </span>
                            <span className="text-sm text-muted-foreground" title="Sum of all expenses">
                                Total Expenses
                            </span>
                        </span>
                        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {totalExpenses} €
                        </span>
                    </CardContent>
                </Card>
                {/* Total Asset Value */}
                <Card className="rounded-2xl border bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                    <CardContent className="py-6 flex flex-col items-center justify-center">
                        <span className="mb-2 flex items-center justify-center">
                            <span className="mr-2">
                                <Euro className="text-gray-400 w-6 h-6" />
                            </span>
                            <span
                                className="text-sm text-muted-foreground"
                                title="Sum of asset values for all properties"
                            >
                                Total Asset Value
                            </span>
                        </span>
                        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {totalAssetValue.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}
                        </span>
                    </CardContent>
                </Card>
                {/* Total Book Value */}
                <Card className="rounded-2xl border bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                    <CardContent className="py-6 flex flex-col items-center justify-center">
                        <span className="mb-2 flex items-center justify-center">
                            <span className="mr-2">
                                <Euro className="text-gray-400 w-6 h-6" />
                            </span>
                            <span
                                className="text-sm text-muted-foreground"
                                title="Sum of acquisition values for all properties"
                            >
                                Total Book Value
                            </span>
                        </span>
                        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {totalBookValue.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}
                        </span>
                    </CardContent>
                </Card>
                {/* Average €/M2 */}
                <Card className="rounded-2xl border bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                    <CardContent className="py-6 flex flex-col items-center justify-center">
                        <span className="mb-2 flex items-center justify-center">
                            <span className="mr-2">
                                <Building2 className="text-gray-400 w-6 h-6" />
                            </span>
                            <span
                                className="text-sm text-muted-foreground"
                                title="Average acquisition price per square meter"
                            >
                                Average €/M2
                            </span>
                        </span>
                        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {averageAcquisitionM2.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}
                            /m²
                        </span>
                    </CardContent>
                </Card>

                {/* RENTAL OPERATIONS Section */}
                <div className="col-span-full mt-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-8 w-1 bg-green-500 rounded-full"></div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">RENTAL OPERATIONS</h2>
                    </div>
                </div>
                {/* Total Annual Rental Income */}
                <Card className="rounded-2xl border bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                    <CardContent className="py-6 flex flex-col items-center justify-center">
                        <span className="mb-2 flex items-center justify-center">
                            <span className="mr-2">
                                <BadgeEuro className="text-gray-400 w-6 h-6" />
                            </span>
                            <span className="text-sm text-muted-foreground" title="Sum of all annual rental income">
                                Total Annual Rental Income
                            </span>
                        </span>
                        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {showRentalKPIs
                                ? totalAnnualRentalIncome.toLocaleString('en-US', {
                                      style: 'currency',
                                      currency: 'EUR',
                                  })
                                : '-'}
                        </span>
                    </CardContent>
                </Card>
                {/* ROI */}
                <Card className="rounded-2xl border bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                    <CardContent className="py-6 flex flex-col items-center justify-center">
                        <span className="mb-2 flex items-center justify-center">
                            <span className="mr-2">
                                <TrendingUp className="text-gray-400 w-6 h-6" />
                            </span>
                            <span className="text-sm text-muted-foreground" title="Return on investment">
                                ROI
                            </span>
                        </span>
                        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {showRentalKPIs ? `${roi.toLocaleString('en-US', { maximumFractionDigits: 2 })}%` : '-'}
                        </span>
                    </CardContent>
                </Card>
                {/* Portfolio Yield (Renting) */}
                <Card className="rounded-2xl border bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                    <CardContent className="py-6 flex flex-col items-center justify-center">
                        <span className="mb-2 flex items-center justify-center">
                            <span className="mr-2">
                                <Percent className="text-gray-400 w-6 h-6" />
                            </span>
                            <span className="text-sm text-muted-foreground" title="Portfolio yield from renting">
                                Portfolio Yield (Renting)
                            </span>
                        </span>
                        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {showRentalKPIs
                                ? `${portfolioYield.toLocaleString('en-US', { maximumFractionDigits: 2 })}%`
                                : '-'}
                        </span>
                    </CardContent>
                </Card>
                {/* Average €/M2 (Rent) */}
                <Card className="rounded-2xl border bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                    <CardContent className="py-6 flex flex-col items-center justify-center">
                        <span className="mb-2 flex items-center justify-center">
                            <span className="mr-2">
                                <BarChart className="text-gray-400 w-6 h-6" />
                            </span>
                            <span className="text-sm text-muted-foreground" title="Average rent per square meter">
                                Average €/M2 (Rent)
                            </span>
                        </span>
                        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {showRentalKPIs
                                ? `${averageRentM2.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}/m²`
                                : '-'}
                        </span>
                    </CardContent>
                </Card>
                {/* Gross Rent Yield */}
                <Card className="rounded-2xl border bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                    <CardContent className="py-6 flex flex-col items-center justify-center">
                        <span className="mb-2 flex items-center justify-center">
                            <span className="mr-2">
                                <Percent className="text-gray-400 w-6 h-6" />
                            </span>
                            <span className="text-sm text-muted-foreground" title="Gross rent yield">
                                Gross Rent Yield
                            </span>
                        </span>
                        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {showRentalKPIs
                                ? `${grossRentYield.toLocaleString('en-US', { maximumFractionDigits: 2 })}%`
                                : '-'}
                        </span>
                    </CardContent>
                </Card>
                {/* Net Rent Yield */}
                <Card className="rounded-2xl border bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                    <CardContent className="py-6 flex flex-col items-center justify-center">
                        <span className="mb-2 flex items-center justify-center">
                            <span className="mr-2">
                                <Percent className="text-gray-400 w-6 h-6" />
                            </span>
                            <span className="text-sm text-muted-foreground" title="Net rent yield">
                                Net Rent Yield
                            </span>
                        </span>
                        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {showRentalKPIs
                                ? `${netRentYield.toLocaleString('en-US', { maximumFractionDigits: 2 })}%`
                                : '-'}
                        </span>
                    </CardContent>
                </Card>

                {/* TRADING OPERATIONS Section */}
                <div className="col-span-full mt-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-8 w-1 bg-purple-500 rounded-full"></div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">TRADING OPERATIONS</h2>
                    </div>
                </div>
                {/* Gross Margin */}
                <Card className="rounded-2xl border bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                    <CardContent className="py-6 flex flex-col items-center justify-center">
                        <span className="mb-2 flex items-center justify-center">
                            <span className="mr-2">
                                <Euro className="text-gray-400 w-6 h-6" />
                            </span>
                            <span className="text-sm text-muted-foreground" title="Gross margin from trading">
                                Gross Margin
                            </span>
                        </span>
                        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {showTradingKPIs
                                ? grossMargin.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })
                                : '-'}
                        </span>
                    </CardContent>
                </Card>
                {/* Net Margin */}
                <Card className="rounded-2xl border bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                    <CardContent className="py-6 flex flex-col items-center justify-center">
                        <span className="mb-2 flex items-center justify-center">
                            <span className="mr-2">
                                <Euro className="text-gray-400 w-6 h-6" />
                            </span>
                            <span className="text-sm text-muted-foreground" title="Net margin from trading">
                                Net Margin
                            </span>
                        </span>
                        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {showTradingKPIs
                                ? netMargin.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })
                                : '-'}
                        </span>
                    </CardContent>
                </Card>
                {/* Profit Margin */}
                <Card className="rounded-2xl border bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                    <CardContent className="py-6 flex flex-col items-center justify-center">
                        <span className="mb-2 flex items-center justify-center">
                            <span className="mr-2">
                                <Percent className="text-gray-400 w-6 h-6" />
                            </span>
                            <span className="text-sm text-muted-foreground" title="Profit margin percentage">
                                Profit Margin
                            </span>
                        </span>
                        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {showTradingKPIs
                                ? `${profitMargin.toLocaleString('en-US', { maximumFractionDigits: 2 })}%`
                                : '-'}
                        </span>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 mt-12">
                <Card className="rounded-2xl shadow-sm border bg-white dark:bg-gray-900 col-span-1 h-full flex flex-col hover:shadow-md transition-all duration-200">
                    <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <CardTitle className="text-base font-semibold">Monthly Expenses Breakdown</CardTitle>
                        <DatePicker
                            mode="range"
                            range={selectedRange}
                            onRangeSelect={handleRangeChange}
                            className="w-full sm:w-[240px]"
                        />
                    </CardHeader>
                    <CardContent className="flex flex-col h-full">
                        <div className="min-h-[300px] md:min-h-[400px] h-full">
                            <Bar
                                data={barChart}
                                options={{
                                    maintainAspectRatio: false,
                                    responsive: true,
                                    plugins: {
                                        legend: { position: 'top' as const },
                                        title: { display: false },
                                    },
                                    scales: {
                                        x: { stacked: true },
                                        y: { stacked: true },
                                    },
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl shadow-sm border bg-white dark:bg-gray-900 col-span-1 h-full flex flex-col hover:shadow-md transition-all duration-200">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Total Expenses by Category</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col h-full">
                        <div className="min-h-[300px] md:min-h-[400px] h-full">
                            <Doughnut
                                data={doughnutChart}
                                options={{
                                    maintainAspectRatio: false,
                                    responsive: true,
                                    plugins: {
                                        legend: { position: 'bottom' as const },
                                        title: { display: false },
                                        tooltip: {
                                            callbacks: {
                                                label: function (context) {
                                                    const label = context.label || '';
                                                    const value = context.raw as number;
                                                    const total = context.dataset.data.reduce(
                                                        (a: number, b: number) => a + b,
                                                        0,
                                                    );
                                                    const percentage = ((value / total) * 100).toFixed(1);
                                                    return `${label}: ${value.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })} (${percentage}%)`;
                                                },
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
