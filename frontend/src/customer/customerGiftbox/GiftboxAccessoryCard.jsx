// import React, { useEffect, useState } from "react";
// import { styled } from "@mui/material/styles";
// import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Rating from "@mui/material/Rating";
// import Checkbox from "@mui/material/Checkbox";
// import Favorite from "@mui/icons-material/Favorite";
// import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
// import Button from "@mui/material/Button";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2"; // SweetAlert for confirmation dialog
// import Flowers from "../../images/accessories/necklaces2.jpg"; // Replace with actual default image

// const CustomCard = styled(Card)({
//   position: "relative",
//   minWidth: 180,
//   minHeight: 400,
//   width: 250,
//   height: 350,
//   cursor: "pointer",
//   "&:hover .addButton": {
//     display: "block",
//   },
// });

// const AddButton = styled(Button)({
//   position: "absolute",
//   top: 0,
//   width: "100%",
//   borderRadius: 0,
//   display: "none",
//   backgroundColor: "rgba(0, 0, 0, 0.7)",
//   color: "white",
//   "&:hover": {
//     backgroundColor: "rgba(0, 0, 0, 0.8)",
//   },
// });
// function GiftboxAccessoryCard(customerId, giftboxId) {
//     const [giftboxAccessoriesDetails, setGiftboxAccessoriesDetails] = useState(null);
//     const [isFavorite, setIsFavorite] = useState(false);
//     const navigate = useNavigate();
  
//     // Fetch accessory details using the accessoryId
//     useEffect(() => {
//       const fetchGiftboxAccessoryDetails = async () => {
//         try {
//           const response = await fetch(`http://localhost:3001/api/giftbox/getGiftboxAccessories/${giftboxId}`);
//           if (!response.ok) {
//             throw new Error("Failed to fetch accessory details");
//           }
//           const data = await response.json();
//           setGiftboxAccessoriesDetails(data); // Store accessory details
//         } catch (error) {
//           console.error("Error fetching accessory details:", error);
//         }
//       };
//       fetchGiftboxAccessoryDetails();
//     }, [giftboxId]);
  
//     // Check if accessory is in favorites
//     // useEffect(() => {
//     //   const checkIfFavorite = async () => {
//     //     try {
//     //       const response = await fetch(
//     //         `http://localhost:3001/api/accessory/checkIfFavorite/${customerId}/${giftboxAccessoriesDetails.accessoryId}`,
//     //         { method: "GET" }
//     //       );
//     //       const data = await response.json();
//     //       setIsFavorite(data.isFavorite); // Set favorite state
//     //     } catch (error) {
//     //       console.error("Error checking if favorite:", error);
//     //     }
//     //   };
//     //   checkIfFavorite();
//     // }, [customerId, giftboxAccessoriesDetails.accessoryId]);
  
//     // const handleRemoveFromFavorites = async () => {
//     //   try {
//     //     const result = await Swal.fire({
//     //       title: "Remove from Favorites?",
//     //       text: "Do you want to remove this accessory from your favorites?",
//     //       icon: "question",
//     //       showCancelButton: true,
//     //       confirmButtonText: "Yes, remove it!",
//     //       cancelButtonText: "No, cancel",
//     //     });
    
//     //     if (result.isConfirmed) {
//     //       // Make API request to remove the accessory from favorites
//     //       const endpoint = "http://localhost:3001/api/accessory/removeFromFavorites";
    
//     //       await fetch(endpoint, {
//     //         method: "POST",
//     //         headers: { "Content-Type": "application/json" },
//     //         body: JSON.stringify({ customerId, accessoryId }),
//     //       });
    
//     //       Swal.fire(
//     //         "Removed!",
//     //         "This accessory has been removed from your favorites.",
//     //         "success"
//     //       );
    
