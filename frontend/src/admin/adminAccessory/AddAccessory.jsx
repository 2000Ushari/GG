// import React, { useState, useEffect } from "react";
// import { Card, Grid, IconButton, Typography } from "@mui/material";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import CloseIcon from "@mui/icons-material/Close";
// import Swal from "sweetalert2";
// import Autocomplete from "@mui/material/Autocomplete";
// import { useNavigate } from "react-router-dom";
// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Switch from "@mui/material/Switch";
// import axios from "axios";

// import AdminNavbar from "../adminComponents/AdminNavbar";
// import AdminSidenav from "../adminComponents/AdminSidenav";
// import { blueGrey } from "@mui/material/colors";

// ///
// import CircularProgress from "@mui/material/CircularProgress";
// import { green } from "@mui/material/colors";
// import Fab from "@mui/material/Fab";
// import CheckIcon from "@mui/icons-material/Check";
// import SaveIcon from "@mui/icons-material/Save";

// function AddAccessory() {
//   const navigate = useNavigate();

//   // Authentication check
//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/auth/authenticated", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (res.data.authenticated && res.data.user.role === "admin") {
//           // setUser(res.data.user); // Set user data if authenticated
//           // customerId(res.data.user.id);
//         } else {
//           navigate("/login"); // Redirect to login if not authenticated
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [navigate]);

//   const [accessoryName, setAccessoryName] = useState("");
//   const [accessoryPrice, setAccessoryPrice] = useState("");
//   const [accessoryDescription, setAccessoryDescription] = useState("");
//   const [units, setUnits] = useState("");
//   const [accessoryColor, setAccessoryColor] = useState("");

//   const [error, setError] = useState("");

//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [categories, setCategories] = useState([]);

//   ////
//   const [loading, setLoading] = React.useState(false);
//   const [success, setSuccess] = React.useState(false);
//   const timer = React.useRef(undefined);

//   const handleNameChange = (event) => {
//     setAccessoryName(event.target.value);
//   };

//   const handlePriceChange = (event) => {
//     setAccessoryPrice(event.target.value);
//   };

//   const handleDescriptionChange = (event) => {
//     setAccessoryDescription(event.target.value);
//   };

//   const handleUnitsChange = (event) => {
//     setUnits(event.target.value);
//   };

//   const handleColorChange = (event) => {
//     setAccessoryColor(event.target.value);
//   };

//   const handleSubmit = () => {
//     // Make POST request to backend
//     fetch("http://localhost:3001/api/accessory/addAccessory", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         accessoryName,
//         accessoryPrice,
//         accessoryDescription,
//         units,
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
//         // closeEvent();
//         window.location.reload();
//       })
//       .catch((error) => {
//         console.error("Error adding accessory:", error);
//         Swal.fire("Error!", "Failed to add the accessory.", "error");
//         // Close the modal even if there's an error
//         // closeEvent();
//       });
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:3001/api/category/getCategory"
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch categories");
//       }
//       const data = await response.json();
//       setCategories(data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   /////
//   const buttonSx = {
//     ...(success && {
//       bgcolor: green[500],
//       "&:hover": {
//         bgcolor: green[700],
//       },
//     }),
//   };

//   React.useEffect(() => {
//     return () => {
//       clearTimeout(timer.current);
//     };
//   }, []);

//   const handleButtonClick = () => {
//     if (!loading) {
//       setSuccess(false);
//       setLoading(true);
//       timer.current = setTimeout(() => {
//         setSuccess(true);
//         setLoading(false);
//       }, 2000);
//     }
//   };

//   return (
//     <>
//       {/* <Modal
//       open={open}
//       onClose={closeEvent}
//       aria-labelledby="add-accessory-modal-title"
//       aria-describedby="add-accessory-modal-description"
//       style={backdropStyle}
//     > */}
//       {/* <Box sx={modalStyle}> */}
//       {/* <IconButton
//           style={{ position: "absolute", top: 10, right: 10 }}
//           onClick={closeEvent}
//         >
//           <CloseIcon />
//         </IconButton> */}

