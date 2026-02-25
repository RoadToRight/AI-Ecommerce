import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const collectionApi = createApi({
    reducerPath: "collectionAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/v1/collections" }),
    tagTypes: ["Collections"],
    endpoints: (builder) => ({
        createCollection: builder.mutation({
            query: (data) => ({
                url: "/create",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Collections"]
        }),
        getCollections: builder.query({
            query: (name) => ({
                url: `/${name}`,
            }),
            providesTags: ["Collections"]
        })
    })
})

export const { useCreateCollectionMutation, useGetCollectionsQuery,useLazyGetCollectionsQuery } = collectionApi;