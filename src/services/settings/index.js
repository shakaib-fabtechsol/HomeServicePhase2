// for settings


import { BASE_API } from '../base-api';
import { END_POINTS } from '../../constants/endPoints';

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


  }),
});

export const { useUpdateMyDetailsMutation, useUpdateBusinessProfileMutation } = settingsAPIs;