//       <div className="bgcolor">
//         <AdminNavbar />
//         <Box height={60} />
//         <Box sx={{ display: "flex" }}>
//           <AdminSidenav />
//           <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//             <Typography
//               gutterBottom
//               variant="h5"
//               component="div"
//               sx={{ marginLeft: "10px", fontWeight: "bold" }}
//             >
//               Accessories
//             </Typography>
//             <Card sx={{ padding: 2 }}>
//               <Typography
//                 variant="h6"
//                 align="left"
//                 id="add-accessory-modal-title"
//                 marginLeft={2}
//                 color="grey"
//               >
//                 Add Accessory
//               </Typography>

//               <Box height={20}></Box>
//               <Grid container spacing={2} padding={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     id="outlined-basic"
//                     label="Accessory Name"
//                     variant="outlined"
//                     size="small"
//                     value={accessoryName}
//                     onChange={handleNameChange}
//                     sx={{ width: "100%" }}
//                   />
//                 </Grid>

//                 <Grid item xs={6}>
//                   <Autocomplete
//                     value={selectedCategory}
//                     onChange={(event, newValue) => {
//                       setSelectedCategory(newValue);
//                     }}
//                     id="category-select"
//                     options={categories}
//                     getOptionLabel={(option) => option.categoryName}
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         label="Category"
//                         variant="outlined"
//                         size="small"
//                       />
//                     )}
//                   />
//                 </Grid>

//                 <Grid item xs={6}>
//                   <TextField
//                     id="color"
//                     label="Color"
//                     variant="outlined"
//                     size="small"
//                     value={accessoryColor}
//                     onChange={handleColorChange}
//                     fullWidth
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <TextField
//                     id="description"
//                     label="Description"
//                     variant="outlined"
//                     size="small"
//                     value={accessoryDescription}
//                     onChange={handleDescriptionChange}
//                     fullWidth
//                     multiline
//                     rows={4}
//                   />
//                 </Grid>

//                 <Grid item xs={6}>
//                   <TextField
//                     id="price"
//                     label="Price"
//                     variant="outlined"
//                     size="small"
//                     type="number"
//                     value={accessoryPrice}
//                     onChange={handlePriceChange}
//                     InputProps={{
//                       startAdornment: "Rs.",
//                     }}
//                     fullWidth
//                   />
//                 </Grid>

//                 <Grid item xs={6}>
//                   <TextField
//                     id="units"
//                     label="Units"
//                     variant="outlined"
//                     size="small"
//                     type="number"
//                     value={units}
//                     onChange={handleUnitsChange}
//                     InputProps={{
//                       endAdornment: "units",
//                     }}
//                     fullWidth
//                   />
//                 </Grid>
//                 <FormGroup>
//                 <FormControlLabel
//                   required
//                   control={<Switch />}
//                   label="Sizes Available"
//                 />
//               </FormGroup>
//                 {error && (
//                   <Typography variant="body2" color="error" align="center">
//                     {error}
//                   </Typography>
//                 )}
//                 {/* <Grid item xs={12}>
//                   <Typography variant="h5" align="center">
//                     <Button variant="contained" onClick={handleSubmit}>
//                       Submit Accessory
//                     </Button>
//                   </Typography>
//                 </Grid> */}

//               </Grid>

