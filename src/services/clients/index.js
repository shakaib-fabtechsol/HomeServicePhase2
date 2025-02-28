
import { BASE_API } from '../base-api';
import { PRO_POINTS } from '../../constants/endpoint';

export const serviceProviderAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getclients: builder.query({
      query: () => ({
        url: PRO_POINTS.GET_CLIENTS,
      }),
    }),
    getclientById: builder.query({
      query: (id) => ({
        url: id?`/SuperAdmin/ClientDetail/${id}`:null,
      }),
    }),

   
    // updateBusinessProfile: builder.mutation({
    //   query: (data) => ({
    //     url: END_POINTS.BUSINESS_PROFILE,
    //     method: 'POST',
    //     body: data,
    //   }),
    // }),


  }),
});

export const { useGetclientByIdQuery,useGetclientsQuery} = serviceProviderAPIs;