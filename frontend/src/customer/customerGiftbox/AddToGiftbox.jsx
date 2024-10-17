

  //   const [accessoryName, setAccessoryName] = useState("");
  //   const [accessoryPrice, setAccessoryPrice] = useState("");
  //   const [accessoryDescription, setAccessoryDescription] = useState("");
  //   const [accessoryQuantity, setAccessoryQuantity] = useState("");
  //   const [accessoryColor, setAccessoryColor] = useState("");

  //   const [error, setError] = useState("");

  //   const [selectedCategory, setSelectedCategory] = useState(null);
  //   const [categories, setCategories] = useState([]);

  //   const handleNameChange = (event) => {
  //     setAccessoryName(event.target.value);
  //   };

  //   const handlePriceChange = (event) => {
  //     setAccessoryPrice(event.target.value);
  //   };

  //   const handleDescriptionChange = (event) => {
  //     setAccessoryDescription(event.target.value);
  //   };

  //   const handleQuantityChange = (event) => {
  //     setAccessoryQuantity(event.target.value);
  //   };

  //   const handleColorChange = (event) => {
  //     setAccessoryColor(event.target.value);
  //   };

  //   const handleSubmit = () => {
  //     // Make POST request to backend
  //     fetch("http://localhost:3001/api/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         accessoryName,
  //         accessoryPrice,
  //         accessoryDescription,
  //         accessoryQuantity,
  //         accessoryColor,
  //         categoryId: selectedCategory.categoryId,
  //       }),
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("Failed to add accessory");
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         console.log("Accessory created:", data);
  //         Swal.fire("Success!", "Accessory added successfully.", "success");
  //         // Close the modal after success
  //         closeEvent();
  //         window.location.reload();
  //       })
  //       .catch((error) => {
  //         console.error("Error adding accessory:", error);
  //         Swal.fire("Error!", "Failed to add the accessory.", "error");
  //         // Close the modal even if there's an error
  //         closeEvent();
  //       });
  //   };

  //   const fetchCategories = async () => {
  //    try {
  //     const response = await fetch("http://localhost:3001/api/category/getCategory");
  //     if (!response.ok) {
  //      throw new Error("Failed to fetch categories");
  //     }
  //      const data = await response.json();
  //     setCategories(data);
  //    } catch (error) {
  //      console.error("Error fetching categories:", error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchCategories();
  //   }, []);

//   import { CardMedia, Grid, IconButton, Typography } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import CloseIcon from "@mui/icons-material/Close";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import Modal from "@mui/material/Modal";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Stack from "@mui/material/Stack";
// import axios from "axios";
// import Giftbox from "../../images/giftboxes/giftbox2.jpg";
// import AddIcon from "@mui/icons-material/Add";

// function AddToGiftbox({ open, closeEvent }) {
//   const navigate = useNavigate();
//   const [customerId, setCustomerId] = useState(null);
//   const [myGiftboxes, setMyGiftboxes] = useState([]);

//   // Authentication check
//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/auth/authenticated", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (res.data.authenticated && res.data.user.role === "customer") {
//           // setUser(res.data.user); // Set user data if authenticated
//           setCustomerId(res.data.user.id);
//         } else {
//           navigate("/login"); // Redirect to login if not authenticated
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [navigate]);

//   useEffect(() => {
//     const fetchAccessory = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3001/api/giftbox/myGiftboxes/${customerId}`
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch accessory details");
//         }
//         const data = await response.json();
//         setMyGiftboxes(data); // Update the state with fetched data
//       } catch (error) {
//         console.error("Error fetching accessory details:", error);
//       }
//     };

//     fetchAccessory();
//   }, [customerId]);



//   const modalStyle = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 600,
//     bgcolor: "background.paper",
//     borderRadius: 4,
//     boxShadow: 24,
//     p: 4,
//   };

//   const backdropStyle = {
//     backdropFilter: "blur(3px)", // Light black background with a blur effect
//     backgroundColor: "rgba(0, 0, 0, 0.6)",
//   };



//   const handleGoToCustomClick = () => {
//     navigate("/customer/ourProducts"); //Navigate to the custom giftboxes
//   };

//   const handleGiftboxViewClick = () => {
//     navigate("/customer/giftboxes"); //Navigate to the giftbox view in the Customer Tabs
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={closeEvent}
//       aria-labelledby="add-accessory-modal-title"
//       aria-describedby="add-accessory-modal-description"
//       style={backdropStyle}
//     >
//       <Box sx={modalStyle}>
//         <IconButton
//           style={{ position: "absolute", top: 10, right: 10 }}
//           onClick={closeEvent}
//         >
//           <CloseIcon />
//         </IconButton>
//         <Typography variant="h5" align="center" id="add-accessory-modal-title">
//           My Gift Boxes
//         </Typography>

