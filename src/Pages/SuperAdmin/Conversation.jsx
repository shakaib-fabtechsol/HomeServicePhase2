import React, { useEffect } from "react";
import TabComponent from "../../Components/TabComponent";
import Channels from "../../Components/SuperAdmin/Conversation/Channels";
import ReferralCom from "../../Components/SuperAdmin/Conversation/ReferralCom";
import TransFee from "../../Components/SuperAdmin/Conversation/TransFee";
import CustomerServiceFee from "../../Components/SuperAdmin/Conversation/CustomerServiceFee";
import ProServiceFee from "../../Components/SuperAdmin/Conversation/ProServiceFee";
import { useGetpricingQuery, useUpdatePricingMutation } from "../../services/pricing";
import Loader from "../../Components/MUI/Loader";
import { selectCurrentUser } from "../../redux/reducers/authSlice";
import { useSelector } from "react-redux";
export default function Conversation() {
  const {data,isLoading}= useGetpricingQuery();
  const [updatePrice,{isLoading:loading}]=useUpdatePricingMutation();
  const [value, setValue] = React.useState(0);
  const Admin=useSelector(selectCurrentUser);
  const changetab = (value) => {
    setValue(value);
  }
  console.log(data,"this is data for the price")

  useEffect(() => {
    document.title = "Pricing";
  }, []);
  const tabData = [
    { label: "Conversation Channels", content: <Channels data={data?.GetPriceDetails} updatePrice={updatePrice} user_id={Admin?.id} /> },
    { label: "Referral commission ", content: <ReferralCom data={data?.GetPriceDetails} updatePrice={updatePrice} user_id={Admin?.id} /> },
    { label: "Transection fees", content: <TransFee data={data?.GetPriceDetails} updatePrice={updatePrice} user_id={Admin?.id} /> },
    // { label: "Customer service fee", content: <CustomerServiceFee /> },
    // { label: "Provider service fee", content: <ProServiceFee /> },
  ];
  if(isLoading || loading){
    return <Loader/>
  }
  return (
    <div>
      <div className="mb-2">
        <h2 className="font-semibold text-3xl">Pricing</h2>
        <p className="text-gray-600">
          Track and manage your pricing.
        </p>
      </div>
      <TabComponent tabs={tabData} onChange={changetab} value={value} />
    </div>
  );
}
