import React, { useEffect } from "react";
import ProfileComponent from "../../Components/ProfileComponent";

export default function ProDetailssr() {
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
