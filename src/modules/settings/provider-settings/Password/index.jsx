import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
// import { useChangePasswordMutation } from "../../../../store/services/userApi"; // Adjust the import path as needed
import { useUpdateCustomerPasswordMutation } from "../../../../services/settings";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../../Components/MUI/Loader";

const PasswordModule = ({ handleTabChange }) => {
  const userData = useSelector((state) => state.auth.user);

  const [updatePassword, { isLoading }] = useUpdateCustomerPasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      current_password: "",
      password: "",
      confirm_password: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("current_password", data.current_password);
      formData.append("password", data.password);
      formData.append("id", userData.id);
      const response = await updatePassword(formData);
      if (response?.data) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your password has been successfully updated.",
          showConfirmButton: false,
          timer: 2000,
        });
        reset();
        // handleTabChange(7);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error?.message ||
          "Something went wrong while updating your password.",
      });
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <div className="border-b border-[#E9EAEB] pb-5 items-center flex-wrap gap-4">
        <p className="text-lg font-semibold text-[#181D27]">Password</p>
        <p className="text-[#535862] text-sm">Update your account password.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="grid border-b py-4 grid-cols-1 md:grid-cols-12">
            <div className="col-span-12 md:col-span-4 lg:col-span-3">
              <label htmlFor="current_password" className="font-semibold">
                Current Password*
              </label>
            </div>
            <div className="col-span-12 md:col-span-8 lg:col-span-6">
              <input
                type="password"
                placeholder="**********"
                {...register("current_password", {
                  required: "Current password is required",
                })}
                className={`myinput focus-none w-full ${
                  errors.current_password ? "border-red-500" : ""
                }`}
              />
              {errors.current_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.current_password.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid border-b py-4 grid-cols-1 md:grid-cols-12">
            <div className="col-span-12 md:col-span-4 lg:col-span-3">
              <label htmlFor="password" className="font-semibold">
                New Password*
              </label>
            </div>
            <div className="col-span-12 md:col-span-8 lg:col-span-6">
              <input
                type="password"
                placeholder="**********"
                {...register("password", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className={`myinput focus-none w-full ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid border-b py-4 grid-cols-1 md:grid-cols-12">
            <div className="col-span-12 md:col-span-4 lg:col-span-3">
              <label htmlFor="confirm_password" className="font-semibold">
                Confirm New Password*
              </label>
            </div>
            <div className="col-span-12 md:col-span-8 lg:col-span-6">
              <input
                type="password"
                placeholder="**********"
                {...register("confirm_password", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "The passwords do not match",
                })}
                className={`myinput focus-none w-full ${
                  errors.confirm_password ? "border-red-500" : ""
                }`}
              />
              {errors.confirm_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid max-w-[550px] grid-cols-3 my-4 gap-2 ms-auto">
            <button
              type="button"
              onClick={() => reset()}
              className="border border-gray-300 rounded-lg py-[10px] w-full font-semibold bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="border rounded-lg p-3 w-full text-white font-semibold bg-[#0F91D2] disabled:opacity-50"
            >
              {isLoading ? "Saving..." : " Save  & Next"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PasswordModule;
