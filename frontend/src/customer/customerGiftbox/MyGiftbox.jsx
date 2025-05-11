// import React, {useState, useEffect} from 'react'
// import { Box } from '@mui/system'
// import axios from 'axios'
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom"

// import CustomerSidenav from '../customerComponent/CustomerSidenav'
// import NavbarCustomerAfterSignedIn from '../customerComponent/NavbarCustomerAfterSignedIn'

// function MyGiftbox() {
//     const [customerId, setCustomerId] = useState(null);
//     const {giftboxId } = useParams(); // Get the giftboxId from the URL
//     const {navigate } = useNavigate();
//     const [giftbox, setGiftbox] = useState(null);

//        // Authentication check
//    useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/auth/authenticated", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         console.log(res.data);
//         if (res.data.authenticated) {
//           if(res.data.user.role === "customer"){
//             setCustomerId(res.data.user.id);
//           }
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [navigate]);

//   useEffect(() => {
//     const fetchGiftbox = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3001/api/giftbox/getGiftboxById/${giftboxId}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch giftbox details");
//         }
//         const data = await response.json();
//         setGiftbox(data);
//       } catch (error) {
//         console.error("Error fetching giftbox details:", error);
//       }
//     };
//     fetchGiftbox();
//     window.scrollTo(0, 0); // Scrolls to the top whenever giftboxId changes
//   }, [giftboxId]); // Fetch new giftbox when accessoryId changes

//   if (!giftbox) {
//     return <div>Loading...</div>; // Show a loading state while data is being fetched
//   }

//   return (
//     <>
//       <div className="bgcolor">
//         <NavbarCustomerAfterSignedIn />
//         <Box height={60} />
//         <Box sx={{ display: "flex" }}>
//           <CustomerSidenav />
//           <Box height={60} />
//             <Box
//                 sx={{
//                 width: "100%",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 }}
//             >
//                 <h1>{giftbox.giftboxName}</h1>
//                 </Box>
//             </Box>
//         </div>
//     </>

//   )
// }

// export default MyGiftbox

// import React, { useState, useEffect } from "react";
// import { Box } from "@mui/system";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// import CustomerSidenav from "../customerComponent/CustomerSidenav";
// import NavbarCustomerAfterSignedIn from "../customerComponent/NavbarCustomerAfterSignedIn";

// function MyGiftbox() {
//   const [customerId, setCustomerId] = useState(null);
//   const { giftboxId } = useParams(); // Get the giftboxId from the URL
//   const navigate = useNavigate(); // Corrected: Just use navigate instead of destructuring
//   const [giftbox, setGiftbox] = useState(null);
//   const [loading, setLoading] = useState(true); // Track loading state

//   // Authentication check
//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/auth/authenticated", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (res.data.authenticated && res.data.user.role === "customer") {
//           setCustomerId(res.data.user.id);
//         } else {
//           navigate("/login"); // Redirect to login if not authenticated
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         navigate("/login"); // Handle authentication errors by redirecting to login
//       });
//   }, [navigate]);

//   // Fetch giftbox details
//   useEffect(() => {
//     const fetchGiftbox = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3001/api/giftbox/getMyGiftboxes/${giftboxId}`
//         );
//         console.log(response);
//         if (!response.ok) {
//           throw new Error("Failed to fetch giftbox details");
//         }
//         const data = await response.json();
//         setGiftbox(data);
//         setLoading(false); // Set loading to false once data is fetched
//       } catch (error) {
//         console.error("Error fetching giftbox details:", error);
//         setLoading(false); // Stop loading even on error
//       }
//     };
//     fetchGiftbox();
//     window.scrollTo(0, 0); // Scrolls to the top whenever giftboxId changes
//   }, [giftboxId]);

//   if (loading) {
//     return <div>Loading...</div>; // Show a loading state while data is being fetched
//   }

//   if (!giftbox) {
//     return <div>Giftbox not found</div>; // Handle the case where the giftbox data is not available
//   }

//   return (
//     <>
//       <div className="bgcolor">
//         <NavbarCustomerAfterSignedIn />
//         <Box height={60} />
//         <Box sx={{ display: "flex" }}>
//           <CustomerSidenav />
//           <Box height={60} />
//           <Box
//             sx={{
//               width: "100%",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               p: 3,
//             }}
//           >

//             <h1>{giftbox.giftboxName}</h1>
//             <p>Price: Rs. {giftbox.giftboxPrice}</p>
//             <p>Description: {giftbox.giftboxDescription}</p>
//             <p>Accessories: {giftbox.accessories?.join(", ") || "None"}</p>
//             <p>Created on:{" "}
//             {new Date(giftbox.createdAt).toLocaleDateString()}</p>
//           </Box>
//         </Box>
//       </div>
//     </>
//   );
// }

// export default MyGiftbox;

// import React, { useState, useEffect } from "react";
// import { Box } from "@mui/system";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// import CustomerSidenav from "../customerComponent/CustomerSidenav";
// import NavbarCustomerAfterSignedIn from "../customerComponent/NavbarCustomerAfterSignedIn";

// function MyGiftbox() {
//   const [customerId, setCustomerId] = useState(null);
//   const { giftboxId } = useParams(); // Get the giftboxId from the URL
//   const navigate = useNavigate(); // Corrected: Just use navigate instead of destructuring
//   const [giftbox, setGiftbox] = useState(null);
//   const [loading, setLoading] = useState(true); // Track loading state

