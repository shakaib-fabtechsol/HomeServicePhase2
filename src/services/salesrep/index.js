
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
  }),
});

export const { useGettaskByIdQuery,useGettasksQuery, useAddOrUpdateTaskMutation,useDeleteTaskMutation} = salesrepAPIs;