import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  FiMessageCircle,
  FiPhoneCall,
  FiMail,
  FiMessageSquare,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import CallPro from "../../Components/Provider/CallPro";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { HiOutlinePhone } from "react-icons/hi2";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import TextPro from "../../Components/Provider/TextPro";
import EmailPro from "../../Components/Provider/EmailPro";
import InstantChat from "../../Components/Provider/InstantChat";
import { useGetProviderContactProQuery } from "../../services/providerContactPro";
import { useSelector } from "react-redux";
import ConversationTable from "../../Components/Provider/ConversationTable";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

export default function Conversations() {
  const { user } = useSelector(state => state.auth) || {};
  const { data: recordsContactPro, isLoading, isSuccess, error } = useGetProviderContactProQuery(user?.id, { skip: !user?.id })
  useEffect(() => {
    document.title = "Conversations";
  }, []);

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log("recordsContactPro", recordsContactPro)
  const callProData = recordsContactPro?.data?.filter(item => item.type === "call_pro") || [];
  const smsProData = recordsContactPro?.data?.filter(item => item.type === "sms_pro") || [];
  const emailProData = recordsContactPro?.data?.filter(item => item.type === "email_pro") || [];
  const locationProData = recordsContactPro?.data?.filter(item => item.type === "get_direction") || [];


  const tabs = React.useMemo(() => [
    { label: "Instant Chat", icon: <IoChatboxEllipsesOutline />, content: <InstantChat /> },
    { label: "Call Pro", icon: <HiOutlinePhone />, content: <ConversationTable title={"Call Pro"} subtitle={"Manage and Respond to Messages Seamlessly"} data={callProData} isLoading={isLoading} /> },
    { label: "Text Pro", icon: <IoChatbubbleEllipsesOutline />, content: <ConversationTable title={"Text Pro"} subtitle={"Manage and Respond to Messages Seamlessly"}  data={smsProData} isLoading={isLoading} /> },
    { label: "Email Pro", icon: <FiMail />, content: <ConversationTable title={"Email Pro"} subtitle={"Manage and Respond to Messages Seamlessly"}  data={emailProData} isLoading={isLoading} /> },
    { label: "Get Location", icon: <SlLocationPin />, content: <ConversationTable title={"Get Location"} subtitle={"Manage and Respond to Messages Seamlessly"}  data={locationProData} isLoading={isLoading} /> },
  ], [recordsContactPro, isLoading]);
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{ borderBottom: 0, borderColor: "divider", overflowX: "auto" }}
        >
          <Tabs
            indicatorColor="transparent"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              fontFamily: "Inter",
              minHeight: "32px",
              borderBottom: "1px solid #D7D7D7",
              paddingBottom: "16px",
              paddingTop: "16px",
            }}
            value={value}
            onChange={handleChange}
            aria-label="custom tabs example"
          >
            {tabs.map((tab, index) => (
              <Tab
                sx={{
                  fontFamily: "Inter",
                  textTransform: "capitalize",
                  fontSize: { xs: "14px", sm: "16px" },
                  color: "#000",
                  minWidth: "42px",
                  marginRight: { xs: "8px", sm: "15px" },
                  position: "relative",
                  minHeight: "32px",
                  padding: { xs: "8px 10px", sm: "8px 14px" },
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  border: "1px solid #D7D7D7",
                  borderRadius: "6px",
                  fontWeight: "600",
                  gap: "5px",
                  "&.Mui-selected": {
                    color: "#fff !important",
                    border: "1px solid #0F91D2",
                    background: "#0F91D2",
                    fontFamily: "Inter",
                  },
                }}
                key={index}
                label={
                  <>
                    <span className="text-2xl">{tab.icon}</span>{" "}
                    <span>{tab.label}</span>
                  </>
                }
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </Box>
        {tabs.map((tab, index) => (
          <CustomTabPanel key={index} value={value} index={index}>
            {tab.content}
          </CustomTabPanel>
        ))}
      </Box>
    </div>
  );
}
