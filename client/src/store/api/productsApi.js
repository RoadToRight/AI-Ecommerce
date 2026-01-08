import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/v1/products',
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/all"
    }),
    getPopularProducts: builder.query({
      query: () => "/collections/popular"
    })
  })
})

export const { useGetAllProductsQuery,useGetPopularProductsQuery } = productsApi;