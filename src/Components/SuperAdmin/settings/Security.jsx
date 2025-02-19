import React from "react";

export default function Security() {
  const inputData = [
    {
      label: "Old Password",
      placeholder: "••••••••",
      type: "password",
      id: "OldPassword",
      name: "OldPassword",
    },
    {
      label: "New Password",
      placeholder: "••••••••",
      type: "password",
      id: "NewPassword",
      name: "NewPassword",
    },
    {
      label: "Re-Enter New Password",
      placeholder: "••••••••",
      type: "password",
      id: "Re-EnterNewP",
      name: "Re-EnterNewP",
    },
  ];
  return (
    <div>
      <div className="flex flex-col gap-3 md:max-w-[500px]">
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
          Save
        </button>
      </div>
    </div>
  );
}
