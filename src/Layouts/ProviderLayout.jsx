import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MainNav from "./MainNav";
import FilterNav from "./FilterNav";
import { IoHomeOutline } from "react-icons/io5";
import { FiBarChart2 } from "react-icons/fi";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { AiOutlineDollar, AiOutlineSetting } from "react-icons/ai";
import { CiCreditCard1 } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa6";
import { PiFiles } from "react-icons/pi";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { GrNotification } from "react-icons/gr";
import { CgSupport } from "react-icons/cg";

function ProviderLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const logolink ='/provider/dashboard'
  const sidebarData = [
    {
      items: [
        { to: "/provider/dashboard", icon: IoHomeOutline, label: "Home" },
        {
          to: "/provider/services",
          icon: FiBarChart2,
          label: "My Services/Deals",
        },
        { to: "/provider/probucks", icon: AiOutlineDollar, label: "Pro Bucks" },
        {
          to: "/provider/orders",
          icon: RiBarChartHorizontalLine,
          label: "Orders",
        },
        {
          to: "/provider/payments",
          icon: CiCreditCard1,
          label: "Payments/Payout",
        },
        { to: "/provider/favourites", icon: FaRegHeart, label: "Favorites" },
        { to: "/provider/reports", icon: PiFiles, label: "Reports" },
      ],
    },
    {
      items: [
        {
          to: "/provider/conversations",
          icon: IoChatboxEllipsesOutline,
          label: "Conversations",
        },
        {
          to: "/provider/notification",
          icon: GrNotification,
          label: "Notifications",
        },
        { to: "/provider/settings", icon: AiOutlineSetting, label: "Settings" },
        { to: "/provider/support", icon: CgSupport, label: "Support" },
      ],
    },
  ];

  const userInfo = {
    name: "Mike Bird",
    email: "mikebird@untitledui.com",
  };

  return (
    <div className="mainpage">
      <MainNav logolink={logolink} toggleSidebar={toggleSidebar} />
      <FilterNav />
      <div className="main flex">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          sidebarData={sidebarData}
          userInfo={userInfo}
        />
        <div className="right flex-1">
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