import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi, myPropertiesApi, propertyIdApi } from './api';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [propertyIdApi.reducerPath]: propertyIdApi.reducer,
        [myPropertiesApi.reducerPath]: myPropertiesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, propertyIdApi.middleware, myPropertiesApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export function useResetStore(): { _resetStore: () => void } {
    const dispatch = useDispatch();

    return {
        _resetStore: () => {
            dispatch(authApi.util.resetApiState());
            dispatch(propertyIdApi.util.resetApiState());
            dispatch(myPropertiesApi.util.resetApiState());
        },
    };
}
