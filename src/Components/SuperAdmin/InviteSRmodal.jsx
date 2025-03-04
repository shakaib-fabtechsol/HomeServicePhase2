import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HiXMark } from "react-icons/hi2";
import { VscSend } from "react-icons/vsc";
import { useSendInvitationMutation } from "../../services/sales";
import Swal from "sweetalert2";

export default function InviteSRmodal({ close }) {
  const [sendInvite,{isLoading,isSuccess,isError}]=useSendInvitationMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async(data) => {
try {
  await sendInvite(data).unwrap();
  close();
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: 'Sales Rep Invited Successfully',
    timer: 1500,
    showConfirmButton: false,
  })
} catch (error) {
  close();
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    timer: 1500,
    showConfirmButton: false
  })
  
}
  

  };

  return (
    <div className="rounded-[12px] bg-white">
      <div className="py-2 px-3 flex items-center justify-between border-b border-[#00000080]">
        <p className="text-sm font-semibold">Invite Sales Rep</p>
        <button onClick={close}>
          <HiXMark />
        </button>
      </div>
      <div className="p-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <label htmlFor="name" className="text-sm text-black">
                Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                className="border border-[#E5E0EB] text-sm block outline-none w-full p-2 rounded-[5px] mt-1"
                type="text"
                name="name"
                id="name"
                placeholder="Name"
              />
              {errors.name && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="Email" className="text-sm text-black">
                Email
              </label>
              <input
                {...register("email", { required: "Email is required" })}
                className="border border-[#E5E0EB] text-sm block outline-none w-full p-2 rounded-[5px] mt-1"
                type="email"
                name="email"
                id="Email"
                placeholder="Email"
              />
              {errors.Email && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.Email.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <button
              className="flex items-center gap-1 text-white bg-[#0F91D2] py-2 px-4 rounded-[5px]"
              type="submit"
              disabled={isLoading}
            >
              {isLoading? "Sending..." : "Send"} <VscSend />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

