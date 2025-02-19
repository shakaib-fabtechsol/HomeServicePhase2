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
  );
}
