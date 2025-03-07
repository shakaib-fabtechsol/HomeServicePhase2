import React, { useEffect, useState } from "react";
import MyDetail from "../../Components/ProviderSetting/CustomerDetail";
import Payment from "../../Components/ProviderSetting/Payment";
import TabComponent from "../../Components/TabComponent";
import CustomerSocial from "../../Components/ProviderSetting/CustomerSocial";
import PasswordModule from "../../modules/settings/provider-settings/Password";
import { useAddCustomerPaymentDetailsMutation, useAddPaymentDetailsMutation, useGetCustomerDetailsQuery, useGetMyDetailsQuery, useUpdatePasswordCustomerMutation } from "../../services/settings";

function Setting() {
  const [value,setValue]=useState(0);
  useEffect(() => {
    document.title = "Setting";
  }, []);
  const onchange=(input)=>{
    setValue(input)
  }
  const tabData = [
    { label: "My details", content: <MyDetail handleTabChange={onchange} /> },
    { label: "Social Profiles", content: <CustomerSocial handleTabChange={onchange}  /> },
    { label: "Password", content: <PasswordModule handleTabChange={onchange} useUpdateCustomerPasswordMutation={useUpdatePasswordCustomerMutation} /> },
    { label: "Notification", content: "Notification" },
    { label: "Payment/Payout Info", content: <Payment handleTabChange={onchange} useGetMyDetailsQuery={useGetCustomerDetailsQuery} useAddPaymentDetailsMutation={useAddCustomerPaymentDetailsMutation} /> },
  ];



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
