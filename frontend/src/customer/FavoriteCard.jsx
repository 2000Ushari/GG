
// import React, { useEffect, useState } from 'react';
// import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Rating from '@mui/material/Rating';
// import Checkbox from '@mui/material/Checkbox';
// import Favorite from '@mui/icons-material/Favorite';
// import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
// import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2'; // SweetAlert for confirmation dialog
// import Flowers from '../images/accessories/acs4.jpg'; // Replace with actual default image

// const CustomCard = styled(Card)({
//   position: 'relative',
//   minWidth: 180,
//   minHeight: 400,
//   width: 250,
//   height: 350,
//   cursor: 'pointer',
//   '&:hover .addButton': {
//     display: 'block',
//   },
// });

// const AddButton = styled(Button)({
//   position: 'absolute',
//   top: 0,
//   width: '100%',
//   borderRadius: 0,
//   display: 'none',
//   backgroundColor: 'rgba(0, 0, 0, 0.7)',
//   color: 'white',
//   '&:hover': {
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//   },
// });

// function FavoriteCard({ accessoryDetails, customerId }) {
//   const [isFavorite, setIsFavorite] = useState(false); // New state to check if the accessory is a favorite
//   const navigate = useNavigate();
//  const customerID = customerId;
//     const value = 4; // Assuming this is the rating value

//   useEffect(() => {
//     console.log("customerId:", customerID); // Add this to see if userId is correctly passed.
//     console.log("accessoryDetails:", accessoryDetails.accessoryId); // Add this to see if accessoryDetails is correctly passed.
//   }, [customerID, accessoryDetails.accessoryId]);

//   useEffect(() => {
//     // Check if the accessory is already in the user's favorites when the component loads
//     const checkIfFavorite = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3001/api/accessory/checkIfFavorite/${customerID}/${accessoryDetails.accessoryId}`,
//           { method: 'GET' }
//         );
//         const data = await response.json();
//         setIsFavorite(data.isFavorite); // Assuming the API returns { isFavorite: true/false }
//       } catch (error) {
//         console.error('Error checking if accessory is favorite:', error);
//       }
//     };

//     checkIfFavorite();
//   }, [customerID, accessoryDetails.accessoryId]);

//     const getFavoriteAccessories = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/accessory/getAccessoryById/${favoritesData.accessoryId}`, );
//       if (!response.ok) {
//         throw new Error("Failed to fetch favorite accessories");
//       }
//       const data = await response.json();
//       setFavorites(data);
//     } catch (error) {
//       console.error("Error fetching favorite accessories:", error);
//     }
//   }

//   const handleAddOrRemoveFromFavorites = async () => {
//     try {
//       const action = isFavorite ? 'remove from' : 'add to';
//       const result = await Swal.fire({
//         title: `${isFavorite ? 'Remove from Favorites?' : 'Add to Favorites?'}`,
//         text: `Do you want to ${action} favorites?`,
//         icon: 'question',
//         showCancelButton: true,
//         confirmButtonText: `Yes, ${isFavorite ? 'remove' : 'add'} it!`,
//         cancelButtonText: 'No, cancel',
//       });

//       if (result.isConfirmed) {
//         // Make API request to add or remove the accessory from favorites
//         const endpoint = isFavorite
//           ? 'http://localhost:3001/api/accessory/removeFromFavorites'
//           : 'http://localhost:3001/api/accessory/addToFavorites';

//         await fetch(endpoint, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             customerId: customerId,
//             accessoryId: accessoryDetails.accessoryId,
//           }),
//         });

//         Swal.fire(
//           `${isFavorite ? 'Removed!' : 'Added!'}`,
//           `This accessory has been ${isFavorite ? 'removed from' : 'added to'} your favorites.`,
//           'success'
//         );

//         // Toggle the favorite state after successful action
//         setIsFavorite(!isFavorite);
//       }
//     } catch (error) {
//       console.error('Error updating favorites:', error);
//       Swal.fire('Error!', `Could not ${isFavorite ? 'remove' : 'add'} the accessory to favorites.`, 'error');
//     }
//   };

//   const handleCardClick = () => {
//     navigate(`/customer/accessoryView/${accessoryDetails.accessoryId}`);
//     window.location.reload(); // Reloads the page when accessory card is clicked
//   };

