import { Resolver, useForm } from 'react-hook-form';
import { useLoginApiActions } from './use-login-api-actions.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { LOGIN_FORM_SCHEMA } from '../constants';
import { Login } from '@store';

function useLoginForm() {
    return useForm<Login>({ mode: 'onChange', resolver: zodResolver(LOGIN_FORM_SCHEMA) as unknown as Resolver<Login> });
}

export function useLoginViewModel() {
    const loginForm = useLoginForm();

    const { isLoginLoading, _handleLogin } = useLoginApiActions();

    return {
        isLoginLoading,
        loginForm,
        _handleLogin,
    };
}
