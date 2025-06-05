import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { TrendingUp, Percent, BadgeEuro } from 'lucide-react';

interface FormValues {
    valorAquisicao: number;
    impostoSelo: number;
    imt: number;
    custoEscritura: number;
    custoProjeto: number;
    obras: number;
    outrasTaxas: number;
    imi: number;
    seguro: number;
    despesasManutencao: number;
    valorVenda: number;
    comissaoVenda: number;
    areaAbc: number;
}

const defaultValues: FormValues = {
    valorAquisicao: 235000,
    impostoSelo: 1880,
    imt: 16450,
    custoEscritura: 600,
    custoProjeto: 20000,
    obras: 280000,
    outrasTaxas: 10000,
    imi: 400,
    seguro: 400,
    despesasManutencao: 0,
    valorVenda: 750000,
    comissaoVenda: 0,
    areaAbc: 140,
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
        <span className="flex items-center gap-2">
            {icon}
            {label}
        </span>
        <span>{value}</span>
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

const RentabilidadeVenda: React.FC = () => {
    const [values, setValues] = useState<FormValues>(defaultValues);

    // Handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    };

    // Cálculos
    const custoImovel =
        values.valorAquisicao +
        values.impostoSelo +
        values.imt +
        values.custoEscritura +
        values.custoProjeto +
        values.obras +
        values.outrasTaxas;

    const custosTotaisAnuais = values.imi + values.seguro + values.despesasManutencao;
    const total = custoImovel + custosTotaisAnuais;
    const custoOportunidade = total * 1.05;

    const valorVendaComComissao = values.valorVenda - values.comissaoVenda;
    const lucroBrutoVenda = valorVendaComComissao - total;
    const irc = lucroBrutoVenda * 0.21;
    const lucroLiquido = lucroBrutoVenda - irc;

    const margemLiquida = lucroLiquido / values.valorVenda;
    const margemBruta = lucroBrutoVenda / values.valorVenda;
    const roi = lucroLiquido / total;

    const precoM2Venda = values.valorVenda / values.areaAbc;
    const custoM2Compra = total / values.areaAbc;

    return (
        <div className="max-w-2xl mx-auto py-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Cálculo Rentabilidade Venda</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-2">
                            <Label htmlFor="valorAquisicao">Valor aquisição CASA</Label>
                            <Input
                                type="number"
                                id="valorAquisicao"
                                name="valorAquisicao"
                                value={values.valorAquisicao}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="impostoSelo">Imposto selo CASA</Label>
                            <Input
                                type="number"
                                id="impostoSelo"
                                name="impostoSelo"
                                value={values.impostoSelo}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="imt">IMT CASA</Label>
                            <Input type="number" id="imt" name="imt" value={values.imt} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="custoEscritura">Custo escritura</Label>
                            <Input
                                type="number"
                                id="custoEscritura"
                                name="custoEscritura"
                                value={values.custoEscritura}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="custoProjeto">Custo projeto/arq./execução</Label>
                            <Input
                                type="number"
                                id="custoProjeto"
                                name="custoProjeto"
                                value={values.custoProjeto}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="obras">Obras</Label>
                            <Input type="number" id="obras" name="obras" value={values.obras} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="outrasTaxas">Outras taxas/limpezas</Label>
                            <Input
                                type="number"
                                id="outrasTaxas"
                                name="outrasTaxas"
                                value={values.outrasTaxas}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="imi">IMI</Label>
                            <Input type="number" id="imi" name="imi" value={values.imi} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="seguro">Seguro</Label>
                            <Input
                                type="number"
                                id="seguro"
                                name="seguro"
                                value={values.seguro}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="despesasManutencao">Despesas de Manutenção</Label>
                            <Input
                                type="number"
                                id="despesasManutencao"
                                name="despesasManutencao"
                                value={values.despesasManutencao}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="valorVenda">Valor Venda</Label>
                            <Input
                                type="number"
                                id="valorVenda"
                                name="valorVenda"
                                value={values.valorVenda}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="comissaoVenda">Comissão Venda</Label>
                            <Input
                                type="number"
                                id="comissaoVenda"
                                name="comissaoVenda"
                                value={values.comissaoVenda}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="areaAbc">Área ABC (m²)</Label>
                            <Input
                                type="number"
                                id="areaAbc"
                                name="areaAbc"
                                value={values.areaAbc}
                                onChange={handleChange}
                            />
                        </div>
                    </form>

                    {/* Resultados Bonitos */}
                    <Card className="mb-4 bg-muted/50 border-none shadow-none">
                        <CardContent className="p-4">
                            <SectionTitle>Custo do Imóvel</SectionTitle>
                            <ResultRow
                                label="Total"
                                value={custoImovel.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}
                            />
                            <SectionTitle>Custos Totais Anuais Imóvel</SectionTitle>
                            <ResultRow
                                label="Total"
                                value={custosTotaisAnuais.toLocaleString('pt-PT', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}
                            />
                            <HighlightCard color="bg-orange-100">
                                <span className="font-bold">TOTAL</span>
                                <span className="font-bold text-xl">
                                    {total.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}
                                </span>
                            </HighlightCard>
                            <ResultRow
                                label="Custo Oportunidade (5%)"
                                value={custoOportunidade.toLocaleString('pt-PT', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}
                            />
                            <ResultRow label="Área ABC" value={`${values.areaAbc} m²`} />
                        </CardContent>
                    </Card>

                    <Card className="mb-4 bg-green-50 border-none shadow-none">
                        <CardContent className="p-4">
                            <SectionTitle>Venda</SectionTitle>
                            <ResultRow
                                label="Valor Venda"
                                value={values.valorVenda.toLocaleString('pt-PT', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}
                                icon={<BadgeEuro size={16} className="text-green-700" />}
                            />
                            <ResultRow
                                label="Comissão Venda"
                                value={values.comissaoVenda.toLocaleString('pt-PT', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}
                            />
                            <ResultRow
                                label="Valor Venda com Comissão"
                                value={valorVendaComComissao.toLocaleString('pt-PT', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}
                            />
                            <ResultRow
                                label="Lucro Bruto Venda"
                                value={lucroBrutoVenda.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}
                            />
                            <ResultRow
                                label="IRC 21%"
                                value={irc.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}
                            />
                            <HighlightCard color="bg-green-100">
                                <span className="font-bold">Lucro Líquido</span>
                                <span className="font-bold text-xl">
                                    {lucroLiquido.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}
                                </span>
                            </HighlightCard>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <HighlightCard color="bg-yellow-100">
                            <span className="flex items-center gap-2 font-bold">
                                <Percent size={20} className="text-yellow-600" />
                                Margem Líquida
                            </span>
                            <span className="text-2xl font-bold">{(margemLiquida * 100).toFixed(0)}%</span>
                        </HighlightCard>
                        <HighlightCard color="bg-yellow-100">
                            <span className="flex items-center gap-2 font-bold">
                                <Percent size={20} className="text-yellow-600" />
                                Margem Bruta
                            </span>
                            <span className="text-2xl font-bold">{(margemBruta * 100).toFixed(0)}%</span>
                        </HighlightCard>
                        <HighlightCard color="bg-yellow-200">
                            <span className="flex items-center gap-2 font-bold">
                                <TrendingUp size={20} className="text-yellow-700" />
                                ROI
                            </span>
                            <span className="text-2xl font-bold">{(roi * 100).toFixed(0)}%</span>
                        </HighlightCard>
                    </div>

                    <Card className="bg-muted/50 border-none shadow-none">
                        <CardContent className="p-4">
                            <SectionTitle>Valores por m²</SectionTitle>
                            <ResultRow
                                label="Preço/m² Venda"
                                value={precoM2Venda.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}
                            />
                            <ResultRow
                                label="Custo/m² Compra"
                                value={custoM2Compra.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}
                            />
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    );
};

export default RentabilidadeVenda;
