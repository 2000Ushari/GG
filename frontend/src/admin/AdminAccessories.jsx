import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import CreditCardIcon from '@mui/icons-material/CreditCard';

import AdminSidenav from './adminComponents/AdminSidenav';
import AdminNavbar from './adminComponents/AdminNavbar';
import AccessoryList from './adminAccessory/AccessoryList';

export default function AdminAccessories() {
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

  const [cardData, setCardData] = useState([]);

  return (
    <>
      <div className="bgcolor">
        <AdminNavbar />
        <Box height={60} />
        <Box sx={{ display: 'flex' }}>
          <AdminSidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Typography gutterBottom variant="h5" component="div" sx={{ marginLeft: '10px', fontWeight: 'bold' }}>
              Accessories
            </Typography>
            {/* <Grid container spacing={2}> */}
            <Grid item xs={12}>
              <AccessoryList />
            </Grid>
            {/* </Grid> */}
          </Box>
        </Box>
      </div>

      <div>
        <Box sx={{ display: 'flex' }}>
          <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
            
            <Box height={30} />
          </Box>
        </Box>
      </div>
    </>
  );
}
