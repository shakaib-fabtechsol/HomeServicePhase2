import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import FilterNav from "./FilterNav";
import MainNav from "./MainNav";
import { IoChatboxEllipsesOutline, IoHomeOutline } from "react-icons/io5";
import { FiBarChart2 } from "react-icons/fi";
import { AiOutlineDollar, AiOutlineSetting } from "react-icons/ai";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { CiCreditCard1 } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { PiFiles } from "react-icons/pi";
import { GrNotification } from "react-icons/gr";
import { CgSupport } from "react-icons/cg";
import { useSelector } from "react-redux";

const CustomerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {user} = useSelector((state) => state.auth);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const sidebarData = [
    {
      items: [
        { to: "/customer/dashboard", icon: IoHomeOutline, label: "Home" },
        { to: "/customer/bucks", icon: AiOutlineDollar, label: "Pro Bucks" },
        {
          to: "/customer/order",
          icon: RiBarChartHorizontalLine,
          label: "Orders",
        },
        {
          to: "/customer/Deals",
          icon: FiBarChart2,
          label: "My Customer/Deals",
          toChild: "/customer/dealDetails",
        },
        {
          to: "/customer/payments",
          icon: CiCreditCard1,
          label: "Payments/Payout",
        },
        {
          to: "/customer/favourites",
          icon: FaRegHeart,
          label: "Favorites",
          toChild: "/customer/dealDetails",
        },
        { to: "/customer/reports", icon: PiFiles, label: "Reports" },
      ],
    },
    {
      items: [
        {
          to: "/customer/message",
          icon: IoChatboxEllipsesOutline,
          label: "Conversations",
        },
        {
          to: "/customer/notification",
          icon: GrNotification,
          label: "Notifications",
        },
        { to: "/customer/setting", icon: AiOutlineSetting, label: "Settings" },
        { to: "/customer/support", icon: CgSupport, label: "Support" },
      ],
    },
  ];

  const userInfo = {
    name: "Mike Bird",
    email: "mikebird@untitledui.com",
    profileLink: "/customer/profile",
  };

  return (
    <div className="mainpage">
      <MainNav toggleSidebar={toggleSidebar} />
      <FilterNav />
      <div className="main flex">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          sidebarData={sidebarData}
          userInfo={user}
        />
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
};

export default CustomerLayout;
