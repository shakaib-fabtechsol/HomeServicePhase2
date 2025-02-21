import React from "react";

export default function Access() {
  const permissions = ["Permissions 1", "Permissions 2", "Permissions 3"];
  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-8"></div>
          <div className="col-span-2">
            <p className="text-xs sm:text-sm font-semibold">All Clients</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs sm:text-sm font-semibold">Assigned Only</p>
          </div>
        </div>
        {permissions.map((permission, index) => (
          <div key={index} className="grid grid-cols-12 gap-2">
            <div className="col-span-8">
              <p className="sm:text-lg font-semibold">{permission}</p>
            </div>
            <div className="col-span-2">
              <input
                className="accent-[#0F91D2] size-4"
                type="checkbox"
                name={`permission${index + 1}AllClients`}
                id={`permission${index + 1}AllClients`}
              />
            </div>
            <div className="col-span-2">
              <input
                className="accent-[#0F91D2] size-4"
                type="checkbox"
                name={`permission${index + 1}AssignedOnly`}
                id={`permission${index + 1}AssignedOnly`}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-end gap-3">
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
