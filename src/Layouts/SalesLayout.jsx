import React, { useEffect, useState } from "react";
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
import { useGetSalesRapQuery } from "../services/sales/index";
import { useDispatch,useSelector } from "react-redux";

import { setUser } from "../redux/reducers/authSlice";

export default function SalesLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [value, setValue] = useState({});
 const value1 =useSelector((state)=>state.auth.user);
 console.log(value1);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
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
          label: "Pros",
        },
        {
          to: "/sales/clients",
          icon: LuUsersRound,
          label: "Clients",
        },
        {
          to: "/sales/tasklist",
          icon: HiOutlineClipboardList,
          label: "Task List",
        },
        { to: "/sales/reports", icon: PiFiles, label: "Reports" },
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

  const { data, isLoading, error, refetch } = useGetSalesRapQuery();

  useEffect(() => {
    if (data) {
      setValue(data);
      if (data?.user) {
        dispatch(setUser(data.user));
      }
    }
  }, [data, dispatch]);
console.log(data,"valueeeee");
  const userInfo = {
    name: value1?.name,
    email: value1?.email,
    profileLink: "/sales/profile",
    personal_image: value1?.personal_image,
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
