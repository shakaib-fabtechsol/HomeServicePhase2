import { BASE_API } from "../base-api";
import { END_POINTS } from "../../constants/endpoint.js";

export const orderAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getCustomerOrders: builder.query({
      query: () => END_POINTS.CUSTOM_ORDERS,
      providesTags: ["CustomerOrders"],
    }),
    getOrderDetails: builder.query({
      query: (orderId) => `${END_POINTS.GET_ORDER_DETAILS}/${orderId}`,
      providesTags: (result, error, orderId) => [
        { type: "OrderDetails", id: orderId },
      ],
    }),
    deliverOrder: builder.mutation({
      query: (data) => ({
        url: END_POINTS.ORDER_CONFIRMED,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { orderId }) => [
        "CustomerOrders",
        { type: "OrderDetails", id: orderId },
      ],
    }),
    addOrderBeforeImages: builder.mutation({
      query: (data) => ({
        url: END_POINTS.ORDER_BEFORE_IMAGES,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "CustomerOrders",
        { type: "OrderDetails", id: arg?.order_id },
      ],
    }),
    addOrderAfterImages: builder.mutation({
      query: (data) => ({
        url: END_POINTS.ORDER_AFTER_IMAGES,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "CustomerOrders",
        { type: "OrderDetails", id: arg?.order_id },
      ],
    }),
    markOrderAsComplete: builder.mutation({
      query: (data) => ({
        url: END_POINTS.MARK_COMPLETE,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "CustomerOrders",
        { type: "OrderDetails", id: arg?.order_id },
      ],
    }),
  }),
});

export const {
  useGetCustomerOrdersQuery,
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
  useAddOrderBeforeImagesMutation,
  useAddOrderAfterImagesMutation,
  useMarkOrderAsCompleteMutation,
} = orderAPIs;
