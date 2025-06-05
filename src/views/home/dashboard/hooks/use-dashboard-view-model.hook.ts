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
            const propertyExpenses = property.propertyExpenses.reduce((sum, e) => sum + e.value, 0);
            const otherExpenses = property.otherExpenses.reduce((sum, e) => sum + e.value, 0);
            return acc + propertyExpenses + otherExpenses;
        }, 0);
    }, [filtered]);

    const totalAssetValue = useMemo(() => {
        return filtered.reduce((acc, property) => acc + (property.assetValue || 0), 0);
    }, [filtered]);

    const totalBookValue = useMemo(() => {
        return filtered.reduce((acc, property) => acc + (property.acquisitionValue || 0), 0);
    }, [filtered]);

    const averageAcquisitionM2 = useMemo(() => {
        const valid = filtered.filter(
            (property) =>
                (property.privateGrossArea || 0) + (property.dependentGrossArea || 0) > 0 &&
                property.acquisitionValue > 0,
        );
        if (valid.length === 0) return 0;
        const sum = valid.reduce((acc, property) => {
            const area = (property.privateGrossArea || 0) + (property.dependentGrossArea || 0);
            return acc + property.acquisitionValue / area;
        }, 0);
        return sum / valid.length;
    }, [filtered]);

    // For rental KPIs, filter only rental properties if 'all' is selected
    const rentalFiltered = useMemo(() => {
        if (selectedPropertyId === 'all') {
            return portfolio.filter((p) => p.category === 'Arrendamento');
        } else {
            return filtered[0]?.category === 'Arrendamento' ? filtered : [];
        }
    }, [selectedPropertyId, portfolio, filtered]);

    // Rental KPIs
    const totalAnnualRentalIncome = useMemo(() => {
        return rentalFiltered.reduce((acc, property) => acc + (property.monthlyIncome || 0) * 12, 0);
    }, [rentalFiltered]);

    const roi = useMemo(() => {
        const rentalExpenses = rentalFiltered.reduce((acc, property) => {
            const propertyExpenses = property.propertyExpenses.reduce((sum, e) => sum + e.value, 0);
            const otherExpenses = property.otherExpenses.reduce((sum, e) => sum + e.value, 0);
            return acc + propertyExpenses + otherExpenses;
        }, 0);
        if (rentalExpenses === 0) return 0;
        return ((totalAnnualRentalIncome - rentalExpenses) / rentalExpenses) * 100;
    }, [totalAnnualRentalIncome, rentalFiltered]);

    const totalInvestment = useMemo(() => {
        return rentalFiltered.reduce((acc, property) => acc + (property.acquisitionValue || 0), 0);
    }, [rentalFiltered]);

    const portfolioYield = useMemo(() => {
        if (totalInvestment === 0) return 0;
        return (totalAnnualRentalIncome / totalInvestment) * 100;
    }, [totalAnnualRentalIncome, totalInvestment]);

    const averageRentM2 = useMemo(() => {
        const valid = rentalFiltered.filter(
            (property) =>
                (property.privateGrossArea || 0) + (property.dependentGrossArea || 0) > 0 &&
                (property.monthlyIncome || 0) > 0,
        );
        if (valid.length === 0) return 0;
        const sum = valid.reduce((acc, property) => {
            const area = (property.privateGrossArea || 0) + (property.dependentGrossArea || 0);
            return acc + (property.monthlyIncome || 0) / area;
        }, 0);
        return sum / valid.length;
    }, [rentalFiltered]);

    // New KPIs
    const grossRentYield = useMemo(() => {
        if (totalInvestment === 0) return 0;
        return (totalAnnualRentalIncome / totalInvestment) * 100;
    }, [totalAnnualRentalIncome, totalInvestment]);

    const netRentYield = useMemo(() => {
        const totalRentalExpenses = rentalFiltered.reduce((acc, property) => {
            const propertyExpenses = property.propertyExpenses.reduce((sum, e) => sum + e.value, 0);
            const otherExpenses = property.otherExpenses.reduce((sum, e) => sum + e.value, 0);
            return acc + propertyExpenses + otherExpenses;
        }, 0);
        if (totalInvestment === 0) return 0;
        return ((totalAnnualRentalIncome - totalRentalExpenses) / totalInvestment) * 100;
    }, [totalAnnualRentalIncome, totalInvestment, rentalFiltered]);

    // Trading KPIs (only for properties with category 'Venda')
    const tradingFiltered = useMemo(() => {
        if (selectedPropertyId === 'all') {
            return portfolio.filter((p) => p.category === 'Trading');
        } else {
            return filtered[0]?.category === 'Trading' ? filtered : [];
        }
    }, [selectedPropertyId, portfolio, filtered]);

    const grossMargin = useMemo(() => {
        return tradingFiltered.reduce((acc, property) => {
            const sellingPrice = property.price || 0;
            const totalExpenses =
                property.propertyExpenses.reduce((sum, e) => sum + e.value, 0) +
                property.otherExpenses.reduce((sum, e) => sum + e.value, 0);
            return acc + (sellingPrice - totalExpenses);
        }, 0);
    }, [tradingFiltered]);

    const netMargin = useMemo(() => {
        return tradingFiltered.reduce((acc, property) => {
            const sellingPrice = property.price || 0;
            const totalExpenses =
                property.propertyExpenses.reduce((sum, e) => sum + e.value, 0) +
                property.otherExpenses.reduce((sum, e) => sum + e.value, 0);
            const grossProfit = sellingPrice - totalExpenses;
            const tax = grossProfit * 0.21; // Assuming 21% tax rate
            return acc + (grossProfit - tax);
        }, 0);
    }, [tradingFiltered]);

    const profitMargin = useMemo(() => {
        const totalSellingPrice = tradingFiltered.reduce((acc, property) => acc + (property.price || 0), 0);
        if (totalSellingPrice === 0) return 0;
        return (netMargin / totalSellingPrice) * 100;
    }, [netMargin, tradingFiltered]);

    return {
        totalProperties,
        totalExpenses,
        totalAssetValue,
        totalBookValue,
        averageAcquisitionM2,
        totalAnnualRentalIncome,
        roi,
        portfolioYield,
        averageRentM2,
        rentalPropertiesCount: rentalFiltered.length,
        grossRentYield,
        netRentYield,
        grossMargin,
        netMargin,
        profitMargin,
        tradingPropertiesCount: tradingFiltered.length,
    };
}

