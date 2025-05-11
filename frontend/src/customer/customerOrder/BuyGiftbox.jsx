// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import Box from '@mui/material/Box'
// import { Card, CardActions, CardContent } from '@mui/material'
// import axios from 'axios'
// import Typography from '@mui/material/Typography'

// import NavbarCustomerAfterSignedIn from '../customerComponent/NavbarCustomerAfterSignedIn'
// import CustomerSidenav from '../customerComponent/CustomerSidenav'

// function BuyGiftbox() {
//     const location = useLocation();
//     const { giftboxId } = location.state || {}; // Destructure giftboxId from state
//     const [giftbox, setGiftbox] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [giftboxAccessories, setGiftboxAccessories] = useState([]);

//     useEffect(() => {
//       if (giftboxId) {
//         // Use giftboxId to load data or perform actions
//         console.log("Received giftboxId:", giftboxId);
//       }
//     }, [giftboxId]);

//     const fetchGiftbox = async () => {
//         try {
//           const response = await axios.get(
//             `http://localhost:3001/api/giftbox/getGiftboxById/${giftboxId}`
//           );
//           setGiftbox(response.data[0]);
//         } catch (error) {
//           console.error("Error fetching gift box:", error);
//         } finally {
//           setLoading(false); // Stop loading regardless of success or error
//         }
//       };
//       useEffect(() => {
//         fetchGiftbox();
//       }, []);

//       const fetchGiftboxAccessories = async () => {
//         try {
//           const response = await axios.get(
//             `http://localhost:3001/api/giftbox/getGiftboxAccessories/${giftboxId}`
//           );
//           setGiftboxAccessories(response.data);
//           console.log("Gift box accessories:", response.data);
//         } catch (error) {
//           console.error("Error fetching gift box accessories:", error);
//         }
//       }
//         useEffect(() => {
//             fetchGiftboxAccessories();
//         }
//         , []);

//   return (
//     <div className="bgcolor">
//       <NavbarCustomerAfterSignedIn />
//       <Box sx={{ display: "flex" }}>
//         <CustomerSidenav />

//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Box height={60} />
// <Card sx={{ minWidth: 275 }}>
//     <CardContent>
//         <Typography variant="h6" component="div">
//             Giftbox Name: {giftbox?.giftboxName}
//         </Typography>
// <Typography sx={{ mb: 1.5 }} color="text.secondary">
//     Price : {giftbox?.giftboxPrice}
// </Typography>
// <Typography variant="body2">
//     Note Content : {giftbox?.noteContent}
// </Typography>
// <Typography variant="body2">
//     Description : {giftbox?.giftboxDescription}
// </Typography>
//         <Typography variant="body2">
//             Box Color : {giftbox?.boxcolorId}
//         </Typography>
//     </CardContent>
//     {giftboxAccessories.map((accessory) => (
//                     <CardContent key={accessory.accessoryId}>
//                         <Typography variant="body2">
//                             Accessory Name : {accessory.accessoryName}
//                         </Typography>
//                         <Typography variant="body2">
//                             Accessory Price : {accessory.accessoryPrice}
//                         </Typography>
//                         <Typography variant="body2">
//                             Accessory quantity : {accessory.quantity}
//                         </Typography>

//                     </CardContent>
//                 ))}
// </Card>
// <Box height={10} />
//             </Box>
// </Box>
//         </div>
//   )
// }

// export default BuyGiftbox

// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import Box from "@mui/material/Box";
// import {
//   Card,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Grid,
//   TextField,
//   Autocomplete,
//   Button,
// } from "@mui/material";
// import axios from "axios";
// import Divider from '@mui/material/Divider';

// import NavbarCustomerAfterSignedIn from "../customerComponent/NavbarCustomerAfterSignedIn";
// import CustomerSidenav from "../customerComponent/CustomerSidenav";

// function BuyGiftbox() {
//   const location = useLocation();
//   const { giftboxId } = location.state || {};
//   const [giftbox, setGiftbox] = useState(null);
//   const [giftboxAccessories, setGiftboxAccessories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [districts, setDistricts] = useState([]);
//     const [districtName, setDistrictName] = useState("");
//   const [selectedDistrict, setSelectedDistrict] = useState(null);
//   const shippingCost = 300;
//   const wrappingCost = 300;

