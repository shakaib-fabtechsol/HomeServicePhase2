import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MyDetail from "../../Components/ProviderSetting/MyDetail";
import ServiceArea from "../../Components/ProviderSetting/ServiceArea";
import BusinessProfile from "../../Components/ProviderSetting/BusinessProfile";
import CertificationHour from "../../Components/ProviderSetting/CertificationHour";
import AdditionalInfo from "../../Components/ProviderSetting/AdditionalInfo";

function TabPanel(props) {
  useEffect(() => {
    document.title = "Settings";
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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
function Settings() {
  useEffect(() => {
    document.title = "Settings";
  }, []);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="navv">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold">Settings</h2>
        </div>
        <p className="text-[#535862] mt-4">
          Track, manage and forecast your customers and orders.
        </p>
      </div>
      <div>
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
              <Tab label="My details" />
              <Tab label="Service Area" />
              <Tab label="Business Profile " />
              <Tab label="Certifications & Hours" />
              <Tab label="Additional Info" />
              <Tab label="Social Profiles" />
              <Tab label="Password" />
              <Tab label="Channels for Conversations" />
              <Tab label="Payment/Payout Info" />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <MyDetail />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ServiceArea />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <BusinessProfile />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <CertificationHour />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <AdditionalInfo />
          </TabPanel>
          <TabPanel value={value} index={5}>
            {/* <SocialProfile /> */}
          </TabPanel>
          <TabPanel value={value} index={6}>
            {/* <Password /> */}
          </TabPanel>
          <TabPanel value={value} index={7}>
            {/* <ChannelConversation /> */}
          </TabPanel>
          <TabPanel value={value} index={8}>
            {/* <Payment /> */}
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}

export default Settings;
