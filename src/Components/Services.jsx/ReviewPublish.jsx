import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaRegTrashCan } from "react-icons/fa6";
import { FaPencilAlt, FaRegCalendarAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import servicedet from "../../assets/img/service-det.png";
import PropTypes from "prop-types";
import { Box, Modal, Tab, Tabs } from "@mui/material";
import { FiPhone } from "react-icons/fi";
import { BiMessageAltDetail, BiMessageSquareDetail } from "react-icons/bi";
import { TbMailDown } from "react-icons/tb";
import { PiChats } from "react-icons/pi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../Components/MUI/Loader";
import {
  useGetDealQuery,
  useGetUserDetailsQuery,
  useDealPublishMutation,
} from "../../services/base-api/index";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";

import axios from "axios";
import Swal from "sweetalert2";

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
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [dealPublish, { isLoading: publishLoading }] = useDealPublishMutation();
  const [provider, setProviderData] = useState({});
  const { dealid } = useParams();
  const token = useSelector((state) => state.auth.token);
  const [value, setValued] = useState(0);
  const deal_id = localStorage.getItem("deal_id");
  const {
    data: dealResponse,
    error: dealError,
    isLoading: isDealLoading,
  } = useGetDealQuery(deal_id, {
    skip: !deal_id || !token,
  });
  const handleChange = (event, newValue) => {
    setValued(newValue);
  };

  const userId = localStorage.getItem("id");
  const { data: userDetails } = useGetUserDetailsQuery(userId, {
    skip: !token || !userId,
  });

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

  useEffect(() => {
    if (dealResponse && dealResponse.deal) {
      const deal = dealResponse.deal;
      const uploads = deal.uploads?.[0] || {};
      const updatedData = {
        id: deal.id || "",
        publish: deal.publish || "",
        imagePath: uploads.images || "",
        image: uploads.images
          ? `https://marketplace.thefabulousshow.com/uploads/${uploads.images}`
          : "/default.png",
        commercial: deal.commercial || "0",
        residential: deal.residential || "0",
        service_category: deal.service_category || "",
        search_tags: deal.search_tags || "",
        service_description: deal.service_description || "",
        fine_print: deal.fine_print || "",
        pricing_model: deal.pricing_model || "",
      };

      const pricingModel = deal.pricing_model;
      if (pricingModel === "Flat") {
        updatedData.flat_rate_price = deal.flat_rate_price || "";
        updatedData.flat_by_now_discount = deal.flat_by_now_discount || "";
        updatedData.flat_final_list_price = deal.flat_final_list_price || "";
        updatedData.flat_estimated_service_time =
          deal.flat_estimated_service_time || "";
      } else if (pricingModel === "Hourly") {
        updatedData.hourly_rate = deal.hourly_rate || "";
        updatedData.discount = deal.discount || "";
        updatedData.hourly_final_list_price =
          deal.hourly_final_list_price || "";
        updatedData.hourly_estimated_service_time =
          deal.hourly_estimated_service_time || "";
      } else if (pricingModel === "Custom") {
        for (let i = 1; i <= 3; i++) {
          updatedData[`title${i}`] = deal[`title${i}`] || "";
          updatedData[`deliverable${i}`] = deal[`deliverable${i}`] || "";
          updatedData[`price${i}`] = deal[`price${i}`] || "";
          updatedData[`by_now_discount${i}`] =
            deal[`by_now_discount${i}`] || "";
          updatedData[`final_list_price${i}`] =
            deal[`final_list_price${i}`] || "";
          updatedData[`estimated_service_timing${i}`] =
            deal[`estimated_service_timing${i}`] || "";
        }
      }
      setFormData(updatedData);
    }
  }, [dealResponse]);
  const [loading, setLoading] = useState(false);
  const [publishValue, setPublishValue] = useState(1);

  const navigate = useNavigate();
  useEffect(() => {}, [serviceId]);

  useEffect(() => {
    if (!dealid) return;

    if (!token) {
      console.error("No authentication token found. Please log in.");
      return;
    }

    setLoading(true);

    axios
      .get(`https://marketplace.thefabulousshow.com/api/Deal/${deal_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const deal = response?.data?.deal || {};
        const uploads = deal.uploads?.[0] || {};
        const updatedData = {
          id: deal?.id || "",
          publish: deal?.publish || "",
          imagePath: uploads.images || "",
          image: uploads.images
            ? `https://marketplace.thefabulousshow.com/uploads/${uploads.images}`
            : "/default.png",
          commercial: deal?.commercial || "0",
          residential: deal?.residential || "0",
          service_category: deal?.service_category || "",
          search_tags: deal?.search_tags || "",
          service_description: deal?.service_description || "",
          fine_print: deal?.fine_print || "",
          pricing_model: deal?.pricing_model || "",
        };

        const pricingModel = deal?.pricing_model;
        if (pricingModel === "Flat") {
          updatedData.flat_rate_price = deal?.flat_rate_price || "";
          updatedData.flat_by_now_discount = deal?.flat_by_now_discount || "";
          updatedData.flat_final_list_price = deal?.flat_final_list_price || "";
          updatedData.flat_estimated_service_time =
            deal?.flat_estimated_service_time || "";
        } else if (pricingModel === "Hourly") {
          updatedData.hourly_rate = deal?.hourly_rate || "";
          updatedData.discount = deal?.discount || "";
          updatedData.hourly_final_list_price =
            deal?.hourly_final_list_price || "";
          updatedData.hourly_estimated_service_time =
            deal?.hourly_estimated_service_time || "";
        } else if (pricingModel === "Custom") {
          for (let i = 1; i <= 3; i++) {
            updatedData[`title${i}`] = deal?.[`title${i}`] || "";
            updatedData[`deliverable${i}`] = deal?.[`deliverable${i}`] || "";
            updatedData[`price${i}`] = deal?.[`price${i}`] || "";
            updatedData[`by_now_discount${i}`] =
              deal?.[`by_now_discount${i}`] || "";
            updatedData[`final_list_price${i}`] =
              deal?.[`final_list_price${i}`] || "";
            updatedData[`estimated_service_timing${i}`] =
              deal?.[`estimated_service_timing${i}`] || "";
          }
        }

        setFormData(updatedData);
        setIsApiLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching deal data:", error);
        if (error.response?.status === 401) {
          console.error("Unauthorized. Redirecting to login...");
        }
      })
      .finally(() => setLoading(false));
  }, [dealid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Determine if it's a create or edit operation
    const isEdit = !!dealid; // If dealid exists, it's an edit operation
    const id = isEdit ? dealid : serviceId; // Use dealid for edit, serviceId for create

    if (!id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: isEdit ? "Deal ID is required!" : "Service ID is required!",
      });
      return;
    }

    setLoading(true);

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
      const url = isEdit
        ? `https://marketplace.thefabulousshow.com/api/DealPublish/${dealid}` // Edit
        : `https://marketplace.thefabulousshow.com/api/DealPublish/${serviceId}`; // Create

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        navigate("/provider/services");

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: isEdit
            ? "Deal updated successfully."
            : "Deal created successfully.",
          confirmButtonColor: "#0F91D2",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: response.data.message || "Failed to process request.",
          confirmButtonColor: "#D33",
        });
      }
    } catch (error) {
      console.error("Error processing request:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error processing the request.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("id");

        if (!token || !userId) return;

        const response = await axios.get(
          `https://marketplace.thefabulousshow.com/api/UserDetails/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProviderData(response.data?.businessProfile[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const imagePath = provider?.business_logo;
  const imageUrl = imagePath
    ? `https://marketplace.thefabulousshow.com/uploads/${imagePath}`
    : "/default.png";
  const regularHours =
    provider && provider.length > 0
      ? JSON.parse(provider.regular_hour || "[]")
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
                <div className="">
                  <div className="flex flex-wrap items-center">
                    <img
                      onClick={() => navigate("/provider/ProfileDetails")}
                      src={imageUrl}
                      alt=""
                      className="me-2 my-2 rounded-lg object-cover w-[100px] h-[100px] cursor-pointer"
                      style={{
                        aspectRatio: "1/1",
                      }}
                    />
                    <div className="my-2">
                      <div className="flex">
                        <Link to="/provider/ProfileDetails">
                          <p className="font-semibold myhead me-2">
                            {provider?.business_name}
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
                        <p className="myblack pe-3 me-3 border-e">
                          House Cleaning
                        </p>
                        <div className="flex items-center">
                          <IoLocationOutline className="me-2 myblack" />
                          <p className="myblack ">
                            {provider?.business_location}
                          </p>
                        </div>
                      </div>
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
                                Closed {currentDayData.regular_hour[0].end_time}{" "}
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
                          {/* Only show Standard and Premium tabs if pricingModel is Custom */}
                          {formdata?.pricing_model === "Custom" && (
                            <>
                              <Tab label="Standard" {...a11yProps(1)} />
                              <Tab label="Premium" {...a11yProps(2)} />
                            </>
                          )}
                        </Tabs>
                      </Box>

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
                          {formdata?.fine_print
                            ?.split("\n")
                            .map((line, index) => (
                              <React.Fragment key={index}>
                                {line}
                                <br />
                              </React.Fragment>
                            ))}
                        </p>

                        <ul className="mt-4 myblack text-sm list-disc space-y-1 pl-5">
                          {formdata?.pricing_model === "Hourly" && (
                            <li>{formdata?.hourly_estimated_service_time}</li>
                          )}
                          {formdata?.pricing_model === "Flat" && (
                            <li>{formdata?.flat_estimated_service_time}</li>
                          )}
                          {formdata?.pricing_model === "Custom" && (
                            <li>{formdata?.estimated_service_timing1}</li>
                          )}
                        </ul>
                      </CustomTabPanel>

                      {/* Only show Standard and Premium CustomTabPanels if pricingModel is Custom */}
                      {formdata?.pricing_model === "Custom" && (
                        <>
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
                              {formdata?.fine_print
                                ?.split("\n")
                                .map((line, index) => (
                                  <React.Fragment key={index}>
                                    {line}
                                    <br />
                                  </React.Fragment>
                                ))}
                            </p>
                            <ul className="mt-4 myblack text-sm list-disc space-y-1 pl-5">
                              <li>{formdata?.estimated_service_timing2}</li>
                            </ul>
                          </CustomTabPanel>

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
                              {formdata?.fine_print
                                ?.split("\n")
                                .map((line, index) => (
                                  <React.Fragment key={index}>
                                    {line}
                                    <br />
                                  </React.Fragment>
                                ))}
                            </p>
                            <ul className="mt-4 myblack text-sm list-disc space-y-1 pl-5">
                              <li>{formdata?.estimated_service_timing3}</li>
                            </ul>
                          </CustomTabPanel>
                        </>
                      )}
                    </Box>
                  </div>
                  {/* <button
                    onClick={handlecontactOpen}
                    className="flex mt-3 lg:mt-0 py-3 justify-center items-center px-6 font-semibold rounded-lg text-[#fff] bg-[#FB8803]"
                  >
                    <IoChatbubbleEllipsesOutline className="me-2 text-[#fff] text-xl" />
                    <span>Contact Pro</span>
                  </button> */}
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
