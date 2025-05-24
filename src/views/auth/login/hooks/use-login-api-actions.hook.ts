import { useToast } from '@hooks';
import { Login, useLoginMutation } from '@store';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useLoginApiActions() {
    const navigate = useNavigate();

    const { _showToast } = useToast();

    const [_login, { isLoading: isLoginLoading }] = useLoginMutation();

    const _handleLogin = useCallback((data: Login) => {
        _login(data)
            .unwrap()
            .then(() => navigate('/home'))
            .catch((error) =>
                _showToast({
                    message: error.data.message,
                    type: 'error',
                }),
            );
    }, []);

    return {
        isLoginLoading,
        _handleLogin,
    };
}
