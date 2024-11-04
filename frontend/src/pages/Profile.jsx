// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// // Material UI Components
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";

// // Components
// import CustomerSidenav from "../customer/customerComponent/CustomerSidenav";
// import NavbarCustomerAfterSignedI from "../customer/customerComponent/NavbarCustomerAfterSignedIn";

// export default function Profile() {
//   const [user, setUser] = useState(null); // State to store user information
//   const [userDetails, setUserDetails] = useState(null);
//   const [customerId, setCustomerId] = useState(null);
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
//           customerId(res.data.user.id);
//         } else {
//           navigate("/login"); // Redirect to login if not authenticated
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [navigate]);

//   // Fetch user details based on customerId
//   useEffect(() => {
//     if (customerId) {
//       console.log("Badu ganna yanwaaa");
//       const fetchUserDetails = async () => {
//         try {
//           const response = await axios.get(
//             `http://localhost:3001/api/authentication/getUserDetails/${customerId}`,
//             { withCredentials: true }
//           );
//           if (!response.ok) {
//             throw new Error("Failed to fetch user details");
//           }
//           const data = await response.json();
//           console.log("Badu awaaaa");
//           setUserDetails(data);
//           setUserDetails(response.data);
//         } catch (error) {
//           console.error("Error fetching user details:", error);
//         }
//       };

//       fetchUserDetails();
//     }
//   }, []);

//   // Logout function
//   const handleLogout = () => {
//     axios
//       .post(
//         "http://localhost:3001/api/auth/logout",
//         {},
//         { withCredentials: true }
//       )
//       .then((res) => {
//         if (res.data.logout) {
//           setUser(null); // Clear user state after logout
//           setCustomerId(null); // Clear user Id after logout
//           navigate("/login"); // Redirect to login page
//         }
//       })
//       .catch((err) => {
//         console.log("Logout failed", err);
//       });
//   };

//   // If user is not set, show a loading or fallback UI
//   if (!user) {
//     return <Typography variant="h6">Loading...</Typography>;
//   }
//   return (
//     <>
//       <NavbarCustomerAfterSignedI />
//       <Box height={30} />
//       <Box sx={{ display: "flex" }}>
//         <CustomerSidenav />
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <h1>Profile</h1>
          


//           {user && (
//                 <Box>
//                   <h2>Welcome, {user.id}</h2>
//                   <p>Email: {user.email}</p>
//                   <p>{user.customerId}</p>
//                   {/* Add more user details as needed */}
//                 </Box>
//               )}
              
//         </Box>
//       </Box>
//     </>
//   );
// }


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// // Material UI Components
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";

// // Components
// import CustomerSidenav from "../customer/customerComponent/CustomerSidenav";
// import NavbarCustomerAfterSignedI from "../customer/customerComponent/NavbarCustomerAfterSignedIn";

// export default function Profile() {
//   const [user, setUser] = useState(null); // State to store user information
//   const [userDetails, setUserDetails] = useState(null);
//   const [customerId, setCustomerId] = useState(null);
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
//           setCustomerId(res.data.user.id); // Set customer ID
//         } else {
//           navigate("/login"); // Redirect to login if not authenticated
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [navigate]);

//   // Fetch user details based on customerId
//   useEffect(() => {
//     if (customerId) {
//       console.log("Fetching user details...");
//       const fetchUserDetails = async () => {
//         try {
//           const response = await axios.get(
//             `http://localhost:3001/api/authentication/getUserDetails/${customerId}`,
//             { withCredentials: true }
//           );
//           setUserDetails(response.data);
//         } catch (error) {
//           console.error("Error fetching user details:", error);
//         }
//       };

//       fetchUserDetails();
//     }
//   }, [customerId]);

//   // Logout function
//   const handleLogout = () => {
//     axios
//       .post(
//         "http://localhost:3001/api/auth/logout",
//         {},
//         { withCredentials: true }
//       )
//       .then((res) => {
//         if (res.data.logout) {
//           setUser(null); // Clear user state after logout
//           setCustomerId(null); // Clear user Id after logout
//           navigate("/login"); // Redirect to login page
//         }
//       })
//       .catch((err) => {
//         console.log("Logout failed", err);
//       });
//   };

//   // If user is not set, show a loading or fallback UI
//   if (!user) {
//     return <Typography variant="h6">Loading...</Typography>;
//   }

