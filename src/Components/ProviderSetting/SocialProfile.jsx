import React, { useState } from "react";


import SocialProfileModule from "../../modules/settings/provider-settings/SocialProfile";
import {
  useAddSocialProfileMutation,
  useDeleteSocialProfileMutation,
 
} from "../../../src/services/settings";
const SocialProfile = ({ handleTabChange }) => {



  return <SocialProfileModule handleTabChange={handleTabChange} useAddSocialProfileMutation={useAddSocialProfileMutation} useDeleteSocialProfileMutation={useDeleteSocialProfileMutation} />;
};

export default SocialProfile;
