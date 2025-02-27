import React from "react";
import SettingsPreview from "../MUI/SettingsPreview";
import { FaPlus } from "react-icons/fa6";
import { Autocomplete, TextField } from "@mui/material";
import BusinessProfileModule from "../../modules/settings/provider-settings/business-profile";

const BusinessProfile = () => {
  const handlereset = () => {
    setFormData({
      business_name: "",
      business_logo: "",
      location: "",
      about: "",
      business_primary_category: "",
      business_secondary_categories: "",
      website: "",
    });
  };

  const Businesscategories = [
    "Plumbing",
    "Sewer & Septic",
    "Electrical",
    "HVAC / Heating & Cooling",
    "Insulation",
    "Concrete",
    "Bricklayer",
    "Windows & Doors",
    "Flooring",
    "Garage Doors",
    "Concrete Floor Coatings",
    "Mini Barns",
    "Pole Barns",
    "Roofing",
    "Gutters",
    "Siding",
    "Exterior Trim",
    "Landscaping",
    "Hardscapes",
    "Outdoor Living",
    "Pool & Spa",
    "Fence and Gates",
    "Handyman Services",
    "Security",
    "Home Inspections",
    "Structural Engineer",
    "Foundation Repair",
    "Waterproofing",
    "Crawlspace Repair",
    "Mold Testing",
    "Mold Restoration",
    "Water & Fire Restoration Service",
    "Hazardous Waste Removal",
    "Interior Design",
    "Kitchen",
    "Bath",
    "Interior Decorating",
    "Window and Door Coverings",
    "Window Tinting",
    "Interior Trim",
    "Cleaning Service",
    "Organizing",
    "Painting",
    "Drywall",
    "Wall Coverings",
    "Chimney Sweep",
    "Excavation",
    "Grading",
    "Blacktop & Sealcoating",
    "Lighting",
    "Moving",
    "Storage Containers",
    "Piano Movers",
    "Realtor",
    "Home Network & Computer",
    "Computer Repair",
    "Appliance Repair",
    "Nursing",
    "Drain Services",
    "Veterinary Service",
  ];
  const handleFileChange = (e, fieldName) => {
    const uploadedFile = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: uploadedFile,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
    <BusinessProfileModule/>
      {/* <form>
        <div className="max-w-[600px">
          <div className="border-b border-[#E9EAEB] pb-5 items-center flex-wrap gap-4">
            <p className="text-lg font-semibold text-[#181D27]">
              Business Profile
            </p>
            <p className="text-[#535862] text-sm">
              Update your business details.
            </p>
          </div>
          <div>
            <div className="py-8 border-b">
              <div className="grid sm:grid-cols-3 gap-2 max-w-[800px]">
                <div>
                  <label className="text-sm font-semibold" htmlFor="bname">
                    Business name*
                  </label>
                  <p className="text-[#535862] text-sm">
                    This will be publically displayed on your profile.
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <input
                    className="border border-[#D5D7DA] p-3 rounded-[8px] w-full shadow-[0px_1px_2px_0px_#0A0D120D] focus:outline-none"
                    type="text"
                    name="business_name"
                    placeholder="Enter business name"
                  />
                </div>
              </div>
            </div>
            <div className="py-8 border-b">
              <div className="grid md:grid-cols-3 gap-2 max-w-[800px]">
                <div>
                  <p className="text-sm font-semibold text-[#414651]">
                    Business Logo
                  </p>
                  <p className="text-[#535862] text-sm">
                    This will be publically displayed on your profile.
                  </p>
                </div>
                <div className="md:col-span-2">
                  <SettingsPreview
                    onFileSelect={handleFileChange}
                    fieldName="business_logo"
                  />
                </div>
              </div>
            </div>
            {/* <div className="py-8 border-b">
              <div className="grid sm:grid-cols-3 gap-2 max-w-[800px]">
                <div>
                  <label className="text-sm font-semibold" htmlFor="location">
                    Mailing Address
                  </label>
                  <p className="text-[#535862] text-sm">
                    This is your legal mailing address.This will not be
                    publically displayed on your profile.
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <div className="border flex items-center border-[#D5D7DA] p-3 rounded-[8px] w-full shadow-[0px_1px_2px_0px_#0A0D120D]">
                    <input
                      className="w-full focus:outline-none"
                      type="text"
                      onChange={handleChange}
                      name="location"
                    />
                    <label
                      className="bg-[#FAFAFA] rounded-[4px]"
                      htmlFor="location"
                    >
                      <FaPlus />
                    </label>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="py-8 border-b">
              <div className="grid sm:grid-cols-3 gap-2 max-w-[800px]">
                <div>
                  <p className="text-sm font-semibold" htmlFor="about">
                    About
                  </p>
                  <p className="text-[#535862] text-sm">
                    This is quick info customers will see about your business.
                    This will be publicly displayed.
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <textarea
                    rows={5}
                    className="border border-[#D5D7DA] p-3 rounded-[8px] w-full shadow-[0px_1px_2px_0px_#0A0D120D] focus:outline-none"
                    name="about"
                    id="about"
                    placeholder="Write here.."
                  />
                </div>
              </div>
            </div>
            <div className="py-8 border-b">
              <div className="grid sm:grid-cols-3 gap-2 max-w-[800px]">
                <div>
                  <label className="text-sm font-semibold" htmlFor="PrimaryCat">
                    Primary Business Category*
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <select
                    className="border border-[#D5D7DA] p-3 rounded-[8px] w-full shadow-[0px_1px_2px_0px_#0A0D120D] focus:outline-none"
                    name="business_primary_category"
                    onChange={handleChange}
                    id="PrimaryCat"
                  >
                    <option value="" hidden>
                      Select an option
                    </option>
                    {Businesscategories.length > 0 ? (
                      Array.isArray(Businesscategories) &&
                      Businesscategories?.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))
                    ) : (
                      <option disabled>No categories available</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-2 max-w-[800px] mt-4">
                <div>
                  <label
                    className="text-sm font-semibold"
                    htmlFor="SecondaryCat"
                  >
                    Secondary Business Categories*
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={Businesscategories || []}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        border: "1px solid #D5D7DA",
                        outline: "none",
                        paddingTop: "3px",
                        paddingBottom: "3px",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    }}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select" />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="py-8">
              <div className="grid sm:grid-cols-3 gap-2 max-w-[800px]">
                <div>
                  <label className="text-sm font-semibold" htmlFor="Website">
                    Website
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <input
                    className="border border-[#D5D7DA] p-3 rounded-[8px] w-full shadow-[0px_1px_2px_0px_#0A0D120D] focus:outline-none"
                    type="text"
                    name="website"
                    id="Website"
                    placeholder="Enter your website URL"
                  />
                </div>
              </div>
            </div>
            <div className="grid max-w-[550px] grid-cols-3 my-4 gap-2 ms-auto">
              <button className="border border-gray-300 rounded-lg py-[10px] w-full font-semibold bg-white">
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
        </div>
      </form> */} 
    </>
  );
};

export default BusinessProfile;
