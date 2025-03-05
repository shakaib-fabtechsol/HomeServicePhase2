
import { BASE_API } from '../base-api';
import { PRO_POINTS } from '../../constants/endpoint';
import { SALE_POINTS} from '../../constants/endpoint';
import {GET_ORDER} from "../../constants/endpoint";
import {FAV} from "../../constants/endpoint";

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
      providesTags:["singlesale"]
    }),
    sendInvitation: builder.mutation({
      query: (data) => ({
        url: `${PRO_POINTS?.SEND_INVITATION}`,
        method: 'POST',
        body: data,
      })
    }),
    deleteSale: builder.mutation({
      query: (id) => ({
        url: `/SuperAdmin/DeleteSalesReps/${id}`,
        method: 'GET',
      }),
      invalidatesTags: ["GetSales"]
    }),
    updateSale: builder.mutation({
      query: (data) => ({
        url: `${PRO_POINTS?.UPDATE_SALE}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ["GetSales","singlesale"]
    }),
    getSalesRap: builder.query({
      query: (id) => ({
        url: `${SALE_POINTS?.GET_SALES}/${id}`,
        method: "GET",
      }),
    }),
    getOrder: builder.query({
      query: () => ({
        url: `${GET_ORDER.ORDER}`,
      }),
    }),
   
    Favourite: builder.mutation({
      query: (data) => ({
        url: `${FAV?.FAVOURITES}`, 
        method: "POST",
        body: data,
      }),
    }),
    
  }),
});

export const { useGetsaleByIdQuery,useGetsalesQuery,useDeleteSaleMutation,useGetOrderQuery, useFavouriteMutation,useSendInvitationMutation,useUpdateSaleMutation,useGetSalesRapQuery  } = salesAPIs;