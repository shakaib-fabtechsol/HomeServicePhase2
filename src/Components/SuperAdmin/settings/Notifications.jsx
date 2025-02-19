import React from "react";
import BlueSwitch from "./BlueSwitch";

export default function Notifications() {
  const settingsdata = [
    { Label: "General Notifications", id: "General", checked: true },
    {
      Label: "Service Providers Notifications",
      id: "ServiceProviders",
      checked: true,
    },
    { Label: "Client Notifications", id: "Client", checked: false },
    { Label: "Sales Reps Notifications", id: "SalesReps", checked: true },
    { Label: "Messages Notifications", id: "Messages", checked: true },
  ];
  return (
    <div>
      <div className="flex flex-col gap-8">
        {settingsdata.map((row, index) => (
          <div key={index} className="flex items-center justify-between">
            <label className="font-medium text-sm" htmlFor={row.id}>
              {row.Label}
            </label>
            <BlueSwitch defaultChecked={row.checked} id={row.id} />
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-end gap-3">
        <button
          className="text-[#16151C] py-2 px-4 border border-[#A2A1A833] rounded-[10px]"
          type="button"
        >
          Cancel
        </button>
        <button
          className="text-white bg-[#0F91D2] py-2 px-6 border border-[#A2A1A833] rounded-[10px]"
          type="submit"
        >
          Save
        </button>
      </div>
    </div>
  );
}
