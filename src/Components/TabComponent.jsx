import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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
      {value === index && <Box sx={{ pt: 1 }}>{children}</Box>}
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

export default function TabComponent({ tabs }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 0, borderColor: 'divider', overflowX: 'auto' }}>
        <Tabs
          indicatorColor='transparent'
          variant="scrollable"
          scrollButtons="auto"
          sx={{ fontFamily: "Inter", minHeight: "32px", borderBottom: "solid 1px #E9EAEB",
           }}
          value={value}
          onChange={handleChange}
          aria-label="custom tabs example"
          TabScrollButtonProps={{
            sx: {
              width:"10px",
              background:"#fff",
             
              height:"20px",
              margin:"14px 0 0",
              boxShadow:"rgba(149, 157, 165, 0.2) 0px 8px 24px;",
              "&:hover": { color: "#0056b3" },
            },
          }}
        >
        {tabs.map((tab, index) => (
            <Tab
              sx={{
                fontFamily: "Inter",
                textTransform: "capitalize",
                fontSize: { xs: "14px", sm: "16px" },
                fontWeight: "600",
                color: "#000",
                minWidth: "42px",
                marginRight: { xs: "8px", sm: "15px" },
                position: "relative",
                minHeight: "32px",
                padding: { xs: "5px 10px", sm: "5px 14px 16px" },
                '&.Mui-selected': {
                  color: "#0F91D2 !important",
                  borderBottom: "solid 3px #0F91D2",
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
  );
}
