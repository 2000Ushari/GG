// import React from "react";
// import AccordianDash from "../components/AccordianDash";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import Stack from "@mui/material/Stack";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
// import "../Dash.css";
// import NavbarCustomerAfterSignedIn from "./customerComponent/NavbarCustomerAfterSignedIn";
// import CustomerCarousal from "./customerComponent/CustomerCarousal";
// import CategoryListBox from "../pages/CategoryListBox";
// import CategoryTiles from "./customerComponent/CategoryTiles";
// import Link from "@mui/material/Link";

// import CustomerAccessories from "./customerAccessory/CustomerAccessories";
// import CustomerFooter from "./customerComponent/CustomerFooter";

// export default function CustomerHome() {
//   return (
//     <>
//       <div className="bgcolor">
//         <NavbarCustomerAfterSignedIn />
//         <Box height={60} />
//         <Box sx={{ display: "flex" }}>
//           <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//             <Grid container spacing={1}>
//               <Box sx={{ display: "flex" }}>
//               <Grid item xs={2}>
//                 <CategoryListBox />
//               </Grid>
//               <Grid item xs={8}>
//                 <Box sx={{ display: "flex", justifyContent: "center" }}>
//                   <CustomerCarousal />
//                 </Box>
//                 <br />
//               </Grid>
//               <Grid item xs={2}>
//                 <AccordianDash />
//               </Grid>
//               </Box>

//               <Grid item xs={12}>
//                 <CategoryTiles />
//               </Grid>

//               {/*

//               <Grid item xs={12}>
//                 <Stack spacing={2} direction={"row"}>
//                   <Card
//                     sx={{ minWidth: 49 + "%", height: 200 }}
//                     className="gradient"
//                   >
//                     <CardContent>
//                       <div className="iconstyle">
//                         <CreditCardIcon />
//                       </div>
//                       <Typography
//                         gutterBottom
//                         variant="h5"
//                         component="div"
//                         sx={{ color: "#ffffff" }}
//                       >
//                         $500.00
//                       </Typography>
//                       <Typography
//                         gutterBottom
//                         variant="body2"
//                         component="div"
//                         sx={{ color: "#ccd1d1" }}
//                       >
//                         Total Earning
//                       </Typography>
//                     </CardContent>
//                     <CardActions>
//                       <Button size="small">Share</Button>
//                       <Button size="small">Learn More</Button>
//                     </CardActions>
//                   </Card>
//                   <Card
//                     sx={{ minWidth: 49 + "%", height: 200 }}
//                     className="gradientlight"
//                   >
//                     <CardContent>
//                       <div className="iconstyle">
//                         <ShoppingBagIcon />
//                       </div>
//                       <Typography
//                         gutterBottom
//                         variant="h5"
//                         component="div"
//                         sx={{ color: "#ffffff" }}
//                       >
//                         $900.00
//                       </Typography>
//                       <Typography
//                         gutterBottom
//                         variant="body2"
//                         component="div"
//                         sx={{ color: "#ccd1d1" }}
//                       >
//                         Total Order
//                       </Typography>
//                     </CardContent>
//                     <CardActions>
//                       <Button size="small">Share</Button>
//                       <Button size="small">Learn More</Button>
//                     </CardActions>
//                   </Card>
//                 </Stack>
//               </Grid> */}
//               {/*
//               <Grid item xs={4}>
//                 <Stack spacing={2}>
//                   <Card className="gradientlight">
//                     <Stack spacing={2} direction="row">
//                       <div className="iconstyle">
//                         <StorefrontIcon />
//                       </div>
//                       <div className="paddingall">
//                         <span className="pricetitle">$203K</span>
//                         <br />
//                         <span className="pricesubtitle">Total Income</span>
//                       </div>
//                     </Stack>
//                   </Card>
//                   <Card sx={{ maxWidth: 345 }}>
//                     <Stack spacing={2} direction="row">
//                       <div className="iconstyleblack">
//                         <StorefrontIcon />
//                       </div>
//                       <div className="paddingall">
//                         <span className="pricetitle">$203K</span>
//                         <br />
//                         <span className="pricesubtitle">Total Income</span>
//                       </div>
//                     </Stack>
//                   </Card>
//                 </Stack>
//               </Grid> */}
//             </Grid>
//             <Box height={20} />
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <Card sx={{ height: 200 + "vh" }}>
//                   <CardContent>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         pr: 3,
//                       }}
//                     >
//                       <Typography
//                         className="paddingall"
//                         gutterBottom
//                         variant="h5"
//                         component="div"
//                       >
//                         Shop with Us...
//                       </Typography>
//                       <Link
//                         href="#"
//                         color="grey"
//                         display="block"
//                         underline="hover"
//                         fontSize={16}
//                       >
//                         View more
//                       </Link>
//                     </Box>
//                     {/* link nto viewmore */}
//                     <CustomerAccessories />
//                   </CardContent>
//                 </Card>
//               </Grid>
//               {/* <Grid item xs={4}>
//                 <Card sx={{ height: 60 + "vh" }}>
//                   <CardContent>
//                     <div className="paddingall">
//                       <span className="pricetitle">Popular Products</span>
//                     </div>
//                     <AccordianDash />
//                   </CardContent>
//                 </Card>
//                 <br />
//                 <Box sx={{ flexGrow: 1 }}></Box>

