// import React, { useEffect } from "react";
// import {
//   Card,
//   CardActions,
//   CardContent,
//   CardMedia,
//   Button,
//   Typography,
//   Stack,
//   CardActionArea,
// } from "@mui/material";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Giftbox from "../../images/giftboxes/giftbox1.jpg";
// import { styled } from '@mui/material/styles';
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

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

// const GiftboxCard = ({ giftbox }) => {
//     const navigate = useNavigate(); // Navigation object to redirect to another page

//       useEffect(() => {
//         console.log("giftbox details:",giftbox);
//       }, [giftbox]);

//     const handleClickMyGB = () => {
//       // Navigate to the detailed view of the selected giftbox
//       navigate(`/customer/giftboxes/view/${giftbox.giftboxId}`);
//     };

//   return (
//     <Card
//       key={giftbox.giftboxID}
//       onClick={() => handleClickMyGB(giftbox.giftboxId)} // Trigger the navigation when card is clicked
//       sx={{
//         minWidth: 180,
//         minHeight: 345,
//         width: 280,
//         height: "flex",
//       }}
//     >
//       <CardActionArea>
//         <CardMedia
//           component="img"
//           alt={giftbox.giftboxName}
//           height="200"
//           image={Giftbox}
//         />
//         <CardContent sx={{ textAlign: "left" }}>
//           <Typography gutterBottom variant="h6" component="div">
//             {giftbox.giftboxName}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Rs.{giftbox.giftboxPrice}
//           </Typography>
//         </CardContent>
//         <CardActions sx={{ justifyContent: "center" }}>
//           <Stack direction="row" spacing={1} justifyContent="center">
//             <Button
//               variant="contained"
//               startIcon={<AddShoppingCartIcon />}
//               color="secondary"
//             >
//               Add to Cart
//             </Button>
//             <Button
//               variant="outlined"
//               color="error"
//               align="center"
//               onClick={(e) => {
//                 e.stopPropagation(); // Prevent card click from triggering navigate
//                 // deleteGiftbox(giftbox.giftboxID); // Delete the selected giftbox
//               }}
//             >
//               <DeleteIcon />
//             </Button>
//           </Stack>
//         </CardActions>
//       </CardActionArea>
//     </Card>
//   );
// };

// export default GiftboxCard;

import React, { useEffect } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Stack, CardActionArea } from '@mui/material';
import EditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import GiftboxImage from '../../images/giftboxes/giftbox1.jpg'; // Ensure this image path is correct
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

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

const GiftboxCard = ({ giftbox }) => {
  const navigate = useNavigate();

  const handleClickMyGB = () => {
    // Navigate to the detailed view of the selected giftbox - will be navigated to MyGiftbox.jsx file
    navigate(`/customer/giftboxes/view/${giftbox.giftboxId}`);
  };

  // const handleClickCheckout = () => {
  //   // Navigate to the checkout page
  //   navigate(`/customer/cart/${giftbox.giftboxId}`);
  // }

  return (
    <CustomCard key={giftbox.giftboxId}>
      <CardActionArea>
        <CardMedia component="img" alt={giftbox.giftboxName || 'Giftbox'} height="200" image={GiftboxImage} />
        <CardContent sx={{ textAlign: 'left' }}>
          <Typography gutterBottom variant="h6" component="div">
            {giftbox.giftboxName || 'No Name'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rs.{giftbox.giftboxPrice || 'Price Unavailable'}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Stack direction="row" spacing={1} justifyContent="center">
            <Button variant="contained" startIcon={<EditIcon />} color="secondary" onClick={handleClickMyGB}>
              Edit Giftbox
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click from triggering navigation
                // Call delete function here if needed
              }}
            >
              <DeleteIcon />
            </Button>
          </Stack>
        </CardActions>
      </CardActionArea>
    </CustomCard>
  );
};

export default GiftboxCard;
