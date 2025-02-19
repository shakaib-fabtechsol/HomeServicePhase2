import React from "react";
import TableBlue from "../../Components/TableBlue";
import { BsDownload } from "react-icons/bs";

export default function ReportsSr() {
  const salesHeader = ["Quarter", "Revenue ($)", "% Growth (QoQ)"];
  const serviceHeader = ["Service Category", "Revenue ($)", "% Contribution"];
  const revenueHeader = [
    "Month",
    "New Client",
    "Returning Clients",
    "Total Active Clients",
    "Commission Balance",
  ];
  const salesRows = [
    ["Q1", "$55,00", "-"],
    ["Q2", "$55,00", "19% ↑"],
    ["Q3", "$55,00", "20% ↑"],
    ["Q4", "$55,00", "25% ↑"],
    [
      <p className="font-bold">Total</p>,
      <p className="font-bold">$55,00</p>,
      <p className="font-bold">60% ↑</p>,
    ],
  ];
  const serviceRows = [
    ["Cleaning", "$55,00", "20%"],
    ["Home Repair", "$55,00", "20%"],
    ["Plumbing", "$55,00", "20%"],
    ["Electrical", "$55,00", "20%"],
    ["moving services", "$55,00", "20%"],
  ];
  const revenueRows = [
    ["January", "100", "$20,000", "4.9 (457)", "$200"],
    ["February", "100", "$20,000", "4.9 (457)", "$200"],
    ["March", "100", "$20,000", "4.9 (457)", "$200"],
    [
      <p className="font-bold">Q1</p>,
      <p className="font-bold">300</p>,
      <p className="font-bold">$60,000</p>,
      <p className="font-bold">{`4.9 (1500)`}</p>,
      <p className="font-bold">$200</p>,
    ],
    ["April", "100", "$20,000", "4.9 (457)", "$200"],
    ["May", "100", "$20,000", "4.9 (457)", "$200"],
    ["June", "100", "$20,000", "4.9 (457)", "$200"],
    [
      <p className="font-bold">Q2</p>,
      <p className="font-bold">300</p>,
      <p className="font-bold">$60,000</p>,
      <p className="font-bold">{`4.9 (1500)`}</p>,
      <p className="font-bold">$200</p>,
    ],
    ["July", "100", "$20,000", "4.9 (457)", "$200"],
    ["August", "100", "$20,000", "4.9 (457)", "$200"],
    ["September", "100", "$20,000", "4.9 (457)", "$200"],
    [
      <p className="font-bold">Q3</p>,
      <p className="font-bold">300</p>,
      <p className="font-bold">$60,000</p>,
      <p className="font-bold">{`4.9 (1500)`}</p>,
      <p className="font-bold">$200</p>,
    ],
    ["October", "100", "$20,000", "4.9 (457)", "$200"],
    ["November", "100", "$20,000", "4.9 (457)", "$200"],
    ["December", "100", "$20,000", "4.9 (457)", "$200"],
    [
      <p className="font-bold">Q4</p>,
      <p className="font-bold">300</p>,
      <p className="font-bold">$60,000</p>,
      <p className="font-bold">{`4.9 (1500)`}</p>,
      <p className="font-bold">$200</p>,
    ],
    [
      <p className="font-bold">Total Yearly</p>,
      <p className="font-bold">1200</p>,
      <p className="font-bold">$240,000</p>,
      <p className="font-bold">6000</p>,
      <p className="font-bold">6000</p>,
    ],
  ];
  const summaries = [
    {
      title: "Quarterly Revenue Summary",
      headers: salesHeader,
      rows: salesRows,
    },
    {
      title: "Top Service Categories by Revenue",
      headers: serviceHeader,
      rows: serviceRows,
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {summaries.map((summary, index) => (
          <div className="flex flex-col justify-between" key={index}>
            <div className="flex justify-between items-center">
              <p className="font-bold text-sm sm:text-base">{summary.title}</p>
              <button className="text-[#0F91D2] border text-[10px] rounded-[4px] border-[#0F91D2] p-1 flex items-center gap-1">
                <BsDownload />
                <span>Export Data</span>
              </button>
            </div>
            <div className="mt-2">
              <TableBlue headers={summary.headers} rows={summary.rows} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <p className="font-bold text-sm sm:text-base">
          Assigned Pro Activity Report
        </p>
        <div className="mt-2">
          <TableBlue headers={revenueHeader} rows={revenueRows} />
        </div>
      </div>
    </div>
  );
}