//               </Grid> */}
//             </Grid>
//           </Box>
//         </Box>
//         <Grid item xs={12}>
//           <CustomerFooter />
//         </Grid>
//       </div>
//     </>
//   );
// }

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import AccordianDash from "../components/AccordianDash";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import Stack from "@mui/material/Stack";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
// import "../Dash.css";
// import NavbarCustomerAfterSignedIn from "./customerComponent/NavbarCustomerAfterSignedIn";
// import CustomerCarousal from "./customerComponent/CustomerCarousal";
// import CategoryListBox from "../pages/CategoryListBox";
// import CategoryTiles from "./customerComponent/CategoryTiles";
// import Link from "@mui/material/Link";
// import CustomerAccessories from "./customerAccessory/CustomerAccessories";
// import CustomerFooter from "./customerComponent/CustomerFooter";

// export default function CustomerHome() {
//   const [user, setUser] = useState(null); // State to store user information
//   const navigate = useNavigate();

//   // Authentication check
//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/auth/authenticated", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (res.data.authenticated) {
//           setUser(res.data.user); // Set user data if authenticated
//         } else {
//           navigate("/login"); // Redirect to login if not authenticated
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [navigate]);

//   // If user is not set, show a loading or fallback UI
//   if (!user) {
//     return <Typography variant="h6">Loading...</Typography>;
//   }

//   return (
//     <>
//       <div className="bgcolor">
//         <NavbarCustomerAfterSignedIn />
//         <Box height={60} />
//         <Box sx={{ display: "flex" }}>
//           <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//             <Grid container spacing={1}>
//               <Box sx={{ display: "flex" }}>
//                 <Grid item xs={2}>
//                   <CategoryListBox />
//                 </Grid>
//                 <Grid item xs={8}>
//                   <Box sx={{ display: "flex", justifyContent: "center" }}>
//                     <CustomerCarousal />
//                   </Box>
//                   <br />
//                 </Grid>
//                 <Grid item xs={2}>
//                   <AccordianDash />
//                 </Grid>
//               </Box>

//               <Grid item xs={12}>
//                 <CategoryTiles />
//               </Grid>

//               {/* Additional content can go here */}
//             </Grid>
//             <Box height={20} />
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <Card sx={{ height: 200 + "vh" }}>
//                   <CardContent>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         pr: 3,
//                       }}
//                     >
//                       <Typography
//                         className="paddingall"
//                         gutterBottom
//                         variant="h5"
//                         component="div"
//                       >
//                         Shop with Us...
//                       </Typography>
//                       <Link
//                         href="#"
//                         color="grey"
//                         display="block"
//                         underline="hover"
//                         fontSize={16}
//                       >
//                         View more
//                       </Link>
//                     </Box>
//                     <CustomerAccessories />
//                   </CardContent>
//                 </Card>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <Grid item xs={12}>
//           <CustomerFooter />
//         </Grid>
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AccordianDash from "../components/AccordianDash";
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
import "../Dash.css";
import NavbarCustomerAfterSignedIn from "./customerComponent/NavbarCustomerAfterSignedIn";
import CustomerCarousal from "./customerComponent/CustomerCarousal";
import CategoryListBox from "../pages/CategoryListBox";
import CategoryTiles from "./customerComponent/CategoryTiles";
import Link from "@mui/material/Link";
import CustomerAccessories from "./customerAccessory/CustomerAccessories";
import CustomerFooter from "./customerComponent/CustomerFooter";
import CustomerSidenav from "./customerComponent/CustomerSidenav";

export default function CustomerHome() {
  const [user, setUser] = useState(null); // State to store user information
  const [userDetails, setUserDetails] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/authenticated", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.authenticated && res.data.user.role === "customer") {
          setUser(res.data.user); // Set user data if authenticated
          setCustomerId(res.data.user.id);
        } else {
          navigate("/login"); // Redirect to login if not authenticated
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  // Fetch user details based on customerId
  useEffect(() => {
    if (customerId) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/authentication/getUserDetails/${customerId}`,
            { withCredentials: true }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch user details");
          }
          const data = await response.json();
          setUserDetails(data);
          setUserDetails(response.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      fetchUserDetails();
    }
  }, [customerId]);

  // Logout function
  const handleLogout = () => {
    axios
      .post(
        "http://localhost:3001/api/auth/logout",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.logout) {
          setUser(null); // Clear user state after logout
          setCustomerId(null); // Clear user Id after logout
          navigate("/login"); // Redirect to login page
        }
      })
      .catch((err) => {
        console.log("Logout failed", err);
      });
  };

  // If user is not set, show a loading or fallback UI
  if (!user) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <>
      <div className="bgcolor">
        {/* Pass the handleLogout function as a prop to Navbar */}
        <NavbarCustomerAfterSignedIn handleLogout={handleLogout} />
        <Box height={60} />
        <Box sx={{ display: "flex" }}>
          <CustomerSidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={1} sx={{justifyContent: "center"}}>
              <Box sx={{ display: "flex"}}>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CustomerCarousal />
                  </Box>
                  <br />
                </Grid>
                {/* <Grid item xs={4}>
                  <AccordianDash />
                </Grid> */}
              </Box>
              <Grid item xs={12}>
                <CategoryTiles />
              </Grid>

              {/* Additional content can go here */}
            </Grid>
            <Box height={20} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card sx={{ height: 200 + "vh" }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        pr: 3,
                      }}
                    >
                      <Typography
                        className="paddingall"
                        gutterBottom
                        variant="h5"
                        component="div"
                      >
                        Shop with Us...
                      </Typography>
                      <Link
                        href="#"
                        color="grey"
                        display="block"
                        underline="hover"
                        fontSize={16}
                      >
                        View more
                      </Link>
                    </Box>
                    <CustomerAccessories />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <CustomerFooter />
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
}