//         <Box height={20}></Box>
//         <Grid container spacing={2}>
//           <Card
//             sx={{
//               minWidth: 400,
//               minHeight: 120,
//               width: 700,
//               height: 130,
//             }}
//             //   onClick={navigate to the giftbox view}
//           >
//             <CardContent>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <CardMedia
//                   component="img"
//                   image={Giftbox}
//                   alt="Gift Box"
//                   sx={{ height: 100, width: 100, objectFit: "cover" }}
//                 />
//                 <Box sx={{ flexGrow: 1, ml: 2, mr: 2 }}>
//                   <Typography variant="body1" align="left">
//                     {myGiftboxes[0]?.giftboxName}
//                   </Typography>
//                 </Box>
//                 <Button
//                   variant="outlined"
//                   color="primary"
//                   startIcon={<AddIcon />}
//                 >
//                   Add
//                 </Button>
//               </Box>
//             </CardContent>
//           </Card>

//           {/* <Autocomplete
//             value={selectedCategory}
//             onChange={(event, newValue) => {
//               setSelectedCategory(newValue);
//             }}
//             id="category-select"
//             options={categories}
//             getOptionLabel={(option) => option.categoryName}
//             renderInput={(params) => (
//               <TextField {...params} label="Category" variant="outlined" size="small" />
//             )}
//           /> */}
//           {/* <Grid item xs={6}>
//           <TextField
//             id="outlined-basic"
//             label="Accessory Name"
//             variant="outlined"
//             size="small"
//             value={accessoryName}
//             onChange={handleNameChange}
//             sx={{ width: "100%" }}
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <TextField
//             id="description"
//             label="Description"
//             variant="outlined"
//             size="small"
//             value={accessoryDescription}
//             onChange={handleDescriptionChange}
//             fullWidth
//             multiline
//             rows={4}
//           />
//         </Grid>

//         <Grid item xs={6}>
//           <TextField
//             id="price"
//             label="Price"
//             variant="outlined"
//             size="small"
//             type="number"
//             value={accessoryPrice}
//             onChange={handlePriceChange}
//             InputProps={{
//               startAdornment: "Rs.",
//             }}
//             fullWidth
//           />
//         </Grid>
        
        

//         <Grid item xs={6}>
//           <TextField
//             id="quantity"
//             label="Quantity"
//             variant="outlined"
//             size="small"
//             type="number"
//             value={accessoryQuantity}
//             onChange={handleQuantityChange}
//             InputProps={{
//               endAdornment: "units",
//             }}
//             fullWidth
//           />
//         </Grid>
        
//         <Grid item xs={12}>
//           <TextField
//             id="color"
//             label="Color"
//             variant="outlined"
//             size="small"
//             value={accessoryColor}
//             onChange={handleColorChange}
//             fullWidth
//           />
//         </Grid> */}

//           {/* {error && (
//           <Typography variant="body2" color="error" align="center">
//             {error}
//           </Typography>
//         )} */}

//           <Grid item xs={12}>
//             <Typography variant="h5" align="center">
//               <Stack spacing={2} direction="row" justifyContent={"center"}>
//                 <Button
//                   variant="outlined"
//                   color="success"
//                   onClick={handleGoToCustomClick}
//                 >
//                   Go with Custom Gift box
//                   {/* onclick = go to custom giftboxes page */}
//                 </Button>

//                 <Button variant="contained" onClick={handleGiftboxViewClick}>
//                   Create New Gift Box
//                   {/*  onclick = create with a giftbox name and giftbox description(not mandotory) */}
//                 </Button>
//               </Stack>
//             </Typography>
//           </Grid>
//         </Grid>

//         <Box sx={{ m: 2 }}></Box>
//       </Box>
//     </Modal>
//   );
// }

// export default AddToGiftbox;


// import { Grid, IconButton, Typography } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import CloseIcon from "@mui/icons-material/Close";
// import { useNavigate } from "react-router-dom";
// import Modal from "@mui/material/Modal";
// import Stack from "@mui/material/Stack";
// import axios from "axios";
// import ShowMyGiftboxCard from "./ShowMyGiftboxCard";

// function AddToGiftbox({ open, closeEvent, customerId, accessoryId }) {  
//   const navigate = useNavigate();
//   const [myGiftboxes, setMyGiftboxes] = useState([]);

//   useEffect(() => {
//     const fetchGiftboxes = async () => {
//       if (customerId) {
//         console.log(`Fetching giftboxes for customerId: ${customerId}`);
//         try {
//           const response = await axios.get(
//             `http://localhost:3001/api/giftbox/getMyGiftboxes/${customerId}`
//           );
  
