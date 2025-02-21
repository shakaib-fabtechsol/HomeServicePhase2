import React from "react";
import AmountInput from "../AmountInput";

export default function ReferralCom() {
  const inputsdata = [
    {
      label: "Customer Call Commission",
      grouptext: "%",
      id: "CustomerCallCommission",
    },
    {
      label: "Customer Text Commission",
      grouptext: "%",
      id: "CustomerTextCommission",
    },
    {
      label: "Customer Chat Commission",
      grouptext: "%",
      id: "CustomerChatCommission",
    },
    {
      label: "Customer Email Commission",
      grouptext: "%",
      id: "CustomerEmailCommission",
    },
    {
      label: "Customer Transaction Commission",
      grouptext: "%",
      id: "CustomerTransactionCommission",
    },
  ];
  return (
    <div>
      <form action="">
        <div className="md:max-w-[400px] flex flex-col gap-3">
          {inputsdata.map((input, index) => (
            <div key={index}>
              <label className="text-sm font-medium" htmlFor={input.id}>
                {input.label}
              </label>
              <AmountInput
                grouptext={input.grouptext}
                id={input.id}
                name={input.id}
                className={"mt-1"}
              />
            </div>
          ))}
        </div>
        <button
          className="w-full mt-8 sm:max-w-[250px] bg-[#0F91D2] p-2 text-white font-semibold text-sm rounded-[8px]"
          type="submit"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
