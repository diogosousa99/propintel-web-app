import { Login, useLoginMutation } from '@store';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useLoginApiActions() {
    const navigate = useNavigate();

    const [_login, { isLoading: isLoginLoading }] = useLoginMutation();

    const _handleLogin = useCallback((data: Login) => {
        _login(data)
            .unwrap()
            .then(() => navigate('/home'))
            .catch(() => {
                // Remover uso de _showToast nos catchs.
            });
    }, []);

    return {
        isLoginLoading,
        _handleLogin,
    };
}
