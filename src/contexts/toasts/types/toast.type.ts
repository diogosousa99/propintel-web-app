export type ToastType = 'info' | 'success' | 'warning' | 'error' | 'neutral';

export type Toast = {
    id: string;
    title?: string;
    message: string;
    type?: ToastType;
    duration?: number;
};

export type ToastsProviderProps = {
    children: React.ReactNode;
};
