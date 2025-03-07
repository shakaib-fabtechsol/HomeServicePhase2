import { BsDownload } from "react-icons/bs";
import TableBlue from "../../../Components/TableBlue";
import LoadingSpinner from "../../../Components/Common/LoadingSpinner";
import RemoteError from "../../../Components/Common/RemoteError";
import { useGetSalesRepsSummaryQuery } from "../../../services/super-admin";

const headers = ["Quarter", "Revenue ($)", "% Growth (QoQ)"];
function SalesRepresentativesSummaryTable() {
const {isFetching,isError,error,data}=useGetSalesRepsSummaryQuery()
  if(isFetching)return <LoadingSpinner />
  if(isError)return <RemoteError hasError={isError} message={error?.message} />

  const rows = data?.quarterlyData?.map((reportData,) => [
    reportData.quarter,
    reportData.revenue,
    reportData.growth,
  ]);

  return (
    <div className="flex flex-col justify-start">
              <div className="flex justify-between gap-1 items-center">
                <p className="font-bold text-sm sm:text-base">Sales Representatives Summary</p>
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

export default SalesRepresentativesSummaryTable
