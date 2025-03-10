import React, { useEffect, useState } from "react";
import ServiceBox2 from "../ServiceBox2";
import { CiBoxList, CiGrid41 } from "react-icons/ci";
import {useGetFavouriteQuery} from '../../services/sales/index';
import { useSelector } from "react-redux";

const CommonFavorites = () => {
  useEffect(() => {
    document.title = "Favourites";
  }, []);
  const [viewMode, setViewMode] = useState("grid");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: orderD, } = useGetFavouriteQuery(); 

  const services = orderD?.deals; 
  
  console.log(services);
 const {user} = useSelector((state) => state.auth);

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
        {services?.length > 0 ? (
          services.map((service) => (
            <ServiceBox2
            key={service.id}
            serviceDetailTo={`${user?.role === 1 ? "/customer" : "/provider" }/dealDetails/${service?.id}`}
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
            userimg={service.userimg}
            username={service.user_name}
            description={service.service_description}
            cateogory={service.service_category}
            dealid={service.id}
            Rating={service.rating}
            Liked={service.Liked}
            videos={service.videos}
            imgs={service.personal_image
            }
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
          <p>No favorites found</p>
        )}
      </div>
    </div>
  );
};

export default CommonFavorites;
