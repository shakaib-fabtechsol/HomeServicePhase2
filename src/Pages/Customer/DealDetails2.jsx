import React from "react";
import ServiceDetail2 from "../../Components/Services.jsx/ServiceDetail2";
import { useDeleteDealMutation, useGetDeal1Query, useGetUserDetailsQuery } from "../../services/base-api";

function DealDetails2() {
  return <ServiceDetail2  hide={true} role="provider" backto={"/provider/services"} useGetUserDetailsQuery={useGetUserDetailsQuery} useGetDealQuery={useGetDeal1Query} useDeleteDealMutation={useDeleteDealMutation} />;
}

export default DealDetails2;
  