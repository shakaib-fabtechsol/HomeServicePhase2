
import { BASE_API } from '../base-api';
import { PRO_POINTS } from '../../constants/endpoint';

export const serviceProviderAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getproviders: builder.query({
      query: (data) => ({
        url: `${PRO_POINTS.GET_PROVIDERS}?providers=${data?.providers}&page=${data?.page}&search=${data?.search||""}`,
      }),
      providesTags:["UpdateProvider"]
    }),
    getproviderById: builder.query({
      query: (id) => ({
        url: id?`/SuperAdmin/ProviderDetail/${id}`:null,
      }),
      providesTags:["UpdateProvider"]
    }),
    updateProvider: builder.mutation({
      query: (data) => ({
        url: `${PRO_POINTS?.UPDATE_PROVIDER}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ["UpdateProvider"]
    }),
    BanProvider: builder.mutation({
      query: (data) => ({
        url: `${PRO_POINTS?.BAN}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ["UpdateProvider"]
    }),

   

  }),
});

export const { useGetprovidersQuery, useGetproviderByIdQuery,useUpdateProviderMutation,useBanProviderMutation} = serviceProviderAPIs;