//               {/* New button */}
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <Box sx={{ m: 1, position: "relative" }}>
//                   <Fab
//                     aria-label="save"
//                     color="primary"
//                     sx={buttonSx}
//                     onClick={handleButtonClick}
//                   >
//                     {success ? <CheckIcon /> : <SaveIcon />}
//                   </Fab>
//                   {loading && (
//                     <CircularProgress
//                       size={68}
//                       sx={{
//                         color: green[500],
//                         position: "absolute",
//                         top: -6,
//                         left: -6,
//                         zIndex: 1,
//                       }}
//                     />
//                   )}
//                 </Box>
//                 <Box sx={{ m: 1, position: "relative" }}>
//                   <Button
//                     variant="contained"
//                     sx={buttonSx}
//                     disabled={loading}
//                     onClick={handleButtonClick}
//                   >
//                     Proceed
//                   </Button>
//                   {loading && (
//                     <CircularProgress
//                       size={24}
//                       sx={{
//                         color: green[500],
//                         position: "absolute",
//                         top: "50%",
//                         left: "50%",
//                         marginTop: "-12px",
//                         marginLeft: "-12px",
//                       }}
//                     />
//                   )}
//                 </Box>
//               </Box>
//               {/* Over button */}
//               <Box sx={{ m: 2 }}></Box>
//               {/* </Box> */}
//               {/* </Modal> */}
//             </Card>
//           </Box>
//         </Box>
//       </div>
//     </>
//   );
// }

// export default AddAccessory;

// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   Grid,
//   Typography,
//   Box,
//   TextField,
//   Autocomplete,
//   CircularProgress,
//   Button,
// } from "@mui/material";
// import { green } from "@mui/material/colors";
// import CheckIcon from "@mui/icons-material/Check";
// import SaveIcon from "@mui/icons-material/Save";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Switch from "@mui/material/Switch";
// import Checkbox from "@mui/material/Checkbox";

// import AdminNavbar from "../adminComponents/AdminNavbar";
// import AdminSidenav from "../adminComponents/AdminSidenav";

// export default function AddAccessory() {
//   const navigate = useNavigate();
//   const [accessoryName, setAccessoryName] = useState("");
//   const [accessoryPrice, setAccessoryPrice] = useState("");
//   const [accessoryDescription, setAccessoryDescription] = useState("");
//   const [units, setUnits] = useState("");
//   const [accessoryColor, setAccessoryColor] = useState("");
//   const [error, setError] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/auth/authenticated", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (!(res.data.authenticated && res.data.user.role === "admin")) {
//           navigate("/login");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         navigate("/login");
//       });

//     fetchCategories();
//   }, [navigate]);

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:3001/api/category/getCategory"
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch categories");
//       }
//       const data = await response.json();
//       setCategories(data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const handleClick = async () => {
//     if (!loading) {
//       setSuccess(false);
//       setLoading(true);
//       try {
//         const response = await fetch(
//           "http://localhost:3001/api/accessory/addAccessory",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               accessoryName,
//               accessoryPrice,
//               accessoryDescription,
//               units,
//               accessoryColor,
//               categoryId: selectedCategory.categoryId,
//             }),
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to add accessory");
//         }

//         const data = await response.json();
//         console.log("Accessory created:", data);
//         // Swal.fire("Success!", "Accessory added successfully.", "success");
//         setSuccess(true);
//         // Reset form fields here if needed
//         // setAccessoryName("");
//         // setAccessoryPrice("");
//         // setAccessoryDescription("");
//         // setUnits("");
//         // setAccessoryColor("");
//         // setSelectedCategory(null);
//       } catch (error) {
//         console.error("Error adding accessory:", error);
//         // Swal.fire("Error!", "Failed to add the accessory.", "error");
//         setSuccess(false);
//       } finally {
//         setTimeout(() => {
//           setLoading(false);
//         }, 1000); // Delay to show the success state for a moment
//       }
//     }
//   };

//   const buttonSx = {
//     ...(success && {
//       bgcolor: green[500],
//       "&:hover": {
//         bgcolor: green[700],
//       },
//     }),
//   };

