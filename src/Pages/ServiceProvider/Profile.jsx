import React, { useEffect } from "react";
import { FaArrowLeft, FaRegCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import cardvideo from "../../assets/img/cardvideo.mp4";
import slideimg from "../../assets/img/service1new.jpeg";
import client1 from "../../assets/img/client2.png";
import client2 from "../../assets/img/client3.png";
import RegularHour from "../../Components/AdditionalPhoto/RegularHour";
import SpecialHour from "../../Components/AdditionalPhoto/specialHour";
import AboutVideo from "../../Components/AdditionalPhoto/AboutVideo";
import TechnicalPhoto from "../../Components/AdditionalPhoto/TechnicalPhoto";
import VehiclePhoto from "../../Components/AdditionalPhoto/VehiclePhoto";
import FacilityPhoto from "../../Components/AdditionalPhoto/FacilityPhoto";
import ProjectPhoto from "../../Components/AdditionalPhoto/ProjectPhoto";
import License from "../../Components/AdditionalPhoto/License";
import Award from "../../Components/AdditionalPhoto/Award";
import Insurance from "../../Components/AdditionalPhoto/Insurance";
import provider from "../../assets/img/provider.png";
import { IoIosStar } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import ServiceBox from "../../Components/ServiceBox";
import AccordionComponent from "../../Components/AccordionComponent";
import Review from "../../Components/SuperAdmin/Review";

const Profilep = () => {
  useEffect(() => {
    document.title = "Profile";
  }, []);

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

  return (
    <div>
      <div className="flex items-center">
        <Link to="#">
          <FaArrowLeft className="me-4 text-base" />
        </Link>
        <h2 className="text-2xl font-semibold">Profile Details</h2>
      </div>
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
                    <span className="myhead text-xs font-semibold me-1">
                      4.9
                    </span>
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
                <select
                  name=""
                  id=""
                  className="text-sm myblack bg-transparent"
                >
                  <option value="">Close 6PM</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-medium myhead">About Me</h2>
          <p className="text-[#535862] mt-3">
            Donec pulvinar consequat metus eget cursus. Donec nec quam eu arcu
            elementum tempor eu pharetra mauris. Morbi et gravida purus, nec
            sagittis risus. Nulla placerat justo ut dui aliquam efficitur.
            Mauris aliquet mattis odio nec malesuada. Morbi at dui tristique,
            dignissim enim ac, varius nulla. Donec venenatis libero nec ligula
            laoreet laoreet. Sed quis lorem in mi suscipit dictum id nec diam.
            Orci varius natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Nam at vehicula neque. Proin molestie
            venenatis sem, ut imperdiet leo efficitur vel. Vestibulum nec
            elementum lacus.
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
                serviceDetailTo={"/provider/dealDetails"}
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
      </div>
    </div>
  );
};

export default Profilep;
