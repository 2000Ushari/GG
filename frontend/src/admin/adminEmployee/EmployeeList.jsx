//This is the EmployeeList.jsx file of the admin panel

import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Modal, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Swal from 'sweetalert2';
import axios from 'axios';

import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import EmpImage from '../../images/employees/employee1.jpg';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [openAddEmployeeModal, setOpenAddEmployeeModal] = useState(false);
  const [openEditEmployeeModal, setOpenEditEmployeeModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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

  const handleCardClick = (employeeID) => {
    navigate(`/admin/employees/view/${employeeID}`);
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/employee/getEmployees');
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const employeeData = await response.json();
      setEmployees(employeeData);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleOpenAddEmployeeModal = () => setOpenAddEmployeeModal(true);
  const handleCloseAddEmployeeModal = () => setOpenAddEmployeeModal(false);

  const handleOpenEditEmployeeModal = (employee) => {
    setSelectedEmployee(employee);
    setOpenEditEmployeeModal(true);
  };

  const handleCloseEditEmployeeModal = () => {
    setOpenEditEmployeeModal(false);
    setSelectedEmployee(null); // Reset selected employee
  };

  const deleteEmployee = async (employeeID) => {
    try {
      const confirmed = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (confirmed.isConfirmed) {
        const response = await fetch(
          // http://localhost:3001/api/employee/:id
          `http://localhost:3001/api/employee/${employeeID}`,
          {
            method: 'DELETE',
          }
        );

        if (!response.ok) {
          throw new Error('Failed to delete the employee');
        }

        // const newRows = rows.filter((row) => row.id !== id);
        // setRows(newRows);

        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      Swal.fire('Error!', 'Failed to delete the employee.', 'error');
    }
  };

  return (
    <>
      <Card>
        <Box height={30} />
        <Grid item xs={12}>
          <Card sx={{ pb: 2, flexGrow: 1 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                marginRight: '20px',
              }}
            >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                sx={{ width: 300, marginLeft: '20px' }}
                renderInput={(params) => <TextField {...params} label="Search by name" />}
              />
              <Stack direction="row" spacing={2} pr={1.5}>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAddEmployeeModal}>
                  Add Employee
                </Button>
                <AddEmployee open={openAddEmployeeModal} closeEvent={handleCloseAddEmployeeModal} />
              </Stack>
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'left',
                paddingLeft: '20px',
              }}
            >
              {employees.map((employee) => (
                <Card
                  key={employee.employeeId}
                  sx={{
                    minWidth: 180,
                    minHeight: 395,
                    width: 350,
                    height: 370,
                    backgroundColor: 'grey.300',
                    cursor: 'pointer', // Change cursor to pointer to indicate it's clickable
                    '&:hover': {
                      backgroundColor: 'grey.400',
                    },
                  }}
                  onClick={() => handleCardClick(employee.employeeId)}
                >
                  <CardMedia
                    component="img"
                    alt={employee.employeeName}
                    height="200"
                    image={EmpImage}
                    sx={{
                      borderRadius: '50%',
                      objectFit: 'cover',
                      width: 200,
                      height: 200,
                      margin: 'auto',
                      mt: 2,
                      mb: 2,
                    }}
                  />
                  <CardContent
                    sx={{
                      textAlign: 'left',
                      backgroundColor: 'grey.700',
                      margin: 2,
                      borderRadius: 2,
                    }}
                  >
                    <Typography gutterBottom variant="h6" component="div" color={'whitesmoke'}>
                      {employee.employeeFirstName}
                    </Typography>
                    <Typography variant="body2" color="whitesmoke">
                      {employee.employeeLastName}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', backgroundColor: 'white' }}>
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click event
                          handleOpenEditEmployeeModal(employee);
                        }}
                      >
                        Update
                      </Button>
                      {selectedEmployee && (
                        <EditEmployee
                          open={openEditEmployeeModal}
                          closeEvent={handleCloseEditEmployeeModal}
                          employee={selectedEmployee}
                          employeeID={selectedEmployee.employeeId}
                        />
                      )}
                    </Stack>
                  </CardActions>
                </Card>
              ))}
            </div>
          </Card>
        </Grid>
      </Card>
    </>
  );
};

export default EmployeeList;