//     //       // Optionally, remove the accessory from the list in the UI without reloading the page
//     //       setIsFavorite(false); // You can remove the favorite from the UI by setting the state or refreshing the list
//     //     }
//     //   } catch (error) {
//     //     console.error("Error removing from favorites:", error);
//     //     Swal.fire("Error!", "Could not remove the accessory from favorites.", "error");
//     //   }
//     //   window.location.reload();
//     // };
    
  
//     const handleCardClick = () => {
//       navigate(`/customer/accessoryView/${giftboxAccessoriesDetails.accessoryId}`);
//     };
  
//     if (!giftboxAccessoriesDetails) {
//       return <p>Loading accessory...</p>;
//     }
  
//   return (
//     <CustomCard onClick={handleCardClick}>
//     <CardMedia
//       component="img"
//       height="194"
//       image={giftboxAccessoriesDetails.image || Flowers}
//       alt={giftboxAccessoriesDetails.accessoryName}
//     />
//     <AddButton className="addButton">Add to Giftbox</AddButton>
//     <CardContent>
//       <Typography variant="h6">{giftboxAccessoriesDetails.accessoryName}</Typography>
//       <Typography variant="body2" color="text.secondary">
//         Price: Rs.{giftboxAccessoriesDetails.accessoryPrice}
//       </Typography>
//       <Rating value={giftboxAccessoriesDetails.averageRating || 0} readOnly />
//     </CardContent>
//     <CardActions>
//       <IconButton
//         aria-label="add to favorites"
//         onClick={(e) => {
//           e.stopPropagation(); // Prevent triggering card click
//         //   handleRemoveFromFavorites();
//         }}
//       >
        
//         <Checkbox
//           icon={<FavoriteBorder />}
//           checkedIcon={<Favorite color="error"  />}
//         //   checked={isFavorite}
//           inputProps={{ "aria-label": "favorite accessory" }}
          
//         />
//       </IconButton>
//     </CardActions>
//   </CustomCard>
// );
// }

// export default GiftboxAccessoryCard

// import React, { useEffect, useState } from "react";
// import { Card, CardMedia, CardContent, Typography, CardActions, IconButton, Checkbox } from "@mui/material";
// import Favorite from "@mui/icons-material/Favorite";
// import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
// import { useNavigate } from "react-router-dom";
// import { styled } from "@mui/material/styles";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";

// import Flowers from "../../images/accessories/necklaces2.jpg"; 


// const CustomCard = styled(Card)({
//     position: "relative",
    
//     minWidth: 180,
//     minHeight: 400,
//     width: 500,
//     height: 350,
//     cursor: "pointer",
//     "&:hover .addButton": {
//       display: "block",
//     },
//   });
  
//   const AddButton = styled(Button)({
//     position: "absolute",
//     top: 0,
//     width: "100%",
//     borderRadius: 0,
//     display: "none",
//     backgroundColor: "rgba(0, 0, 0, 0.7)",
//     color: "white",
//     "&:hover": {
//       backgroundColor: "rgba(0, 0, 0, 0.8)",
//     },
//   });

// function GiftboxAccessoryCard({ accessory, customerId }) {
//   const navigate = useNavigate();
//   const [size, setSize] = useState(null);
//     const [quantity, setQuantity] = useState(1);

//   const handleCardClick = () => {
//     navigate(`/customer/accessoryView/${accessory.accessoryId}`);
//   };

//   const getSize = async (sizeId) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/accessory/size/getSizeBySizeId/${accessory.sizeId}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch accessory size");
//       }
//       const data = await response.json();
//     setSize(data.size); // Store accessory size in state
//     } catch (error) {
//       console.error("Error fetching accessory size:", error);
//     }
//   };
//   useEffect(() => {
//     getSize(accessory.size);
//   }, [accessory.size]);

