import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";

function ServiceBox({ tags = [], image, publish, title, price, description }) {
  const defaultimg = "/vite.svg";
  const imageToShow = image || defaultimg;

  return (
    <div className="border px-3 py-3 rounded-lg">
      <div className="border px-3 py-3 rounded-lg">
        <img
          src={imageToShow}
          alt="Service Image"
          className="rounded-lg w-full h-40 object-cover"
        />
      </div>

      <p
        className={
          publish === 1
            ? "text-[#1dbd15] font-semibold text-end mt-5"
            : "text-[#f50202] font-semibold text-end mt-5"
        }
      >
        {publish === 1 ? "Published" : "Draft"}
      </p>
      <div className="flex justify-between items-center mt-2">
        <h2 className="text-lg font-semibold">{title ?? "N/A"}</h2>
        <p className="mb-0 text-lg font-extrabold">${price ?? "N/A"}</p>
      </div>

      <p className="text-sm text-[#535862] mt-2">{description ?? "N/A"}</p>
      <p className="text-sm text-[#535862] mt-4">
        {tags.length > 0
          ? tags.map((tag, index) => (
              <span
                key={index}
                className="bg-[#E7F4FB] text-[#0F91D2] px-4 py-2 rounded-full text-sm me-2"
              >
                {tag}
              </span>
            ))
          : "No tags available"}
      </p>
    </div>
  );
}

function Services() {
  const [searchQuery, setSearchQuery] = useState("");
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
  ];

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pmain">
      <div className="pb-3 navv">
        <h2 className="font-semibold text-3xl myhead">My Deals</h2>
        <p className="myblack">Stay Updated on Your Active Deals</p>
      </div>

      <div className="btm">
        {/* Search Input */}
        <div className="md:flex justify-between items-center">
          <div className="flex border rounded-lg items-center px-2">
            <label htmlFor="search">
              <CiSearch className="me-2 text-xl" />
            </label>
            <input
              id="search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-2 w-full focus-none"
              placeholder="Search"
            />
          </div>
          <Link
            to="/provider/newDeals"
            className="bg-blue mt-2 lg:mt-0 px-4 rounded-md py-2 text-white flex justify-center items-center"
          >
            <HiPlus className="text-white text-xl me-1 font-semibold" />
            <span>Create New</span>
          </Link>
        </div>

        <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <ServiceBox
                key={service.id}
                title={service.title}
                price={service.price}
                description={service.description}
                tags={service.tags}
                image={service.image}
                publish={service.publish}
              />
            ))
          ) : (
            <p>No services found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Services;
