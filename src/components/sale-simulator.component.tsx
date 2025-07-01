import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { TrendingUp, Percent, BadgeEuro } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface FormValues {
    acquisitionValue: string;
    stampDuty: string;
    imt: string;
    notaryCost: string;
    projectCost: string;
    constructionCost: string;
    otherFees: string;
    imi: string;
    insurance: string;
    maintenanceExpenses: string;
    saleValue: string;
    saleCommission: string;
    area: string;
}

const defaultValues: FormValues = {
    acquisitionValue: '',
    stampDuty: '',
    imt: '',
    notaryCost: '',
    projectCost: '',
    constructionCost: '',
    otherFees: '',
    imi: '',
    insurance: '',
    maintenanceExpenses: '',
    saleValue: '',
    saleCommission: '',
    area: '',
};

const ResultRow = ({
    label,
    value,
    highlight = false,
    icon,
}: {
    label: string;
    value: string;
    highlight?: boolean;
    icon?: React.ReactNode;
}) => (
    <div className={`flex items-center justify-between py-2 px-2 ${highlight ? 'font-bold text-lg' : ''}`}>
        <span className="flex items-center gap-2 text-foreground">
            {icon}
            {label}
        </span>
        <span className="text-foreground">{value}</span>
    </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2 mt-4 flex items-center gap-2">
        <Separator className="flex-1" />
        <span className="px-2 whitespace-nowrap">{children}</span>
        <Separator className="flex-1" />
    </div>
);

const HighlightCard = ({ children, color }: { children: React.ReactNode; color: string }) => (
    <div className={`rounded-lg p-4 mb-2 ${color} flex items-center justify-between gap-2`}>{children}</div>
);

