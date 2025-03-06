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
  tagTypes: [],
  endpoints: (builder) => ({
    getProviderContactPro: builder.query({
      query: (id) => ({
        url: `${PROVIDER_CONTACT_PRO.GET_RECORDS}/${id}`,
      }),
    }),
   
    
  }),
});

export const {
  useGetProviderContactProQuery
} = BASE_API_NODE;
