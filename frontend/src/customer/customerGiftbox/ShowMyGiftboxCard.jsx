// import React from 'react';
// import { Box, Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import Giftbox from "../../images/giftboxes/giftbox1.jpg";

// function ShowMyGiftboxCard({ giftboxDetails }) {
//   return (
//     <>
//       <Box height={20}></Box>
//       <Grid container spacing={2}>
//         {/* Show the cards if there are any giftboxes */}
//         {giftboxDetails.length > 0 ? (
//           giftboxDetails.map((giftbox, index) => (
//             <Grid item xs={12} key={index}>
//               <Card
//                 sx={{
//                   minWidth: 400,
//                   minHeight: 120,
//                   width: 500,
//                   height: 130
//                 }}
//               >
//                 <CardContent>
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <CardMedia
//                       component="img"
//                       image={Giftbox}
//                       alt="Gift Box"
//                       sx={{ height: 100, width: 100, objectFit: "cover" }}
//                     />
//                     <Box sx={{ flexGrow: 1, ml: 2, mr: 2 }}>
//                       {/* Display giftbox name */}
//                       <Typography variant="body1" align="left">
//                         {giftbox.giftboxName}
//                       </Typography>
//                     </Box>
//                     <Button
//                       variant="outlined"
//                       color="primary"
//                       startIcon={<AddIcon />}
//                       cursor="pointer"
//                     >
//                       Add
//                     </Button>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           //if there's no giftboxes created by the user this is the message to show
//           <Typography variant="body2" color="textSecondary" sx={{  margin: 2 }}>
//             No gift boxes available.
//           </Typography>
//         )}
//       </Grid>
//     </>
//   );
// }

// export default ShowMyGiftboxCard;

// import React from 'react';
// import { Box, Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import Giftbox from "../../images/giftboxes/giftbox1.jpg";

// function ShowMyGiftboxCard({ giftboxDetails }) {
//   return (
//     <>
//       <Box
//         sx={{
//           height: 20,
//         }}
//       ></Box>

//       <Grid
//         container
//         spacing={2}
//         justifyContent="center" // Centers the grid items horizontally
//         sx={{
//           maxHeight: '500px', // Adjust this height based on your modal size
//           overflowY: 'auto', // Adds scrolling when there are many gift boxes
//         }}
//       >
//         {/* Show the cards if there are any giftboxes */}
//         {giftboxDetails.length > 0 ? (
//           giftboxDetails.map((giftbox, index) => (
//             <Grid item xs={12} key={index} display="flex" justifyContent="center">
//               <Card
//                 sx={{
//                   minWidth: 400,
//                   minHeight: 150,
//                   width: 500,
//                   height: 150,
//                   display: 'flex',
//                   justifyContent: 'center', // Centers the card content horizontally
//                   alignItems: 'center', // Centers the card content vertically
//                   marginBottom: 3,
//                 }}
//               >
//                 <CardContent>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <CardMedia
//                       component="img"
//                       image={Giftbox}
//                       alt="Gift Box"
//                       sx={{ height: 100, width: 100, objectFit: 'cover' }}
//                     />
//                     <Box sx={{ flexGrow: 1, ml: 2, mr: 2 }}>
//                       {/* Display giftbox name */}
//                       <Typography variant="body1" align="left">
//                         {giftbox.giftboxName}
//                       </Typography>
//                       {/* Display giftbox creation date in grey font below the name */}
//                       <Typography variant="body2" color="textSecondary" align="left">
//                         Created on: {new Date(giftbox.createdDate).toLocaleDateString()}
//                       </Typography>
//                     </Box>
//                     <Button
//                       variant="outlined"
//                       color="primary"
//                       startIcon={<AddIcon />}
//                       cursor="pointer"
//                       sx={{ marginLeft: 4 }}
//                     >
//                       Add
//                     </Button>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           // If there are no giftboxes created by the user, show this message
//           <Typography variant="body2" color="textSecondary" sx={{ margin: 2 }}>
//             No gift boxes available.
//           </Typography>
//         )}
//       </Grid>
//     </>
//   );
// }

