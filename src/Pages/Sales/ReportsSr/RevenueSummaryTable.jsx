import { BsDownload } from "react-icons/bs";
import TableBlue from "../../../Components/TableBlue.jsx";
import LoadingSpinner from "../../../Components/Common/LoadingSpinner.jsx";
import RemoteError from "../../../Components/Common/RemoteError.jsx";
import { useGetRevenueSummaryQuery } from "../../../services/salesrep/index.js";

function RevenueSummaryTable() {
    const {isError,error,data,isFetching}=useGetRevenueSummaryQuery()
  const salesHeader = ["Quarter", "Revenue ($)", "% Growth (QoQ)"];
  const salesRows = data?.quarterlyData?.map((reportData,) => [
    reportData.quarter,
    reportData.revenue,reportData.growth
  ]);
    if(isFetching)return <LoadingSpinner />
      if(isError)return <RemoteError hasError={isError} message={error?.message} />
  return (
    <div className="flex flex-col justify-start">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <p className="font-bold text-sm sm:text-base">Quarterly Revenue Summary</p>
              <button className="text-[#0F91D2] border text-sm rounded-[4px] border-[#0F91D2] p-1 flex items-center gap-1 ms-auto">
                <BsDownload />
                <span>Export Data</span>
              </button>
            </div>
            <div className="mt-2">
            { isFetching?<LoadingSpinner />?isError:<RemoteError hasError={isError} message={error?.message} />: <TableBlue headers={salesHeader} rows={salesRows} />}
            </div>
          </div>
  )
}

export default RevenueSummaryTable
