// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// // import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// // import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// // import { red } from '@mui/material/colors';


// import Flowers from "../../images/categories/flowers.png";
// import Rating from '@mui/material/Rating';
// import Button from '@mui/material/Button';

// import Favorite from '@mui/icons-material/Favorite';
// import Checkbox from '@mui/material/Checkbox';
// import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
// import AddBoxIcon from '@mui/icons-material/AddBox';


//     const ExpandMore = styled((props) => {
//       const { expand, ...other } = props;
//       return <IconButton {...other} />;
//     })(({ theme, expand }) => ({
//       transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//       marginLeft: 'auto',
//       transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//       }),
//     }));


// function CustomerAccessories() {

//     const [value, setValue] = React.useState(2);

//     const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

//   return (
//     <>
//         <Card sx={{ maxWidth: 250 }}>
//           <CardMedia
//             component="img"
//             height="194"
//             image= {Flowers}
//             alt="Paella dish"
    
//           />
          
//           <CardContent>

//             <Typography variant="h6" color="black" gutterBottom>
//               Red Rose for love
//             </Typography>
//             <Typography variant="body1" color="text.secondary">
//               Rs. 500
//             </Typography>

//           </CardContent>
//           <CardActions sx={{ justifyContent: "space-between" }} disableSpacing>
            
//             <Rating name="read-only" value={value} readOnly/>
//             <IconButton aria-label="add to favorites">
//             <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite color='error' />} />

//             </IconButton>
//           </CardActions>
          
//         </Card>
//     </>
//   );
// }
    
    

// export default CustomerAccessories;

// import * as React from 'react';
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

// import Flowers from "../../images/categories/flowers.png";

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

// const CustomCard = styled(Card)({
//   position: 'relative',
//   maxWidth: 250,
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

// function CustomerAccessories() {
//   const [value, setValue] = React.useState(2);
//   const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

//   return (
//     <>
//       <CustomCard>
//         <CardMedia
//           component="img"
//           height="194"
//           image={Flowers}
//           alt="Red Rose for love"
//         />
//         <AddButton className="addButton">
//           Add to Giftbox
//         </AddButton>
//         <CardContent>
//           <Typography variant="h6" color="black" gutterBottom>
//             Red Rose for love
//           </Typography>
//           <Typography variant="body1" color="text.secondary">
//             Rs. 500
//           </Typography>
//         </CardContent>
//         <CardActions sx={{ justifyContent: "space-between" }} disableSpacing>
//           <Rating name="read-only" value={value} readOnly />
//           <IconButton aria-label="add to favorites">
//             <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite color='error' />} />
//           </IconButton>
//         </CardActions>
//       </CustomCard>
//     </>
//   );
// }

// export default CustomerAccessories;



// import * as React from 'react';
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
// import { Link } from 'react-router-dom';

// import Flowers from "../../images/categories/flowers.png";

// const CustomCard = styled(Card)({
//   position: 'relative',
//   maxWidth: 250,
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

// const MediaLink = styled(Link)({
//   textDecoration: 'none',
//   color: 'inherit',
//   display: 'block',
//   position: 'relative',
// });

// function AccessoryCard( accessoryDetails ) {
//   const [value, setValue] = React.useState(4);
//   const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

//   return (
//     <>
//       <CustomCard>
//         <MediaLink to="#">
//           <CardMedia
//             component="img"
//             height="194"
//             image={Flowers}
//             alt="Red Rose for love"
//           /></MediaLink>
//           <AddButton className="addButton">
//             Add to Giftbox
//           </AddButton>
        
//         <CardContent>
//           <Typography variant="h6" color="black" gutterBottom>
//             {/* Red Rose for love */}
//             {accessoryDetails.accessoryName}
//           </Typography>
//           <Typography variant="body1" color="text.secondary">
//             {/* Rs. 500 */}
//             Rs.{accessoryDetails.price}
//           </Typography>
//         </CardContent>
//         <CardActions sx={{ justifyContent: "space-between" }} disableSpacing>
//           <Rating name="read-only" value={value} readOnly />
//           <IconButton aria-label="add to favorites">
//             <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite color='error' />} />
//           </IconButton>
//         </CardActions>
//       </CustomCard>
//     </>
//   );
// }

// export default AccessoryCard;


// import * as React from 'react';
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
// import { Link, useNavigate } from 'react-router-dom';
// import Flowers from '../../images/categories/flowers.png'

// const CustomCard = styled(Card)({
//   position: 'relative',
//     minWidth: 180,
//     minHeight: 400,
//     width: 250,
//     height: 350,
//     cursor: 'pointer',
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


