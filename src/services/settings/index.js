// for settings

import { BASE_API } from "../base-api";
import { END_POINTS, SALEREP_POINTS } from "../../constants/endpoint.js";

export const settingsAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: (data) => ({
        url: END_POINTS.USER_DETAILS + `/${data}`,
        method: "GET",
      }),
      providesTags: ["USER_DETAILS"],
    }),

    publish: builder.mutation({
      query: (params) => ({
        url: END_POINTS.SETTING_PUBLISH + `/${params}`,
        method: "GET",
      }),
      invalidatesTags: ["USER_DETAILS"],
    }),
    Customerpublish: builder.mutation({
      query: (params) => ({
        url: END_POINTS.CUSTOMER_PUBLISH + `/${params}`,
        method: "GET",
      }),
      invalidatesTags: ["USER_DETAILS"],
    }),

    updateMyDetails: builder.mutation({
      query: (data) => ({
        url: END_POINTS.MY_DETAILS,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["USER_DETAILS"],
    }),
    updateCustomerDetails: builder.mutation({
      query: (data) => ({
        url: END_POINTS.CUSTOMER_DETAILS,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cust_detail"],
    }),

    getMyDetails: builder.query({
      query: () => ({
        url: END_POINTS.USER_DETAILS,
        method: "GET",
      }),
      providesTags: ["USER_DETAILS"],
    }),
    updateBusinessProfile: builder.mutation({
      query: (data) => ({
        url: END_POINTS.BUSINESS_PROFILE,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["USER_DETAILS"],
    }),

    // AddCertificateHours
    addCertificateHours: builder.mutation({
      query: (data) => ({
        url: END_POINTS.ADD_CERTIFICATE_HOURS,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["USER_DETAILS"],
    }),
    addAdditionalInfo: builder.mutation({
      query: (data) => ({
        url: END_POINTS.ADD_ADDITIONAL_INFO,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["USER_DETAILS"],
    }),
    addSocialProfile: builder.mutation({
      query: (data) => ({
        url: END_POINTS.ADD_SOCIAL_PROFILE,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["USER_DETAILS"],
    }),
    addCustomerSocial: builder.mutation({
      query: (data) => ({
        url: END_POINTS.ADD_CUSTOMER_PROFILE,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["USER_DETAILS"],
    }),

    deleteSocialProfile: builder.mutation({
      query: (data) => ({
        url: END_POINTS.SOCIAL_DELETE,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["USER_DETAILS"],
    }),
    UpdateCustomerPassword: builder.mutation({
      query: (data) => ({
        url: END_POINTS.UPDATE_PASSWORD,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["USER_DETAILS"],
    }),
    UpdatePasswordCustomer: builder.mutation({
      query: (data) => ({
        url: END_POINTS.UPDATE_CUSTOMER_PASSWORD,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cust_detail"],
    }),

    addConversation: builder.mutation({
      query: (data) => ({
        url: END_POINTS.ADD_CONVERSATION,
        method: "POST",
        body: data,
      }),
    }),
    addPaymentDetails: builder.mutation({
      query: (data) => ({
        url: END_POINTS.ADD_PAYMENT_DETAILS,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["USER_DETAILS"],
    }),
    addCustomerPaymentDetails: builder.mutation({
      query: (data) => ({
        url: "/Customer/AddCustomerPayment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cust_detail"],
    }),

    // invalidate  tags
    addBusinessLocation: builder.mutation({
      query: (data) => ({
        url: END_POINTS.ADD_BUSINESS_LOCATION,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["USER_DETAILS"],
    }),
  }),
});

export const {
  usePublishMutation,
  useUpdateMyDetailsMutation,
  useUpdateCustomerDetailsMutation,
  useUpdateBusinessProfileMutation,
  useAddCertificateHoursMutation,
  useAddAdditionalInfoMutation,
  useAddSocialProfileMutation,
  useAddCustomerSocialMutation,
  useDeleteSocialProfileMutation,
  useUpdateCustomerPasswordMutation,
  useUpdatePasswordCustomerMutation,
  useAddConversationMutation,
  useAddPaymentDetailsMutation,
  useAddBusinessLocationMutation,
  useGetUserDetailsQuery,
  useAddCustomerPaymentDetailsMutation
} = settingsAPIs;

export const settingsAPIsforSales = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    updateSales: builder.mutation({
      query: (data) => ({
        url: `${SALEREP_POINTS?.UPDATE_SALES}`,
        method: "POST",
        body: data,
      }),
    }),
    updateSalesPassword: builder.mutation({
      query: (data) => ({
        url: `${SALEREP_POINTS?.UPDATE_SALES_SECURITY}`,
        method: "POST",
        body: data,
      }),
    }),
    getCustomerDetails: builder.query({

      query: (id) => ({
        url: `/Customer/DetailUser/${id}`
      }),
      providesTags:["Cust_detail"]

    }),

    getMyDetails: builder.query({

      query: (id) => ({
        url: `/UserDetails`
      })

    })

  }),
});

export const { useUpdateSalesMutation, useUpdateSalesPasswordMutation, useGetCustomerDetailsQuery,useGetMyDetailsQuery } = settingsAPIsforSales;
