import React from "react";

const Table = ({ headers, rows }) => {
  return (
    <div className="overflow-x-auto pb-2">
      <table className="w-full text-nowrap border-separate border-spacing-0">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                className="text-left py-2 px-4 text-xs font-medium text-[#181D27] border-y border-[#E9EAEB] first:border-s last:border-e first:rounded-tl-[12px] last:rounded-tr-[12px]"
                key={index}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="odd:bg-[#FAFAFA]">
                {row.map((cell, cellIndex) => (
                  <td
                    className={`text-[#181D27] text-sm py-2 px-4 border-b border-[#E9EAEB] first:border-s last:border-e ${
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
};

export default Table;
