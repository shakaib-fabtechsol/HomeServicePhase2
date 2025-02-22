import React from "react";
import Table from "../../Table";
import receive from "../../../assets/img/receive.png";
import sent from "../../../assets/img/sent.png";
import { FiDownload } from "react-icons/fi";

export default function TransHistory() {
  const tableHeaders = [
    "INV ID",
    "Received or Spent",
    "Transection Amount",
    "Percentage",
    "Pro Bucks",
    "Running Balance",
  ];

  const rowsdata = [
    {
      id: "01",
      direction: "Sent",
      Amount: 100,
      percent: 10,
      probucks: 5,
      runbalance: 5,
    },
    {
      id: "01",
      direction: "Receive",
      Amount: 100,
      percent: 10,
      probucks: 5,
      runbalance: 5,
    },
    {
      id: "01",
      direction: "Sent",
      Amount: 100,
      percent: 10,
      probucks: 5,
      runbalance: 5,
    },
    {
      id: "01",
      direction: "Receive",
      Amount: 100,
      percent: 10,
      probucks: 5,
      runbalance: 5,
    },
  ];

  const tableRows = rowsdata.map((row) => [
    <p>{`#${row.id}`}</p>,
    <div className="flex items-center gap-2">
      <img
        className="size-10 max-w-10 rounded-full object-contain"
        src={
          row.direction === "Receive"
            ? receive
            : row.direction === "Sent"
            ? sent
            : null
        }
        alt="img"
      />
      <p>{`Amount ${row.direction}`}</p>
    </div>,
    <p>{`$${row.Amount} USD`}</p>,
    <p>{`${row.percent}%`}</p>,
    <p>{`$${row.probucks} USD`}</p>,
    <p>{`$${row.runbalance} USD`}</p>,
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
