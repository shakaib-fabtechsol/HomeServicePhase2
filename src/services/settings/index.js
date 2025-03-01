// for settings


import { BASE_API } from '../base-api';
import { END_POINTS } from '../../constants/endpoint.js';

export const settingsAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    updateMyDetails: builder.mutation({
      query: (data) => ({
        url: END_POINTS.MY_DETAILS,
        method: 'POST',
        body: data,
      }),
    }),
    updateBusinessProfile: builder.mutation({
      query: (data) => ({
        url: END_POINTS.BUSINESS_PROFILE,
        method: 'POST',
        body: data,
      }),
    }),

    // AddCertificateHours
    addCertificateHours: builder.mutation({
      query: (data) => ({
        url: END_POINTS.ADD_CERTIFICATE_HOURS,
        method: 'POST',
        body: data,
      }),
    }),
    addAdditionalInfo: builder.mutation({
      query: (data) => ({
        url: END_POINTS.ADD_ADDITIONAL_INFO,
        method: 'POST',
        body: data,
      }),
    }),
    addSocialProfile: builder.mutation({
      query: (data) => ({
        url: END_POINTS.ADD_SOCIAL_PROFILE,
        method: 'POST',
        body: data,
      }),
    }),
    deleteSocialProfile: builder.mutation({
      query: (data) => ({
        url: END_POINTS.SOCIAL_DELETE,
        method: 'POST',
        body: data,
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: END_POINTS.UPDATE_PASSWORD,
        method: 'POST',
        body: data,
      }),
    }),

    addConversation: builder.mutation({
      query: (data) => ({
        url: END_POINTS.ADD_CONVERSATION,
        method: 'POST',
        body: data,
      }),
    }),
  }),
  // for add conversation
 

});

export const {
  useUpdateMyDetailsMutation,
  useUpdateBusinessProfileMutation,
  useAddCertificateHoursMutation,
  useAddAdditionalInfoMutation,
  useAddSocialProfileMutation,
  useDeleteSocialProfileMutation,
  useUpdatePasswordMutation,
  useAddConversationMutation
} = settingsAPIs;


