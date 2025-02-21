import React, { useEffect } from "react";
import TabComponent from "../../Components/TabComponent";
import Unread from "../../Components/Notification/Unread";
import { Read } from "../../Components/Notification/Read";
import All from "../../Components/Notification/All";
import Notifications from "../../Components/SuperAdmin/settings/Notifications";
import { IoNotificationsOutline } from "react-icons/io5";

export default function Notificationssa() {
  useEffect(() => {
    document.title = "Notifications";
  }, []);
  const tabData = [
    { label: "All", content: <All /> },
    { label: "Read", content: <Read /> },
    { label: "Unread", content: <Unread /> },
    {
      label: "Setting",
      content: <Notifications />,
    },
  ];
  return (
    <div>
      <div className="mb-2">
        <h2 className="font-semibold text-3xl">Notifications</h2>
        <p className="text-gray-600">
          Track and manage your favorite services.
        </p>
      </div>
      <TabComponent tabs={tabData} />
    </div>
  );
}
