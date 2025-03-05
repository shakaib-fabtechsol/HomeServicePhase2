import React, { useEffect, useState } from "react";
import ServiceBox from "../ServiceBox";
import { CiBoxList, CiGrid41 } from "react-icons/ci";

import user2 from "../../assets/img/client3.png";
import cardvideo from "../../assets/img/cardvideo.mp4";
import slideimg from "../../assets/img/service1new.jpeg";


const CommonFavorites = ({ serviceDetailTo }) => {
  useEffect(() => {
    document.title = "Favourites";
  }, []);
  const [viewMode, setViewMode] = useState("grid");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const services = [
    {
      id: 1,
      title: "Plumbing Service",
      price: 50,
      description: "Fix your leaking pipes and taps.",
      tags: ["Plumbing", "Repair"],
      image: "",
      username: "John Doe",
      userimg: user2,
      publish: 1,
      Liked: true,
      Rating: 4.5,
      videos: [cardvideo, cardvideo],
      images: [slideimg, slideimg, slideimg, slideimg],
      totalReviews: 2600,
    },
    
  ];

  return (
    <div>
      <div className="flex items-center justify-between my-2">
        <div>
          <h2 className="font-semibold text-xl sm:text-3xl">My Favorites</h2>
          <p className="text-gray-600">
            Track and manage your favorite services.
          </p>
        </div>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="p-2 flex items-center justify-center w-[135px] border rounded-xl"
          >
            {viewMode === "grid" ? (
              <CiGrid41 className="mr-2" />
            ) : (
              <CiBoxList className="mr-2" />
            )}{" "}
            {viewMode === "grid" ? "Grid View" : "List View"}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded w-full z-[99]">
              <button
                onClick={() => {
                  setViewMode("grid");
                  setDropdownOpen(false);
                }}
                className="flex justify-center items-center px-4 py-2 w-full text-left hover:bg-gray-100"
              >
                <CiGrid41 className="mr-2" /> Grid View
              </button>
              <button
                onClick={() => {
                  setViewMode("list");
                  setDropdownOpen(false);
                }}
                className="flex justify-center items-center px-4 py-2 w-full text-left hover:bg-gray-100"
              >
                <CiBoxList className="mr-2" /> List View
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4"
            : "flex flex-col gap-4"
        }
      >
        {services.length > 0 ? (
          services.map((service) => (
            <ServiceBox
              key={service.id}
              title={service.title}
              price={service.price}
              description={service.description}
              tags={service.tags}
              image={service.image}
              serviceDetailTo={serviceDetailTo}
              publish={service.publish}
              username={service.username}
              userimg={service.userimg}
              Liked={service.Liked}
              Rating={service.Rating}
              videos={service.videos}
              imgs={service.images}
              totalReviews={service.totalReviews}
              className={
                viewMode === "list"
                  ? "flex flex-row items-center gap-4 p-4 border rounded"
                  : ""
              }
            />
          ))
        ) : (
          <p>No favorites found</p>
        )}
      </div>
    </div>
  );
};

export default CommonFavorites;
