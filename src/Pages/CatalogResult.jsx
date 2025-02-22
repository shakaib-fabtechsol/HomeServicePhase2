import React from "react";
import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import ServiceBox from "../Components/ServiceBox";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function CatalogResult() {
  useEffect(() => {
    document.title = "CatalogResults";
  }, []);
  const services = [
    {
      id: 1,
      title: "Plumbing Service",
      price: 50,
      description: "Fix your leaking pipes and taps.",
      tags: ["Plumbing", "Repair"],
      image: "",
      publish: 1,
    },
    {
      id: 2,
      title: "House Cleaning",
      price: 30,
      description: "Professional house cleaning services.",
      tags: ["Cleaning", "Home"],
      image: "",
      publish: 0,
    },
    {
      id: 1,
      title: "Plumbing Service",
      price: 50,
      description: "Fix your leaking pipes and taps.",
      tags: ["Plumbing", "Repair"],
      image: "",
      publish: 1,
    },
    {
      id: 3,
      title: "House Cleaning",
      price: 30,
      description: "Professional house cleaning services.",
      tags: ["Cleaning", "Home"],
      image: "",
      publish: 0,
    },
    {
      id: 4,
      title: "Plumbing Service",
      price: 50,
      description: "Fix your leaking pipes and taps.",
      tags: ["Plumbing", "Repair"],
      image: "",
      publish: 1,
    },
    {
      id: 2,
      title: "House Cleaning",
      price: 30,
      description: "Professional house cleaning services.",
      tags: ["Cleaning", "Home"],
      image: "",
      publish: 0,
    },
  ];

  const [openAccordion, setOpenAccordion] = useState(null);
  const [distance, setDistance] = useState(10); // Default value 10 km

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };
  return (
    <>
      <div>
        <div className="container-fluid px-2">
          <div className="flex flex-col md:mt-8 md:flex-row justify-between">
            <div className="max-[100%] md:max-w-[280px] mt-2 w-full">
              <div className="bg-[#F8F8F8] px-4 py-4 h-full rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Filters</h4>
                {/* Budget Accordion */}
                <div className="border-b">
                  <button
                    className="w-full flex justify-between items-center py-2 text-left "
                    onClick={() => toggleAccordion("budget")}
                  >
                    Budget
                    {openAccordion === "budget" ? (
                      <IoIosArrowUp className="text-xl" />
                    ) : (
                      <IoIosArrowDown className="text-xl" />
                    )}
                  </button>
                  {openAccordion === "budget" && (
                    <div className="py-2">
                      <input
                        type="number"
                        placeholder="Enter budget..."
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  )}
                </div>

                {/* Reviews Accordion */}
                <div className="border-b">
                  <button
                    className="w-full flex justify-between items-center py-2 text-left "
                    onClick={() => toggleAccordion("reviews")}
                  >
                    Reviews
                    {openAccordion === "reviews" ? (
                      <IoIosArrowUp className="text-xl" />
                    ) : (
                      <IoIosArrowDown className="text-xl" />
                    )}
                  </button>
                  {openAccordion === "reviews" && (
                    <div className="py-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" /> 4+ Stars
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" /> 3+ Stars
                      </label>
                    </div>
                  )}
                </div>

                {/* Delivery Time Accordion */}
                <div className="border-b">
                  <button
                    className="w-full flex justify-between items-center py-2 text-left "
                    onClick={() => toggleAccordion("deliveryTime")}
                  >
                    Delivery Time
                    {openAccordion === "deliveryTime" ? (
                      <IoIosArrowUp className="text-xl" />
                    ) : (
                      <IoIosArrowDown className="text-xl" />
                    )}
                  </button>
                  {openAccordion === "deliveryTime" && (
                    <div className="py-2">
                      <label className="flex items-center">
                        <input type="radio" name="delivery" className="mr-2" />{" "}
                        24 Hours
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="delivery" className="mr-2" />{" "}
                        3 Days
                      </label>
                    </div>
                  )}
                </div>

                {/* Location Distance Accordion */}
                <div className="border-b py-2">
                  <button
                    className="w-full flex justify-between items-center text-left "
                    onClick={() => toggleAccordion("location")}
                  >
                    <span>Location / Distance</span>
                    {openAccordion === "location" ? (
                      <IoIosArrowUp className="text-xl text-gray-500" />
                    ) : (
                      <IoIosArrowDown className="text-xl text-gray-500" />
                    )}
                  </button>

                  {openAccordion === "location" && (
                    <div className="py-2">
                      <div className="text-center text-gray-700 text-sm font-medium">
                        {distance} km
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        className="w-full cursor-pointer custom-slider"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="filter-other mt-5 md:mt-0">
            <p className="text-lg">
            Showing full catalog results, giving you the <b>widest variety</b>{" "}
            of <b>services</b>...{" "}
          </p>
          <p className="text-sm text-[#757575]">60 results</p>
              <div className="grid mt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <ServiceBox
                    key={service.id}
                    title={service.title}
                    price={service.price}
                    description={service.description}
                    tags={service.tags}
                    image={service.image}
                    publish={service.publish}
                    serviceDetailTo="/dealdetails"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CatalogResult;
