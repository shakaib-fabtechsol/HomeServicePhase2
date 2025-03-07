import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PROVIDER_CONTACT_PRO } from "../../constants/endpoint";
// import { PROVIDES_TAGS } from "../providesTags";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL_NODE,
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  },
});

export const BASE_API_NODE = createApi({
  reducerPath: "contact-pro",
  baseQuery: baseQuery,
  tagTypes: ["ContactPro"],
  endpoints: (builder) => ({
    getProviderContactPro: builder.query({
      query: (id) => ({
        url: `${PROVIDER_CONTACT_PRO.GET_RECORDS}/${id}`,
      }),
      providesTags: ["ContactPro"],
    }),
    callProApi: builder.mutation({
          query: (data) => ({
            url: `${PROVIDER_CONTACT_PRO?.SEND_CALL}/${data?.providerId}`,
            method: 'POST',
            body: data,
          }),
          invalidatesTags: ["ContactPro"]
    }),
    textProApi: builder.mutation({
          query: (data) => ({
            url: `${PROVIDER_CONTACT_PRO?.SEND_SMS}/${data?.providerId}`,
            method: 'POST',
            body: data,
          }),
          invalidatesTags: ["ContactPro"]
    }),
    chatProApi: builder.mutation({
          query: (data) => ({
            url: `${PROVIDER_CONTACT_PRO?.SEND_INSTANT_MESSAGE}/${data?.providerId}`,
            method: 'POST',
            body: data,
          }),
          invalidatesTags: ["ContactPro"]
    }),
    emailProApi: builder.mutation({
          query: (data) => ({
            url: `${PROVIDER_CONTACT_PRO?.SEND_EMAIL}/${data?.providerId}`,
            method: 'POST',
            body: data,
          }),
          invalidatesTags: ["ContactPro"]
    }),
    getDirectionsApi: builder.mutation({
          query: (data) => ({
            url: `${PROVIDER_CONTACT_PRO?.SEND_GET_DIRECTION}/${data?.providerId}`,
            method: 'POST',
            body: data,
          }),
          invalidatesTags: ["ContactPro"]
    }),
   
    
  }),
});

export const {
  useGetProviderContactProQuery,
  useCallProApiMutation,
  useTextProApiMutation,
  useChatProApiMutation,
  useEmailProApiMutation,
  useGetDirectionsApiMutation,
} = BASE_API_NODE;
