import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { getProductsApi } from './apiSlice';

export const store = configureStore({
	reducer: {
		[getProductsApi.reducerPath]: getProductsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(getProductsApi.middleware),
});

setupListeners(store.dispatch);
