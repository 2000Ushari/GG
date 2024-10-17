

import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";

// import NavbarCustomer from "../customerComponent/NavbarCustomer";
import CustomerFooter from "../customer/customerComponent/CustomerFooter";
import NavbarCustomerAfterSignedIn from "../customer/customerComponent/NavbarCustomerAfterSignedIn";

import GiftboxView from "../customer/customerGiftbox/GiftboxView";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
// import AddToGiftbox from "../customer/customerGiftbox/AddToGiftbox";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


const label = { inputProps: { "aria-label": "Checkbox demo" } };

function CustomerTabs() {
  const { accessoryId } = useParams();;
  const [accessory, setAccessory] = useState({});
  const [tabValue, setTabValue] = React.useState(0);
  const [openAddToGiftboxModal, setOpenAddToGiftboxModal] = useState(false);

  const handleOpenAddToGiftboxModal = () => setOpenAddToGiftboxModal(true);
  const handleCloseAddToGiftboxModal = () => setOpenAddToGiftboxModal(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  console.log("Accessory details");
  console.log(accessory)

  // useEffect(() => {
  //   const fetchAccessory = async () => {
  //     console.log("Badu ganna yanwaaa");
  //     try {
  //       const response = await fetch(
  //         `http://localhost:3001/api/accessory/${accessoryId}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch accessory details");
  //       }
  //       const data = await response.json();
  //       console.log("Badu awaaaa");
  //       setAccessory(data);
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error fetching accessory details:", error);
  //     }
  //   };

  //   fetchAccessory();
  // }, []);

  // if (!accessory) {
  //   return <div>Loading...</div>;
  // }

;

  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>
      <div className="bgcolor">
        {/* <NavbarCustomer /> */}
        <NavbarCustomerAfterSignedIn />
        <Box height={60} />

        <Card sx={{ display: 'flex', m: 2, p: 2 }}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Dashboard" value="1" />
            <Tab label="My Cart" value="2" />
            <Tab label="Orders" value="3" />
            <Tab label="Addresses" value="4" />
            <Tab label="Account Details" value="5" />
            <Tab label="Logout" value="6" />
            {/* <Tab label="Item Three" value="6" /> */}
          </TabList>
        </Box>
        <TabPanel value="1"><GiftboxView/></TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
        <TabPanel value="4">Item four</TabPanel>
        <TabPanel value="5">Item five</TabPanel>
        <TabPanel value="6">Item six</TabPanel>
      </TabContext>
    </Box>
    </Card>
    
        
        <Grid item xs={12}>
          <CustomerFooter />
        </Grid>

      </div>
    </>
  );
}

export default CustomerTabs;
