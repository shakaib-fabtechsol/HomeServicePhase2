import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPencilAlt, FaRegCalendarAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import servicedet from "../../assets/img/service-det.png";
import PropTypes from "prop-types";
import { Box, Tab, Tabs } from "@mui/material";
import { IoLocationOutline } from "react-icons/io5";
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

const ReviewPublish = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
    <div>
      <div className="btm">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <h2 className="text-xl myhead font-semibold">
            Aliquam erat volutpat. Ut semper ipsum in vestibulum laoreet.
          </h2>
        </div>
        <div className="flex flex-wrap justify-between lg:sticky lg:top-0 lg:z-[99] lg:py-1 bg-white">
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
            <div className="">
              <button className="flex gap-2 p-3 justify-center items-center border font-semibold rounded-lg text-[#535862] bg-[#fff] w-full">
                <CiHeart className="text-xl" />
                <span>Add to Favorites list</span>
              </button>
            </div>
          </div>
        </div>
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
      <div className="md:max-w-[550px] w-full mt-4 ms-auto">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="reset"
            className="border border-gray-300 rounded-lg py-[10px] w-full font-semibold bg-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="border rounded-lg py-[10px] w-full text-white font-semibold bg-[#0F91D2]"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPublish;
