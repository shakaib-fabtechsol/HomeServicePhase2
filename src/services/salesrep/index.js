
import { BASE_API } from '../base-api';
import {  SALEREP_POINTS } from '../../constants/endpoint';

export const salesrepAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    gettasks: builder.query({
      query: () => ({
        url: `${SALEREP_POINTS.GET_ALL_TASKS}`,
      }),
      providesTags: ["TASKS"]
    }),
   
    getServiceCategoriesSummary: builder.query({
      query: () => ({
        url: SALEREP_POINTS.GET_SERVICE_REVENUE,
      }),
    }),
   
    getRevenueSummary: builder.query({
      query: () => ({
        url: SALEREP_POINTS.GET_REVENUE_SUMMARY,
      }),
    }),
   
    addOrUpdateTask: builder.mutation({
      query: ({isUpdating,formData}) => ({
        url: isUpdating?`${SALEREP_POINTS?.UPDATE_TASK}`:SALEREP_POINTS?.Add_TASK,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["TASKS"],
    }),
    deleteTask: builder.mutation({
      query: ({taskId}) => ({
        url: `${SALEREP_POINTS?.DELETE_TASK}/${taskId}`,
        method: 'GET',
      }),
      invalidatesTags: ["TASKS"],
    }),
    getSalesRepos: builder.query({
      query: () => ({
        url: SALEREP_POINTS.SALES_REPOS,
      }),
    }),
  }),
});

export const { useGettaskByIdQuery,useGetServiceCategoriesSummaryQuery,useGettasksQuery, useAddOrUpdateTaskMutation,useDeleteTaskMutation,useGetRevenueSummaryQuery ,
useGetSalesReposQuery

} = salesrepAPIs;