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
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    document.title = "Settings";
  }, []);
  const tabData = [
    { label: "Personal Profile", content: <MyDetail handleTabChange={handleTabChange}/> },
    { label: "Service Area", content: <ServiceArea handleTabChange={handleTabChange}/> },
    { label: "Business Profile", content: <BusinessProfile handleTabChange={handleTabChange}/> },
    { label: "Certifications & Hours", content: <CertificationHour handleTabChange={handleTabChange}/> },
    { label: "Additional Info", content: <AdditionalInfo handleTabChange={handleTabChange}/> },
    { label: "Social Profiles", content: <SocialProfile handleTabChange={handleTabChange}/> },
    { label: "Password", content: <Password handleTabChange={handleTabChange}/> },
    { label: "Channels for Conversations", content: <ChannelConversation handleTabChange={handleTabChange}/> },
    { label: "Payment/Payout Info", content: <Payment handleTabChange={handleTabChange}/> },
    { label: "Publish", content: <Publish handleTabChange={handleTabChange}/> },
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
        <TabComponent tabs={tabData} value={activeTab} onChange={handleTabChange} />
      </div>
    </div>
  );
}

export default Settings;
