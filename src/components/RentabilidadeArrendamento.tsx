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
    valorObras: number;
    outros: number;
    valorMensalRenda: number;
    imi: number;
    condominio: number;
    despesasManutencao: number;
    seguro: number;
    area: number;
    irc: number; // percent, e.g. 21 for 21%
}

const defaultValues: FormValues = {
    valorAquisicao: 240000,
    impostoSelo: 1920,
    imt: 16800,
    custoEscritura: 600,
    custoProjeto: 20000,
    valorObras: 280000,
    outros: 10000,
    valorMensalRenda: 2400,
    imi: 100,
    condominio: 0,
    despesasManutencao: 1000,
    seguro: 100,
    area: 140,
    irc: 21,
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

const RentabilidadeArrendamento: React.FC = () => {
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
        values.valorObras +
        values.outros;

    const custosTotaisAnuais = values.imi + values.condominio + values.despesasManutencao + values.seguro;
    const rendaAnualBruta = values.valorMensalRenda * 12;
    const valorPagarImpostosTaxas = rendaAnualBruta * (values.irc / 100);
    const rendaAnualLiquida = rendaAnualBruta - custosTotaisAnuais - valorPagarImpostosTaxas;
    const taxaRentabilidadeBruta = custoImovel > 0 ? rendaAnualBruta / custoImovel : 0;
    const taxaRentabilidadeLiquida = custoImovel > 0 ? rendaAnualLiquida / custoImovel : 0;
    const retornoBruto = taxaRentabilidadeBruta > 0 ? 1 / taxaRentabilidadeBruta : 0;
    const retornoLiquido = taxaRentabilidadeLiquida > 0 ? 1 / taxaRentabilidadeLiquida : 0;
    const precoAquisicaoM2 = values.area > 0 ? custoImovel / values.area : 0;
    const precoRendaM2 = values.area > 0 ? values.valorMensalRenda / values.area : 0;

    return (
        <div className="max-w-2xl mx-auto py-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Cálculo Rentabilidade Arrendamento</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-2">
                            <Label htmlFor="valorAquisicao">Valor aquisição</Label>
                            <Input
                                type="number"
                                id="valorAquisicao"
                                name="valorAquisicao"
                                value={values.valorAquisicao}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="impostoSelo">Imposto selo (0,8%)</Label>
                            <Input
                                type="number"
                                id="impostoSelo"
                                name="impostoSelo"
                                value={values.impostoSelo}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="imt">IMT 7%</Label>
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
                            <Label htmlFor="valorObras">Valor obras</Label>
                            <Input
                                type="number"
                                id="valorObras"
                                name="valorObras"
                                value={values.valorObras}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="outros">Outros</Label>
                            <Input
                                type="number"
                                id="outros"
                                name="outros"
                                value={values.outros}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="valorMensalRenda">Valor mensal de renda</Label>
                            <Input
                                type="number"
                                id="valorMensalRenda"
                                name="valorMensalRenda"
                                value={values.valorMensalRenda}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="imi">IMI</Label>
                            <Input type="number" id="imi" name="imi" value={values.imi} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="condominio">Condomínio</Label>
                            <Input
                                type="number"
                                id="condominio"
                                name="condominio"
                                value={values.condominio}
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
                            <Label htmlFor="area">Área (m²)</Label>
                            <Input type="number" id="area" name="area" value={values.area} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="irc">IRC (%)</Label>
                            <Input type="number" id="irc" name="irc" value={values.irc} onChange={handleChange} />
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
                        </CardContent>
                    </Card>

                    <Card className="mb-4 bg-green-50 border-none shadow-none">
                        <CardContent className="p-4">
                            <SectionTitle>Renda</SectionTitle>
                            <ResultRow
                                label="Valor Mensal de Renda"
                                value={values.valorMensalRenda.toLocaleString('pt-PT', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}
                                icon={<BadgeEuro size={16} className="text-green-700" />}
                            />
                            <ResultRow
                                label="Renda Anual Bruta"
                                value={rendaAnualBruta.toLocaleString('pt-PT', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}
                            />
                            <ResultRow
                                label="Renda Anual Líquida"
                                value={rendaAnualLiquida.toLocaleString('pt-PT', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}
                            />
                            <ResultRow
                                label="Valor a Pagar de Impostos e Taxas"
                                value={valorPagarImpostosTaxas.toLocaleString('pt-PT', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}
                            />
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <HighlightCard color="bg-yellow-100">
                            <span className="flex items-center gap-2 font-bold">
                                <Percent size={20} className="text-yellow-600" />
                                Taxa Rentabilidade Bruta
                            </span>
                            <span className="text-2xl font-bold">{(taxaRentabilidadeBruta * 100).toFixed(2)}%</span>
                        </HighlightCard>
                        <HighlightCard color="bg-yellow-100">
                            <span className="flex items-center gap-2 font-bold">
                                <Percent size={20} className="text-yellow-600" />
                                Taxa Rentabilidade Líquida
                            </span>
                            <span className="text-2xl font-bold">{(taxaRentabilidadeLiquida * 100).toFixed(2)}%</span>
                        </HighlightCard>
                        <HighlightCard color="bg-yellow-200">
                            <span className="flex items-center gap-2 font-bold">
                                <TrendingUp size={20} className="text-yellow-700" />
                                Retorno (em anos) Bruto
                            </span>
                            <span className="text-2xl font-bold">{retornoBruto.toFixed(2)}</span>
                        </HighlightCard>
                        <HighlightCard color="bg-yellow-200">
                            <span className="flex items-center gap-2 font-bold">
                                <TrendingUp size={20} className="text-yellow-700" />
                                Retorno (em anos) Líquido
                            </span>
                            <span className="text-2xl font-bold">{retornoLiquido.toFixed(2)}</span>
                        </HighlightCard>
                    </div>

                    <Card className="bg-muted/50 border-none shadow-none">
                        <CardContent className="p-4">
                            <SectionTitle>Valores por m²</SectionTitle>
                            <ResultRow
                                label="Preço Aquisição /m²"
                                value={precoAquisicaoM2.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}
                            />
                            <ResultRow
                                label="Preço Renda/m²"
                                value={precoRendaM2.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}
                            />
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    );
};

export default RentabilidadeArrendamento;
