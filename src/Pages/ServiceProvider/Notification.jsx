import React, { useEffect } from "react";
import TabComponent from "../../Components/TabComponent";
import All from "../../Components/Notification/All";
import { Read } from "../../Components/Notification/Read";
import Unread from "../../Components/Notification/Unread";
import Notifications from "../../Components/SuperAdmin/settings/Notifications";

const Notification = () => {
  useEffect(() => {
    document.title = "Notification";
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
      <div className="my-3">
        <h2 className="font-semibold text-3xl myhead">Notifications</h2>
        <p className="myblack">Stay Updated with your notifications.</p>
      </div>
      <TabComponent tabs={tabData} />
    </div>
  );
};

export default Notification;
