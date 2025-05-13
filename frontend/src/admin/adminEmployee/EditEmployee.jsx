

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditEmployee = () => {
  const { employeeID } = useParams(); // Get employeeID from route params
  const [employee, setEmployee] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contact, setContact] = useState('');
  const [nic, setNic] = useState('');
  const [address, setAddress] = useState('');
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
        const response = await fetch(`http://localhost:3001/api/employee/${employeeID}`);
        const data = await response.json();
        setEmployee(data);
        setFirstName(data.employeeFirstName);
        setLastName(data.employeeLastName);
        setContact(data.employeeContact);
        setNic(data.employeeNIC);
        setAddress(data.employeeAddress);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [employeeID]);

  const handleUpdateEmployee = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/employee/${employeeID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeFirstName: firstName,
          employeeLastName: lastName,
          employeeContact: contact,
          employeeNIC: nic,
          employeeAddress: address,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update employee');
      }

      Swal.fire('Success!', 'Employee updated successfully.', 'success');
    } catch (error) {
      console.error('Error updating employee:', error);
      Swal.fire('Error!', 'Failed to update the employee.', 'error');
    }
  };

  if (!employee) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4">Edit Employee</Typography>
      <Box my={3}>
        <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth />
      </Box>
      <Box my={3}>
        <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth />
      </Box>
      <Box my={3}>
        <TextField label="Contact" value={contact} onChange={(e) => setContact(e.target.value)} fullWidth />
      </Box>
      <Box my={3}>
        <TextField label="NIC" value={nic} onChange={(e) => setNic(e.target.value)} fullWidth />
      </Box>
      <Box my={3}>
        <TextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth />
      </Box>
      <Button variant="contained" onClick={handleUpdateEmployee}>
        Update Employee
      </Button>
    </Box>
  );
};

export default EditEmployee;