// function AccessoryCard({ accessoryDetails }) {
//   const [value, setValue] = React.useState(accessoryDetails.rating || 4); // assuming rating is provided in accessoryDetails
//   const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

//   const navigate = useNavigate();

//   const handleCardClick = () => {
//     navigate(`/customer/accessoryView/${accessoryDetails.accessoryId}`);
//   };

//   return (
    
//       <CustomCard
//                   key={accessoryDetails.accessoryId}
//                   onClick={handleCardClick}
//                 >
//       {/* <MediaLink to={Flowers}> */}
//         <CardMedia
//           component="img"
//           height="194"
//           image={accessoryDetails.image || Flowers} // replace with actual default image path
//           alt={accessoryDetails.accessoryName}
//         />
//       {/* </MediaLink> */}
//       <AddButton className="addButton">
//         Add to Giftbox
//       </AddButton>
//       <CardContent>
//         <Typography variant="h6" color="black" gutterBottom>
//           {accessoryDetails.accessoryName}
//         </Typography>
//         <Typography variant="body1" color="text.secondary">
//           Rs. {accessoryDetails.accessoryPrice}
//         </Typography>
//       </CardContent>
//       <CardActions sx={{ justifyContent: "space-between" }} disableSpacing>
//         <Rating name="read-only" value={value} readOnly />
//         <IconButton aria-label="add to favorites">
//           <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite color='error' />} />
//         </IconButton>
//       </CardActions>
//     </CustomCard>
//   );
// }

// export default AccessoryCard;


// import React, {useEffect} from 'react';
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
// import axios from 'axios'; // Import axios for making API requests
// import Swal from 'sweetalert2'; // SweetAlert for confirmation dialog
// import Flowers from '../../images/categories/flowers.png'; // Replace with actual default image

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

// function AccessoryCard({ accessoryDetails, userId}) { // Pass customerId as a prop
//   const [value, setValue] = React.useState(accessoryDetails.rating || 4); // Assuming rating is provided in accessoryDetails
//   const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
//   const id = userId;
//   const navigate = useNavigate();

//   const handleCardClick = () => {
//     navigate(`/customer/accessoryView/${accessoryDetails.accessoryId}`);
//     window.location.reload();  // Reloads the page when accessory card is clicked
//   };

//   useEffect(() => {
//     console.log("UserId:", userId); // Add this to see if userId is correctly passed.
//     console.log("AccessoryDetails:", accessoryDetails.accessoryId); // Add this to see if accessoryDetails is correctly passed.
//   }, [userId, accessoryDetails.accessoryId]);

//   const handleAddToFavorites = async () => {
//     try {
//       // Fetch the real customerId from the user API
//       const customerResponse = await fetch(`http://localhost:3001/api/user/getCustomerIdByUserId/${id}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
  
//       if (!customerResponse.ok) {
//         throw new Error("Failed to fetch customer information.");
//       }
  
//       const customerData = await customerResponse.json();
//       const realCustomerId = customerData.customerId; // Assuming the API returns the customerId in the response
  
//       // Show confirmation dialog
//       const result = await Swal.fire({
//         title: "Add to Favorites?",
//         text: "Do you want to add this accessory to your favorites?",
//         icon: "question",
//         showCancelButton: true,
//         confirmButtonText: "Yes, add it!",
//         cancelButtonText: "No, cancel",
//       });
  
//       // If user confirms, proceed to add the accessory to favorites
//       if (result.isConfirmed) {
//         // Make API request to add accessory to favorites using the real customerId
//         await fetch("http://localhost:3001/api/accessory/addToFavorites", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             customerId: realCustomerId, // Use the real customerId from the API
//             accessoryId: accessoryDetails.accessoryId, // Use the accessoryId from accessoryDetails
//           }),
//         });
  
//         // Show success message
//         Swal.fire("Added!", "This accessory has been added to your favorites.", "success");
//       }
//     } catch (error) {
//       console.error("Error adding to favorites:", error);
//       console.log(accessoryDetails.accessoryId);
//       Swal.fire("Error!", "Could not add the accessory to favorites.", "error");
//     }
//   };
  

//   return (
//     <CustomCard key={accessoryDetails.accessoryId} onClick={handleCardClick}>
//       <CardMedia
//         component="img"
//         height="194"
//         image={accessoryDetails.image || Flowers} // Replace with actual default image path
//         alt={accessoryDetails.accessoryName}
//       />
//       <AddButton className="addButton">
//         Add to Giftbox
//       </AddButton>
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
//             e.stopPropagation(); // Prevent card click
//             handleAddToFavorites(); // Handle add to favorites
//           }}
//         >
//           <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite color="error" />} />
//         </IconButton>
//       </CardActions>
//     </CustomCard>
//   );
// }

