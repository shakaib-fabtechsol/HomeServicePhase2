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

export default function Publish({handleTabChange}) {
  const userData = useSelector(state => state.auth.user);
  
  const accordionData = [
    { title: "About Us Video", content: <AboutVideo about_video={userData?.businessProfile?.about_video}/> },
    { title: "Technician Photos", content: <TechnicalPhoto technician_photo={userData?.businessProfile?.technician_photo}/> },
    { title: "Vehicle Photos", content: <VehiclePhoto vehicle_photo={userData?.businessProfile?.vehicle_photo}/> },
    { title: "Facility Photos", content: <FacilityPhoto facility_photo={userData?.businessProfile?.license_certificate}/> },
    { title: "Project Photos", content: <ProjectPhoto project_photo={userData?.businessProfile?.project_photo}/> },
    { title: "Licences", content: <License license_photo={userData?.businessProfile?.license_certificate}/> },
    { title: "Awards", content: <Award award_certificate={userData?.businessProfile?.award_certificate}/> },
    { title: "Insurance", content: <Insurance insurance_photo={userData?.businessProfile?.insurance_certificate}/> },
    { title: "Regular Hours of Operation", content: <RegularHour regular_hour={userData?.businessProfile?.regular_hour}/> },
    { title: "Special Hours of Operation", content: <SpecialHour special_hour={userData?.businessProfile?.special_hour}/> },
    { 
      title: "Social", 
      content: (
        <div className="p-4">
          {userData?.social && (
            <div className="space-y-2">
              {userData.social.facebook && <p>Facebook: {userData.social.facebook}</p>}
              {userData.social.twitter && <p>Twitter: {userData.social.twitter}</p>}
              {userData.social.instagram && <p>Instagram: {userData.social.instagram}</p>}
              {userData.social.linkedin && <p>LinkedIn: {userData.social.linkedin}</p>}
              {userData.social.youtube && <p>YouTube: {userData.social.youtube}</p>}
              {userData.social.google_business && <p>Google Business: {userData.social.google_business}</p>}
            </div>
          )}
        </div>
      )
    },
  ];

  const regularHours = userData?.businessProfile?.regular_hour ? JSON.parse(userData.businessProfile.regular_hour) : [];
  const currentDay = new Date().getDay();
  const todayHours = regularHours[currentDay === 0 ? 6 : currentDay - 1];

  return (
    <div>
      <div className="mt-4">
        <div className="flex flex-wrap items-center">
          <img
            src={import.meta.env.VITE_BASE_URL + "uploads/" + userData?.businessProfile?.business_logo || provider}
            alt=""
            className="me-2 my-2 rounded-lg max-w-[120px]"
          />
          <div className="my-2">
            <div className="flex items-center">
              <p className="font-semibold myhead me-2">{userData?.businessProfile?.business_name || userData?.name}</p>
              <div className="flex ms-3">
                <IoIosStar className="me-1 text-[#F8C600]" />
                <div className="flex flex-wrap">
                  <span className="myhead text-xs font-semibold me-1">4.9</span>
                  <p className="text-[#181D2766] underline text-xs">(457)</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap mt-2">
              <p className="myblack pe-3 me-3 border-e">{userData?.businessProfile?.business_primary_category || 'Not specified'}</p>
              <div className="flex items-center">
                <IoLocationOutline className="me-2 myblack" />
                <p className="myblack ">{userData?.businessProfile?.service_location || 'Location not set'}</p>
              </div>
            </div>
            <div className="flex mt-2 items-center">
              <div className="flex me-2">
                <FaRegCalendarAlt className="me-2" />
                <p className="text-sm myblack">Hours:&nbsp;</p>
                <p className="text-sm text-[#34A853] font-[300]">
                  {todayHours?.closed ? 'Closed' : 'Available'}
                </p>
              </div>
              {!todayHours?.closed && todayHours?.slots?.[0] && (
                <>
                  <div className="relative w-[6px] h-[6px] bg-[#5358624D] rounded-full me-2"></div>
                  <p className="text-sm myblack">
                    {todayHours.slots[0].start} - {todayHours.slots[0].end}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-medium myhead">About Me</h2>
        <p className="text-[#535862] mt-3">
          {userData?.businessProfile?.about || 'No description available'}
        </p>
      </div>

      <div className="mt-5">
        <h4 className="font-medium text-[#181D27] text-lg">
          Secondary Business Categories
        </h4>
        <div className="flex flex-wrap gap-2 items-center mt-3">
          {userData?.businessProfile?.business_secondary_categories ? 
            userData.businessProfile.business_secondary_categories.split(',').map((item, index) => (
              <p className="text-sm font-medium bg-[#3434341A] px-3 py-1 text-center w-[max-content] rounded-full" key={index}>
                {item.trim()}
              </p>
            ))
            :
            <p className="text-sm text-gray-500">No secondary categories specified</p>
          }
        </div>
      </div>

      <div className="mt-5">
        <h3 className="font-medium text-2xl">Additional Photos</h3>
        <div className="mt-3">
          <AccordionComponent items={accordionData} />
        </div>
      </div>
      <div className="grid max-w-[350px] grid-cols-2 my-4 gap-2 ms-auto">
        <button className="border border-gray-300 rounded-lg py-[10px] w-full font-semibold bg-white">
          Cancel
        </button>
        <button className="border rounded-lg p-3 w-full text-white font-semibold bg-[#0F91D2]">
          Publish
        </button>
      </div>
    </div>
  );
}
