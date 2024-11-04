// import * as React from "react";
// import { styled } from "@mui/material/styles";
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import Collapse from "@mui/material/Collapse";
// import Avatar from "@mui/material/Avatar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Stack from "@mui/material/Stack";
// import { red } from "@mui/material/colors";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import NavbarCustomer from "../customerComponent/NavbarCustomer";
// import CustomerFooter from "../customerComponent/CustomerFooter";

// import Flowers from "../../images/categories/flowers.png";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import { Paper } from "@mui/material";

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

// function AccessoryView() {
//   const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };
//   return (
//     <>
//       <div className="bgcolor">
//         <NavbarCustomer />
//         <Box height={60} />

//         <Box sx={{ display: "flex" }}>
//           <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//             <Card sx={{ height: 100 + "vh" }}>
//             <Stack direction="row" spacing={1}>
//               <Grid container spacing={1}>
//                 <Grid item xs={1}>
//                   <Card >

//                   <CardMedia
//                       component="img"
//                       height="100%"
//                       image={Flowers}
//                       alt="Paella dish"
//                     />
//                   </Card>
//                 </Grid>
//                 <Grid item xs={4} sx={{ display: "flex", margin: 5 }}>
//                   <Card sx={{ minWidth: 200, maxHeight: 500 }}>
//                     <CardMedia
//                       component="img"
//                       height="100%"
//                       image={Flowers}
//                       alt="Paella dish"
//                     />
//                   </Card>

//                 </Grid>
//                 <Grid item xs={4} sx={{ display: "flex", margin: 5 }}>
//                 <Paper elevation={0} />

//                       <Typography gutterBottom variant="h5" component="div">
//                         Red Rose for love
//                       </Typography>

//                       <Typography variant="body2" color="text.secondary">
//                       Rs. 500
//                       </Typography>
//                       <Paper />
//                 </Grid>
//               </Grid>
//             </Stack>
//             </Card>
//           </Box>
//         </Box>

//         <Box height={60} />
//         <Grid item xs={12} >
//           <CustomerFooter />
//         </Grid>
//       </div>
//     </>
//   );
// }

// export default AccessoryView;

// import * as React from "react";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { styled } from "@mui/material/styles";
// import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import Stack from "@mui/material/Stack";
// import NavbarCustomer from "../customerComponent/Navbar";
// import CustomerFooter from "../customerComponent/CustomerFooter";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Rating from "@mui/material/Rating";
// import Button from "@mui/material/Button";
// import Favorite from "@mui/icons-material/Favorite";
// import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
// import IconButton from "@mui/material/IconButton";
// import Checkbox from "@mui/material/Checkbox";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import TextField from "@mui/material/TextField";
// import NavbarCustomerAfterSignedIn from "../customerComponent/NavbarCustomerAfterSignedIn";

// import Flowers from "../../images/categories/flowers.png";
// import CustomerAccessories from "../customerAccessory/CustomerAccessories";
// import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
// import AddToGiftbox from "../customerGiftbox/AddToGiftbox";
// const label = { inputProps: { "aria-label": "Checkbox demo" } };

// function AccessoryView() {
//   const { accessoryId } = useParams();
//   const [value, setValue] = React.useState(2);
//   const [accessory, setAccessory] = useState({});
//   const [tabValue, setTabValue] = React.useState(0);
//   const [openAddToGiftboxModal, setOpenAddToGiftboxModal] = useState(false);

//   useEffect(() => {
//     const fetchAccessory = async () => {
//       console.log("Badu ganna yanwaaa");
//       try {
//         const response = await fetch(
//           `http://localhost:3001/api/accessory/${accessoryId}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch accessory details");
//         }
//         const data = await response.json();
//         console.log("Badu awaaaa");
//         console.log(data);
//       } catch (error) {
//         console.error("Error fetching accessory details:", error);
//       }
//     };

//     fetchAccessory();
//   }, []);

//   if (!accessory) {
//     return <div>Loading...</div>;
//   }

