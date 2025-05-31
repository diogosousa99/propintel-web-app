import { useSessionPortfolio } from '@store';
import { format, isAfter, isBefore, parseISO } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { CHART_COLORS } from '../constants';
import { useMemo } from 'react';

export function useComputeMetrics(selectedPropertyId: number | 'all') {
    const portfolio = useSessionPortfolio();

    const filtered = selectedPropertyId === 'all' ? portfolio : portfolio.filter((p) => p.id === selectedPropertyId);

    const totalProperties = filtered.length;

    const totalExpenses = useMemo(() => {
        return filtered.reduce((acc, property) => {
            return acc + property.propertyExpenses.reduce((sum, e) => sum + e.value, 0);
        }, 0);
    }, [filtered]);

    return {
        totalProperties,
        totalExpenses,
    };
}

export function useBarChart(selectedPropertyId: number | 'all', selectedRange?: DateRange) {
    const portfolio = useSessionPortfolio();

    const expenses = useMemo(() => {
        const selected =
            selectedPropertyId === 'all'
                ? portfolio.flatMap((p) => p.propertyExpenses)
                : portfolio.find((p) => p.id === selectedPropertyId)?.propertyExpenses || [];

        return selectedRange?.from && selectedRange?.to
            ? selected.filter((expense) => {
                  const date = parseISO(expense.date);
                  return !isBefore(date, selectedRange.from!) && !isAfter(date, selectedRange.to!);
              })
            : selected;
    }, [portfolio, selectedRange, selectedPropertyId]);

    const grouped = useMemo(() => {
        const out: Record<string, Record<string, number>> = {};

        expenses.forEach((expense) => {
            const date = format(parseISO(expense.date), 'yyyy-MM-dd');
            const category = expense.category.name;
            if (!out[date]) out[date] = {};
            if (!out[date][category]) out[date][category] = 0;
            out[date][category] += expense.value;
        });

        return out;
    }, [expenses]);

    const allDates = useMemo(() => Object.keys(grouped).sort(), [grouped]);
    const allCategories = useMemo(() => {
        return Array.from(new Set(expenses.map((e) => e.category.name)));
    }, [expenses]);

    const datasets = useMemo(
        () =>
            allCategories.map((category, i) => ({
                label: category,
                data: allDates.map((date) => grouped[date]?.[category] || 0),
                backgroundColor: CHART_COLORS[i % CHART_COLORS.length],
                stack: 'expenses',
            })),
        [allCategories, allDates, grouped],
    );

    return {
        labels: allDates,
        datasets,
    };
}

export function useGetDoughnutChartData(selectedPropertyId: number | 'all') {
    const portfolio = useSessionPortfolio();

    const expenses = useMemo(() => {
        return selectedPropertyId === 'all'
            ? portfolio.flatMap((p) => p.propertyExpenses)
            : portfolio.find((p) => p.id === selectedPropertyId)?.propertyExpenses || [];
    }, [portfolio, selectedPropertyId]);

    const totals = useMemo(() => {
        const record: Record<string, number> = {};
        expenses.forEach((e) => {
            const category = e.category.name;
            if (!record[category]) record[category] = 0;
            record[category] += e.value;
        });
        return record;
    }, [expenses]);

    const labels = useMemo(() => Object.keys(totals), [totals]);
    const values = useMemo(() => Object.values(totals), [totals]);

    return {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: labels.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
            },
        ],
    };
}

export function useDashboardMetadata() {
    const portfolio = useSessionPortfolio();

    return useMemo(() => {
        return {
            portfolio,
        };
    }, [portfolio]);
}
