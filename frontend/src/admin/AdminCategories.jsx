import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import CategoryList from "./adminCategory/CategoryList";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import CreditCardIcon from "@mui/icons-material/CreditCard";

import AdminSidenav from "./adminComponents/AdminSidenav";
import AdminNavbar from "./adminComponents/AdminNavbar";

export default function AdminCategories() {
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


const [cardData, setCardData] = useState([]);

  return (
    <>
      <div className="bgcolor">
        <AdminNavbar />
        <Box height={60} />
        <Box sx={{ display: "flex" }}>
          <AdminSidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Typography gutterBottom variant="h5" component="div" sx={{ marginLeft: "10px", fontWeight: "bold" }}>
             Categories
            </Typography>
            <Grid item xs={12}>
              <CategoryList />
            </Grid>
          </Box>
        </Box>
      </div>

      <div>
      <Box sx={{ display: "flex" }}>
          <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={2}>
              {cardData.map((bin) => (
                <Grid item xs={12} sm={6} md={4} key={bin.bin_id}>
                  <Stack direction="row" spacing={2}>
                    <Card
                      sx={{ width: "100%" }}
                      className="gradient"
                    >
                      <CardContent>
                        <div>
                          <CreditCardIcon
                            sx={{ color: "white", marginTop: 2 }}
                          />
                        </div>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          align="center"
                        >
                          {bin.bin_name}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="body2"
                          component="div"
                        >
                          {bin.type_name}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="body2"
                          component="div"
                          sx={{ color: "gray" }}
                        >
                          {bin.address}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Stack>
                </Grid>
              ))}
            </Grid>
            <Box height={30} />
          </Box>
        </Box>
      </div>
    </>
  );
}
