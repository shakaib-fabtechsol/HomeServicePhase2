import React, { useRef } from "react";
import { useEffect, useState } from "react";
import ServiceBox from "../Components/ServiceBox";
import HeroSection from "../Components/Common/HeroSection";
import cardvideo from "../assets/img/cardvideo.mp4";
import slideimg from "../assets/img/service1new.jpeg";
import client1 from "../assets/img/client2.png";
import client2 from "../assets/img/client3.png";
import Down from "../assets/img/chevronDown.png";

function LandingPage() {
  useEffect(() => {
    document.title = "Landing Page";
  }, []);
  const services = [
    {
      id: 1,
      title: "Plumbing Service",
      price: 50,
      description: "Fix your leaking pipes and taps.",
      tags: ["Plumbing", "Repair"],
      image: "",
      videos: [cardvideo, cardvideo],
      images: [slideimg, slideimg, slideimg, slideimg],
      totalReviews: 400,
      rating: 4.3,
      username: "John Doe",
      userimg: client1,
      publish: 1,
    },
    {
      id: 2,
      title: "House Cleaning",
      price: 30,
      description: "Professional house cleaning services.",
      tags: ["Cleaning", "Home"],
      image: "",
      videos: [cardvideo, cardvideo],
      images: [slideimg, slideimg, slideimg, slideimg],
      totalReviews: 2000,
      rating: 4.3,
      username: "Julia",
      userimg: client2,
      publish: 0,
    },
    {
      id: 3,
      title: "House Cleaning",
      price: 30,
      description: "Professional house cleaning services.",
      tags: ["Cleaning", "Home"],
      image: "",
      videos: [cardvideo, cardvideo],
      images: [slideimg, slideimg, slideimg, slideimg],
      totalReviews: 500,
      rating: 4.3,
      username: "John Doe",
      userimg: client1,
      publish: 0,
    },
  ];

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
                serviceDetailTo="/dealdetails"
                videos={service.videos}
                imgs={service.images}
                userimg={service.userimg}
                username={service.username}
                Rating={service.rating}
                totalReviews={service.totalReviews}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
