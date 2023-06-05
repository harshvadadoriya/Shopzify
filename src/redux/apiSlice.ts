import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductResponse } from "../interfaces/interface";

const environment = import.meta.env;

export const getProductsApi = createApi({
  reducerPath: "getProductsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: environment.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getProductData: builder.query<ProductResponse, void>({
      query: () => "product",
    }),
  }),
});

export const { useGetProductDataQuery } = getProductsApi;
