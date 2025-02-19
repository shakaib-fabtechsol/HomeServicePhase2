import React from "react";
import TabComponent from "../../Components/TabComponent";
import Unread from "../../Components/Notification/Unread";
import { Read } from "../../Components/Notification/Read";
import All from "../../Components/Notification/All";

export default function Notificationssa() {
  const tabData = [
    { label: "All", content: <All /> },
    { label: "Read", content: <Read /> },
    { label: "Unread", content: <Unread /> },
  ];
  return (
    <div>
      <TabComponent tabs={tabData} />
    </div>
  );
}
