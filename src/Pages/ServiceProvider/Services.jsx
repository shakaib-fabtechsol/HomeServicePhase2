import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import ServiceBox from "../../Components/ServiceBox";
import user1 from "../../assets/img/client2.png";
import user2 from "../../assets/img/client3.png";

function Services() {
  useEffect(() => {
    document.title = "Services";
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const services = [
    {
      id: 1,
      title: "Plumbing Service",
      price: 50,
      description: "Fix your leaking pipes and taps.",
      tags: ["Plumbing", "Repair"],
      image: "",
      rating: 4.3,
      Liked: true,
      userimg: user1,
      username: "John Doe",
      publish: 1,
    },
    {
      id: 2,
      title: "House Cleaning",
      price: 30,
      description: "Professional house cleaning services.",
      tags: ["Cleaning", "Home"],
      image: "",
      rating: 4.3,
      Liked: true,
      userimg: user2,
      username: "Julia Maria",
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

      <div className="btm mt-3">
        {/* Search Input */}
        <div className="md:flex justify-between items-center">
          <div className="flex w-full max-w-[300px] border rounded-lg items-center px-2">
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

        <div className="grid mt-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
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
                userimg={service.userimg}
                username={service.username}
                Rating={service.rating}
                Liked={service.Liked}
                serviceDetailTo="/provider/dealdetails"
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
