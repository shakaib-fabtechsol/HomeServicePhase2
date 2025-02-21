import React from "react";
import { useEffect, useState } from "react";
import TabComponent from "../../Components/TabComponent";
import All from "../../Components/Notification/All";
import { Read } from "../../Components/Notification/Read";
import Unread from "../../Components/Notification/Unread";
import Notifications from "../../Components/SuperAdmin/settings/Notifications";

export default function Notificationsr() {
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
      <TabComponent tabs={tabData} />
    </div>
  );
}
