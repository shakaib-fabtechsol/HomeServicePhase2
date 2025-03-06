
import { BASE_API } from '../base-api';
import { PRO_POINTS, SALEREP_POINTS } from '../../constants/endpoint';

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



export const saleProviderAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getsaleproviders: builder.query({
      query: (data) => ({
        url: `${SALEREP_POINTS.GET_PROVIDER_ALL}?providers=${data?.providers}&page=${data?.page}&search=${data?.search||""}`,
      }),
      providesTags:["UpdatesaleProvider"]

    }),
    getassignedsaleProvider:builder.query({
      query: (data) => ({
        url: `${SALEREP_POINTS.GET_ASSIGNED_PROVIDER}?providers=${data?.providers}&page=${data?.page}&search=${data?.search||""}`,
      }),
      providesTags:["UpdatesaleProvider"]
    }),
    getsaleproviderById: builder.query({
      query: (id) => ({
        url: id?`/SaleRep/SaleProviderDetail/${id}`:null,
      }),
      providesTags:["UpdatesaleProvider"]
    }),
    updatesaleProvider: builder.mutation({
      query: (data) => ({
        url: `${SALEREP_POINTS?.EDIT_SALE_PROS}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ["UpdatesaleProvider"]
    }),
  
  }),
});

export const {useGetsaleproviderByIdQuery,useGetsaleprovidersQuery,useUpdatesaleProviderMutation,useGetassignedsaleProviderQuery}=saleProviderAPIs;