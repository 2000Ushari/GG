// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardActions,
//   CardContent,
//   CardMedia,
//   Button,
//   Typography,
//   Modal,
//   Box,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useNavigate } from "react-router-dom";
// import Stack from "@mui/material/Stack";
// import NecklaceImage from "../../images/accessories/necklaces.jpg";
// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";
// import AddIcon from "@mui/icons-material/Add";
// import Grid from "@mui/material/Grid";
// // import AddAccessory from "./AddAccessory";
// // import EditAccessory from "./EditAccessory";
// import Swal from "sweetalert2";
// import AccessoryCard from "./AccessoryCard";

// const CustomerAccessories = () => {
//   const [accessories, setAccessories] = useState([]);
//   const [selectedAccessory, setSelectedAccessory] = useState(null);

//   const navigate = useNavigate();

//   const fetchAccessories = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/api/accessory/getAccessory");
//       if (!response.ok) {
//         throw new Error("Failed to fetch accessories");
//       }
//       const data = await response.json();
//       setAccessories(data);
//     } catch (error) {
//       console.error("Error fetching accessories:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAccessories();
//   }, []);

//   return (
//     <>

// {accessories.map((accessory) =>(
//   <AccessoryCard
//                           accessoryDetails ={accessory}
//                           //accessoryID={accessory.accessoryId}
//                           //rating also must be taken
//                         />
// ),
// )}

//     </>
//   );
// };

// export default CustomerAccessories;

// import React, { useEffect, useState } from "react";
// import AccessoryCard from "./AccessoryCard";

// import { Stack } from "@mui/material";
// import Grid from "@mui/material/Grid";

// const CustomerAccessories = () => {
//   const [accessories, setAccessories] = useState([]);

//   const fetchAccessories = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:3001/api/accessory/getAccessory"
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch accessories");
//       }
//       const data = await response.json();
//       setAccessories(data);
//     } catch (error) {
//       console.error("Error fetching accessories:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAccessories();
//   }, []);

//   return (
//     <>
//       <Grid item xs={12}>
        
//           <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap" justifyContent={"space-evenly"}>
//             {accessories.map((accessory) => (
//               <AccessoryCard accessoryDetails={accessory}
//                 //accessoryID={accessory.accessoryId}
//                 //rating also must be taken
//               />
//             ))}
//           </Stack>

//       </Grid>
//     </>
//   );
// };

// export default CustomerAccessories;

// import React, { useEffect, useState } from "react";
// import AccessoryCard from "./AccessoryCard";
// import { Stack } from "@mui/material";
// import Grid from "@mui/material/Grid";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const CustomerAccessories = () => {
//   const navigate = useNavigate();
//   const [accessories, setAccessories] = useState([]);
//   const [userId, setUserId] = useState(null);
//   const [customerId, setCustomerId] = useState(null);

//    // Authentication check
//    useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/auth/authenticated", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (res.data.authenticated && res.data.user.role === "customer") {
//           // setUser(res.data.user); // Set user data if authenticated
//           setUserId(res.data.user.id);
//         } else {
//           navigate("/login"); // Redirect to login if not authenticated
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [navigate]);

// // show all accessories in cards on customer homepage
//   const fetchAccessories = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/api/accessory/getAccessory");
//       if (!response.ok) {
//         throw new Error("Failed to fetch accessories");
//       }
//       const data = await response.json();
//       setAccessories(data);
//     } catch (error) {
//       console.error("Error fetching accessories:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAccessories();
//   }, []);

// const getCustomerIdByUserId = async (userId) => {
//   try {
//     const response = await fetch(`http://localhost:3001/api/customer/getCustomerIdByUserId/${userId}`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch customer ID");
//     }
//     const data = await response.json();
//     return data.customerId;
//     setCustomerId(data.customerId);
//   } catch (error) {
//     console.error("Error fetching customer ID:", error);
//   }
// };

//   const getRandomAccessories = (accessories, count) => {
//     // Shuffle the array
//     const shuffled = accessories.sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, count);
//   };

//   const randomAccessories = getRandomAccessories(accessories, 12);

//   return (
//     <>
//       <Grid item xs={12}>
//         <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap" justifyContent={"space-evenly"}>
//           {randomAccessories.map((accessory) => (
//             //Navigate to accessory card and pass accessory details
//             <AccessoryCard 
//             key={accessory.accessoryId} 
//             accessoryDetails={accessory} 
//             customerId={customerId} 
//           />
//           ))}
//         </Stack>
//       </Grid>
//     </>
//   );
// };

// export default CustomerAccessories;


import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AccessoryCard from "./AccessoryCard";

const CustomerAccessories = () => {
  const navigate = useNavigate();
  const [accessories, setAccessories] = useState([]);
  const [userId, setUserId] = useState(null);
  const [customerId, setCustomerId] = useState(null);

// Authentication check
useEffect(() => {
  axios
    .get("http://localhost:3001/api/auth/authenticated", {
      withCredentials: true,
    })
    .then((res) => {
      if (res.data.authenticated && res.data.user.role === "customer") {
        setUserId(res.data.user.id); // Set user ID for customer
      } else {
        navigate("/login"); // Redirect to login if not authenticated
      }
    })
    .catch((err) => {
      console.log("Error in authentication:", err);
    });
}, [navigate]);

// Fetch customer ID based on user ID
const getCustomerIdByUserId = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3001/api/user/getCustomerIdByUserId/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch customer ID");
    }
    const data = await response.json();
    setCustomerId(data.customerId); // Set customerId state correctly here
  } catch (error) {
    console.error("Error fetching customer ID:", error);
  }
};

// Trigger getCustomerIdByUserId when userId is set
useEffect(() => {
  if (userId) {
    getCustomerIdByUserId(userId);
  }
}, [userId]);
    

  // Show all accessories in cards on the customer homepage
  const fetchAccessories = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/accessory/getAccessory");
      if (!response.ok) {
        throw new Error("Failed to fetch accessories");
      }
      const data = await response.json();
      setAccessories(data);
    } catch (error) {
      console.error("Error fetching accessories:", error);
    }
  };

  useEffect(() => {
    fetchAccessories();
  }, []);

  // Get random accessories from the fetched data
  const getRandomAccessories = (accessories, count) => {
    const shuffled = accessories.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomAccessories = getRandomAccessories(accessories, 12);

  return (
    <>
      <Grid item xs={12}>
        <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap" justifyContent={"space-evenly"}>
          {randomAccessories.map((accessory) => (
            // Navigate to accessory card and pass accessory details and customerId
            // console.log("customerId:", customerId),
            // console.log("accessory:", accessory),

            <AccessoryCard 
              key={accessory.accessoryId} 
              accessoryDetails={accessory} 
              // userId={userId} // Pass userId for the API calls
              customerId={customerId} // Pass customerId for favorites handling
            />
          ))}
        </Stack>
      </Grid>
    </>
  );
};

export default CustomerAccessories;
