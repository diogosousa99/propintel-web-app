import { z } from 'zod';
import { Login } from '@store';

export const LOGIN_FORM_FIELDS: { [key in keyof Login]: keyof Login } = {
    email: 'email',
    password: 'password',
};

export const LOGIN_FORM_SCHEMA = z.object({
    [LOGIN_FORM_FIELDS.email]: z.string().email('Invalid email address').nonempty('Email is required'),
    [LOGIN_FORM_FIELDS.password]: z.string().nonempty('Password is required'),
});
