import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaRegTrashCan } from "react-icons/fa6";
import { FaPencilAlt, FaRegCalendarAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { Box, Modal, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  IoChatbubbleEllipsesOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import { BiMessageAltDetail, BiMessageSquareDetail } from "react-icons/bi";
import { FiPhone } from "react-icons/fi";
import { TbMailDown } from "react-icons/tb";

import Swal from "sweetalert2";

import Loader from "../../Components/MUI/Loader";

import {
  useGetDeal1Query,
  useGetUserDetailsQuery,
  useDeleteDealMutation,
} from "../../services/base-api/index";
import { useCallProApiMutation, useTextProApiMutation, useChatProApiMutation, useEmailProApiMutation, useGetDirectionsApiMutation } from "../../services/providerContactPro";
import { toast } from "react-toastify";
import { ContactProModal } from "../../Components/Services.jsx/ContactProModal";
import { sendInstantChatMessage } from "../../Components/Services.jsx/sendInstantChatMessage";

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

const contact_pro_feilds = ['conversation_address', 'conversation_email', 'conversation_text_number', 'conversation_call_number' , 'conversation_chat']
function ServiceDetail() {
  const { dealid } = useParams();
  const [callPro] = useCallProApiMutation();
  const [textPro] = useTextProApiMutation();
  const [chatPro] = useChatProApiMutation();
  const [emailPro] = useEmailProApiMutation();
  const [getDirections] = useGetDirectionsApiMutation();
  useEffect(() => {
    document.title = "Service Details";
  }, []);

  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const {
    data: dealData,
    isLoading: dealLoading,
  } = useGetDeal1Query(dealid, { skip: !token || !dealid });

  console.log("dealData", dealData)

  const serviceDetails = dealData?.deal;
  const service = dealData?.businessProfile;
  console.log(serviceDetails, "valueeee")
  const isContactPro = contact_pro_feilds.some(key => {
    const value = service?.[key];
    return value !== undefined && value !== null && value !== '';
  }); const pricingModel = serviceDetails ? serviceDetails?.pricing_model : "";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  const [contactopen, setContactOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contactModal, setContactModal] = useState("");
  const handlecontactOpen = () => setContactOpen(true);
  const handlecontactClose = () => setContactOpen(false);
  const handleModalClose = (e) => { setContactModal("") };
  const handleSubmitApi = async (modalType, formData) => {
    console.log("formData", formData)
    
    if (!formData || !formData?.providerId) {
      toast.info("Invalid Data")
      console.log("Invalid Data")
      return
    }
    if (!formData?.providerId) {
      console.log("Invalid Request")
      return
    }
    if (!formData?.userId) {
      toast.info("Invalid userId")
      console.log("Invalid userId")
      return
    }
    if (!formData?.dealId) {
      toast.info("Invalid DealId")
      console.log("Invalid DealId")
      return
    }
    setLoading(true)
    let location;
    try {
      switch (modalType) {
        case "Call Pro":
          await callPro(formData).unwrap();
          break;
        case "Text Pro":
          await textPro(formData).unwrap();
          break;
        case "Instant Chat":
          await chatPro(formData).unwrap();
          await sendInstantChatMessage(formData)
          break;
        case "Email Pro":
          await emailPro(formData).unwrap();
          break;
        case "Get Directions":
          const responseLocation = await getDirections(formData).unwrap();
          if (responseLocation?.success) {
            // setLocation(responseLocation?.data?.location)
            location = responseLocation?.data?.location
          }
          break;
        default:
          console.error("Invalid modal type");
      }
      setLoading(false)
      Swal.fire({
        icon: "success",
        title: `${modalType} submitted`,
        text: location || '',
      });
      handleModalClose();
    } catch (error) {
      console.error("API request failed:", error);
    } finally {
      setLoading(false)
    }
  };

  const modalContacts = [
    { Icon: <FiPhone />, title: "Call Pro", key: "conversation_call_number" },
    { Icon: <BiMessageSquareDetail />, title: "Text Pro", key: "conversation_text_number" },
    { Icon: <BiMessageAltDetail />, title: "Instant Chat", key: "conversation_chat" },
    { Icon: <TbMailDown />, title: "Email Pro", key: "conversation_email" },
    { Icon: <IoLocationOutline />, title: "Get Directions", key: "conversation_address" },
  ];

  if (dealLoading) {
    return <Loader />;
  }
  if (!service) {
    return <div>No service details available.</div>;
  }


  const imagePath = service?.business_logo;
  const imageUrl = imagePath
    ? `https://marketplace.thefabulousshow.com/uploads/${imagePath}`
    : "/service1.png";

  const regularHours =
    service && service.regular_hour
      ? JSON.parse(service.regular_hour || "[]")
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

  let imageArray = [];

  if (typeof dealData?.deal?.images === "string") {
    try {
      imageArray = JSON.parse(dealData?.deal.images);
    } catch (error) {
      console.error("Error parsing images:", error);
    }
  }
  const imagePath1 =
    Array.isArray(imageArray) && imageArray.length > 0 ? imageArray[0] : "";
  const imageUrl1 = imagePath1
    ? `https://marketplace.thefabulousshow.com/uploads/${imagePath1}`
    : "/service1.png";
  return (<>
    <div className="pmain">
      <div className="navv">
        <div className="flex items-center">
          <Link to="/customer/Deals">
            <FaArrowLeft className="me-4 text-xl" />
          </Link>
          <h2 className="text-2xl font-semibold">Customer Details</h2>
        </div>
        <p className="text-[#535862] mt-4 ms-8">
          Stay Updated on Your Active Deals.
        </p>
      </div>
      <div className="btm">
        <div className="flex flex-col lg:flex-row justify-between ">
          <h2 className="text-xl lg:text-[23px] myhead font-semibold lg:me-2">
            {serviceDetails?.service_title || "N/A"}
          </h2>

        </div>
        <div className="grid mt-4 grid-cols-1 md:grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-8">
            <div className="">
              <div className="flex flex-wrap items-center">
                <img
                  onClick={() => navigate("/customer/Deals")}
                  src={imageUrl}
                  alt=""
                  className="me-2 my-2 rounded-lg object-cover w-[100px] h-[100px] cursor-pointer"
                  style={{ aspectRatio: "1/1" }}
                />
                <div className="my-2">
                  <div className="flex">
                    <Link to="/customer/Deals">
                      <p className="font-semibold myhead me-2">
                        {service?.business_name}
                      </p>
                    </Link>
                    <div className="flex">
                      <IoIosStar className="me-2 text-[#F8C600]" />
                      <p className="myblack text-sm">
                        <span className="myhead font-semibold">4.9</span>(457)
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap mt-2">
                    <p className="myblack pe-3 me-3 border-e">{service?.business_primary_category}</p>
                    <div className="flex items-center">
                      <IoLocationOutline className="me-2 myblack" />
                      <p className="myblack ">{service?.business_location}</p>
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
                            {currentDayData.regular_hour.end_time?.includes(
                              "AM"
                            ) ||
                              currentDayData.regular_hour[0].end_time?.includes(
                                "PM"
                              )
                              ? ""
                              : currentDayData.regular_hour[0].end_time >= 12
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
              <Modal
                open={contactopen}
                onClose={handlecontactClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ m: 2 }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] outline-none">
                  <div className="bg-white rounded-[12px] p-4 max-h-[calc(100dvh-200px)] overflow-y-auto">
                    <p className="text-lg font-semibold">Contact Pro</p>
                    <div className="flex flex-col gap-3 mt-4">
                      {modalContacts.map((contact, index) => (
                        service?.[contact?.key] !== undefined && service?.[contact?.key] !== null && service?.[contact?.key] !== '' &&
                        <div
                          onClick={() => {
                            setContactModal(contact?.title)
                            handlecontactClose()
                          }}
                          key={index}
                          className="bg-[#FB8803] cursor-pointer text-white flex items-center justify-center gap-2 p-3 rounded-[8px] text-sm font-medium"
                        // to={contact.path}
                        >
                          <span className="text-[24px]">{contact.Icon}</span>
                          <span>{contact.title}</span>
                        </div>

                      ))}
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
            <img
              src={imageUrl1}
              alt=""
              className="rounded-xl object-cover w-[1000px] h-[350px]"
            />
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
                      {pricingModel !== "Flat" && pricingModel !== "Hourly" && (
                        <Tab label="Standard" {...a11yProps(1)} />
                      )}
                      {pricingModel !== "Flat" && pricingModel !== "Hourly" && (
                        <Tab label="Premium" {...a11yProps(2)} />
                      )}
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={value} index={0}>
                    <div className="flex justify-between">
                      <h2 className="text-2xl font-medium myhead">
                        {serviceDetails?.pricing_model}
                      </h2>
                      <p className="text-3xl myhead font-bold">
                        {serviceDetails?.pricing_model === "Hourly"
                          ? serviceDetails.hourly_final_list_price
                          : serviceDetails?.pricing_model === "Flat"
                            ? serviceDetails.flat_rate_price
                            : serviceDetails?.pricing_model === "Custom"
                              ? serviceDetails.price1
                              : "$200"}
                      </p>
                    </div>
                    <p className="text-sm myblack mt-2">
                      {serviceDetails?.fine_print
                        ?.split("\n")
                        .map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                    </p>
                    <ul className="mt-4 myblack text-sm list-disc space-y-1 pl-5">
                      {serviceDetails?.pricing_model === "Hourly" && (
                        <li>{serviceDetails?.hourly_estimated_service_time}</li>
                      )}
                      {serviceDetails?.pricing_model === "Flat" && (
                        <li>{serviceDetails?.flat_estimated_service_time}</li>
                      )}
                      {serviceDetails?.pricing_model === "Custom" && (
                        <li>{serviceDetails?.estimated_service_timing1}</li>
                      )}
                    </ul>
                  </CustomTabPanel>

                  {pricingModel !== "Flat" && pricingModel !== "Hourly" && (
                    <CustomTabPanel value={value} index={1}>
                      <div className="flex justify-between">
                        <h2 className="text-2xl font-medium myhead">
                          {serviceDetails[0]?.pricing_model}
                        </h2>
                        <p className="text-3xl myhead font-bold">
                          {serviceDetails[0]?.price2}
                        </p>
                      </div>
                      <p className="text-sm myblack mt-2">
                        {serviceDetails[0]?.fine_print
                          ?.split("\n")
                          .map((line, index) => (
                            <React.Fragment key={index}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                      </p>
                      <ul className="mt-4 myblack text-sm list-disc space-y-1 pl-5">
                        <li>{serviceDetails?.estimated_service_timing2}</li>
                      </ul>
                    </CustomTabPanel>
                  )}
                  {pricingModel !== "Flat" && pricingModel !== "Hourly" && (
                    <CustomTabPanel value={value} index={1}>
                      <div className="flex justify-between">
                        <h2 className="text-2xl font-medium myhead">
                          {serviceDetails[0]?.pricing_model}
                        </h2>
                        <p className="text-3xl myhead font-bold">
                          {serviceDetails[0]?.price2}
                        </p>
                      </div>
                      <p className="text-sm myblack mt-2">
                        {serviceDetails[0]?.fine_print
                          ?.split("\n")
                          .map((line, index) => (
                            <React.Fragment key={index}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                      </p>
                      <ul className="mt-4 myblack text-sm list-disc space-y-1 pl-5">
                        <li>{serviceDetails[0]?.estimated_service_timing2}</li>
                      </ul>
                    </CustomTabPanel>
                  )}

                  {pricingModel !== "Flat" && pricingModel !== "Hourly" && (
                    <CustomTabPanel value={value} index={2}>
                      <div className="flex justify-between">
                        <h2 className="text-2xl font-medium myhead">
                          {serviceDetails?.pricing_model}
                        </h2>
                        <p className="text-3xl myhead font-bold">
                          {serviceDetails?.price3}
                        </p>
                      </div>
                      <p className="text-sm myblack mt-2">
                        {serviceDetails?.fine_print
                          ?.split("\n")
                          .map((line, index) => (
                            <React.Fragment key={index}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                      </p>
                      <ul className="mt-4 myblack text-sm list-disc space-y-1 pl-5">
                        <li>{serviceDetails?.estimated_service_timing3}</li>
                      </ul>
                    </CustomTabPanel>
                  )}
                </Box>
              </div>
              {isContactPro
                &&
                <button
                  onClick={handlecontactOpen}
                  className="flex mt-3 lg:mt-0 py-3 justify-center items-center px-6 font-semibold rounded-lg text-[#fff] bg-[#FB8803]"
                >
                  <IoChatbubbleEllipsesOutline className="me-2 text-[#fff] text-xl" />
                  <span>Contact Pro</span>
                </button>}
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex flex-wrap mt-3">
            <div className="flex flex-wrap mt-3">
              {serviceDetails?.search_tags &&
                serviceDetails?.search_tags.length > 0
                ? serviceDetails?.search_tags.split(",").map((tag, index) => (
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
          <p className="mt-2 myblack">
            {serviceDetails?.service_description || "No description available."}
          </p>
        </div>
      </div>
    </div>
    {
      contactModal && <ContactProModal providerId={service?.user_id} loading={loading} dealid={dealid} activeModal={contactModal} handleModalClose={handleModalClose}
        submitApi={handleSubmitApi}

      />
    }
  </>);
}

export default ServiceDetail;
