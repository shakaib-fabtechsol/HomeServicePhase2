import React from "react";
import { useEffect, useState } from "react";

export default function CommonSupport() {
  useEffect(() => {
    document.title = "Support";
  }, []);

  const inputData = [
    {
      label: "Name",
      placeholder: "Type here...",
      type: "text",
      id: "Name",
      name: "Name",
    },
    {
      label: "Email",
      placeholder: "Type here...",
      type: "text",
      id: "Email",
      name: "Email",
    },
    {
      label: "Subject",
      placeholder: "Type here...",
      type: "text",
      id: "Subject",
      name: "Subject",
    },
 
  ];
  return (
    <div className="border border-[#A2A1A833] rounded-[10px] p-3 px-6">
      <div className="flex items-center sm:gap-4 gap-2 sm:mt-4">
        <div>
          <p className="font-semibold 2xl:text-3xl sm:text-xl text-lg">
            Support
          </p>
          <p className="text-[#535862] md:text-base text-xs">
            If you have any issues or complaints, please fill out the form
            below, and we will get back to you as soon as possible.
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-col mt-4 gap-3 md:max-w-[500px]">
          {inputData.map((field, index) => (
            <div key={index}>
              <label className="text-sm font-medium" htmlFor={field.id}>
                {field.label}
              </label>
              <input
                className="border border-[#A2A1A81A] w-full block p-3 rounded-[8px] outline-none mt-1"
                placeholder={field.placeholder}
                type={field.type}
                id={field.id}
                name={field.name}
              />
            </div>
          ))}
          <div >
              <label className="text-sm font-medium" htmlFor="message">
                Message
              </label>
              <textarea name="" id="message" rows={7} className="border border-[#A2A1A81A] w-full block p-3 rounded-[8px] outline-none mt-1"></textarea>
            </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
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
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
