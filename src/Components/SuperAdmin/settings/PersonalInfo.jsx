import React, { useState } from "react";
import camera from "../../../assets/img/cameraicon.png";
import editround from "../../../assets/img/editround.png";

export default function PersonalInfo() {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const inputData = [
    {
      label: "Name",
      placeholder: "Jeffery Nichols",
      type: "text",
      id: "name",
      name: "name",
    },
    {
      label: "Contact Email",
      placeholder: "charles_doyle@yahoo.com",
      type: "email",
      id: "email",
      name: "email",
    },
    {
      label: "Phone Number",
      placeholder: "+1543153447994",
      type: "tel",
      id: "phone",
      name: "phone",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:pe-7">
        <div className="flex flex-col gap-3 order-2 sm:order-1">
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
        <div className="flex order-1 sm:order-2">
          <div className="max-w-[200px] w-full mx-auto sm:me-0">
            <p className="text-sm font-semibold">Profile</p>
            <div className="relative rounded-full">
              <label className="w-full aspect-square bg-[#A2A1A80D] border border-[#A2A1A833] flex items-center justify-center cursor-pointer rounded-full overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img src={camera} alt="img" />
                )}
                <input
                  id="profile-img"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              <div className="absolute top-2/3 left-0 translate-x-1/2 translate-y-1/2 ">
                <label
                  className="cursor-pointer rounded-full"
                  htmlFor="profile-img"
                >
                  <img
                    className="size-10 max-w-10 rounded-full"
                    src={editround}
                    alt="img"
                  />
                </label>
              </div>
            </div>
          </div>
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
          Save
        </button>
      </div>
    </div>
  );
}
