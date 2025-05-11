import React, { useState, useEffect}from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import SavingsIcon from '@mui/icons-material/SavingsOutlined';
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MoneyIcon from '@mui/icons-material/MonetizationOnOutlined';
import FaceIcon from '@mui/icons-material/FaceRetouchingNaturalOutlined';
import InventoryIcon from '@mui/icons-material/InventoryOutlined';

function FigureCards() {
    const [customerCount, setCustomerCount] = useState(0);
    const [accessoryCount, setAccessoryCount] = useState(0);
    const [sales, setSales] = useState();
    const [orderCount, setOrderCount] = useState(0);

    const fetchNoOfCustomers = async () => {
      try {
          const response = await fetch("http://localhost:3001/api/dashboard/getNumberOfCustomers");
          if (!response.ok) throw new Error("Failed to fetch No of customers");
          
          const data = await response.json();
          // console.log("API Response:", data);  // Log the response to check structure
          
          // Update state with the correct data if the structure is as expected
          setCustomerCount(data[0].distinct_customer_count || 0);
      } catch (error) {
          console.error("Error fetching No of customers:", error);
      }
  };
  useEffect(() => {
    fetchNoOfCustomers();
  }, []); 
  
  const fetchNoOfProducts= async () => {
    try {
        const response = await fetch("http://localhost:3001/api/dashboard/getNumberOfAccessories");
        if (!response.ok) throw new Error("Failed to fetch No of Accessories");
        
        const data = await response.json();
        // console.log("API Response:", data);  // Log the response to check structure
        
        // Update state with the correct data if the structure is as expected
        setAccessoryCount(data[0].distinct_accessory_count || 0);
    } catch (error) {
        console.error("Error fetching No of Accessories:", error);
    }
};
useEffect(() => {
  fetchNoOfProducts();
}, []); 


const fetchSales= async () => {
  try {
      const response = await fetch("http://localhost:3001/api/dashboard/getSales");
      if (!response.ok) throw new Error("Failed to fetch sales");
      
      const data = await response.json();
      // console.log("API Response:", data);  // Log the response to check structure
      
      // Update state with the correct data if the structure is as expected
      setSales(data[0].total_sales || 0);
  } catch (error) {
      console.error("Error fetching sales:", error);
  }
};
useEffect(() => {
  fetchSales();
}, []); 

const fetchOrderCount = async () => {
  try {
      const response = await fetch("http://localhost:3001/api/dashboard/getOrderCount");
      if (!response.ok) throw new Error("Failed to fetch order count");
      
      const data = await response.json();
      // console.log("API Response:", data);  // Log the response to check structure
      
      // Update state with the correct data if the structure is as expected
      setOrderCount(data[0].orderCount || 0);
  }
  catch (error) {
      console.error("Error fetching order count:", error);
  }
}
useEffect(() => {
  fetchOrderCount();
}, []);

  return (
    <div>
      <Grid item xs={12}>
        <Stack spacing={2} direction={"row"}>
          <Card
            sx={{ minWidth: 24 + "%", height: 200 }}
            className="gradientbluish"
          >
            <CardContent>
              <div className="iconstyle">
                <MoneyIcon />
              </div>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ color: "#ffffff" }}
              >
                Rs. {sales}
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                component="div"
                sx={{ color: "#ccd1d1" }}
              >
                Sales
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" >Learn More</Button>
            </CardActions>
          </Card>
          <Card
            sx={{ minWidth: 24 + "%", height: 200 }}
            className="gradientgreenish"
          >
            <CardContent>
              <div className="iconstyle">
                <FaceIcon />
              </div>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ color: "#ffffff" }}
              >
                {customerCount}
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                component="div"
                sx={{ color: "#ccd1d1" }}
              >
                Customers
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
          <Card
            sx={{ minWidth: 24 + "%", height: 200 }}
            className="gradientyellowish"
          >
            <CardContent>
              <div className="iconstyle">
                <InventoryIcon />
              </div>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ color: "#ffffff" }}
              >
                {accessoryCount}
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                component="div"
                sx={{ color: "#ccd1d1" }}
              >
                Products
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
          <Card
            sx={{ minWidth: 24 + "%", height: 200 }}
            className="gradientpurpleish"
          >
            <CardContent>
              <div className="iconstyle">
                <ShoppingBagIcon />
              </div>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ color: "#ffffff" }}
              >
                {orderCount}
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                component="div"
                sx={{ color: "#ccd1d1" }}
              >
                Total Orders
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Stack>
      </Grid>
    </div>
  );
}

export default FigureCards;