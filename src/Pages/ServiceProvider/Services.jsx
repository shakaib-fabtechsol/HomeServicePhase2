import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import ServiceBox from "../../Components/ServiceBox";
import Loader from "../../Components/MUI/Loader"; // Import Loader

import axios from "axios";
import { useSelector } from "react-redux";

function Services() {
  useEffect(() => {
    document.title = "Services";
  }, []);

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [services, setServices] = useState([]);

  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true); // Show loader before fetching data

    axios
      .get("https://marketplace.thefabulousshow.com/api/Deals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setServices(response.data.deals);
        setLoading(false); // Hide loader after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching deals:", error);
        setLoading(false); // Hide loader even if there's an error
      });
  }, []);

  const filteredServices = services?.filter((service) =>
    service?.service_title?.toLowerCase().includes(searchQuery.toLowerCase())
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

      
        {loading ? (
          <div className="flex justify-center items-center mt-7">
            <Loader />
          </div>
        ) : (
          <div className="grid mt-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <ServiceBox
                  key={service.id}
                  title={service.service_title}
                  price={
                    service.pricing_model === "Flat"
                      ? service.flat_rate_price
                      : service?.pricing_model === "Hourly"
                      ? service.hourly_final_list_price
                      : service.price1
                  }
                  tags={service.search_tags}
                  image={service.images}
                  publish={service.publish}
                  userimg={service.personal_image}
                  username={service.user_name}
                  description={service.service_description}
                  cateogory={service.service_category}
                  dealid={service.id}
                  Rating={service.rating}
                  Liked={service.Liked}
                  serviceDetailTo={`/provider/dealDetails/${service.id}`}
                  videos={service.videos}
                  imgs={service.personal_image}
                  Days={
                    service.pricing_model === "Flat"
                      ? service.flat_estimated_service_time
                      : service?.pricing_model === "Hourly"
                      ? service.hourly_estimated_service_time
                      : service.estimated_service_timing
                  }
                  totalReviews={service.totalReviews}
                />
              ))
            ) : (
              <p>No services found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Services;
