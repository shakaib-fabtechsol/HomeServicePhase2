import React, { useEffect } from "react";
import CommonDashboard from '../../Components/Common/CommonDashboard'

function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return (
    <CommonDashboard />
  )
}

export default Dashboard
