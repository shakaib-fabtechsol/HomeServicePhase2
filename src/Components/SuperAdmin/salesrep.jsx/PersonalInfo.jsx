import React, { useState } from "react";
import camera from "../../../assets/img/cameraicon.png";
import { Link } from "react-router-dom";

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

  const inputs = [
    { name: "fname", id: "fname", type: "text", placeholder: "First Name" },
    { name: "lname", id: "lname", type: "text", placeholder: "Last Name" },
    { name: "phone", id: "phone", type: "tel", placeholder: "Mobile Number" },
    { name: "email", id: "email", type: "email", placeholder: "Email Address" },
  ];

  return (
    <div>
      <label className="w-[100px] h-[100px] bg-[#A2A1A80D] border border-[#A2A1A833] flex items-center justify-center cursor-pointer rounded-lg overflow-hidden">
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
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {inputs.map((input, index) => (
          <div key={index}>
            <input
              className="border border-[#A2A1A833] rounded-[10px] p-3 w-full outline-none"
              type={input.type}
              name={input.name}
              id={input.id}
              placeholder={input.placeholder}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end gap-3">
        <Link
          to="/superadmin/sales"
          className="text-[#16151C] py-2 px-4 border border-[#A2A1A833] rounded-[10px]"
          type="button"
        >
          Cancel
        </Link>
        <button
          className="text-white bg-[#0F91D2] py-2 px-6 border border-[#A2A1A833] rounded-[10px]"
          type="submit"
        >
          Next
        </button>
      </div>
    </div>
  );
}
