import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { IoChatboxEllipsesOutline, IoHomeOutline } from "react-icons/io5";
import Sidebar from "./Sidebar";
import MainNav from "./MainNav";
import FilterNav from "./FilterNav";
import { AiOutlineSetting } from "react-icons/ai";
import { PiFiles } from "react-icons/pi";
import { GrNotification } from "react-icons/gr";
import { CgSupport } from "react-icons/cg";
import { MdHomeRepairService } from "react-icons/md";
import { LuUsersRound } from "react-icons/lu";
import { LiaUsersCogSolid } from "react-icons/lia";
import { HiOutlineCurrencyDollar } from "react-icons/hi";

function SuperAdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const logolink = "/superadmin/dashboard";
  const sidebarData = [
    {
      items: [
        {
          to: "/superadmin/dashboard",
          icon: IoHomeOutline,
          label: "Dashboard",
        },
        {
          to: "/superadmin/providers",
          icon: MdHomeRepairService,
          label: "Service Providers",
        },
        {
          to: "/superadmin/clients",
          icon: LuUsersRound,
          label: "Clients",
        },
        {
          to: "/superadmin/sales",
          icon: LiaUsersCogSolid,
          label: "Sales Reps",
        },
        { to: "/superadmin/reports", icon: PiFiles, label: "Reports" },
        {
          to: "/superadmin/conversation",
          icon: HiOutlineCurrencyDollar,
          label: "Pricing",
        },
      ],
    },
    {
      items: [
        {
          to: "/superadmin/Chatsa",
          icon: IoChatboxEllipsesOutline,
          label: "Conversations",
        },
        {
          to: "/superadmin/notifications",
          icon: GrNotification,
          label: "Notifications",
        },
        {
          to: "/superadmin/setting",
          icon: AiOutlineSetting,
          label: "Settings",
        },
        { to: "/superadmin/suport", icon: CgSupport, label: "Support" },
      ],
    },
  ];

  const userInfo = {
    name: "Mike Bird",
    email: "mikebird@untitledui.com",
    profileLink: "/superadmin/setting",
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
        <div className="right">
          <div className="right-bottom p-2">
            <div className="container-fluid">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminLayout;
