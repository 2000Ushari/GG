import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';

import AdminSidenav from './adminComponents/AdminSidenav';
import AdminNavbar from './adminComponents/AdminNavbar';

const AdminProfile = ({ userDetails, onSave }) => {
  const [adminDetails, setAdminDetails] = useState(userDetails.roleDetails);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails({ ...adminDetails, [name]: value });
  };

  const handleSave = () => {
    onSave(adminDetails);
  };

  return (
    <>
      <div className="bgcolor">
        <AdminNavbar />
        <Box sx={{ display: 'flex' }}>
          <AdminSidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ marginLeft: '10px', fontWeight: 'bold', pb: 2 }}
            >
              My Profile
            </Typography>
            <Grid container spacing={1}>
              <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#ffffff', borderRadius: '10px' }}>
                <Typography gutterBottom variant="h5" component="div" sx={{}}>
                  Welcome, {adminDetails.adminFirstName}!
                </Typography>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  <h4>Your Details</h4>
                  <TextField
                    label="First Name"
                    name="adminFirstName"
                    value={adminDetails.adminFirstName}
                    onChange={handleChange}
                    sx={{ width: '40%', m: 2 }}
                  />
                  <TextField
                    label="Last Name"
                    name="adminLastName"
                    value={adminDetails.adminLastName}
                    onChange={handleChange}
                    sx={{ width: '40%', m: 2 }}
                  />
                  <TextField
                    label="Contact"
                    name="adminContact"
                    value={adminDetails.adminContact || ''}
                    onChange={handleChange}
                    sx={{ width: '40%', m: 2 }}
                  />
                  <br />
                  <Button sx={{ m: 2 }} variant="contained" onClick={handleSave}>
                    Save
                  </Button>
                </Typography>
              </Box>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default AdminProfile;
