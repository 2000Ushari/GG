import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card, CardMedia, CardContent, CardActions } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import AdminSidenav from "./adminComponents/AdminSidenav";
import AdminNavbar from "./adminComponents/AdminNavbar";
import CustomerList from "./adminCustomer/CustomerList";

function AdminCustomers() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

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

  const fetchCustomers = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/customer/getCustomers"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <div>
        AdminCustomers ratings feedbacks complaints customer details - view
      </div>

      <div className="bgcolor">
        <AdminNavbar />
        <Box height={60} />
        <Box sx={{ display: "flex" }}>
          <AdminSidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ marginLeft: "10px", fontWeight: "bold" }}
            >
              Customers
            </Typography>
            <Card>
              <Box height={30} />
              <Grid item xs={12}>
                <Card sx={{ pb: 2, flexGrow: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "20px",
                      marginRight: "20px",
                    }}
                  >
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      sx={{ width: 300, marginLeft: "20px" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Search by name" />
                      )}
                    />
                  </div>
                  <Button><CustomerList>list of customers</CustomerList></Button>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "20px",
                      justifyContent: "left",
                      paddingLeft: "20px",
                    }}
                  >
                    
                  </div>
                </Card>
              </Grid>
            </Card>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default AdminCustomers;
