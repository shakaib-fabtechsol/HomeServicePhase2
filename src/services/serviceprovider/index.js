
import { BASE_API } from '../base-api';
import { PRO_POINTS } from '../../constants/endPoints';

export const serviceProviderAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getproviders: builder.query({
      query: () => ({
        url: PRO_POINTS.GET_PROVIDERS,
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

export const { useGetprovidersQuery} = serviceProviderAPIs;