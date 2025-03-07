import { BsDownload } from "react-icons/bs";
import TableBlue from "../../../Components/TableBlue";
import { useGetServiceCategoriesSummaryQuery } from "../../../services/salesrep";
import LoadingSpinner from "../../../Components/Common/LoadingSpinner";
import RemoteError from "../../../Components/Common/RemoteError";

function ServicesTableSummary() {
  const {isError,error,data,isFetching}=useGetServiceCategoriesSummaryQuery()
  const serviceHeader = ["Service Category", "Revenue ($)", "% Contribution"];
    
    if(isFetching)return <LoadingSpinner />
    if(isError)return <RemoteError hasError={isError} message={error?.message} />
    const serviceRows = data?.reportData?.map((reportData,) => [
      reportData.category,
      reportData.revenue,
      `${reportData.percentage} %`,
    ]);
  return (
    <div className="flex flex-col justify-start">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <p className="font-bold text-sm sm:text-base">Top Service Categories by Revenue</p>
              <button className="text-[#0F91D2] border text-sm rounded-[4px] border-[#0F91D2] p-1 flex items-center gap-1 ms-auto">
                <BsDownload />
                <span>Export Data</span>
              </button>
            </div>
            <div className="mt-2">
           <TableBlue headers={serviceHeader} rows={serviceRows} />
            </div>
          </div>
  )
}

export default ServicesTableSummary