//   return (
//     <CustomCard onClick={handleCardClick}>
//       <CardMedia
//         component="img"
//         height="194"
//         image={accessory.image || Flowers} // Provide a default image if none exists
//         alt={accessory.accessoryName}
//       />
//       <AddButton className="addButton">Add to Giftbox</AddButton>
//       <CardContent>
//         <Typography variant="h6">{accessory.accessoryName}</Typography>
//         <Typography variant="body2" color="text.secondary">
//           Price: Rs.{accessory.accessoryPrice}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Size: {size}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Quantity: {accessory.quantity}
//         </Typography>
//         {/* <TextField
//                             id="outlined-number"
//                             label="Quantity"
//                             type="number"
//                             size="medium"
//                             InputLabelProps={{
//                               shrink: true,
//                             }}
//                             defaultValue={accessory.quantity}
//                             onChange={(e) => setQuantity(e.target.value)}
//                             InputProps={{ inputProps: { min: 1 } }}
//                           /> */}

//         <Typography variant="body2" color="text.secondary">
//           Color: {accessory.accessoryColor}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         {/* <IconButton
//           aria-label="add to favorites"
//           onClick={(e) => e.stopPropagation()} // Prevent card click when clicking on the favorite button
//         >
//           <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite color="error" />} />
//         </IconButton> */}

//       </CardActions>
//     </CustomCard>
//   );
// }

// export default GiftboxAccessoryCard;


// import React, { useEffect, useState } from "react";
// import { Card, CardMedia, CardContent, Typography, CardActions, Button, TextField, Select, MenuItem } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { useNavigate } from "react-router-dom";

// import Flowers from "../../images/accessories/necklaces2.jpg"; 

// const CustomCard = styled(Card)({
//     position: "relative",
//     minWidth: 180,
//     minHeight: 400,
//     width: 500,
//     height: 350,
//     cursor: "pointer",
//     "&:hover .addButton": {
//       display: "block",
//     },
//   });
  
//   const AddButton = styled(Button)({
//     position: "absolute",
//     top: 0,
//     width: "100%",
//     borderRadius: 0,
//     display: "none",
//     backgroundColor: "rgba(0, 0, 0, 0.7)",
//     color: "white",
//     "&:hover": {
//       backgroundColor: "rgba(0, 0, 0, 0.8)",
//     },
//   });

// function GiftboxAccessoryCard({ accessory, customerId }) {
//   const navigate = useNavigate();
//   const [size, setSize] = useState(accessory.size); // Initially set to current size
//   const [quantity, setQuantity] = useState(accessory.quantity || 1);
//   const [sizeOptions, setSizeOptions] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(accessory.accessoryPrice * quantity);

//   const handleCardClick = () => {
//     navigate(`/customer/accessoryView/${accessory.accessoryId}`);
//   };

//   // Fetch available sizes for accessory if applicable
//   const fetchSizeOptions = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/accessory/size/getSizeOptions/${accessory.sizeId}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch accessory size options");
//       }
//       const data = await response.json();
//       setSizeOptions(data); // Assuming data is an array of size options
//     } catch (error) {
//       console.error("Error fetching size options:", error);
//     }
//   };

//   useEffect(() => {
//     if (accessory.size !== "N/A") {
//       fetchSizeOptions();
//     }
//   }, [accessory.size]);

//   // Update total price whenever quantity or size (if affecting price) changes
//   useEffect(() => {
//     const newTotalPrice = accessory.accessoryPrice * quantity;
//     setTotalPrice(newTotalPrice);
//   }, [quantity, size, accessory.accessoryPrice]);

//   const handleQuantityChange = (event) => {
//     setQuantity(Number(event.target.value));
//   };

//   const handleSizeChange = (event) => {
//     setSize(event.target.value);
//   };

