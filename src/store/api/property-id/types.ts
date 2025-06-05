export interface CreateProperty {
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

export interface PropertyIdFileUploadResponse {
    files: Array<{
        name: string;
        url: string;
        type: 'pdf' | 'image';
    }>;
}

export interface ProcessDocumentResponse {
    fields: {
        privateGrossArea: number;
        dependentGrossArea: number;
        typology: string;
        fraction: string;
        affectation: string;
        assetValue: number;
    };
    fileUrl: string;
}

export interface UserDocumentsResponse {
    documents: Array<{
        id: number;
        propertyId: number | null;
        name: string;
        url: string;
        type: 'pdf' | 'image';
        createdAt: string;
    }>;
}
