import React, { useEffect } from "react";
import ProfileComponent from "../../Components/ProfileComponent";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetsaleproviderByIdQuery } from "../../services/serviceprovider";
import Loader from "../../Components/MUI/Loader";

function Prodetailssr1() {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const state = location.state || {};

  const { data, isLoading, isError } = useGetsaleproviderByIdQuery(state?.Id);
  useEffect(() => {
    document.title = "Providers Details";
  }, []);
  if (isLoading) return (
    <div className="flex items-center justify-center h-screen">
      <Loader />
    </div>
  )

  console.log(data,"this is data ")

  if (isError) return (<div className="text-center flex items-center justify-center"><h1>Something went wrong</h1></div>)

  return (
    <div>
      <ProfileComponent
        data={data}
        userRole="salesrep"
        serviceDetailTo="/sales/dealdetails"
      />
    </div>
  );
}

export default Prodetailssr1;
