
import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import Facebook from "../../assets/img/Facebook-icon.png";
import Youtube from "../../assets/img/Youtube-icon.png";
import Twitter from "../../assets/img/Twitter-icon.png";
import Instagram from "../../assets/img/Instagram-icon.png";
import Linkedin from "../../assets/img/Linkdin-icon.png";
import Business from "../../assets/img/Business-icon.png";
import Loader from "../../Components/MUI/Loader";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { CiTrash } from "react-icons/ci";
import {useSelector} from "react-redux";
const SocialProfile = () => {
  const [selectedSocial, setSelectedSocial] = useState(null);
  const token =useSelector((state)=>state.auth.token);
  console.log(token);
  const user=useSelector((state)=>state.auth.user);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_id: '', 
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    google_business: '',
  });
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



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!token) {
      toast.error("No token found. Please log in.");
      return;
    }

    const socialKey = selectedSocial.name.toLowerCase().replace(" ", "_");
    const userInputUrl = formData[socialKey];

    setLoading(true);

    try {
      const payload = {
        user_id: user?.id,
        [socialKey]: userInputUrl,
      };

      const response = await axios.post(
        "https://marketplace.thefabulousshow.com/api/Social",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const errorMessages = {
        "Invalid Facebook URL":
          "The provided Facebook URL is invalid. Please enter a valid URL.",
        "Invalid Instagram URL":
          "The provided Instagram URL is invalid. Please enter a valid URL.",
        "Invalid LinkedIn URL":
          "The provided LinkedIn URL is invalid. Please enter a valid URL.",
        "Invalid Google Business URL":
          "The provided Google Business URL is invalid. Please enter a valid URL.",
        "Invalid YouTube URL":
          "The provided YouTube URL is invalid. Please enter a valid URL.",
        "Invalid Twitter URL":
          "The provided Twitter URL is invalid. Please enter a valid URL.",
      };

      const backendMessage = response.data?.message || response.data?.error;

      if (backendMessage && errorMessages[backendMessage]) {
        toast.error(errorMessages[backendMessage]);
      } else if (backendMessage) {
        toast.success(backendMessage);
        setSelectedSocial(null);
      } else {
        toast.success(`${selectedSocial.name} URL submitted successfully!`);
        setSelectedSocial(null);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to submit. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { name: "Facebook", avatar: Facebook, link: formData.facebook },
    { name: "Twitter", avatar: Twitter, link: formData.twitter },
    { name: "Instagram", avatar: Instagram, link: formData.instagram },
    { name: "LinkedIn", avatar: Linkedin, link: formData.linkedin },
    { name: "YouTube", avatar: Youtube, link: formData.youtube },
    { name: "Google Business", avatar: Business, link: formData.google_business },
  ];

  const handleConnect = (social) => {
    setSelectedSocial(social);
  };
 

  const handleDelete = async (social) => {
    try {
      const socialName = social.link ? new URL(social.link).hostname.replace('www.', '').split('.')[0] : '';
    
      const data = {
        id: user?.id,
        [socialName]: social.link 
      };
     
      const response = await axios.post(
        `https://marketplace.thefabulousshow.com/api/SocialDelete`,
        data, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
  
      if (response.data?.message) {
        toast.success(response.data.message);
      }
  
      setFormData((prevState) => ({ ...prevState, [socialName]: "" }));
  
    } catch (error) {
      // Handle error
      toast.error("Failed to delete. Please try again.");
      console.error("Error deleting social link:", error);
    }
  };
  
  
  
  return (
    <div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Loader />
        </div>
      )}
      <div className="border-b border-[#E9EAEB] pb-5 items-center flex-wrap gap-4">
        <p className="text-lg font-semibold text-[#181D27]">
          Connect Your Social
        </p>
        <p className="text-[#535862] text-sm">
          Update and connect your social profile links.
        </p>
      </div>
      <div>
        {socialLinks.map((social, index) => (
          <div key={index} className="py-5 border-b border-[#E9EAEB]">
            <div className="flex items-center flex-wrap gap-3 justify-between py-3 px-4 bg-[#FAFAFA] min-h-[60px] rounded-[8px]">
              <div className="flex gap-3 items-center">
                <img
                  className="size-6 max-w-6 object-contain"
                  src={social.avatar}
                  alt={social.name}
                />
                <div>
                  <p className="font-medium text-[#343434]">{social.name}</p>
                  {social.link && (
                    <div className="text-[#535862] text-sm break-all">
                      <p>{social.link}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="ms-auto">
                {social.link ? (
                  <button
                    onClick={() => handleDelete(social)}
                    className="text-[24px] text-[#FF4136] p-2"
                  >
                    <CiTrash />
                  </button>
                ) : (
                  <button
                    onClick={() => handleConnect(social)}
                    className="text-white text-sm font-semibold bg-[#0F91D2] border border-[#0F91D2] rounded-[8px] shadow-[0px_1px_2px_0px_#0A0D120D] py-3 px-4"
                  >
                    Connect
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedSocial && (
        <Modal
          open={!!selectedSocial}
          onClose={() => setSelectedSocial(null)}
          sx={{ m: 2 }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] outline-none">
            <div className="bg-white rounded-[12px] p-4 max-h-[calc(100dvh-200px)] overflow-y-auto">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center mt-5 gap-5">
                  <img
                    className="size-12 max-w-12"
                    src={selectedSocial.avatar}
                    alt={selectedSocial.name}
                  />
                  <p className="text-lg text-[#181D27] text-center font-semibold">
                    Connect Your {selectedSocial.name} Account
                  </p>
                  <p className="text-[#535862] text-center">
                    Enter your profile URL to connect.
                  </p>
                  {selectedSocial.link && (
                    <div className="w-full text-center p-3 bg-[#F0F5F7] rounded-[8px] mb-4">
                      <p className="text-[#343434]">Connected: {selectedSocial.link}</p>
                    </div>
                  )}
                  <div>
                    <input
                      type="text"
                      value={formData[selectedSocial.name.toLowerCase().replace(" ", "_")]}
                      onChange={handleChange}
                      className="w-full bg-[#F0F5F7] rounded-[8px] px-3 py-2 mt-4 text-[#181D27] text-sm"
                      placeholder={`Enter ${selectedSocial.name} URL`}
                    />
                    {errors[selectedSocial.name.toLowerCase().replace(" ", "_")] && (
                      <p className="text-xs text-red-500 mt-2">
                        {errors[selectedSocial.name.toLowerCase().replace(" ", "_")]}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-3 items-center">
                  <button
                    type="submit"
                    className="bg-[#0F91D2] w-full py-2 px-5 text-white text-sm font-medium rounded-[8px]"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                  <Link
                    to="#"
                    className="text-[#FF4136] text-sm flex items-center gap-1"
                    onClick={() => setSelectedSocial(null)}
                  >
                    <CiTrash className="text-lg" />
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );

};

export default SocialProfile;
