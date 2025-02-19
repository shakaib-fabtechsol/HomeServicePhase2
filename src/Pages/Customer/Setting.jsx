import React, { useEffect } from "react";
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
  useEffect(() => {
    document.title = "Settings";
  }, []);
  const tabData = [
    { label: "My details", content: <MyDetail /> },
    { label: "Social Profiles", content: <SocialProfile />},
    { label: "Password", content: <Password /> },
    { label: "Notification", content: "Notification" },
    { label: "Payment/Payout Info", content: <Payment /> },
  ];

  return (
    <div>
      <div className="my-2">
        <h2 className="font-semibold text-3xl myhead">Settings</h2>
        <p className="myblack">Track, manage and forecast your customers and orders.</p>
      </div>
      <div className="mt-5">
        <TabComponent tabs={tabData}/>
      </div>
    </div>
  );
}

export default Setting;