//   console.log("Giftbox ID from URL params:", giftboxId); // Check giftboxId
//   console.log("Giftbox state:"); // Check giftbox state

//   // Authentication check
//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/auth/authenticated", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (res.data.authenticated && res.data.user.role === "customer") {
//           setCustomerId(res.data.user.id);
//         } else {
//           navigate("/login"); // Redirect to login if not authenticated
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         navigate("/login"); // Handle authentication errors by redirecting to login
//       });
//   }, [navigate]);

//   // Fetch giftbox details
//   useEffect(() => {
//     const fetchGiftbox = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3001/api/giftbox/getGiftboxById/${giftboxId}`
//         );
//         console.log(response);
//         if (!response.ok) {
//           throw new Error("Failed to fetch giftbox details");
//         }
//         const giftboxDetails = await response.json();
//         setGiftbox(giftboxDetails[0]);
//         console.log("Giftbox details:", giftboxDetails[0]);
//         setLoading(false); // Set loading to false once data is fetched
//       } catch (error) {
//         console.error("Error fetching giftbox details:", error);
//         setLoading(false); // Stop loading even on error
//       }
//     };
//     fetchGiftbox();
//     window.scrollTo(0, 0); // Scrolls to the top whenever giftboxId changes
//   }, [giftboxId]);

//   if (loading) {
//     return <div>Loading...</div>; // Show a loading state while data is being fetched
//   }

//   if (!giftbox) {
//     return <div>Giftbox not found</div>; // Handle the case where the giftbox data is not available
//   }

//   return (
//     <>
//       <div className="bgcolor">
//         <NavbarCustomerAfterSignedIn />
//         <Box height={60} />
//         <Box sx={{ display: "flex" }}>
//           <CustomerSidenav />
//           <Box height={60} />
//           <Box
//             sx={{
//               width: "100%",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "left",
//               p: 3,
//             }}
//           >
//             <h3>{giftbox.giftboxName}</h3>
//             <p>Price: Rs. {giftbox.giftboxPrice}</p>
//             <p>Description: {giftbox.giftboxDescription}</p>
//             <p>Created on:{" "}
//             {new Date(giftbox.createdAt).toLocaleDateString()}</p>
//           </Box>
//         </Box>
//       </div>
//     </>
//   );
// }

// export default MyGiftbox;

// import React, { useState, useEffect } from "react";
// import { Box, TextField, Button } from "@mui/material";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import Card from "@mui/material/Card";
// import Swal from "sweetalert2";

// import CustomerSidenav from "../customerComponent/CustomerSidenav";
// import NavbarCustomerAfterSignedIn from "../customerComponent/NavbarCustomerAfterSignedIn";
// import GiftboxAccessoryCard from "./GiftboxAccessoryCard";

// function MyGiftbox() {
//   const [customerId, setCustomerId] = useState(null);
//   const { giftboxId } = useParams(); // Get the giftboxId from the URL
//   const navigate = useNavigate(); // Corrected: Just use navigate instead of destructuring
//   const [giftboxDetails, setGiftboxDetails] = useState(null);
//   const [loading, setLoading] = useState(true); // Track loading state

//   // Fields for editing
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");

//   // Authentication check
//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/auth/authenticated", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (res.data.authenticated && res.data.user.role === "customer") {
//           setCustomerId(res.data.user.id);
//         } else {
//           navigate("/login"); // Redirect to login if not authenticated
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         navigate("/login"); // Handle authentication errors by redirecting to login
//       });
//   }, [navigate]);

//   // Fetch giftbox details
//   useEffect(() => {
//     const fetchGiftbox = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3001/api/giftbox/getGiftboxById/${giftboxId}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch giftbox details");
//         }
//         const giftboxDetails = await response.json();
//         const giftboxData = giftboxDetails[0];
//         setGiftboxDetails(giftboxData);

//         // Set values for editing
//         setName(giftboxData.giftboxName);
//         setPrice(giftboxData.giftboxPrice);
//         setDescription(giftboxData.giftboxDescription);

//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching giftbox details:", error);
//         setLoading(false);
//       }
//     };
//     fetchGiftbox();
//     window.scrollTo(0, 0);
//   }, [giftboxId]);

//   // Save updated details
//   const handleSave = async () => {
//     try {
//       await axios.put(
//         `http://localhost:3001/api/giftbox/updateGiftbox/${giftboxId}`,
//         {
//           giftboxName: name,
//           giftboxPrice: price,
//           giftboxDescription: description,
//         }
//       );

//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "Giftbox details updated successfully!",
//         confirmButtonText: "OK",
//       });
//     } catch (error) {
//       console.error("Error updating giftbox details:", error);

