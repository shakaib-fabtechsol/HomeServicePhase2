import React from "react";
import { useEffect, useState } from "react";
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
import Publish from "../../Components/ProviderSetting/Publish";

function Settings() {
  useEffect(() => {
    document.title = "Settings";
  }, []);
  const tabData = [
    { label: "Personal Profile", content: <MyDetail /> },
    { label: "Service Area", content: <ServiceArea /> },
    { label: "Business Profile", content: <BusinessProfile /> },
    { label: "Certifications & Hours", content: <CertificationHour /> },
    { label: "Additional Info", content: <AdditionalInfo /> },
    { label: "Social Profiles", content: <SocialProfile /> },
    { label: "Password", content: <Password /> },
    { label: "Channels for Conversations", content: <ChannelConversation /> },
    { label: "Payment/Payout Info", content: <Payment /> },
    { label: "Publish", content: <Publish /> },
  ];

  return (
    <div>
      <div className="my-2">
        <h2 className="font-semibold text-3xl myhead">Settings</h2>
        <p className="myblack mb-4">
          Update all your general settings including: business, personal, and
          payment settings
        </p>
      </div>
      <div>
        <TabComponent tabs={tabData} />
      </div>
    </div>
  );
}

export default Settings;
