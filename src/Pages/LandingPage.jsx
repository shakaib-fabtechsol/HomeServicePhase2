import React, { useRef } from "react";
import { useEffect, useState } from "react";
import ServiceBox from "../Components/ServiceBox";
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
      <div>
        <div className="mycontainer">
          <h2 className="text-lg mt-8">Filters</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 max-w-[800px] mt-2">
            <div ref={budgetDropdownRef} className="me-3 my-1 relative">
              <button
                onClick={toggleBudgetDropdown}
                className="border w-full text-start focus-none border-[#E4E4E4] rounded-lg px-3 py-2"
              >
                Budget
              </button>
              {isBudgetDropdownOpen && (
                <div className="absolute w-full top-full left-0 border p-2 bg-white rounded-[12px] shadow-md">
                  <div className="text-center text-gray-700 text-sm font-medium">
                    {Budget >= 10000
                      ? `${(Budget / 1000).toFixed(0)}K`
                      : Budget}{" "}
                    $
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    value={Budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full cursor-pointer custom-slider"
                  />
                </div>
              )}
            </div>
            {selects.map((select, index) => (
              <div key={index} className="me-3 my-1">
                <select
                  name={select.name}
                  id={select.id}
                  style={{
                    backgroundImage: `url(${Down})`,
                    backgroundPosition: "calc(100% - 5px)",
                  }}
                  className="border w-full focus-none border-[#E4E4E4] rounded-lg px-3 py-2 appearance-none bg-no-repeat pe-5"
                >
                  {select.options.map((option, index) => (
                    <option
                      className="first:hidden"
                      key={index}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <div ref={locationDropdownRef} className="me-3 my-1 relative">
              <button
                onClick={toggleLocationDropdown}
                className="border text-start w-full focus-none border-[#E4E4E4] rounded-lg px-3 py-2"
              >
                Location/Distance
              </button>
              {isLocationDropdownOpen && (
                <div className="absolute w-full top-full left-0 border p-2 bg-white rounded-[12px] shadow-md">
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
          <h2 className="text-xl font-semibold mt-5">Recent Deals</h2>
          <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
    {loading  ? (
      <div className="w-full flex justify-center items-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    ) : services.length > 0 ? (
      services.map((service) => (
        <ServiceBox
          key={service.id}
          title={service.service_title}
          price={
            service.pricing_model === "Flat"
              ? service.flat_rate_price
              : service?.pricing_model == "Hourly"
              ? service.hourly_final_list_price
              : service.price1
          }
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
          serviceDetailTo={`/provider/dealDetails/${service.id}`}
          videos={service.videos}
          imgs={service.personal_image}
          Days={
            service.pricing_model === "Flat"
              ? service.flat_estimated_service_time
              : service?.pricing_model == "Hourly"
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
        </div>
      </div>
    
    </>
  );
}

export default LandingPage;