//   return (
//     <CustomCard >
//       <CardMedia
//         component="img"
//         height="194"
//         image={accessory.image || Flowers} // Provide a default image if none exists
//         alt={accessory.accessoryName}
//       />
//       <AddButton className="addButton" onClick={handleCardClick}>Add to Giftbox</AddButton>
//       <CardContent>
//         <Typography variant="h6">{accessory.accessoryName}</Typography>
//         <Typography variant="body2" color="text.secondary">
//           Unit Price: Rs.{accessory.accessoryPrice}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Size:
//           {sizeOptions.length > 0 ? (
//             <Select value={size} onChange={handleSizeChange} sx={{ ml: 1 }}>
//               {sizeOptions.map((option) => (
//                 <MenuItem key={option} value={option}>
//                   {option}
//                 </MenuItem>
//               ))}
//             </Select>
//           ) : (
//             <span>{size}</span>
//           )}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Color: {accessory.accessoryColor}
//         </Typography>

//         <Typography variant="body2" color="text.secondary">
//           Quantity:
//           <TextField
//             type="number"
//             value={quantity}
//             onChange={handleQuantityChange}
//             size="small"
//             sx={{ ml: 1, width: "60px" }}
//             inputProps={{ min: 1 }}
//           />
//         </Typography>
//         <Typography variant="body1" sx={{ mt: 1 }}>
//           Total Price: Rs.{totalPrice}
//         </Typography>

//       </CardContent>
//     </CustomCard>
//   );
// }

// export default GiftboxAccessoryCard;

// import React from "react";
// import { Card, CardMedia, CardContent, Typography, TextField } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import Flowers from "../../images/accessories/necklaces2.jpg"; 
// import Button from "@mui/material/Button";
// import { useNavigate } from "react-router-dom";

// const CustomCard = styled(Card)({
//   position: "relative",
//   minWidth: 180,
//   minHeight: 400,
//   width: 250,
//   height: 350,
//     "&:hover .addButton": {
//       display: "block",
//     },
//   });
  
//   const AddButton = styled(Button)({
//     position: "absolute",
//     top: 0,
//     width: "100%",
//     borderRadius: 0,
//     display: "none",
//     backgroundColor: "rgba(0, 0, 0, 0.7)",
//     color: "white",
//     "&:hover": {
//       backgroundColor: "rgba(0, 0, 0, 0.8)",
//     },
//   });

// function GiftboxAccessoryCard({ accessory, quantity, onQuantityChange }) {
//     const navigate = useNavigate();

//   // Change the quantity only if it's not "N/A"
//   const handleQuantityInput = (e) => {
//     const newQuantity = parseInt(e.target.value, 10);
//     if (newQuantity > 0) {
//       onQuantityChange(accessory.accessoryId, newQuantity);
//     }
//   };

//     const handleCardClick = () => {
//     navigate(`/customer/accessoryView/${accessory.accessoryId}`);
//   };

//   return (
//     <CustomCard>
//         <AddButton className="addButton" onClick={handleCardClick}>Add to Giftbox</AddButton>
//       <CardMedia component="img" height="194" image={accessory.image || Flowers} alt={accessory.accessoryName} />
//       <CardContent>
//         <Typography variant="h6">{accessory.accessoryName}</Typography>
//         <Typography variant="body2">Price: Rs.{accessory.accessoryPrice}</Typography>
//         <Typography variant="body2">Color: {accessory.accessoryColor}</Typography>
//         <TextField
//           label="Quantity"
//           type="number"
//           value={quantity || 1}
//           onChange={handleQuantityInput}
//           InputProps={{ inputProps: { min: 1 } }}
//           fullWidth
//         />
//       </CardContent>
//     </CustomCard>
//   );
// }

// export default GiftboxAccessoryCard;

// import React from "react";
// import { Card, CardMedia, CardContent, Typography, TextField, Button } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import Flowers from "../../images/accessories/necklaces2.jpg"; 
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2"; // SweetAlert for confirmation dialog

// const CustomCard = styled(Card)({
//   position: "relative",
//   minWidth: 180,
//   minHeight: 400,
//   width: 250,
//   height: 450,
//   "&:hover .addButton": {
//     display: "block",
//   },
// });

