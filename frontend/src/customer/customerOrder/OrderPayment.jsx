// import React, { useEffect, useState } from "react";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// import NavbarCustomerAfterSignedIn from "../customerComponent/NavbarCustomerAfterSignedIn";
// import CustomerSidenav from "../customerComponent/CustomerSidenav";
// import Payment from "./Payment";

// function OrderPayment() {
//   const navigate = useNavigate();
//   const {orderId} = useParams();
//   const [userId, setUserId] = useState(null);
//     const [customerId, setCustomerId] = useState(null);
//   const [orderDetails, setOrderDetails] = useState(null);
//     const [giftboxName, setGiftboxName] = useState("");
//     const [shippingAddress, setShippingAddress] = useState("");
//     const [districtName, setDistrictName] = useState("");
//     const [total, setTotal] = useState(0);

//   // Authentication check
//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/auth/authenticated", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (res.data.authenticated && res.data.user.role === "customer") {
//           setUserId(res.data.user.id);
//         } else {
//           navigate("/login");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [navigate]);

//   // Fetch customerId by userId
//   const getCustomerIdByUserId = async (userId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/api/user/getCustomerIdByUserId/${userId}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch customer ID");
//       }
//       const data = await response.json();
//       setCustomerId(data.customerId); // Set customerId state
//       console.log("Customer ID to check Fav:", data.customerIdToCheckFav);
//     } catch (error) {
//       console.error("Error fetching customer ID:", error);
//     }
//   };
//   useEffect(() => {
//     if (userId) {
//         getCustomerIdByUserId(userId);
//     }
//     }, [userId]);

//   const fetchOrder = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3001/api/order/getOrderById/${orderId}`
//       );
//       console.log(response.data);
//       setOrderDetails(response.data);
//       setGiftboxName(response.data.giftboxName);
//       setShippingAddress(response.data.shippingAddress);
//       setDistrictName(response.data.deliveryDistrictName);
//       setTotal(response.data.price);
//       console.log(giftboxName, shippingAddress, districtName, total);
//     } catch (error) {
//       console.error("Error fetching order:", error);
//     }
//   };
//   useEffect(() => {
//     fetchOrder();
//   }, []);

//   return (
//     <div className="bgcolor">
//       <NavbarCustomerAfterSignedIn />
//       <Box sx={{ display: "flex" }}>
//         <CustomerSidenav />
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <Box height={60} />
//           <Grid container spacing={1}>
//             <Grid item xs={12}>
//               <Card sx={{ padding: 3 }}>
//                 {/* Show all the order details */}
//                 <h2>Order Details</h2>
//                 <p>Order ID: {orderDetails?.orderId}</p>
//                 <p>Order Date: {orderDetails?.orderDate}</p>
//                 <p>Due Date: {orderDetails?.dueDate}</p>
//                 <p>Order Status: {orderDetails?.orderStatus}</p>
//                 <p>Shipping Address: {orderDetails?.shippingAddress}</p>
//                 <p>Delivery District: {orderDetails?.deliveryDistrictName}</p>
// <br />
//                 <p>Giftbox Name: {orderDetails?.giftboxName}</p>
//                 <p>Quantity: {orderDetails?.quantity}</p>
//                 <p>Total Price: Rs.{orderDetails?.price}</p>

//               </Card>
//               <br />
//               <Payment
//               paymentDetails={{
//                 item: orderId,
//                 amount: total,
//                 currency: "LKR",
//                 address: shippingAddress,
//                 city: districtName,
//                 country: "Sri Lanka",
//                 giftbox: giftboxName,
//                 customerId: customerId,
//                 userId: userId,
//               }}
//             />
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default OrderPayment;

// import React, { useEffect, useState } from "react";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// import NavbarCustomerAfterSignedIn from "../customerComponent/NavbarCustomerAfterSignedIn";
// import CustomerSidenav from "../customerComponent/CustomerSidenav";
// import Payment from "./Payment";

// function OrderPayment() {
//   const navigate = useNavigate();
//   const { orderId } = useParams();
//   const [userId, setUserId] = useState(null);
//   const [customerId, setCustomerId] = useState(null);
//   const [customerDetails, setCustomerDetails] = useState({});
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [giftboxName, setGiftboxName] = useState("");
//   const [shippingAddress, setShippingAddress] = useState("");
//   const [districtName, setDistrictName] = useState("");
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/auth/authenticated", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (res.data.authenticated && res.data.user.role === "customer") {
//           setUserId(res.data.user.id);
//         } else {
//           navigate("/login");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [navigate]);

