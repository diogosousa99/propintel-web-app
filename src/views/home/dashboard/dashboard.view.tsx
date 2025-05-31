import { useState } from 'react';
import { ModuleTitle } from '@components';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, ArcElement } from 'chart.js';
import { useBarChart, useComputeMetrics, useDashboardMetadata, useGetDoughnutChartData } from './hooks';
import { DateRange, DayPicker } from 'react-day-picker';
import { subMonths } from 'date-fns';

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

export default function Dashboard() {
    const today = new Date();
    const oneMonthAgo = subMonths(today, 1);

    const [selectedRange, _setSelectedRange] = useState<DateRange | undefined>({
        from: oneMonthAgo,
        to: today,
    });

    const { portfolio } = useDashboardMetadata();

    const [selectedPropertyId, _setSelectedPropertyId] = useState<number | 'all'>('all');

    const { totalProperties, totalExpenses } = useComputeMetrics(selectedPropertyId);

    const barChart = useBarChart(selectedPropertyId, selectedRange);

    const doughnutChart = useGetDoughnutChartData(selectedPropertyId);

    return (
        <div className="flex flex-col gap-6 px-12 py-10 h-full">
            <div className="flex">
                <ModuleTitle title="Dashboard" subtitle="Global indicators of the portfolio" />
                <select
                    value={selectedPropertyId}
                    onChange={(e) => _setSelectedPropertyId(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                    className="select"
                >
                    <option value="all">All Properties</option>
                    {portfolio.map(({ id, name }) => (
                        <option key={id} value={id}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body">
                        <h2 className="card-title text-sm p-0">Number of Properties</h2>
                        <p className="text-3xl font-bold">{totalProperties}</p>
                    </div>
                </div>
                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body">
                        <h2 className="card-title text-sm p-0">Total of Expenses</h2>
                        <p className="text-3xl font-bold">{totalExpenses} €</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 h-full">
                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body">
                        <div className="flex justify-between">
                            <h2 className="card-title">Monthly Expenses Breakdown</h2>
                            <div>
                                <button
                                    popoverTarget="rdp-popover"
                                    type="button"
                                    className="input input-border cursor-pointer w-56 flex justify-center"
                                    style={{ anchorName: '--rdp' } as React.CSSProperties}
                                >
                                    <span>
                                        {selectedRange?.from && selectedRange?.to
                                            ? `${selectedRange.from.toLocaleDateString()} - ${selectedRange.to.toLocaleDateString()}`
                                            : 'Select date range'}
                                    </span>
                                </button>
                                <div
                                    popover="auto"
                                    id="rdp-popover"
                                    className="dropdown"
                                    style={{ positionAnchor: '--rdp' } as React.CSSProperties}
                                >
                                    <DayPicker
                                        className="react-day-picker"
                                        mode="range"
                                        captionLayout="dropdown"
                                        selected={selectedRange}
                                        onSelect={_setSelectedRange}
                                        modifiersStyles={{
                                            selected: { color: 'white' },
                                            range_start: { color: 'white' },
                                            range_end: { color: 'white' },
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
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
                </div>
                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body h-full">
                        <h2 className="card-title">Total Expenses by Category</h2>
                        <div className="flex-1">
                            <Doughnut
                                data={doughnutChart}
                                options={{
                                    maintainAspectRatio: false,
                                    responsive: true,
                                    plugins: {
                                        legend: { position: 'bottom' as const },
                                        title: { display: false },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
