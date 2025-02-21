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
import { HiOutlineClipboardList } from "react-icons/hi";

export default function SalesLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarData = [
    {
      items: [
        {
          to: "/sales/dashboard",
          icon: IoHomeOutline,
          label: "Dashboard",
        },
        {
          to: "/sales/services",
          icon: MdHomeRepairService,
          label: "Service",
        },
        { to: "/sales/reports", icon: PiFiles, label: "Reports" },
        {
          to: "/sales/clients",
          icon: LuUsersRound,
          label: "Clients",
        },
        {
          to: "sales/tasklist",
          icon: HiOutlineClipboardList,
          label: "Task List",
        },
      ],
    },
    {
      items: [
        {
          to: "/sales/chat",
          icon: IoChatboxEllipsesOutline,
          label: "Conversations",
        },
        {
          to: "/sales/notification",
          icon: GrNotification,
          label: "Notifications",
        },
        {
          to: "/sales/setting",
          icon: AiOutlineSetting,
          label: "Settings",
        },
        { to: "/sales/support", icon: CgSupport, label: "Support" },
      ],
    },
  ];

  const userInfo = {
    name: "Mike Bird",
    email: "mikebird@untitledui.com",
    profileLink: "/sales/profile"
  };
  return (
    <div className="mainpage">
      <MainNav toggleSidebar={toggleSidebar} />
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