//   const fetchOrder = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3001/api/order/getOrderById/${orderId}`
//       );
//       setOrderDetails(response.data);
//       setCustomerId(response.data.customerId);
//       setGiftboxName(response.data.giftboxName);
//       setShippingAddress(response.data.shippingAddress);
//       setDistrictName(response.data.deliveryDistrictName);
//       setTotal(response.data.price);
//     } catch (error) {
//       console.error("Error fetching order:", error);
//     }
//   };

//   useEffect(() => {
//     fetchOrder();
//   }, []);

//   const fetchCustomerDetails = async () => {
//     try {
//         const response = await axios.get(`http://localhost:3001/api/customer/getCustomerById/${customerId}`);
//         setCustomerDetails(response.data);
//         console.log(customerDetails);
//     } catch (error) {
//         console.error("Error fetching customer details:", error);
//     }
//     };
//     useEffect(() => {
//         fetchCustomerDetails();
//     }, []);

//   // Format dates for display
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-GB"); // Change "en-GB" to preferred locale if needed
//   };

//   return (
//     <div className="bgcolor">
//       <NavbarCustomerAfterSignedIn />
//       <Box sx={{ display: "flex" }}>
//         <CustomerSidenav />
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <Box height={60} />
//           <Grid container spacing={1}>
//             <Grid item xs={12}>
//               <Card sx={{ padding: 3 }}>
//                 <Typography variant="h5" gutterBottom>
//                   Order Details
//                 </Typography>
//                 <Divider sx={{ mb: 2 }} />

//                 {/* Order Information */}
//                 <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//                   Order Information
//                 </Typography>
//                 <Typography>Order ID: {orderDetails?.orderId}</Typography>
//                 <Typography>Order Date: {orderDetails?.orderDate ? formatDate(orderDetails.orderDate) : "N/A"}</Typography>
//                 <Typography sx={{ color: "secondary.main", fontWeight: "bold" }}>
//                   Due Date: {orderDetails?.dueDate ? formatDate(orderDetails.dueDate) : "N/A"}
//                 </Typography>
//                 <Typography>Order Status: {orderDetails?.orderStatus}</Typography>

//                 <Divider sx={{ my: 2 }} />

//                 {/* Customer Information */}
//                 <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//                   Customer Information
//                 </Typography>
//                 <Typography>Customer Name: {customerDetails?.customerFirstName} {customerDetails?.customerLastName}</Typography>
//                 <Typography>Contact details: {customerDetails?.customerContact}</Typography>
//                 <Typography>Customer Address: {customerDetails?.customerAddress}</Typography>

//                 <Divider sx={{ my: 2 }} />

//                 {/* Delivery Details */}
//                 <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//                   Delivery Details
//                 </Typography>
//                 <Typography>Shipping Address: {shippingAddress}</Typography>
//                 <Typography>Delivery District: {districtName}</Typography>

//                 <Divider sx={{ my: 2 }} />

//                 {/* Giftbox Details */}
//                 <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//                   Giftbox Details
//                 </Typography>
//                 <Typography>Giftbox Name: {giftboxName}</Typography>
//                 <Typography>Quantity: {orderDetails?.quantity}</Typography>

//                 <Divider sx={{ my: 2 }} />

//                 {/* Total Price */}
//                 <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.main" }}>
//                   Total Price: Rs. {total}
//                 </Typography>
//               </Card>
//               <br />

//               <Payment
//                 paymentDetails={{
//                   item: orderId,
//                   amount: total,
//                   currency: "LKR",
//                   address: shippingAddress,
//                   city: districtName,
//                   country: "Sri Lanka",
//                   giftbox: giftboxName,
//                   customerId: customerId,
//                   userId: userId,
//                 }}
//               />
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default OrderPayment;

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import NavbarCustomerAfterSignedIn from '../customerComponent/NavbarCustomerAfterSignedIn';
import CustomerSidenav from '../customerComponent/CustomerSidenav';
import Payment from './Payment';

