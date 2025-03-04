import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useUpdatePasswordMutation } from "../../../services/auth";
import Loader from "../../MUI/Loader";

export default function Security({Admin}) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [updatePassword,{isLoading}] = useUpdatePasswordMutation();

  const onSubmit = async (data) => {
    try {
      if(Admin?.id){
       const response= await updatePassword({current_password:data.OldPassword,password:data.NewPassword,id:Admin?.id}).unwrap();
        Swal.fire("Success", response?.message, "success");

      }else{
        Swal.fire("Error", "Failed to update password", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update password", error?.data?.message);
    }
  };

  const inputData = [
    {
      label: "Old Password",
      placeholder: "••••••••",
      type: "password",
      id: "OldPassword",
      name: "OldPassword",
      validation: { required: "Old Password is required" },
    },
    {
      label: "New Password",
      placeholder: "••••••••",
      type: "password",
      id: "NewPassword",
      name: "NewPassword",
      validation: { required: "New Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } },
    },
    {
      label: "Re-Enter New Password",
      placeholder: "••••••••",
      type: "password",
      id: "Re-EnterNewP",
      name: "Re-EnterNewP",
      validation: { required: "Re-Enter New Password is required", validate: value => value === document.getElementById("NewPassword").value || "Passwords do not match" },
    },
  ];

  if(isLoading){
    return <Loader/>
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              {...register(field.name, field.validation)}
            />
            {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name].message}</p>}
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
    </form>
  );
}

