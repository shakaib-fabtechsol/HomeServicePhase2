import React, { useState } from "react";
import { Modal } from "@mui/material";
import Facebook from "../../assets/img/Facebook-icon.png";
import Youtube from "../../assets/img/Youtube-icon.png";
import Twitter from "../../assets/img/Twitter-icon.png";
import Instagram from "../../assets/img/Instagram-icon.png";
import Linkedin from "../../assets/img/Linkdin-icon.png";
import Business from "../../assets/img/Business-icon.png"
import { Link } from "react-router-dom";
import { CiTrash } from "react-icons/ci";

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
    <div>
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
                    <p className="text-[#535862] text-sm break-all">
                      {social.link}
                    </p>
                  )}
                </div>
              </div>
              <div className="ms-auto">
                {social.link ? (
                  <Link to="">
                    <CiTrash className="text-[24px]" />
                  </Link>
                ) : (
                  <button
                    onClick={() => setSelectedSocial(social)}
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
              <form>
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
                  <div>
                    <input
                      className={`border w-full p-3 rounded-[8px] focus:outline-none ${
                        errors[
                          selectedSocial.name.toLowerCase().replace(" ", "_")
                        ]
                          ? "border-red-500"
                          : "border-[#D5D7DA]"
                      }`}
                      value={
                        formData[
                          selectedSocial.name.toLowerCase().replace(" ", "_")
                        ] || ""
                      }
                      onChange={handleChange}
                      type="url"
                      required
                    />
                    {errors[
                      selectedSocial.name.toLowerCase().replace(" ", "_")
                    ] && (
                      <p className="text-red-500 text-sm mt-1">
                        {
                          errors[
                            selectedSocial.name.toLowerCase().replace(" ", "_")
                          ]
                        }
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className={`border rounded-lg w-[150px] py-[10px] text-white font-semibold bg-[#0F91D2]`}
                  >
                    Save
                  </button>
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