//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to update giftbox details. Please try again.",
//         confirmButtonText: "Close",
//       });
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!giftboxDetails) {
//     return <div>Giftbox not found</div>;
//   }

//   return (
//     <>
//       <div className="bgcolor">
//         <NavbarCustomerAfterSignedIn />
//         <Box height={60} />
//         <Box sx={{ display: "flex" }}>
//           <CustomerSidenav />
//           <Box height={60} />
//           <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//             <Card>
//               <Box
//                 sx={{
//                   alignItems: "left",
//                   p: 3,
//                 }}
//               >
//                 <h2>{giftboxDetails.giftboxName}</h2>
//                 <h3>Edit Giftbox Details</h3>

//                 <TextField
//                   label="Giftbox Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   fullWidth
//                   margin="normal"
//                   sx={{ width: "40%", m: 2 }}
//                 />

//                 <TextField
//                   label="Price"
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                   fullWidth
//                   margin="normal"
//                   sx={{ width: "40%", m: 2 }}
//                 />
//                 <TextField
//                   label="Description"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   multiline
//                   rows={3}
//                   fullWidth
//                   margin="normal"
//                   sx={{ width: "40%", m: 2 }}
//                 />
//                 <TextField
//                   label="Created on"
//                   value={new Date(giftboxDetails.createdAt).toLocaleDateString()}
//                   fullWidth
//                   margin="normal"
//                   InputProps={{
//                     readOnly: true,
//                   }}
//                   sx={{ width: "40%", m: 2 }}
//                 />
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleSave}
//                   sx={{width: "15%", m: 2}}
//                 >
//                   Save
//                 </Button>

//                 {/* {giftboxDetails.map((giftbox) => (
//                 <GiftboxAccessoryCard key={giftbox.giftboxId} customerId={customerId} giftboxId={giftboxId} />
//               ))} */}

// {giftboxDetails && (
//   <GiftboxAccessoryCard
//     key={giftboxDetails.giftboxId}
//     customerId={customerId}
//     giftboxId={giftboxId}
//   />
// )}

//               </Box>
//             </Card>
//           </Box>
//         </Box>
//       </div>
//     </>
//   );
// }

// export default MyGiftbox;

// import React, { useState, useEffect } from "react";
// import { Box, TextField, Button, Card } from "@mui/material";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import Swal from "sweetalert2";

// import CustomerSidenav from "../customerComponent/CustomerSidenav";
// import NavbarCustomerAfterSignedIn from "../customerComponent/NavbarCustomerAfterSignedIn";
// import GiftboxAccessoryCard from "./GiftboxAccessoryCard";

// function MyGiftbox() {
//   const [customerId, setCustomerId] = useState(null);
//   const { giftboxId } = useParams();
//   const navigate = useNavigate();
//   const [giftboxDetails, setGiftboxDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fields for editing
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [noteContent, setNoteContent] = useState("");

//   // List of accessories in the giftbox
//   const [giftboxAccessories, setGiftboxAccessories] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:3001/api/auth/authenticated", { withCredentials: true })
//       .then((res) => {
//         if (res.data.authenticated && res.data.user.role === "customer") {
//           setCustomerId(res.data.user.id);
//         } else {
//           navigate("/login");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         navigate("/login");
//       });
//   }, [navigate]);

//   // Fetch giftbox details and accessories
//   useEffect(() => {
//     const fetchGiftbox = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/api/giftbox/getGiftboxById/${giftboxId}`);
//         if (!response.ok) throw new Error("Failed to fetch giftbox details");

//         const giftboxDetails = await response.json();
//         const giftboxData = giftboxDetails[0];
//         setGiftboxDetails(giftboxData);

//         setName(giftboxData.giftboxName);
//         // setPrice(giftboxData.giftboxPrice);
//         setDescription(giftboxData.giftboxDescription);
//         setNoteContent(giftboxData.noteContent);

//         const accessoriesResponse = await fetch(`http://localhost:3001/api/giftbox/getGiftboxAccessories/${giftboxId}`);
//         if (!accessoriesResponse.ok) throw new Error("Failed to fetch accessory details");

//         const accessoriesData = await accessoriesResponse.json();
//         console.log("Accessories:", accessoriesData);
//         setGiftboxAccessories(accessoriesData); // Set the list of accessories

//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching giftbox details:", error);
//         setLoading(false);
//       }
//     };
//     fetchGiftbox();
//     window.scrollTo(0, 0);
//   }, [giftboxId]);

//   useEffect(() => {
//     const fetchTotalPrice = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/api/giftbox/getGiftboxTotalValue/${giftboxId}`);
//         if (!response.ok) throw new Error("Failed to fetch giftbox total price");

//         const giftboxPrice = await response.json();
//         setPrice(giftboxPrice.totalGiftboxValue);
//         console.log("Giftbox total price:", giftboxPrice);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching giftbox total price:", error);
//         setLoading(false);
//       }
//     };
//     fetchTotalPrice();
//   }, [giftboxId]);

//   const handleSave = async () => {
//     try {
//       await axios.put(`http://localhost:3001/api/giftbox/updateGiftbox/${giftboxId}`, {
//         giftboxName: name,
//         giftboxPrice: price,
//         giftboxDescription: description,
//         noteContent: noteContent,
//       });

//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "Giftbox details updated successfully!",
//         confirmButtonText: "OK",
//       });
//     } catch (error) {
//       console.error("Error updating giftbox details:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to update giftbox details. Please try again.",
//         confirmButtonText: "Close",
//       });
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (!giftboxDetails) return <div>Giftbox not found</div>;

