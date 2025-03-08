import React from "react";
import ServiceDetail from "../../Components/Services.jsx/ServiceDetail";
import { useDeleteDealMutation, useGetDeal1Query, useGetLeadingDealQuery, useGetUserDetailsQuery } from "../../services/base-api";

function LandingDetails() {
  return <ServiceDetail  hide={true} role="provider" backto={"/provider/services"} useGetUserDetailsQuery={useGetUserDetailsQuery} useGetDealQuery={useGetLeadingDealQuery} useDeleteDealMutation={useDeleteDealMutation} />;
}

export default LandingDetails;