//   useEffect(() => {
//     if (giftboxId) {
//       console.log("Received giftboxId:", giftboxId);
//     }
//   }, [giftboxId]);

//   const fetchGiftbox = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3001/api/giftbox/getGiftboxById/${giftboxId}`
//       );
//       setGiftbox(response.data[0]);
//     } catch (error) {
//       console.error("Error fetching gift box:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchGiftboxAccessories = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3001/api/giftbox/getGiftboxAccessories/${giftboxId}`
//       );
//       setGiftboxAccessories(response.data);
//       console.log("Gift box accessories:", response.data);
//     } catch (error) {
//       console.error("Error fetching gift box accessories:", error);
//     }
//   };

//   useEffect(() => {
//     fetchGiftbox();
//     fetchGiftboxAccessories();
//   }, []);

//   const fetchDistricts = async () => {
//     try {
//         const response = await axios.get(
//             `http://localhost:3001/api/order/getDistricts`
//         );
//         setDistricts(response.data);
//         setDistrictName(response.data.deliveryDistrictName);
//         console.log("Districts:", response.data);
//         console.log("District Name:", response.data.deliveryDistrictName);
//     } catch (error) {
//         console.error("Error fetching districts:", error);
//     }
//     };
//     useEffect(() => {
//     fetchDistricts();
//     }, []);

//   // Calculate subtotal and total
//   const subtotal = giftboxAccessories.reduce(
//     (sum, accessory) => sum + accessory.accessoryPrice * accessory.quantity,
//     0
//   );
//   const total = subtotal + shippingCost + wrappingCost;

//   return (
//     <div className="bgcolor">
//       <NavbarCustomerAfterSignedIn />
//       <Box sx={{ display: "flex" }}>
//         <CustomerSidenav />
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <Box height={60} />
//           <Grid container spacing={1}>
//             <Grid item xs={4}>
//               <Card sx={{ padding: 3 }}>
//                 <Typography variant="h6" component="div" gutterBottom>
//                   Giftbox Name: {giftbox?.giftboxName}
//                 </Typography>
//                 <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                   Price : {giftbox?.giftboxPrice}
//                 </Typography>
//                 <Typography variant="body2">
//                   Note Content : {giftbox?.noteContent}
//                 </Typography>
//                 <Typography variant="body2">
//                   Description : {giftbox?.giftboxDescription}
//                 </Typography>
//                 <Typography variant="body2" component="div" gutterBottom>
//                   Box Color: {giftbox?.boxcolorId}
//                 </Typography>
//               </Card>
//             </Grid>
//             <Grid item xs={4}>
//               <Card sx={{ padding: 3 }}>
//                 <Typography variant="body1" component="div" gutterBottom>
//                   Shipping address:{" "}
//                 </Typography>
//                 <TextField
//                 sx={{ mb: 1.5 }}
//                   size="small"
//                   multiline
//                   fullWidth
//                   rows={2}
//                   placeholder="Add where you want to ship the giftbox"
//                 ></TextField>
//                 <Autocomplete
//                   value={selectedDistrict}
//                   onChange={(event, newValue) => setSelectedDistrict(newValue)}
//                   options={districts}
//                   getOptionLabel={(option) => option.color}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="District"
//                       variant="outlined"
//                       size="small"
//                     />
//                   )}
//                 />
//               </Card>

//             </Grid>
//             <Grid item xs={4}>
//               <Card sx={{ padding: 3 }}>
//                   <Button variant="outlined" color="primary" fullWidth>
//                 Select Payment Method
//                 </Button>

//      </Card>
//                 <Card sx={{ padding: 3 }}>
//                 <Typography variant="body1" component="div" gutterBottom>
//                 Due Date
//                 </Typography>
//                 {/* add a date picker */}
//               </Card>
//             </Grid>
//           </Grid>
//           <br />