//   return (
//     <>
//       <div className="bgcolor">
//         <NavbarCustomerAfterSignedIn />
//         <Box height={60} />
//         <Box sx={{ display: "flex" }}>
//           <CustomerSidenav />
//           <Box height={60} />
//           <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//             <Card>
//               <Box sx={{ alignItems: "left", p: 3 }}>
//                 <h2>{giftboxDetails.giftboxName}</h2>
//                 <h3>Edit Giftbox Details</h3>
//                 <TextField
//                   label="Giftbox Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   fullWidth
//                   margin="normal"
//                   sx={{ width: "40%", m: 2 }}
//                 />
//                 <TextField
//                   label="Price"
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                   fullWidth
//                   margin="normal"
//                   InputProps={{ readOnly: true }}
//                   sx={{ width: "40%", m: 2}}
//                 />
//                 <TextField
//                   label="Description"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   multiline
//                   rows={3}
//                   fullWidth
//                   margin="normal"
//                   sx={{ width: "40%", m: 2 }}
//                 />
//                 <TextField
//                   label="Note Content"
//                   value={noteContent}
//                   onChange={(e) => setNoteContent(e.target.value)}
//                   multiline
//                   rows={3}
//                   fullWidth
//                   margin="normal"
//                   sx={{ width: "40%", m: 2 }}
//                 />
//                 <TextField
//                   label="Created on"
//                   value={new Date(giftboxDetails.createdAt).toLocaleDateString()}
//                   fullWidth
//                   margin="normal"
//                   InputProps={{ readOnly: true }}
//                   sx={{ width: "40%", m: 2 }}
//                 />
//                 <Button variant="contained" color="primary" onClick={handleSave} sx={{ width: "15%", m: 2 }}>
//                   Save
//                 </Button>
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
//                 {/* Render each accessory in its own GiftboxAccessoryCard */}
//                 {giftboxAccessories.map((accessory) => (
//                   <GiftboxAccessoryCard
//                     key={accessory.accessoryId}
//                     accessory={accessory}
//                     customerId={customerId}
//                   />
//                 ))}
//               </Box>
//               </Box>
//             </Card>
//           </Box>
//         </Box>
//       </div>
//     </>
//   );
// }

// export default MyGiftbox;

// import React, { useState, useEffect } from "react";
// import { Box, TextField, Button, Card } from "@mui/material";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import Swal from "sweetalert2";
// import CustomerSidenav from "../customerComponent/CustomerSidenav";
// import NavbarCustomerAfterSignedIn from "../customerComponent/NavbarCustomerAfterSignedIn";
// import GiftboxAccessoryCard from "./GiftboxAccessoryCard";

// function MyGiftbox() {
//   const [giftboxDetails, setGiftboxDetails] = useState(null);
//   const [giftboxAccessories, setGiftboxAccessories] = useState([]);
//   const [quantities, setQuantities] = useState({});
//   const [totalPrice, setTotalPrice] = useState(0);
//   const { giftboxId } = useParams();

//   useEffect(() => {
//     // Fetch the giftbox details and accessories, and initialize quantities
//     const fetchGiftboxDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/api/giftbox/getGiftboxById/${giftboxId}`);
//         const data = await response.json();
//         setGiftboxDetails(data[0]);
//         const accessories = await fetch(`http://localhost:3001/api/giftbox/getGiftboxAccessories/${giftboxId}`);
//         const accessoriesData = await accessories.json();
//         setGiftboxAccessories(accessoriesData);
//         setQuantities(accessoriesData.reduce((acc, accessory) => {
//           acc[accessory.accessoryId] = accessory.quantity || 1;
//           return acc;
//         }, {}));
//         calculateTotalPrice(accessoriesData);
//       } catch (error) {
//         console.error("Error fetching giftbox details:", error);
//       }
//     };
//     fetchGiftboxDetails();
//   }, [giftboxId]);

//   // Calculate total price based on quantities
//   const calculateTotalPrice = (accessories) => {
//     const price = accessories.reduce((acc, accessory) => {
//       const quantity = quantities[accessory.accessoryId] || 1;
//       return acc + accessory.accessoryPrice * quantity;
//     }, 0);
//     setTotalPrice(price);
//   };

//   // Handle quantity change for an accessory
//   const handleQuantityChange = (accessoryId, newQuantity) => {
//     setQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [accessoryId]: newQuantity,
//     }));
//     const updatedAccessories = giftboxAccessories.map((acc) =>
//       acc.accessoryId === accessoryId ? { ...acc, quantity: newQuantity } : acc
//     );
//     calculateTotalPrice(updatedAccessories);
//   };

//   return (
//     <div className="bgcolor">
//       <NavbarCustomerAfterSignedIn />
//       <Box sx={{ display: "flex" }}>
//         <CustomerSidenav />
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <Card>
//             <Box sx={{ p: 3 }}>
//               <h2>{giftboxDetails?.giftboxName}</h2>
//               <h3>Total Price: Rs.{totalPrice}</h3>
//               {giftboxAccessories.map((accessory) => (
//                 <GiftboxAccessoryCard
//                   key={accessory.accessoryId}
//                   accessory={accessory}
//                   quantity={quantities[accessory.accessoryId]}
//                   onQuantityChange={handleQuantityChange}
//                 />
//               ))}
//             </Box>
//           </Card>
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default MyGiftbox;

// import React, { useState, useEffect } from "react";
// import { Box, Card } from "@mui/material";
// import { useParams } from "react-router-dom";
// import CustomerSidenav from "../customerComponent/CustomerSidenav";
// import NavbarCustomerAfterSignedIn from "../customerComponent/NavbarCustomerAfterSignedIn";
// import GiftboxAccessoryCard from "./GiftboxAccessoryCard";

