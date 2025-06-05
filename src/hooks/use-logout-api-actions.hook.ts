import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '@store';
import { useResetAppState } from './use-reset-app-state.hook';

export function useLogoutApiActions() {
    const navigate = useNavigate();

    const [_logout, { isLoading: isLogoutLoading }] = useLogoutMutation();

    const { _resetAppState } = useResetAppState();

    const _handleLogout = useCallback(() => {
        _logout()
            .unwrap()
            .then(() => {
                setTimeout(() => _resetAppState(), 1000);
                navigate('/login');
            })
            .catch((error) => {
                // No need to show toast here as it's removed
            });
    }, []);

    return {
        isLogoutLoading,
        _handleLogout,
    };
}
