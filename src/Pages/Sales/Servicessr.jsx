import React from "react";
import TabComponent from "../../Components/TabComponent";
import All from "../../Components/Sales/Services/All";
import Assigned from "../../Components/Sales/Services/Assigned";

export default function Servicessr() {
  const tabData = [
    { label: "All", content: <All /> },
    { label: "Assigned ", content: <Assigned /> },
  ];
  return (
    <div>
      <TabComponent tabs={tabData} />
    </div>
  );
}