// export default ShowMyGiftboxCard;

// import React from 'react';
// import { Box, Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import { useNavigate } from 'react-router-dom'; // To handle navigation
// import Giftbox from "../../images/giftboxes/giftbox1.jpg";

// function ShowMyGiftboxCard({ giftboxDetails, selectedAccessory }) {
//   const navigate = useNavigate(); // Used for navigation

//   // Function to handle the "Add" button click
//   const handleAddClick = (giftbox) => {
//     // Navigate to the AddAccessoryToMyGiftbox component, passing giftbox and accessory details
//     navigate('/add-accessory', {
//       state: {
//         giftbox,
//         selectedAccessory // Passing the selected accessory details
//       }
//     });
//   };

//   return (
//     <>
//       <Box sx={{ height: 20 }}></Box>
//       <Grid
//         container
//         spacing={2}
//         justifyContent="center"
//         sx={{
//           maxHeight: '500px',
//           overflowY: 'auto', // Adds scrolling when there are many gift boxes
//         }}
//       >
//         {giftboxDetails.length > 0 ? (
//           giftboxDetails.map((giftbox, index) => (
//             <Grid item xs={12} key={index} display="flex" justifyContent="center">
//               <Card
//                 sx={{
//                   minWidth: 400,
//                   minHeight: 150,
//                   width: 500,
//                   height: 150,
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   marginBottom: 3,
//                 }}
//               >
//                 <CardContent>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <CardMedia
//                       component="img"
//                       image={Giftbox}
//                       alt="Gift Box"
//                       sx={{ height: 100, width: 100, objectFit: 'cover' }}
//                     />
//                     <Box sx={{ flexGrow: 1, ml: 2, mr: 2 }}>
//                       <Typography variant="body1" align="left">
//                         {giftbox.giftboxName}
//                       </Typography>
//                       <Typography variant="body2" color="textSecondary" align="left">
//                         Created on: {new Date(giftbox.createdAt).toLocaleDateString()}
//                       </Typography>
//                     </Box>
//                     <Button
//                       variant="outlined"
//                       color="primary"
//                       startIcon={<AddIcon />}
//                       cursor="pointer"
//                       sx={{ marginLeft: 4 }}
//                       onClick={() => handleAddClick(giftbox)} // Add the click handler
//                     >
//                       Add
//                     </Button>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           <Typography variant="body2" color="textSecondary" sx={{ margin: 2 }}>
//             No gift boxes available.
//           </Typography>
//         )}
//       </Grid>
//     </>
//   );
// }

// export default ShowMyGiftboxCard;

// import React, { useState } from 'react';
// import { Box, Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import Giftbox from "../../images/giftboxes/giftbox1.jpg";
// import AddAccessoryToMyGiftbox from './AddAccessoryMyGiftbox'; // Import the component

// function ShowMyGiftboxCard({ giftboxDetails, selectedAccessory }) {
//   const [showAddAccessory, setShowAddAccessory] = useState(false);
//   const [selectedGiftboxId, setSelectedGiftboxId] = useState(null);

//   const handleAddClick = (giftboxId) => {
//     setSelectedGiftboxId(giftboxId);
//     setShowAddAccessory(true);
//   };

