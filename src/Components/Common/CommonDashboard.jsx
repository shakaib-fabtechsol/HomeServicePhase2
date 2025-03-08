import React, { useEffect, useState, useRef } from "react";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import ServiceBox from "../../Components/ServiceBox";
import { Link } from "react-router-dom";
import HeroSection from "./HeroSection";
import { useGethomeorderQuery, useGetrecentdealsQuery } from "../../services/dashboard";
import Loader from "../MUI/Loader";
import { useSelector } from "react-redux";
const CommonDashboard = ({ orderto, conversationto}) => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  const { data: orderData, isLoading} = useGetrecentdealsQuery();
  const { data: orderInprogress, isLoading: homeorderloading } = useGethomeorderQuery()
  const role = useSelector((state) => state.auth.user);
  console.log("role", role?.role);


  const getBgColor = (status) => {
    switch (status) {
      case "new":
        return "#46D20F";
      case "pending":
        return "#FBBF24";
      case "scheduled":
        return "#8BC34A";
      case "in progress":
        return "#C8D20F";
      default:
        return "#CCCCCC";
    }
  };

  const redirectTo =
  role?.role === 1
    ? "/customer/dealDetails"
    : role?.role === 2
      ? "/provider/dealDetails"
      : role?.role === 3
        ? "/sales/recentdeals"
        : role?.role === 0
          ? "/superadmin/prodetails"
          : "/dealDetails";

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       budgetDropdownRef?.current &&
  //       !budgetDropdownRef?.current.contains(event.target) &&
  //       locationDropdownRef.current &&
  //       !locationDropdownRef.current.contains(event.target)
  //     ) {
  //       setIsBudgetDropdownOpen(false);
  //       setIsLocationDropdownOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);



  if(isLoading || homeorderloading){
    return <Loader/>
  }


  return (
    <div>
      <div className="">
        <HeroSection />

      </div>

      <div>
        <div className="grid lg:grid-cols-2 gap-4 mt-4">
          <div className="border rounded-xl">
            <div className="bg-[#00000014] p-4 rounded-t-xl">
              <h6 className="text-center">Active Orders</h6>
            </div>
            {orderInprogress?.activeOrders?.length ? <div className="p-3 grid grid-cols-1 gap-4">
              {orderInprogress?.activeOrders?.map((project, index) => (
                <div
                  key={index}
                  className="flex sm:flex-row flex-col justify-between sm:items-center border p-3 rounded-xl"
                >
                  <div>
                    <h5 className="text-[#00000091] text-xs">
                      {project?.notes}
                    </h5>
                  </div>
                  <div className="flex justify-end sm:mt-0 mt-4">
                    <p
                      className="w-[98px] text-center max-w-[98px] py-2 px-2 text-xs"
                      style={{ backgroundColor: getBgColor(project?.status) }}
                    >
                      {project?.status}
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
            </div> : <p className="text-center"> Not forund</p>}
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
        {orderData?.recentDeal?.length > 0 ? (
         orderData?.recentDeal?.map((service) => (
              <ServiceBox
                key={service.id}
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
                category={service.service_category}
                dealid={service.id}
                Rating={service.rating}
                Liked={service.Liked}
                serviceDetailTo={`${redirectTo}/${service.id}`}
                videos={service.videos}
                imgs={service.images}
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
          <p>No services found</p>
        )}
      </div>
    </div>
  );
};

export default CommonDashboard;
