import React from "react";
import { HiXMark } from "react-icons/hi2";
import { VscSend } from "react-icons/vsc";

export default function InviteSRmodal({ close }) {
  return (
    <div className="rounded-[12px] bg-white">
      <div className="py-2 px-3 flex items-center justify-between border-b border-[#00000080]">
        <p className="text-sm font-semibold">Invite Sales Rep</p>
        <button onClick={close}>
          <HiXMark />
        </button>
      </div>
      <div className="p-3">
        <form action="">
          <div>
            <div>
              <label htmlFor="name" className="text-sm text-black">
                Name
              </label>
              <input
                className="border border-[#E5E0EB] text-sm block outline-none w-full p-2 rounded-[5px] mt-1"
                type="text"
                name="name"
                id="name"
                placeholder="Name"
              />
            </div>
            <div>
              <label htmlFor="Email" className="text-sm text-black">
                Email
              </label>
              <input
                className="border border-[#E5E0EB] text-sm block outline-none w-full p-2 rounded-[5px] mt-1"
                type="email"
                name="Email"
                id="Email"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <button className="flex items-center gap-1 text-white bg-[#0F91D2] py-2 px-4 rounded-[5px]">
              Send <VscSend />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
