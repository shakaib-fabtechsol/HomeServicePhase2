import React from "react";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import ServiceBox from "../../Components/ServiceBox";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const services = [
    {
      id: 1,
      title: "Plumbing Service",
      price: 50,
      description: "Fix your leaking pipes and taps.",
      tags: ["Plumbing", "Repair"],
      image: "",
      publish: 2,
    },
    {
      id: 2,
      title: "House Cleaning",
      price: 30,
      description: "Professional house cleaning services.",
      tags: ["Cleaning", "Home"],
      image: "",
      publish: 2,
    },
  ];

  const projectStatuses = [
    {
      title: "Web software develop, Progressive web app",
      status: "Delivered",
      bgColor: "#46D20F",
    },
    {
      title: "Web software develop, Progressive web app",
      status: "In Progress",
      bgColor: "#C8D20F",
    },
  ];
  const getBgColor = (status) => {
    if (status === "Delivered") return "#46D20F";
    if (status === "In Progress") return "#C8D20F";
    return "#CCCCCC";
  };
  return (
    <div>
      <div className="mt-4">
        <div className="myacontainer">
          <div className="bg-[#E7F4FBED] rounded-2xl px-5 md:py-[70px] py-5">
            <div className="max-w-[700px] mx-auto">
              <p className="text-center md:text-2xl lg:text-3xl text-lg">
                Hi <span className="font-semibold">Condel,</span> how would you
                like to hire today?
              </p>
              <p className="mb-0 text-center mt-5">
                Hire vetted people you can trust
              </p>
              <div className="flex mt-12 justify-center">
                <div className="flex flex-col sm:flex-row rounded-xl px-2 bg-white py-2">
                  <div>
                    <input
                      type="text"
                      placeholder="Search for any service..."
                      className="py-[10px] bg-transparent focus-none sm:border-r px-3"
                    />
                  </div>
                  <div className="flex items-center px-3">
                    <IoLocationOutline className="me-2 text-2xl text-[#6B6B6B]" />
                    <input
                      type="text"
                      placeholder="Location for the service..."
                      className="py-[10px] bg-transparent focus-none"
                    />
                  </div>
                  <div className="rounded-xl flex justify-center items-center bg-[#0F91D2] px-4 text-xl text-white py-2">
                    <FaSearch />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-lg mt-8">Filters</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 max-w-[800px] mt-2">
        <div className="me-3 my-1">
          <select
            name="budget"
            className="border w-full border-[#E4E4E4] rounded-lg px-3 py-2 bg-white"
          >
            <option value="">Budget</option>
            <option value="50">Up to $50</option>
            <option value="100">Up to $100</option>
          </select>
        </div>
        <div className="me-3 my-1">
          <select
            name="reviews"
            className="border w-full border-[#E4E4E4] rounded-lg px-3 py-2 bg-white"
          >
            <option value="">Reviews</option>
            <option value="5">5 stars</option>
            <option value="4">4 stars</option>
          </select>
        </div>
        <div className="me-3 my-1">
          <select
            name="deliveryTime"
            className="border w-full border-[#E4E4E4] rounded-lg px-3 py-2 bg-white"
          >
            <option value="">Delivery Time</option>
            <option value="1">1 day</option>
            <option value="3">3 days</option>
          </select>
        </div>
        <div className="me-3 my-1">
          <select
            name="location"
            className="border w-full border-[#E4E4E4] rounded-lg px-3 py-2 bg-white"
          >
            <option value="">Location/Distance</option>
            <option value="10">Within 10 miles</option>
            <option value="50">Within 50 miles</option>
          </select>
        </div>
      </div>
      <div>
        <div className="grid lg:grid-cols-2 gap-4 mt-4">
          <div className="border rounded-xl">
            <div className="bg-[#00000014] p-4 rounded-t-xl">
              <h6 className="text-center">Active Orders</h6>
            </div>
            <div className="p-3 grid grid-cols-1 gap-4">
              {projectStatuses.map((project, index) => (
                <div
                  key={index}
                  className="flex sm:flex-row flex-col justify-between sm:items-center border p-3 rounded-xl"
                >
                  <div>
                    <h5 className="text-[#00000091] text-xs">
                      {project.title}
                    </h5>
                  </div>
                  <div className="flex justify-end sm:mt-0 mt-4">
                    <p
                      className="w-[98px] text-center max-w-[98px] py-2 px-2 text-xs"
                      style={{ backgroundColor: getBgColor(project.status) }}
                    >
                      {project.status}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex justify-end mt-4">
                <Link className="underline text-[#000] flex items-cneter text-sm gap-x-1">
                  See Order History <FaArrowRight className="text-xs mt-1" />
                </Link>
              </div>
            </div>
          </div>
          <div className="border rounded-2xl p-4">
            <h4 className="font-medium text-xl">Recent Conversations</h4>
            <Link
              to="#"
              className="flex justify-between items-center border p-3 rounded-xl mt-4"
            >
              <div>
                <h5 className="text-[#000000] text-sm">5 New messages</h5>
                <p className="text-[#6E6E6E] text-xs">
                  Stay connected to the service providers
                </p>
              </div>
              <div>
                <FaArrowRight className="text-lg" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-semibold mt-5">Recently Viewed</h2>
      <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {services.map((service) => (
          <ServiceBox
            key={service.id}
            title={service.title}
            price={service.price}
            description={service.description}
            tags={service.tags}
            image={service.image}
            publish={service.publish}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
