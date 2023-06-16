import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
} from "../../interfaces/interface";
import { RootState } from "../store";

const environment = import.meta.env;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: environment.VITE_API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("Content-type", "application/json");
        headers.set("Accept", "application/json");
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Product", "Wishlist", "Cart"],
  endpoints: (builder) => ({
    getProductData: builder.query<ProductResponse, void>({
      query: () => "/product",
      providesTags: ["Product"],
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
        method: "POST",
        body: { product, isWishList },
      }),
      invalidatesTags: ["Wishlist"],
    }),
    getWishlists: builder.query<WishlistRecord, void>({
      query: () => "/user-wishlist/wishlists",
      providesTags: ["Wishlist"],
    }),
    addToCart: builder.mutation<void, { product: AddToCartProduct }>({
      query: ({ product }) => ({
        url: "/user-cart/post/cart",
        method: "POST",
        body: { product },
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation<void, { product: AddToCartProduct }>({
      query: ({ product }) => ({
        url: "/user-cart/remove/cart",
        method: "POST",
        body: { product },
      }),
      invalidatesTags: ["Cart"],
    }),
    getCartProducts: builder.query<CartRecord, void>({
      query: () => "/user-cart/carts",
      providesTags: ["Cart"],
    }),
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation<void, SignupCredentials>({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    refresh: builder.mutation<RefreshResponse, RefreshCredentials>({
      query: (credentials) => ({
        url: "/auth/refresh",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
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
  useLoginMutation,
  useSignupMutation,
  useRefreshMutation,
  useLogoutMutation,
} = api;
