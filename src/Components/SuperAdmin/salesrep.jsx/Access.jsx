import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function Access({ data, id, updateSale }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      assign_permission_1: data?.assign_permission_1 === 1,
      client_permission_1: data?.client_permission_1 === 1,
      assign_permission_2: data?.assign_permission_2 === 1,
      client_permission_2: data?.client_permission_2 === 1,
      assign_permission_3: data?.assign_permission_3 === 1,
      client_permission_3: data?.client_permission_3 === 1,
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    // Convert boolean values to 1 or 0 before submission
    const formattedData = {
      assign_permission_1: formData.assign_permission_1 ? 1 : 0,
      client_permission_1: formData.client_permission_1 ? 1 : 0,
      assign_permission_2: formData.assign_permission_2 ? 1 : 0,
      client_permission_2: formData.client_permission_2 ? 1 : 0,
      assign_permission_3: formData.assign_permission_3 ? 1 : 0,
      client_permission_3: formData.client_permission_3 ? 1 : 0,
    };

    console.log("Submitting Data:", formattedData);

    try {
      await updateSale({ id, ...formattedData });
      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "Access update Successfully",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/superadmin/sales");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error?.message || "Failed to update access. Please try again.",
      }).than(() => {
        navigate("/superadmin/sales");
      });
    }
  };

  const permissions = [
    {
      id: 1,
      name: "Permissions 1",
    },
    {
      id: 2,
      name: "Permissions 2",
    },
    {
      id: 3,
      name: "Permissions 3",
    },
  ];

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex flex-col gap-5 min-w-[400px]">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-8"></div>
            <div className="col-span-2">
              <p className="text-xs sm:text-sm font-semibold">All Clients</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs sm:text-sm font-semibold">Assigned Only</p>
            </div>
          </div>
          {permissions.map((permission, index) => (
            <div key={index} className="grid grid-cols-12 gap-2">
              <div className="col-span-8">
                <p className="text-sm sm:text-base md:text-lg font-semibold">
                  {permission}
                </p>
                <p className="text-sm sm:text-base md:text-lg font-semibold">
                  {permission.name}
                </p>
              </div>
              <div className="col-span-2">
                <input
                  className="accent-[#0F91D2] size-4"
                  type="checkbox"
                  {...register(`client_permission_${index + 1}`)}
                />
              </div>
              <div className="col-span-2">
                <input
                  className="accent-[#0F91D2] size-4"
                  type="checkbox"
                  {...register(`assign_permission_${index + 1}`)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 flex justify-end gap-3">
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
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </button>
      </div>
    </div>
  );
}
