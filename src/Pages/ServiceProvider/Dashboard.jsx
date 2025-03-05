import React from "react";
import CommonDashboard from "../../Components/Common/CommonDashboard";
import { useEffect, useState } from "react";

function Dashboard() {
  return (
    <div>
      <CommonDashboard
        orderto="/provider/orders"
        conversationto="/provider/conversations"
        serviceDetailTo="/provider/dealDetails"
      />
    </div>
  );
}

export default Dashboard;
