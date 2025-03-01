import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import defaultuser from "../assets/img/client1.png";
import { FaEllipsisV, FaStar } from "react-icons/fa";
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
  Days,
  totalReviews = 0,
}) {
  const stopPropagation = (event) => {
    event.stopPropagation();
  };
  const navigate = useNavigate();
  const [liked, setLiked] = useState(Liked);
  const imageUrl = image
  ? `https://marketplace.thefabulousshow.com/uploads/${image}`
  : null;


const imageToShow = imageUrl || defaultuser;

{
  console.log("publish", publish);
}
  return (
    <div className="border rounded-lg">
      <div className="px-3 pt-3">
        <div className="relative">
          <ServiceSlider dealsVideo={videos} dealslidedata={imageToShow} />
          <div onClick={stopPropagation} className="absolute top-2 left-2 z-10">
            <button onClick={() => setLiked(!liked)}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="heartGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="40.69%" stopColor="#FB8603" />
                    <stop offset="83.17%" stopColor="#F7BC08" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill={liked ? "url(#heartGradient)" : "none"}
                  stroke="url(#heartGradient)"
                  strokeWidth="2"
                />
              </svg>
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
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-1">
            <img
              className="size-8 max-w-8 object-cover rounded-full"
              src={imageToShow}
              alt="Logo"
            />
            <p className="text-sm font-semibold">{username || "User Name"}</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1">
              <FaStar className="text-[#F6AD3C]" />
              <p className="text-sm">{Rating || 2}</p>
            </div>
            {totalReviews > 0 && (
              <div>
                <p className="text-xs text-[#181D27]">
                  (
                  {totalReviews > 999
                    ? `${(totalReviews / 1000).toFixed(1)}K`
                    : totalReviews}
                  )
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <h2 className="text-lg font-semibold">{title ?? "N/A"}</h2>
          <p className="mb-0 text-lg font-extrabold">{price ?? "N/A"}</p>
        </div>
        <div className="flex flex-wrap items-center justify-between text-sm text-[#535862] mt-4">
          <div>
            {tags}
          </div>
          <div className="flex items-center">
            <span className="text-[#0F91D2]">Avg</span>
            <FaCalendarAlt className="text-[#0F91D2] text-[14px] mx-1" />
            <span className="text-[#717171]">{Days ??"N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceBox;
