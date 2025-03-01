
import { BASE_API } from '../base-api';
import { PRO_POINTS } from '../../constants/endpoint';

export const salesAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getsales: builder.query({
      query: (data) => ({
        url: `${PRO_POINTS.GET_SALES}?sales_rap=${data?.providers}&page=${data?.page}&search=${data?.search||""}`,
      }),
      providesTags: ["GetSales"],
    }),
    getsaleById: builder.query({
      query: (id) => ({
        url: id?`/SuperAdmin/ViewSalesReps/${id}`:null,
      }),
    }),
    sendInvitation: builder.mutation({
      query: (data) => ({
        url: `${PRO_POINTS?.SEND_INVITATION}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ["UpdateClient"]
    }),
    deleteSale: builder.mutation({
      query: (id) => ({
        url: `/SuperAdmin/DeleteSalesReps/${id}`,
        method: 'GET',
      }),
      invalidatesTags: ["GetSales"]
    })


  }),
});

export const { useGetsaleByIdQuery,useGetsalesQuery,useDeleteSaleMutation,useSendInvitationMutation} = salesAPIs;