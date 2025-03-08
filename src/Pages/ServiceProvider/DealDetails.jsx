import React from "react";
import ServiceDetail from "../../Components/Services.jsx/ServiceDetail";

function DealDetails() {
  return <ServiceDetail role="provider" backto={"/provider/services"} useGetUserDetailsQuery={useGetUserDetailsQuery} useGetDealQuery={useGetDealQuery} useDeleteDealMutation={useDeleteDealMutation} />;
}

export default DealDetails;
