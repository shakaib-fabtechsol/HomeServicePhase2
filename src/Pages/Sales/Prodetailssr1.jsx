import React, { useEffect } from "react";
import ProfileComponent from "../../Components/ProfileComponent";

function Prodetailssr1() {
  useEffect(() => {
    document.title = "Providers Details";
  }, []);
  return (
    <div>
      <ProfileComponent
        userRole="salesrep"
        serviceDetailTo="/sales/dealdetails"
      />
    </div>
  );
}

export default Prodetailssr1;
