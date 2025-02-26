import React, { useEffect, useState, useRef } from "react";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import ServiceBox from "../../Components/ServiceBox";
import { Link } from "react-router-dom";
import HeroSection from "./HeroSection";
import userimg1 from "../../assets/img/client1.png";
import userimg2 from "../../assets/img/client2.png";
import cardvideo from "../../assets/img/cardvideo.mp4";
import slideimg from "../../assets/img/service1new.jpeg";
import Down from "../../assets/img/chevronDown.png";
const CommonDashboard = ({ orderto, conversationto, serviceDetailTo }) => {
  useEffect(() => {
    document.title = "Home";
  }, []);
  const services = [
    {
      id: 1,
      title: "Plumbing Service",
      price: 50,
      description: "Fix your leaking pipes and taps.",
      tags: ["Plumbing", "Repair"],
      image: "",
      publish: 2,
      userimg: userimg2,
      username: "Julia Maria",
      Rating: 4.5,
      Liked: true,
      videos: [cardvideo, cardvideo],
      images: [slideimg, slideimg, slideimg, slideimg],
      totalReviews: 2500,
    },
    {
      id: 2,
      title: "House Cleaning",
      price: 30,
      description: "Professional house cleaning services.",
      tags: ["Cleaning", "Home"],
      image: "",
      publish: 2,
      userimg: userimg1,
      username: "John Doe",
      Rating: 4.9,
      Liked: false,
      videos: [cardvideo, cardvideo],
      images: [slideimg, slideimg, slideimg, slideimg],
      totalReviews: 2500,
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
    <div>
      <div className="">
        <HeroSection />
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
                <Link
                  to={orderto}
                  className="underline text-[#000] flex items-cneter text-sm gap-x-1"
                >
                  See Order History <FaArrowRight className="text-xs mt-1" />
                </Link>
              </div>
            </div>
          </div>
          <div className="border rounded-2xl p-4">
            <h4 className="font-medium text-xl">Recent Conversations</h4>
            <Link
              to={conversationto}
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
            serviceDetailTo={serviceDetailTo}
            publish={service.publish}
            userimg={service.userimg}
            username={service.username}
            Rating={service.Rating}
            Liked={service.Liked}
            videos={service.videos}
            imgs={service.images}
            totalReviews={service.totalReviews}
          />
        ))}
      </div>
    </div>
  );
};

export default CommonDashboard;