const SaleSimulator: React.FC = () => {
    const [values, setValues] = useState<FormValues>(defaultValues);

    // Handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    // Cálculos
    const propertyCost =
        (parseFloat(values.acquisitionValue) || 0) +
        (parseFloat(values.stampDuty) || 0) +
        (parseFloat(values.imt) || 0) +
        (parseFloat(values.notaryCost) || 0) +
        (parseFloat(values.projectCost) || 0) +
        (parseFloat(values.constructionCost) || 0) +
        (parseFloat(values.otherFees) || 0);

    const totalAnnualCosts =
        (parseFloat(values.imi) || 0) +
        (parseFloat(values.insurance) || 0) +
        (parseFloat(values.maintenanceExpenses) || 0);
    const total = propertyCost + totalAnnualCosts;
    const opportunityCost = total * 1.05;

    const saleValueWithCommission = (parseFloat(values.saleValue) || 0) - (parseFloat(values.saleCommission) || 0);
    const grossProfit = saleValueWithCommission - total;
    const corporateTax = grossProfit * 0.21;
    const netProfit = grossProfit - corporateTax;

    const netMargin = (parseFloat(values.saleValue) || 0) > 0 ? netProfit / (parseFloat(values.saleValue) || 0) : 0;
    const grossMargin = (parseFloat(values.saleValue) || 0) > 0 ? grossProfit / (parseFloat(values.saleValue) || 0) : 0;
    const roi = total > 0 ? netProfit / total : 0;

    const pricePerM2Sale =
        (parseFloat(values.area) || 0) > 0 ? (parseFloat(values.saleValue) || 0) / (parseFloat(values.area) || 0) : 0;
    const costPerM2Purchase = (parseFloat(values.area) || 0) > 0 ? total / (parseFloat(values.area) || 0) : 0;

    // Função para exportar para PDF
    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Sale Profitability Simulation', 14, 16);
        doc.setFontSize(12);
        // Inputs
        autoTable(doc, {
            startY: 24,
            head: [['Input', 'Value']],
            body: [
                ['Acquisition Value', values.acquisitionValue],
                ['Stamp Duty', values.stampDuty],
                ['IMT', values.imt],
                ['Notary Cost', values.notaryCost],
                ['Project Cost', values.projectCost],
                ['Construction Cost', values.constructionCost],
                ['Other Fees', values.otherFees],
                ['IMI', values.imi],
                ['Insurance', values.insurance],
                ['Maintenance Expenses', values.maintenanceExpenses],
                ['Sale Value', values.saleValue],
                ['Sale Commission', values.saleCommission],
                ['Area', values.area],
            ],
            theme: 'striped',
            margin: { left: 14, right: 14 },
        });
        // Results
        const lastY = (doc as any).lastAutoTable?.finalY ? (doc as any).lastAutoTable.finalY + 8 : 60;
        autoTable(doc, {
            startY: lastY,
            head: [['Result', 'Value']],
            body: [
                ['Total Property Cost', propertyCost.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })],
                [
                    'Total Annual Costs',
                    totalAnnualCosts.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }),
                ],
                ['Total', total.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })],
                [
                    'Opportunity Cost (5%)',
                    opportunityCost.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }),
                ],
                [
                    'Sale Value with Commission',
                    saleValueWithCommission.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }),
                ],
                ['Gross Profit', grossProfit.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })],
                ['Corporate Tax 21%', corporateTax.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })],
                ['Net Profit', netProfit.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })],
                ['Net Margin (%)', (netMargin * 100).toFixed(2) + '%'],
                ['Gross Margin (%)', (grossMargin * 100).toFixed(2) + '%'],
                ['ROI (%)', (roi * 100).toFixed(2) + '%'],
                ['Sale Price/sqm', pricePerM2Sale.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })],
                [
                    'Purchase Cost/sqm',
                    costPerM2Purchase.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }),
                ],
            ],
            theme: 'striped',
            margin: { left: 14, right: 14 },
        });
        doc.save('sale-simulation.pdf');
    };

    return (
        <div className="w-full">
            <Card className="bg-card border shadow-sm">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl text-foreground">Sale Profitability Calculator</CardTitle>
                        <button
                            type="button"
                            onClick={handleExportPDF}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            Export PDF
                        </button>
                    </div>
                </CardHeader>
                <CardContent>
                    <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        <div className="space-y-2">
                            <Label htmlFor="acquisitionValue" className="text-foreground">
                                Acquisition Value
                            </Label>
                            <Input
                                type="number"
                                id="acquisitionValue"
                                name="acquisitionValue"
                                value={values.acquisitionValue}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="stampDuty" className="text-foreground">
                                Stamp Duty
                            </Label>
                            <Input
                                type="number"
                                id="stampDuty"
                                name="stampDuty"
                                value={values.stampDuty}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="imt" className="text-foreground">
                                IMT
                            </Label>
                            <Input type="number" id="imt" name="imt" value={values.imt} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="notaryCost" className="text-foreground">
                                Notary Cost
                            </Label>
                            <Input
                                type="number"
                                id="notaryCost"
                                name="notaryCost"
                                value={values.notaryCost}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="projectCost" className="text-foreground">
                                Project/Architecture/Execution Cost
                            </Label>
                            <Input
                                type="number"
                                id="projectCost"
                                name="projectCost"
                                value={values.projectCost}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="constructionCost" className="text-foreground">
                                Construction Cost
                            </Label>
                            <Input
                                type="number"
                                id="constructionCost"
                                name="constructionCost"
                                value={values.constructionCost}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="otherFees" className="text-foreground">
                                Other Fees/Cleaning
                            </Label>
                            <Input
                                type="number"
                                id="otherFees"
                                name="otherFees"
                                value={values.otherFees}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="imi" className="text-foreground">
                                IMI
                            </Label>
                            <Input type="number" id="imi" name="imi" value={values.imi} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="insurance" className="text-foreground">
                                Insurance
                            </Label>
                            <Input
                                type="number"
                                id="insurance"
                                name="insurance"
                                value={values.insurance}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="maintenanceExpenses" className="text-foreground">
                                Maintenance Expenses
                            </Label>
                            <Input
                                type="number"
                                id="maintenanceExpenses"
                                name="maintenanceExpenses"
                                value={values.maintenanceExpenses}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="saleValue" className="text-foreground">
                                Sale Value
                            </Label>
                            <Input
                                type="number"
                                id="saleValue"
                                name="saleValue"
                                value={values.saleValue}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="saleCommission" className="text-foreground">
                                Sale Commission
                            </Label>
                            <Input
                                type="number"
                                id="saleCommission"
                                name="saleCommission"
                                value={values.saleCommission}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="area" className="text-foreground">
                                Area (sqm)
                            </Label>
                            <Input type="number" id="area" name="area" value={values.area} onChange={handleChange} />
                        </div>
                    </form>

                    {/* Results */}
                    <Card className="mb-4 bg-muted/50 dark:bg-muted/20 border-none shadow-none">
                        <CardContent className="p-4">
                            <SectionTitle>Total Property Cost</SectionTitle>
                            <ResultRow
                                label="Total"
                                value={propertyCost.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}
                            />
                            <SectionTitle>Total Annual Property Costs</SectionTitle>
                            <ResultRow
                                label="Total"
                                value={totalAnnualCosts.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}
                            />
                            <HighlightCard color="bg-orange-100 dark:bg-orange-900/20">
                                <span className="font-bold text-foreground">TOTAL</span>
                                <span className="font-bold text-xl text-foreground">
                                    {total.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}
                                </span>
                            </HighlightCard>
                            <ResultRow
                                label="Opportunity Cost (5%)"
                                value={opportunityCost.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}
                            />
                            <ResultRow label="Area" value={`${values.area || 0} sqm`} />
                        </CardContent>
                    </Card>

                    <Card className="mb-4 bg-green-50 dark:bg-green-900/20 border-none shadow-none">
                        <CardContent className="p-4">
                            <SectionTitle>Sale</SectionTitle>
                            <ResultRow
                                label="Sale Value"
                                value={(parseFloat(values.saleValue) || 0).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}
                                icon={<BadgeEuro size={16} className="text-green-700 dark:text-green-400" />}
                            />
                            <ResultRow
                                label="Sale Commission"
                                value={(parseFloat(values.saleCommission) || 0).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}
                            />
                            <ResultRow
                                label="Sale Value with Commission"
                                value={saleValueWithCommission.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}
                            />
                            <ResultRow
                                label="Gross Profit"
                                value={grossProfit.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}
                            />
                            <ResultRow
                                label="Corporate Tax 21%"
                                value={corporateTax.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}
                            />
                            <HighlightCard color="bg-green-100 dark:bg-green-900/20">
                                <span className="font-bold text-foreground">Net Profit</span>
                                <span className="font-bold text-xl text-foreground">
                                    {netProfit.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}
                                </span>
                            </HighlightCard>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-4">
                        <HighlightCard color="bg-yellow-100 dark:bg-yellow-900/20">
                            <span className="flex items-center gap-2 font-bold text-foreground">
                                <Percent size={20} className="text-yellow-600 dark:text-yellow-400" />
                                Net Margin
                            </span>
                            <span className="text-2xl font-bold text-foreground">{(netMargin * 100).toFixed(0)}%</span>
                        </HighlightCard>
                        <HighlightCard color="bg-yellow-100 dark:bg-yellow-900/20">
                            <span className="flex items-center gap-2 font-bold text-foreground">
                                <Percent size={20} className="text-yellow-600 dark:text-yellow-400" />
                                Gross Margin
                            </span>
                            <span className="text-2xl font-bold text-foreground">
                                {(grossMargin * 100).toFixed(0)}%
                            </span>
                        </HighlightCard>
                        <HighlightCard color="bg-yellow-200 dark:bg-yellow-900/30">
                            <span className="flex items-center gap-2 font-bold text-foreground">
                                <TrendingUp size={20} className="text-yellow-700 dark:text-yellow-400" />
                                ROI
                            </span>
                            <span className="text-2xl font-bold text-foreground">{(roi * 100).toFixed(0)}%</span>
                        </HighlightCard>
                    </div>

                    <Card className="bg-muted/50 dark:bg-muted/20 border-none shadow-none">
                        <CardContent className="p-4">
                            <SectionTitle>Values per sqm</SectionTitle>
                            <ResultRow
                                label="Sale Price/sqm"
                                value={pricePerM2Sale.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}
                            />
                            <ResultRow
                                label="Purchase Cost/sqm"
                                value={costPerM2Purchase.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}
                            />
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    );
};

export default SaleSimulator;
