import React from "react";
import { FaXmark } from "react-icons/fa6";
import BlueSwitch from "../SuperAdmin/settings/BlueSwitch";

export default function AddTaskModal({ close }) {
  return (
    <div className="max-h-[calc(100dvh-40px)] overflow-y-auto scroll-x-hidden">
      <form action="">
        <div className="flex justify-end">
          <button
            onClick={close}
            className="size-6 bg-[rgba(120,116,134,0.2)] flex justify-center items-center rounded-[6px] outline-none"
          >
            <FaXmark className="text-sm" />
          </button>
        </div>
        <div className="flex items-center gap-2 justify-between mt-2 flex-wrap">
          <p className="text-2xl font-medium">Add Task</p>
          <p className="text-sm text-[#787486] ms-auto">Today 02/02/2025</p>
        </div>
        <div className="mt-4">
          <label className="text-sm font-medium" htmlFor="name">
            Name the task
          </label>
          <input
            className="block border outline-none border-[#787486] w-full p-2 rounded-[8px] mt-1"
            type="text"
            name="name"
            id="name"
          />
        </div>
        <div className="mt-4">
          <label className="text-sm font-medium" htmlFor="desc">
            Description
          </label>
          <textarea
            className="block border outline-none border-[#787486] w-full p-2 rounded-[8px] mt-1"
            name="desc"
            id="desc"
            rows={4}
          ></textarea>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium">Due Date/Time</p>
          <div className="grid grid-cols-5 gap-4 mt-1">
            <input
              className="block border outline-none border-[#787486] w-full p-2 rounded-[8px] col-span-3 hide-calendar"
              type="date"
              name="date"
              id="date"
            />
            <input
              className="block border outline-none border-[#787486] w-full p-2 rounded-[8px] col-span-2 hide-clock"
              type="time"
              name="time"
              id="time"
            />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium">Attached File</p>
          <input
            className="hidden"
            type="file"
            name="uploadfile"
            id="uploadfile"
          />
          <label
            className="text-[#787486] font-medium text-sm border border-dotted rounded-[4px] border-[#787486] py-2 mt-2 cursor-pointer px-3 inline-block"
            htmlFor="uploadfile"
          >
            + Attach File
          </label>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium">Activate Notifications</p>
          <div className="flex items-center gap-4 mt-2">
            <label
              className="text-[#787486] font-medium text-sm"
              htmlFor="reminder"
            >
              Task will be reminder
            </label>
            <BlueSwitch defaultChecked={false} id="reminder" />
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <button
          onClick={close}
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
      </form>
    </div>
  );
}
