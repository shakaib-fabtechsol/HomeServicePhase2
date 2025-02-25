import React from "react";
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
import { PiChats } from "react-icons/pi";
import {
  IoChatbubbleEllipsesOutline,
  IoLocationOutline,
} from "react-icons/io5";
import provider from "../assets/img/provider.png";
import { IoIosStar } from "react-icons/io";
import TechnicalPhoto from "./AdditionalPhoto/TechnicalPhoto";
import SpecialHour from "./AdditionalPhoto/specialHour";
import VehiclePhoto from "./AdditionalPhoto/VehiclePhoto";
import FacilityPhoto from "./AdditionalPhoto/FacilityPhoto";
import ProjectPhoto from "./AdditionalPhoto/ProjectPhoto";
import Award from "./AdditionalPhoto/Award";
import License from "./AdditionalPhoto/License";
import Insurance from "./AdditionalPhoto/Insurance";
import cardvideo from "../assets/img/cardvideo.mp4";
import slideimg from "../assets/img/service1new.jpeg";
import client1 from "../assets/img/client2.png";
import client2 from "../assets/img/client3.png";
import RegularHour from "./AdditionalPhoto/RegularHour";
import AboutVideo from "./AdditionalPhoto/AboutVideo";

const ProfileComponent = ({ serviceDetailTo, userRole }) => {
  const services = [
    {
      id: 1,
      title: "Plumbing Service",
      price: 50,
      description: "Fix your leaking pipes and taps.",
      tags: ["Plumbing", "Repair"],
      image: "",
      videos: [cardvideo, cardvideo],
      images: [slideimg, slideimg, slideimg, slideimg],
      totalReviews: 3500,
      username: "Julia Maria",
      userimg: client1,
      rating: 4.3,
      liked: false,
      publish: 2,
    },
    {
      id: 2,
      title: "House Cleaning",
      price: 30,
      description: "Professional house cleaning services.",
      tags: ["Cleaning", "Home"],
      image: "",
      videos: [cardvideo, cardvideo],
      images: [slideimg, slideimg, slideimg, slideimg],
      totalReviews: 3500,
      username: "John Doe",
      userimg: client2,
      rating: 4.3,
      liked: true,
      publish: 2,
    },
    {
      id: 2,
      title: "House Cleaning",
      price: 30,
      description: "Professional house cleaning services.",
      tags: ["Cleaning", "Home"],
      image: "",
      videos: [cardvideo, cardvideo],
      images: [slideimg, slideimg, slideimg, slideimg],
      totalReviews: 3500,
      username: "Julia Maria",
      userimg: client1,
      rating: 4.3,
      liked: false,
      publish: 2,
    },
    {
      id: 2,
      title: "House Cleaning",
      price: 30,
      description: "Professional house cleaning services.",
      tags: ["Cleaning", "Home"],
      image: "",
      videos: [cardvideo, cardvideo],
      images: [slideimg, slideimg, slideimg, slideimg],
      totalReviews: 3500,
      username: "John Doe",
      userimg: client2,
      rating: 4.3,
      liked: true,
      publish: 2,
    },
    {
      id: 2,
      title: "House Cleaning",
      price: 30,
      description: "Professional house cleaning services.",
      tags: ["Cleaning", "Home"],
      image: "",
      videos: [cardvideo, cardvideo],
      images: [slideimg, slideimg, slideimg, slideimg],
      totalReviews: 3500,
      username: "Julia Maria",
      userimg: client1,
      rating: 4.3,
      liked: true,
      publish: 2,
    },
  ];
  const accordionData = [
    { title: "About Us Video", content: <AboutVideo /> },
    { title: "Technician Photos", content: <TechnicalPhoto /> },
    { title: "Vehicle Photos", content: <VehiclePhoto /> },
    { title: "Facility Photos", content: <FacilityPhoto /> },
    { title: "Project Photos", content: <ProjectPhoto /> },
    { title: "Licences", content: <License /> },
    { title: "Awards", content: <Award /> },
    { title: "Insurance", content: <Insurance /> },
    { title: "Regular Hours of Operation", content: <RegularHour /> },
    { title: "Special Hours of Operation", content: <SpecialHour /> },
    { title: "Social", content: "" },
  ];

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

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between mt-4 lg:items-start">
        <div className="flex flex-wrap items-center">
          <img
            src={provider}
            alt=""
            className="me-2 my-2 rounded-lg max-w-[120px]"
          />
          <div className="my-2">
            <div className="flex items-center">
              <p className="font-semibold myhead me-2">Provider Name</p>
              <div className="flex ms-3">
                <IoIosStar className="me-1 text-[#F8C600]" />
                <div className="flex flex-wrap">
                  <span className="myhead text-xs font-semibold me-1">4.9</span>
                  <p className="text-[#181D2766] underline text-xs">(457)</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap mt-2">
              <p className="myblack pe-3 me-3 border-e">House Cleaning</p>
              <div className="flex items-center">
                <IoLocationOutline className="me-2 myblack" />
                <p className="myblack ">Address of the provider here</p>
              </div>
            </div>
            <div className="flex mt-2 items-center">
              <div className="flex me-2">
                <FaRegCalendarAlt className="me-2" />
                <p className="text-sm myblack">Hours:&nbsp;</p>
                <p className="text-sm text-[#34A853] font-[300]">Available</p>
              </div>
              <div className="relative w-[6px] h-[6px] bg-[#5358624D] rounded-full me-2"></div>
              <select name="" id="" className="text-sm myblack bg-transparent">
                <option value="">Close 6PM</option>
              </select>
            </div>
          </div>
        </div>
        <div className="xl:max-w-[424px] xl:w-full">
          <button
            onClick={handlecontactOpen}
            className="flex mt-3 lg:mt-0 py-3 justify-center items-center px-6 font-semibold rounded-lg text-[#fff] bg-[#FB8803] w-full lg:max-w-[232px] lg:fixed right-[22px] z-[99]"
          >
            <IoChatbubbleEllipsesOutline className="me-2 text-[#fff] text-xl" />
            <span>Contact Pro</span>
          </button>
{userRole !== "superadmin" && (
          <button className="flex mt-3 py-3 justify-center items-center border  px-6 font-semibold rounded-lg text-[#535862] bg-[#fff] w-full lg:max-w-[232px] lg:mt-[60px]">
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
          Donec pulvinar consequat metus eget cursus. Donec nec quam eu arcu
          elementum tempor eu pharetra mauris. Morbi et gravida purus, nec
          sagittis risus. Nulla placerat justo ut dui aliquam efficitur. Mauris
          aliquet mattis odio nec malesuada. Morbi at dui tristique, dignissim
          enim ac, varius nulla. Donec venenatis libero nec ligula laoreet
          laoreet. Sed quis lorem in mi suscipit dictum id nec diam. Orci varius
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus. Nam at vehicula neque. Proin molestie venenatis sem, ut imperdiet
          leo efficitur vel. Vestibulum nec elementum lacus.
        </p>
      </div>
      <div className="mt-5">
        <h4 className="font-medium text-[#181D27] text-lg">
          Secondary Business Categories
        </h4>
        <div className="flex flex-wrap gap-2 items-center mt-3">
          <p className="text-sm font-medium bg-[#3434341A] px-3 py-1 text-center w-[max-content] rounded-full">
            Category 01
          </p>
          <p className="text-sm font-medium bg-[#3434341A] px-3 py-1 text-center w-[max-content] rounded-full">
            Category 02
          </p>
          <p className="text-sm font-medium bg-[#3434341A] px-3 py-1 text-center w-[max-content] rounded-full">
            Category 03
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
                placeholder="Search"
                className="w-full px-2"
              />
            </div>
          </div>
        </div>
        <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <ServiceBox
              key={index}
              title={service.title}
              price={service.price}
              description={service.description}
              tags={service.tags}
              image={service.image}
              publish={service.publish}
              serviceDetailTo={serviceDetailTo}
              videos={service.videos}
              imgs={service.images}
              userimg={service.userimg}
              username={service.username}
              Rating={service.rating}
              Liked={service.liked}
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
      <div className="mt-5">
        <Review />
      </div>
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
