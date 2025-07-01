import { useState } from 'react';
import { ModuleTitle } from '../../../components/module-title.component';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, ArcElement } from 'chart.js';
import { useBarChart, useComputeMetrics, useDashboardMetadata, useGetDoughnutChartData } from './hooks';
import { subMonths } from 'date-fns';
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
            <div className="flex flex-col gap-4">
                {/* GENERAL KPIs Section */}
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex-shrink-0">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-5 w-1 bg-blue-500 rounded-full"></div>
                        <h2 className="text-base font-bold text-foreground">GENERAL KPIs</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium flex items-center">
                                <Home className="text-gray-400 w-4 h-4 mr-1" /> Properties
                            </span>
                            <span className="text-sm font-bold text-foreground mt-1">{totalProperties}</span>
                            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                Number of properties in the portfolio
                            </span>
                        </div>
                        <div className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium flex items-center">
                                <PieChart className="text-gray-400 w-4 h-4 mr-1" /> Total Expenses
                            </span>
                            <span className="text-sm font-bold text-foreground mt-1">{totalExpenses} €</span>
                            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">Sum of all expenses</span>
                        </div>
                        <div className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium flex items-center">
                                <Euro className="text-gray-400 w-4 h-4 mr-1" /> Total Asset Value
                            </span>
                            <span className="text-sm font-bold text-foreground mt-1">
                                {totalAssetValue.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                Sum of asset values for all properties
                            </span>
                        </div>
                        <div className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium flex items-center">
                                <Euro className="text-gray-400 w-4 h-4 mr-1" /> Total Book Value
                            </span>
                            <span className="text-sm font-bold text-foreground mt-1">
                                {totalBookValue.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                Sum of acquisition values for all properties
                            </span>
                        </div>
                        <div className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium flex items-center">
                                <Building2 className="text-gray-400 w-4 h-4 mr-1" /> Average €/M2
                            </span>
                            <span className="text-sm font-bold text-foreground mt-1">
                                {averageAcquisitionM2.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}
                                /m²
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                Average acquisition price per square meter
                            </span>
                        </div>
                    </div>
                </div>
                {/* RENTAL OPERATIONS Section */}
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex-shrink-0">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-5 w-1 bg-green-500 rounded-full"></div>
                        <h2 className="text-base font-bold text-foreground">RENTAL OPERATIONS</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium flex items-center">
                                <BadgeEuro className="text-gray-400 w-4 h-4 mr-1" /> Total Annual Rental Income
                            </span>
                            <span className="text-sm font-bold text-foreground mt-1">
                                {showRentalKPIs
                                    ? totalAnnualRentalIncome.toLocaleString('en-US', {
                                          style: 'currency',
                                          currency: 'EUR',
                                      })
                                    : '-'}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                Sum of all annual rental income
                            </span>
                        </div>
                        <div className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium flex items-center">
                                <TrendingUp className="text-gray-400 w-4 h-4 mr-1" /> ROI
                            </span>
                            <span className="text-sm font-bold text-foreground mt-1">
                                {showRentalKPIs ? `${roi.toLocaleString('en-US', { maximumFractionDigits: 2 })}%` : '-'}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">Return on investment</span>
                        </div>
                        <div className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium flex items-center">
                                <Percent className="text-gray-400 w-4 h-4 mr-1" /> Portfolio Yield (Renting)
                            </span>
                            <span className="text-sm font-bold text-foreground mt-1">
                                {showRentalKPIs
                                    ? `${portfolioYield.toLocaleString('en-US', { maximumFractionDigits: 2 })}%`
                                    : '-'}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                Portfolio yield from renting
                            </span>
                        </div>
                        <div className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium flex items-center">
                                <BarChart className="text-gray-400 w-4 h-4 mr-1" /> Average €/M2 (Rent)
                            </span>
                            <span className="text-sm font-bold text-foreground mt-1">
                                {showRentalKPIs
                                    ? `${averageRentM2.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}/m²`
                                    : '-'}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                Average rent per square meter
                            </span>
                        </div>
                        <div className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium flex items-center">
                                <Percent className="text-gray-400 w-4 h-4 mr-1" /> Gross Rent Yield
                            </span>
                            <span className="text-sm font-bold text-foreground mt-1">
                                {showRentalKPIs
                                    ? `${grossRentYield.toLocaleString('en-US', { maximumFractionDigits: 2 })}%`
                                    : '-'}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">Gross rent yield</span>
                        </div>
                        <div className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium flex items-center">
                                <Percent className="text-gray-400 w-4 h-4 mr-1" /> Net Rent Yield
                            </span>
                            <span className="text-sm font-bold text-foreground mt-1">
                                {showRentalKPIs
                                    ? `${netRentYield.toLocaleString('en-US', { maximumFractionDigits: 2 })}%`
                                    : '-'}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">Net rent yield</span>
                        </div>
                    </div>
                </div>
                {/* TRADING OPERATIONS Section */}
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex-shrink-0">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-5 w-1 bg-purple-500 rounded-full"></div>
                        <h2 className="text-base font-bold text-foreground">TRADING OPERATIONS</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium flex items-center">
                                <Euro className="text-gray-400 w-4 h-4 mr-1" /> Gross Margin
                            </span>
                            <span className="text-sm font-bold text-foreground mt-1">
                                {showTradingKPIs
                                    ? grossMargin.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })
                                    : '-'}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                Gross margin from trading
                            </span>
                        </div>
                        <div className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium flex items-center">
                                <Euro className="text-gray-400 w-4 h-4 mr-1" /> Net Margin
                            </span>
                            <span className="text-sm font-bold text-foreground mt-1">
                                {showTradingKPIs
                                    ? netMargin.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })
                                    : '-'}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                Net margin from trading
                            </span>
                        </div>
                        <div className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium flex items-center">
                                <Percent className="text-gray-400 w-4 h-4 mr-1" /> Profit Margin
                            </span>
                            <span className="text-sm font-bold text-foreground mt-1">
                                {showTradingKPIs
                                    ? `${profitMargin.toLocaleString('en-US', { maximumFractionDigits: 2 })}%`
                                    : '-'}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                Profit margin percentage
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 mt-3">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex flex-col h-full">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
                        <span className="text-base font-semibold text-foreground">Monthly Expenses Breakdown</span>
                        <DatePicker
                            mode="range"
                            range={selectedRange}
                            onRangeSelect={handleRangeChange}
                            className="w-full sm:w-[240px]"
                        />
                    </div>
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
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex flex-col h-full">
                    <div className="mb-3">
                        <span className="text-base font-semibold text-foreground">Total Expenses by Category</span>
                    </div>
                    <div className="min-h-[300px] md:min-h-[400px] h-full">
                        <Doughnut
                            data={doughnutChart}
                            options={{
                                maintainAspectRatio: false,
                                responsive: true,
                                plugins: {
                                    legend: { position: 'top' as const },
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
                </div>
            </div>
        </div>
    );
}
