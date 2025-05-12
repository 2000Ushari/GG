import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// import NavbarCustomer from "../customerComponent/NavbarCustomer";
import CustomerFooter from '../customerComponent/CustomerFooter';
import CustomerOrderTable from './CustomerOrderTable';
import CustomerOrderHistoryTable from './CustomerOrderHistoryTable';
import CustomerOrderCancelledTable from './CustomerOrderCancelledTable';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function CustomerTabs() {
  const [tabValue, setTabValue] = React.useState(0);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Card sx={{ display: 'flex', m: 2, p: 2 }}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Ongoing Orders" value="1" />
                <Tab label="Order History" value="2" />
                <Tab label="Return/Refunds" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <CustomerOrderTable />
            </TabPanel>
            <TabPanel value="2">
              <CustomerOrderHistoryTable />
            </TabPanel>
            <TabPanel value="3">
              <CustomerOrderCancelledTable />
            </TabPanel>
          </TabContext>
        </Box>
      </Card>

      <Grid item xs={12}>
        <CustomerFooter />
      </Grid>
    </>
  );
}

export default CustomerTabs;