//   return (
//     <div className="bgcolor">
//       <AdminNavbar />
//       <Box height={60} />
//       <Box sx={{ display: "flex" }}>
//         <AdminSidenav />
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <Typography
//             gutterBottom
//             variant="h5"
//             component="div"
//             sx={{ marginLeft: "10px", fontWeight: "bold" }}
//           >
//             Accessories
//           </Typography>
//           <Card sx={{ padding: 2 }}>
//             <Typography
//               variant="h6"
//               align="left"
//               id="add-accessory-modal-title"
//               marginLeft={2}
//               color="grey"
//             >
//               Add Accessory
//             </Typography>
//             <Box height={20} />
//             <Grid container spacing={2} padding={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Accessory Name"
//                   variant="outlined"
//                   size="small"
//                   value={accessoryName}
//                   onChange={(e) => setAccessoryName(e.target.value)}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <Autocomplete
//                   value={selectedCategory}
//                   onChange={(event, newValue) => setSelectedCategory(newValue)}
//                   options={categories}
//                   getOptionLabel={(option) => option.categoryName}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="Category"
//                       variant="outlined"
//                       size="small"
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   label="Color"
//                   variant="outlined"
//                   size="small"
//                   value={accessoryColor}
//                   onChange={(e) => setAccessoryColor(e.target.value)}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Description"
//                   variant="outlined"
//                   size="small"
//                   value={accessoryDescription}
//                   onChange={(e) => setAccessoryDescription(e.target.value)}
//                   fullWidth
//                   multiline
//                   rows={4}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   label="Price"
//                   variant="outlined"
//                   size="small"
//                   type="number"
//                   value={accessoryPrice}
//                   onChange={(e) => setAccessoryPrice(e.target.value)}
//                   InputProps={{
//                     startAdornment: "Rs.",
//                   }}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   label="Capacity"
//                   variant="outlined"
//                   size="small"
//                   type="number"
//                   value={units}
//                   onChange={(e) => setUnits(e.target.value)}
//                   InputProps={{
//                     endAdornment: "units",
//                   }}
//                   fullWidth
//                 />
//               </Grid>
//               {error && (
//                 <Grid item xs={12}>
//                   <Typography variant="body2" color="error" align="center">
//                     {error}
//                   </Typography>
//                 </Grid>
//               )}

//               <FormGroup>
//                 <FormControlLabel
//                   control={<Switch />}
//                   label="Sizes available"
//                 />
//               </FormGroup>

//               <Grid item xs={12}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Box sx={{ m: 1, position: "relative" }}>
//                     <Button
//                       variant="contained"
//                       sx={buttonSx}
//                       disabled={loading}
//                       onClick={handleClick}
//                     >
//                       {success ? "Proceeded" : "Proceed"}
//                     </Button>

//                     {loading && (
//                       <CircularProgress
//                         size={24}
//                         sx={{
//                           color: green[500],
//                           position: "absolute",
//                           top: "50%",
//                           left: "50%",
//                           marginTop: "-12px",
//                           marginLeft: "-12px",
//                         }}
//                       />
//                     )}
//                   </Box>
//                 </Box>
//               </Grid>
//               <Grid item xs={12}>
//               <FormGroup>
//                 <Grid item xs={3}>
//                 <FormControlLabel
//                   control={<Checkbox defaultChecked />}
//                   label="XS"
//                 />
//                 <TextField
//                   label="Units"
//                   variant="outlined"
//                   size="small"
//                   type="number"
//                   value={units}
//                   onChange={(e) => setUnits(e.target.value)}
//                   InputProps={{
//                     endAdornment: "units",
//                   }}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={3}>
//                 <FormControlLabel
//                   control={<Checkbox defaultChecked />}
//                   label="S"
//                 />
//                 <TextField
//                   label="Units"
//                   variant="outlined"
//                   size="small"
//                   type="number"
//                   value={units}
//                   onChange={(e) => setUnits(e.target.value)}
//                   InputProps={{
//                     endAdornment: "units",
//                   }}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={3}>
//                 <FormControlLabel
//                   control={<Checkbox defaultChecked />}
//                   label="M"
//                 />
//                 <TextField
//                   label="Units"
//                   variant="outlined"
//                   size="small"
//                   type="number"
//                   value={units}
//                   onChange={(e) => setUnits(e.target.value)}
//                   InputProps={{
//                     endAdornment: "units",
//                   }}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={3}>
//                 <FormControlLabel
//                   control={<Checkbox defaultChecked />}
//                   label="L"
//                 />
//                 <TextField
//                   label="Units"
//                   variant="outlined"
//                   size="small"
//                   type="number"
//                   value={units}
//                   onChange={(e) => setUnits(e.target.value)}
//                   InputProps={{
//                     endAdornment: "units",
//                   }}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={3}>
//                 <FormControlLabel
//                   control={<Checkbox defaultChecked />}
//                   label="XL"
//                 />
//                 <TextField
//                   label="Units"
//                   variant="outlined"
//                   size="small"
//                   type="number"
//                   value={units}
//                   onChange={(e) => setUnits(e.target.value)}
//                   InputProps={{
//                     endAdornment: "units",
//                   }}
//                   fullWidth
//                 />
//               </Grid>

