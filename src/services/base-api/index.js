import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PROVIDES_TAGS } from "../providesTags";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL_API,
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  },
});

export const BASE_API = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: PROVIDES_TAGS,
  endpoints: (builder) => ({
    getDeal: builder.query({
      query: (dealid) => `Deal/${dealid}`,
      providesTags: (result, error, dealid) => [{ type: "Deal", id: dealid }],
    }),

    postBasicInfo: builder.mutation({
      query: (body) => ({
        url: "BasicInfo",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, args) => [{ type: "Deal", id: args.id }],
    }),

    publishDeal: builder.mutation({
      query: ({ deal_id }) => ({
        url: `DealPublish/${deal_id}`,
        method: "GET",
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Deal", id: args.deal_id },
      ],
    }),

    getUserDetails: builder.query({
      query: (userId) => `UserDetails/${userId}`,
      providesTags: (result, error, userId) => [{ type: "User", id: userId }],
    }),
    uploadMedia: builder.mutation({
      query: (formData) => ({
        url: "/MediaUpload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Deal", id: args.dealid },
      ],
    }),

    fetchDeal: builder.query({
      query: (dealid) => `/apiDeal/${dealid}`,
      providesTags: (result, error, dealid) => [{ type: "Deal", id: dealid }],
    }),
    deleteDeal: builder.mutation({
      query: (dealId) => ({
        url: `DeleteDeal/${dealId}`,
        method: "GET",
      }),
    }),

    priceAndPackage: builder.mutation({
      query: (body) => ({
        url: "PriceAndPackage",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Deal", id: args.dealid },
      ],
    }),

    dealPublish: builder.mutation({
      query: (id) => ({
        url: `DealPublish/${id}`,
        method: "GET",
      }),
    }),

    updatePriceAndPackage: builder.mutation({
      query: (body) => ({
        url: "UpdatePriceAndPackage",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Deal", id: args.dealid },
      ],
    }),
  }),
});

export const {
  useGetDealQuery,
  usePostBasicInfoMutation,
  usePublishDealMutation,
  useUploadMediaMutation,
  useFetchDealQuery,
  useGetUserDetailsQuery,
  useDeleteDealMutation,
  useDealPublishMutation,
  usePriceAndPackageMutation,
  useUpdatePriceAndPackageMutation,
} = BASE_API;
