import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { routes } from '@constants';
import { RouterProvider } from 'react-router-dom';
import { AuthCheck } from '@components/auth-check.component';
import { ThemeProvider } from '@components/theme-provider.component';
import { Provider } from 'react-redux';
import { store } from '@store';
import { Toaster } from 'sonner';
import './styles.css';
import 'leaflet/dist/leaflet.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider>
                <AuthCheck />
                <RouterProvider router={routes} />
                <Toaster />
            </ThemeProvider>
        </Provider>
    </StrictMode>,
);
