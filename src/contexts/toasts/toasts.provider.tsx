import { useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import { Toast, ToastsProviderProps } from './types';
import { ToastContext } from './toasts.context';

export function ToastProvider({ children }: ToastsProviderProps) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const _removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const _showToast = useCallback((toast: Omit<Toast, 'id'>) => {
        const id = uuid();
        const newToast = { ...toast, id };
        setToasts((prev) => [...prev, newToast]);

        if (toast.duration !== 0) {
            setTimeout(() => _removeToast(id), toast.duration ?? 4000);
        }
    }, []);

    return (
        <ToastContext.Provider value={{ _showToast }}>
            {children}
            <div className="toast toast-end fixed bottom-4 right-4 z-50 space-y-2">
                {toasts.map((toast) => (
                    <div key={toast.id} className={`alert alert-${toast.type ?? 'info'} shadow-lg`}>
                        <div>
                            <span>
                                {toast.title && <strong className="block">{toast.title}</strong>}
                                {toast.message}
                            </span>
                        </div>
                        <button className="btn btn-sm btn-ghost" onClick={() => _removeToast(toast.id)}>
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
