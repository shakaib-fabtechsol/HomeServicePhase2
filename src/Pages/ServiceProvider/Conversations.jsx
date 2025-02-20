import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { FiSearch } from "react-icons/fi";
import { RiEqualizerLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import pro1 from "../../assets/img/pro1.png";
import pro2 from "../../assets/img/pro2.png";
import pro3 from "../../assets/img/pro3.png";
import pro4 from "../../assets/img/pro4.png";
import pro5 from "../../assets/img/pro5.png";
import pro6 from "../../assets/img/pro6.png";
import pro7 from "../../assets/img/pro7.png";
import pro8 from "../../assets/img/pro8.png";

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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Conversations() {
  useEffect(() => {
    document.title = "Conversations";
  }, []);

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = [
    // { label: "All Conversations", content: <Table /> },
    { label: "Active", content: <p>Active conversations content</p> },
    { label: "Archived", content: <p>Archived conversations content</p> },
  ];

  return (
    <div>
      <div className="mb-2">
        <h2 className="font-semibold text-3xl">Conversations</h2>
        <p className="text-gray-600">Track and manage your favorite services.</p>
      </div>
      <div>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <label
            className="flex items-center border w-full sm:max-w-[300px] rounded-[8px] overflow-hidden"
            htmlFor="search"
          >
            <FiSearch className="ms-2" />
            <input className="w-full p-2 outline-none" type="search" name="search" id="search" />
          </label>
          <div className="ms-auto">
            <button className="text-[#16151C] border flex items-center gap-2 py-2 px-4 rounded-[8px]">
              <RiEqualizerLine /> <span>Filter</span>
            </button>
          </div>
        </div>
      </div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 0, borderColor: 'divider', overflowX: 'auto' }}>
          <Tabs
            indicatorColor='transparent'
            variant="scrollable"
            scrollButtons="auto"
            sx={{ fontFamily: "Inter", minHeight: "32px" }}
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
                  fontWeight: "400",
                  color: "#000",
                  minWidth: "42px",
                  marginRight: { xs: "8px", sm: "15px" },
                  position: "relative",
                  minHeight: "32px",
                  padding: { xs: "5px 10px", sm: "5px 14px" },
                  '&.Mui-selected': {
                    color: "#0F91D2 !important",
                    borderBottom: "solid 4px #0F91D2",
                    fontFamily: "Inter",
                  },
                }}
                key={index}
                label={tab.label}
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
