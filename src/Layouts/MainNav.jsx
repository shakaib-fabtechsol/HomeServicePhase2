import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoLocationOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import logo from "../assets/img/logo.png";
import profile from "../assets/img/profile.png";
import { FaRegHeart } from "react-icons/fa6";
import { GrNotification } from "react-icons/gr";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

const MainNav = ({ toggleSidebar, logolink }) => {
  const location = useLocation();
  const isHomeOrCatalog =
    location.pathname === "/" ||
    location.pathname === "/catalogResult" ||
    location.pathname === "/dealdetails";

  return (
    <div className="mainnav input-shadow p-4 flex justify-between items-center bg-white border-b-2 border-[#E4E4E4]">
      <div className="flex items-center justify-between">
        <NavLink to={logolink} className="logodiv w-full h-full">
          <img src={logo} alt="logo" className="w-[60px]" />
        </NavLink>
      </div>

      <div className="ms-auto md:mx-auto lg:w-full lg:max-w-[700px]">
        <form action="/catalogResult" className="w-full">
          <div className="md:flex hidden ms-auto md:mx-auto lg:w-full ">
            <div className="flex me-3 rounded-lg w-full border-[#E4E4E4] border-2 py-1">
              <div className="w-[40%]">
                <input
                  type="text"
                  placeholder="Search for any service..."
                  className="py-[6px] bg-transparent focus-none w-full border-r px-3"
                />
              </div>
              <div className="flex w-[60%] items-center px-3">
                <IoLocationOutline className="me-2 text-2xl text-[#6B6B6B]" />
                <input
                  type="text"
                  placeholder="Location for the service..."
                  className="py-[6px] bg-transparent focus-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="rounded-lg flex items-center bg-[#0F91D2] px-4 text-xl text-white py-1"
            >
              <FaSearch />
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center">
        {isHomeOrCatalog ? (
          <>
            <Link to="/login" className="me-3">
              Sign In
            </Link>
            <Link to="/register" className="border-2 rounded-lg px-4 py-2">
              Join Now
            </Link>
          </>
        ) : (
          <>
            <button className="text-2xl md:hidden" onClick={toggleSidebar}>
              <RxHamburgerMenu className="pointer" />
            </button>
            {/* <NavLink to="#">
              <IoChatboxEllipsesOutline className="text-2xl text-[#535862] cursor-pointer me-3 sm:me-5" />
            </NavLink>
            <NavLink to="#">
              <FaRegHeart className="text-2xl text-[#535862] cursor-pointer me-3 sm:me-5" />
            </NavLink>
            <NavLink to="#">
              <GrNotification className="text-2xl text-[#535862] cursor-pointer me-3 sm:me-5" />
            </NavLink>
            <Link to="#">
              <img src={profile} alt="Profile" className="img-wade" />
            </Link> */}
          </>
        )}
      </div>
    </div>
  );
};

export default MainNav;
