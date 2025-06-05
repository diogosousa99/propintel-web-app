export type Portfolio = {
    id: number;
    name: string;
    acquisitionDate: string;
    acquisitionValue: number;
    affectation: string;
    assetValue: number;
    balcony: number;
    category: string;
    createdAt: string;
    dependentGrossArea: number;
    energyCertificate: string;
    fraction: string;
    garden: number;
    localization: string;
    privateGrossArea: number;
    price: number;
    stampDuty: number;
    deedExpenses: number;
    imtPaid: number;
    propertyExpenses: {
        id: number;
        category: {
            id: number;
            name: string;
        };
        value: number;
        date: string;
        description?: string;
    }[];
    otherExpenses: {
        id: number;
        name: string;
        value: number;
        date: string;
        description?: string;
    }[];
    state: string;
    status: boolean;
    typology: string;
    updatedAt: string;
    monthlyIncome?: number;
};

export type UserSession = {
    id: number;
    name: string;
    email: string;
    portfolio: Portfolio[];
};

export type Login = {
    email: string;
    password: string;
};
