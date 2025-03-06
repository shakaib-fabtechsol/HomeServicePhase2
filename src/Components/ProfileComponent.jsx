import React from "react";
import {useState} from "react";
import { FaArrowLeft, FaRegCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import AccordionComponent from "../Components/AccordionComponent";
import ServiceBox from "../Components/ServiceBox";
import { CiHeart, CiSearch } from "react-icons/ci";
import Review from "../Components/SuperAdmin/Review";
import { Modal } from "@mui/material";
import { FiPhone } from "react-icons/fi";
import { BiMessageAltDetail, BiMessageSquareDetail } from "react-icons/bi";
import { TbMailDown } from "react-icons/tb";

import {
  IoChatbubbleEllipsesOutline,
  IoLocationOutline,
} from "react-icons/io5";
import provider from "../assets/img/provider.png";
import { IoIosStar } from "react-icons/io";
import TechnicalPhoto from "./AdditionalPhoto/TechnicalPhoto";
import SpecialHour from "./AdditionalPhoto/special2Hour";
import VehiclePhoto from "./AdditionalPhoto/VehiclePhoto";
import FacilityPhoto from "./AdditionalPhoto/FacilityPhoto";
import ProjectPhoto from "./AdditionalPhoto/ProjectPhoto";
import Award from "./AdditionalPhoto/Award";
import License from "./AdditionalPhoto/License";
import Insurance from "./AdditionalPhoto/Insurance";
import RegularHour2 from "./AdditionalPhoto/Regular2Hour";
import AboutVideo from "./AdditionalPhoto/AboutVideo";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import camera from "../assets/img/fileicon.png";
const ProfileComponent = ({ serviceDetailTo, userRole, data }) => {
  const accordionData = [
    { title: "About videos", content: <AboutVideo about_video={data?.business?.about_video} /> },
    { title: "Technician Photos", content: <TechnicalPhoto technician_photo={data?.business?.technician_photo} /> },
    { title: "Vehicle Photos", content: <VehiclePhoto vehicle_photo={data?.business?.vehicle_photo} /> },
    { title: "Facility Photos", content: <FacilityPhoto facility_photo={data?.business?.facility_photo} /> },
    { title: "Project Photos", content: <ProjectPhoto project_photo={data?.business?.project_photo} /> },
    { title: "Licences", content: <License license_photo={data?.business?.license_certificate} /> },
    { title: "Awards", content: <Award award_certificate={data?.business?.award_certificate} /> },
    { title: "Insurance", content: <Insurance insurance_photo={data?.business?.insurance_certificate} /> },
    { title: "Regular Hours of Operation", content: <RegularHour regular_hour={data?.business?.regular_hour} /> },
    { title: "Special Hours of Operation", content: <SpecialHour special_hour={data?.business?.special_hour} /> },
    { title: "Social", content: data?.business?.website},
  ];
const [searchQuery, setSearchQuery] = useState("");
  const [contactopen, setcontactOpen] = React.useState(false);
  const handlecontactOpen = () => setcontactOpen(true);
  const handlecontactClose = () => setcontactOpen(false);

  const modalContacts = [
    { path: "#", Icon: <FiPhone />, title: "Call Pro: (785) 712-6532" },
    {
      path: "#",
      Icon: <BiMessageSquareDetail />,
      title: "Text Pro: (708) 813-8989",
    },
    { path: "#", Icon: <BiMessageAltDetail />, title: "Instant Chat" },
    { path: "#", Icon: <TbMailDown />, title: "Email Pro" },
    { path: "#", Icon: <IoLocationOutline />, title: "Get Directions" },
  ];

  const [activeModal, setActiveModal] = React.useState(null);

  const handleContactClick = (contact) => {
    if (
      contact.title === "Text Pro: (708) 813-8989" ||
      contact.title === "Email Pro" ||
      contact.title === "Get Directions"
    ) {
      setActiveModal(contact.title);
    } else {
      console.log(`No modal for: ${contact.title}`);
    }
  };

  const handleModalClose = () => {
    setActiveModal(null);
  };

  console.log(data, "this is for the detail page")

  const filteredServices = data?.deals?.filter((service) =>
    service?.service_title?.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const regularHours =
  data?.business && data?.business?.regular_hour
      ? JSON.parse(data?.business?.regular_hour || "[]")
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


  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between mt-4 lg:items-start">
        <div className="flex flex-wrap items-center">
          <img
            src={data?.
              business?.business_logo? `${BASE_URL}/uploads/${data?.business?.business_logo}` : camera}
            alt="NA"
            className="me-2 my-2 rounded-lg max-w-[120px]"
          />
          <div className="my-2">
            <div className="flex items-center">
              <p className="font-semibold myhead me-2">{data?.business?.business_name}</p>
              <div className="flex ms-3">
                <IoIosStar className="me-1 text-[#F8C600]" />
                <div className="flex flex-wrap">
                  <span className="myhead text-xs font-semibold me-1">4.9</span>
                  <p className="text-[#181D2766] underline text-xs">(457)</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap mt-2">
              <p className="myblack pe-3 me-3 border-e">{data?.business?.business_primary_category}</p>
              <div className="flex items-center">
                <IoLocationOutline className="me-2 myblack" />
                <p className="myblack ">{data?.business?.business_location || "NA"}</p>
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
        <div className="xl:max-w-[350px] xl:w-full">
          {userRole !== "provider" && userRole !== "superadmin" && (
            <button
              onClick={handlecontactOpen}
              className="flex mt-3 lg:mt-0 py-3 justify-center items-center px-6 font-semibold rounded-lg text-[#fff] bg-[#FB8803] w-full lg:max-w-[350px] lg:fixed right-[22px] z-[99]"
            >
              <IoChatbubbleEllipsesOutline className="me-2 text-[#fff] text-xl" />
              <span>Contact Pro</span>
            </button>
          )}
          {userRole !== "superadmin" && (
            <button className="flex mt-3 py-3 justify-center items-center border  px-6 font-semibold rounded-lg text-[#535862] bg-[#fff] w-full lg:mt-[60px]">
              <CiHeart className="text-xl me-2" />
              <span>Add to Favorites list</span>
            </button>
          )}
        </div>

        <Modal
          open={contactopen}
          onClose={handlecontactClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ m: 2 }}
        >
          <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] outline-none">
            <div className="bg-white rounded-[12px] p-4 max-h-[calc(100dvh-200px)] overflow-y-auto scroll-x-hidden">
              <p className="text-lg font-semibold">Contact Pro</p>
              <div className="flex flex-col gap-3 mt-4">
                {modalContacts.map((contact, index) => (
                  <button
                    onClick={() => handleContactClick(contact)}
                    key={index}
                    className="bg-[#FB8803] text-white flex items-center justify-center gap-2 p-3 rounded-[8px] text-sm font-medium"
                    to={contact.path}
                  >
                    <span className="text-[24px]">{contact.Icon}</span>
                    <span>{contact.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-medium myhead">About Me</h2>
        <p className="text-[#535862] mt-3">
          {data?.business?.about}
        </p>
      </div>
      <div className="mt-5">
        <h4 className="font-medium text-[#181D27] text-lg">
          Secondary Business Categories
        </h4>
        <div className="flex flex-wrap gap-2 items-center mt-3">
          <p className="text-sm font-medium bg-[#3434341A] px-3 py-1 text-center w-[max-content] rounded-full">
            {data?.business?.business_secondary_categories|| "NA"
            }
          </p>

        </div>
      </div>
      <div className="mt-5">
        <h4 className="font-medium text-[#181D27] text-lg">
          Primary Business Categories
        </h4>
        <div className="flex flex-wrap gap-2 items-center mt-3">
          <p className="text-sm font-medium bg-[#3434341A] px-3 py-1 text-center w-[max-content] rounded-full">
            {data?.business?.business_primary_category|| "NA"
            }
          </p>

        </div>
      </div>
      <div className="mt-5">
        <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-semibold">My Deals</h2>
          </div>
          <div>
            <div className="flex items-center p-2 border rounded-lg w-full sm:max-w-[400px]">
              <label>
                <CiSearch className="text-[#717680] text-xl" />
              </label>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full px-2"
              />
            </div>
          </div>
        </div>
        <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filteredServices?.map((service, index) => (
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
          ))}
        </div>
      </div>
      <div className="mt-5">
        <h3 className="font-medium text-2xl">Additional Photos</h3>
        <div className="mt-3">
          <AccordionComponent items={accordionData} />
        </div>
      </div>
      {/* <div className="mt-5">
        <Review />
      </div> */}
      <Modal
        open={activeModal !== null}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] outline-none">
          <div className="bg-white rounded-[12px] p-4 max-h-[calc(100dvh-200px)] overflow-y-auto">
            <p className="text-lg font-semibold">{activeModal}</p>
            <div className="mt-4">
              {activeModal === "Text Pro: (708) 813-8989" && (
                <div>
                  <form action="">
                    <div>
                      <label htmlFor="">Description</label>
                      <textarea
                        className="w-full p-2 rounded-lg bg-white border"
                        rows={5}
                        name=""
                        id=""
                        placeholder="Write here..."
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-1 mt-5">
                      <div>
                        <button className="bg-[#fff] text-black py-2 rounded-lg w-full shadow-md border">
                          Cancel
                        </button>
                      </div>
                      <div>
                        <button className="bg-[#0F91D2] text-white py-2 rounded-lg w-full shadow-md">
                          Send
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
              {activeModal === "Email Pro" && (
                <div>
                  <form action="">
                    <div>
                      <label htmlFor="">Subject</label>
                      <input
                        type="text"
                        className="w-full p-2 rounded-lg bg-white border"
                        name=""
                        id=""
                        placeholder="Address"
                      />
                    </div>
                    <div className="mt-3">
                      <label htmlFor="">Description</label>
                      <textarea
                        className="w-full p-2 rounded-lg bg-white border"
                        rows={5}
                        name=""
                        id=""
                        placeholder="Write here..."
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-1 mt-5">
                      <div>
                        <button className="bg-[#fff] text-black py-2 rounded-lg w-full shadow-md border">
                          Cancel
                        </button>
                      </div>
                      <div>
                        <button className="bg-[#0F91D2] text-white py-2 rounded-lg w-full shadow-md">
                          Send
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
              {activeModal === "Get Directions" && (
                <div>
                  <form action="">
                    <div>
                      <label htmlFor="">Location</label>
                      <input
                        type="text"
                        className="w-full p-2 rounded-lg bg-white border"
                        name=""
                        id=""
                        placeholder="Address"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-1 mt-5">
                      <div>
                        <button className="bg-[#fff] text-black py-2 rounded-lg w-full shadow-md border">
                          Cancel
                        </button>
                      </div>
                      <div>
                        <button className="bg-[#0F91D2] text-white py-2 rounded-lg w-full shadow-md">
                          Send
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileComponent;
