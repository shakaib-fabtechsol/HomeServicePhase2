import React from "react";
import AmountInput from "../AmountInput";

export default function CustomerServiceFee() {
  return (
    <div>
      <form action="">
        <div className="md:max-w-[400px] flex flex-col gap-3">
          <div>
            <label className="text-sm font-medium" htmlFor="CustomerServiceFee">
              Customer service fee
            </label>
            <AmountInput
              grouptext={"%Age"}
              id={"CustomerServiceFee"}
              name={"CustomerServiceFee"}
              className={"mt-1"}
            />
          </div>
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
