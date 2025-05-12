import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import AdminSidenav from '../adminComponents/AdminSidenav';
import AdminNavbar from '../adminComponents/AdminNavbar';
import DistrictTable from './DistrictTable';
import StockTable from './StockTable';
import SizesTable from './SizesTable';
import { Button } from '@mui/material';

// //css components
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

function Configurations() {
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

  return (
    <>
      <div className="bgcolor">
        <AdminNavbar />
        <Box height={60} />
        <Box sx={{ display: 'flex' }}>
          <AdminSidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Typography gutterBottom variant="h5" component="div" sx={{ marginLeft: '10px', fontWeight: 'bold' }}>
              Configurations
            </Typography>
            <Grid item xs={6}>
              <DistrictTable />
            </Grid>
            <Grid item xs={6}>
              <StockTable />
            </Grid>
            <Grid item xs={6}>
              <SizesTable />
            </Grid>
            <Grid item xs={12} />
          </Box>
        </Box>
      </div>
    </>
  );
}

export default Configurations;
