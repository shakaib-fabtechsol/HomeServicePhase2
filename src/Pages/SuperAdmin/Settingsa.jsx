import React, { useEffect } from "react";
import TabComponent from "../../Components/TabComponent";
import { FaUser } from "react-icons/fa";
import { SlLock } from "react-icons/sl";
import { IoNotificationsOutline } from "react-icons/io5";
import PersonalInfo from "../../Components/SuperAdmin/settings/PersonalInfo";
import Security from "../../Components/SuperAdmin/settings/Security";
import Notifications from "../../Components/SuperAdmin/settings/Notifications";

export default function Settingsa() {
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
  ];
  return (
    <>
      <div className="mb-2">
        <h2 className="font-semibold text-3xl">Settings</h2>
        <p className="text-gray-600">
        Manage your account preferences and settings.
        </p>
      </div>
      <div className="border border-[#A2A1A833] rounded-[10px] p-3">
        <TabComponent tabs={tabData} />
      </div>
    </>
  );
}
