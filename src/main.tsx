import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { routes } from '@constants';
import { RouterProvider } from 'react-router-dom';
import { AuthCheck } from '@components';
import { Provider } from 'react-redux';
import { store } from '@store';
import { Toaster } from 'sonner';
import './styles.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <AuthCheck />
            <RouterProvider router={routes} />
            <Toaster />
        </Provider>
    </StrictMode>,
);