//   const handleOpenAddToGiftboxModal = () => setOpenAddToGiftboxModal(true);
//   const handleCloseAddToGiftboxModal = () => setOpenAddToGiftboxModal(false);

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };
//   console.log("Accessory details");
//   console.log(accessory);
//   return (
//     <>
//       <div className="bgcolor">
//         {/* <NavbarCustomer /> */}
//         <NavbarCustomerAfterSignedIn />
//         <Box height={60} />
//         <Box sx={{ display: "flex" }}>
//           <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//             <Card sx={{ padding: 2 }}>
//               <Grid container spacing={2}>
//                 <Grid item xs={1} />
//                 <Grid item xs={1}>
//                   <Card>
//                     <CardMedia
//                       component="img"
//                       height="100%"
//                       image={Flowers}
//                       alt="Accessory"
//                     />
//                   </Card>
//                   <br />
//                   <Card>
//                     <CardMedia
//                       component="img"
//                       height="100%"
//                       image={Flowers}
//                       alt="Accessory"
//                     />
//                   </Card>
//                   <br />
//                   <Card>
//                     <CardMedia
//                       component="img"
//                       height="100%"
//                       image={Flowers}
//                       alt="Accessory"
//                     />
//                   </Card>
//                   <br />
//                   <Card>
//                     <CardMedia
//                       component="img"
//                       height="100%"
//                       image={Flowers}
//                       alt="Accessory"
//                     />
//                   </Card>
//                 </Grid>
//                 <Grid item xs={4}>
//                   <Card sx={{ maxHeight: 500 }}>
//                     <CardMedia
//                       component="img"
//                       height="100%"
//                       image={Flowers}
//                       alt="Accessory"
//                     />
//                   </Card>
//                 </Grid>
//                 <Grid item xs={0.5}></Grid>
//                 <Grid item xs={4}>
//                   <Stack spacing={2}>
//                     <Typography gutterBottom variant="h5" component="div">
//                       {/* Red Rose for love */}
//                       {accessory?.accessoryName}
//                     </Typography>
//                     <Typography variant="h6" color="text.secondary">
//                       Rs. {accessory?.accessoryPrice}
//                     </Typography>
//                     <Rating name="read-only" value={value} readOnly />
//                     <Grid item xs={12}>
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         align="justify"
//                       >
//                         {accessory?.accessoryDescription}
//                       </Typography>
//                     </Grid>
//                     <br />
//                     <Stack direction="row" spacing={3}>
//                       <TextField
//                         id="outlined-number"
//                         label="Quantity"
//                         type="number"
//                         size="medium"
//                         InputLabelProps={{
//                           shrink: true,
//                         }}
//                         defaultValue={1}
//                         InputProps={{ inputProps: { min: 1 } }}
//                       />
//                       <IconButton aria-label="add to favorites">
//                         <Checkbox
//                           {...label}
//                           icon={<FavoriteBorder />}
//                           checkedIcon={<Favorite color="error" />}
//                         />
//                       </IconButton>
//                     </Stack>
//                     <Stack direction="column" spacing={5}>
//                       <Button
//                         variant="contained"
//                         startIcon={<CardGiftcardIcon />}
//                         color="secondary"
//                         onClick={handleOpenAddToGiftboxModal}
//                       >
//                         Add to Giftbox
//                       </Button>

//                       <AddToGiftbox
//                         open={openAddToGiftboxModal}
//                         closeEvent={handleCloseAddToGiftboxModal}
//                       />
//                     </Stack>
//                   </Stack>
//                 </Grid>
//               </Grid>
//               <Box sx={{ width: "100%", marginTop: 4 }}>
//                 <Tabs value={tabValue} onChange={handleTabChange}>
//                   <Tab label="DESCRIPTION" />
//                   <Tab label="REVIEWS" />
//                 </Tabs>
//                 {tabValue === 0 && (
//                   <Box sx={{ p: 3 }}>
//                     <Typography>{accessory?.accessoryDescription}</Typography>
//                   </Box>
//                 )}
//                 {tabValue === 1 && (
//                   <Box sx={{ p: 3 }}>
//                     <Typography>Reviews content here...</Typography>
//                   </Box>
//                 )}
//               </Box>
//             </Card>
//             <Box height={10} />
//             <Card sx={{ padding: 1 }}>
//               <Typography gutterBottom variant="h5" component="div">
//                 Related Accessories
//               </Typography>

//               <Grid item xs={12}>
//                 {/* methana accessoryList wenuwt enna oni popular accessory wgee ekk....danata oka thynna....popular accessory gnna wdhk hadana */}
//                 <CustomerAccessories />
//               </Grid>
//             </Card>
//           </Box>
//         </Box>
//         <Box height={60} />
//         <Grid item xs={12}>
//           <CustomerFooter />
//         </Grid>
//       </div>
//     </>
//   );
// }

// export default AccessoryView;

import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Card,CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";


