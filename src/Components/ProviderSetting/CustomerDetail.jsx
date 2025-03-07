import React from "react";

import MyDetailModule from "../../modules/settings/provider-settings/CustomerDetails";

const CustomerDetail = ({ handleTabChange }) => {

  return (
    <>
  
      <MyDetailModule handleTabChange={handleTabChange} />
    </>
  );
};

export default CustomerDetail;