//           <TableContainer component={Paper} >
//             <Table aria-label="giftbox details table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>
//                     <strong>PRODUCT</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>PER UNIT</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>QTY</strong>
//                   </TableCell>
//                   <TableCell align="right">
//                     <strong>TOTAL</strong>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {giftboxAccessories.map((accessory) => (
//                   <TableRow key={accessory.accessoryId}>
//                     <TableCell>{accessory.accessoryName}</TableCell>
//                     <TableCell>Rs. {accessory.accessoryPrice}</TableCell>
//                     <TableCell align="center">{accessory.quantity}</TableCell>
//                     <TableCell align="right">
//                       Rs. {accessory.accessoryPrice * accessory.quantity}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//                 <br />

//                 <TableRow>
//                   <TableCell rowSpan={4} />
//                   <TableCell>
//                     <strong>SUBTOTAL</strong>
//                   </TableCell>
//                   <TableCell />
//                   <TableCell align="right">Rs. {subtotal}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>
//                     <strong>SHIPPING</strong>
//                   </TableCell>
//                   <TableCell />
//                   <TableCell align="right">Rs. {shippingCost}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>
//                     <strong>WRAPPING</strong>
//                   </TableCell>
//                   <TableCell />
//                   <TableCell align="right">Rs. {wrappingCost}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>
//                     <strong>TOTAL</strong>
//                   </TableCell>
//                   <TableCell />
//                   <TableCell align="right">
//                     <strong>Rs. {total}</strong>
//                   </TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default BuyGiftbox;
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import Box from "@mui/material/Box";
// import {
//   Card,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Grid,
//   TextField,
//   Autocomplete,
//   Button,
// } from "@mui/material";
// import axios from "axios";

// import NavbarCustomerAfterSignedIn from "../customerComponent/NavbarCustomerAfterSignedIn";
// import CustomerSidenav from "../customerComponent/CustomerSidenav";
// import Payment from "./Payment";

// function BuyGiftbox() {
//   const location = useLocation();
//   const { giftboxId } = location.state || {};
//   const [giftbox, setGiftbox] = useState(null);
//   const [giftboxAccessories, setGiftboxAccessories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [districts, setDistricts] = useState([]);
//   const [districtName, setDistrictName] = useState("");
//   const [selectedDistrict, setSelectedDistrict] = useState(null);
//   const shippingCost = 300;
//   const wrappingCost = 300;
//   const otherCost = 134;

//   useEffect(() => {
//     if (giftboxId) {
//       console.log("Received giftboxId:", giftboxId);
//     }
//   }, [giftboxId]);

//   const fetchGiftbox = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3001/api/giftbox/getGiftboxById/${giftboxId}`
//       );
//       setGiftbox(response.data[0]);
//     } catch (error) {
//       console.error("Error fetching gift box:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchGiftboxAccessories = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3001/api/giftbox/getGiftboxAccessories/${giftboxId}`
//       );
//       setGiftboxAccessories(response.data);
//       console.log("Gift box accessories:", response.data);
//     } catch (error) {
//       console.error("Error fetching gift box accessories:", error);
//     }
//   };

//   useEffect(() => {
//     fetchGiftbox();
//     fetchGiftboxAccessories();
//   }, []);

//   const fetchDistricts = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3001/api/order/getDistricts`
//       );
//       setDistricts(response.data);
//       // setDistrictName(response.data.deliveryDistrictName);
//       // console.log("Districts:", response.data);
//       // console.log("District Name:", response.data.deliveryDistrictName);
//     } catch (error) {
//       console.error("Error fetching districts:", error);
//     }
//   };

//   useEffect(() => {
//     fetchDistricts();
//   }, []);

//   // Calculate subtotal and total
//   const subtotal = giftboxAccessories.reduce(
//     (sum, accessory) => sum + accessory.accessoryPrice * accessory.quantity,
//     0
//   );
//   const total = subtotal + shippingCost + wrappingCost + otherCost;

//   const handleOrder = () => {
//     console.log("Order placed");
//   }