//               </FormGroup>
//             </Grid>
//             </Grid>
//           </Card>
//         </Box>
//       </Box>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   Grid,
//   Typography,
//   Box,
//   TextField,
//   Autocomplete,
//   CircularProgress,
//   Button,
//   FormGroup,
//   FormControlLabel,
//   Switch,
//   Checkbox,
// } from "@mui/material";
// import { green } from "@mui/material/colors";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// import AdminNavbar from "../adminComponents/AdminNavbar";
// import AdminSidenav from "../adminComponents/AdminSidenav";

// export default function AddAccessory() {
//   const navigate = useNavigate();
//   const [accessoryName, setAccessoryName] = useState("");
//   const [accessoryPrice, setAccessoryPrice] = useState("");
//   const [accessoryDescription, setAccessoryDescription] = useState("");
//   const [accessoryColor, setAccessoryColor] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [error, setError] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [units, setUnits] = useState("");

//   const [sizesAvailable, setSizesAvailable] = useState(false);
//   const [sizes, setSizes] = useState({
//     XS: { checked: false, units: "" },
//     S: { checked: false, units: "" },
//     M: { checked: false, units: "" },
//     L: { checked: false, units: "" },
//     XL: { checked: false, units: "" },
//   });

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/auth/authenticated", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (!(res.data.authenticated && res.data.user.role === "admin")) {
//           navigate("/login");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         navigate("/login");
//       });

//     fetchCategories();
//   }, [navigate]);

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:3001/api/category/getCategory"
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch categories");
//       }
//       const data = await response.json();
//       setCategories(data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const handleClick = async () => {
//     if (!loading) {
//       setSuccess(false);
//       setLoading(true);
//       try {
//         const response = await fetch(
//           "http://localhost:3001/api/accessory/addAccessory",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               accessoryName,
//               accessoryPrice,
//               accessoryDescription,
//               accessoryColor,
//               categoryId: selectedCategory.categoryId,
//               units,
//               // sizesAvailable,
//               // sizes: sizesAvailable ? sizes : null,
//             }),
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to add accessory");
//         }

//         const data = await response.json();
//         console.log("Accessory created:", data);
//         Swal.fire("Success!", "Accessory added successfully.", "success");
//         setSuccess(true);
//       } catch (error) {
//         console.error("Error adding accessory:", error);
//         Swal.fire("Error!", "Failed to add the accessory.", "error");
//         setSuccess(false);
//       } finally {
//         setTimeout(() => {
//           setLoading(false);
//         }, 1000);
//       }
//     }
//   };

//   // const handleSubmit = () => {
//   //       fetch("http://localhost:3001/api/accessory/addToStock"), {
//   //         method: "POST",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //         body: JSON.stringify({
//   //           accessoryId: data.accessoryId,
//   //           accessoryQuantity,
//   //           sizeId: selectedSize.sizeId,
//   //         }),
//   //         }
//   //         .then((response) => {
//   //           if (!response.ok) {
//   //             throw new Error("Failed to add accessory to giftbox");
//   //           }
//   //           return response.json();
//   //         })
//   //         .then((data) => {
//   //           console.log("Accessory added to giftbox:", data);
//   //           Swal.fire("Success!", "Accessory added to giftbox successfully.", "success");
//   //           // Close the modal after success
//   //           // closeEvent();
//   //           window.location.reload();
//   //         })
//   //         .catch((error) => {
//   //           console.error("Error adding accessory to giftbox:", error);
//   //           Swal.fire("Error!", "Failed to add the accessory to giftbox.", "error");
//   //           // Close the modal even if there's an error
//   //           // closeEvent();

