import { BsDownload } from "react-icons/bs";
import TableBlue from "../../../Components/TableBlue";
import { useGetServiceProvidersSummaryQuery } from "../../../services/super-admin";
import LoadingSpinner from "../../../Components/Common/LoadingSpinner";
import RemoteError from "../../../Components/Common/RemoteError";

const headers = [
    "Period",
    "New Providers (Monthly)",
    "Total Providers (Cumulative)",
  ];
function ServiceProvidersSummaryTable() {
  const {isFetching,isError,error,data}=useGetServiceProvidersSummaryQuery()
  if(isFetching)return <LoadingSpinner />
  if(isError)return <RemoteError hasError={isError} message={error?.message} />
  const rows = data?.data?.report?.map((reportData,) => [
    reportData.period,
    reportData.new_providers,
    reportData.total_providers ,
  ]);

  return (
    <div className="flex flex-col justify-start">
              <div className="flex justify-between gap-1 items-center">
                <p className="font-bold text-sm sm:text-base">Service Providers Summary</p>
                <button className="text-[#0F91D2] border text-nowrap text-sm rounded-[4px] border-[#0F91D2] p-1 flex items-center gap-1">
                  <BsDownload />
                  <span>Export Data</span>
                </button>
              </div>
              <div className="mt-2">
                <TableBlue headers={headers} rows={rows} />
              </div>
            </div>
  )
}

export default ServiceProvidersSummaryTable
