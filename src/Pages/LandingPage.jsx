import React, { useEffect, useState, useRef } from "react";
import { useGetlandingpageQuery } from "../services/dashboard";
import ServiceBox2 from "../Components/ServiceBox2";
import HeroSection from "../Components/Common/HeroSection";
import Down from "../assets/img/chevronDown.png";
import axios from "axios";
import {useSelector} from "react-redux";
function LandingPage() {
  useEffect(() => {
    document.title = "Landing Page";
  }, []);
 
  const token = useSelector((state) => state.auth.token);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState([]);
  useEffect(() => {
    setLoading(true);

    axios
      .get("https://marketplace.thefabulousshow.com/api/Deals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setServices(response.data.deals);
        console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching deals:", error);
        setLoading(false);
      });
  }, []);

  const [Budget, setBudget] = useState(100);
  const [distance, setDistance] = useState(10);

  const [isBudgetDropdownOpen, setIsBudgetDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  const budgetDropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);

  const toggleBudgetDropdown = () => {
    setIsBudgetDropdownOpen((prev) => !prev);
  };

  const toggleLocationDropdown = () => {
    setIsLocationDropdownOpen((prev) => !prev);
  };

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

  const selects = [
    {
      name: "Reviews",
      id: "Reviews",
      options: [
        { value: "", label: "Reviews" },
        { value: "b3", label: "Below 3 Stars" },
        { value: "3p", label: "3+ Stars" },
        { value: "4p", label: "4+ Stars" },
        { value: "5", label: "5 Stars" },
      ],
    },
    {
      name: "deliveryTime",
      id: "deliveryTime",
      options: [
        { value: "", label: "Delivery Time" },
        { value: "b3", label: "Emergency | Same Day" },
        { value: "3p", label: "Rush | 1-2 day" },
        { value: "4p", label: "Fast | 3-5 Days" },
        { value: "5", label: "Standard | 1-2 Weeks" },
        { value: "5", label: "Scheduled | 2-4 Weeks" },
        { value: "5", label: "Backlog | 1 month+" },
      ],
    },
  ];

  useEffect(() => {
    if (services.length > 0) {
      setLoading(false);
    }
  }, [services]);

  return (
    <>
      
      <div className="">
        <div className="mycontainer">
          <HeroSection />
        </div>
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
       
        <h2 className="text-xl font-semibold mt-5">All Deals</h2>
        <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {isLoading ? (
            <Loader />
          ) : filteredDeals?.length > 0 ? (
            filteredDeals.map((service) => (
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
            <p>No services found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default LandingPage;
