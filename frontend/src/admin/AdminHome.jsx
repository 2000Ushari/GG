import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import AdminSidenav from "./adminComponents/AdminSidenav";
import AdminNavbar from "./adminComponents/AdminNavbar";
import AccordianDash from "../components/AccordianDash";
import "../Dash.css";
import FigureCards from "./adminComponents/FigureCards";
import AccessoryPrices from "./adminDashboard/AccessoryPrices";
import AccessoryVsStock from "./adminDashboard/AccessoryVsStock";
import OrderCountByStatus from "./adminDashboard/OrderCountByStatus";



export default function AdminHome() {
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/authenticated", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.authenticated && res.data.user.role === "admin") {
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
      <div className="bgcolor">
        <AdminNavbar />
        <Box height={60} />
        <Box sx={{ display: "flex" }}>
          <AdminSidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            
          <FigureCards/>
            <Box height={20} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card sx={{ height: 90 + "vh" }}>
                  <CardContent>
    <AccessoryPrices />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
              <Card>
               <CardContent>
                    <OrderCountByStatus/>
                  </CardContent>
               </Card>
              </Grid>
              <Grid item xs={4}>
              <Card>
               <CardContent>
                    <OrderCountByStatus/>
                  </CardContent>
               </Card>
              </Grid>
              <Grid item xs={4}>
              <Card>
               <CardContent>
                    <OrderCountByStatus/>
                  </CardContent>
               </Card>
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ height: 200 + "vh" }}>
                  <CardContent>
    <AccessoryVsStock />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card sx={{ height: 60 + "vh" }}>
                  <CardContent>
                    <div className="paddingall">
                      <span className="pricetitle">Popular Products</span>
                    </div>
                    <AccordianDash />
                  </CardContent>
                </Card>
                {/* practice */}
                <br />
                <Box sx={{ flexGrow: 1 }}>
                  
                </Box>
                {/* ------------ */}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
}
