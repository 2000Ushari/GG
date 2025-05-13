import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import moment from 'moment';
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

function EmployeeTable() {
  const [rows, setRows] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editContact, setEditContact] = useState('');
  const [editDob, setEditDob] = useState('');
  const [editNIC, setEditNIC] = useState('');
  const [editGender, setEditGender] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editWorkingStatus, setEditWorkingStatus] = useState('');
  const [editStartDate, setEditStartDate] = useState('');
  const [editEndDate, setEditEndDate] = useState('');

  const genderOptions = ['Female', 'Male', 'Preferred not to mention'];
  const workingStatusOptions = ['Active', 'Inactive'];

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/employee/getEmployees');
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error('Error fetching capacities:', error);
    }
  };

    const UpdateEmployee = async () => {
    try {
        const response = await fetch(`http://localhost:3001/api/employee/updateEmployee/${selectedEmployee.employeeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                employeeFirstName: editFirstName,
                employeeLastName: editLastName,
                employeeContact: editContact,
                employeeDob: editDob,
                employeeNIC: editNIC,
                employeeGender: editGender,
                employeeAddress: editAddress,
                workingStatus: editWorkingStatus,
                startDate: editStartDate,
                endDate: editEndDate,
            }),
        });
        if (response.ok) {
            Swal.fire('Success', 'Employee updated successfully', 'success');
            fetchEmployees(); // Refresh the employee list
            setSelectedEmployee(null); // Close the modal
        } else {
            const errorData = await response.json();
            Swal.fire('Error', errorData.message || 'Failed to update employee', 'error');
        }
    } catch (error) {
        console.error('Error updating employee:', error);
        Swal.fire('Error', 'Failed to update employee', 'error');
    }
  };

  //export to excel
  const exportToExcel = () => {
    const formattedData = rows.map((row) => ({
      'Employee Id': row.employeeId,
      'First Name': row.employeeFirstName,
      'Last Name': row.employeeLastName,
      'Contact': row.employeeContact,
      'Date of Birth': moment(row.employeeDob).format('YYYY-MM-DD'),
      'NIC': row.employeeNIC,
      'Gender': row.employeeGender,
      'Address': row.employeeAddress,
      'Working Status': row.workingStatus,
      'Working Started On': moment(row.startDate).format('YYYY-MM-DD'),
      'Working Ended On': moment(row.endDate).format('YYYY-MM-DD'),
      'Created On': moment(row.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      'Last Modified On': moment(row.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');

    const now = new Date();
    const timestamp =
      now.toLocaleDateString('en-GB').split('/').reverse().join('-') +
      '_' +
      now.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '-');
    const fileName = `Employees_${timestamp}.xlsx`;

    XLSX.writeFile(workbook, fileName);
    Swal.fire('Downloaded', 'Excel file has been downloaded.', 'success');
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <div>
        <Paper sx={{ width: '100%' }}>
          <Box height={15} />
          <TableContainer sx={{ maxHeight: 440, overflowX: 'auto' }}>
            <Box sx={{ width: '100%', overflowX: 'auto' }}>
              <Table stickyHeader sx={{ minWidth: 1000 }}>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>Employee Id</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>First Name</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Last Name</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Contact</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Date of Birth</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>NIC</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Gender</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Address</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Working Status</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Working Started On</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Working Ended On</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Created On</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Last Modified On</TableCell>
                    <TableCell align="right" style={{ fontWeight: 'bold' }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow hover key={row.employeeId}>
                      <TableCell>{row.employeeId}</TableCell>
                      <TableCell align="left">{row.employeeFirstName}</TableCell>
                      <TableCell align="left">{row.employeeLastName}</TableCell>
                      <TableCell align="left">{row.employeeContact}</TableCell>
                      <TableCell align="left">{moment(row.employeeDob).format('YYYY-MM-DD')}</TableCell>
                      <TableCell align="left">{row.employeeNIC}</TableCell>
                      <TableCell align="left">{row.employeeGender}</TableCell>
                      <TableCell align="left">{row.employeeAddress}</TableCell>
                      <TableCell align="left">{row.workingStatus}</TableCell>
                      <TableCell align="left">{moment(row.startDate).format('YYYY-MM-DD')}</TableCell>
                      <TableCell align="left">{moment(row.endDate).format('YYYY-MM-DD')}</TableCell>
                      <TableCell align="left">{moment(row.createdAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                      <TableCell align="left">{moment(row.modifiedOn).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            setSelectedEmployee(row);
                            setEditFirstName(row.employeeFirstName);
                            setEditLastName(row.employeeLastName);
                            setEditContact(row.employeeContact);
                            setEditDob(row.employeeDob);
                            setEditNIC(row.employeeNIC);
                            setEditGender(row.employeeGender);
                            setEditAddress(row.employeeAddress);
                            setEditWorkingStatus(row.workingStatus);
                            setEditStartDate(row.startDate);
                            setEditEndDate(row.endDate);
                          }}
                        >
                          Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </TableContainer>
        </Paper>
        <Button variant="outlined" color="success" onClick={exportToExcel}>
          Export
        </Button>

        <Modal open={!!selectedEmployee} onClose={() => setSelectedEmployee(null)}>
          <Box sx={style}>
            <Typography variant="h6" gutterBottom>
              Update Employee Details
            </Typography>
            <Grid container spacing={2}>
            <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              type="text"
              value={editFirstName}
              onChange={(e) => setEditFirstName(e.target.value)}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Name"
              type="text"
              value={editLastName}
              onChange={(e) => setEditLastName(e.target.value)}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              fullWidth
              label="Contact"
              type="number"
              value={editContact}
              onChange={(e) => setEditContact(e.target.value)}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              fullWidth
              label="NIC number"
              type="text"
              value={editNIC}
              onChange={(e) => setEditNIC(e.target.value)}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
            label="Date of Birth"
                fullWidth
                type="date"
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
                value={editDob}
                onChange={(e) => setEditDob(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                options={genderOptions}
                value={editGender}
                onChange={(event, newValue) => setEditGender(newValue)} // Corrected this line
                renderInput={(params) => (
                  <TextField
                    {...params} // This spreads all the necessary props to the TextField
                    label="Gender"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              type="text"
              value={editAddress}
              onChange={(e) => setEditAddress(e.target.value)}
            />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                options={workingStatusOptions}
                value={editWorkingStatus}
                onChange={(event, newValue) => setEditWorkingStatus(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params} // This spreads all the necessary props to the TextField
                    label="Working Status"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                )}
              />
              </Grid>
            <Grid item xs={3}>
              <TextField
              label="Start Date"
                fullWidth
                type="date"
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
                value={editStartDate}
                onChange={(e) => setEditStartDate(e.target.value)}
              />
              </Grid>
            <Grid item xs={3}>
              <TextField
                label="End Date"
                fullWidth
                type="date"
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
                value={editEndDate}
                onChange={(e) => setEditEndDate(e.target.value)}
              />
            </Grid>
            <Grid spacing={1} item xs={12}>
            <Box mt={2} textAlign="right">
              <Button variant="contained" onClick={UpdateEmployee}>
                Update
              </Button>
            </Box>
            </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default EmployeeTable;
