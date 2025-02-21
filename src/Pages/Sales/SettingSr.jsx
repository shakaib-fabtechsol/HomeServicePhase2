import React from "react";
import TabComponent from "../../Components/TabComponent";
import { FaUser } from "react-icons/fa";
import { SlLock } from "react-icons/sl";
import { IoNotificationsOutline } from "react-icons/io5";
import PersonalInfo from "../../Components/SuperAdmin/settings/PersonalInfo";
import Security from "../../Components/SuperAdmin/settings/Security";
import Notifications from "../../Components/SuperAdmin/settings/Notifications";
import { useEffect, useState } from "react";

export default function SettingSr() {
  useEffect(() => {
    document.title = "Settings";
  }, []);
  const tabData = [
    {
      label: (
        <div className="flex items-baseline gap-1">
          <FaUser />
          <p>Personal Information</p>
        </div>
      ),
      content: <PersonalInfo />,
    },
    {
      label: (
        <div className="flex items-baseline gap-1">
          <SlLock />
          <p>Security</p>
        </div>
      ),
      content: <Security />,
    },
    // {
    //   label: (
    //     <div className="flex items-baseline gap-1">
    //       <IoNotificationsOutline />
    //       <p>Notifications</p>
    //     </div>
    //   ),
    //   content: <Notifications />,
    // },
  ];
  return (
    <div className="border border-[#A2A1A833] rounded-[10px] p-3">
      <TabComponent tabs={tabData} />
    </div>
  );
}
