import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Stack from '@mui/material/Stack';
import Giftbox from '../../images/giftboxes/giftbox1.jpg';

import NavbarCustomerAfterSignedIn from '../customerComponent/NavbarCustomerAfterSignedIn';
import CustomerSidenav from '../customerComponent/CustomerSidenav';

function CustomGiftboxesList() {
  const navigate = useNavigate();
  const [giftboxes, setGiftboxes] = useState([]);
  const [openEditGiftboxModal, setOpenEditGiftboxModal] = useState(false);
  const [openViewGiftboxModal, setOpenViewGiftboxModal] = useState(false);
  const [selectedGiftbox, setSelectedGiftbox] = useState(null);

  const handleOpenViewGiftboxModal = (giftbox) => {
    setSelectedGiftbox(giftbox);
    setOpenViewGiftboxModal(true);
  };

  const handleCloseViewGiftboxModal = () => {
    setOpenViewGiftboxModal(false);
    setSelectedGiftbox(null); // Reset selected giftbox
  };

  // Authentication check
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/auth/authenticated', {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.authenticated && res.data.user.role === 'customer') {
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

  const fetchDefaultGiftboxes = async () => {
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
    fetchDefaultGiftboxes();
  }, []);

  return (
    <>
      <NavbarCustomerAfterSignedIn />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <CustomerSidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Giftboxes</h1>
          <h2>Custom Giftboxes</h2>
          <p>Pre-made giftboxes are created by us, for you....</p>

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
                      <Button
                        variant="contained"
                        startIcon={<AddShoppingCartIcon />}
                        color="secondary"
                        // onClick={handleOpenAddToCartboxModal} navigates to add to cart
                      >
                        Checkout
                      </Button>
                    </Stack>
                  </CardActions>
                </CardActionArea>
              </Card>
            ))}
            {/* Show some custom giftboxes and when it clicked show what accessories are inside of it */}
          </div>
        </Box>
      </Box>
    </>
  );
}

export default CustomGiftboxesList;
