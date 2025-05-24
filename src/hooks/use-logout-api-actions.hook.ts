import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '@store';
import { useResetAppState } from './use-reset-app-state.hook';
import { useToast } from './use-toast.hook';

export function useLogoutApiActions() {
    const navigate = useNavigate();

    const { _showToast } = useToast();

    const [_logout, { isLoading: isLogoutLoading }] = useLogoutMutation();

    const { _resetAppState } = useResetAppState();

    const _handleLogout = useCallback(() => {
        _logout()
            .unwrap()
            .then(() => {
                setTimeout(() => _resetAppState(), 1000);
                navigate('/login');
                _showToast({
                    message: 'Logout successful',
                    type: 'success',
                });
            })
            .catch((error) => {
                _showToast({
                    message: error.data.message,
                    type: 'error',
                });
            });
    }, []);

    return {
        isLogoutLoading,
        _handleLogout,
    };
}
