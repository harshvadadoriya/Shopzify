import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	ProductResponse,
	LoginResponse,
	LoginCredentials,
	SignupCredentials,
	RefreshResponse,
	RefreshCredentials,
	ProductFormValues,
	WishlistResponse,
} from '../../interfaces/interface';
import { RootState } from '../store';

const environment = import.meta.env;

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: environment.VITE_API_BASE_URL,
		credentials: 'include',
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.accessToken;
			if (token) {
				headers.set('Content-type', 'application/json');
				headers.set('Accept', 'application/json');
				headers.set('authorization', `Bearer ${token}`);
			}
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
		addToWishlist: builder.mutation<void, { product: ProductFormValues }>({
			query: ({ product }) => ({
				url: `/user-wishlist/wishlist/toggle`,
				method: 'POST',
				body: { product },
			}),
		}),
		getWishlists: builder.query<WishlistResponse, void>({
			query: () => '/user-wishlist/wishlists',
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
	useAddToWishlistMutation,
	useGetWishlistsQuery,
	useLoginMutation,
	useSignupMutation,
	useRefreshMutation,
	useLogoutMutation,
} = api;
