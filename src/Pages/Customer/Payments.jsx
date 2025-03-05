import React, { useEffect, useState } from "react";
import CommonPayments from "../../Components/Common/CommonPayments";

function Payments() {
  useEffect(() => {
    document.title = "Payments";
  }, []);
  return <CommonPayments />;
}

export default Payments;