// function MyGiftbox() {
//   const [giftboxDetails, setGiftboxDetails] = useState(null);
//   const [giftboxAccessories, setGiftboxAccessories] = useState([]);
//   const [quantities, setQuantities] = useState({});
//   const [totalPrice, setTotalPrice] = useState(0);
//   const { giftboxId } = useParams();

//   useEffect(() => {
//     fetchGiftboxData();
//   }, [giftboxId]);

//   // Fetch giftbox details and accessories
//   const fetchGiftboxData = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/giftbox/getGiftboxById/${giftboxId}`);
//       const data = await response.json();
//       setGiftboxDetails(data[0]);

//       const accessoriesResponse = await fetch(`http://localhost:3001/api/giftbox/getGiftboxAccessories/${giftboxId}`);
//       const accessoriesData = await accessoriesResponse.json();
//       setGiftboxAccessories(accessoriesData);

//       setQuantities(accessoriesData.reduce((acc, accessory) => {
//         acc[accessory.accessoryId] = accessory.quantity || 1;
//         return acc;
//       }, {}));

//       calculateTotalPrice(accessoriesData);
//     } catch (error) {
//       console.error("Error fetching giftbox data:", error);
//     }
//   };

//   // Calculate total price based on quantities
//   const calculateTotalPrice = (accessories) => {
//     const price = accessories.reduce((acc, accessory) => {
//       const quantity = quantities[accessory.accessoryId] || 1;
//       return acc + accessory.accessoryPrice * quantity;
//     }, 0);
//     setTotalPrice(price);
//   };

//   // Handle quantity change
//   const handleQuantityChange = (accessoryId, newQuantity) => {
//     setQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [accessoryId]: newQuantity,
//     }));
//     const updatedAccessories = giftboxAccessories.map((acc) =>
//       acc.accessoryId === accessoryId ? { ...acc, quantity: newQuantity } : acc
//     );
//     calculateTotalPrice(updatedAccessories);
//   };

//   // Remove accessory from giftbox
//   const handleRemoveAccessory = (accessoryId) => {
//     setGiftboxAccessories((prevAccessories) =>
//       prevAccessories.filter((accessory) => accessory.accessoryId !== accessoryId)
//     );
//     calculateTotalPrice(giftboxAccessories.filter((accessory) => accessory.accessoryId !== accessoryId));
//   };

//   return (
//     <div className="bgcolor">
//       <NavbarCustomerAfterSignedIn />
//       <Box sx={{ display: "flex" }}>
//         <CustomerSidenav />
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <Card>
//             <Box sx={{ p: 3 }}>
//               <h2>{giftboxDetails?.giftboxName}</h2>
//               <h3>Total Price: Rs.{totalPrice}</h3>
//               <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
//               {giftboxAccessories.map((accessory) => (
//                 <GiftboxAccessoryCard
//                   key={accessory.accessoryId}
//                   giftboxId={giftboxId}
//                   accessory={accessory}
//                   quantity={quantities[accessory.accessoryId]}
//                   onQuantityChange={handleQuantityChange}
//                   onRemoveAccessory={handleRemoveAccessory}
//                 />
//               ))}
//             </Box>
//             </Box>
//           </Card>
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default MyGiftbox;

// import React, { useState, useEffect } from "react";
// import { Box, Card } from "@mui/material";
// import { useParams } from "react-router-dom";
// import CustomerSidenav from "../customerComponent/CustomerSidenav";
// import NavbarCustomerAfterSignedIn from "../customerComponent/NavbarCustomerAfterSignedIn";
// import GiftboxAccessoryCard from "./GiftboxAccessoryCard";

// function MyGiftbox() {
//   const [giftboxDetails, setGiftboxDetails] = useState(null);
//   const [giftboxAccessories, setGiftboxAccessories] = useState([]);
//   const [quantities, setQuantities] = useState({});
//   const [totalPrice, setTotalPrice] = useState(0);
//   const { giftboxId } = useParams();

//   useEffect(() => {
//     fetchGiftboxData();
//   }, [giftboxId]);

//   // Fetch giftbox details and accessories
//   const fetchGiftboxData = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/giftbox/getGiftboxById/${giftboxId}`);
//       const data = await response.json();
//       setGiftboxDetails(data[0]);

//       const accessoriesResponse = await fetch(`http://localhost:3001/api/giftbox/getGiftboxAccessories/${giftboxId}`);
//       const accessoriesData = await accessoriesResponse.json();
//       setGiftboxAccessories(accessoriesData);

//       setQuantities(accessoriesData.reduce((acc, accessory) => {
//         acc[accessory.accessoryId] = accessory.quantity || 1;
//         return acc;
//       }, {}));
//     } catch (error) {
//       console.error("Error fetching giftbox data:", error);
//     }
//   };

//   // Calculate total price based on quantities and accessory prices
//   useEffect(() => {
//     const price = giftboxAccessories.reduce((acc, accessory) => {
//       const quantity = quantities[accessory.accessoryId] || 1;
//       return acc + accessory.accessoryPrice * quantity;
//     }, 0);
//     setTotalPrice(price);
//   }, [giftboxAccessories, quantities]);

