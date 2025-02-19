import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MainNav from "./MainNav";
import FilterNav from "./FilterNav";

function ProviderLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="mainpage">
      <MainNav toggleSidebar={toggleSidebar} />
      <FilterNav />
      <div className="main flex">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className="right">
          <div className="right-bottom px-2">
            <div className="container-fluid">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProviderLayout;
