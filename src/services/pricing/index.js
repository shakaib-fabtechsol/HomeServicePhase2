
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
    getpricing1: builder.query({
      query: (id) => ({
        url:`/GetInformationPrice`,
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

export const {useGetpricingQuery,useGetpricing1Query,useUpdatePricingMutation } = serviceProviderAPIs;