//   //         });
//   // };

//   const handleSizeChange = (size) => (event) => {
//     setSizes((prevSizes) => ({
//       ...prevSizes,
//       [size]: { ...prevSizes[size], checked: event.target.checked },
//     }));
//   };

//   const handleUnitsChange = (size) => (event) => {
//     setSizes((prevSizes) => ({
//       ...prevSizes,
//       [size]: { ...prevSizes[size], units: event.target.value },
//     }));
//   };

//   const buttonSx = {
//     ...(success && {
//       bgcolor: green[500],
//       "&:hover": {
//         bgcolor: green[700],
//       },
//     }),
//   };

//   return (
//     <div className="bgcolor">
//       <AdminNavbar />
//       <Box height={60} />
//       <Box sx={{ display: "flex" }}>
//         <AdminSidenav />
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <Typography
//             gutterBottom
//             variant="h5"
//             component="div"
//             sx={{ marginLeft: "10px", fontWeight: "bold" }}
//           >
//             Accessories
//           </Typography>
//           <Card sx={{ padding: 2 }}>
//             <Typography
//               variant="h6"
//               align="left"
//               id="add-accessory-modal-title"
//               marginLeft={2}
//               color="grey"
//             >
//               Add Accessory
//             </Typography>
//             <Box height={20} />
//             <Grid container spacing={2} padding={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Accessory Name"
//                   variant="outlined"
//                   size="small"
//                   value={accessoryName}
//                   onChange={(e) => setAccessoryName(e.target.value)}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <Autocomplete
//                   value={selectedCategory}
//                   onChange={(event, newValue) => setSelectedCategory(newValue)}
//                   options={categories}
//                   getOptionLabel={(option) => option.categoryName}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="Category"
//                       variant="outlined"
//                       size="small"
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   label="Color"
//                   variant="outlined"
//                   size="small"
//                   value={accessoryColor}
//                   onChange={(e) => setAccessoryColor(e.target.value)}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Description"
//                   variant="outlined"
//                   size="small"
//                   value={accessoryDescription}
//                   onChange={(e) => setAccessoryDescription(e.target.value)}
//                   fullWidth
//                   multiline
//                   rows={4}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   label="Price"
//                   variant="outlined"
//                   size="small"
//                   type="number"
//                   value={accessoryPrice}
//                   onChange={(e) => setAccessoryPrice(e.target.value)}
//                   InputProps={{
//                     startAdornment: "Rs.",
//                   }}
//                   fullWidth
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   label="Capacity"
//                   variant="outlined"
//                   size="small"
//                   type="number"
//                   value={units}
//                   onChange={(e) => setUnits(e.target.value)}
//                   InputProps={{
//                     endAdornment: "units",
//                   }}
//                   fullWidth
//                 />
//               </Grid>
//               {error && (
//                 <Grid item xs={12}>
//                   <Typography variant="body2" color="error" align="center">
//                     {error}
//                   </Typography>
//                 </Grid>
//               )}
//               <Grid item xs={12}>
//                 <Box sx={{ m: 1, position: "relative" }}>
//                   <Button
//                     variant="contained"
//                     sx={buttonSx}
//                     disabled={loading}
//                     onClick={handleClick}
//                   >
//                     {success ? "Proceeded" : "Proceed"}
//                   </Button>
//                   {loading && (
//                     <CircularProgress
//                       size={24}
//                       sx={{
//                         color: green[500],
//                         position: "absolute",
//                         top: "50%",
//                         left: "50%",
//                         marginTop: "-12px",
//                         marginLeft: "-12px",
//                       }}
//                     />
//                   )}
//                 </Box>
//               </Grid>

