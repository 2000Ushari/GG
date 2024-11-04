import React from "react";
import { Box, Grid } from "@mui/material";
import CustomerCarousal from "../components/CustomerCarousal";

function CategoryWiseAccessories() {
  return (
    <>
      <div>CategoryWiseAccessories</div>
      <div className="bgcolor">
        {/* Pass the handleLogout function as a prop to Navbar */}
        <NavbarCustomerAfterSignedIn handleLogout={handleLogout} />
        <Box height={60} />
        <Box sx={{ display: "flex" }}>
          <CustomerSidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={1} sx={{ justifyContent: "center" }}>
          <Box sx={{ display: "flex" }}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CustomerCarousal />
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Box>
        </Box>
    </div>
    </>
  );
}

export default CategoryWiseAccessories;
