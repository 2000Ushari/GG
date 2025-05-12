import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

import NavbarCustomerAfterSignedIn from './customerComponent/NavbarCustomerAfterSignedIn';
import CustomerSidenav from './customerComponent/CustomerSidenav';

function Settings() {
  return (
    <>
      <NavbarCustomerAfterSignedIn />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <CustomerSidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Settings</h1>
          <h6>Payment methods</h6>
          <h6>shipping addresses</h6>
          <h6>other settings</h6>
        </Box>
      </Box>
    </>
  );
}

export default Settings;
