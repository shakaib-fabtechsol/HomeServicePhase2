import React from "react";

export default function AmountInput({ id, name, className, grouptext }) {
  return (
    <div
      className={`border border-[#D7D7D7] shadow-[0px_1px_2px_0px_#2E2E2E0D] rounded-[8px] overflow-hidden flex gap-2 justify-between ${className}`}
    >
      <input
        className="w-full outline-none p-2 appearance-none hide-number"
        type="number"
        name={name}
        id={id}
        min={0}
      />
      <div className="p-2 min-w-10 flex justify-center items-center text-[#343434] bg-[#0000000F] shadow-[0px_1px_2px_0px_#2E2E2E0D] rounded-[7px]">
        {grouptext}
      </div>
    </div>
  );
}