//   // Handle quantity change
//   const handleQuantityChange = (accessoryId, newQuantity) => {
//     setQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [accessoryId]: newQuantity,
//     }));
//   };

//   // Remove accessory from giftbox
//   const handleRemoveAccessory = (accessoryId) => {
//     setGiftboxAccessories((prevAccessories) =>
//       prevAccessories.filter((accessory) => accessory.accessoryId !== accessoryId)
//     );
//   };

//   return (
//     <div className="bgcolor">
//       <NavbarCustomerAfterSignedIn />
//       <Box sx={{ display: "flex" }}>
//         <CustomerSidenav />
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <Card>
//             <Box sx={{ p: 3 }}>
//               <h2>{giftboxDetails?.giftboxName}</h2>
//               <h3>Total Price: Rs.{totalPrice}</h3>

//               <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
//               {giftboxAccessories.map((accessory) => (
//                 <GiftboxAccessoryCard
//                   key={accessory.accessoryId}
//                   giftboxId={giftboxId}
//                   accessory={accessory}
//                   quantity={quantities[accessory.accessoryId]}
//                   onQuantityChange={handleQuantityChange}
//                   onRemoveAccessory={handleRemoveAccessory}
//                 />
//               ))}
//             </Box>
//             </Box>
//           </Card>
//         </Box>
//       </Box>
//     </div>
//   );
// }

// // export default MyGiftbox;

// import React, { useState, useEffect } from "react";
// import { Box, TextField, Button, Card } from "@mui/material";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { Autocomplete, Grid } from "@mui/material";

// import CustomerSidenav from "../customerComponent/CustomerSidenav";
// import NavbarCustomerAfterSignedIn from "../customerComponent/NavbarCustomerAfterSignedIn";
// import GiftboxAccessoryCard from "./GiftboxAccessoryCard";

// function MyGiftbox() {
//   const [giftboxDetails, setGiftboxDetails] = useState(null);
//   const [giftboxAccessories, setGiftboxAccessories] = useState([]);
//   const [quantities, setQuantities] = useState({});
//   const [totalPrice, setTotalPrice] = useState(0);
//   const { giftboxId } = useParams();

//   // State variables for editing
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [noteContent, setNoteContent] = useState("");
//   const [boxColor, setBoxColor] = useState(null);
//   const [selectedBoxColor, setSelectedBoxColor] = useState(null);

//   useEffect(() => {
//     fetchGiftboxData();
//   }, [giftboxId]);

//   // Fetch giftbox details and accessories
//   const fetchGiftboxData = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/giftbox/getGiftboxById/${giftboxId}`);
//       const data = await response.json();
//       console.log("Giftbox data:", data);
//       setGiftboxDetails(data[0]);
//     console.log("Giftbox details:", data[0]);
//       // Set editing fields
//       setName(data[0].giftboxName);
//       setDescription(data[0].giftboxDescription);
//       setNoteContent(data[0].noteContent);

//       const accessoriesResponse = await fetch(`http://localhost:3001/api/giftbox/getGiftboxAccessories/${giftboxId}`);
//       const accessoriesData = await accessoriesResponse.json();
//       setGiftboxAccessories(accessoriesData);

//       setQuantities(accessoriesData.reduce((acc, accessory) => {
//         acc[accessory.accessoryId] = accessory.quantity || 1;
//         return acc;
//       }, {}));
//     } catch (error) {
//       console.error("Error fetching giftbox data:", error);
//     }
//   };

//   // Calculate total price based on quantities and accessory prices
//   useEffect(() => {
//     const price = giftboxAccessories.reduce((acc, accessory) => {
//       const quantity = quantities[accessory.accessoryId] || 1;
//       return acc + accessory.accessoryPrice * quantity;
//     }, 0);
//     setTotalPrice(price);
//   }, [giftboxAccessories, quantities]);

//   // Handle quantity change
//   const handleQuantityChange = (accessoryId, newQuantity) => {
//     setQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [accessoryId]: newQuantity,
//     }));
//   };

//   // Remove accessory from giftbox
//   const handleRemoveAccessory = (accessoryId) => {
//     setGiftboxAccessories((prevAccessories) =>
//       prevAccessories.filter((accessory) => accessory.accessoryId !== accessoryId)
//     );
//   };

//   const handleSave = async () => {
//     try {
//       const response = await axios.put(`http://localhost:3001/api/giftbox/updateGiftbox/${giftboxId}`, {
//         giftboxName: name,
//         giftboxDescription: description,
//         noteContent: noteContent,
//       });

//       if (response.status === 200) {
//         Swal.fire({
//           icon: "success",
//           title: "Success",
//           text: "Giftbox details updated successfully!",
//           confirmButtonText: "OK",
//         });
//       } else {
//         throw new Error("Unexpected response from the server.");
//       }
//     } catch (error) {
//       console.error("Error updating giftbox details:", error);

//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error.response?.data?.message || "Failed to update giftbox details. Please try again.",
//         confirmButtonText: "Close",
//       });
//     }
//   };

//   const getBoxColor = async (giftboxId) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/giftbox/getBoxColorByGiftboxId/${giftboxId}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch giftbox color");
//       }
//       const data = await response.json();
//       setBoxColor(data.color); // Store giftbox color in state
// console.log("Giftbox color:", data.color);
//     } catch (error) {
//       console.error("Error fetching giftbox color:", error);
//     }
//   }
//   useEffect(() => {
//     getBoxColor(giftboxId);
//   }
//   , [giftboxId]);

