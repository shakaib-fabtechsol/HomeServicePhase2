import React, { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import ServiceBox2 from "../Components/ServiceBox2";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { useGetservicebysearchQuery } from "../services/dashboard";
import Loader from "../Components/MUI/Loader";
import RemoteError from "../Components/Common/RemoteError";
import { useSelector } from "react-redux";

function CatalogResult() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const locationParam = searchParams.get("location");
  const serviceParam = searchParams.get("service");
  const [distance, setDistance] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedReviews, setSelectedReviews] = useState();
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState("");
  const { data, isLoading, isError, error, isFetching } = useGetservicebysearchQuery({ service: serviceParam || "", location: locationParam || "", reviews: selectedReviews || "", estimate_time: selectedDeliveryTime || "", distance: distance || "", budget: budget || "" });
  const role = useSelector((state) => state.auth.user);
  console.log("role", role?.role);
  useEffect(() => {
    document.title = "CatalogResults";
  }, []);

  const [openAccordion, setOpenAccordion] = useState(null);


  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const handleReviewChange = (review) => {
    setSelectedReviews(review)
  };

  const handleDeliveryTimeChange = (time) => {
    setSelectedDeliveryTime(time);
  };

  if (isError) {
    return <RemoteError hasError={isError} message={error?.message} />;
  }
  const redirectTo =
  role?.role === 1
    ? "/customer/dealDetails"
    : role?.role === 2
      ? "/provider/dealDetails"
      : role?.role === 3
        ? "/sales/dealdetails"
        : role?.role === 0
          ? "/superadmin/dealDetails"
          : "/";

  return (
    <>
      <div>
        <div className="container-fluid px-2">
          <div className="flex flex-col md:mt-8 md:flex-row justify-between">
            <div className="max-[100%] md:max-w-[280px] mt-2 w-full"></div>
            <div className="filter-other mt-5 md:mt-0">
              <p className="text-lg">
                Showing full catalog results, giving you the{" "}
                <b>widest variety</b> of <b>services</b>...{" "}
              </p>
              <p className="text-sm text-[#757575]">{data?.deals?.length || 0} results</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="max-[100%] md:max-w-[280px] mt-4 w-full">
              <div className="bg-[#F8F8F8] px-4 py-4 h-full rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Filters</h4>
                {/* Budget Accordion */}
                <div className="border-b">
                  <button
                    className="w-full flex justify-between items-center py-2 text-left"
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
                      <div className="text-center text-gray-700 text-sm font-medium">
                        {budget > 0 ? (budget >= 1000 ? `${(budget / 1000).toFixed(1)}K` : budget) : "0"} $

                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100000"
                        step="1"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-full cursor-pointer custom-slider"
                      />

                    </div>
                  )}
                </div>

                {/* Reviews Accordion */}
                <div className="border-b">
                  <button
                    className="w-full flex justify-between items-center py-2 text-left"
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
                      {["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"].map(
                        (label, index) => (
                          <label key={index} className="flex items-center">
                            <input
                              type="checkbox"
                              className="mr-2"
                              checked={selectedReviews === index + 1}
                              onChange={() => handleReviewChange(index + 1)}
                            />{" "}
                            {label}
                          </label>
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* Delivery Time Accordion */}
                <div className="border-b">
                  <button
                    className="w-full flex justify-between items-center py-2 text-left"
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
                      {[
                        "Same day",
                        "2 days",
                        "3 days",
                        "1 week",
                        "2 weeks",
                      ].map((label, index) => (
                        <label key={index} className="flex items-center my-1">
                          <input
                            type="radio"
                            name="delivery"
                            className="mr-2"
                            checked={selectedDeliveryTime === label}
                            onChange={() => handleDeliveryTimeChange(label)}
                          />{" "}
                          {label}
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Location Distance Accordion */}
                <div className="border-b py-2">
                  <button
                    className="w-full flex justify-between items-center text-left"
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
                        {distance > 0 ? `${distance} km` : "0 km"}

                      </div>
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        step="1"
                        value={distance}
                        onChange={(e) => setDistance(Number(e.target.value))}
                        className="w-full cursor-pointer custom-slider"
                      />

                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="filter-other">
              {(isFetching || isLoading) ? <Loader /> : (
                <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                  {data?.deals?.length > 0 ? (
                    data?.deals?.map((service) => (
                      <ServiceBox2
              key={service.id}
              title={service.service_title}
              price={
                service.flat_rate_price ||
                service.hourly_rate ||
                service.price1 ||
                "Price not available"
              }
              tags={service.search_tags}
              image={service.images}
              publish={service.publish}
              userimg={service.personal_image}
              username={service.user_name}
              description={service.service_description}
              cateogory={service.service_category}
              dealid={service.id}
              Rating={service.avg_rating}
              Liked={service.Liked}
              serviceDetailTo={`/dealDetails/${service.id}`}
              videos={service.videos}
              imgs={service.personal_image}
              Days={
                service.flat_estimated_service_time ||
                service.hourly_estimated_service_time ||
                service.estimated_service_timing1 ||
                "N/A"
              }
              totalReviews={service.total_reviews} 
            />
                    ))
                  ) : (
                    <div className="flex justify-center items-center w-full h-full">
                      <p>No services found</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CatalogResult;
