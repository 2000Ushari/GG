import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AdminSidenav from '../adminComponents/AdminSidenav';
import AdminNavbar from '../adminComponents/AdminNavbar';

function ViewEmployee() {
  const { employeeId } = useParams(); // Get employeeID from URL parameters
  const [employee, setEmployee] = useState(null);
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

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/employee/getEmployeeById/${employeeId}`);
        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  return (
    <>
      <div className="bgcolor">
        <AdminNavbar />
        <Box height={60} />
        <Box sx={{ display: 'flex' }}>
          <AdminSidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Box color="#ffffff" sx={{ backgroundColor: '#000000', borderRadius: '10px', flexGrow: 1, p: 2 }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ marginLeft: '10px', fontWeight: 'bold', pb: 2 }}
              >
                Employee Details
              </Typography>
            </Box>
            <br />
            <Grid container spacing={1}>
              <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#ffffff', borderRadius: '10px' }}>
                {employee ? (
                  <Box>
                    <TextField label="First Name" value={employee.employeeFirstName} fullWidth margin="normal" />
                    <TextField label="Last Name" value={employee.employeeLastName} fullWidth margin="normal" />
                    <TextField label="Contact" value={employee.employeeContact} fullWidth margin="normal" />
                    <TextField label="NIC" value={employee.employeeNIC} fullWidth margin="normal" />
                    <TextField label="Address" value={employee.employeeAddress} fullWidth margin="normal" />
                    <TextField label="Working Status" value={employee.workingStatus} fullWidth margin="normal" />
                    <TextField label="Started date" value={employee.startDate} fullWidth margin="normal" />
                    <TextField label="End date" value={employee.endDate} fullWidth margin="normal" />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => Swal.fire('Employee details updated!')}
                      sx={{ mt: 2 }}
                    >
                      Save
                    </Button>
                  </Box>
                ) : (
                  <Typography variant="body1">Loading...</Typography>
                )}
              </Box>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default ViewEmployee;
