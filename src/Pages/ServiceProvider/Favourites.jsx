import React, { useState } from "react";
import ServiceBox from "../../Components/ServiceBox";
import { FaTh, FaList } from "react-icons/fa";
import { CiBoxList, CiGrid41 } from "react-icons/ci";

function Favourites() {
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
      id: 3,
      title: "Electrical Repair",
      price: 70,
      description: "Expert electrical services for your home.",
      tags: ["Electric", "Repair"],
      image: "",
      publish: 1,
    },
    {
      id: 4,
      title: "Carpet Cleaning",
      price: 40,
      description: "Deep carpet cleaning services.",
      tags: ["Cleaning", "Carpet"],
      image: "",
      publish: 0,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between my-2">
        <div>
          <h2 className="font-semibold text-3xl">My Favorites</h2>
          <p className="text-gray-600">
            Track and manage your favorite services.
          </p>
        </div>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="p-2 w-[150px] border rounded-xl"
          >
            {viewMode === "grid" ? "Grid View" : "List View"}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded w-full">
              <button
                onClick={() => {
                  setViewMode("grid");
                  setDropdownOpen(false);
                }}
                className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100"
              >
                <CiGrid41 className="inline mr-2" /> Grid View
              </button>
              <button
                onClick={() => {
                  setViewMode("list");
                  setDropdownOpen(false);
                }}
                className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100"
              >
                <CiBoxList className="inline mr-2" /> List View
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4"
            : "flex flex-col gap-4"
        }
      >
        {services.length > 0 ? (
          services.map((service) => (
            <ServiceBox
              key={service.id}
              title={service.title}
              price={service.price}
              description={service.description}
              tags={service.tags}
              image={service.image}
              publish={service.publish}
              className={
                viewMode === "list"
                  ? "flex flex-row items-center gap-4 p-4 border rounded"
                  : ""
              }
            />
          ))
        ) : (
          <p>No favorites found</p>
        )}
      </div>
    </div>
  );
}

export default Favourites;
