import React from "react";
import ServiceDetail from "../../Components/Services.jsx/ServiceDetail";
import { useDeleteDealMutation, useGetDealQuery, useGetUserDetailsQuery } from "../../services/base-api";

function DealDetails() {
  return <ServiceDetail role="superadmin" backto={"/superadmin/prodetails"} useGetUserDetailsQuery={useGetUserDetailsQuery} useGetDealQuery={useGetDealQuery} useDeleteDealMutation={useDeleteDealMutation} />;
}

export default DealDetails;
