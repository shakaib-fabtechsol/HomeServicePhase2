import React, { useState } from "react";
import camera from "../../../assets/img/cameraicon.png";
import editround from "../../../assets/img/editround.png";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Swal from "sweetalert2";
const BASE_URL = import.meta.env.VITE_BASE_URL
import {setUser} from "../../../redux/reducers/authSlice";
export default function PersonalInfo({Admin,updateAdmin}) {
  const dispatch = useDispatch();


  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    phone: Yup.string()
      .required("Phone number is required")
      .min(10, "Phone number must be at least 10 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: Admin?.name || "",
      phone:Admin?.phone || "",
      email: Admin?.email || "",
    },
  });

  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

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
  const onSubmit = async (data) => {
    const formData = new FormData();
  
    // Append all form fields
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
  
    // Append the image if it exists
    if (image) {
      formData.append("personal_image", image);
    }
    formData.append("id", Admin?.id);
  
    try {
      const response = await updateAdmin(formData).unwrap();
      console.log(response, "this is response data");
      if (response?.user) {
        dispatch(setUser(response.user));
      }
      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "Profile updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error?.message ||
          "Failed to update Profile. Please try again.",
      });
    }
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register(field.name)}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.name].message}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="flex order-1 sm:order-2">
          <div className="max-w-[200px] w-full mx-auto sm:me-0">
            <p className="text-sm font-semibold">Profile</p>
            <div className="relative rounded-full">
              <label className="w-full aspect-square bg-[#A2A1A80D] border border-[#A2A1A833] flex items-center justify-center cursor-pointer rounded-full overflow-hidden">
                {image ? (
                  // If image is a File object, show preview
                  typeof image === "string" ? (
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover" />
                  )
                ) : Admin?.personal_image ? (
                  // If no new file is uploaded, show existing image from URL
                  <img src={`${BASE_URL}/uploads/${Admin?.personal_image}`} alt="Client Image" className="w-full h-full object-cover" />
                ) : (
                  // Default camera icon
                  <img src={camera} alt="Default" />
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
    </form>
  );
}

