import React from "react";
import AmountInput from "../AmountInput";

export default function Channels() {
  const inputsdata = [
    {
      label: "Call Pro",
      grouptext: "USD",
      id: "CallPro",
    },
    {
      label: "Text Pro",
      grouptext: "USD",
      id: "TextPro",
    },
    {
      label: "Instant Chat",
      grouptext: "USD",
      id: "InstantChat",
    },
    {
      label: "Email Pro",
      grouptext: "USD",
      id: "EmailPro",
    },
    {
      label: "Get Directions",
      grouptext: "USD",
      id: "GetDirections",
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
