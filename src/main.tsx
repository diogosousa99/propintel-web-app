import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { routes } from '@constants';
import { RouterProvider } from 'react-router-dom';
import { AuthCheck } from '@components';
import { Provider } from 'react-redux';
import { store } from '@store';
import { ToastProvider } from '@contexts';
import './styles.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ToastProvider>
                <AuthCheck />
                <RouterProvider router={routes} />
            </ToastProvider>
        </Provider>
    </StrictMode>,
);