//   return (
//     <>
//       <Box sx={{ height: 20 }}></Box>
//       <Grid
//         container
//         spacing={2}
//         justifyContent="center"
//         sx={{
//           maxHeight: '500px',
//           overflowY: 'auto',
//         }}
//       >
//         {giftboxDetails.length > 0 ? (
//           giftboxDetails.map((giftbox, index) => (
//             <Grid item xs={12} key={index} display="flex" justifyContent="center">
//               <Card
//                 sx={{
//                   minWidth: 400,
//                   minHeight: 150,
//                   width: 500,
//                   height: 150,
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   marginBottom: 3,
//                 }}
//               >
//                 <CardContent>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <CardMedia
//                       component="img"
//                       image={Giftbox}
//                       alt="Gift Box"
//                       sx={{ height: 100, width: 100, objectFit: 'cover' }}
//                     />
//                     <Box sx={{ flexGrow: 1, ml: 2, mr: 2 }}>
//                       <Typography variant="body1" align="left">
//                         {giftbox.giftboxName}
//                       </Typography>
//                       <Typography variant="body2" color="textSecondary" align="left">
//                         Created on: {new Date(giftbox.createdAt).toLocaleDateString()}
//                       </Typography>
//                     </Box>
//                     <Button
//                       variant="outlined"
//                       color="primary"
//                       startIcon={<AddIcon />}
//                       cursor="pointer"
//                       sx={{ marginLeft: 4 }}
//                       onClick={() => handleAddClick(giftbox.giftboxId)} // Pass giftbox ID
//                     >
//                       Add
//                     </Button>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           <Typography variant="body2" color="textSecondary" sx={{ margin: 2 }}>
//             No gift boxes available.
//           </Typography>
//         )}
//       </Grid>

//       {/* Conditionally render the AddAccessoryToMyGiftbox component */}
//       {showAddAccessory && (
//         <AddAccessoryToMyGiftbox
//           giftboxId={selectedGiftboxId}
//           accessoryId={selectedAccessory.accessoryId} // Assuming selectedAccessory has accessoryId
//           onClose={() => setShowAddAccessory(false)} // Callback to close the component
//         />
//       )}
//     </>
//   );
// }

// export default ShowMyGiftboxCard;

import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import Giftbox from '../../images/giftboxes/giftbox1.jpg';

function ShowMyGiftboxCard({ giftboxDetails, selectedAccessory, selectedQuantity, selectedSizeId }) {
  const [giftboxItem, setGiftboxItem] = useState(null);

  const handleAddClick = async (giftbox) => {
    const addAccessoryToMyGiftbox = async () => {
      if (!selectedSizeId) {
        selectedSizeId = 1;
      }
      try {
        const response = await axios.post('http://localhost:3001/api/accessory/addAccessoryToMyGiftbox', {
          giftboxId: giftbox.giftboxId,
          accessoryId: selectedAccessory,
          quantity: selectedQuantity,
          sizeId: selectedSizeId,
        });

        console.log('Accessory added to giftbox', response.data);
        setGiftboxItem(giftbox);
      } catch (error) {
        console.error('Error adding accessory to giftbox:', error);
      }
    };
    await addAccessoryToMyGiftbox();
  };

  return (
    <>
      {giftboxItem && (
        <div>
          <h4 sx={{ color: 'green' }}>Added accessory to "{giftboxItem.giftboxName}" Giftbox successfully!</h4>
        </div>
      )}
      <Box sx={{ height: 20 }}></Box>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{
          maxHeight: '500px',
          overflowY: 'auto',
        }}
      >
        {giftboxDetails.length > 0 ? (
          giftboxDetails.map((giftbox, index) => (
            <Grid item xs={12} key={index} display="flex" justifyContent="center">
              <Card
                sx={{
                  minWidth: 400,
                  minHeight: 150,
                  width: 500,
                  height: 150,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 3,
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CardMedia
                      component="img"
                      image={Giftbox}
                      alt="Gift Box"
                      sx={{ height: 100, width: 100, objectFit: 'cover' }}
                    />
                    <Box sx={{ flexGrow: 1, ml: 2, mr: 2 }}>
                      <Typography variant="body1" align="left">
                        {giftbox.giftboxName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" align="left">
                        Created on: {new Date(giftbox.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<AddIcon />}
                      cursor="pointer"
                      sx={{ marginLeft: 4 }}
                      onClick={() => handleAddClick(giftbox)}
                    >
                      Add
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary" sx={{ margin: 2 }}>
            No gift boxes available.
          </Typography>
        )}
      </Grid>
    </>
  );
}

export default ShowMyGiftboxCard;