// const AddButton = styled(Button)({
//   position: "absolute",
//   top: 0,
//   width: "100%",
//   borderRadius: 0,
//   display: "none",
//   backgroundColor: "rgba(0, 0, 0, 0.7)",
//   color: "white",
//   "&:hover": {
//     backgroundColor: "rgba(0, 0, 0, 0.8)",
//   },
// });

// function GiftboxAccessoryCard({ giftboxId, accessory, quantity, onQuantityChange, onRemoveAccessory }) {
//   const navigate = useNavigate();

//   // Update quantity and save to database
//   const handleQuantityInput = async (e) => {
//     const newQuantity = parseInt(e.target.value, 10);
//     if (newQuantity > 0) {
//       onQuantityChange(accessory.accessoryId, newQuantity);

//       // Save updated quantity to the database
//       try {
//         await fetch(`http://localhost:3001/api/accessory/updateQuantity/${accessory.accessoryId}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ quantity: newQuantity }),
//         });
//       } catch (error) {
//         console.error("Error updating quantity:", error);
//       }
//     }
//   };

//   // Handle card click to view accessory details
//   const handleCardClick = () => {
//     navigate(`/customer/accessoryView/${accessory.accessoryId}`);
//   };

// //   // Remove accessory from giftbox
// //   const handleRemoveClick = async () => {
// //     try {
// //       await fetch(`http://localhost:3001/api/giftbox/removeAccessoryFromGiftbox/${giftboxId}/${accessory.accessoryId}`, {
// //         method: "DELETE",
// //       });
// //       onRemoveAccessory(accessory.accessoryId); // Update parent component state
// //     } catch (error) {
// //       console.error("Error removing accessory:", error);
// //     }
// //   };

// const handleRemoveClick = async () => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to remove this accessory from the giftbox?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, remove it!",
//       cancelButtonText: "Cancel",
//     });

//     if (result.isConfirmed) {
//       try {
//         await fetch(`http://localhost:3001/api/giftbox/removeAccessoryFromGiftbox/${giftboxId}/${accessory.accessoryId}`, {
//           method: "DELETE",
//         });
//         onRemoveAccessory(accessory.accessoryId); // Update parent component state

//         // Show a success alert
//         Swal.fire("Removed!", "The accessory has been removed from the giftbox.", "success");
//       } catch (error) {
//         console.error("Error removing accessory:", error);

//         // Show an error alert if there's an issue
//         Swal.fire("Error", "Failed to remove the accessory. Please try again.", "error");
//       }
//     }
//   };

//   return (
//     <CustomCard>
//       <AddButton className="addButton" onClick={handleCardClick}>Add to Giftbox</AddButton>
//       <CardMedia component="img" height="194" image={accessory.image || Flowers} alt={accessory.accessoryName} />
//       <CardContent>
//         <Typography variant="h6">{accessory.accessoryName}</Typography>
//         <Typography variant="body2">Price: Rs.{accessory.accessoryPrice}</Typography>
//         <Typography variant="body2">Color: {accessory.accessoryColor}</Typography>
//         <TextField
//           label="Quantity"
//           type="number"
//           value={quantity || 1}
//           onChange={handleQuantityInput}
//           InputProps={{ inputProps: { min: 1 } }}
//           fullWidth
//         />
//         <Button
//           variant="outlined"
//           color="error"
//           onClick={handleRemoveClick}
//           fullWidth
//           sx={{ marginTop: "8px" }}
//         >
//           Remove
//         </Button>
//       </CardContent>
//     </CustomCard>
//   );
// }

// export default GiftboxAccessoryCard;


import React, { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography, TextField, Button, CardActions } from "@mui/material";
import { styled } from "@mui/material/styles";
import Flowers from "../../images/accessories/necklaces2.jpg"; 
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // SweetAlert for confirmation dialog

