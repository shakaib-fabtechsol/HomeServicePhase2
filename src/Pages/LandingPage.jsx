import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import ServiceBox from "../Components/ServiceBox";

function LandingPage() {
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

  return (
    <>
      <div className="mt-4">
        <div className="myacontainer">
          <div className="bg-[#E7F4FBED] rounded-2xl px-5 py-[70px]">
            <div className="max-w-[700px] mx-auto">
              <p className="text-center text-2xl lg:text-3xl">
                Hi <span className="font-semibold">Condel,</span> how would you
                like to hire today?
              </p>
              <p className="mb-0 text-center mt-5">
                Hire vetted people you can trust
              </p>
              <div className="flex mt-12 justify-center">
                <form action="/catalogResult">
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
                    <button className="rounded-xl flex justify-center items-center bg-[#0F91D2] px-4 text-xl text-white py-2">
                      <FaSearch />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="myacontainer">
        <h2 className="text-lg mt-8">Filters</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 max-w-[800px] mt-2">
            <div className="me-3 my-1">
              <select
                name="budget"
                className="border w-full focus-none border-[#E4E4E4] rounded-lg px-3 py-2"
              >
                <option value="">Budget</option>
                <option value="50">Up to $50</option>
                <option value="100">Up to $100</option>
              </select>
            </div>
            <div className="me-3 my-1">
              <select
                name="reviews"
                className="border w-full focus-none border-[#E4E4E4] rounded-lg px-3 py-2"
              >
                <option value="">Reviews</option>
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
              </select>
            </div>
            <div className="me-3 my-1">
              <select
                name="deliveryTime"
                className="border w-full focus-none border-[#E4E4E4] rounded-lg px-3 py-2"
              >
                <option value="">Delivery Time</option>
                <option value="1">1 day</option>
                <option value="3">3 days</option>
              </select>
            </div>
            <div className="me-3 my-1">
              <select
                name="location"
                className="border w-full focus-none border-[#E4E4E4] rounded-lg px-3 py-2"
              >
                <option value="">Location/Distance</option>
                <option value="10">Within 10 miles</option>
                <option value="50">Within 50 miles</option>
              </select>
            </div>
          </div>
          <h2 className="text-xl font-semibold mt-5">Featured Deals</h2>
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
      </div>
    </>
  );
}

export default LandingPage;
