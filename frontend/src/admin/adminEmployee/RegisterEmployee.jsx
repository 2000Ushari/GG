import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';

function RegisterEmployee() {
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const [password, setPassword] = useState('');
    const [firstName, setFirstNamel] = useState('');
    const [lastName, setLastName] = useState('');
    const [contact, setContact] = useState('');

  const roleOptions = ['employee', 'admin'];

  const handleRegister = async () => {
    if (!userEmail || !userRole || !password) {
      Swal.fire('Missing Info', 'Please fill in all fields.', 'warning');
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/authentication/registerEmployee', {
        userEmail,
        userRole,
        password,
        firstName,
        lastName,
        contact,
      });

      Swal.fire('Success', 'Employee registered successfully!', 'success');
      setUserEmail('');
      setUserRole('');
      setPassword('');
    } catch (error) {
      Swal.fire('Error', 'Registration failed.', 'error');
      console.error(error);
    }
  };

  return (
    <>
      <Paper elevation={3} sx={{ width: 500, mx: 'auto', mt: 5, p: 4 }}>
        <Typography variant="h6" gutterBottom>
          Register New Employee
        </Typography>
        <TextField
          fullWidth
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstNamel(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          margin="normal"
        />
<TextField
          fullWidth
          label="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          margin="normal"
        />
        <Autocomplete
          options={roleOptions}
          value={userRole}
          onChange={(event, newValue) => setUserRole(newValue)} // Corrected this line
          renderInput={(params) => (
            <TextField
              {...params} // This spreads all the necessary props to the TextField
              label="User Role"
              variant="outlined"
              size="small"
              fullWidth
              margin="normal"
            />
          )}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <Box mt={2} textAlign="right">
          <Button variant="contained" onClick={handleRegister}>
            Register
          </Button>
        </Box>
      </Paper>
    </>
  );
}

export default RegisterEmployee;
