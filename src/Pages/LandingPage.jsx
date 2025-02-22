import React from "react";
import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import ServiceBox from "../Components/ServiceBox";
import HeroSection from "../Components/Common/HeroSection";
import cardvideo from "../assets/img/cardvideo.mp4";
import slideimg from "../assets/img/service1new.jpeg";
import client1 from "../assets/img/client2.png";
import client2 from "../assets/img/client3.png";

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
      rating: 4.3,
      username: "John Doe",
      userimg: client1,
      publish: 0,
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
                serviceDetailTo="/dealdetails"
                videos={service.videos}
                imgs={service.images}
                userimg={service.userimg}
                username={service.username}
                Rating={service.rating}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
