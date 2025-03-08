
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
        }),
        getservicebysearch:builder.query({

            query: (data) => ({
                url: `/FilterHomeDeals?service=${data?.service}&location=${data?.location}&budget=${data?.budget}&distance=${data?.distance}&estimate_time=${data?.estimate_time}&reviews=${data?.reviews}`,
            })
        }),
        gethomeorder:builder.query({

            query: (d) => ({
                url: `/HomeProviderOrders`,
            })
        }),
        getrecentdeals:builder.query({

            query: (d) => ({
                url: `/RecentViewDeals`,
            })
        })

    }),
});

export const { useGetSuperDashboardQuery,useGetSalesdashboardQuery,useGetallsalesdealsbuilderQuery,useGetservicebysearchQuery,useGethomeorderQuery,useGetrecentdealsQuery } = dashboardAPIs;