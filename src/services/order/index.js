import { BASE_API } from "../base-api";
import { END_POINTS } from "../../constants/endpoint.js";

export const orderAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getCustomerOrders: builder.query({
      query: () => END_POINTS.CUSTOM_ORDERS,
      providesTags: ["CustomerOrders"],
    }),
    myOrderDetailsAsCustomer: builder.query({
      query: (id) => `${END_POINTS.My_ORDERS_DETAILS_As_CUSTOMER}/${id}`,
      providesTags: ["CustomerOrders"],
    }),
    getMyOrdersAsCustomer: builder.query({
      query: () => END_POINTS.My_ORDERS_As_CUSTOMER,
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
    createOffer: builder.mutation({
      query: (data) => ({
        url: END_POINTS.CREATE_OFFER,
        method: "POST",
        body: data,
      }),
    
    }),
    scheduleOrder: builder.mutation({
      query: (data) => ({
        url: END_POINTS.SCHEDULE_ORDER,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "CustomerOrders",
        { type: "OrderDetails", id: arg?.order_id },
      ],
    }),
    completeOrderWithoutReview: builder.mutation({
      query: (orderId) => ({
        url: `${END_POINTS.COMPLETE_ORDER_WITHOUT_REVIEW}/${orderId}`,
        method: "GET",
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
  useMyOrderDetailsAsCustomerQuery,
  useGetOrderDetailsQuery,
  useGetMyOrdersAsCustomerQuery,
  useDeliverOrderMutation,
  useAddOrderBeforeImagesMutation,
  useAddOrderAfterImagesMutation,
  useMarkOrderAsCompleteMutation,
  useCreateOfferMutation,
  useScheduleOrderMutation,
  useCompleteOrderWithoutReviewMutation,
} = orderAPIs;
