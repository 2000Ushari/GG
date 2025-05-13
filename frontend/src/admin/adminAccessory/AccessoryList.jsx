// import React, { useEffect, useState } from 'react';
// import { Card, CardActions, CardContent, CardMedia, Button, Typography, Modal, Box } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Stack from '@mui/material/Stack';
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
// import AddIcon from '@mui/icons-material/Add';
// import Grid from '@mui/material/Grid';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// import NecklaceImage from '../../images/accessories/necklaces.jpg';
// import AddAccessory from './AddAccessory';
// import EditAccessory from './EditAccessory';

// const AccessoryList = () => {
//   const navigate = useNavigate();

//   // Authentication check
//   useEffect(() => {
//     axios
//       .get('http://localhost:3001/api/auth/authenticated', {
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (res.data.authenticated && res.data.user.role === 'admin') {
//           // setUser(res.data.user); // Set user data if authenticated
//           // customerId(res.data.user.id);
//         } else {
//           navigate('/login'); // Redirect to login if not authenticated
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [navigate]);

//   const [accessories, setAccessories] = useState([]);
//   const [openAddAccessoryModal, setOpenAddAccessoryModal] = useState(false);
//   const [openEditAccessoryModal, setOpenEditAccessoryModal] = useState(false);
//   const [selectedAccessory, setSelectedAccessory] = useState(null);

//   const fetchAccessories = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/api/accessory/getAccessory');
//       if (!response.ok) {
//         throw new Error('Failed to fetch accessories');
//       }
//       const data = await response.json();
//       setAccessories(data);
//     } catch (error) {
//       console.error('Error fetching accessories:', error);
//     }
//   };

//   useEffect(() => {
//     fetchAccessories();
//   }, []);

//   const handleOpenAddAccessoryModal = () => setOpenAddAccessoryModal(true);
//   const handleCloseAddAccessoryModal = () => setOpenAddAccessoryModal(false);

//   const handleOpenEditAccessoryModal = (accessory) => {
//     setSelectedAccessory(accessory);
//     setOpenEditAccessoryModal(true);
//   };

//   const handleCloseEditAccessoryModal = () => {
//     setOpenEditAccessoryModal(false);
//     setSelectedAccessory(null); // Reset selected accessory
//   };

//   const handleCardClick = () => {
//     navigate(`/admin/accessory/add`);
//     window.location.reload(); // Reloads the page when accessory card is clicked
//   };

//   const deleteAccessory = async (accessoryID) => {
//     try {
//       const confirmed = await Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!',
//       });

//       if (confirmed.isConfirmed) {
//         const response = await fetch(`http://localhost:3001/api/accessory/${accessoryID}`, {
//           method: 'DELETE',
//         });

//         if (!response.ok) {
//           throw new Error('Failed to delete the accessory');
//         }

//         // const newRows = rows.filter((row) => row.id !== id);
//         // setRows(newRows);

//         Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
//         window.location.reload();
//       }
//     } catch (error) {
//       console.error('Error deleting accessory:', error);
//       Swal.fire('Error!', 'Failed to delete the accessory.', 'error');
//     }
//   };

//   return (
//     <>
//       <Card>
//         <Box height={30} />
//         <Grid item xs={12}>
//           <Card sx={{ pb: 2, flexGrow: 1 }}>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 marginBottom: '20px',
//                 marginRight: '20px',
//               }}
//             >
//               <Autocomplete
//                 disablePortal
//                 id="combo-box-demo"
//                 sx={{ width: 300, marginLeft: '20px' }}
//                 renderInput={(params) => <TextField {...params} label="Search by name" />}
//               />
//               <Stack direction="row" spacing={2} pr={1.5}>
//                 <Button variant="contained" startIcon={<AddIcon />} onClick={handleCardClick}>
//                   Add Accessory
//                 </Button>
//                 {/* <AddAccessory
//                   open={openAddAccessoryModal}
//                   closeEvent={handleCloseAddAccessoryModal}
//                 /> */}
//               </Stack>
//             </div>
//             <div
//               style={{
//                 display: 'flex',
//                 flexWrap: 'wrap',
//                 gap: '20px',
//                 justifyContent: 'left',
//                 paddingLeft: '20px',
//               }}
//             >
//               {accessories.map((accessory) => (
//                 <Card
//                   key={accessory.accessoryID}
//                   sx={{
//                     minWidth: 180,
//                     minHeight: 400,
//                     width: 280,
//                     height: 350,
//                   }}
//                 >
//                   <CardMedia component="img" alt={accessory.accessoryName} height="200" image={NecklaceImage} />
//                   <CardContent sx={{ textAlign: 'left' }}>
//                     <Typography gutterBottom variant="h6" component="div">
//                       {accessory.accessoryName}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Rs.{accessory.accessoryPrice}
//                     </Typography>
//                   </CardContent>
//                   <CardActions sx={{ justifyContent: 'center' }}>
//                     <Stack direction="row" spacing={1} justifyContent="center">
//                       <Button variant="outlined" size="small" onClick={() => handleOpenEditAccessoryModal(accessory)}>
//                         <EditIcon />
//                       </Button>
//                       {selectedAccessory && (
//                         <EditAccessory
//                           open={openEditAccessoryModal}
//                           closeEvent={handleCloseEditAccessoryModal}
//                           accessory={selectedAccessory}
//                           accessoryID={selectedAccessory.accessoryId}
//                         />
//                       )}
//                       <Button variant="outlined" size="large">
//                         <DeleteIcon onClick={() => deleteAccessory(accessory.accessoryId)} />
//                       </Button>
//                     </Stack>
//                   </CardActions>
//                 </Card>
//               ))}
//             </div>
//           </Card>
//         </Grid>
//       </Card>
//     </>
//   );
// };

