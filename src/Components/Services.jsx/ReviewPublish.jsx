import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaRegTrashCan } from "react-icons/fa6";
import { FaPencilAlt, FaRegCalendarAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { CiHeart } from "react-icons/ci";

import servicedet from "../../assets/img/service-det.png";
import PropTypes from "prop-types";
import { Box, Modal, Tab, Tabs } from "@mui/material";
import { FiPhone } from "react-icons/fi";
import { BiMessageAltDetail, BiMessageSquareDetail } from "react-icons/bi";
import { TbMailDown } from "react-icons/tb";
import { PiChats } from "react-icons/pi";
import { useParams } from "react-router-dom";
import Loader from "../../Components/MUI/Loader";

import {
  IoChatbubbleEllipsesOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { IoIosStar } from "react-icons/io";

import provider from "../../assets/img/provider.png";
import axios from "axios"; // Importing axios
import Swal from "sweetalert2";
// Importing toast if you intend to use it, or replace it with Swal.
import { toast } from "react-toastify";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ReviewPublish = ({ serviceId, setValue }) => {
  const [tag, setTags] = useState([]);
  const [pricingModel, setPricingModel] = useState("");
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [provider, setProviderData] = useState({});
  const { dealid } = useParams();
  const [value, setValued] = useState(0);

  const handleChange = (event, newValue) => {
    setValued(newValue);
  };
  const [contactopen, setcontactOpen] = React.useState(false);

  const handlecontactOpen = () => setcontactOpen(true);
  const handlecontactClose = () => setcontactOpen(false);

  const [formdata, setFormData] = useState({
    service_title: "",
    commercial: 0,
    residential: 0,
    service_category: "",
    search_tags: "",
    service_description: "",
    fine_print: "",
    image: "",
    id: "",
    pricing_model: "",
    flat_rate_price: "",
    flat_by_now_discount: "",
    flat_final_list_price: "",
    flat_estimated_service_time: "",
    hourly_rate: "",
    discount: "",
    hourly_final_list_price: "",
    hourly_estimated_service_time: "",
    title1: "",
    deliverable1: "",
    price1: "",
    by_now_discount1: "",
    final_list_price1: "",
    estimated_service_timing1: "",
    title2: "",
    deliverable2: "",
    price2: "",
    by_now_discount2: "",
    final_list_price2: "",
    estimated_service_timing2: "",
    title3: "",
    deliverable3: "",
    price3: "",
    by_now_discount3: "",
    final_list_price3: "",
    estimated_service_timing3: "",
  });

  const modalContacts = [
    { path: "#", Icon: <FiPhone />, title: "Call Pro: (785) 712-6532" },
    {
      path: "#",
      Icon: <BiMessageSquareDetail />,
      title: "Text Pro: (708) 813-8989",
    },
    {
      path: "#",
      Icon: <BiMessageAltDetail />,
      title: "Instant Chat",
    },
    { path: "#", Icon: <TbMailDown />, title: "Email Pro" },
    { path: "#", Icon: <PiChats />, title: "Direct Form" },
    {
      path: "#",
      Icon: <IoLocationOutline />,
      title: "Get Directions",
    },
  ];

  console.log("formdata", formdata);

  useEffect(() => {
    if (dealid) {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No authentication token found. Please log in.");
        return;
      }

      axios
        .get(`https://homeservice.thefabulousshow.com/api/Deal/${dealid}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const BasicInfo = response?.data?.deal[0];
          console.log("BasicInfo:", BasicInfo);
          const imagePath = BasicInfo?.image;
          const imageUrl = imagePath
            ? `https://homeservice.thefabulousshow.com/uploads/${imagePath}`
            : "/default.png";
          const model = BasicInfo?.pricing_model || "Hourly";
          setPricingModel(model);
          console.log("model", model);
          const formData = {
            service_title: BasicInfo.service_title || "",
            commercial: BasicInfo.commercial || 0,
            residential: BasicInfo.residential || 0,
            service_category: BasicInfo.service_category || "",
            search_tags: BasicInfo.search_tags || "",
            service_description: BasicInfo.service_description || "",
            fine_print: BasicInfo.fine_print || "",
            image: imageUrl,
            id: BasicInfo.id || "",
            pricing_model: BasicInfo.pricing_model || "",
            estimated_service_time: BasicInfo.estimated_service_time || "",
          };

          if (BasicInfo.pricing_model === "Flat") {
            formData.title1 = BasicInfo.title1 || "";
            formData.flat_rate_price = BasicInfo.flat_rate_price || "";
            formData.flat_by_now_discount =
              BasicInfo.flat_by_now_discount || "";
            formData.flat_final_list_price =
              BasicInfo.flat_final_list_price || "";
            formData.flat_estimated_service_time =
              BasicInfo.flat_estimated_service_time || "";
          } else if (BasicInfo.pricing_model === "Hourly") {
            formData.hourly_rate = BasicInfo.hourly_rate || "";
            formData.title2 = BasicInfo.title2 || "";
            formData.discount = BasicInfo.discount || "";
            formData.hourly_final_list_price =
              BasicInfo.hourly_final_list_price || "";
            formData.hourly_estimated_service_time =
              BasicInfo.hourly_estimated_service_time || "";
          } else if (BasicInfo.pricing_model === "Custom") {
            formData.title3 = BasicInfo.title3 || "";
            formData.deliverable1 = BasicInfo.deliverable1 || "";
            formData.price1 = BasicInfo.price1 || "";
            formData.by_now_discount1 = BasicInfo.by_now_discount1 || "";
            formData.final_list_price1 = BasicInfo.final_list_price1 || "";
            formData.estimated_service_timing1 =
              BasicInfo.estimated_service_timing1 || "";

            formData.title2 = BasicInfo.title2 || "";
            formData.deliverable2 = BasicInfo.deliverable2 || "";
            formData.price2 = BasicInfo.price2 || "";
            formData.by_now_discount2 = BasicInfo.by_now_discount2 || "";
            formData.final_list_price2 = BasicInfo.final_list_price2 || "";
            formData.estimated_service_timing2 =
              BasicInfo.estimated_service_timing2 || "";

            formData.title3 = BasicInfo.title3 || "";
            formData.deliverable3 = BasicInfo.deliverable3 || "";
            formData.price3 = BasicInfo.price3 || "";
            formData.by_now_discount3 = BasicInfo.by_now_discount3 || "";
            formData.final_list_price3 = BasicInfo.final_list_price3 || "";
            formData.estimated_service_timing3 =
              BasicInfo.estimated_service_timing3 || "";
          }

          setFormData(formData);

          setTags(
            BasicInfo.search_tags ? BasicInfo.search_tags.split(",") : []
          );
        })
        .catch((error) => {
          console.error("Error fetching deal data:", error);
          if (error.response?.status === 401) {
            console.error("Unauthorized. Redirecting to login...");
          }
        });
    }
  }, [dealid]);

  const [loading, setLoading] = useState(false);
  const [publishValue, setPublishValue] = useState(1);

  const navigate = useNavigate();
  useEffect(() => {
    console.log("📦 ReviewPublish Received Service ID:", serviceId); // ✅ Debugging
  }, [serviceId]);

  const fetchDeals = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No token found. Please log in.",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://homeservice.thefabulousshow.com/api/Deals`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("API Response:", response?.data?.deals);

      if (response.status === 200) {
        setFormData((prev) => {
          const updatedData = {
            id: response?.data?.deals?.[0]?.id || "",
            publish: response?.data?.deals?.[0]?.publish || "",
            imagePath: response?.data?.deals?.[0]?.image || "",
            image: response?.data?.deals?.[0]?.image
              ? `https://homeservice.thefabulousshow.com/uploads/${response.data.deals[0].image}`
              : "/default.png",
            commercial: response?.data?.deals?.[0]?.commercial || 0,
            residential: response?.data?.deals?.[0]?.residential || 0,
            service_category:
              response?.data?.deals?.[0]?.service_category || "",
            search_tags: response?.data?.deals?.[0]?.search_tags || "",
            service_description:
              response?.data?.deals?.[0]?.service_description || "",
            fine_print: response?.data?.deals?.[0]?.fine_print || "",
            pricing_model: response?.data?.deals?.[0]?.pricing_model || "",
            estimated_service_time:
              response?.data?.deals?.[0]?.estimated_service_time || "",
          };

          const pricingModel = response?.data?.deals?.[0]?.pricing_model;
          if (pricingModel === "Flat") {
            updatedData.title1 = response?.data?.deals?.[0]?.title1 || "";
            updatedData.flat_rate_price =
              response?.data?.deals?.[0]?.flat_rate_price || "";
            updatedData.flat_by_now_discount =
              response?.data?.deals?.[0]?.flat_by_now_discount || "";
            updatedData.flat_final_list_price =
              response?.data?.deals?.[0]?.flat_final_list_price || "";
            updatedData.flat_estimated_service_time =
              response?.data?.deals?.[0]?.flat_estimated_service_time || "";
          } else if (pricingModel === "Hourly") {
            updatedData.hourly_rate =
              response?.data?.deals?.[0]?.hourly_rate || "";
            updatedData.title2 = response?.data?.deals?.[0]?.title2 || "";
            updatedData.discount = response?.data?.deals?.[0]?.discount || "";
            updatedData.hourly_final_list_price =
              response?.data?.deals?.[0]?.hourly_final_list_price || "";
            updatedData.hourly_estimated_service_time =
              response?.data?.deals?.[0]?.hourly_estimated_service_time || "";
          } else if (pricingModel === "Custom") {
            for (let i = 1; i <= 3; i++) {
              updatedData[`title${i}`] =
                response?.data?.deals?.[0]?.[`title${i}`] || "";
              updatedData[`deliverable${i}`] =
                response?.data?.deals?.[0]?.[`deliverable${i}`] || "";
              updatedData[`price${i}`] =
                response?.data?.deals?.[0]?.[`price${i}`] || "";
              updatedData[`by_now_discount${i}`] =
                response?.data?.deals?.[0]?.[`by_now_discount${i}`] || "";
              updatedData[`final_list_price${i}`] =
                response?.data?.deals?.[0]?.[`final_list_price${i}`] || "";
              updatedData[`estimated_service_timing${i}`] =
                response?.data?.deals?.[0]?.[`estimated_service_timing${i}`] ||
                "";
            }
          }

          return updatedData;
        });
        setIsApiLoaded(true);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching deals:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error fetching the deals.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  console.log("formdata", formdata);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("id");

        if (!token || !userId) return;

        const response = await axios.get(
          `https://homeservice.thefabulousshow.com/api/UserDetails/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("API Response:", response.data);
        setProviderData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!formdata?.id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Service ID is required!",
      });
      return;
    }

    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No token found. Please log in.",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://homeservice.thefabulousshow.com/api/DealPublish/${formdata.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("API Response:", response?.data);

      if (response.status === 200) {
        setFormData((prev) => ({ ...prev, publish: publishValue }));
        navigate("/provider/services");

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Deal updated successfully.",
          confirmButtonColor: "#0F91D2",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: response.data.message || "Failed to update deal.",
          confirmButtonColor: "#D33",
        });
      }
    } catch (error) {
      console.error("Error updating deal:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error updating the deal.",
      });
    } finally {
      setLoading(false);
    }
  };
  const imagePath = provider?.user?.personal_image;
  const imageUrl = imagePath
    ? `https://homeservice.thefabulousshow.com/uploads/${imagePath}`
    : "/default.png";
  const regularHours =
    provider?.businessProfile && provider.businessProfile.length > 0
      ? JSON.parse(provider.businessProfile[0].regular_hour || "[]")
      : [];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = days[new Date().getDay()];
  const currentDayData = regularHours.find(
    (item) => item.day_name === currentDay
  );

  return (
    <>
      {dealid && !isApiLoaded ? (
        <Loader />
      ) : (
        <div>
          <div>
            <div className="flex flex-col lg:flex-row justify-between mt-8">
              <h2 className="text-xl lg:text-[23px] myhead font-semibold lg:me-2">
                {formdata?.service_title}
              </h2>
            </div>
            <div className="grid mt-4 grid-cols-1 md:grid-cols-12 gap-4">
              <div className="col-span-12 xl:col-span-8">
                <div className="flex justify-between">
                  <div className="flex flex-wrap items-center">
                    <img
                      onClick={() => navigate("/provider/ProfileDetails")}
                      src={imageUrl}
                      alt=""
                      className="me-2 my-2 rounded-lg max-w-[120px] cursor-pointer"
                    />
                    <div className="my-2">
                      <div className="flex">
                        <Link to="/provider/ProfileDetails">
                          <p className="font-semibold myhead me-2">
                            {provider.businessProfile?.business_name}
                          </p>
                        </Link>
                        <div className="flex">
                          <IoIosStar className="me-2 text-[#F8C600]" />
                          <p className="myblack text-sm">
                            <span className="myhead font-semibold">4.9</span>
                            (457)
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap mt-2">
                        <div className="flex items-center">
                          <IoLocationOutline className="me-2 myblack" />
                          <p className="myblack ">{provider?.user?.location}</p>
                        </div>
                      </div>
                      <div className="flex mt-2 items-center">
                        <div className="flex mt-2 items-center">
                          <div className="flex me-2">
                            <FaRegCalendarAlt className="me-2" />
                            <p className="text-sm myblack">
                              {currentDayData ? (
                                <>{currentDayData.day_name}:&nbsp;</>
                              ) : (
                                "No data available for today."
                              )}
                            </p>

                            <p className="text-sm text-[#34A853] font-[300]">
                              {currentDayData?.day_status === "open"
                                ? "Available"
                                : "Unavailable"}
                            </p>
                            <p className="text-sm ml-2 lg:ml-10 myblack">
                              {currentDayData?.day_status === "open" ? (
                                <>
                                  Closed{" "}
                                  {currentDayData.regular_hour[0].end_time}{" "}
                                  {currentDayData.regular_hour[0].end_time.includes(
                                    "AM"
                                  ) ||
                                  currentDayData.regular_hour[0].end_time.includes(
                                    "PM"
                                  )
                                    ? ""
                                    : currentDayData.regular_hour[0].end_time >=
                                      12
                                    ? "PM"
                                    : "AM"}
                                </>
                              ) : (
                                "Closed"
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                 

                  <Modal
                    open={contactopen}
                    onClose={handlecontactClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{ m: 2 }}
                  >
                    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] outline-none">
                      <div className="bg-white rounded-[12px] p-4 max-h-[calc(100dvh-200px)] overflow-y-auto scroll-x-hidden">
                        <p className="text-lg font-semibold">Contact Pro</p>
                        <div className="flex flex-col gap-3 mt-4">
                          {modalContacts.map((contact, index) => (
                            <Link
                              key={index}
                              className="bg-[#FB8803] text-white flex items-center justify-center gap-2 p-3 rounded-[8px] text-sm font-medium"
                              to={contact.path}
                            >
                              <span className="text-[24px]">
                                {contact.Icon}
                              </span>
                              <span>{contact.title}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>


                  </Modal>
                </div>
                
                <div className=" ">
                  <img
                    src={formdata.image}
                    alt="Service Image"
                    className="rounded-xl object-cover w-[1000px] h-[350px]"
                  />
                </div>
                
              </div>

              
              <div className="col-span-12 xl:col-span-4">
                <div className="flex flex-col h-full gap-5">
                  <div className="py-5 bg-[#FAFAFA] h-full border rounded-lg lg:px-6 px-4">
                    <Box sx={{ width: "100%" }}>
                      <Box
                        sx={{
                          border: "1px solid #E9EAEB",
                          borderRadius: "12px",
                          overflow: "hidden",
                        }}
                      >
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          aria-label="basic tabs example"
                          variant="scrollable"
                          TabIndicatorProps={{ sx: { display: "none" } }}
                          sx={{
                            backgroundColor: "#ffffff",
                            "& .MuiTab-root": {
                              color: "#535862",
                              textTransform: "capitalize",
                              fontFamily: "inter",
                            },
                            "& .Mui-selected": {
                              color: "#181D27",
                              fontWeight: "700",
                            },
                          }}
                        >
                          <Tab label="Basic" {...a11yProps(0)} />
                          {pricingModel !== "Flat" &&
                            pricingModel !== "Hourly" && (
                              <Tab label="Standard" {...a11yProps(1)} />
                            )}
                          {pricingModel !== "Flat" &&
                            pricingModel !== "Hourly" && (
                              <Tab label="Premium" {...a11yProps(2)} />
                            )}
                        </Tabs>
                      </Box>
                      {console.log("valueee", formdata?.pricing_model)}
                      <CustomTabPanel value={value} index={0}>
                        <div className="flex justify-between">
                          <h2 className="text-2xl font-medium myhead">
                            {formdata?.pricing_model}
                          </h2>
                          <p className="text-3xl myhead font-bold">
                            {formdata?.pricing_model === "Hourly"
                              ? "" + formdata.hourly_final_list_price
                              : formdata?.pricing_model === "Flat"
                              ? "" + formdata.flat_rate_price
                              : formdata?.pricing_model === "Custom"
                              ? "" + formdata.price1
                              : "$200"}
                          </p>
                        </div>
                        <p className="text-sm myblack mt-2">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Morbi tellus diam, dignissim tincidunt quam vel,
                          rutrum egestas lacus. Phasellus accumsan fermentum
                          dolor eu gravida. Vivamus dignissim augue sed orci
                          interdum vehicula.
                        </p>

                        <ul className="mt-4 myblack text-sm list-disc space-y-1 pl-5">
                          {formdata?.pricing_model === "Hourly" && (
                            <li>{formdata?.hourly_estimated_service_time}</li>
                          )}
                          {formdata?.pricing_model === "Flat" && (
                            <li>{formdata?.flat_estimated_service_time}</li>
                          )}
                          {formdata?.pricing_model === "Custom" && (
                            <li> {formdata?.estimated_service_timing1}</li>
                          )}{" "}
                          {/* You can add your custom logic here */}
                          <li>Delivered Within 2 Days</li>
                        </ul>
                      </CustomTabPanel>

                      {pricingModel !== "Flat" && pricingModel !== "Hourly" && (
                        <CustomTabPanel value={value} index={1}>
                          <div className="flex justify-between">
                            <h2 className="text-2xl font-medium myhead">
                              {formdata?.pricing_model}
                            </h2>
                            <p className="text-3xl myhead font-bold">
                              {formdata?.price2}
                            </p>
                          </div>
                          <p className="text-sm myblack mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Morbi tellus diam, dignissim tincidunt quam
                            vel, rutrum egestas lacus. Phasellus accumsan
                            fermentum dolor eu gravida. Vivamus dignissim augue
                            sed orci interdum vehicula.
                          </p>
                          <ul className="mt-4 myblack text-sm list-disc space-y-1 pl-5">
                            <li>{formdata?.estimated_service_timing2}</li>
                            <li>Delivered Within 2 Days</li>
                          </ul>
                        </CustomTabPanel>
                      )}

                      {pricingModel !== "Flat" && pricingModel !== "Hourly" && (
                        <CustomTabPanel value={value} index={2}>
                          <div className="flex justify-between">
                            <h2 className="text-2xl font-medium myhead">
                              {formdata?.pricing_model}
                            </h2>
                            <p className="text-3xl myhead font-bold">
                              {formdata?.price3}
                            </p>
                          </div>
                          <p className="text-sm myblack mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Morbi tellus diam, dignissim tincidunt quam
                            vel, rutrum egestas lacus. Phasellus accumsan
                            fermentum dolor eu gravida. Vivamus dignissim augue
                            sed orci interdum vehicula.
                          </p>
                          <ul className="mt-4 myblack text-sm list-disc space-y-1 pl-5">
                            <li> {formdata?.estimated_service_timing3}</li>
                            <li>Delivered Within 2 Days</li>
                          </ul>
                        </CustomTabPanel>
                      )}
                    </Box>
                  </div>
                  <button
                    onClick={handlecontactOpen}
                    className="flex mt-3 lg:mt-0 py-3 justify-center items-center px-6 font-semibold rounded-lg text-[#fff] bg-[#FB8803]"
                  >
                    <IoChatbubbleEllipsesOutline className="me-2 text-[#fff] text-xl" />
                    <span>Contact Pro</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex flex-wrap mt-3">
                <div className="flex flex-wrap mt-3">
                  {formdata?.search_tags && formdata?.search_tags.length > 0
                    ? formdata?.search_tags.split(",").map((tag, index) => (
                        <span
                          key={index}
                          className="bg-[#E7F4FB] text-[#0F91D2] px-4 py-2 rounded-full text-sm me-2"
                        >
                          {tag.trim()}
                        </span>
                      ))
                    : "No tags available"}
                </div>
              </div>
              <h2 className="mt-4 text-xl myhead font-semibold">
                Deal Description
              </h2>
              <p className="mt-2 myblack">{formdata.service_description}</p>
              <h2 className="mt-4 text-xl myhead font-semibold ">Fine Print</h2>
              <ul className="mt-4 myblack text-sm list-disc space-y-1 whitespace-pre-line pl-5">
                {formdata.fine_print}
              </ul>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="col-span-12 mt-4 flex justify-end">
              <input
                type="text"
                id="Flatr"
                defaultValue={formdata?.id ? `${formdata.id}` : "0"}
                className="focus-none border hidden"
                readOnly
              />
              <input
                type="text"
                id="publish"
                value={publishValue}
                className="focus-none border hidden"
                readOnly
              />
              <button
                type="button"
                className="border rounded-lg w-[150px] py-[10px] mr-4 font-semibold bg-white"
                onClick={() => navigate("/somewhere")} // Navigate on cancel
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="border rounded-lg w-[150px] py-[10px] text-white font-semibold bg-[#0F91D2]"
              >
                {loading ? "Publishing..." : "Publish"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ReviewPublish;
