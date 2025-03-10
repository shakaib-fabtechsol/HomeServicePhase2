import React from "react";
import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import ServiceBox from "../Components/ServiceBox";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import cardvideo from "../assets/img/cardvideo.mp4";
import slideimg from "../assets/img/service1new.jpeg";
import client1 from "../assets/img/client2.png";
import client2 from "../assets/img/client3.png";

function CatalogResult() {
  useEffect(() => {
    document.title = "CatalogResults";
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
      totalReviews: 1500,
      username: "John Doe",
      userimg: client1,
      rating: 4.3,
      liked: true,
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
      totalReviews: 1500,
      username: "Julia Maria",
      userimg: client2,
      rating: 4.3,
      liked: true,
      publish: 0,
    },
    {
      id: 1,
      title: "Plumbing Service",
      price: 50,
      description: "Fix your leaking pipes and taps.",
      tags: ["Plumbing", "Repair"],
      image: "",
      videos: [cardvideo, cardvideo],
      images: [slideimg, slideimg, slideimg, slideimg],
      totalReviews: 1500,
      username: "John Doe",
      userimg: client1,
      rating: 4.3,
      liked: true,
      publish: 1,
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
      totalReviews: 1500,
      username: "John Doe",
      userimg: client1,
      rating: 4.3,
      liked: true,
      publish: 0,
    },
    {
      id: 4,
      title: "Plumbing Service",
      price: 50,
      description: "Fix your leaking pipes and taps.",
      tags: ["Plumbing", "Repair"],
      image: "",
      videos: [cardvideo, cardvideo],
      images: [slideimg, slideimg, slideimg, slideimg],
      totalReviews: 1500,
      username: "Julia Maria",
      userimg: client2,
      rating: 4.3,
      liked: true,
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
      totalReviews: 1500,
      username: "John Doe",
      userimg: client1,
      rating: 4.3,
      liked: true,
      publish: 0,
    },
  ];

  const [openAccordion, setOpenAccordion] = useState(null);
  const [distance, setDistance] = useState(10);
  const [Budget, setBudget] = useState(100);

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };
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
              <p className="text-sm text-[#757575]">60 results</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="max-[100%] md:max-w-[280px] mt-4 w-full">
              <div className="bg-[#F8F8F8] px-4 py-4 h-full rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Filters</h4>
                {/* Budget Accordion */}
                <div className="border-b">
                  <button
                    className="w-full flex justify-between items-center py-2 text-left "
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

                {/* Reviews Accordion */}
                <div className="border-b">
                  <button
                    className="w-full flex justify-between items-center py-2 text-left "
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
                      {["Below 3 Stars", "3+ Stars", "4+ Stars", "5 Stars"].map(
                        (label, index) => (
                          <label key={index} className="flex items-center">
                            <input type="checkbox" className="mr-2" /> {label}
                          </label>
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* Delivery Time Accordion */}
                <div className="border-b">
                  <button
                    className="w-full flex justify-between items-center py-2 text-left "
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
                        "Emergency | Same Day",
                        " Rush | 1-2 day",
                        "Fast | 3-5 Days",
                        "Standard | 1-2 Weeks",
                        "Scheduled | 2-4 Weeks",
                        "Backlog | 1 month+",
                      ].map((label, index) => (
                        <label key={index} className="flex items-center my-1">
                          <input
                            type="radio"
                            name="delivery"
                            className="mr-2"
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
                    className="w-full flex justify-between items-center text-left "
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
            <div className="filter-other ">
              <div className="grid mt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service, index) => (
                  <ServiceBox
                    key={index}
                    title={service.title}
                    price={service.price}
                    description={service.description}
                    tags={service.tags}
                    image={service.image}
                    publish={service.publish}
                    serviceDetailTo="/dealdetails"
                    videos={service.videos}
                    imgs={service.images}
                    username={service.username}
                    userimg={service.userimg}
                    Rating={service.rating}
                    Liked={service.rating}
                    totalReviews={service.totalReviews}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CatalogResult;
