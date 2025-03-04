
import { BASE_API } from '../base-api';
import { PRO_POINTS } from '../../constants/endpoint';

export const serviceProviderAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getproviders: builder.query({
      query: (data) => ({
        url: `${PRO_POINTS.GET_PROVIDERS}?providers=${data?.providers}&page=${data?.page}&search=${data?.search||""}`,
      }),
    }),
    getproviderById: builder.query({
      query: (id) => ({
        url: id?`/SuperAdmin/ProviderDetail/${id}`:null,
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

export const { useGetprovidersQuery, useGetproviderByIdQuery} = serviceProviderAPIs;