//               <Grid item xs={12}>
//                 <FormGroup>
//                   <FormControlLabel
//                     control={
//                       <Switch
//                         checked={sizesAvailable}
//                         onChange={(e) => setSizesAvailable(e.target.checked)}
//                       />
//                     }
//                     label="Sizes available"
//                   />
//                 </FormGroup>
//               </Grid>


//               <Grid item xs={6}>
//                 <TextField
//                   label="Quantity"
//                   variant="outlined"
//                   size="small"
//                   type="number"
//                   value={quantity}
//                   onChange={(e) => setQuantity(e.target.value)}
//                   fullWidth
//                   disabled={sizesAvailable}
//                 />
//               </Grid>
              
//               <Grid item xs={12}>
//                 <FormGroup>
//                   {Object.entries(sizes).map(([size, { checked, units }]) => (
//                     <Grid item xs={12} key={size} sx={{ marginBottom: 2 }}>
//                       <FormControlLabel
//                         control={
//                           <Checkbox
//                             checked={checked}
//                             onChange={handleSizeChange(size)}
//                             disabled={!sizesAvailable}
//                           />
//                         }
//                         label={size}
//                       />
//                       <TextField
//                         label="Units"
//                         variant="outlined"
//                         size="small"
//                         type="number"
//                         value={units}
//                         onChange={handleUnitsChange(size)}
//                         disabled={!sizesAvailable || !checked}
//                         sx={{ width: "120px", marginLeft: 2 }}
//                       />
//                     </Grid>
//                   ))}
//                 </FormGroup>
//               </Grid>

//               <Grid item xs={12}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Grid item xs={12}>
//                     <Typography variant="h5" align="center">
//                       <Button variant="contained">
//                         Submit Accessory{" "}
//                       </Button>{" "}
//                     </Typography>
//                   </Grid>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Card>
//         </Box>
//       </Box>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import {
  Card,
  Grid,
  Typography,
  Box,
  TextField,
  Autocomplete,
  CircularProgress,
  Button,
  FormGroup,
  FormControlLabel,
  Switch,
  Checkbox,
} from "@mui/material";
import { green } from "@mui/material/colors";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdminNavbar from "../adminComponents/AdminNavbar";
import AdminSidenav from "../adminComponents/AdminSidenav";

