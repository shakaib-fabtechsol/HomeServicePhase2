
import { BASE_API } from '../base-api';
import { PRO_POINTS, SALEREP_POINTS } from '../../constants/endpoint';

export const salesrepAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    gettasks: builder.query({
      query: (data) => ({
        url: `${SALEREP_POINTS.GET_ALL_TASKS}`,
      }),
      providesTags: ["Add_task"]
    }),
    gettaskById: builder.query({
      query: (id) => ({
        url: id?`${VIEW_TASK}/${id}`:null,

      }),
    }),

   
    addtask: builder.mutation({
      query: (data) => ({
        url: SALEREP_POINTS?.Add_TASK,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ["Add_task"],
    }),


  }),
});

export const { useGettaskByIdQuery,useGettasksQuery,useAddtaskMutation} = salesrepAPIs;