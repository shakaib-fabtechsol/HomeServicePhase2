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
import { Award } from "lucide-react";
import Insurance from "../AdditionalPhoto/Insurance";
import RegularHour from "../AdditionalPhoto/RegularHour";
import SpecialHour from "../AdditionalPhoto/specialHour";

export default function Publish() {
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
      <div className="mt-4">
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
