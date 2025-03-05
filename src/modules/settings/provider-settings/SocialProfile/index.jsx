  import React, { useState } from "react";
  import { Modal } from "@mui/material";
  import { useForm } from "react-hook-form";
  import Facebook from "../../../../assets/img/Facebook-icon.png";
  import Youtube from "../../../../assets/img/Youtube-icon.png";
  import Twitter from "../../../../assets/img/Twitter-icon.png";
  import Instagram from "../../../../assets/img/Instagram-icon.png";
  import Linkedin from "../../../../assets/img/Linkdin-icon.png";
  import Business from "../../../../assets/img/Business-icon.png";
  import { Link } from "react-router-dom";
  import { CiTrash } from "react-icons/ci";
  import { useSelector, useDispatch } from "react-redux";
  import {
    useAddSocialProfileMutation,
    useDeleteSocialProfileMutation,
  } from "../../../../services/settings";
  import { setUser } from "../../../../redux/reducers/authSlice";
  import Swal from "sweetalert2";
  import Loader from "../../../../Components/MUI/Loader";

  const SocialProfileModule = ({ handleTabChange }) => {
    const userData = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const [addSocialProfile, { isLoading }] = useAddSocialProfileMutation();
    const [deleteSocialProfile, { isLoading: deleteLoading }] =
      useDeleteSocialProfileMutation();
    const [selectedSocial, setSelectedSocial] = useState(null);

    console.log("userDataaaa", userData);
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      mode: "onChange",
      defaultValues: {
        facebook: userData?.social?.facebook || "",
        twitter: userData?.social?.twitter || "",
        instagram: userData?.social?.instagram || "",
        linkedin: userData?.social?.linkedin || "",
        youtube: userData?.social?.youtube || "",
        google_business: userData?.social?.google_business || "",
      },
    });

    console.log("userData?.facebook", userData);
    const urlPattern = {
      value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
      message: "Please enter a valid URL",
    };

    const onSubmit = async (data) => {
      try {
        const formData = new FormData();
        formData.append("user_id", userData.id);

        // Get the selected social platform name in lowercase
        const socialType = selectedSocial.name.toLowerCase().replace(" ", "_");
        formData.append(socialType, data[socialType]);

        const response = await addSocialProfile(formData);

        if (response) {
          // handleTabChange(6);
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: `Your ${selectedSocial.name} profile has been successfully connected.`,
            showConfirmButton: false,
            timer: 2000,
          });

          setSelectedSocial(null);
          reset();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            error?.message ||
            "Something went wrong while connecting your social profile.",
        });
      }
    };
    const handleDeleteSocial = async (link, name) => {
      const formData = new FormData();
      formData.append(name.toLowerCase().replace(" ", "_"), link);
      formData.append("id", userData.id);
      const response = await deleteSocialProfile(formData);
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your social profile has been successfully deleted.",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    };

    // Update socialLinks to show existing links
    const socialLinks = [
      {
        name: "Facebook",
        avatar: Facebook,
        link: userData?.social?.facebook || "",
      },
      { name: "Twitter", avatar: Twitter, link: userData?.social?.twitter || "" },
      {
        name: "Instagram",
        avatar: Instagram,
        link: userData?.social?.instagram || "",
      },
      {
        name: "LinkedIn",
        avatar: Linkedin,
        link: userData?.social?.linkedin || "",
      },
      { name: "YouTube", avatar: Youtube, link: userData?.social?.youtube || "" },
      {
        name: "Google Business",
        avatar: Business,
        link: userData?.social?.google_business || "",
      },
    ];

    console.log("socialLinks", socialLinks);

    if (isLoading) {
      return <Loader />;
    }
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
                      <CiTrash
                        className="text-[24px]"
                        onClick={() =>
                          handleDeleteSocial(social.link, social.name)
                        }
                      />
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
            onClose={() => {
              setSelectedSocial(null);
              reset();
            }}
            sx={{ m: 2 }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] outline-none">
              <div className="bg-white rounded-[12px] p-4 max-h-[calc(100dvh-200px)] overflow-y-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
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
                        type="text"
                        {...register(
                          selectedSocial.name.toLowerCase().replace(" ", "_"),
                          {
                            required: "This field is required",
                            pattern: urlPattern,
                          }
                        )}
                      />
                      {errors[
                        selectedSocial.name.toLowerCase().replace(" ", "_")
                      ] && (
                        <p className="text-red-500 text-sm mt-1">
                          {
                            errors[
                              selectedSocial.name.toLowerCase().replace(" ", "_")
                            ].message
                          }
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="border rounded-lg w-[150px] py-[10px] text-white font-semibold bg-[#0F91D2]"
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

  export default SocialProfileModule;