//   return (
//     <div className="bgcolor">
//       <NavbarCustomerAfterSignedIn />
//       <Box sx={{ display: "flex" }}>
//         <CustomerSidenav />
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <Box height={60} />
//           <Grid container spacing={1}>
//             <Grid item xs={4}>
//               <Card sx={{ padding: 3 }}>
//                 <Typography variant="h6" component="div" gutterBottom>
//                   Giftbox Name: {giftbox?.giftboxName}
//                 </Typography>
//                 <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                   Price : {giftbox?.giftboxPrice}
//                 </Typography>
//                 <Typography variant="body2">
//                   Note Content : {giftbox?.noteContent}
//                 </Typography>
//                 <Typography variant="body2">
//                   Description : {giftbox?.giftboxDescription}
//                 </Typography>
//                 <Typography variant="body2" component="div" gutterBottom>
//                   Box Color: {giftbox?.boxcolorId}
//                 </Typography>
//               </Card>
//             </Grid>
//             <Grid item xs={4}>
//               <Card sx={{ padding: 3 }}>
//                 <Typography variant="body1" component="div" gutterBottom>
//                   Shipping address:{" "}
//                 </Typography>
//                 <TextField
//                   sx={{ mb: 1.5 }}
//                   size="small"
//                   multiline
//                   fullWidth
//                   rows={2}
//                   placeholder="Add where you want to ship the giftbox"
//                 ></TextField>
//                 <Autocomplete
//                   value={selectedDistrict}
//                   onChange={(event, newValue) => setSelectedDistrict(newValue)}
//                   options={districts}
//                   getOptionLabel={(option) => option.color}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="District"
//                       variant="outlined"
//                       size="small"
//                     />
//                   )}
//                 />
//               </Card>
//             </Grid>
//             <Grid item xs={4}>
//               <Card sx={{ padding: 3 }}>
//                 <Typography variant="body" component="div" gutterBottom>
//                   Due Date
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   component="div"
//                   gutterBottom
//                   color={"darkred"}
//                 >
//                   Please note that additional charges may apply for late orders.
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   type="date"
//                   variant="outlined"
//                   size="small"
//                   InputLabelProps={{ shrink: true }}
//                 />
//               </Card>
//             </Grid>
//           </Grid>
//           <br />
//           <TableContainer component={Paper}>
//             <Table aria-label="giftbox details table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>
//                     <strong>PRODUCT</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>PRICE PER UNIT</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>QTY</strong>
//                   </TableCell>
//                   <TableCell align="right">
//                     <strong>TOTAL(LKR)</strong>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {giftboxAccessories.map((accessory) => (
//                   <TableRow key={accessory.accessoryId}>
//                     <TableCell>{accessory.accessoryName}</TableCell>
//                     <TableCell>{accessory.accessoryPrice}</TableCell>
//                     <TableCell align="center">{accessory.quantity}</TableCell>
//                     <TableCell align="right">
//                       {accessory.accessoryPrice * accessory.quantity}.00
//                     </TableCell>
//                   </TableRow>
//                 ))}
//                 <TableRow>
//                   <TableCell rowSpan={5} />
//                   <TableCell>
//                     <strong>SUBTOTAL</strong>
//                   </TableCell>
//                   <TableCell />
//                   <TableCell align="right">{subtotal}.00</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>
//                     <strong>SHIPPING</strong>
//                   </TableCell>
//                   <TableCell />
//                   <TableCell align="right">{shippingCost}.00</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>
//                     <strong>WRAPPING</strong>
//                   </TableCell>
//                   <TableCell />
//                   <TableCell align="right">{wrappingCost}.00</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>
//                     <strong>OTHER</strong>
//                   </TableCell>
//                   <TableCell />
//                   <TableCell align="right">{otherCost}.00</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>
//                     <strong>TOTAL</strong>
//                   </TableCell>
//                   <TableCell />
//                   <TableCell align="right">
//                     <strong>{total}.00</strong>
//                   </TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <Box
//             alignItems="center"
//             justifyContent="end"
//             display="flex"
//             sx={{ my: 2, me: 3 }}
//           >
//             <Button variant="contained" color="primary" onClick={handleOrder}>
//               Proceed to Payment
//             </Button>
//             <Payment
//               paymentDetails={{
//                 item: giftbox?.giftboxName,
//                 amount: total,
//                 currency: "LKR",
//                 address: "No.1, Galle Road",
//                 city: "Colombo",
//                 country: "Sri Lanka",
//               }}
//             />
//           </Box>
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default BuyGiftbox;

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import {
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  TextField,
  Autocomplete,
  Button,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { differenceInHours, set } from 'date-fns';
import Swal from 'sweetalert2';

import NavbarCustomerAfterSignedIn from '../customerComponent/NavbarCustomerAfterSignedIn';
import CustomerSidenav from '../customerComponent/CustomerSidenav';
import Payment from './Payment';

function BuyGiftbox() {
  const location = useLocation();
  const navigate = useNavigate();
  const { giftboxId } = useParams() || location.state || {};
  const [userId, setUserId] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [giftbox, setGiftbox] = useState(null);
  const [giftboxAccessories, setGiftboxAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [districts, setDistricts] = useState([]);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [wrappingFee, setWrappingFee] = useState(0); //to format into float
  const [otherFee, setOtherFee] = useState(0); //to format into float
  const [dueDate, setDueDate] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  // Authentication check
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/auth/authenticated', {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.authenticated && res.data.user.role === 'customer') {
          setUserId(res.data.user.id);
        } else {
          navigate('/login');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  // Fetch customer ID based on user ID
  const getCustomerIdByUserId = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/user/getCustomerIdByUserId/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch customer ID');
      }
      const data = await response.json();
      setCustomerId(data.customerId); // Set customerId state correctly here
    } catch (error) {
      console.error('Error fetching customer ID:', error);
    }
  };
  // Trigger getCustomerIdByUserId when userId is set
  useEffect(() => {
    if (userId) {
      getCustomerIdByUserId(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (giftboxId) {
      console.log('Received giftboxId:', giftboxId);
    }
  }, [giftboxId]);

  const fetchGiftbox = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/giftbox/getGiftboxById/${giftboxId}`);
      setGiftbox(response.data[0]);
    } catch (error) {
      console.error('Error fetching gift box:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGiftboxAccessories = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/giftbox/getGiftboxAccessories/${giftboxId}`);
      setGiftboxAccessories(response.data);
      console.log('Gift box accessories:', response.data);
    } catch (error) {
      console.error('Error fetching gift box accessories:', error);
    }
  };

  useEffect(() => {
    fetchGiftbox();
    fetchGiftboxAccessories();
  }, []);

  const fetchDistricts = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/order/getDistricts`);
      setDistricts(response.data);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  useEffect(() => {
    fetchDistricts();
  }, []);

  // Calculate subtotal and total
  const subtotal = giftboxAccessories.reduce(
    (sum, accessory) => sum + accessory.accessoryPrice * accessory.quantity,
    0
  );

  const formattedSubTotal = parseFloat(subtotal).toFixed(2);

  const total = (
    parseFloat(subtotal) +
    parseFloat(deliveryFee || 0) +
    parseFloat(wrappingFee || 0) +
    parseFloat(otherFee || 0)
  ).toFixed(2);

  const fetchDeliveryFee = async () => {
    try {
      if (!selectedDistrict || !selectedDistrict.deliveryDistrictName) {
        console.error('Selected district is invalid or missing');
        return;
      }

      const response = await axios.get(
        `http://localhost:3001/api/order/getDeliveryFee/${selectedDistrict.deliveryDistrictName}`
      );

      if (response.data && response.data.deliveryFee) {
        setDeliveryFee(response.data.deliveryFee);
      } else {
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching delivery fee:', error);
    }
  };
  useEffect(() => {
    if (selectedDistrict) {
      fetchDeliveryFee();
    }
  }, [selectedDistrict]);

  const fetchWrappingFee = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/order/getWrappingFee/${giftboxId}`);
      setWrappingFee(response.data.wrappingFee);
    } catch (error) {
      console.error('Error fetching wrapping fee:', error);
    }
  };
  useEffect(() => {
    fetchWrappingFee();
  }, []);

  // First, add this helper function at the top of your component
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split('T')[0];

  const handleDueDateChange = async (event) => {
    const newDueDate = event.target.value;
    setDueDate(newDueDate);

    const today = new Date();
    const selectedDate = new Date(newDueDate);

    // Calculate the difference in hours
    const hoursDifference = differenceInHours(selectedDate, today);

    let calculatedOtherFees = 0;

    if (hoursDifference <= 24) {
      calculatedOtherFees = subtotal * 0.25; // 25% charge for less than 24 hours
    } else if (hoursDifference < 48) {
      calculatedOtherFees = subtotal * 0.1; // 10% charge for less than 48 hours
    } else if (hoursDifference < 96) {
      calculatedOtherFees = subtotal * 0.05; // 5% charge for less than 96 hours
    }

    setOtherFee(calculatedOtherFees);
  };

  const handleQuantityInput = (event) => {
    const newQuantity = event.target.value;
    setQuantity(newQuantity);
  };

  // const handleOrder = async () => {

  //   if (!selectedDistrict || !shippingAddress || !dueDate) {
  //     console.error("Selected district, shipping address, or due date is missing");
  //     return;
  //   } else{

  //   const orderDate = new Date().toISOString().slice(0, 10); // Current date in YYYY-MM-DD format

  //   // Prepare the order data to send to the backend
  //   const orderData = {
  //     giftboxId,
  //     quantity: quantity,
  //     price: total*quantity,
  //     orderDate,
  //     orderStatus: "Pending",
  //     dueDate,
  //     customerId: customerId, // Ensure `customer.id` is set correctly
  //     shippingAddress: shippingAddress, // Set dynamically if needed
  //     deliveryDistrictId: selectedDistrict?.deliveryDistrictId, // Make sure it's populated

  //   };

  //   // Confirm with SweetAlert before proceeding with the order
  //   Swal.fire({
  //     title: 'Confirm Payment',
  //     text: `Your order has been placed.Are you sure you want to proceed with the payment?`,
  //     icon: 'info',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes',
  //     cancelButtonText: 'Cancel'
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //         // navigate(`/customer/order/orderPayment/${userId}`);
  //       try {
  //         // POST request to the backend
  //         const response = await axios.post('http://localhost:3001/api/order/placeOrder', orderData);

  //         if (response.status === 201) { // Assuming 201 status for successful creation
  //           const { orderId } = response.data; // Access orderId from response
  //           console.log("Order created successfully with ID:", orderId);
  //           Swal.fire('Order Placed', 'Your order has been successfully placed!', 'success');
  //           navigate(`/customer/order/orderPayment/${orderId}`);
  //           setShowPayment(true); // Show Payment component if order creation is successful
  //         }
  //       } catch (error) {
  //         console.error("Error creating order:", error);
  //         Swal.fire('Error', 'There was an error placing your order. Please try again.', 'error');
  //       }
  //     }
  //   });
  // }
  // };

  const handleOrder = async () => {
    if (!selectedDistrict || !shippingAddress || !dueDate) {
      // Show a SweetAlert warning if any required field is missing
      Swal.fire({
        title: 'Missing Information',
        text: 'Please fill in the delivery district, shipping address, and due date.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return; // Exit function if required fields are missing
    }

    const orderDate = new Date().toISOString().slice(0, 10); // Current date in YYYY-MM-DD format

    // Prepare the order data to send to the backend
    const orderData = {
      giftboxId,
      quantity: quantity,
      price: totalPrice,
      orderDate,
      orderStatus: 'Payment Pending',
      dueDate,
      customerId: customerId,
      shippingAddress: shippingAddress,
      deliveryDistrictId: selectedDistrict?.deliveryDistrictId,
    };

    // Confirm with SweetAlert before proceeding with the order
    Swal.fire({
      title: 'Confirm Payment',
      text: `Your order has been placed. Are you sure you want to proceed with the payment?`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // POST request to the backend
          const response = await axios.post('http://localhost:3001/api/order/placeOrder', orderData);

          if (response.status === 201) {
            // Assuming 201 status for successful creation
            const { orderId } = response.data; // Access orderId from response
            console.log('Order created successfully with ID:', orderId);
            Swal.fire('Order Placed', 'Your order has been successfully placed!', 'success');
            navigate(`/customer/order/orderPayment/${orderId}`);
            setShowPayment(true); // Show Payment component if order creation is successful
          }
        } catch (error) {
          console.error('Error creating order:', error);
          Swal.fire('Error', 'There was an error placing your order. Please try again.', 'error');
        }
      }
    });
  };

  const totalPrice = parseFloat((wrappingFee + otherFee + subtotal) * quantity + deliveryFee).toFixed(2);

  return (
    <div className="bgcolor">
      <NavbarCustomerAfterSignedIn />
      <Box sx={{ display: 'flex' }}>
        <CustomerSidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box height={60} />
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Card sx={{ padding: 3 }}>
                <Typography variant="h6" component="div" gutterBottom>
                  Giftbox Name: {giftbox?.giftboxName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Price : {giftbox?.giftboxPrice}
                </Typography>
                <Typography variant="body2">Note Content : {giftbox?.noteContent}</Typography>
                <Typography variant="body2">Description : {giftbox?.giftboxDescription}</Typography>
                <Typography variant="body2" component="div" gutterBottom>
                  Box Color: {giftbox?.boxcolorId}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ padding: 3 }}>
                <Typography variant="body1" component="div" gutterBottom>
                  Shipping address:{' '}
                </Typography>
                <TextField
                  sx={{ mb: 1.5 }}
                  size="small"
                  multiline
                  fullWidth
                  rows={3}
                  placeholder="Add where you want to ship the giftbox"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                ></TextField>
                <Autocomplete
                  value={selectedDistrict}
                  onChange={(event, newValue) => setSelectedDistrict(newValue)}
                  options={districts}
                  getOptionLabel={(option) => option.deliveryDistrictName}
                  renderInput={(params) => <TextField {...params} label="District" variant="outlined" size="small" />}
                />
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ padding: 3 }}>
                <Typography variant="body" component="div" gutterBottom>
                  Due Date
                </Typography>
                <Typography variant="body2" component="div" gutterBottom color={'darkred'}>
                  Please note that additional charges may apply for late orders.
                </Typography>
                <TextField
                  fullWidth
                  type="date"
                  variant="outlined"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  value={dueDate}
                  onChange={handleDueDateChange}
                  inputProps={{
                    min: tomorrowString, // Disable today and past dates
                  }}
                  sx={{ mb: 2 }}
                />

                <TextField
                  label="Giftbox Quantity"
                  type="number"
                  value={quantity}
                  onChange={handleQuantityInput}
                  InputProps={{ inputProps: { min: 1 } }}
                  size="small"
                  fullWidth
                />
              </Card>
            </Grid>
          </Grid>
          <br />
          <TableContainer component={Paper}>
            <Table aria-label="giftbox details table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>PRODUCT</strong>
                  </TableCell>
                  <TableCell>
                    <strong>PRICE PER UNIT</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>QTY</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>TOTAL(LKR)</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {giftboxAccessories.map((accessory) => (
                  <TableRow key={accessory.accessoryId}>
                    <TableCell>{accessory.accessoryName}</TableCell>
                    <TableCell>{accessory.accessoryPrice}</TableCell>
                    <TableCell align="center">{accessory.quantity}</TableCell>
                    <TableCell align="right">
                      {parseFloat(accessory.accessoryPrice * accessory.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell rowSpan={6} />
                  <TableCell>
                    <strong>SUBTOTAL</strong>
                  </TableCell>
                  <TableCell />
                  <TableCell align="right">{formattedSubTotal}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>SHIPPING</strong>
                  </TableCell>
                  <TableCell />
                  <TableCell align="right">{parseFloat(deliveryFee).toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>WRAPPING</strong>
                  </TableCell>
                  <TableCell />
                  <TableCell align="right">{parseFloat(wrappingFee).toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>OTHER</strong>
                  </TableCell>
                  <TableCell />
                  <TableCell align="right">{parseFloat(otherFee).toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>TOTAL</strong>
                  </TableCell>
                  <TableCell />
                  <TableCell align="right">
                    <strong>{total}</strong>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>TOTAL ORDER VALUE(LKR)</strong>
                  </TableCell>
                  <TableCell />
                  <TableCell align="right">
                    <strong>{totalPrice}</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box alignItems="center" justifyContent="end" display="flex" sx={{ my: 2, me: 3 }}>
            <Button variant="contained" color="primary" onClick={handleOrder}>
              Proceed to Payment
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default BuyGiftbox;
