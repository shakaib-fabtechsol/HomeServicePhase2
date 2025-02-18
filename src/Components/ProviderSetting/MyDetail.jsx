import React, { useState } from "react";
import { MenuItem, Select, TextField, Button } from "@mui/material";
import SettingsPreview from "../MUI/SettingsPreview";
import profileImg from "../../assets/img/service3.png";

const phoneRegExp = /^\+1\(\d{3}\) \d{3}-\d{4}$/; // Corrected phone format: +1(123) 456-7890

const MyDetail = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    { value: "1", label: "John Doe", avatar: profileImg },
    { value: "2", label: "Jane Smith", avatar: profileImg },
    { value: "3", label: "Chris Evans", avatar: profileImg },
  ];

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

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
            {/* Full Name */}
            <div className="grid sm:grid-cols-3 gap-2 py-8 border-b">
              <div>
                <label className="text-sm font-semibold" htmlFor="name">
                  Full Name
                </label>
              </div>
              <div className="sm:col-span-2">
                <TextField fullWidth id="name" name="name" variant="outlined" />
              </div>
            </div>

            {/* Email Address */}
            <div className="grid sm:grid-cols-3 gap-2 py-8 border-b">
              <div>
                <label className="text-sm font-semibold" htmlFor="email">
                  Email address
                </label>
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

            {/* Phone Number */}
            <div className="grid sm:grid-cols-3 gap-2 py-8 border-b">
              <div>
                <label className="text-sm font-semibold" htmlFor="phone">
                  Phone Number
                </label>
              </div>
              <div className="sm:col-span-2">
                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  variant="outlined"
                  placeholder="+1(123) 456-7890"
                  inputProps={{
                    pattern: phoneRegExp.source,
                    title: "Phone number must be in the format +1(123) 456-7890",
                  }}
                />
              </div>
            </div>

            {/* Personal Profile Photo */}
            <div className="grid md:grid-cols-3 gap-2 py-8 border-b">
              <div>
                <p className="text-sm font-semibold text-[#414651]">
                  Personal Profile Photo
                </p>
                <p className="text-[#535862] text-sm">
                  This will be displayed on your profile.
                </p>
              </div>
              <div className="md:col-span-2">
                <SettingsPreview
                  onFileSelect={(e) => handleFileChange(e, "personal_image")}
                  fieldName="personal_image"
                />
              </div>
            </div>

            {/* Sales Representative Referral */}
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
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            {/* Select Sales Representative */}
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
          </div>

          {/* Form Buttons */}
          <div className="flex justify-end mt-4">
            <Button
              type="reset"
              variant="outlined"
              sx={{ width: "150px", py: "10px", mr: 2 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "150px",
                py: "10px",
                backgroundColor: "#0F91D2",
                fontWeight: "bold",
                "&:disabled": {
                  opacity: 0.5,
                  cursor: "not-allowed",
                },
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default MyDetail;