import React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";

import EmoployeeOrdersTable from "./EmployeeOrdersTable";


function EmployeeOrderTabs() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <>
      <div>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Pending Orders" value="1" />
                <Tab label="Immediate Orders" value="2" />
                <Tab label="Completed Orders" value="3" />
                <Tab label="Cancelled & Returned Orders" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
                <EmoployeeOrdersTable />
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
        </Box>
      </div>
    </>
  );
}

export default EmployeeOrderTabs;
