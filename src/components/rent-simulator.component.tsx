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
    monthlyRent: string;
    imi: string;
    condominium: string;
    maintenanceExpenses: string;
    insurance: string;
    area: string;
    corporateTax: string; // percent, e.g. 21 for 21%
}

const defaultValues: FormValues = {
    acquisitionValue: '',
    stampDuty: '',
    imt: '',
    notaryCost: '',
    projectCost: '',
    constructionCost: '',
    otherFees: '',
    monthlyRent: '',
    imi: '',
    condominium: '',
    maintenanceExpenses: '',
    insurance: '',
    area: '',
    corporateTax: '',
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

const RentSimulator: React.FC = () => {
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
        (parseFloat(values.condominium) || 0) +
        (parseFloat(values.maintenanceExpenses) || 0) +
        (parseFloat(values.insurance) || 0);
    const annualGrossRent = (parseFloat(values.monthlyRent) || 0) * 12;
    const taxesToPay = annualGrossRent * ((parseFloat(values.corporateTax) || 0) / 100);
    const annualNetRent = annualGrossRent - totalAnnualCosts - taxesToPay;
    const grossRentabilityRate = propertyCost > 0 ? annualGrossRent / propertyCost : 0;
    const netRentabilityRate = propertyCost > 0 ? annualNetRent / propertyCost : 0;
    const grossReturn = grossRentabilityRate > 0 ? 1 / grossRentabilityRate : 0;
    const netReturn = netRentabilityRate > 0 ? 1 / netRentabilityRate : 0;
    const acquisitionPricePerM2 =
        (parseFloat(values.area) || 0) > 0 ? propertyCost / (parseFloat(values.area) || 0) : 0;
    const rentPricePerM2 =
        (parseFloat(values.area) || 0) > 0 ? (parseFloat(values.monthlyRent) || 0) / (parseFloat(values.area) || 0) : 0;

    // Função para exportar para PDF
    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Rental Profitability Simulation', 14, 16);
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
                ['Monthly Rent', values.monthlyRent],
                ['IMI', values.imi],
                ['Condominium', values.condominium],
                ['Maintenance Expenses', values.maintenanceExpenses],
                ['Insurance', values.insurance],
                ['Area', values.area],
                ['Corporate Tax (%)', values.corporateTax],
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
                ['Annual Gross Rent', annualGrossRent.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })],
                ['Taxes to Pay', taxesToPay.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })],
                ['Annual Net Rent', annualNetRent.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })],
                ['Gross Yield (%)', (grossRentabilityRate * 100).toFixed(2) + '%'],
                ['Net Yield (%)', (netRentabilityRate * 100).toFixed(2) + '%'],
                ['Gross Return (years)', grossReturn.toFixed(1)],
                ['Net Return (years)', netReturn.toFixed(1)],
                [
                    'Acquisition Price/sqm',
                    acquisitionPricePerM2.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }),
                ],
                ['Rent Price/sqm', rentPricePerM2.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })],
            ],
            theme: 'striped',
            margin: { left: 14, right: 14 },
        });
        doc.save('rent-simulation.pdf');
    };

    return (
        <div className="w-full">
            <Card className="bg-card border shadow-sm">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl text-foreground">Rental Profitability Calculator</CardTitle>
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
                                IMT 7%
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
                                Project Cost
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
                                Other Fees
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
                            <Label htmlFor="monthlyRent" className="text-foreground">
                                Monthly Rent
                            </Label>
                            <Input
                                type="number"
                                id="monthlyRent"
                                name="monthlyRent"
                                value={values.monthlyRent}
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
                            <Label htmlFor="condominium" className="text-foreground">
                                Condominium
                            </Label>
                            <Input
                                type="number"
                                id="condominium"
                                name="condominium"
                                value={values.condominium}
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
                            <Label htmlFor="area" className="text-foreground">
                                Area (sqm)
                            </Label>
                            <Input type="number" id="area" name="area" value={values.area} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="corporateTax" className="text-foreground">
                                Corporate Tax (%)
                            </Label>
                            <Input
                                type="number"
                                id="corporateTax"
                                name="corporateTax"
                                value={values.corporateTax}
                                onChange={handleChange}
                            />
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
                            <SectionTitle>Annual Costs</SectionTitle>
                            <ResultRow
                                label="Total Annual Costs"
                                value={totalAnnualCosts.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}
                            />
                            <ResultRow label="Area" value={`${values.area || 0} sqm`} />
                        </CardContent>
                    </Card>

                    <Card className="mb-4 bg-blue-50 dark:bg-blue-900/20 border-none shadow-none">
                        <CardContent className="p-4">
                            <SectionTitle>Rental Income</SectionTitle>
                            <ResultRow
                                label="Monthly Rent"
                                value={(parseFloat(values.monthlyRent) || 0).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}
                                icon={<BadgeEuro size={16} className="text-blue-700 dark:text-blue-400" />}
                            />
                            <ResultRow
                                label="Annual Gross Rent"
                                value={annualGrossRent.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}
                            />
                            <ResultRow
                                label="Taxes to Pay"
                                value={taxesToPay.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}
                            />
                            <HighlightCard color="bg-blue-100 dark:bg-blue-900/20">
                                <span className="font-bold text-foreground">Annual Net Rent</span>
                                <span className="font-bold text-xl text-foreground">
                                    {annualNetRent.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}
                                </span>
                            </HighlightCard>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
                        <HighlightCard color="bg-green-100 dark:bg-green-900/20">
                            <span className="flex items-center gap-2 font-bold text-foreground">
                                <Percent size={20} className="text-green-600 dark:text-green-400" />
                                Gross Yield
                            </span>
                            <span className="text-2xl font-bold text-foreground">
                                {(grossRentabilityRate * 100).toFixed(2)}%
                            </span>
                        </HighlightCard>
                        <HighlightCard color="bg-green-100 dark:bg-green-900/20">
                            <span className="flex items-center gap-2 font-bold text-foreground">
                                <Percent size={20} className="text-green-600 dark:text-green-400" />
                                Net Yield
                            </span>
                            <span className="text-2xl font-bold text-foreground">
                                {(netRentabilityRate * 100).toFixed(2)}%
                            </span>
                        </HighlightCard>
                        <HighlightCard color="bg-purple-100 dark:bg-purple-900/20">
                            <span className="flex items-center gap-2 font-bold text-foreground">
                                <TrendingUp size={20} className="text-purple-600 dark:text-purple-400" />
                                Gross Return
                            </span>
                            <span className="text-2xl font-bold text-foreground">{grossReturn.toFixed(1)} years</span>
                        </HighlightCard>
                        <HighlightCard color="bg-purple-200 dark:bg-purple-900/30">
                            <span className="flex items-center gap-2 font-bold text-foreground">
                                <TrendingUp size={20} className="text-purple-700 dark:text-purple-400" />
                                Net Return
                            </span>
                            <span className="text-2xl font-bold text-foreground">{netReturn.toFixed(1)} years</span>
                        </HighlightCard>
                    </div>

                    <Card className="bg-muted/50 dark:bg-muted/20 border-none shadow-none">
                        <CardContent className="p-4">
                            <SectionTitle>Values per sqm</SectionTitle>
                            <ResultRow
                                label="Acquisition Price/sqm"
                                value={acquisitionPricePerM2.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}
                            />
                            <ResultRow
                                label="Rent Price/sqm"
                                value={rentPricePerM2.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}
                            />
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    );
};

export default RentSimulator;
