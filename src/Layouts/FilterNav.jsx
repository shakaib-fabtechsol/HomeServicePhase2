import React from "react";
import { Link } from "react-router-dom";

const categories = [
  "Plumbing",
  "Sewer & Septic",
  "Electrical",
  "HVAC / Heating & Cooling",
  "Insulation",
  "Concrete",
  "Bricklayer",
  "Windows & Decors",
  "Flooring",
  "Garage Decors",
];

function FilterNav() {
  return (
    <div className="shadow-md relative z-[99999999]">
      <div className="overflow-auto mx-5 filter-nav">
        <div className="flex w-[max-content] items-center justify-center xl:w-full">
          {categories.map((category, index) => (
            <Link
              key={index}
              to="#"
              className="px-3 py-2 text-nowrap text-[#00000078] text-sm"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterNav;
