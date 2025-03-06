import React, { useEffect, useState } from "react";

import ProfileComponent from "../../Components/ProfileComponent";
import { useLocation } from "react-router-dom";
import { useGetproviderByIdQuery } from "../../services/serviceprovider";
import Loader from "../../Components/MUI/Loader";

export default function ProDetails() {
  const location = useLocation();
  const state = location.state || {}; 
  console.log(state?.Id,"Id of provider");

  const {data,isLoading,isError}=useGetproviderByIdQuery(state?.Id)
  useEffect(() => {
    document.title = "Providers Details";
  }, []);
  if(isLoading) return (
    <div className="flex items-center justify-center h-screen">
      <Loader />
    </div>
)

  if(isError) return (<div className="text-center flex items-center justify-center"><h1>Something went wrong</h1></div>)

  return (
    <div>
      <ProfileComponent
      data={data}
        userRole="superadmin"
        serviceDetailTo="/superadmin/dealDetails"
      />
    </div>
  );
}
