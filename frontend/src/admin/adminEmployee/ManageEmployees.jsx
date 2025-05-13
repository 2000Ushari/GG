import React from 'react';
import { Box } from '@mui/material';

import AdminSidenav from '../adminComponents/AdminSidenav';
import AdminNavbar from '../adminComponents/AdminNavbar';
import RegisterEmployee from './RegisterEmployee';
import EmployeeTable from './EmployeeTable';

function ManageEmployees() {
  return (
    <>
      <div className="bgcolor">
        <AdminNavbar />
        <Box height={60} />
        <Box sx={{ display: 'flex' }}>
          <AdminSidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3, alignSelf: 'left' }}>
            <RegisterEmployee />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <EmployeeTable />
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default ManageEmployees;
