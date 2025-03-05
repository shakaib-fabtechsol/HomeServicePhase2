import React, { useEffect } from "react";
import TabComponent from "../Components/TabComponent";
import All from "../Components/Notification/All";
import { Read } from "../Components/Notification/Read";
import Unread from "../Components/Notification/Unread";

const Notificationc = () => {
  useEffect(() => {
    document.title = "Notifications";
  }, []);
  const tabData = [
    { label: "All", content: <All /> },
    { label: "Read", content: <Read /> },
    { label: "Unread", content: <Unread /> },
  ];
  return (
    <div>
      <div className="my-3">
        <h2 className="font-semibold sm:text-3xl text-xl myhead">
          Notifications
        </h2>
        <p className="myblack sm:text-sm text-xs">
          Stay Updated with your notifications.
        </p>
      </div>
      <TabComponent tabs={tabData} />
    </div>
  );
};

export default Notificationc;
