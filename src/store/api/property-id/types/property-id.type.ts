export type PropertyIdFileUploadResponse = {
    fields: {
        affectation: string;
        fraction: string;
        dependentGrossArea: string;
        privateGrossArea: string;
        assetValue: string;
        typology: string;
    };
    filePaths: Array<string>;
};

export type CreateProperty = {
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
    taxId: string;
    landRegistryArticle: string;
    price: number;
    stampDuty: number;
    deedExpenses: number;
    imtPaid: number;
};

export type ProcessDocumentResponse = {
    fields: {
        privateGrossArea: string;
        dependentGrossArea: string;
        typology: string;
        fraction: string;
        affectation: string;
        assetValue: string;
    };
    fileUrl: string;
};

export type UserDocumentsResponse = {
    documents: Array<{
        name: string;
        url: string;
        type: 'pdf' | 'image';
        createdAt: string;
    }>;
};
