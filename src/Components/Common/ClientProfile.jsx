import React from "react";
import userimg from "../../assets/img/client1.png";

export default function ClientProfile() {
  return (
    <div className="border border-[#A2A1A833] p-3 rounded-[10px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:pe-7 mt-4">
        <div className="flex flex-col gap-3 order-2 sm:order-1">
          <div>
            <p className="font-semibold text-[#181D27] text-lg">Name</p>
            <p className="text-[#535862] text-lg">Jeffery Nichols</p>
          </div>
          <div>
            <p className="font-semibold text-[#181D27] text-lg">
              Contact Email
            </p>
            <p className="text-[#535862] text-lg">charles_doyle@yahoo.com</p>
          </div>
          <div>
            <p className="font-semibold text-[#181D27] text-lg">Phone Number</p>
            <p className="text-[#535862] text-lg">+1543153447994</p>
          </div>
        </div>
        <div className="flex order-1 sm:order-2">
          <div className="max-w-[200px] w-full mx-auto sm:me-0">
            <img
              className="w-full h-full object-cover aspect-square rounded-full"
              src={userimg}
              alt="img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
