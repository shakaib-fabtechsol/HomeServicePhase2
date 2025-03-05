import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import camera from "../../assets/img/cameraicon.png";
import { Link, useNavigate } from "react-router-dom";
import LocationInput from "../LocationInput";
import { useLocation } from "react-router-dom";
import { useGetsaleclientByIdQuery, useUpdateClientMutation, useUpdatesaleClientMutation } from "../../services/clients";
import Loader from "../MUI/Loader";
import Swal from "sweetalert2";
const BASE_URL = import.meta.env.VITE_BASE_URL
export default function EditClient({ oncancel, onsave }) {
  const location = useLocation();
  const { id } = location.state || {};
  const navigate = useNavigate();
  const { data: clientData, isLoading, isError } = useGetsaleclientByIdQuery(id);
  const [image, setImage] = React.useState(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: clientData?.Customer?.name || "",
      phone: clientData?.Customer?.phone || "",
      email: clientData?.Customer?.email || "",
      location: clientData?.Customer?.location || "",
    },
  });

  useEffect(() => {
    if (clientData?.Customer) {
      reset({
        name: clientData.Customer.name || "",
        phone: clientData.Customer.phone || "",
        email: clientData.Customer.email || "",
        location: clientData.Customer.location || "",
      });
    }
  }, [clientData, reset]);

  const [updateClient, { isLoading: updateClientLoading }] = useUpdatesaleClientMutation();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

  };

  if (isLoading || updateClientLoading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }

  if (isError) {
    Swal.fire({
      icon: 'error',
      title: 'Client Not Found',
      text: clientData?.error?.message || 'Failed to get client. Please try again.',
    })
  }

  const onSubmit = async (data) => {

    const formData = new FormData();
    if (data.name !== clientData?.Customer?.name) {
      formData.append("name", data.name);
    }
    if (data.phone !== clientData?.Customer?.phone) {
      formData.append("phone", data.phone);
    }
    if (data.email !== clientData?.Customer?.email) {
      formData.append("email", data.email);
    }
    if (data.location !== clientData?.Customer?.location) {
      formData.append("location", data.location);
    }

    if (image) {
      formData.append("personal_image", image);
    }
  
    formData.append("id", id);

      try {
        await updateClient(formData).unwrap();
        Swal.fire({
          icon: 'success',
          title: 'Welcome Back!',
          text: 'Customer update Successfully',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate(onsave);
        });
        navigate(onsave);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: error?.message || 'Failed to update client. Please try again.',
        });

      }
  };

  return (
    <div>
      <div className="mb-2">
        <h2 className="font-semibold text-3xl">Edit Client</h2>
        <p className="text-gray-600">
          Track and manage your favorite services.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="w-[100px] h-[100px] bg-[#A2A1A80D] border border-[#A2A1A833] flex items-center justify-center cursor-pointer rounded-lg overflow-hidden">
          {image ? (
            // If image is a File object, show preview
            typeof image === "string" ? (
              <img src={image} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover" />
            )
          ) : clientData?.Customer?.personal_image ? (
            // If no new file is uploaded, show existing image from URL
            <img src={`${BASE_URL}/uploads/${clientData?.Customer?.personal_image}`} alt="Client Image" className="w-full h-full object-cover" />
          ) : (
            // Default camera icon
            <img src={camera} alt="Default" />
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            {...register("personal_image")}
            onChange={handleImageChange}
          />
        </label>


        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <input
              className="border border-[#A2A1A833] rounded-[10px] p-3 w-full outline-none"
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-600">{errors.name.message}</p>}

          </div>
          <div>
            <input
              className="border border-[#A2A1A833] rounded-[10px] p-3 w-full outline-none"
              type="tel"
              placeholder="Phone"
              {...register("phone", { required: "Phone is required" })}
            />
            {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}

          </div>

          <div>
            <input
              className="border border-[#A2A1A833] rounded-[10px] p-3 w-full outline-none"
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}

          </div>
          <div>
            <LocationInput
              register={register}
              label="Business Location"
              placeholder="Enter your  location"
            />
            {errors?.location && <p className="text-red-600">{errors?.location?.message}</p>}
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <Link
            to={oncancel}
            className="text-[#16151C] py-2 px-4 border border-[#A2A1A833] rounded-[10px]"
            type="button"
          >
            Cancel
          </Link>
          <button
            className="text-white bg-[#0F91D2] py-2 px-6 border border-[#A2A1A833] rounded-[10px]"
            type="submit"
            disabled={updateClientLoading}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