// Define the DetailRow component separately
const DetailRow = ({ label, value }) => (
  <Grid container>
    <Grid item xs={6} sm={3}>
      <Typography sx={{ fontWeight: 'bold' }}>{label}</Typography>
    </Grid>
    <Grid item xs={6} sm={9}>
      <Typography>{value}</Typography>
    </Grid>
  </Grid>
);

function OrderPayment() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [userId, setUserId] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({});
  const [orderDetails, setOrderDetails] = useState(null);
  const [giftboxName, setGiftboxName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [total, setTotal] = useState(0);

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

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/order/getOrderById/${orderId}`);
      setOrderDetails(response.data);
      setCustomerId(response.data.customerId);
      setGiftboxName(response.data.giftboxName);
      setShippingAddress(response.data.shippingAddress);
      setDistrictName(response.data.deliveryDistrictName);
      setTotal(response.data.price);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchCustomerDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/customer/getCustomerById/${customerId}`);
      setCustomerDetails(response.data);
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  useEffect(() => {
    if (customerId) {
      fetchCustomerDetails();
    }
  }, [customerId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  return (
    <div className="bgcolor">
      <NavbarCustomerAfterSignedIn />
      <Box sx={{ display: 'flex' }}>
        <CustomerSidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box height={60} />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Card sx={{ padding: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Order Details
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {/* Order Information */}
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 'bold',
                    mt: 2,
                    backgroundColor: 'lightgrey',
                    borderRadius: 2,
                    paddingLeft: '10px',
                    py: '10px',
                  }}
                >
                  Order Information
                </Typography>
                <br />
                <Box sx={{ marginLeft: '20px' }}>
                  <DetailRow label="Order ID:" sx={{ marginLeft: '20px' }} value={orderDetails?.orderId} />
                  <DetailRow
                    label="Order Date:"
                    value={orderDetails?.orderDate ? formatDate(orderDetails.orderDate) : 'N/A'}
                  />
                  <DetailRow
                    label="Due Date:"
                    value={orderDetails?.dueDate ? formatDate(orderDetails.dueDate) : 'N/A'}
                  />
                  <DetailRow label="Order Status:" value={orderDetails?.orderStatus} />
                </Box>
                <Divider sx={{ my: 2 }} />

                {/* Customer Information */}
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 'bold',
                    mt: 2,
                    backgroundColor: 'lightgrey',
                    borderRadius: 2,
                    paddingLeft: '10px',
                    py: '10px',
                  }}
                >
                  Customer Information
                </Typography>
                <br />
                <Box sx={{ marginLeft: '20px' }}>
                  <DetailRow
                    label="Customer Name:"
                    value={`${customerDetails?.customerFirstName} ${customerDetails?.customerLastName}`}
                  />
                  <DetailRow label="Contact details:" value={customerDetails?.customerContact} />
                  <DetailRow label="Customer Address:" value={customerDetails?.customerAddress} />
                </Box>
                <Divider sx={{ my: 2 }} />

                {/* Delivery Details */}
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 'bold',
                    mt: 2,
                    backgroundColor: 'lightgrey',
                    borderRadius: 2,
                    paddingLeft: '10px',
                    py: '10px',
                  }}
                >
                  Delivery Details
                </Typography>
                <br />
                <Box sx={{ marginLeft: '20px' }}>
                  <DetailRow label="Shipping Address:" value={shippingAddress} />
                  <DetailRow label="Delivery District:" value={districtName} />
                </Box>
                <Divider sx={{ my: 2 }} />

                {/* Giftbox Details */}
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 'bold',
                    mt: 2,
                    backgroundColor: 'lightgrey',
                    borderRadius: 2,
                    paddingLeft: '10px',
                    py: '10px',
                  }}
                >
                  Giftbox Details
                </Typography>
                <br />
                <Box sx={{ marginLeft: '20px' }}>
                  <DetailRow label="Giftbox Name:" value={giftboxName} />
                  <DetailRow label="Quantity:" value={orderDetails?.quantity} />
                </Box>
                <Divider sx={{ my: 2 }} />

                {/* Total Price */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mt: 2, ml: 2 }}>
                  Total Price: Rs. {total}
                </Typography>
              </Card>
              <br />

              <Payment
                paymentDetails={{
                  item: orderId,
                  amount: total,
                  currency: 'LKR',
                  address: shippingAddress,
                  city: districtName,
                  country: 'Sri Lanka',
                  giftbox: giftboxName,
                  customerId: customerId,
                  userId: userId,
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default OrderPayment;