// export default AccessoryList;

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  Grid,
  Stack,
  Autocomplete,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import NecklaceImage from '../../images/accessories/necklaces.jpg';
import EditAccessory from './EditAccessory';

const AccessoryList = () => {
  const navigate = useNavigate();
  const [accessories, setAccessories] = useState([]);
  const [openEditAccessoryModal, setOpenEditAccessoryModal] = useState(false);
  const [selectedAccessory, setSelectedAccessory] = useState(null);

  const fetchAccessories = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/accessory/getAccessory');
      if (!response.ok) throw new Error('Failed to fetch accessories');
      const data = await response.json();
      setAccessories(data);
    } catch (error) {
      console.error('Error fetching accessories:', error);
    }
  };

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/auth/authenticated', { withCredentials: true })
      .then((res) => {
        if (!(res.data.authenticated && res.data.user.role === 'admin')) navigate('/login');
      })
      .catch((err) => console.log(err));

    fetchAccessories();
  }, [navigate]);

  const handleCardClick = () => {
    navigate(`/admin/accessory/add`);
    window.location.reload();
  };

  const handleOpenEditAccessoryModal = (accessory) => {
    setSelectedAccessory(accessory);
    setOpenEditAccessoryModal(true);
  };

  const handleCloseEditAccessoryModal = () => {
    setOpenEditAccessoryModal(false);
    setSelectedAccessory(null);
  };

  const toggleAccessoryStatus = async (accessory) => {
    const newStatus = accessory.acsStatus === 'Active' ? 'Inactive' : 'Active';

    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `This will change the accessory status to "${newStatus}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: newStatus === 'Active' ? '#28a745' : '#d33',
      cancelButtonColor: '#999',
      confirmButtonText: `Yes, change to ${newStatus}`,
    });

    if (result.isConfirmed) {
      try {
        await axios.put(`http://localhost:3001/api/accessory/updateStatus/${accessory.accessoryId}`, {
          acsStatus: newStatus,
        });
        Swal.fire('Updated!', `Accessory is now "${newStatus}".`, 'success');
        fetchAccessories();
      } catch (error) {
        console.error('Status update failed:', error);
        Swal.fire('Error', 'Failed to update accessory status.', 'error');
      }
    }
  };

  return (
    <>
      <Card>
        <Box height={30} />
        <Grid item xs={12}>
          <Card sx={{ pb: 2, flexGrow: 1 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} mr={2}>
              <Autocomplete
                disablePortal
                id="search-box"
                sx={{ width: 300, ml: 2 }}
                renderInput={(params) => <TextField {...params} label="Search by name" />}
              />
              <Stack direction="row" spacing={2} pr={1.5}>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleCardClick}>
                  Add Accessory
                </Button>
              </Stack>
            </Box>
            <Box display="flex" flexWrap="wrap" gap={2} pl={2}>
              {accessories.map((accessory) => (
                <Card key={accessory.accessoryId} sx={{ minWidth: 180, width: 280, height: 360 }}>
                  <CardMedia component="img" alt={accessory.accessoryName} height="200" image={NecklaceImage} />
                  <CardContent sx={{ textAlign: 'left' }}>
                    <Typography gutterBottom variant="h6">
                      {accessory.accessoryName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Rs. {accessory.accessoryPrice}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      Status: {accessory.acsStatus}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center' }}>
                    <Stack direction="row" spacing={1}>
                      <Button variant="outlined" size="small" onClick={() => handleOpenEditAccessoryModal(accessory)}>
                        <EditIcon />
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        color={accessory.acsStatus === 'Active' ? 'error' : 'success'}
                        onClick={() => toggleAccessoryStatus(accessory)}
                      >
                        {accessory.acsStatus === 'Active' ? 'Inactivate' : 'Activate'}
                      </Button>
                    </Stack>
                  </CardActions>
                </Card>
              ))}
              {selectedAccessory && (
                <EditAccessory
                  open={openEditAccessoryModal}
                  closeEvent={handleCloseEditAccessoryModal}
                  accessory={selectedAccessory}
                  accessoryID={selectedAccessory.accessoryId}
                />
              )}
            </Box>
          </Card>
        </Grid>
      </Card>
    </>
  );
};

export default AccessoryList;
