import React from "react";
import ServiceDetail from "../../Components/Services.jsx/ServiceDetail";
import { useDeleteDealMutation, useGetDeal1Query, useGetUserDetailsQuery } from "../../services/base-api";

function DealDetails2() {
  return <ServiceDetail  hide={true} role="provider" backto={"/provider/services"} useGetUserDetailsQuery={useGetUserDetailsQuery} useGetDealQuery={useGetDeal1Query} useDeleteDealMutation={useDeleteDealMutation} />;
}

export default DealDetails2;