//   return (
//     <>
//       <NavbarCustomerAfterSignedI />
//       <Box height={30} />
//       <Box sx={{ display: "flex" }}>
//         <CustomerSidenav />
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <h1>Profile</h1>
//           {userDetails ? (
//             <Box>
//             <h2>Welcome, {userDetails.userId}</h2>
//             <p>Email: {userDetails.userEmail}</p>
//             {/* Display role-specific details */}
//             {userDetails.roleDetails && (
//               <Box>
//                 {userDetails.userRole === 'customer' && (
//                   <>
//                     <h3>Customer Details</h3>
//                     <p>Customer ID: {userDetails.roleDetails.customerId}</p>
//                     <p>First Name: {userDetails.roleDetails.customerFirstName}</p>
//                     <p>Last Name: {userDetails.roleDetails.customerLastName}</p>
//                     <p>Date of Birth: {userDetails.roleDetails.customerDob || 'N/A'}</p>
//                     <p>Contact: {userDetails.roleDetails.customerContact || 'N/A'}</p>
//                   </>
//                 )}
//                 {userDetails.userRole === 'admin' && (
//                   <>
//                     <h3>Admin Details</h3>
//                     <p>Admin ID: {userDetails.roleDetails.adminId}</p>
//                     <p>First Name: {userDetails.roleDetails.adminFirstName}</p>
//                     <p>Last Name: {userDetails.roleDetails.adminLastName}</p>
//                     <p>Contact: {userDetails.roleDetails.adminContact || 'N/A'}</p>
//                   </>
//                 )}
//                 {userDetails.userRole === 'employee' && (
//                   <>
//                     <h3>Employee Details</h3>
//                     <p>Employee ID: {userDetails.roleDetails.employeeId}</p>
//                     <p>First Name: {userDetails.roleDetails.employeeFirstName}</p>
//                     <p>Last Name: {userDetails.roleDetails.employeeLastName}</p>
//                     <p>Date of Birth: {userDetails.roleDetails.employeeDob || 'N/A'}</p>
//                     <p>Contact: {userDetails.roleDetails.employeeContact || 'N/A'}</p>
//                     <p>NIC: {userDetails.roleDetails.employeeNIC || 'N/A'}</p>
//                     <p>Gender: {userDetails.roleDetails.employeeGender || 'N/A'}</p>
//                     <p>Address: {userDetails.roleDetails.employeeAddress || 'N/A'}</p>
//                     <p>Working Status: {userDetails.roleDetails.workingStatus || 'N/A'}</p>
//                     <p>Start Date: {userDetails.roleDetails.startDate || 'N/A'}</p>
//                     <p>End Date: {userDetails.roleDetails.endDate || 'N/A'}</p>
//                   </>
//                 )}
//               </Box>
//             )}
//           </Box>
//           ) : (
//             <Typography variant="h6">Loading user details...</Typography>
//           )}
//         </Box>
//       </Box>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Material UI Components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Components
import CustomerProfile from "../customer/CustomerProfile";
import AdminProfile from "../admin/AdminProfile";
import EmployeeProfile from "../employee/EmployeeProfile";

export default function Profile() {
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
        if (res.data.authenticated) {
          setUser(res.data.user); // Set user data if authenticated
          setCustomerId(res.data.user.id); // Set customer ID
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
      console.log("Fetching user details...");
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/authentication/getUserDetails/${customerId}`,
            { withCredentials: true }
          );
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

  // Save function
  const handleSave = (updatedDetails) => {
    // Implement the save logic here, e.g., send a POST request to update the user details
    console.log("Saving details:", updatedDetails);
  };

  // If user is not set, show a loading or fallback UI
  if (!user) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <>
          {/* <h1>My Profile</h1> */}
          {userDetails ? (
            <Box>
              <h2>Welcome, {userDetails.userId}</h2>
              {/* Render role-specific profile component */}
              {userDetails.userRole === 'customer' && (
                <CustomerProfile userDetails={userDetails} onSave={handleSave} />
              )}
              {userDetails.userRole === 'admin' && (
                <AdminProfile userDetails={userDetails} onSave={handleSave} />
              )}
              {userDetails.userRole === 'employee' && (
                <EmployeeProfile userDetails={userDetails} onSave={handleSave} />
              )}
            </Box>
          ) : (
            <Typography variant="h6">Loading user details...</Typography>
          )}

    </>
  );
}