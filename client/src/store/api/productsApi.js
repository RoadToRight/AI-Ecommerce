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
    }),
    getAllProductsSearch: builder.mutation({
      query: (searchBody) => ({
        url: "/search",
        method: "POST",
        body: searchBody,
      })
    }),
    getSingleProduct: builder.query({
      query: () => ``
    })
  })
})

export const { useGetAllProductsQuery, useGetAllProductsSearchMutation, useGetPopularProductsQuery } = productsApi;