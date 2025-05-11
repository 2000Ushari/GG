
import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AccessoryCard from "./AccessoryCard";

const CustomerAccessories = () => {
  const navigate = useNavigate();
  const [accessories, setAccessories] = useState([]);
  const [userId, setUserId] = useState(null);
  const [customerId, setCustomerId] = useState(null);

// Authentication check
useEffect(() => {
  axios
    .get("http://localhost:3001/api/auth/authenticated", {
      withCredentials: true,
    })
    .then((res) => {
      if (res.data.authenticated && res.data.user.role === "customer") {
        setUserId(res.data.user.id); // Set user ID for customer
      } else {
        navigate("/login"); // Redirect to login if not authenticated
      }
    })
    .catch((err) => {
      console.log("Error in authentication:", err);
    });
}, [navigate]);

// Fetch customer ID based on user ID
const getCustomerIdByUserId = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3001/api/user/getCustomerIdByUserId/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch customer ID");
    }
    const data = await response.json();
    setCustomerId(data.customerId); // Set customerId state correctly here
  } catch (error) {
    console.error("Error fetching customer ID:", error);
  }
};

// Trigger getCustomerIdByUserId when userId is set
useEffect(() => {
  if (userId) {
    getCustomerIdByUserId(userId);
  }
}, [userId]);
    

  // Show all accessories in cards on the customer homepage
  const fetchAccessories = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/accessory/getAccessory");
      if (!response.ok) {
        throw new Error("Failed to fetch accessories");
      }
      const data = await response.json();
      setAccessories(data);
    } catch (error) {
      console.error("Error fetching accessories:", error);
    }
  };

  useEffect(() => {
    fetchAccessories();
  }, []);

  // Get random accessories from the fetched data
  const getRandomAccessories = (accessories, count) => {
    const shuffled = accessories.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomAccessories = getRandomAccessories(accessories, 12);

  return (
    <>
      <Grid item xs={12}>
        <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap" justifyContent={"space-evenly"}>
          {randomAccessories.map((accessory) => (
            // Navigate to accessory card and pass accessory details and customerId
            // console.log("customerId:", customerId),
            // console.log("accessory:", accessory),

            <AccessoryCard 
              key={accessory.accessoryId} 
              accessoryDetails={accessory} 
              // userId={userId} // Pass userId for the API calls
              customerId={customerId} // Pass customerId for favorites handling
            />
          ))}
        </Stack>
      </Grid>
    </>
  );
};

export default CustomerAccessories;
