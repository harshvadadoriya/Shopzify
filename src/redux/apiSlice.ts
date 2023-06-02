import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductFormValues } from '../interfaces/interface';
import { store } from './store';

const environment = import.meta.env;

interface ProductResponse {
	productDetails: ProductFormValues[];
}

export const getProductsApi = createApi({
	reducerPath: 'getProductsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: environment.VITE_API_BASE_URL,
	}),
	endpoints: (builder) => ({
		getProductData: builder.query<ProductResponse, void>({
			query: () => 'product',
		}),
	}),
});

export const { useGetProductDataQuery } = getProductsApi;
