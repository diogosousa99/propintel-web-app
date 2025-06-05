import { z } from 'zod';
import { PropertyIdForm } from '../types';

export const PROPERTY_ID_FORM_FIELDS: { [key in keyof PropertyIdForm]: keyof PropertyIdForm } = {
    name: 'name',
    localization: 'localization',
    acquisitionValue: 'acquisitionValue',
    acquisitionDate: 'acquisitionDate',
    typology: 'typology',
    fraction: 'fraction',
    affectation: 'affectation',
    category: 'category',
    privateGrossArea: 'privateGrossArea',
    dependentGrossArea: 'dependentGrossArea',
    garden: 'garden',
    balcony: 'balcony',
    energyCertificate: 'energyCertificate',
    assetValue: 'assetValue',
    state: 'state',
    monthlyIncome: 'monthlyIncome',
    taxId: 'taxId',
    landRegistryArticle: 'landRegistryArticle',
    price: 'price',
    stampDuty: 'stampDuty',
    deedExpenses: 'deedExpenses',
    imtPaid: 'imtPaid',
};

export const PROPERTY_ID_FORM_SCHEMA = z.object({
    [PROPERTY_ID_FORM_FIELDS.name]: z.string().nonempty('Name is required'),
    [PROPERTY_ID_FORM_FIELDS.localization]: z.string().nonempty('Localization is required'),
    [PROPERTY_ID_FORM_FIELDS.acquisitionValue]: z
        .string()
        .nonempty('Acquisition Value is required')
        .refine(
            (val) => !isNaN(Number(val)) && Number(val) >= 0,
            'Acquisition Value must be greater than or equal to 0',
        ),
    [PROPERTY_ID_FORM_FIELDS.acquisitionDate]: z.string().nonempty('Acquisition Date is required'),
    [PROPERTY_ID_FORM_FIELDS.typology]: z.string().nonempty('Typology is required'),
    [PROPERTY_ID_FORM_FIELDS.fraction]: z.string().nonempty('Fraction is required'),
    [PROPERTY_ID_FORM_FIELDS.affectation]: z.string().nonempty('Affectation is required'),
    [PROPERTY_ID_FORM_FIELDS.category]: z.string().nonempty('Category is required'),
    [PROPERTY_ID_FORM_FIELDS.privateGrossArea]: z
        .string()
        .nonempty('Private Gross Area is required')
        .refine(
            (val) => !isNaN(Number(val)) && Number(val) >= 0,
            'Private Gross Area must be greater than or equal to 0',
        ),
    [PROPERTY_ID_FORM_FIELDS.dependentGrossArea]: z
        .string()
        .nonempty('Dependent Gross Area is required')
        .refine(
            (val) => !isNaN(Number(val)) && Number(val) >= 0,
            'Dependent Gross Area must be greater than or equal to 0',
        ),
    [PROPERTY_ID_FORM_FIELDS.garden]: z
        .string()
        .optional()
        .refine(
            (val) => !val || (!isNaN(Number(val)) && Number(val) >= 0),
            'Garden must be greater than or equal to 0',
        ),
    [PROPERTY_ID_FORM_FIELDS.balcony]: z
        .string()
        .optional()
        .refine(
            (val) => !val || (!isNaN(Number(val)) && Number(val) >= 0),
            'Balcony must be greater than or equal to 0',
        ),
    [PROPERTY_ID_FORM_FIELDS.energyCertificate]: z.string().optional(),
    [PROPERTY_ID_FORM_FIELDS.assetValue]: z
        .string()
        .nonempty('Asset Value is required')
        .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Asset Value must be greater than or equal to 0'),
    [PROPERTY_ID_FORM_FIELDS.state]: z.string().nonempty('State is required'),
    [PROPERTY_ID_FORM_FIELDS.monthlyIncome]: z
        .string()
        .optional()
        .refine((val) => {
            const category = z.object({ category: z.string() }).parse({ category: val });
            if (category.category === 'Arrendamento') {
                return val && !isNaN(Number(val)) && Number(val) >= 0;
            }
            return true;
        }, 'Monthly Income must be greater than or equal to 0'),
    [PROPERTY_ID_FORM_FIELDS.taxId]: z.string().nonempty('Tax ID is required'),
    [PROPERTY_ID_FORM_FIELDS.landRegistryArticle]: z.string().nonempty('Land Registry Article is required'),
    [PROPERTY_ID_FORM_FIELDS.price]: z
        .string()
        .nonempty('Price is required')
        .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Price must be greater than or equal to 0'),
    [PROPERTY_ID_FORM_FIELDS.stampDuty]: z
        .string()
        .nonempty('Stamp Duty is required')
        .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Stamp Duty must be greater than or equal to 0'),
    [PROPERTY_ID_FORM_FIELDS.deedExpenses]: z
        .string()
        .nonempty('Deed Expenses is required')
        .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Deed Expenses must be greater than or equal to 0'),
    [PROPERTY_ID_FORM_FIELDS.imtPaid]: z
        .string()
        .nonempty('IMT Paid is required')
        .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'IMT Paid must be greater than or equal to 0'),
});