//           if (response.status === 200) {
//             console.log("Giftboxes fetched successfully:", response.data);
//             setMyGiftboxes(response.data); // Update the state with fetched data
//           } else {
//             console.error("Failed to fetch giftbox details:", response);
//           }
//         } catch (error) {
//           console.error("Error fetching giftbox details:", error);
//         }
//       } else {
//         console.log("customerId is not available yet.");
//       }
//     };
  
//     fetchGiftboxes();
//   }, [customerId]);
  

//   const modalStyle = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 600,
//     bgcolor: "background.paper",
//     borderRadius: 4,
//     boxShadow: 24,
//     p: 4,
//   };

//   const backdropStyle = {
//     backdropFilter: "blur(3px)", // Light black background with a blur effect
//     backgroundColor: "rgba(0, 0, 0, 0.6)",
//   };

//   const handleGoToCustomClick = () => {
//     navigate("/customer/ourProducts"); // Navigate to the custom giftboxes
//   };

//   const handleGiftboxViewClick = () => {
//     navigate("/customer/giftboxes"); // Navigate to the giftbox view in the Customer Tabs
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={closeEvent}
//       aria-labelledby="add-accessory-modal-title"
//       aria-describedby="add-accessory-modal-description"
//       style={backdropStyle}
//     >
//       <Box sx={modalStyle}>
//         <IconButton
//           style={{ position: "absolute", top: 10, right: 10 }}
//           onClick={closeEvent}
//         >
//           <CloseIcon />
//         </IconButton>
//         <Typography variant="h5" align="center" id="add-accessory-modal-title">
//           My Gift Boxes
//         </Typography>

//         <ShowMyGiftboxCard key={myGiftboxes.giftboxId} giftboxDetails={myGiftboxes} />

//         <Grid item xs={12}>
//           <Typography variant="h5" align="center">
//             <Stack spacing={2} direction="row" justifyContent={"center"}>
//               <Button
//                 variant="outlined"
//                 color="success"
//                 onClick={handleGoToCustomClick}
//               >
//                 Go with Custom Gift box
//               </Button>

//               <Button variant="contained" onClick={handleGiftboxViewClick}>
//                 Create New Gift Box
//               </Button>
//             </Stack>
//           </Typography>
//         </Grid>
//       </Box>
//     </Modal>
//   );
// }

// export default AddToGiftbox;


import { Grid, IconButton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import axios from "axios";
import ShowMyGiftboxCard from "./ShowMyGiftboxCard";

function AddToGiftbox({ open, closeEvent, customerId, accessoryId }) {  
  const navigate = useNavigate();
  const [myGiftboxes, setMyGiftboxes] = useState([]);

  useEffect(() => {
    const fetchGiftboxes = async () => {
      if (customerId) {
        console.log(`Fetching giftboxes for customerId: ${customerId}`);
        try {
          const response = await axios.get(
            `http://localhost:3001/api/giftbox/getMyGiftboxes/${customerId}`
          );
  
          if (response.status === 200) {
            console.log("Giftboxes fetched successfully:", response.data);
            setMyGiftboxes(response.data); // Update the state with fetched data
          } else {
            console.error("Failed to fetch giftbox details:", response);
          }
        } catch (error) {
          console.error("Error fetching giftbox details:", error);
        }
      } else {
        console.log("customerId is not available yet.");
      }
    };
  
    fetchGiftboxes();
  }, [customerId]);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
  };

  const backdropStyle = {
    backdropFilter: "blur(3px)", // Light black background with a blur effect
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  };

  const handleGoToCustomClick = () => {
    navigate("/customer/ourProducts"); // Navigate to the custom giftboxes
  };

  const handleGiftboxViewClick = () => {
    navigate("/customer/giftboxes"); // Navigate to the giftbox view in the Customer Tabs
  };

  return (
    <Modal
      open={open}
      onClose={closeEvent}
      aria-labelledby="add-accessory-modal-title"
      aria-describedby="add-accessory-modal-description"
      style={backdropStyle}
    >
      <Box sx={modalStyle}>
        <IconButton
          style={{ position: "absolute", top: 10, right: 10 }}
          onClick={closeEvent}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" align="center" id="add-accessory-modal-title">
          My Gift Boxes
        </Typography>

        {/* Pass accessoryId as a prop to ShowMyGiftboxCard */}
        <ShowMyGiftboxCard 
          key={myGiftboxes.giftboxId} 
          giftboxDetails={myGiftboxes} 
          selectedAccessory={accessoryId}  // Pass accessoryId as selectedAccessory
        />

        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Stack spacing={2} direction="row" justifyContent={"center"}>
              <Button
                variant="outlined"
                color="success"
                onClick={handleGoToCustomClick}
              >
                Go with Custom Gift box
              </Button>

              <Button variant="contained" onClick={handleGiftboxViewClick}>
                Create New Gift Box
              </Button>
            </Stack>
          </Typography>
        </Grid>
      </Box>
    </Modal>
  );
}

export default AddToGiftbox;
