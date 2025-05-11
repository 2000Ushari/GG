// import React, { useEffect, useState } from "react";
// import Box from "@mui/material/Box";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// import NavbarCustomerAfterSignedIn from "../customerComponent/NavbarCustomerAfterSignedIn";
// import CustomerSidenav from "../customerComponent/CustomerSidenav";

// function MyCart() {
//   const navigate = useNavigate();
//   const [customerId, setCustomerId] = useState(null);
//   const [giftboxes, setGiftboxes] = useState([]);
//   const [loading, setLoading] = useState(true); // Loading state for fetch operation

//  // Authentication check
//  useEffect(() => {
//   axios
//     .get("http://localhost:3001/api/auth/authenticated", {
//       withCredentials: true,
//     })
//     .then((res) => {
//       if (res.data.authenticated && res.data.user.role === "customer") {
//         setCustomerId(res.data.user.id);
//       } else {
//         navigate("/login");
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }, [navigate]);

// // Fetch giftboxes after customerId is set
// useEffect(() => {
//   const fetchGiftboxes = async () => {
//     if (!customerId) return;
//     try {
//       const response = await axios.get(
//         `http://localhost:3001/api/giftbox/getMyGiftboxes/${customerId}`
//       );
//       setGiftboxes(response.data);
//     } catch (error) {
//       console.error("Error fetching gift boxes:", error);
//     } finally {
//       setLoading(false); // Stop loading regardless of success or error
//     }
//   };
//   fetchGiftboxes();
// }, [customerId]);

//   return (
//     <>
//     <div>
//       <NavbarCustomerAfterSignedIn />
//       <Box height={30} />
//       <Box sx={{ display: "flex" }}>
//         <CustomerSidenav />
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <h1>My Cart</h1>
//           <Box height={10} />
//               <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
//               {giftboxes.map((giftbox) => (
//                 <GiftboxCard key={giftbox.giftboxId} giftbox={giftbox} />
//               ))}
//         </Box>
//       </Box>
//     </>
//     </div>
//   );

// export default MyCart

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import NavbarCustomerAfterSignedIn from '../customerComponent/NavbarCustomerAfterSignedIn';
import CustomerSidenav from '../customerComponent/CustomerSidenav';
import MyCartGBCard from './MyCartGBCard'; // Make sure this component exists

function MyCart() {
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState(null);
  const [giftboxes, setGiftboxes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Authentication check
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/auth/authenticated', {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.authenticated && res.data.user.role === 'customer') {
          setCustomerId(res.data.user.id);
        } else {
          navigate('/login');
        }
      })
      .catch((err) => {
        console.error('Error during authentication:', err);
      });
  }, [navigate]);

  // Fetch giftboxes after customerId is set
  useEffect(() => {
    const fetchGiftboxes = async () => {
      if (!customerId) return;
      try {
        const response = await axios.get(`http://localhost:3001/api/giftbox/getMyGiftboxes/${customerId}`);
        setGiftboxes(response.data);
      } catch (error) {
        console.error('Error fetching gift boxes:', error);
      } finally {
        setLoading(false); // Stop loading regardless of success or error
      }
    };
    fetchGiftboxes();
  }, [customerId]);

  return (
    <div>
      <NavbarCustomerAfterSignedIn />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <CustomerSidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>My Cart</h1>
          <Box height={10} />

          {loading ? (
            <p>Loading gift boxes...</p>
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {giftboxes.length > 0 ? (
                giftboxes.map((giftbox) => <MyCartGBCard key={giftbox.giftboxId} giftbox={giftbox} />)
              ) : (
                <p>No gift boxes found.</p>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default MyCart;
