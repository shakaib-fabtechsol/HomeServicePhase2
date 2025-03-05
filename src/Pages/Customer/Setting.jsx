import React, { useEffect, useState } from "react";
import MyDetail from "../../Components/ProviderSetting/MyDetail";
import ServiceArea from "../../Components/ProviderSetting/ServiceArea";
import BusinessProfile from "../../Components/ProviderSetting/BusinessProfile";
import CertificationHour from "../../Components/ProviderSetting/CertificationHour";
import AdditionalInfo from "../../Components/ProviderSetting/AdditionalInfo";
import SocialProfile from "../../Components/ProviderSetting/SocialProfile";
import Password from "../../Components/ProviderSetting/Password";
import ChannelConversation from "../../Components/ProviderSetting/ChannelConversation";
import Payment from "../../Components/ProviderSetting/Payment";
import TabComponent from "../../Components/TabComponent";

function Setting() {
  const [value,setValue]=useState(0);
  useEffect(() => {
    document.title = "Setting";
  }, []);
  
  const tabData = [
    { label: "My details", content: <MyDetail /> },
    { label: "Social Profiles", content: <SocialProfile /> },
    { label: "Password", content: <Password /> },
    { label: "Notification", content: "Notification" },
    { label: "Payment/Payout Info", content: <Payment /> },
  ];

  const onchange=(input)=>{
    setValue(input)
  }

  return (
    <div>
      <div className="my-2">
        <h2 className="font-semibold text-3xl myhead">Settings</h2>
        <p className="myblack mb-4">
          Track, manage and forecast your customers and orders.
        </p>
      </div>
      <div className="mt-5">
        <TabComponent tabs={tabData} onChange={onchange} value={value}/>
      </div>
    </div>
  );
}

export default Setting;
