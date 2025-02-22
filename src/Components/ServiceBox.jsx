import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import defaultimg from "../assets/img/service1new.jpeg";
import defaultuser from "../assets/img/client1.png";
import { FaEllipsisV, FaHeart, FaStar } from "react-icons/fa";
import ServiceSlider from "./ServiceSlider";
import { FaCalendarAlt } from "react-icons/fa";

function ServiceBox({
  tags = [],
  image,
  publish,
  title,
  price,
  description,
  serviceDetailTo,
  review,
  userimg,
  username,
  Rating,
  Liked = false,
  videos,
  imgs,
}) {
  const imageToShow = image || defaultimg;
  const stopPropagation = (event) => {
    event.stopPropagation();
  };
  const navigate = useNavigate();
  const [liked, setLiked] = useState(Liked);

  return (
    <div className="border rounded-lg">
      <div className="px-3 pt-3">
        <div className="relative">
          <ServiceSlider dealsVideo={videos} dealslidedata={imgs} />
          <div onClick={stopPropagation} className="absolute top-2 left-2 z-10">
            <button
              onClick={() => setLiked(!liked)}
              style={{
                border: "1.5px solid",
                borderImageSource:
                  "linear-gradient(124.99deg, #FB8603 40.69%, #F7BC08 83.17%)",
                padding: "5px",
                background: "none",
                cursor: "pointer",
              }}
            >
              <FaHeart
                color={liked ? "#FB8603" : "none"}
                style={{
                  fill: liked ? "#FB8603" : "none",
                  stroke: "#F7BC08",
                  strokeWidth: 20,
                }}
              />
            </button>
          </div>
          <div className="absolute top-2 right-2">
            <button className="text-[rgba(255,255,255,0.6)] hover:text-[white]">
              <FaEllipsisV />
            </button>
          </div>
        </div>
      </div>
      <div
        onClick={() => navigate(serviceDetailTo)}
        className=" px-3 pb-3 cursor-pointer"
      >
        <div className="flex justify-between items-center mt-2">
          <h2 className="text-lg font-semibold">{title ?? "N/A"}</h2>
          <p className="mb-0 text-lg font-extrabold">${price ?? "N/A"}</p>
        </div>
        <p className="text-sm text-[#535862] mt-2">{description ?? "N/A"}</p>
        <div className="mt-4 flex items-center gap-2 justify-between">
          <div className="flex items-center gap-1">
            <img
              className="size-9 max-w-9 object-cover rounded-full"
              src={userimg || defaultuser}
              alt="Logo"
            />
            <p className="text-sm font-semibold">{username || "User Name"}</p>
          </div>
          <div className="flex items-center gap-1">
            <FaStar className="text-[#F6AD3C]" />
            <p className="text-sm">{Rating || 2}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between text-sm text-[#535862] mt-4">
         <div>
         {tags.length > 0
            ? tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm inline-block me-2 ${
                    index % 2 === 0
                      ? "bg-[#E7F4FB] text-[#0F91D2]"
                      : "bg-[#EBEBEB]"
                  }`}
                >
                  {tag}
                </span>
              ))
            : "No tags available"}
         </div>
         <div className="flex items-center">
              <span className="text-[#0F91D2]">Avg</span>
              <FaCalendarAlt className="text-[#0F91D2] text-[14px] mx-1"/>
              <span className="text-[#717171]">1 day</span>
         </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceBox;
