import React, { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import profile from "../assets/img/profile.png";
import logo from "../assets/img/logo.png";
import { IoLocationOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import Sidebar from "./Sidebar";
import MainNav from "./MainNav";
import FilterNav from "./FilterNav";

function HomeLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const logolink = "/";
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="mainpage">
      <MainNav logolink={logolink} toggleSidebar={toggleSidebar} />
      <FilterNav />
      <div className="main flex">
        <div className="right w-full">
          <div className="right-bottom px-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;
