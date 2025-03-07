import React, { useState } from "react";


import SocialProfileModule from "../../modules/settings/provider-settings/SocialProfile";
import {
    useAddCustomerSocialMutation,
    useDeleteSocialProfileMutation
   
  } from "../../../src/services/settings";

const CustomerSocial = ({ handleTabChange }) => {



  return <SocialProfileModule handleTabChange={handleTabChange} useAddSocialProfileMutation={useAddCustomerSocialMutation} useDeleteSocialProfileMutation={useDeleteSocialProfileMutation} />;
};

export default CustomerSocial;
