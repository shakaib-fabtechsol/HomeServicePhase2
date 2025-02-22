import React from "react";
import Table from "../../Table";
import clientimg from "../../../assets/img/client1.png";
import { BsSliders } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";

export default function ReferralHistory() {
  const tableHeaders = [
    "Company ID",
    "Company Name & Logo",
    "Percentage Commission",
    "Total Pro Bucks Received",
  ];

  const rowsdata = [
    {
      id: "1123",
      name: "company name",
      img: clientimg,
      percent: 20,
      receivedbucks: 10,
    },
    {
      id: "1123",
      name: "company name",
      img: clientimg,
      percent: 20,
      receivedbucks: 10,
    },
    {
      id: "1123",
      name: "company name",
      img: clientimg,
      percent: 20,
      receivedbucks: 10,
    },
    {
      id: "1123",
      name: "company name",
      img: clientimg,
      percent: 20,
      receivedbucks: 10,
    },
  ];

  const tableRows = rowsdata.map((row) => [
    <p>{`#${row.id}`}</p>,
    <div className="flex items-center gap-2">
      <img
        className="size-10 max-w-10 rounded-full object-cover"
        src={row.img}
        alt="img"
      />
      <p>{row.name}</p>
    </div>,
    <p>{`${row.percent}%`}</p>,
    <p>{`$${row.receivedbucks} USD`}</p>,
  ]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-end gap-2">
        <button className="border border-[#0F91D2] bg-white text-[#0F91D2] px-3 py-2 rounded-[8px] flex text-sm items-center gap-2">
          <FiDownload className="text-xs" />
          Export Data
        </button>
        <input
          className="hide-calendar border outline-none border-[#00000036] py-2 px-3 text-sm rounded-[8px]"
          type="date"
          name="datefilter"
          id="datefilter"
        />
      </div>
      <div className="mt-4">
        <Table headers={tableHeaders} rows={tableRows} />
      </div>
    </div>
  );
}
