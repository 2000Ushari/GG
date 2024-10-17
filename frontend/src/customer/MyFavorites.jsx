import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import NavbarCustomerAfterSignedIn from "./customerComponent/NavbarCustomerAfterSignedIn";
import CustomerSidenav from "./customerComponent/CustomerSidenav";

function MyFavorites() {
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/authenticated", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.authenticated && res.data.user.role === "customer") {
          // setUser(res.data.user); // Set user data if authenticated
          // customerId(res.data.user.id);
        } else {
          navigate("/login"); // Redirect to login if not authenticated
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);


  return ( 
    <>
      <NavbarCustomerAfterSignedIn />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <CustomerSidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>My Favorites</h1>

        </Box>
      </Box>
    </>

  )
}

export default MyFavorites