import React, { useEffect } from "react";
import CommonDashboard2 from "../../Components/Common/CommonDashboard2";

function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard2";
  }, []);
  return (
    <CommonDashboard2
      orderto="/customer/order"
      conversationto="/customer/message"
      serviceDetailTo="/customer/dealDetails"
    />
  );
}

export default Dashboard;
