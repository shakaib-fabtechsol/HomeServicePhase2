import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PROVIDES_TAGS } from '../providesTags';

const baseQuery = fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.access;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
})



export const BASE_API = createApi({

  reducerPath: 'api',

  baseQuery: baseQuery,

  tagTypes: PROVIDES_TAGS,

  endpoints: () => ({}),
})

export const enhancedApi = BASE_API.enhanceEndpoints({
  endpoints: () => ({}),
})
