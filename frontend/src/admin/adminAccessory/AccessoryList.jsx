

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
