import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import defaultuser from "../assets/img/client1.png";
import { FaEllipsisV, FaStar, FaCalendarAlt } from "react-icons/fa";
import ServiceSlider from "./ServiceSlider";
import {useSelector} from "react-redux";
import {useFavouriteMutation} from "../../src/services/sales/index"
function ServiceBox({
  tags = [],
  image,
  publish,
  title,
  dealid,
  price,
  serviceDetailTo,
  review,
  userimg,
  username,
  Rating,
  Liked = false,
  videos = "",
  imgs = "",
  Days,
  totalReviews = 0,
}) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(Liked);
  const user=useSelector((state)=>state.auth.user);


  const [favourite] = useFavouriteMutation();


  const handleFavourite = async () => {
   
    const payload = {
      
      deal_id:dealid,
      user_id:user?.id, 
     
    };
  
    try {
      await favourite(payload).unwrap();
      setLiked(!liked);
    } catch (error) {
      console.error("Favourite action failed", error);
    }
  };
  const parseJsonArray = (data) => {
    try {
      return typeof data === "string"?JSON.parse(data) : data;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return [];
    }
  };
  const defaultImage = "/service1.png"; 

  const image2 = userimg 
  ? `https://marketplace.thefabulousshow.com/uploads/${userimg}` 
  : defaultImage;

  const imageArray = parseJsonArray(image);
  const videoArray = parseJsonArray(videos);
 

  const mediaSet = new Set([
    ...(imageArray?.length
      ? imageArray.map(
          (img) => `https://marketplace.thefabulousshow.com/uploads/${img}`
        )
      : []),
    ...(videoArray?.length
      ? videoArray.map(
          (vid) => `https://marketplace.thefabulousshow.com/uploads/${vid}`
        )
      : []),
  ]);

  const mediaItems = mediaSet.size ? Array.from(mediaSet) : [defaultImage];
  

 

    
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="relative px-3 pt-3">
        <ServiceSlider mediaItems={mediaItems} />

        <div
         onClick={(e) => {
          e.stopPropagation();
          handleFavourite();
        }}
          className="absolute top-5 left-6 z-10"
        >
         <button
      onClick={() => {
        setLiked(!liked);
        navigate('/customer/favourites');
      }}
    >
            
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
      </div>
     
      <div
        onClick={() => {console.log(serviceDetailTo); navigate(serviceDetailTo)}}
        className="px-3 pb-3 cursor-pointer"
      >
        <div className="flex items-center justify-between">
         
          <div className="flex items-center gap-2">
            <img
              className="size-8 rounded-full object-cover"
              src={image2}
              alt="User"
            />
            <p className="text-sm font-semibold">{username || "User Name"}</p>
          </div>
        
          <div className="flex items-center gap-1">
            <FaStar className="text-[#F6AD3C]" />
            <p className="text-sm">{Rating || 2}</p>
            {totalReviews > 0 && (
              <p className="text-xs text-[#181D27]">
                (
                {totalReviews > 999
                  ? `${(totalReviews / 1000).toFixed(1)}K`
                  : totalReviews}
                )
              </p>
            )}
          </div>
        </div>
      
        <div className="flex justify-between items-center mt-2">
          <h2 className="text-lg font-semibold">{title ?? "N/A"}</h2>
          <p className="text-lg font-extrabold">{price ?? "N/A"}</p>
        </div>
       
        <div className="flex flex-wrap items-center justify-between text-sm text-[#535862] mt-4">
          <div>
            {tags}
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="text-[#0F91D2] text-[14px] mx-1" />
            <span className="text-[#717171]">{Days ?? "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceBox;
