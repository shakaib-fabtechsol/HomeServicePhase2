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

function UserLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="mainpage">
      {/* Main Content */}
      <MainNav toggleSidebar={toggleSidebar} />
      {/* Main Content */}
      <div className="main flex">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className="right flex-1 min-h-screen">
          <div className="right-bottom p-4">
            <div className="bottom-main">
              <div className="content">
                <div className="container-fluid">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLayout;
