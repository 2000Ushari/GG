import React from "react";
import Sidenav from "../components/Sidenav";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Categories from "../customer/customerComponent/CategoryTiles";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import "../Dash.css";

export default function About() {
  return (
    <>
      <div className="bgcolor">
        <Navbar />
        <Box height={30} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <h1>About</h1>

            <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
              <Grid container spacing={2}>

                <Card sx={{ height: 200 + "vh", flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ color: "#000000", paddingLeft: 5 }}
                  >
                    <h2>Categories</h2>
                  </Typography>

                  <Box
                    sx={{
                      paddingInlineStart: 4,
                      paddingInlineEnd: 4,
                      flexGrow: 1,
                    }}
                  >
                    <CardContent>
                      <div>
                        <Categories />
                      </div>
                    </CardContent>
                  </Box>

                </Card>


              </Grid>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
}
