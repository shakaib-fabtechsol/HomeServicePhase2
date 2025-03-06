
import { BASE_API } from '../base-api';
export const dashboardAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({

    getSuperDashboard: builder.query({
      query: (id) => ({
        url:`/SuperAdmin/SuperAdminDashboard`,
      }),
    }),

  }),
});

export const {useGetSuperDashboardQuery} = dashboardAPIs;