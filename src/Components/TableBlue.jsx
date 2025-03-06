import React from "react";

export default function TableBlue({ headers, rows }) {
  return (
    <div className="overflow-x-auto pb-2">
      <table className="w-full text-nowrap border-separate border-spacing-0">
        <thead>
          <tr>
            {headers?.map((header, index) => (
              <th
                className="text-left py-2 px-4 text-xs shadow-[0px_-1px_0px_0px_#1111111A_inset] font-bold text-[#000000] border-t border-[#0000001A] first:border-s last:border-e first:rounded-tl-[12px] last:rounded-tr-[12px]"
                key={index}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.length > 0 ? (
            rows.map((row, rowIndex) => (
              <tr className="odd:bg-[#FAFAFA]" key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    className={`text-[#000000] shadow-[0px_-1px_0px_0px_#1111111A_inset] text-xs py-2 px-4 first:border-s last:border-e ${
                      rowIndex === rows.length - 1
                        ? "first:rounded-bl-[12px] last:rounded-br-[12px]"
                        : ""
                    }`}
                    key={cellIndex}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr key="no-data">
              <td className="p-4 bg-white" colSpan={headers.length}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
