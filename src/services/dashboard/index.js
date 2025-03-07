
import { BASE_API } from '../base-api';
export const dashboardAPIs = BASE_API.injectEndpoints({
    endpoints: (builder) => ({

        getSuperDashboard: builder.query({
            query: () => ({
                url: `/SuperAdmin/SuperAdminDashboard`,
            }),
        }),

        getSalesdashboard: builder.query({

            query: () => ({
                url: `/SaleRep/Dashboard`,
            })
        }),
        getallsalesdealsbuilder:builder.query({

            query: () => ({
                url: `/SaleRep/RecenltyPublishDeals`,
            })
        })

    }),
});

export const { useGetSuperDashboardQuery,useGetSalesdashboardQuery,useGetallsalesdealsbuilderQuery } = dashboardAPIs;