import React, { useState } from "react";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import ServiceBox from "../../Components/ServiceBox";
import { Link, useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate=useNavigate();
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");

  return (
    <div className="bg-[#E7F4FBED] rounded-2xl px-5 md:py-[70px] py-5">
      <div className="max-w-[700px] mx-auto">
        <p className="text-center md:text-2xl lg:text-3xl text-lg">
          Hi <span className="font-semibold">Condel,</span> how would you like
          to hire today?
        </p>
        <p className="mb-0 text-center mt-5">
          Hire vetted people you can trust
        </p>
        <div className="flex mt-12 pt-8 justify-center">
          <div className="flex flex-col sm:flex-row rounded-xl px-2 bg-white py-2">
            <div>
              <input
                type="text"
                placeholder="Search for any service..."
                className="py-[10px] bg-transparent focus-none sm:border-r px-3"
                value={service}
                onChange={(e) => {
                  setService(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center px-3">
              <IoLocationOutline className="me-2 text-2xl text-[#6B6B6B]" />
              <input
                type="text"
                placeholder="Location for the service..."
                className="py-[10px] bg-transparent focus-none"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
            </div>
            <button
              onClick={() => {
                if (location || service) {
                  navigate(`/catalogResult?location=${location}&service=${service}`)
                }
              }}

              className="rounded-lg flex items-center bg-[#0F91D2] px-4 text-xl text-white py-1"
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;

