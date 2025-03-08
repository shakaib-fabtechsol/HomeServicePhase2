import React, { useEffect, useState, useRef } from "react";
import { useGetlandingpageQuery } from "../services/dashboard";
import ServiceBox from "../Components/ServiceBox";
import HeroSection from "../Components/Common/HeroSection";
import Loader from "../Components/MUI/Loader";
import Down from "../assets/img/chevronDown.png";

function LandingPage() {
  useEffect(() => {
    document.title = "Landing Page";
  }, []);

  
  // Filter States
  const [budget, setBudget] = useState("");
  const [distance, setDistance] = useState("");
  const [selectedReviews, setSelectedReviews] = useState("");
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState("");

  const { data, isLoading } = useGetlandingpageQuery({  reviews: selectedReviews || "", estimate_time: selectedDeliveryTime || "", distance: distance || "", budget: budget || "" });
  
  // Dropdown states
  const [isBudgetDropdownOpen, setIsBudgetDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  const budgetDropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        budgetDropdownRef.current &&
        !budgetDropdownRef.current.contains(event.target) &&
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target)
      ) {
        setIsBudgetDropdownOpen(false);
        setIsLocationDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter Options
  const reviewOptions = [
    { value: "", label: "All" },
    { value: "1", label: "1 Star" },
    { value: "2", label: "2 Stars" },
    { value: "3", label: "3 Stars" },
    { value: "4", label: "4 Stars" },
    { value: "5", label: "5 Stars" },
  ];
  // "Same day",
  // "2 days",
  // "3 days",
  // "1 week",
  // "2 weeks",
  const deliveryOptions = [
    { value: "", label: "All Delivery Times" },
    { value: "Same day", label: "Same day" },
    { value: "2 days", label: "2 days" },
    { value: "3 days", label: "3 days" },
    { value: "1 week", label: "1 week" },
    { value: "2 weeks", label: "2 weeks" },,
  ];

  // Function to apply filters
  const filteredDeals = data?.deals?.filter(service => {
    return (
      (!budget || service.flat_rate_price <= budget) &&
      (!distance || service.distance <= distance) &&
      (!selectedReviews || service.rating >= parseFloat(selectedReviews)) &&
      (!selectedDeliveryTime || service.estimated_service_timing <= selectedDeliveryTime)
    );
  });

  return (
    <>
      <div className="mycontainer">
        <HeroSection />
      </div>

      <div className="mycontainer">
        <h2 className="text-lg mt-8">Filters</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 max-w-[800px] mt-2">
          
          {/* Budget Filter */}
          <div ref={budgetDropdownRef} className="relative">
            <button
              onClick={() => setIsBudgetDropdownOpen(prev => !prev)}
              className="border w-full text-start focus-none border-gray-300 rounded-lg px-3 py-2"
            >
              Budget
            </button>
            {isBudgetDropdownOpen && (
              <div className="absolute w-full top-full left-0 border p-2 bg-white rounded-md shadow-md">
                <div className="text-center text-gray-700 text-sm font-medium">
                  {budget ? `$${budget}` : "Any Budget"}
                </div>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Reviews Filter */}
          <div className="relative">
            <select
              value={selectedReviews}
              onChange={(e) => setSelectedReviews(e.target.value)}
              className="border w-full focus-none border-gray-300 rounded-lg px-3 py-2"
            >
              {reviewOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Delivery Time Filter */}
          <div className="relative">
            <select
              value={selectedDeliveryTime}
              onChange={(e) => setSelectedDeliveryTime(e.target.value)}
              className="border w-full focus-none border-gray-300 rounded-lg px-3 py-2"
            >
              {deliveryOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Location/Distance Filter */}
          <div ref={locationDropdownRef} className="relative">
            <button
              onClick={() => setIsLocationDropdownOpen(prev => !prev)}
              className="border w-full text-start focus-none border-gray-300 rounded-lg px-3 py-2"
            >
              Location/Distance
            </button>
            {isLocationDropdownOpen && (
              <div className="absolute w-full top-full left-0 border p-2 bg-white rounded-md shadow-md">
                <div className="text-center text-gray-700 text-sm font-medium">
                  {distance ? `${distance} km` : "Any Distance"}
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>

        {/* Services List */}
        <h2 className="text-xl font-semibold mt-5">All Deals</h2>
        <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {isLoading ? (
            <Loader />
          ) : filteredDeals?.length > 0 ? (
            filteredDeals.map((service) => (
              <ServiceBox
                key={service.id}
                title={service.service_title}
                price={service.flat_rate_price}
                tags={service.search_tags}
                image={service.images}
                publish={service.publish}
                userimg={service.personal_image}
                username={service.user_name}
                description={service.service_description}
                category={service.service_category}
                dealid={service.id}
                Rating={service.rating}
                Liked={service.Liked}
                serviceDetailTo={`/dealDetails/${service.id}`}
                videos={service.videos}
                imgs={service.personal_image}
                Days={service.estimated_service_timing}
                totalReviews={service.totalReviews}
              />
            ))
          ) : (
            <p>No services found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default LandingPage;