export default function AddAccessory() {
  const navigate = useNavigate();
  const [accessoryName, setAccessoryName] = useState("");
  const [accessoryPrice, setAccessoryPrice] = useState("");
  const [accessoryDescription, setAccessoryDescription] = useState("");
  const [accessoryColor, setAccessoryColor] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [units, setUnits] = useState("");

  const [sizesAvailable, setSizesAvailable] = useState(false);
  const [sizes, setSizes] = useState({
    XS: { checked: false, units: "" },
    S: { checked: false, units: "" },
    M: { checked: false, units: "" },
    L: { checked: false, units: "" },
    XL: { checked: false, units: "" },
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/authenticated", {
        withCredentials: true,
      })
      .then((res) => {
        if (!(res.data.authenticated && res.data.user.role === "admin")) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });

    fetchCategories();
  }, [navigate]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/category/getCategory"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleClick = async () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3001/api/accessory/addAccessory",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              accessoryName,
              accessoryPrice,
              accessoryDescription,
              accessoryColor,
              categoryId: selectedCategory.categoryId,
              units,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add accessory");
        }

        const data = await response.json();
        console.log("Accessory created:", data);
        Swal.fire("Success!", "Accessory added successfully.", "success");
        setSuccess(true);

        // Add to stock
        await addToStock(data.accessoryId);
      } catch (error) {
        console.error("Error adding accessory:", error);
        Swal.fire("Error!", "Failed to add the accessory.", "error");
        setSuccess(false);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }
  };

  const addToStock = async (accessoryId) => {
    try {
      if (!sizesAvailable) {
        await fetch("http://localhost:3001/api/accessory/addToStock", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accessoryId,
            quantity,
            sizeId: 1,
          }),
        });
      } else {
        const sizeMap = { XS: 2, S: 3, M: 4, L: 5, XL: 6 };
        for (const [size, { checked, units }] of Object.entries(sizes)) {
          if (checked && units) {
            await fetch("http://localhost:3001/api/accessory/addToStock", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                accessoryId,
                quantity: units,
                sizeId: sizeMap[size],
              }),
            });
          }
        }
      }
      console.log("Stock added successfully");
    } catch (error) {
      console.error("Error adding stock:", error);
      throw error;
    }
  };

  const handleSizeChange = (size) => (event) => {
    setSizes((prevSizes) => ({
      ...prevSizes,
      [size]: { ...prevSizes[size], checked: event.target.checked },
    }));
  };

  const handleUnitsChange = (size) => (event) => {
    setSizes((prevSizes) => ({
      ...prevSizes,
      [size]: { ...prevSizes[size], units: event.target.value },
    }));
  };

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  return (
    <div className="bgcolor">
      <AdminNavbar />
      <Box height={60} />
      <Box sx={{ display: "flex" }}>
        <AdminSidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ marginLeft: "10px", fontWeight: "bold" }}
          >
            Accessories
          </Typography>
          <Card sx={{ padding: 2 }}>
            <Typography
              variant="h6"
              align="left"
              id="add-accessory-modal-title"
              marginLeft={2}
              color="grey"
            >
              Add Accessory
            </Typography>
            <Box height={20} />
            <Grid container spacing={2} padding={2}>
              <Grid item xs={12}>
                <TextField
                  label="Accessory Name"
                  variant="outlined"
                  size="small"
                  value={accessoryName}
                  onChange={(e) => setAccessoryName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  value={selectedCategory}
                  onChange={(event, newValue) => setSelectedCategory(newValue)}
                  options={categories}
                  getOptionLabel={(option) => option.categoryName}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      variant="outlined"
                      size="small"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Color"
                  variant="outlined"
                  size="small"
                  value={accessoryColor}
                  onChange={(e) => setAccessoryColor(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  variant="outlined"
                  size="small"
                  value={accessoryDescription}
                  onChange={(e) => setAccessoryDescription(e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Price"
                  variant="outlined"
                  size="small"
                  type="number"
                  value={accessoryPrice}
                  onChange={(e) => setAccessoryPrice(e.target.value)}
                  InputProps={{
                    startAdornment: "Rs.",
                  }}
                  fullWidth
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Capacity"
                  variant="outlined"
                  size="small"
                  type="number"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  InputProps={{
                    endAdornment: "units",
                  }}
                  fullWidth
                />
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="error" align="center">
                    {error}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Box sx={{ m: 1, position: "relative" }}>
                  <Button
                    variant="contained"
                    sx={buttonSx}
                    disabled={loading}
                    onClick={handleClick}
                  >
                    {success ? "Proceeded" : "Proceed"}
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: green[500],
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginTop: "-12px",
                        marginLeft: "-12px",
                      }}
                    />
                  )}
                </Box>
              </Grid>

              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={sizesAvailable}
                        onChange={(e) => setSizesAvailable(e.target.checked)}
                      />
                    }
                    label="Sizes available"
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Quantity"
                  variant="outlined"
                  size="small"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  fullWidth
                  disabled={sizesAvailable}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormGroup>
                  {Object.entries(sizes).map(([size, { checked, units }]) => (
                    <Grid item xs={12} key={size} sx={{ marginBottom: 2 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={handleSizeChange(size)}
                            disabled={!sizesAvailable}
                          />
                        }
                        label={size}
                      />
                      <TextField
                        label="Units"
                        variant="outlined"
                        size="small"
                        type="number"
                        value={units}
                        onChange={handleUnitsChange(size)}
                        disabled={!sizesAvailable || !checked}
                        sx={{ width: "120px", marginLeft: 2 }}
                      />
                    </Grid>
                  ))}
                </FormGroup>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Box>
    </div>
  );
}