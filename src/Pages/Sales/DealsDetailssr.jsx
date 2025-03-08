import React from "react";
import ServiceDetail from "../../Components/Services.jsx/ServiceDetail";
import { useDeleteDealMutation, useGetDealQuery, useGetUserDetailsQuery } from "../../services/base-api";

export default function DealsDetailssr() {
  return (
    <div>
      <ServiceDetail role="salesrep"  useGetUserDetailsQuery={useGetUserDetailsQuery} useGetDealQuery={useGetDealQuery} useDeleteDealMutation={useDeleteDealMutation} backto={"/sales/prodetails"} />
    </div>
  );
}
