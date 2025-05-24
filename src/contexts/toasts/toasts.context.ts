import { createContext } from 'react';
import { Toast } from './types';

type ToastContextType = {
    _showToast: (toast: Omit<Toast, 'id'>) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
