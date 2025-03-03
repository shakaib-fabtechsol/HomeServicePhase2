
import { BASE_API } from '../base-api';
import { PRO_POINTS } from '../../constants/endpoint';

export const serviceProviderAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getclients: builder.query({
      query: (data) => ({
        url: `${PRO_POINTS.GET_CLIENTS}?clients=${data?.providers}&page=${data?.page}&search=${data?.search||""}`,
      }),
      providesTags: ["UpdateClient","Get"],
    }),
    getclientById: builder.query({
      query: (id) => ({
        url: id?`/SuperAdmin/Customer/${id}`:null,
      }),
      providesTags: ["UpdateClient"],
    }),

    updateClient: builder.mutation({
      query: (data) => ({
        url: `${PRO_POINTS?.UPDATE_CLIENT}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ["UpdateClient"]
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `/SuperAdmin/DeleteSalesReps/${id}`,
        method: 'GET',
      }),
      invalidatesTags: ["Get"]
    }),


  }),
});

export const { useGetclientByIdQuery,useGetclientsQuery,useUpdateClientMutation,useDeleteClientMutation} = serviceProviderAPIs;