export type PropertyIdForm = {
    name: string;
    localization: string;
    acquisitionValue: number;
    acquisitionDate: string;
    typology: string;
    fraction: string;
    affectation: string;
    category: string;
    privateGrossArea: number;
    dependentGrossArea: number;
    garden: number;
    balcony: number;
    energyCertificate: string;
    assetValue: number;
    state: string;
    monthlyIncome: number;
    taxId: string;
    landRegistryArticle: string;
    price: number;
    stampDuty: number;
    deedExpenses: number;
    imtPaid: number;
};

export type ProcessedDocumentFields = {
    privateGrossArea: string;
    dependentGrossArea: string;
    typology: string;
    fraction: string;
    affectation: string;
    assetValue: string;
};

export type ProcessStatus = 'idle' | 'processing' | 'success';
