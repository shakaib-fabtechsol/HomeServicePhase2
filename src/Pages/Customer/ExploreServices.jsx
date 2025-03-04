import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExploreServices = () => {
  useEffect(() => {
    document.title = "Explore Services";
  }, []);
  return (
    <div>
      <div className="flex items-center sm:gap-4 gap-2 sm:mt-4">
        <div>
          <Link to="#">
            <FaArrowLeft className="md:text-xl text-sm" />
          </Link>
        </div>
        <div>
          <p className="font-semibold 2xl:text-3xl sm:text-xl text-lg">
            Explore Services
          </p>
          <p className="text-[#535862] md:text-base text-xs">
            Browse Top-Rated Professionals for Every Need, Anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExploreServices;
