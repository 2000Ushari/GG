// import { Box, Grid, Stack, Typography, Card, CardContent } from '@mui/material';
// import React from 'react';
// import Button from '@mui/material/Button';
// import AddIcon from '@mui/icons-material/Add';

// function GiftboxView() {
//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 2 }}>
//       <Grid container justifyContent="space-between" alignItems="center">
//         <Grid item>
//           <Typography variant="h6">My Gift Box Collection</Typography>
//         </Grid>
//         <Grid item>
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             color="secondary"
//             // onClick={handleOpenAddGiftboxModal}
//           >
//             Create New Gift Box
//           </Button>
//         </Grid>
//       </Grid>
//       <Box sx={{ marginTop: 4 }}>
//         <Grid container spacing={2}>
//           {/* Example cards, replace with actual card content */}
//           <Grid item xs={12} sm={6} md={4}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h5">Gift Box 1</Typography>
//                 <Typography variant="body2">Description of Gift Box 1.</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h5">Gift Box 2</Typography>
//                 <Typography variant="body2">Description of Gift Box 2.</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           {/* Add more cards as needed */}
//         </Grid>
//       </Box>
//     </Box>
//   );
// }

// export default GiftboxView;


import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Card, CardContent, Accordion, AccordionSummary, AccordionDetails, TextField, Button, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import EditGiftboxDetails from './EditGiftboxDetails'

function GiftboxView() {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [giftboxName, setGiftboxName] = useState('My Gift Box 1');
  const [giftboxDescription, setGiftboxDescription] = useState('This is a description of the gift box.');
  const [noteContent, setNoteContent] = useState('A special note content.');
  const [color, setColor] = useState('Red');

  const navigate = useNavigate();

  const [accessories, setAccessories] = useState([
    {
      id: 1,
      name: 'Accessory 1',
      description: 'Description for accessory 1',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Accessory 2',
      description: 'Description for accessory 2',
      image: 'https://via.placeholder.com/150',
    },
    // Add more accessories as needed
  ]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleESave = () => {
    setIsEditing(false);
    // Add logic to save the updated details if needed
  };

    // Authentication check
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/api/auth/authenticated", {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       if (res.data.authenticated && res.data.user.role === "customer") {
  //         // setUser(res.data.user); // Set user data if authenticated
  //         // customerId(res.data.user.id);
  //       } else {
  //         navigate("/login"); // Redirect to login if not authenticated
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [navigate]);


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h6">My Gift Box Collection</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            color="secondary"
            // onClick={handleOpenAddGiftboxModal}
          >
            Create New Gift Box
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 4 }}>
        <Grid container spacing={2}>
          {[1, 2, 3, 4].map((index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ flexGrow: 1 }}>
                      {isEditing ? (
                        <>
                          <TextField
                            label="Gift Box Name"
                            value={giftboxName}
                            onChange={(e) => setGiftboxName(e.target.value)}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="Description"
                            value={giftboxDescription}
                            onChange={(e) => setGiftboxDescription(e.target.value)}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="Note Content"
                            value={noteContent}
                            onChange={(e) => setNoteContent(e.target.value)}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="Color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            fullWidth
                            margin="normal"
                          />
                        </>
                      ) : (
                        <>
                          <Typography variant="h5">{giftboxName}</Typography>
                          <Typography variant="body1">{giftboxDescription}</Typography>
                          <Typography variant="body2">{noteContent}</Typography>
                          <Typography variant="body2">Color: {color}</Typography>
                        </>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                      
                      <Button variant="contained" color="success" size='medium' sx={{ mb: 4 }}>
                        Purchase
                      </Button>
                    

                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                      <Button
                        variant="outlined"
                        size='small'
                        onClick={<EditGiftboxDetails/>}
                        // onClick={isEditing ? handleESave : handleEditToggle}
                        // sx={{ mr: 2, mb: 2}}
                      >
                        {isEditing ? 'Save' : 'Edit'}
                        </Button>

                        <Button
                       
                        variant="outlined"
                        size='small'
                        color='error'
                        sx={{ mb: 2}}
                      >
                      </Button>
                    
                    </Box>
                    </Box>
                  </Box>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Accessories</Typography>
                    </AccordionSummary>
                    {accessories.map((accessory) => (
                      <AccordionDetails key={accessory.id}>
                        <Card elevation={0}>
                          <Grid container spacing={2}>
                            <Grid item xs={4}>
                              <img src={accessory.image} alt={accessory.name} style={{ width: '100%' }} />
                            </Grid>
                            <Grid item xs={8}>
                              <Typography variant="h6">{accessory.name}</Typography>
                              <Typography variant="body2">{accessory.description}</Typography>
                            </Grid>
                          </Grid>
                        </Card>
                      </AccordionDetails>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default GiftboxView;
