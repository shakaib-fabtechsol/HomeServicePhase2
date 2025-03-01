
import { BASE_API } from '../base-api';
import { PRO_POINTS } from '../../constants/endpoint';

export const serviceProviderAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getclients: builder.query({
      query: () => ({
        url: PRO_POINTS.GET_CLIENTS,
       
      }),
      providesTags: ["UpdateClient"],
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


  }),
});

export const { useGetclientByIdQuery,useGetclientsQuery,useUpdateClientMutation} = serviceProviderAPIs;