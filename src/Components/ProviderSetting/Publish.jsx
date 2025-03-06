import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import AccordionComponent from "../../Components/AccordionComponent";
import { IoLocationOutline } from "react-icons/io5";
import provider from "../../assets/img/provider.png";
import { IoIosStar } from "react-icons/io";
import AboutVideo from "../AdditionalPhoto/AboutVideo";
import TechnicalPhoto from "../AdditionalPhoto/TechnicalPhoto";
import VehiclePhoto from "../AdditionalPhoto/VehiclePhoto";
import FacilityPhoto from "../AdditionalPhoto/FacilityPhoto";
import ProjectPhoto from "../AdditionalPhoto/ProjectPhoto";
import License from "../AdditionalPhoto/License";
import Award from "../AdditionalPhoto/Award";
import Insurance from "../AdditionalPhoto/Insurance";
import RegularHour from "../AdditionalPhoto/RegularHour";
import SpecialHour from "../AdditionalPhoto/specialHour";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import { useGetMyDetailsQuery} from "../../services/settings";
import {
  usePublishDealMutation,
} from "../../services/base-api/index";
import { useState } from "react";
export default function Publish() {
  const navigate=useNavigate();
 const { data: userData, } = useGetMyDetailsQuery();
 const user=useSelector((state)=>state.auth.user);
 const dealid = localStorage.getItem("deal_id");
 const token=useSelector((state)=>state.auth.token);
 const [loading, setLoading] = useState(false);
 const [formData, setFormData] = useState({});
  const [publishDeal] = usePublishDealMutation();
  const [publishValue, setPublishValue] = useState(1);
  const accordionData = [
    {
      title: "About Us Video",
      content: (
        <AboutVideo about_video={userData?.businessProfile[0]?.about_video} />
      ),
    },
    {
      title: "Technician Photos",
      content: (
        <TechnicalPhoto
          technician_photo={userData?.businessProfile[0]?.technician_photo}
        />
      ),
    },
    {
      title: "Vehicle Photos",
      content: (
        <VehiclePhoto
          vehicle_photo={userData?.businessProfile[0]?.vehicle_photo}
        />
      ),
    },
    {
      title: "Facility Photos",
      content: (
        <FacilityPhoto
          facility_photo={userData?.businessProfile[0]?.license_certificate}
        />
      ),
    },
    {
      title: "Project Photos",
      content: (
        <ProjectPhoto
          project_photo={userData?.businessProfile[0]?.project_photo}
        />
      ),
    },
    {
      title: "Licences",
      content: (
        <License
          license_photo={userData?.businessProfile[0]?.license_certificate}
        />
      ),
    },
    {
      title: "Awards",
      content: (
        <Award
          award_certificate={userData?.businessProfile[0]?.award_certificate}
        />
      ),
    },
    {
      title: "Insurance",
      content: (
        <Insurance
          insurance_photo={userData?.businessProfile?.insurance_certificate}
        />
      ),
    },
    {
      title: "Regular Hours of Operation",
      content: (
        <RegularHour  />
      ),
    },
    {
      title: "Special Hours of Operation",
      content: (
        <SpecialHour  />
      ),
    },
    {
      title: "Social",
      content: (
        <div className="p-4">
          {userData?.social && (
            <div className="space-y-2">
              {userData.social.facebook && (
                <p>Facebook: {userData.social.facebook}</p>
              )}
              {userData.social.twitter && (
                <p>Twitter: {userData.social.twitter}</p>
              )}
              {userData.social.instagram && (
                <p>Instagram: {userData.social.instagram}</p>
              )}
              {userData.social.linkedin && (
                <p>LinkedIn: {userData.social.linkedin}</p>
              )}
              {userData.social.youtube && (
                <p>YouTube: {userData.social.youtube}</p>
              )}
              {userData.social.google_business && (
                <p>Google Business: {userData.social.google_business}</p>
              )}
            </div>
          )}
        </div>
      ),
    },
  ];



  const regularHours =
  userData && userData?.businessProfile[0]?.regular_hour
    ? JSON.parse( userData?.businessProfile[0]?.regular_hour|| "[]")
    : [];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const currentDay = days[new Date().getDay()];
const currentDayData = regularHours.find(
  (item) => item.day_name === currentDay
);


const handleSubmit = async (e) => {
  e.preventDefault();
  if (loading) return;

  if (!dealid) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Service ID is required!",
    });
    return;
  }

  setLoading(true);

  if (!token) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No token found. Please log in.",
    });
    setLoading(false);
    return;
  }

  try {
    const response = await publishDeal({ deal_id: dealid }).unwrap();
    console.log(response,"value");
   
    if (response?.deal?.publish === 1) {
      setFormData((prev) => ({ ...prev, publish: response?.deal?.publish }));
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.message || "Deal updated successfully.",
        confirmButtonColor: "#0F91D2",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: response.message || "Failed to update deal.",
        confirmButtonColor: "#D33",
      });
    }
  } catch (error) {
    console.error("Error updating deal:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "There was an error updating the deal.",
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <div className="mt-4">
        <div className="flex flex-wrap items-center">
          <img
            src={
              import.meta.env.VITE_BASE_URL +
                "uploads/" +
                userData?.businessProfile[0]?.business_logo || provider
            }
            alt=""
            className="me-2 my-2 rounded-lg max-w-[120px]"
          />
          <div className="my-2">
            <div className="flex items-center">
              <p className="font-semibold myhead me-2">
                {userData?.businessProfile[0]?.business_name || userData?.name}
              </p>
              <div className="flex ms-3">
                <IoIosStar className="me-1 text-[#F8C600]" />
                <div className="flex flex-wrap">
                  <span className="myhead text-xs font-semibold me-1">4.9</span>
                  <p className="text-[#181D2766] underline text-xs">(457)</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap mt-2">
              <p className="myblack pe-3 me-3 border-e">
                {userData?.businessProfile[0]?.business_primary_category ||
                  "Not specified"}
              </p>
              <div className="flex items-center">
                <IoLocationOutline className="me-2 myblack" />
                <p className="myblack ">
                  {userData?.businessProfile[0]?.business_location ||
                    "Location not set"}
                </p>
              </div>
            </div>
            <div className="flex mt-2 items-center">
                               <div className="flex me-2">
                                 <FaRegCalendarAlt className="me-2" />
                                 <p className="text-sm myblack">
                                   {currentDayData ? (
                                     <>{currentDayData.day_name}:&nbsp;</>
                                   ) : (
                                     "No data available for today."
                                   )}
                                 </p>
                                 <p className="text-sm text-[#34A853] font-[300]">
                                   {currentDayData?.day_status === "open"
                                     ? "Available"
                                     : "Unavailable"}
                                 </p>
                                 <p className="text-sm ml-2 lg:ml-10 myblack">
                                   {currentDayData?.day_status === "open" ? (
                                     <>
                                       Closed {currentDayData.regular_hour[0].end_time}{" "}
                                       {currentDayData.regular_hour.end_time?.includes(
                                         "AM"
                                       ) ||
                                       currentDayData.regular_hour[0].end_time?.includes(
                                         "PM"
                                       )
                                         ? ""
                                         : currentDayData.regular_hour[0].end_time >= 12
                                           ? "PM"
                                           : "AM"}
                                     </>
                                   ) : (
                                     "Closed"
                                   )}
                                 </p>
                               </div>
                             </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-medium myhead">About Me</h2>
        <p className="text-[#535862] mt-3">
          {userData?.businessProfile[0]?.about || "No description available"}
        </p>
      </div>

      <div className="mt-5">
        <h4 className="font-medium text-[#181D27] text-lg">
          Secondary Business Categories
        </h4>
        <div className="flex flex-wrap gap-2 items-center mt-3">
          {userData?.businessProfile[0]?.business_secondary_categories ? (
            userData.businessProfile[0].business_secondary_categories
              .split(",")
              .map((item, index) => (
                <p
                  className="text-sm font-medium bg-[#3434341A] px-3 py-1 text-center w-[max-content] rounded-full"
                  key={index}
                >
                  {item.trim()}
                </p>
              ))
          ) : (
            <p className="text-sm text-gray-500">
              No secondary categories specified
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="font-medium text-2xl">Additional Photos</h3>
        <div className="mt-3">
          <AccordionComponent items={accordionData} />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
            <div className="col-span-12 mt-4 flex justify-end">
              <input
                type="text"
                id="Flatr"
                defaultValue={user?.id ? `${user.id}` : "0"}
                className="focus-none border hidden"
                readOnly
              />
              <input
                type="text"
                id="publish"
                value={publishValue}
                className="focus-none border hidden"
                readOnly
              />
              <button
                type="button"
                className="border rounded-lg w-[150px] py-[10px] mr-4 font-semibold bg-white"
                onClick={() => navigate("/somewhere")} // Navigate on cancel
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="border rounded-lg w-[150px] py-[10px] text-white font-semibold bg-[#0F91D2]"
              >
                {loading ? "Publishing..." : "Publish"}
              </button>
            </div>
          </form>
    </div>
  );
}
