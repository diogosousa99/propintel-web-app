export interface PropertyIdForm {
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
    garden?: number;
    balcony?: number;
    energyCertificate: string;
    assetValue: number;
    state: string;
}

export interface ProcessedDocumentFields {
    privateGrossArea: string;
    dependentGrossArea: string;
    typology: string;
    fraction: string;
    affectation: string;
    assetValue: string;
}
