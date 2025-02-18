import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import BasicInfo from "../../Components/Services.jsx/BasicInfo";
import PricingPackaging from "../../Components/Services.jsx/PricingPackaging";
import MediaUpload from "../../Components/Services.jsx/MediaUpload";
import ReviewPublish from "../../Components/Services.jsx/ReviewPublish";

function TabPanel(props) {
  useEffect(() => {
    document.title = "New Deals";
  }, []);
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3, fontFamily: "inter" }}>{children}</Box>
      )}
    </div>
  );
}

function NewDeals() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="flex items-center">
        <Link to="/provider/services">
          <FaArrowLeft className="me-4 text-xl" />
        </Link>
        <h2 className="text-2xl font-semibold">Create New Deal</h2>
      </div>
      <p className="text-[#535862] mt-4 ms-8">Create, manage, and organize your deals effortlessly.</p>
      <Box sx={{ width: "100%", typography: "body1", marginTop: "20px" }}>
        <Box>
          <Tabs
            TabIndicatorProps={{ sx: { display: "none" } }}
            sx={{
              "& .MuiTab-root": {
                color: "#717680",
                fontWeight: "600",
                fontFamily: "inter",
              },
              "& .Mui-selected": {
                color: "#0F91D2 !important",
                borderBottom: "solid 4px #0F91D2",
                fontFamily: "inter",
              },
            }}
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto" 
          >
            <Tab label="Basic Info" />
            <Tab label="Pricing & Packages" />
            <Tab label="Media Uploads" />
            <Tab label="Review & Publish" />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <BasicInfo />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PricingPackaging />
        </TabPanel>
       <TabPanel value={value} index={2}>
          <MediaUpload />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ReviewPublish />
        </TabPanel>
      </Box>
    </div>
  );
}

export default NewDeals;