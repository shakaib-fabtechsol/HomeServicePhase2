import React from "react";
import { HiXMark } from "react-icons/hi2";
import { VscSend } from "react-icons/vsc";

export default function DateModal({ close }) {
  return (
    <div className="rounded-[12px] bg-white">
      <div className="py-2 px-3 flex items-center justify-between border-b border-[#00000080]">
        <p className="text-sm font-semibold">Scheduled</p>
        <button onClick={close}>
          <HiXMark />
        </button>
      </div>
      <div className="p-3">
        <form action="">
          <label htmlFor="nameormail" className="text-sm text-black">
            Select Date
          </label>
          <input
            className="border border-[#E5E0EB] block outline-none w-full p-2 rounded-[5px] mt-1"
            type="datetime-local"
            name="nameormail"
            id="nameormail"
            placeholder="Invite by name or email"
          />
          <div className="mt-5 flex justify-end">
            <button className="flex items-center gap-1 text-white bg-[#0F91D2] py-2 px-4 rounded-[5px]">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
