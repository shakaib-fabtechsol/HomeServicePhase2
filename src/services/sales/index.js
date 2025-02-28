
import { BASE_API } from '../base-api';
import { PRO_POINTS } from '../../constants/endpoint';

export const salesAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getsales: builder.query({
      query: () => ({
        url: PRO_POINTS.GET_SALES,
      }),
    }),
    getsaleById: builder.query({
      query: (id) => ({
        url: id?`/SuperAdmin/SaleDetail/${id}`:null,
      }),
    }),


  }),
});

export const { useGetsaleByIdQuery,useGetsalesQuery} = salesAPIs;