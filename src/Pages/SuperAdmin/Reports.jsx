import React from "react";
import TableBlue from "../../Components/TableBlue";

export default function Reports() {
  const tableHeader = [
    "Period",
    "New Providers (Monthly)",
    "Total Providers (Cumulative)",
  ];
  const initialRows = [
    ["Q1", 10, 10],
    ["Q2", 10, 10],
    ["Q3", 10, 10],
    ["Q4", 10, 10],
  ];

  const totalNewProviders = initialRows.reduce((sum, row) => sum + row[1], 0);
  const totalTotalProviders = initialRows.reduce((sum, row) => sum + row[2], 0);

  const tableRows = [
    ...initialRows,
    [
      <p className="font-bold text-xs">Total</p>,
      <p className="font-bold text-xs">{totalNewProviders}</p>,
      <p className="font-bold text-xs">{totalTotalProviders}</p>,
    ],
  ];

  return (
    <div className="px-5 mt-[100px]">
      <TableBlue headers={tableHeader} rows={tableRows} />
    </div>
  );
}
