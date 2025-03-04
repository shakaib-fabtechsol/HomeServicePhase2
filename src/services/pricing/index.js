
import { BASE_API } from '../base-api';
import { PRO_POINTS } from '../../constants/endpoint';

export const serviceProviderAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({

    getpricing: builder.query({
      query: (id) => ({
        url:`/SuperAdmin/GetPriceDetails`,
      }),
      providesTags: ["Pricing"],
    }),

    updatePricing: builder.mutation({
      query: (data) => ({
        url: `${PRO_POINTS?.AddPRICING}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ["Pricing"]
    }),


  }),
});

export const {useGetpricingQuery,useUpdatePricingMutation } = serviceProviderAPIs;