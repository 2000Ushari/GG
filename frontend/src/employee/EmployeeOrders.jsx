import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import EmployeeSidenav from "./employeeComponents/EmployeeSidenav";
import EmployeeNavbar from "./employeeComponents/EmployeeNavbar";
import EmployeeOrderTabs from "./employeeOrder/EmployeeOrderTabs";

function AdminOrder() {
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/authenticated", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.authenticated && res.data.user.role === "employee") {
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
        <EmployeeNavbar />
        <Box height={60} />
        <Box sx={{ display: "flex" }}>
          <EmployeeSidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card sx={{ height: 100 + "vh", flexGrow: 1 }}>
                  <CardContent>

                    <EmployeeOrderTabs/>


                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default AdminOrder;
