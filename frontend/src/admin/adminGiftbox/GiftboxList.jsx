import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Modal,
  Box,
  CardActionArea,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Giftbox from '../../images/giftboxes/giftbox1.jpg';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Swal from 'sweetalert2';

import AddGiftbox from './AddGiftbox';
import EditGiftbox from './EditGiftbox';

const GiftboxList = () => {
  const [giftboxes, setGiftboxes] = useState([]);
  const [openAddGiftboxModal, setOpenAddGiftboxModal] = useState(false);
  const [openEditGiftboxModal, setOpenEditGiftboxModal] = useState(false);
  const [openViewGiftboxModal, setOpenViewGiftboxModal] = useState(false);
  const [selectedGiftbox, setSelectedGiftbox] = useState(null);

  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/auth/authenticated', {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.authenticated && res.data.user.role === 'admin') {
          // setUser(res.data.user); // Set user data if authenticated
          // customerId(res.data.user.id);
        } else {
          navigate('/login'); // Redirect to login if not authenticated
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  const fetchGiftboxes = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/giftbox/getGiftbox');
      if (!response.ok) {
        throw new Error('Failed to fetch gift boxes');
      }
      const data = await response.json();
      setGiftboxes(data);
    } catch (error) {
      console.error('Error fetching gift boxes:', error);
    }
  };

  useEffect(() => {
    fetchGiftboxes();
  }, []);

  const handleOpenAddGiftboxModal = () => setOpenAddGiftboxModal(true);
  const handleCloseAddGiftboxModal = () => setOpenAddGiftboxModal(false);

  const handleOpenEditGiftboxModal = (giftbox) => {
    setSelectedGiftbox(giftbox);
    setOpenEditGiftboxModal(true);
  };

  const handleCloseEditGiftboxModal = () => {
    setOpenEditGiftboxModal(false);
    setSelectedGiftbox(null); // Reset selected giftbox
  };

  const handleOpenViewGiftboxModal = (giftbox) => {
    setSelectedGiftbox(giftbox);
    setOpenViewGiftboxModal(true);
  };

  const handleCloseViewGiftboxModal = () => {
    setOpenViewGiftboxModal(false);
    setSelectedGiftbox(null); // Reset selected giftbox
  };

  const deleteGiftbox = async (giftboxID) => {
    try {
      const confirmed = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (confirmed.isConfirmed) {
        const response = await fetch(`http://localhost:3001/api/giftbox/${giftboxID}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete the giftbox');
        }

        // const newRows = rows.filter((row) => row.id !== id);
        // setRows(newRows);

        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting giftbox:', error);
      Swal.fire('Error!', 'Failed to delete the giftbox.', 'error');
    }
  };

  return (
    <>
      <Card>
        <Box height={30} />
        <Grid item xs={12}>
          <Card sx={{ pb: 2, flexGrow: 1 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                marginRight: '20px',
              }}
            >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                sx={{ width: 300, marginLeft: '20px' }}
                renderInput={(params) => <TextField {...params} label="Search by name" />}
              />
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  color="secondary"
                  onClick={handleOpenAddGiftboxModal}
                >
                  Create Giftbox
                </Button>
                <AddGiftbox open={openAddGiftboxModal} closeEvent={handleCloseAddGiftboxModal} />
              </Stack>
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'left',
                paddingLeft: '20px',
              }}
            >
              {giftboxes.map((giftbox) => (
                <Card
                  key={giftbox.giftboxID}
                  sx={{
                    minWidth: 180,
                    minHeight: 345,
                    width: 280,
                    height: 'flex', //changed from 345 to 'flex'
                  }}
                >
                  <CardActionArea onClick={() => handleOpenViewGiftboxModal(giftbox)}>
                    <CardMedia component="img" alt={giftbox.giftboxName} height="200" image={Giftbox} />
                    <CardContent sx={{ textAlign: 'left' }}>
                      <Typography gutterBottom variant="h6" component="div">
                        {giftbox.giftboxName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Rs.{giftbox.giftboxPrice}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center' }}>
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Button variant="outlined" size="small" onClick={() => handleOpenEditGiftboxModal(giftbox)}>
                          <EditIcon />
                        </Button>
                        {selectedGiftbox && (
                          <EditGiftbox
                            open={openEditGiftboxModal}
                            closeEvent={handleCloseEditGiftboxModal}
                            giftbox={selectedGiftbox}
                            giftboxID={selectedGiftbox.giftboxId}
                          />
                        )}
                        <Button variant="outlined" size="large">
                          <DeleteIcon onClick={() => deleteGiftbox(giftbox.giftboxId)} />
                        </Button>
                      </Stack>
                    </CardActions>
                  </CardActionArea>
                </Card>
              ))}
            </div>
          </Card>
        </Grid>
      </Card>
    </>
  );
};

export default GiftboxList;
