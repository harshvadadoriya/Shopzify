import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	ProductResponse,
	LoginResponse,
	LoginCredentials,
	SignupCredentials,
	RefreshResponse,
	RefreshCredentials,
	ProductFormValues,
	WishlistRecord,
	CartRecord,
	AddToCartProduct,
} from '../../interfaces/interface';
import { RootState } from '../store';
import { setLoggedIn, setLoggedOut } from '../authSliceRedux/authSlice';

const environment = import.meta.env;

const baseQuery = fetchBaseQuery({
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
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
	let result = await baseQuery(args, api, extraOptions);
	if (result?.error?.status === 401) {
		// send refresh token to get new access token

		const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
		if (refreshResult?.data) {
			// store the new token
			const { accessToken } = refreshResult.data as LoginResponse;
			api.dispatch(setLoggedIn(accessToken));
			// retry the original query with new access token
			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(setLoggedOut());
		}
	}

	return result;
};

const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['Product', 'Wishlist', 'Cart'],
	endpoints: (builder) => ({}),
});

export const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProductData: builder.query<ProductResponse, void>({
			query: () => '/product',
			providesTags: ['Product'],
		}),
		searchProducts: builder.query<ProductResponse, string>({
			query: (searchTerm) => `/product/search/${searchTerm}`,
		}),
		addToWishlist: builder.mutation<
			void,
			{ product: ProductFormValues; isWishList?: boolean }
		>({
			query: ({ product, isWishList }) => ({
				url: `/user-wishlist/wishlist/toggle`,
				method: 'POST',
				body: { product, isWishList },
			}),
			invalidatesTags: ['Wishlist'],
		}),
		getWishlists: builder.query<WishlistRecord, void>({
			query: () => '/user-wishlist/wishlists',
			providesTags: ['Wishlist'],
		}),
		addToCart: builder.mutation<void, { product: AddToCartProduct }>({
			query: ({ product }) => ({
				url: '/user-cart/post/cart',
				method: 'POST',
				body: { product },
			}),
			invalidatesTags: ['Cart'],
		}),
		removeFromCart: builder.mutation<void, { product: AddToCartProduct }>({
			query: ({ product }) => ({
				url: '/user-cart/remove/cart',
				method: 'POST',
				body: { product },
			}),
			invalidatesTags: ['Cart'],
		}),
		getCartProducts: builder.query<CartRecord, void>({
			query: () => '/user-cart/carts',
			providesTags: ['Cart'],
		}),
		getCheckout: builder.query({
			query: (id) => `/user-checkout/${id}`,
		}),
		createCheckout: builder.mutation({
			query: (checkoutData) => ({
				url: '/user-checkout/post/checkout',
				method: 'POST',
				body: checkoutData,
			}),
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
	useGetCartProductsQuery,
	useAddToCartMutation,
	useRemoveFromCartMutation,
	useGetCheckoutQuery,
	useCreateCheckoutMutation,
	useLoginMutation,
	useSignupMutation,
	useRefreshMutation,
	useLogoutMutation,
} = api;
