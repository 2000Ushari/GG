import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import AdminSidenav from './adminComponents/AdminSidenav';
import AdminNavbar from './adminComponents/AdminNavbar';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OrderTabs from './adminOrder/OrderTabs';

function AdminOrder() {
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card sx={{ height: 100 + 'vh', flexGrow: 1 }}>
                  <CardContent>
                    <OrderTabs />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default AdminOrder;