const CustomCard = styled(Card)({
  position: "relative",
  minWidth: 180,
  minHeight: 450,
  width: 250,
  height: 550,
  "&:hover .addButton": {
    display: "block",
  },
});

const AddButton = styled(Button)({
  position: "absolute",
  top: 0,
  width: "100%",
  borderRadius: 0,
  display: "none",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  color: "white",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
});

function GiftboxAccessoryCard({ giftboxId, accessory, onQuantityChange, onRemoveAccessory }) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(accessory.quantity || 1); // Use initial quantity from accessory if available
  const [totalPrice, setTotalPrice] = useState(accessory.accessoryPrice * quantity);
  const [sizeOptions, setSizeOptions] = useState([]);


  // Update total price when quantity changes
  useEffect(() => {
    setTotalPrice(quantity * accessory.accessoryPrice);
  }, [quantity, accessory.accessoryPrice]);

  // Update quantity and save to database
  const handleQuantityInput = async (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      onQuantityChange(accessory.accessoryId, newQuantity);

      // Save updated quantity to the database
      try {
        await fetch(`http://localhost:3001/api/accessory/updateQuantity/${accessory.accessoryId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: newQuantity }),
        });
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };



  // Handle card click to view accessory details
  const handleCardClick = () => {
    navigate(`/customer/accessoryView/${accessory.accessoryId}`);
  };

  // Remove accessory from giftbox with confirmation
  const handleRemoveClick = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this accessory from the giftbox?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`http://localhost:3001/api/giftbox/removeAccessoryFromGiftbox/${giftboxId}/${accessory.accessoryId}`, {
          method: "DELETE",
        });
        onRemoveAccessory(accessory.accessoryId); // Update parent component state

        // Show a success alert
        Swal.fire("Removed!", "The accessory has been removed from the giftbox.", "success");
      } catch (error) {
        console.error("Error removing accessory:", error);

        // Show an error alert if there's an issue
        Swal.fire("Error", "Failed to remove the accessory. Please try again.", "error");
      }
    }
  };

    // Fetch available sizes for accessory if applicable
  const fetchSizeOptions = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/accessory/size/getSizeOptions/${accessory.sizeId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch accessory size options");
      }
      const data = await response.json();
      setSizeOptions(data); // Assuming data is an array of size options
    } catch (error) {
      console.error("Error fetching size options:", error);
    }
  };

  useEffect(() => {
    if (accessory.size !== "N/A") {
      fetchSizeOptions();
    }
  }, [accessory.size]);

  return (
    <CustomCard>
      <AddButton className="addButton" onClick={handleCardClick}>Add to Giftbox</AddButton>
      <CardMedia component="img" height="194" image={accessory.image || Flowers} alt={accessory.accessoryName} />
      <CardContent>
        <Typography variant="h6">{accessory.accessoryName}</Typography>
        <Typography variant="body2">Price per Item: Rs.{accessory.accessoryPrice}</Typography>
        <Typography variant="body2">Color: {accessory.accessoryColor}</Typography>
        <Typography variant="body2">Size: {accessory.sizeId}</Typography>
                {/* Displaying the size options */}
                <Typography variant="body2">Size: {sizeOptions.length > 0 ? sizeOptions.join(', ') : 'N/A'}</Typography>
        <br/>
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={handleQuantityInput}
          InputProps={{ inputProps: { min: 1 } }}
          fullWidth
        />
        <Typography variant="body2" sx={{ marginTop: "8px", fontWeight: "bold" }}>
  Total Price: Rs.{totalPrice}
</Typography>
        <CardActions sx={{ marginBottom: "5px" }}>
        <Button
          variant="outlined"
          color="error"
          onClick={handleRemoveClick}
          sx={{ margin: "8px", position: "absolute", bottom: 8, right: 4, width: "90%" }}
        >
          Remove
        </Button>
       </CardActions>
      </CardContent>
    </CustomCard>
  );
}

export default GiftboxAccessoryCard;
