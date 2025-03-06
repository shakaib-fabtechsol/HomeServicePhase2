
import { BASE_API } from '../base-api';
import { END_POINTS } from '../../constants/endpoint.js';

export const customerSupportAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getAllSupportTickets: builder.query({
      query: () => ({
        url: END_POINTS.GET_SUPPORT,
        method: "GET",
      }),
      providesTags: ['SupportTickets'],
    }),
    createSupportTicket: builder.mutation({
      query: (data) => ({
        url: END_POINTS.CUSTOMER_SUPPORT,
        method: "POST",
        body: data,
      }),
    }),
    updateSupportTicket: builder.mutation({
      query: (data) => ({
        url: END_POINTS.UPDATE_CUSTOMER_SUPPORT,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['SupportTickets'],
    }),
  }),
});

export const {
  useCreateSupportTicketMutation,
  useUpdateSupportTicketMutation,
  useGetAllSupportTicketsQuery,
} = customerSupportAPIs;