export function useBarChart(selectedPropertyId: number | 'all', selectedRange?: DateRange) {
    const portfolio = useSessionPortfolio();

    const expenses = useMemo(() => {
        const selected =
            selectedPropertyId === 'all'
                ? portfolio.flatMap((p) => [
                      ...p.propertyExpenses.map((e) => ({ ...e, categoryName: e.category.name })),
                      ...p.otherExpenses.map((e) => ({ ...e, categoryName: e.name })),
                  ])
                : portfolio.find((p) => p.id === selectedPropertyId)
                  ? [
                        ...(portfolio
                            .find((p) => p.id === selectedPropertyId)
                            ?.propertyExpenses.map((e) => ({ ...e, categoryName: e.category.name })) || []),
                        ...(portfolio
                            .find((p) => p.id === selectedPropertyId)
                            ?.otherExpenses.map((e) => ({ ...e, categoryName: e.name })) || []),
                    ]
                  : [];

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
            const category = expense.categoryName;
            if (!out[date]) out[date] = {};
            if (!out[date][category]) out[date][category] = 0;
            out[date][category] += expense.value;
        });

        return out;
    }, [expenses]);

    const allDates = useMemo(() => Object.keys(grouped).sort(), [grouped]);
    const allCategories = useMemo(() => {
        return Array.from(new Set(expenses.map((e) => e.categoryName)));
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
            ? portfolio.flatMap((p) => [
                  ...p.propertyExpenses.map((e) => ({ ...e, categoryName: e.category.name })),
                  ...p.otherExpenses.map((e) => ({ ...e, categoryName: e.name })),
              ])
            : portfolio.find((p) => p.id === selectedPropertyId)
              ? [
                    ...(portfolio
                        .find((p) => p.id === selectedPropertyId)
                        ?.propertyExpenses.map((e) => ({ ...e, categoryName: e.category.name })) || []),
                    ...(portfolio
                        .find((p) => p.id === selectedPropertyId)
                        ?.otherExpenses.map((e) => ({ ...e, categoryName: e.name })) || []),
                ]
              : [];
    }, [portfolio, selectedPropertyId]);

    const totals = useMemo(() => {
        const record: Record<string, number> = {};
        expenses.forEach((e) => {
            const category = e.categoryName;
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
