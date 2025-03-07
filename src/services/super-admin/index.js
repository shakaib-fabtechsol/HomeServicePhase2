
import { BASE_API } from '../base-api';
import { END_POINTS } from '../../constants/endpoint.js';

export const superAdminAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getServiceProvidersSummary: builder.query({
      query: () => ({
        url: END_POINTS.SERVICE_PROVIDERS_SUMMARY,
      }),
    
    }),
    getSalesRepsSummary: builder.query({
      query: () => ({
        url: END_POINTS.SERVICE_REPS_SUMMARY,
      }),
    
    }),
    getServicesSummary: builder.query({
      query: () => ({
        url: END_POINTS.SERVICE_SUMMARY,
      }),
    }),
    getClientSummary: builder.query({
      query: () => ({
        url: END_POINTS.CLIENT_SUMMARY,
      }),
    }),
  }),
});

export const {
  useGetServiceProvidersSummaryQuery,
  useGetSalesRepsSummaryQuery,
  useGetServicesSummaryQuery,
  useGetClientSummaryQuery,
} = superAdminAPIs;