//   return (
//     <div className="bgcolor">
//       <NavbarCustomerAfterSignedIn />
//       <Box sx={{ display: "flex" }}>
//         <CustomerSidenav />
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <Card>
//             <Box sx={{ p: 3 }}>
//               <h2>{giftboxDetails?.giftboxName}</h2>
//               <TextField
//                 label="Giftbox Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 fullWidth
//                 margin="normal"
//                 sx={{ width: "40%", m: 2 }}
//               />
//               {/* <TextField
//                 label="Box Color"
//                 value={boxColor}
//                 fullWidth
//                 margin="normal"
//                 InputProps={{ readOnly: true }}
//                 sx={{ width: "40%", m: 2 }}
//               /> */}
//               <Grid item xs={6}>
//                 <Autocomplete
//                   value={selectedBoxColor}
//                   onChange={(event, newValue) => setSelectedBoxColor(newValue)}
//                   options={boxColor}
//                   getOptionLabel={(option) => option.color}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="Box Color"
//                       variant="outlined"
//                       size="small"
//                     />
//                   )}
//                 />
//               </Grid>
//               <TextField
//                 label="Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 multiline
//                 rows={3}
//                 fullWidth
//                 margin="normal"
//                 sx={{ width: "40%", m: 2 }}
//               />
//               <TextField
//                 label="Note Content"
//                 value={noteContent}
//                 onChange={(e) => setNoteContent(e.target.value)}
//                 multiline
//                 rows={3}
//                 fullWidth
//                 margin="normal"
//                 sx={{ width: "40%", m: 2 }}
//               />
//               <Button variant="contained" color="primary" onClick={handleSave} sx={{ width: "15%", m: 2 }}>
//                 Save
//               </Button>

//               <h3>Total Price: Rs.{totalPrice}</h3>

//               <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
//                 {giftboxAccessories.map((accessory) => (
//                   <GiftboxAccessoryCard
//                     key={accessory.accessoryId}
//                     giftboxId={giftboxId}
//                     accessory={accessory}
//                     quantity={quantities[accessory.accessoryId]}
//                     onQuantityChange={handleQuantityChange}
//                     onRemoveAccessory={handleRemoveAccessory}
//                   />
//                 ))}
//               </Box>
//             </Box>
//           </Card>
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default MyGiftbox;

import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Card } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Autocomplete, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import CustomerSidenav from "../customerComponent/CustomerSidenav";
import NavbarCustomerAfterSignedIn from "../customerComponent/NavbarCustomerAfterSignedIn";
import GiftboxAccessoryCard from "./GiftboxAccessoryCard";

