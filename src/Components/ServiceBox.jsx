import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import defaultimg from "../assets/img/service1new.jpeg";
import defaultuser from "../assets/img/client1.png";
import { FaEllipsisV, FaHeart, FaStar } from "react-icons/fa";
import ServiceSlider from "./ServiceSlider";

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
        <div className="text-sm text-[#535862] mt-4">
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
      </div>
    </div>
  );
}

export default ServiceBox;
