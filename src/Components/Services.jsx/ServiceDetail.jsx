import React, { useEffect } from "react";
import { FaArrowLeft, FaRegTrashCan } from "react-icons/fa6";
import { FaPencilAlt, FaRegCalendarAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import servicedet from "../../assets/img/service-det.png";
import PropTypes from "prop-types";
import { Box, Modal, Tab, Tabs } from "@mui/material";
import { FiPhone } from "react-icons/fi";
import { BiMessageAltDetail, BiMessageSquareDetail } from "react-icons/bi";
import { TbMailDown } from "react-icons/tb";
import {
  IoChatbubbleEllipsesOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import provider from "../../assets/img/provider.png";
import { CiHeart } from "react-icons/ci";
import Plans from "../Plan/Plans";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ height: "100%" }}
    >
      {value === index && <Box sx={{ pt: 3, height: "100%" }}>{children}</Box>}
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

function ServiceDetail({ backto, role }) {
  useEffect(() => {
    document.title = "Service Details";
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [contactopen, setcontactOpen] = React.useState(false);
  const handlecontactOpen = () => setcontactOpen(true);
  const handlecontactClose = () => setcontactOpen(false);

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
    {
      path: "#",
      Icon: <IoLocationOutline />,
      title: "Get Directions",
    },
  ];

  const navigate = useNavigate();

  const tabData = [
    {
      label: "Basic",
      price: 200,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tellus diam, dignissim tincidunt quam vel, rutrum egestas lacus. Phasellus accumsan fermentum dolor eu gravida. Vivamus dignissim augue sed orci interdum vehicula.",
      features: ["3 Workers", "Delivered Within 2 Days"],
    },
    {
      label: "Standard",
      price: 400,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tellus diam, dignissim tincidunt quam vel, rutrum egestas lacus. Phasellus accumsan fermentum dolor eu gravida. Vivamus dignissim augue sed orci interdum vehicula.",
      features: ["3 Workers", "Delivered Within 2 Days"],
    },
    {
      label: "Premium",
      price: 600,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tellus diam, dignissim tincidunt quam vel, rutrum egestas lacus. Phasellus accumsan fermentum dolor eu gravida. Vivamus dignissim augue sed orci interdum vehicula.",
      features: ["3 Workers", "Delivered Within 2 Days"],
    },
  ];

  return (
    <div className="pmain">
      <div className="navv">
        <div className="flex items-center">
          <Link to={backto}>
            <FaArrowLeft className="me-4 text-xl" />
          </Link>
          <h2 className="text-2xl font-semibold">Service Details</h2>
        </div>
        <p className="text-[#535862] mt-4 ms-8">
          Stay Updated on Your Active Deals.
        </p>
      </div>
      <div className="btm">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <h2 className="text-xl myhead font-semibold lg:me-2">
            Aliquam erat volutpat. Ut semper ipsum in vestibulum laoreet.
          </h2>
          {role === "provider" && (
            <div className="flex items-center w-full lg:w-auto gap-2 justify-end mt-3 lg:mt-0">
              <>
                <Link
                  to="#"
                  className="bg-[#FA2841] px-3 py-3 text-[#fff] rounded-md inline-block"
                >
                  <FaRegTrashCan />
                </Link>
                <Link
                  to="#"
                  className="bg-[#0F91D2] px-3 py-3 text-[#fff] rounded-md inline-block"
                >
                  <FaPencilAlt />
                </Link>
              </>
            </div>
          )}
        </div>
        <div className="flex flex-wrap justify-between mt-3 lg:sticky lg:top-0 lg:z-[99] lg:py-1 bg-white">
          <div className="flex flex-wrap lg:flex-nowrap items-center w-full lg:w-[calc(100%-230px)]">
            <img
              onClick={() => navigate("/customer/ProfileDetails")}
              src={provider}
              alt=""
              className="me-2 my-2 rounded-lg max-w-[120px] cursor-pointer"
            />
            <div className="my-2">
              <div className="flex">
                <p className="font-semibold myhead me-2">Provider Name</p>
                <div className="flex">
                  <IoIosStar className="me-2 text-[#F8C600]" />
                  <p className="myblack text-sm">
                    <span className="myhead font-semibold">4.9</span>(457)
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap mt-1">
                <p className="myblack pe-3 me-2 border-e text-sm">
                  House Cleaning
                </p>
                <div className="flex items-center">
                  <IoLocationOutline className="me-1 myblack text-sm" />
                  <p className="myblack text-sm">
                    Address of the provider here
                  </p>
                </div>
              </div>
              <div className="flex mt-1">
                <div className="flex me-2">
                  <FaRegCalendarAlt className="me-2" />
                  <p className="text-sm myblack">Hours:</p>
                  <p className="text-sm text-[#34A853]"> Available</p>
                </div>
                <p className="text-sm myblack">Close 6PM</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:max-w-[220px]">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {role !== "provider" && (
                <button
                  onClick={handlecontactOpen}
                  className="flex gap-2 p-3 justify-center items-center font-semibold rounded-lg text-[#fff] bg-[#FB8803] w-full"
                >
                  <IoChatbubbleEllipsesOutline className="text-[#fff] text-xl" />
                  <span>Contact Pro</span>
                </button>
              )}
              <button className="flex gap-2 p-3 justify-center items-center border font-semibold rounded-lg text-[#535862] bg-[#fff] w-full">
                <CiHeart className="text-xl" />
                <span>Add to Favorites list</span>
              </button>
            </div>
          </div>
        </div>
        {role !== "provider" && (
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
                      <span className="text-[24px]">{contact.Icon}</span>
                      <span>{contact.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Modal>
        )}
        <div className="grid mt-4 grid-cols-1 md:grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-8">
            <img src={servicedet} alt="" className="rounded-xl w-full" />
          </div>
          <div className="col-span-12 xl:col-span-4">
            <div className="flex flex-col h-full gap-5">
              <div className="py-5 bg-[#FAFAFA] h-full border rounded-lg lg:px-6 px-4">
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
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
                      {tabData.map((tab, index) => (
                        <Tab
                          key={index}
                          label={tab.label}
                          {...a11yProps(index)}
                        />
                      ))}
                    </Tabs>
                  </Box>
                  {tabData.map((tab, index) => (
                    <CustomTabPanel key={index} value={value} index={index}>
                      <Plans
                        title={tab.label}
                        price={tab.price}
                        desc={tab.desc}
                        features={tab.features}
                      />
                    </CustomTabPanel>
                  ))}
                </Box>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex flex-wrap mt-3">
            <p className="px-3 py-1 font-semibold text-sm rounded-full text-[#0F91D2] bg-[#E7F4FB]">
              Cleaning
            </p>
          </div>
          <h2 className="mt-4 text-xl myhead font-semibold">
            Deal Description
          </h2>
          <p className="mt-2 myblack">
            Donec pulvinar consequat metus eget cursus. Donec nec quam eu arcu
            elementum tempor eu pharetra mauris. Morbi et gravida purus, nec
            sagittis risus. Nulla placerat justo ut dui aliquam efficitur.
            Mauris aliquet mattis odio nec malesuada. Morbi at dui tristique,
            dignissim enim ac, varius nulla. Donec venenatis libero nec ligula
            laoreet laoreet. Sed quis lorem in mi suscipit dictum id nec diam.
            Orci varius natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Nam at vehicula neque. Proin molestie
            venenatis sem, ut imperdiet leo efficitur vel. Vestibulum nec
            elementum lacus.
          </p>
          <h2 className="mt-4 text-xl myhead font-semibold">Fine Print</h2>
          <ul className="mt-4 myblack text-sm list-disc space-y-1 pl-5">
            <li>Pellentesque maximus augue in tellus fermentum viverra.</li>
            <li>Nunc euismod erat et volutpat tincidunt.</li>
            <li>In sit amet enim in nisl fermentum venenatis et ut dui.</li>
            <li>
              Phasellus vel orci pretium, tristique magna at, porttitor neque.
            </li>
            <li>
              Integer mollis ligula eu tortor porttitor, sit amet elementum
              dolor feugiat.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetail;
