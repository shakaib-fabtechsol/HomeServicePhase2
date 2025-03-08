import React, { useEffect } from "react";
import CommonDashboard from "../../Components/Common/CommonDashboard";

function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return (
    <CommonDashboard
      orderto="/customer/order"
      conversationto="/customer/message"
      serviceDetailTo="/customer/dealDetails"
    />
  );
}

export default Dashboard;
