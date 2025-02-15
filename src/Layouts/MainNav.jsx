import React from "react";
import { NavLink, Link } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLocationOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import logo from "../assets/img/logo.png";
import profile from "../assets/img/profile.png";

const MainNav = ({ toggleSidebar }) => {
  return (
    <div className="mainnav input-shadow p-4 flex justify-between items-center bg-white shadow-md">
      <div className="flex items-center justify-between">
        <NavLink to="user/dashboard" className="logodiv">
          <img src={logo} alt="logo" className="w-[60px]" />
        </NavLink>
      </div>
      
      <div className="flex">
        <div className="flex me-3 rounded-lg border-[#E4E4E4] border-2 py-1">
          <div>
            <input
              type="text"
              placeholder="Search for any service..."
              className="py-2 bg-transparent border-r px-3"
            />
          </div>
          <div className="flex items-center px-3">
            <IoLocationOutline className="me-2 text-2xl" />
            <input
              type="text"
              placeholder="Location for the service..."
              className="py-2 bg-transparent"
            />
          </div>
        </div>
        <div className="rounded-lg flex items-center bg-[#0F91D2] px-4 text-xl text-white py-2">
          <FaSearch />
        </div>
      </div>

      <div className="flex items-center">
        <button className="text-2xl md:hidden" onClick={toggleSidebar}>
          <GiHamburgerMenu className="me-2 pointer" />
        </button>
        <NavLink to="user/notification">
          <IoMdNotifications className="text-2xl cursor-pointer me-2" />
        </NavLink>
        <Link to="#">
          <img src={profile} alt="Profile" className="img-wade mr-2" />
        </Link>
      </div>
    </div>
  );
};

export default MainNav;
