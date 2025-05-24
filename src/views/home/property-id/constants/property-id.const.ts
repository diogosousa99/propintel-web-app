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
};

export const PROPERTY_ID_FORM_SCHEMA = z.object({
    [PROPERTY_ID_FORM_FIELDS.name]: z.string().nonempty('Name is required'),
    [PROPERTY_ID_FORM_FIELDS.localization]: z.string().nonempty('Localization is required'),
    [PROPERTY_ID_FORM_FIELDS.acquisitionValue]: z.string().nonempty('Acquisition Value is required'),
    [PROPERTY_ID_FORM_FIELDS.acquisitionDate]: z.string().nonempty('Acquisition Date is required'),
    [PROPERTY_ID_FORM_FIELDS.typology]: z.string().nonempty('Typology is required'),
    [PROPERTY_ID_FORM_FIELDS.fraction]: z.string().nonempty('Fraction is required'),
    [PROPERTY_ID_FORM_FIELDS.affectation]: z.string().nonempty('Affectation is required'),
    [PROPERTY_ID_FORM_FIELDS.category]: z.string().nonempty('Category is required'),
    [PROPERTY_ID_FORM_FIELDS.privateGrossArea]: z.string().nonempty('Private Gross Area is required'),
    [PROPERTY_ID_FORM_FIELDS.dependentGrossArea]: z.string().nonempty('Dependent Gross Area is required'),
    [PROPERTY_ID_FORM_FIELDS.garden]: z.string().optional(),
    [PROPERTY_ID_FORM_FIELDS.balcony]: z.string().optional(),
    [PROPERTY_ID_FORM_FIELDS.energyCertificate]: z.string().optional(),
    [PROPERTY_ID_FORM_FIELDS.assetValue]: z.string().nonempty('Asset Value is required'),
    [PROPERTY_ID_FORM_FIELDS.state]: z.string().nonempty('State is required'),
});
