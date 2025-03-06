import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useAddPaymentDetailsMutation } from "../../services/settings";
import { setUser } from "../../redux/reducers/authSlice";

const Payment = () => {
  const userData = useSelector((state) => state.auth.user);
  const [addPaymentDetails, { isLoading }] = useAddPaymentDetailsMutation();
  const dispatch = useDispatch();

  console.log("userData>>>>>>>", userData);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      account_holder_name: userData?.payment?.account_holder_name || "",
      bank: userData?.payment?.bank || "",
      branch_name: userData?.payment?.branch_name || "",
      ssn: userData?.payment?.ssn || "",
      account_number: userData?.payment?.account_number || "",
      bank_routing_number: userData?.payment?.bank_routing_number || "",
    },
  });

  const patterns = {
    accountNumber: {
      value: /^\d{10,12}$/,
      message: "Account number must be 10-12 digits",
    },
    routingNumber: {
      value: /^\d{9}$/,
      message: "Routing number must be 9 digits",
    },
    ssn: {
      value: /^\d{9}$/,
      message: "SSN/TIN must be 9 digits",
    },
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("user_id", userData.id);
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      const response = await addPaymentDetails(formData);
      if (response?.data) {
        // handleTabChange(9);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Payment details updated successfully",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error?.message ||
          "Something went wrong while updating payment details",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="border-b border-[#E9EAEB] pb-5 items-center flex-wrap gap-4">
            <p className="text-lg font-semibold text-[#181D27]">
              Payment/Payout Info
            </p>
            <p className="text-[#535862] text-sm">update your payment detail</p>
          </div>
          <div className="">
            {/* Account Holder Name */}
            <div className="grid border-b py-4 grid-cols-1 md:grid-cols-12">
              <div className="col-span-12 md:col-span-4 lg:col-span-3">
                <div>
                  <label
                    htmlFor="account_holder_name"
                    className="font-semibold"
                  >
                    Account Holder Name*
                  </label>
                  <p className="text-[#535862] text-sm">
                    This is your legal business name for tax purposes. This will
                    not be publicly displayed on your profile.
                  </p>
                </div>
              </div>
              <div className="col-span-12 md:col-span-8 lg:col-span-6">
                <input
                  type="text"
                  {...register("account_holder_name", {
                    required: "Account holder name is required",
                  })}
                  placeholder="Enter account holder name"
                  className={`myinput focus-none w-full ${errors.account_holder_name ? "border-red-500" : ""}`}
                />
                {errors.account_holder_name && (
                  <span className="text-red-500 text-sm">
                    {errors.account_holder_name.message}
                  </span>
                )}
              </div>
            </div>

            {/* Bank Selection */}
            <div className="grid border-b py-4 grid-cols-1 md:grid-cols-12">
              <div className="col-span-12 md:col-span-4 lg:col-span-3">
                <div className="flex">
                  <label htmlFor="bank" className="font-semibold">
                    Select Bank*
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-8 lg:col-span-6">
                <select
                  {...register("bank", {
                    required: "Please select a bank",
                  })}
                  className={`myinput focus-none w-full ${errors.bank ? "border-red-500" : ""}`}
                >
                  <option value="">Select a bank</option>
                  <option value="bank1">Bank 1</option>
                  <option value="bank2">Bank 2</option>
                  <option value="bank3">Bank 3</option>
                </select>
                {errors.bank && (
                  <span className="text-red-500 text-sm">
                    {errors.bank.message}
                  </span>
                )}
              </div>
            </div>

            {/* Branch Name/Code */}
            <div className="grid border-b py-4 grid-cols-1 md:grid-cols-12">
              <div className="col-span-12 md:col-span-4 lg:col-span-3">
                <div className="flex">
                  <label htmlFor="branch_name" className="font-semibold">
                    Branch Name/Code
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-8 lg:col-span-6">
                <input
                  type="text"
                  {...register("branch_name", {
                    required: "Branch name/code is required",
                  })}
                  placeholder="Enter"
                  className={`myinput focus-none w-full ${errors.branch_name ? "border-red-500" : ""}`}
                />
                {errors.branch_name && (
                  <span className="text-red-500 text-sm">
                    {errors.branch_name.message}
                  </span>
                )}
              </div>
            </div>

            {/* SSN/TIN */}
            <div className="grid border-b py-4 grid-cols-1 md:grid-cols-12">
              <div className="col-span-12 md:col-span-4 lg:col-span-3">
                <div className="flex">
                  <label htmlFor="ssn" className="font-semibold">
                    SSN/TIN
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-8 lg:col-span-6">
                <input
                  type="number"
                  {...register("ssn", {
                    pattern: patterns.ssn,
                  })}
                  placeholder="Enter"
                  className={`myinput focus-none w-full ${errors.ssn ? "border-red-500" : ""}`}
                />
                {errors.ssn && (
                  <span className="text-red-500 text-sm">
                    {errors.ssn.message}
                  </span>
                )}
              </div>
            </div>

            {/* Account Number */}
            <div className="grid border-b py-4 grid-cols-1 md:grid-cols-12">
              <div className="col-span-12 md:col-span-4 lg:col-span-3">
                <div className="flex">
                  <label htmlFor="account_number" className="font-semibold">
                    Account Number*
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-8 lg:col-span-6">
                <input
                  type="text"
                  {...register("account_number", {
                    required: "Account number is required",
                    pattern: patterns.accountNumber,
                  })}
                  placeholder="Enter here..."
                  className={`myinput focus-none w-full ${errors.account_number ? "border-red-500" : ""}`}
                />
                {errors.account_number && (
                  <span className="text-red-500 text-sm">
                    {errors.account_number.message}
                  </span>
                )}
              </div>
            </div>

            {/* Bank Routing Number */}
            <div className="grid py-4 grid-cols-1 md:grid-cols-12">
              <div className="col-span-12 md:col-span-4 lg:col-span-3">
                <div className="flex">
                  <label htmlFor="routing_number" className="font-semibold">
                    Bank Routing Number*
                  </label>
                </div>
              </div>
              <div className="col-span-12 md:col-span-8 lg:col-span-6">
                <input
                  type="text"
                  {...register("bank_routing_number", {
                    required: "Routing number is required",
                    pattern: patterns.routingNumber,
                  })}
                  placeholder="Enter here..."
                  className={`myinput focus-none w-full ${errors.bank_routing_number ? "border-red-500" : ""}`}
                />
                {errors.bank_routing_number && (
                  <span className="text-red-500 text-sm">
                    {errors.bank_routing_number.message}
                  </span>
                )}
              </div>
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
              className="border rounded-lg p-3 w-full text-white font-semibold bg-[#0F91D2]"
            >
              {isLoading ? "Saving..." : "Save & Publish"}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="border rounded-lg p-3 w-full text-white font-semibold bg-[#0F91D2]"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Payment;
