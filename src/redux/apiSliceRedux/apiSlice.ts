import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	ProductResponse,
	LoginResponse,
	LoginCredentials,
	SignupCredentials,
	RefreshResponse,
	RefreshCredentials,
} from '../../interfaces/interface';

const environment = import.meta.env;

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: environment.VITE_API_BASE_URL,
		credentials: 'include',
		prepareHeaders: (headers) => {
			headers.set('Content-type', 'application/json');
			headers.set('Accept', 'application/json');
			return headers;
		},
	}),

	endpoints: (builder) => ({
		getProductData: builder.query<ProductResponse, void>({
			query: () => '/product',
		}),
		searchProducts: builder.query<ProductResponse, string>({
			query: (searchTerm) => `/product/search/${searchTerm}`,
		}),
		login: builder.mutation<LoginResponse, LoginCredentials>({
			query: (credentials) => ({
				url: '/auth/login',
				method: 'POST',
				body: credentials,
			}),
		}),
		signup: builder.mutation<void, SignupCredentials>({
			query: (credentials) => ({
				url: '/auth/signup',
				method: 'POST',
				body: credentials,
			}),
		}),
		refresh: builder.mutation<RefreshResponse, RefreshCredentials>({
			query: (credentials) => ({
				url: '/auth/refresh',
				method: 'POST',
				body: credentials,
			}),
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
			}),
		}),
	}),
});

export const {
	useGetProductDataQuery,
	useSearchProductsQuery,
	useLoginMutation,
	useSignupMutation,
	useRefreshMutation,
	useLogoutMutation,
} = api;
