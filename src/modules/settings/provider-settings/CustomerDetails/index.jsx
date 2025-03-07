import React from "react";
import { MenuItem, Select, TextField } from "@mui/material";
import SettingsPreview from "../../../../Components/MUI/SettingsPreview";
import profileImg from "../../../../assets/img/service3.png";
import MaskedInput from "react-text-mask";
import { useMyDetails } from "./useMyDetails";
import Loader from "../../../../Components/MUI/Loader";
import { usePublishMutation } from "../../../../services/settings";
import { useUpdateCustomerDetailsMutation} from "../../../../services/settings";
import { useGetCustomerDetailsQuery } from "../../../../services/settings";
const MyDetailModule = ({ handleTabChange,publish }) => {
  const {
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
    onSubmit,
    handleFileChange,
    isLoading,

    // phoneNumber,
    // setPhoneNumber,
  } = useMyDetails({ handleTabChange,useUpdateMyDetailsMutation:useUpdateCustomerDetailsMutation,useGetMyDetailsQuery:useGetCustomerDetailsQuery,usePublishMutation });

  const referredBySales = watch("sales_referred");
  const selectedOption = watch("sales_representative");

  const options = [
    { value: "1", label: "John Doe", avatar: profileImg },
    { value: "2", label: "Jane Smith", avatar: profileImg },
    { value: "3", label: "Chris Evans", avatar: profileImg },
  ];

  const phoneMask = [
    "+",
    "1",
    "(",
    /[1-9]/,
    /\d/,
    /\d/,
    ")",
    " ",
    /[1-9]/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="border-b border-[#E9EAEB] pb-5 items-center flex-wrap gap-4">
          <p className="text-lg font-semibold text-[#181D27]">
            Personal Profile
          </p>
          <p className="text-[#535862] text-sm">
            Update your personal profile details.
          </p>
        </div>

        <div className="max-w-[800px]">
        
          <div className="grid sm:grid-cols-3 gap-2 py-8 border-b">
            <div>
              <p className="text-sm font-semibold">Full Name</p>
              <p className="text-[#535862] text-sm">
                This will be displayed on your profile.
              </p>
            </div>
            <div className="sm:col-span-2">
              <TextField
                fullWidth
                {...register("name", { required: "Full name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="grid sm:grid-cols-3 gap-2 py-8 border-b">
            <div>
              <label className="text-sm font-semibold">Email Address</label>
              <p className="text-[#535862] text-sm">
                This is for when we need to contact you.
              </p>
            </div>
            <div className="sm:col-span-2">
              <TextField
                fullWidth
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </div>
          </div>

          {/* Phone Number Field */}
          <div className="grid sm:grid-cols-3 gap-2 py-8 border-b">
            <div>
              <label className="text-sm font-semibold">Phone Number</label>
              <p className="text-[#535862] text-sm">
                This will not be publicly displayed.
              </p>
            </div>
            <div className="sm:col-span-2">
              <TextField
                fullWidth
                placeholder="+1(123) 456-7890"
                {...register("phone")}
                // onChange={(e) => {
                //   //   setPhoneNumber(e.target.value);
                //   setValue("phone", e.target.value);
                // }}
                InputProps={{
                  inputComponent: MaskedInput,
                  inputProps: {
                    mask: phoneMask,
                    guide: false,
                  },
                }}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-2 py-8 border-b">
            <div>
              <p className="text-sm font-semibold text-[#414651]">
                Personal Profile Photo
              </p>
              <p className="text-[#535862] text-sm">
                This is your personal profile, this will not be publicly
                displayed.
              </p>
            </div>
            <div className="md:col-span-2">
              <SettingsPreview
                onFileSelect={(e) => handleFileChange(e, "personal_image")}
                fieldName="personal_image"
                existingImage={watch("personal_image")}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-2 py-8 border-b">
            <div>
              <label className="text-sm font-semibold" htmlFor="sales_referred">
                Were you referred by a Sales Representative?
              </label>
            </div>
            <div className="sm:col-span-2">
              <select
                className="border border-[#D5D7DA] p-3 rounded-[8px] w-full shadow-[0px_1px_2px_0px_#0A0D120D] focus:outline-none"
                id="sales_referred"
                name="sales_referred"
                value={referredBySales}
                {...register("sales_referred")}
                //   onChange={handleReferralChange}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>

          {referredBySales === "Yes" && (
            <div className="grid sm:grid-cols-3 gap-2 py-8 border-b">
              <div>
                <label
                  className="text-sm font-semibold"
                  htmlFor="sales_representative"
                >
                  Select Sales Representative
                </label>
              </div>
              <div className="sm:col-span-2">
                <Select
                  labelId="sales_representative"
                  {...register("sales_representative")}
                  value={selectedOption}
                  onChange={(e) =>
                    setValue("sales_representative", e.target.value)
                  }
                  renderValue={(selected) => {
                    const selectedOpt = options.find(
                      (option) => option.value === selected
                    );
                    return (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {selectedOpt && (
                          <img
                            src={selectedOpt.avatar}
                            alt="img"
                            style={{
                              width: "24px",
                              height: "24px",
                              borderRadius: "50%",
                              marginRight: "8px",
                            }}
                          />
                        )}
                        {selectedOpt ? selectedOpt.label : ""}
                      </div>
                    );
                  }}
                  sx={{
                    border: "1px solid #D5D7DA !important",
                    borderRadius: "8px",
                    boxShadow: "0px 1px 2px 0px #0A0D120D",
                    outline: "none",
                    width: "100%",
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #D5D7DA",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#D5D7DA !important",
                    },
                  }}
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <img
                        className="me-2 size-8 rounded-full object-cover"
                        src={option.avatar}
                        alt="img"
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          marginRight: "8px",
                        }}
                      />
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Form Buttons */}
        <div className="grid md:max-w-[550px] grid-cols-1 sm:grid-cols-3 my-4 gap-2 ms-auto">
          <button
            type="button"
            className="border border-gray-300 rounded-lg p-3 w-full font-semibold bg-white"
          >
            Cancel
          </button>
         {!publish &&<button
            type="submit"
            onClick={() => setValue("publish", true)}
            className="border rounded-lg p-3 w-full text-white font-semibold bg-[#0F91D2]"
          >
            Save & Publish
          </button>}
          <button
            type="submit"
            className="border rounded-lg p-3 w-full text-white font-semibold bg-[#0F91D2]"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default MyDetailModule;