// export default AccessoryCard;

import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Checkbox from '@mui/material/Checkbox';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // SweetAlert for confirmation dialog
import Flowers from '../../images/categories/flowers.png'; // Replace with actual default image

const CustomCard = styled(Card)({
  position: 'relative',
  minWidth: 180,
  minHeight: 400,
  width: 250,
  height: 350,
  cursor: 'pointer',
  '&:hover .addButton': {
    display: 'block',
  },
});

const AddButton = styled(Button)({
  position: 'absolute',
  top: 0,
  width: '100%',
  borderRadius: 0,
  display: 'none',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});

function AccessoryCard({ accessoryDetails, customerId }) {
  const [value, setValue] = useState(accessoryDetails.rating || 4);
  const [isFavorite, setIsFavorite] = useState(false); // New state to check if the accessory is a favorite
  const navigate = useNavigate();
//  const customerID = customerId;

  useEffect(() => {
    // console.log("customerId:", customerID); // Add this to see if userId is correctly passed.
    // console.log("accessoryDetails:", accessoryDetails.accessoryId); // Add this to see if accessoryDetails is correctly passed.
  }, [customerId, accessoryDetails.accessoryId]);

  useEffect(() => {
    // Check if the accessory is already in the user's favorites when the component loads
    const checkIfFavorite = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/accessory/checkIfFavorite/${customerId}/${accessoryDetails.accessoryId}`,
          { method: 'GET' }
        );
        const data = await response.json();
        setIsFavorite(data.isFavorite); // Assuming the API returns { isFavorite: true/false }
      } catch (error) {
        console.error('Error checking if accessory is favorite:', error);
      }
    };

    checkIfFavorite();
  }, [customerId, accessoryDetails.accessoryId]);

  // const handleAddOrRemoveFromFavorites = async () => {
  //   try {
  //     const action = isFavorite ? 'remove from' : 'add to';
  //     const result = await Swal.fire({
  //       title: `${isFavorite ? 'Remove from Favorites?' : 'Add to Favorites?'}`,
  //       text: `Do you want to ${action} favorites?`,
  //       icon: 'question',
  //       showCancelButton: true,
  //       confirmButtonText: `Yes, ${isFavorite ? 'remove' : 'add'} it!`,
  //       cancelButtonText: 'No, cancel',
  //     });

  //     if (result.isConfirmed) {
  //       // Make API request to add or remove the accessory from favorites
  //       const endpoint = isFavorite
  //         ? 'http://localhost:3001/api/accessory/removeFromFavorites'
  //         : 'http://localhost:3001/api/accessory/addToFavorites';

  //       await fetch(endpoint, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           customerId: customerId,
  //           accessoryId: accessoryDetails.accessoryId,
  //         }),
  //       });

  //       Swal.fire(
  //         `${isFavorite ? 'Removed!' : 'Added!'}`,
  //         `This accessory has been ${isFavorite ? 'removed from' : 'added to'} your favorites.`,
  //         'success'
  //       );

  //       // Toggle the favorite state after successful action
  //       setIsFavorite(!isFavorite);
  //     }
  //   } catch (error) {
  //     console.error('Error updating favorites:', error);
  //     Swal.fire('Error!', `Could not ${isFavorite ? 'remove' : 'add'} the accessory to favorites.`, 'error');
  //   }
  // };


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
            customerId: customerId,
            accessoryId: accessoryDetails.accessoryId,
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
  
  const handleCardClick = () => {
    navigate(`/customer/accessoryView/${accessoryDetails.accessoryId}`);
    window.location.reload(); // Reloads the page when accessory card is clicked
  };

  return (
    <CustomCard key={accessoryDetails.accessoryId} onClick={handleCardClick}>
      <CardMedia
        component="img"
        height="194"
        image={accessoryDetails.image || Flowers}
        alt={accessoryDetails.accessoryName}
      />
      <AddButton className="addButton">Add to Giftbox</AddButton>
      <CardContent>
        <Typography variant="h6" color="black" gutterBottom>
          {accessoryDetails.accessoryName}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Rs. {accessoryDetails.accessoryPrice}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }} disableSpacing>
      <Rating value={accessoryDetails.averageRating || 0} readOnly />
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
      </CardActions>
    </CustomCard>
  );
}

export default AccessoryCard;
