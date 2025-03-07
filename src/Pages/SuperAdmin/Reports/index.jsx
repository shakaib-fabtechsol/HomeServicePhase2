import  { useEffect } from "react";
import TableBlue from "../../../Components/TableBlue";
import { BsDownload } from "react-icons/bs";
import ServiceProvidersSummaryTable from "./ServiceProvidersSummaryTable";
import ClientsSummaryTable from "./ClientsSummaryTable";
import SalesRepresentativesSummaryTable from "./SalesRepresentativesSummaryTable";
import ServicesSummaryTable from "./ServicesSummaryTable";

export default function Reports() {
  useEffect(() => {
    document.title = "Reports";
  }, []);

  const revenueHeader = [
    "Period",
    "Total Transactions",
    "Revenue ($)",
    "Avg. Rating",
  ];

  const revenueRows = [
    ["January", "100", "$20,000", "4.9 (457)"],
    ["February", "100", "$20,000", "4.9 (457)"],
    ["March", "100", "$20,000", "4.9 (457)"],
    [
      <p className="font-bold">Q1</p>,
      <p className="font-bold">300</p>,
      <p className="font-bold">$60,000</p>,
      <p className="font-bold">{`4.9 (1500)`}</p>,
    ],
    ["April", "100", "$20,000", "4.9 (457)"],
    ["May", "100", "$20,000", "4.9 (457)"],
    ["June", "100", "$20,000", "4.9 (457)"],
    [
      <p className="font-bold">Q2</p>,
      <p className="font-bold">300</p>,
      <p className="font-bold">$60,000</p>,
      <p className="font-bold">{`4.9 (1500)`}</p>,
    ],
    ["July", "100", "$20,000", "4.9 (457)"],
    ["August", "100", "$20,000", "4.9 (457)"],
    ["September", "100", "$20,000", "4.9 (457)"],
    [
      <p className="font-bold">Q3</p>,
      <p className="font-bold">300</p>,
      <p className="font-bold">$60,000</p>,
      <p className="font-bold">{`4.9 (1500)`}</p>,
    ],
    ["October", "100", "$20,000", "4.9 (457)"],
    ["November", "100", "$20,000", "4.9 (457)"],
    ["December", "100", "$20,000", "4.9 (457)"],
    [
      <p className="font-bold">Q4</p>,
      <p className="font-bold">300</p>,
      <p className="font-bold">$60,000</p>,
      <p className="font-bold">{`4.9 (1500)`}</p>,
    ],
    [
      <p className="font-bold">Total Yearly</p>,
      <p className="font-bold">1200</p>,
      <p className="font-bold">$240,000</p>,
      <p className="font-bold">6000</p>,
    ],
  ];

  return (
    <div>
      <div className="mb-2">
        <h2 className="font-semibold text-3xl">Reports</h2>
        <p className="text-gray-600">Track and manage your favorite reports.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ServiceProvidersSummaryTable/>
        <ClientsSummaryTable/>
        <SalesRepresentativesSummaryTable/>
        <ServicesSummaryTable/>
      </div>
      <div className="mt-4">
        <div className="flex justify-between gap-1 items-center">
          <p className="font-bold text-sm sm:text-base">
            Revenue & Transactions Summary
          </p>
          <button className="text-[#0F91D2] border text-nowrap text-sm rounded-[4px] border-[#0F91D2] p-1 flex items-center gap-1">
            <BsDownload />
            <span>Export Data</span>
          </button>
        </div>
        <div className="mt-2">
          <TableBlue headers={revenueHeader} rows={revenueRows} />
        </div>
      </div>
    </div>
  );
}