function MyGiftbox() {
  const [giftboxDetails, setGiftboxDetails] = useState(null);
  const [giftboxAccessories, setGiftboxAccessories] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const { giftboxId } = useParams();

  // State variables for editing
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [boxColors, setBoxColors] = useState([]); // Store all box colors
  const [boxColor, setBoxColor] = useState(null);
  const [boxColorId, setBoxColorId] = useState(null);
  const [selectedBoxColor, setSelectedBoxColor] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGiftboxData();
    fetchBoxColors(); // Fetch all available colors
  }, [giftboxId]);

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

  // Fetch giftbox details and accessories
  const fetchGiftboxData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/giftbox/getGiftboxById/${giftboxId}`
      );
      const data = await response.json();
      setGiftboxDetails(data[0]);
      console.log("Giftbox details:", data[0]);

      setName(data[0].giftboxName);
      setDescription(data[0].giftboxDescription);
      setNoteContent(data[0].noteContent);
      setBoxColorId(data[0].boxColorId);

      const accessoriesResponse = await fetch(
        `http://localhost:3001/api/giftbox/getGiftboxAccessories/${giftboxId}`
      );
      const accessoriesData = await accessoriesResponse.json();
      setGiftboxAccessories(accessoriesData);
      console.log("Accessories:", accessoriesData);

      setQuantities(
        accessoriesData.reduce((acc, accessory) => {
          acc[accessory.accessoryId] = accessory.quantity || 1;
          return acc;
        }, {})
      );
    } catch (error) {
      console.error("Error fetching giftbox data:", error);
    }
  };

  // Fetch all box colors for Autocomplete
  const fetchBoxColors = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/giftbox/getBoxColors`
      ); // Adjust this route based on your backend
      const data = await response.json();
      setBoxColors(data); // Set array of colors in the state
    } catch (error) {
      console.error("Error fetching box colors:", error);
    }
  };

  // const putBoxcolorId = async (giftboxId) => {
  //   try {
  //     //write a post request to update the box color id
  //     const response = await axios.put( `http://localhost:3001/api/giftbox/putBoxcolorId/${giftboxId}`)
  //     if (response.status === 200) {
  //       console.log("Box color ID updated successfully!");
  //     } else {
  //       throw new Error("Unexpected response from the server.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating box color ID:", error);
  //   }
  // };
  // useEffect(() => {
  //   putBoxcolorId(giftboxId);
  // }, [giftboxId]);

  const putBoxcolorId = async (giftboxId, boxColorId) => {
    try {
      // Send a PUT request to update the box color ID
      const response = await axios.put(
        `http://localhost:3001/api/giftbox/putBoxcolorId/${giftboxId}`,
        { boxcolorId: boxColorId } // Include boxColorId in the request body
      );
  
      if (response.status === 200) {
        console.log("Box color ID updated successfully!");
      } else {
        throw new Error("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Error updating box color ID:", error);
    }
  };
  
  useEffect(() => {
    if (giftboxId && selectedBoxColor?.boxColorId) {
      putBoxcolorId(giftboxId, selectedBoxColor.boxColorId);
    }
  }, [giftboxId, selectedBoxColor]);

  
  // Calculate total price based on quantities and accessory prices
  useEffect(() => {
    const price = giftboxAccessories.reduce((acc, accessory) => {
      const quantity = quantities[accessory.accessoryId] || 1;
      return acc + accessory.accessoryPrice * quantity;
    }, 0);
    setTotalPrice(price);
  }, [giftboxAccessories, quantities]);

  // Handle quantity change
  const handleQuantityChange = (accessoryId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [accessoryId]: newQuantity,
    }));
  };

  // Remove accessory from giftbox
  const handleRemoveAccessory = (accessoryId) => {
    setGiftboxAccessories((prevAccessories) =>
      prevAccessories.filter(
        (accessory) => accessory.accessoryId !== accessoryId
      )
    );
  };

  const handleSave = async () => {
    if (giftboxId && selectedBoxColor?.boxColorId) {
      await putBoxcolorId(giftboxId, selectedBoxColor.boxColorId);
    }
    try {
      const response = await axios.put(
        `http://localhost:3001/api/giftbox/updateGiftbox/${giftboxId}`,
        {
          giftboxName: name,
          giftboxDescription: description,
          noteContent: noteContent,
          // boxColorId: selectedBoxColor?.boxColorId, // Add selected color ID here
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Giftbox details updated successfully!",
          confirmButtonText: "OK",
        });
      } else {
        throw new Error("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Error updating giftbox details:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Failed to update giftbox details. Please try again.",
        confirmButtonText: "Close",
      });
    }
  };

  // const handleCheckout = async () => {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:3001/api/giftbox/updateGiftboxAccessories`,
  //       {
  //         giftboxId: giftboxId, // ID of the giftbox to be updated
  //         giftboxAccessories: giftboxAccessories.map((accessory) => ({
  //         accessoryId: accessory.accessoryId,
  //         quantity: quantities[accessory.accessoryId] || 1, // Get the quantity for each accessory
  //         })),
  //       }
  //     );

  //     if (response.status === 200) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Success",
  //         text: "Giftbox checked out successfully!",
  //         confirmButtonText: "OK",
  //       });
  //     } else {
  //       throw new Error("Unexpected response from the server.");
  //     }
  //   } catch (error) {
  //     console.error("Error checking out giftbox:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Failed to checkout giftbox. Please try again.",
  //       confirmButtonText: "Close",
  //     });
  //   }
  // };

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/giftbox/updateGiftboxAccessories`,
        {
          giftboxId: giftboxId,
          giftboxAccessories: giftboxAccessories.map((accessory) => ({
            accessoryId: accessory.accessoryId,
            quantity: quantities[accessory.accessoryId] || 1,
          })),
        }
      );
  
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Giftbox updated successfully! You can now proceed to checkout.",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/customer/cart/${giftboxId}`, { state: { giftboxId: giftboxDetails.giftboxId } });
          }
        });
      } else {
        throw new Error("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Error checking out giftbox:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to checkout giftbox. Please try again.",
        confirmButtonText: "Close",
      });
    }
  };
  

  return (
    <div className="bgcolor">
      <NavbarCustomerAfterSignedIn />
      <Box sx={{ display: "flex" }}>
        <CustomerSidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Card>
            <Box sx={{ p: 3 }}>
              <h2>{giftboxDetails?.giftboxName}</h2>
              <TextField
                label="Giftbox Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
                sx={{ width: "40%", m: 2 }}
              />
              <Grid item xs={6}>
                <Autocomplete
                  value={selectedBoxColor}
                  onChange={(event, newValue) => setSelectedBoxColor(newValue)}
                  options={boxColors}
                  getOptionLabel={(option) => option.color}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Box Color"
                      variant="outlined"
                      size="small"
                    />
                  )}
                />
              </Grid>
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={3}
                fullWidth
                margin="normal"
                sx={{ width: "40%", m: 2 }}
              />
              <TextField
                label="Note Content"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                multiline
                rows={3}
                fullWidth
                margin="normal"
                sx={{ width: "40%", m: 2 }}
              />
              <Button
                variant="outlined"
                color="info"
                onClick={handleSave}
                sx={{ width: "15%", m: 2 }}
              >
                Save
              </Button>

              <h3>Sub Total Price: Rs.{totalPrice}</h3>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {giftboxAccessories.map((accessory) => (
                  <GiftboxAccessoryCard
                    key={accessory.accessoryId}
                    giftboxId={giftboxId}
                    accessory={accessory}
                    quantity={quantities[accessory.accessoryId]}
                    onQuantityChange={handleQuantityChange}
                    onRemoveAccessory={handleRemoveAccessory}
                  />
                ))}
              </Box>
              <Button
                variant="contained"
                color="success"
                sx={{ width: "15%", m: 2 }}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </Box>
          </Card>
        </Box>
      </Box>
    </div>
  );
}

export default MyGiftbox;
