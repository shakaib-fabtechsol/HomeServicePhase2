import React, { useState } from "react";
import { Modal } from "@mui/material";
import Facebook from "../../assets/img/Facebook-icon.png";
import Youtube from "../../assets/img/Youtube-icon.png";
import Twitter from "../../assets/img/Twitter-icon.png";
import Instagram from "../../assets/img/Instagram-icon.png";
import Linkedin from "../../assets/img/Linkdin-icon.png";
import Business from "../../assets/img/Business-icon.png";
import { Link } from "react-router-dom";
import { CiTrash } from "react-icons/ci";
import SocialProfileModule from "../../modules/settings/provider-settings/SocialProfile";

const SocialProfile = () => {
  const [selectedSocial, setSelectedSocial] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const validateUrl = (url) => {
    const urlPattern = /^(https?:\/\/)?(www\.)?[\w-]+(\.[a-z]{2,})+\/?.*$/i;
    return urlPattern.test(url);
  };

  const handleChange = (e) => {
    const socialKey = selectedSocial.name.toLowerCase().replace(" ", "_");
    const value = e.target.value;

    setFormData({ ...formData, [socialKey]: value });

    if (value && !validateUrl(value)) {
      setErrors({
        ...errors,
        [socialKey]: `Please enter a valid ${selectedSocial.name} URL`,
      });
    } else {
      setErrors({ ...errors, [socialKey]: "" });
    }
  };

  const socialLinks = [
    { name: "Facebook", avatar: Facebook, link: "" },
    { name: "Twitter", avatar: Twitter, link: "" },
    { name: "Instagram", avatar: Instagram, link: "" },
    { name: "LinkedIn", avatar: Linkedin, link: "" },
    { name: "YouTube", avatar: Youtube, link: "" },
    { name: "Google Business", avatar: Business, link: "" },
  ];

  return (
   <SocialProfileModule/>
  );
};

export default SocialProfile;
