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
import { useAddPaymentDetailsMutation, useGetMyDetailsQuery, useGetUserDetailsQuery } from "../../services/settings";
import { setUser } from "../../redux/reducers/authSlice";
import { useSelector, useDispatch } from "react-redux";

function Settings() {
  const userData = useSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState(0);
  const { data, isLoading } = useGetUserDetailsQuery(userData?.id);
  console.log("userData...............", data);
  const dispatch = useDispatch();

  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    document.title = "Settings";
    if (data) {
      const payload = {
        ...data.user,
        businessProfile: data.businessProfile[0] || {},
        payment: data.getPayment[0] || {},
        deal: data.getDeal[0] || {},
        social: data.getSocial[0] || {},
      };

      console.log("payload..........", payload);
      dispatch(setUser(payload));
    }
  }, [data, dispatch]);
  const tabData = [
    {
      label: "Personal Profile",
      content: <MyDetail handleTabChange={handleTabChange} />,
    },
    {
      label: "Service Area",
      content: <ServiceArea handleTabChange={handleTabChange} />,
    },
    {
      label: "Business Profile",
      content: <BusinessProfile handleTabChange={handleTabChange} />,
    },
    {
      label: "Certifications & Hours",
      content: <CertificationHour handleTabChange={handleTabChange} />,
    },
    {
      label: "Additional Info",
      content: <AdditionalInfo handleTabChange={handleTabChange} />,
    },
    {
      label: "Social Profiles",
      content: <SocialProfile handleTabChange={handleTabChange} />,
    },
    {
      label: "Password",
      content: <Password handleTabChange={handleTabChange} />,
    },
    {
      label: "Channels for Conversations",
      content: <ChannelConversation handleTabChange={handleTabChange} />,
    },
    {
      label: "Payment/Payout Info",
      content: <Payment handleTabChange={handleTabChange} useGetMyDetailsQuery={useGetMyDetailsQuery} useAddPaymentDetailsMutation={useAddPaymentDetailsMutation} />,
    },
    {
      label: "Publish",
      content: <Publish handleTabChange={handleTabChange} />,
    },
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
        <TabComponent
          tabs={tabData}
          value={activeTab}
          onChange={handleTabChange}
        />
      </div>
    </div>
  );
}

export default Settings;