import CustomerAccessories from "../customerAccessory/CustomerAccessories";
import AddToGiftbox from "../customerGiftbox/AddToGiftbox";
import Flowers from "../../images/categories/flowers.png";
import CustomerFooter from "../customerComponent/CustomerFooter";
import NavbarCustomerAfterSignedIn from "../customerComponent/NavbarCustomerAfterSignedIn";
import CustomerSidenav from "../customerComponent/CustomerSidenav";
import AccessorySizes from "./AccessorySizes"

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function AccessoryView() {
  const {navigate } = useNavigate();
  const [customerId, setCustomerId] = useState(null);
  const {accessoryId } = useParams();
  const [quantity, setQuantity] = React.useState(1);
  const [selectedSizeId, setSelectedSizeId] = React.useState(null); // State to hold the selected sizeId
  const [value, setValue] = React.useState(2);
  const [accessory, setAccessory] = useState(null); // Ensure null as initial state to check loading
  const [tabValue, setTabValue] = React.useState(0);
  const [openAddToGiftboxModal, setOpenAddToGiftboxModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userId, setUserId] = useState(null);
  const [customerIdToCheckFav, setCustomerIdToCheckFav] = useState(null);


  // Authentication check
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/authenticated", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.authenticated && res.data.user.role === "customer") {
          setCustomerId(res.data.user.id); // Set user ID if authenticated
          setUserId(res.data.user.id);//to check if favorite onlu. don't use this for other purposes
        } else {
          navigate("/login"); // Redirect to login if not authenticated
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  // Fetch customerId using userId to check whether the selected accessory is a favorite. Do not do anything other than that from this function
  useEffect(() => {
    if (userId) {
      getCustomerIdByUserId(userId);
    }
  }, [userId]);

  // Fetch customerId by userId
  const getCustomerIdByUserId = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/user/getCustomerIdByUserId/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch customer ID");
      }
      const data = await response.json();
      setCustomerIdToCheckFav(data.customerId); // Set customerId state
      console.log("Customer ID to check Fav:", data.customerIdToCheckFav);
    } catch (error) {
      console.error("Error fetching customer ID:", error);
    }
  };
  useEffect(() => {
    if (customerIdToCheckFav) {
      getCustomerIdByUserId(customerIdToCheckFav);
    }
  }, [customerIdToCheckFav]);

  useEffect(() => {
    // Check if the accessory is already in the user's favorites when the component loads
    const checkIfFavorite = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/accessory/checkIfFavorite/${customerIdToCheckFav}/${accessoryId}`,
          { method: 'GET' }
        );
        console.log('Response:', response);
        const data = await response.json();
        setIsFavorite(data.isFavorite); // Assuming the API returns { isFavorite: true/false }
      } catch (error) {
        console.error('Error checking if accessory is favorite:', error);
      }
    };

    checkIfFavorite();
  }, [customerIdToCheckFav, accessoryId]);

  
  const handleAddOrRemoveFromFavorites = async () => {
    try {
      const action = isFavorite ? 'remove from' : 'add to';
      const result = await Swal.fire({
        title: `${isFavorite ? 'Remove from Favorites?' : 'Add to Favorites?'}`,
        text: `Do you want to ${action} favorites?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: `Yes, ${isFavorite ? 'remove' : 'add'} it!`,
        cancelButtonText: 'No, cancel',
      });
  
      if (result.isConfirmed) {
        const endpoint = isFavorite
          ? 'http://localhost:3001/api/accessory/removeFromFavorites'
          : 'http://localhost:3001/api/accessory/addToFavorites';
  
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerId: customerIdToCheckFav,
            accessoryId: accessoryId,
          }),
        });
  
        // Check if the response is ok
        if (!response.ok) {
          const errorMessage = await response.text(); // Or response.json() depending on your API response
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
        }
  
        Swal.fire(
          `${isFavorite ? 'Removed!' : 'Added!'}`,
          `This accessory has been ${isFavorite ? 'removed from' : 'added to'} your favorites.`,
          'success'
        );
  
        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
      Swal.fire('Error!', `Could not ${isFavorite ? 'remove' : 'add'} the accessory to favorites. ${error.message}`, 'error');
    }
  };

  useEffect(() => {
    const fetchAccessory = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/accessory/getAccessoryById/${accessoryId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch accessory details");
        }
        const data = await response.json();
        setAccessory(data);
      } catch (error) {
        console.error("Error fetching accessory details:", error);
      }
    };

    fetchAccessory();
    window.scrollTo(0, 0); // Scrolls to the top whenever accessoryId changes
  }, [accessoryId]); // Fetch new accessory when accessoryId changes

  if (!accessory) {
    return <div>Loading...</div>; // Show a loading state while data is being fetched
  }



  const handleOpenAddToGiftboxModal = () => setOpenAddToGiftboxModal(true);
  const handleCloseAddToGiftboxModal = () => setOpenAddToGiftboxModal(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSizeClick = (sizeId) => {
    setSelectedSizeId(sizeId);
    console.log('Selected Size ID:', sizeId);
  };

  return (
    <>
      <div className="bgcolor">
        <NavbarCustomerAfterSignedIn />
        <Box height={60} />
        <Box sx={{ display: "flex" }}>
          <CustomerSidenav />
          <Box height={60} />
          <Box sx={{ display: "flex" }}>
            <Grid container spacing={2}>
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Card sx={{ padding: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={1} />
                    <Grid item xs={1}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="100%"
                          image={accessory.image || Flowers}
                          alt="Accessory"
                        />
                      </Card>
                    </Grid>
                    <Grid item xs={4}>
                      <Card sx={{ maxHeight: 500 }}>
                        <CardMedia
                          component="img"
                          height="100%"
                          image={accessory.image || Flowers}
                          alt="Accessory"
                        />
                      </Card>
                    </Grid>
                    <Grid item xs={0.5}></Grid>
                    <Grid item xs={4}>
                      <Stack spacing={2}>
                        <Typography gutterBottom variant="h5" component="div">
                          {accessory.accessoryName}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          Rs. {accessory.accessoryPrice}
                        </Typography>
                        <Rating value={accessory.averageRating || 0} readOnly />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          align="justify"
                        >
                          {accessory.accessoryDescription}
                        </Typography>

                        {/* Pass the handleSizeSelect function to AccessorySizes */}
                        <AccessorySizes
                          accessoryId={accessory.accessoryId}
                          onSizeClick={handleSizeClick}
                        />
                        
                        <Stack direction="row" spacing={3}>
                          <TextField
                            id="outlined-number"
                            label="Quantity"
                            type="number"
                            size="medium"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            defaultValue={1}
                            onChange={(e) => setQuantity(e.target.value)}
                            InputProps={{ inputProps: { min: 1 } }}
                          />
                          {/* <IconButton aria-label="add to favorites">
                            <Checkbox
                              {...label}
                              icon={<FavoriteBorder />}
                              checkedIcon={<Favorite color="error" />}
                            />
                          </IconButton> */}
                          <IconButton
          aria-label="add to favorites"
          onClick={(e) => {
            e.stopPropagation();
            handleAddOrRemoveFromFavorites();
          }}
        >
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite color="error" />}
            checked={isFavorite} // Check state to show favorite or not
          />
        </IconButton>
                        </Stack>
                        <Stack direction="column" spacing={5}>
                          <Button
                            variant="contained"
                            startIcon={<CardGiftcardIcon />}
                            color="secondary"
                            onClick={handleOpenAddToGiftboxModal}
                          >
                            Add to Giftbox
                          </Button>
                          <AddToGiftbox
                            open={openAddToGiftboxModal}
                            closeEvent={handleCloseAddToGiftboxModal}
                            customerId={customerId}
                            accessoryId={accessoryId}
                            quantity={quantity}
                            sizeId={selectedSizeId}
                          />
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Box sx={{ width: "100%", marginTop: 4 }}>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                      <Tab label="DESCRIPTION" />
                      <Tab label="REVIEWS" />
                    </Tabs>
                    {tabValue === 0 && (
                      <Box sx={{ p: 3 }}>
                        <Typography>
                          {accessory.accessoryDescription}
                        </Typography>
                      </Box>
                    )}
                    {tabValue === 1 && (
                      <Box sx={{ p: 3 }}>
                        <Typography>Reviews content here...</Typography>
                      </Box>
                    )}
                  </Box>
                </Card>
                <Box height={10} />
                <Card sx={{ padding: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    marginLeft={4}
                    margin={3}
                    fontWeight={700}
                  >
                    Related Accessories
                  </Typography>
                  <Grid item xs={12}>
                    <CustomerAccessories />
                  </Grid>
                </Card>
              </Box>
              <Box height={60} />
              <Grid item xs={12}>
                <CustomerFooter />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default AccessoryView;
