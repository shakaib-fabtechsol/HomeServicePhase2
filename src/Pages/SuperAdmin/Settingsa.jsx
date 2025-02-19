import React from "react";
import TabComponent from "../../Components/TabComponent";
import { FaUser } from "react-icons/fa";
import { SlLock } from "react-icons/sl";
import { IoNotificationsOutline } from "react-icons/io5";
import PersonalInfo from "../../Components/SuperAdmin/settings/PersonalInfo";

export default function Settingsa() {
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
      content: "<Read />",
    },
    {
      label: (
        <div className="flex items-baseline gap-1">
          <IoNotificationsOutline />
          <p>Notifications</p>
        </div>
      ),
      content: "<Unread />",
    },
  ];
  return (
    <div>
      <TabComponent tabs={tabData} />
    </div>
  );
}
