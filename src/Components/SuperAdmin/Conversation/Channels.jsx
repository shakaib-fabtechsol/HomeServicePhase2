import React from "react";
import AmountInput from "../AmountInput";

export default function Channels() {
  return (
    <div>
      <form action="">
        <div className="md:max-w-[400px] flex flex-col gap-3">
          <div>
            <label className="text-sm font-medium" htmlFor="CallPro">
              Call Pro
            </label>
            <AmountInput grouptext={"USD"} id={"CallPro"} name={"CallPro"} className={"mt-1"} />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="TextPro">
              Text Pro
            </label>
            <AmountInput grouptext={"USD"} id={"TextPro"} name={"TextPro"} className={"mt-1"} />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="InstantChat">
              Instant Chat
            </label>
            <AmountInput grouptext={"USD"}
              id={"InstantChat"}
              name={"InstantChat"}
              className={"mt-1"}
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="EmailPro">
              Email Pro
            </label>
            <AmountInput grouptext={"USD"} id={"EmailPro"} name={"EmailPro"} className={"mt-1"} />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="GetDirections">
              Get Directions
            </label>
            <AmountInput grouptext={"USD"}
              id={"GetDirections"}
              name={"GetDirections"}
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
