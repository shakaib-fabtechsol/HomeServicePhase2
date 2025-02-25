import React, { useState } from "react";
import { MenuItem, Select, TextField, Button } from "@mui/material";
import SettingsPreview from "../MUI/SettingsPreview";
import profileImg from "../../assets/img/service3.png";
import MaskedInput from "react-text-mask";

const MyDetail = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [referredBySales, setReferredBySales] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const options = [
    { value: "1", label: "John Doe", avatar: profileImg },
    { value: "2", label: "Jane Smith", avatar: profileImg },
    { value: "3", label: "Chris Evans", avatar: profileImg },
  ];

  const handleSelectChange = (event) => setSelectedOption(event.target.value);
  const handleReferralChange = (event) =>
    setReferredBySales(event.target.value);

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

  return (
    <>
      <form>
        <div>
          <div className="border-b border-[#E9EAEB] pb-5 items-center flex-wrap gap-4">
            <p className="text-lg font-semibold text-[#181D27]">
              Personal Profile
            </p>
            <p className="text-[#535862] text-sm">
              Update your personal profile details.
            </p>
          </div>
          <div className="max-w-[1000px]">
            <div className="grid sm:grid-cols-3 gap-2 py-8 border-b">
              <div>
                <p className="text-sm font-semibold">Full Name</p>
                <p className="text-[#535862] text-sm">
                  This will be displayed on your profile.
                </p>
              </div>
              <div className="sm:col-span-2">
                <TextField fullWidth id="name" name="name" variant="outlined" />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-2 py-8 border-b">
              <div>
                <label className="text-sm font-semibold" htmlFor="email">
                  Email Address
                </label>
                <p className="text-[#535862] text-sm">
                  This is for when we need to contact you about your personal
                  profile. This will not be publicly displayed.
                </p>
              </div>
              <div className="sm:col-span-2">
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  variant="outlined"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-2 py-8 border-b">
              <div>
                <label className="text-sm font-semibold" htmlFor="phone">
                  Phone Number
                </label>
                <p className="text-[#535862] text-sm">
                  This is for when we need to contact you about your personal
                  profile. This will not be publicly displayed.
                </p>
              </div>
              <div className="sm:col-span-2">
                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  variant="outlined"
                  placeholder="+1(123) 456-7890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
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
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-2 py-8 border-b">
              <div>
                <label
                  className="text-sm font-semibold"
                  htmlFor="sales_referred"
                >
                  Were you referred by a Sales Representative?
                </label>
              </div>
              <div className="sm:col-span-2">
                <select
                  className="border border-[#D5D7DA] p-3 rounded-[8px] w-full shadow-[0px_1px_2px_0px_#0A0D120D] focus:outline-none"
                  id="sales_referred"
                  name="sales_referred"
                  value={referredBySales}
                  onChange={handleReferralChange}
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
                    value={selectedOption}
                    onChange={handleSelectChange}
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
          <div className="grid md:max-w-[550px] grid-cols-1 sm:grid-cols-3 my-4 gap-2 ms-auto">
            <button className="border border-gray-300 rounded-lg p-3 w-full font-semibold bg-white">
              Cancel
            </button>
            <button className="border rounded-lg p-3 w-full text-white font-semibold bg-[#0F91D2]">
              Save & Publish
            </button>
            <button className="border rounded-lg p-3 w-full text-white font-semibold bg-[#0F91D2]">
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default MyDetail;
