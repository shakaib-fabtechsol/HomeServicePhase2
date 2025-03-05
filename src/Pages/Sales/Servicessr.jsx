import React from "react";
import TabComponent from "../../Components/TabComponent";
import All from "../../Components/Sales/Services/All";
import Assigned from "../../Components/Sales/Services/Assigned";
import { useEffect, useState } from "react";

export default function Servicessr() {
const [value,setValue]=useState(0);

const onchange=(tab)=>{
  setValue(tab);

}

  const tabData = [
    { label: "All", content: <All /> },
    { label: "Assigned ", content: <Assigned /> },
  ];
  useEffect(() => {
    document.title = "Services";
  }, []);
  return (
    <div>
      <TabComponent tabs={tabData} onChange={onchange} value={value}  />
    </div>
  );
}