//   return (
//     <CustomCard key={accessoryDetails.accessoryId} onClick={handleCardClick}>
//       <CardMedia
//         component="img"
//         height="194"
//         image={accessoryDetails.image || Flowers}
//         alt={accessoryDetails.accessoryName}
//       />
//       <AddButton className="addButton">Add to Giftbox</AddButton>
//       <CardContent>
//         <Typography variant="h6" color="black" gutterBottom>
//           {accessoryDetails.accessoryName}
//         </Typography>
//         <Typography variant="body1" color="text.secondary">
//           Rs. {accessoryDetails.accessoryPrice}
//         </Typography>
//       </CardContent>
//       <CardActions sx={{ justifyContent: 'space-between' }} disableSpacing>
//         <Rating name="read-only" value={value} readOnly />
//         <IconButton
//           aria-label="add to favorites"
//           onClick={(e) => {
//             e.stopPropagation();
//             handleAddOrRemoveFromFavorites();
//           }}
//         >
//           <Checkbox
//             icon={<FavoriteBorder />}
//             checkedIcon={<Favorite color="error" />}
//             checked={isFavorite} // Check state to show favorite or not
//           />
//         </IconButton>
//       </CardActions>
//     </CustomCard>
//   );
// }

// export default FavoriteCard;


import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Checkbox from "@mui/material/Checkbox";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // SweetAlert for confirmation dialog
import Flowers from "../images/accessories/earring.jpg"; // Replace with actual default image

const CustomCard = styled(Card)({
  position: "relative",
  minWidth: 180,
  minHeight: 400,
  width: 250,
  height: 350,
  cursor: "pointer",
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

function FavoriteCard({ accessoryId, customerId }) {
  const [accessoryDetails, setAccessoryDetails] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  // Fetch accessory details using the accessoryId
  useEffect(() => {
    const fetchAccessoryDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/accessory/getAccessoryById/${accessoryId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch accessory details");
        }
        const data = await response.json();
        setAccessoryDetails(data); // Store accessory details
      } catch (error) {
        console.error("Error fetching accessory details:", error);
      }
    };
    fetchAccessoryDetails();
  }, [accessoryId]);

  // Check if accessory is in favorites
  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/accessory/checkIfFavorite/${customerId}/${accessoryId}`,
          { method: "GET" }
        );
        const data = await response.json();
        setIsFavorite(data.isFavorite); // Set favorite state
      } catch (error) {
        console.error("Error checking if favorite:", error);
      }
    };
    checkIfFavorite();
  }, [customerId, accessoryId]);

  const handleRemoveFromFavorites = async () => {
    try {
      const result = await Swal.fire({
        title: "Remove from Favorites?",
        text: "Do you want to remove this accessory from your favorites?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, remove it!",
        cancelButtonText: "No, cancel",
      });
  
      if (result.isConfirmed) {
        // Make API request to remove the accessory from favorites
        const endpoint = "http://localhost:3001/api/accessory/removeFromFavorites";
  
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customerId, accessoryId }),
        });
  
        Swal.fire(
          "Removed!",
          "This accessory has been removed from your favorites.",
          "success"
        );
  
        // Optionally, remove the accessory from the list in the UI without reloading the page
        setIsFavorite(false); // You can remove the favorite from the UI by setting the state or refreshing the list
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
      Swal.fire("Error!", "Could not remove the accessory from favorites.", "error");
    }
    window.location.reload();
  };
  

  const handleCardClick = () => {
    navigate(`/customer/accessoryView/${accessoryDetails.accessoryId}`);
  };

  if (!accessoryDetails) {
    return <p>Loading accessory...</p>;
  }

  return (
    <CustomCard onClick={handleCardClick}>
      <CardMedia
        component="img"
        height="194"
        image={accessoryDetails.image || Flowers}
        alt={accessoryDetails.accessoryName}
      />
      <AddButton className="addButton">Add to Giftbox</AddButton>
      <CardContent>
        <Typography variant="h6">{accessoryDetails.accessoryName}</Typography>
        <Typography variant="body2" color="text.secondary">
          Price: Rs.{accessoryDetails.accessoryPrice}
        </Typography>
        <Rating value={accessoryDetails.averageRating || 0} readOnly />
      </CardContent>
      <CardActions>
        <IconButton
          aria-label="add to favorites"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering card click
            handleRemoveFromFavorites();
          }}
        >
          
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite color="error"  />}
            checked={isFavorite}
            inputProps={{ "aria-label": "favorite accessory" }}
            
          />
        </IconButton>
      </CardActions>
    </CustomCard>
  );
}

export default FavoriteCard;
