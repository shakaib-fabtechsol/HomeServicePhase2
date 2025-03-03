import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import camera from "../../../assets/img/cameraicon.png";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_BASE_URL

const schema = Yup.object().shape({
  name: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
  phone: Yup.string().required("Mobile Number is required"),
  email: Yup.string().required("Email Address is required").email(),
});

export default function PersonalInfo({ data, id, updateSale }) {
  const navigate=useNavigate();
  const { register, handleSubmit, setValue, formState, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: data
  });
  const { errors } = formState;

  const [image, setImage] = useState(data?.image);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const inputs = [
    { name: "name", id: "name", type: "text", placeholder: "First Name" },
    { name: "lastname", id: "lastname", type: "text", placeholder: "Last Name" },
    { name: "phone", id: "phone", type: "tel", placeholder: "Mobile Number" },
    { name: "email", id: "email", type: "email", placeholder: "Email Address" },
  ];

  const onSubmit = async (formdata) => {
    console.log("how are you",formdata)
    const formData = new FormData();
    if (formdata.name !== data?.name) {
      formData.append("name", formdata.name);
    }
    if (formdata.lastname !== data?.lastname) {
      formData.append("lastname", formdata?.lastname);
    }
    if (formdata.phone !== data?.phone) {
      formData.append("phone", formdata?.phone);
    }
    if (formdata?.email !== data?.email) {
      formData.append("email", formdata?.email);
    }
    if (image) {
      formData.append("personal_image", image);
    }
    console.log("how are you")

    formData.append("id", id);
    try {
      await updateSale(formData).unwrap();
      Swal.fire({
        icon: 'success',
        title: 'Welcome Back!',
        text: 'Sale update Successfully',
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/superadmin/sales");
      });

    } catch (error) {
      console.log(error,"this is error")

        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: error?.message || 'Failed to update sale. Please try again.',
        }).than(() => {
          navigate("/superadmin/sales")
        });

    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="w-[100px] h-[100px] bg-[#A2A1A80D] border border-[#A2A1A833] flex items-center justify-center cursor-pointer rounded-lg overflow-hidden">
        {imagePreview ? (
          // If image is a File object, show preview
          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
        ) : data?.personal_image ? (
          // If no new file is uploaded, show existing image from URL
          <img src={`${BASE_URL}/uploads/${data?.personal_image}`} alt="Client Image" className="w-full h-full object-cover" />
        ) : (
          // Default camera icon
          <img src={camera} alt="Default" />
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
              {...register(input.name)}
              placeholder={input.placeholder}
            />
            {errors[input.name] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[input.name]?.message}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end gap-3">
        <Link to="/superadmin/sales"
          className="text-[#16151C] py-2 px-4 border border-[#A2A1A833] rounded-[10px]"
          type="button"
        >
          Cancel
        </Link>
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

