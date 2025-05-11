import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavbarCustomerAfterSignedIn from './customerComponent/NavbarCustomerAfterSignedIn';
import CustomerSidenav from './customerComponent/CustomerSidenav';

const CustomerProfile = ({ userDetails, onSave }) => {
  const [customerDetails, setCustomerDetails] = useState(userDetails.roleDetails);
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  const handleSave = () => {
    onSave(customerDetails);
  };

  return (
    <>
      <NavbarCustomerAfterSignedIn />
      <Box height={30} />
      <Box>
        <CustomerSidenav />
        <Box marginLeft={50}></Box>
        <Box>
          <h3>Your Details</h3>
          <TextField
            label="First Name"
            name="customerFirstName"
            value={customerDetails.customerFirstName}
            onChange={handleChange}
            sx={{ width: '40%', m: 2 }}
          />
          <TextField
            label="Last Name"
            name="customerLastName"
            value={customerDetails.customerLastName}
            onChange={handleChange}
            sx={{ width: '40%', m: 2 }}
          />
          <TextField
            label="Date of Birth"
            name="customerDob"
            value={customerDetails.customerDob || ''}
            onChange={handleChange}
            sx={{ width: '40%', m: 2 }}
          />
          <TextField
            label="Contact"
            name="customerContact"
            value={customerDetails.customerContact || ''}
            onChange={handleChange}
            sx={{ width: '40%', m: 2 }}
          />
          <TextField
            label="Address"
            name="customerAddress"
            value={customerDetails.customerAddress || ''}
            onChange={handleChange}
            sx={{ width: '82.5%', m: 2 }}
          />
          <TextField
            label="City"
            name="customerAddressCity"
            value={customerDetails.customerAddressCity || ''}
            onChange={handleChange}
            sx={{ width: '40%', m: 2 }}
          />
          {/* This should be a dropdown, at should be retrieved from the delivery_district table in DB*/}
          <TextField
            label="District"
            name="customerAddressDistrict"
            value={customerDetails.deliveryDistrictId || ''}
            onChange={handleChange}
            sx={{ width: '40%', m: 2 }}
          />
          <br />
          <Button sx={{ m: 2 }} variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CustomerProfile;
