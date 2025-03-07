import React from "react";
import TableBlue from "../../../Components/TableBlue";
import { BsDownload, BsSliders } from "react-icons/bs";
import { useEffect,  } from "react";
import ServicesTableSummary from "./ServiceCategoriesTable.jsx";
import RevenueSummaryTable from "./RevenueSummaryTable.jsx";

export default function ReportsSr() {
  const revenueHeader = [
    "Month",
    "New Client",
    <p className="text-wrap">Returning Clients</p>,
    <p className="text-wrap">Total Active Clients</p>,
    <p className="text-wrap">Active Deals</p>,
    <p className="text-wrap">Commission Balance</p>,
  ];

  const revenueRows = [
    ["January", "100", "$20,000", "4.9 (457)", "200", "$200"],
    ["February", "100", "$20,000", "4.9 (457)", "200", "$200"],
    ["March", "100", "$20,000", "4.9 (457)", "200", "$200"],
    [
      <p className="font-bold">Q1</p>,
      <p className="font-bold">300</p>,
      <p className="font-bold">$60,000</p>,
      <p className="font-bold">{`4.9 (1500)`}</p>,
      <p className="font-bold">600</p>,
      <p className="font-bold">$200</p>,
    ],
    ["April", "100", "$20,000", "4.9 (457)", "200", "$200"],
    ["May", "100", "$20,000", "4.9 (457)", "200", "$200"],
    ["June", "100", "$20,000", "4.9 (457)", "200", "$200"],
    [
      <p className="font-bold">Q2</p>,
      <p className="font-bold">300</p>,
      <p className="font-bold">$60,000</p>,
      <p className="font-bold">{`4.9 (1500)`}</p>,
      <p className="font-bold">600</p>,
      <p className="font-bold">$200</p>,
    ],
    ["July", "100", "$20,000", "4.9 (457)", "200", "$200"],
    ["August", "100", "$20,000", "4.9 (457)", "200", "$200"],
    ["September", "100", "$20,000", "4.9 (457)", "200", "$200"],
    [
      <p className="font-bold">Q3</p>,
      <p className="font-bold">300</p>,
      <p className="font-bold">$60,000</p>,
      <p className="font-bold">{`4.9 (1500)`}</p>,
      <p className="font-bold">600</p>,
      <p className="font-bold">$200</p>,
    ],
    ["October", "100", "$20,000", "4.9 (457)", "200", "$200"],
    ["November", "100", "$20,000", "4.9 (457)", "200", "$200"],
    ["December", "100", "$20,000", "4.9 (457)", "200", "$200"],
    [
      <p className="font-bold">Q4</p>,
      <p className="font-bold">300</p>,
      <p className="font-bold">$60,000</p>,
      <p className="font-bold">{`4.9 (1500)`}</p>,
      <p className="font-bold">600</p>,
      <p className="font-bold">$200</p>,
    ],
    [
      <p className="font-bold">Total Yearly</p>,
      <p className="font-bold">1200</p>,
      <p className="font-bold">$240,000</p>,
      <p className="font-bold">6000</p>,
      <p className="font-bold">2400</p>,
      <p className="font-bold">6000</p>,
    ],
  ];

  const comissionHeader = [
    "Provider ID",
    "Provider Name",
    "Service",
    "Commission %",
    <p className="text-wrap">Running commission</p>,
    <p className="text-wrap">Commission Earned</p>,
    <p className="text-wrap">Transaction Type</p>,
    "Date",
  ];

  const comissionRows = [
    [
      "PRV123",
      "John Doe",
      "Cleaning",
      "10%",
      "$50",
      "$50",
      "Call",
      "Feb 1, 2025",
    ],
    [
      "PRV123",
      "John Doe",
      "Cleaning",
      "10%",
      "$50",
      "$50",
      "Call",
      "Feb 1, 2025",
    ],
    [
      "PRV123",
      "John Doe",
      "Cleaning",
      "10%",
      "$50",
      "$50",
      "Chat",
      "Feb 1, 2025",
    ],
    [
      "PRV123",
      "John Doe",
      "Cleaning",
      "10%",
      "$50",
      "$50",
      "Text",
      "Feb 1, 2025",
    ],
    [
      "PRV123",
      "John Doe",
      "Cleaning",
      "10%",
      "$50",
      "$50",
      "Call",
      "Feb 1, 2025",
    ],
    [
      "PRV123",
      "John Doe",
      "Cleaning",
      "10%",
      "$50",
      "$50",
      "Chat",
      "Feb 1, 2025",
    ],
    [
      "PRV123",
      "John Doe",
      "Cleaning",
      "10%",
      "$50",
      "$50",
      "Call",
      "Feb 1, 2025",
    ],
    [
      "PRV123",
      "John Doe",
      "Cleaning",
      "10%",
      "$50",
      "$50",
      "Call",
      "Feb 1, 2025",
    ],
    [
      "PRV123",
      "John Doe",
      "Cleaning",
      "10%",
      "$50",
      "$50",
      "Email",
      "Feb 1, 2025",
    ],
    [
      "PRV123",
      "John Doe",
      "Cleaning",
      "10%",
      "$50",
      "$50",
      "Call",
      "Feb 1, 2025",
    ],
    [
      "PRV123",
      "John Doe",
      "Cleaning",
      "10%",
      "$50",
      "$50",
      "Call",
      "Feb 1, 2025",
    ],
    [
      "PRV123",
      "John Doe",
      "Cleaning",
      "10%",
      "$50",
      "$50",
      "Chat",
      "Feb 1, 2025",
    ],
    [
      "PRV123",
      "John Doe",
      "Cleaning",
      "10%",
      "$50",
      "$50",
      "Call",
      "Feb 1, 2025",
    ],
    [
      "PRV123",
      "John Doe",
      "Cleaning",
      "10%",
      "$50",
      "$50",
      "Chat",
      "Feb 1, 2025",
    ],
    [
      "PRV123",
      "John Doe",
      "Cleaning",
      "10%",
      "$50",
      "$50",
      "Call",
      "Feb 1, 2025",
    ],
    [
      "PRV123",
      "John Doe",
      "Cleaning",
      "10%",
      "$50",
      "$50",
      "Chat",
      "Feb 1, 2025",
    ],
    [
      "PRV123",
      "John Doe",
      "Cleaning",
      "10%",
      "$50",
      "$50",
      "Call",
      "Feb 1, 2025",
    ],
    [
      "PRV123",
      "John Doe",
      "Cleaning",
      "10%",
      "$50",
      "$50",
      "Chat",
      "Feb 1, 2025",
    ],
  ];
  useEffect(() => {
    document.title = "Reports";
  }, []);
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RevenueSummaryTable/>
        <ServicesTableSummary/>
      
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-2 flex-wrap justify-between">
          <div>
            <p className="font-bold text-sm sm:text-base">
              Assigned Pro Activity Report
            </p>
          </div>
          <div className="ms-auto">
            <button className="text-[#0F91D2] border text-sm rounded-[4px] border-[#0F91D2] p-1 flex items-center gap-1">
              <BsDownload />
              <span>Export Data</span>
            </button>
          </div>
        </div>
        <div className="mt-2">
          <TableBlue headers={revenueHeader} rows={revenueRows} />
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-2 justify-between flex-wrap">
          <p className="font-bold text-sm sm:text-base">Commission History</p>
          <div className="ms-auto flex items-center gap-2 justify-end">
            <button className="border bg-white py-1 px-3 rounded-[4px] flex text-sm items-center gap-2">
              <BsSliders />
              Filter
            </button>
            <button className="text-[#0F91D2] border text-sm rounded-[4px] border-[#0F91D2] p-1 flex items-center gap-1">
              <BsDownload />
              <span>Export Data</span>
            </button>
          </div>
        </div>
        <div className="mt-2">
          <TableBlue headers={comissionHeader} rows={comissionRows} />
        </div>
      </div>
    </div>
  );
}
