import React, { useState, useEffect } from "react";
import logo from "../../assets/img/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PrivacyPolicyModule from "../../modules/auth/PrivacyPolicy";

function PrivacyPolicy() {
  return <PrivacyPolicyModule />;
}

export default PrivacyPolicy;
