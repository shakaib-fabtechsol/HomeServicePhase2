import React from "react";
import { useEffect, useState } from "react";
import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";

function Support() {
  useEffect(() => {
    document.title = "Support";
  }, []);

  return (
    <div className="h-[calc(100dvh-165px)]">
      <div className="flex flex-col items-center justify-center h-full">
        <img
          src={logo}
          alt="Company Logo"
          className="mb-6 w-[180px] h-auto object-scale-down"
        />
        <div className="">
          <h1 className="text-2xl text-center font-bold text-[#181D27] mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-[#000] font-semibold mt-4">Email: </p>
          <Link
            to="mailto:contact@homeprodeals.com"
            className="text-[#000] hover:underline"
          >
            contact@homeprodeals.com
          </Link>
          <p className="text-lg text-[#000] font-semibold mt-4">Phone: </p>
          <Link to="tel:+10000000000" className="text-[#000] hover:underline">
            +1 (000) 000 0000
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Support;
