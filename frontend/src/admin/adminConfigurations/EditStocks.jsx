import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import Stack from '@mui/material/Stack';
import moment from 'moment';

import AdminNavbar from '../adminComponents/AdminNavbar';
import AdminSidenav from '../adminComponents/AdminSidenav';
import { Grid } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function EditStocks() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deliveryRate, setDeliveryRate] = useState(0);
  const [modifiedOn, setModifiedOn] = useState('');
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [newRate, setNewRate] = useState('');
  const navigate = useNavigate();

  const [selectedStock, setSelectedStock] = useState(null);
  const [newQuantity, setNewQuantity] = useState('');

  const fetchStocks = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/configurations/getStockDetails');
      if (!response.ok) throw new Error('Failed to fetch stocks');
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  const handleStatusToggle = async (stockId, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';

    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `This will change the stock status to "${newStatus}". This accessory will not be available for sale if inactive.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, change to ${newStatus}`,
    });

    if (result.isConfirmed) {
      try {
        await axios.put(`http://localhost:3001/api/configurations/updateStockStatus/${stockId}`, {
          status: newStatus,
        });

        Swal.fire('Updated!', `Stock status changed to "${newStatus}".`, 'success');
        fetchStocks(); // reload updated data
      } catch (error) {
        console.error('Status update failed:', error);
        Swal.fire('Error', 'Failed to update status.', 'error');
      }
    }
  };

  const exportToExcel = () => {
    const formattedData = rows.map((row) => ({
      'Accessory Name': row.accessoryName,
      Size: row.size,
      'Current Stocks Available': row.quantity,
      Status: row.status,
      'Last Modified On': moment(row.modifiedOn).format('YYYY-MM-DD HH:mm:ss'),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Stock Details');

    // Add timestamp to filename
    const now = new Date();
    const timestamp =
      now.toLocaleDateString('en-GB').split('/').reverse().join('-') +
      '_' +
      now.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '-');

    const fileName = `Stocks_${timestamp}.xlsx`;

    XLSX.writeFile(workbook, fileName);

    Swal.fire('Downloaded', 'Excel file has been downloaded.', 'success');
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  return (
    <>
      <div className="bgcolor">
        <AdminNavbar />
        <Box height={60} />
        <Box sx={{ display: 'flex' }}>
          <AdminSidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Typography gutterBottom variant="h5" component="div" sx={{ marginLeft: '10px', fontWeight: 'bold' }}>
              Stock Management
            </Typography>

            <Button variant="outlined" color="success" onClick={exportToExcel} sx={{ marginBottom: '20px', marginLeft: '10px' }}>
              Export
            </Button>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <Box height={15} />
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" style={{ minWidth: '100px', fontWeight: 'bold' }}>
                        Accessory Name
                      </TableCell>
                      <TableCell align="left" style={{ minWidth: '100px', fontWeight: 'bold' }}>
                        Size
                      </TableCell>
                      <TableCell align="center" style={{ minWidth: '100px', fontWeight: 'bold' }}>
                        Existing Stock
                      </TableCell>
                      <TableCell align="right" style={{ minWidth: '100px', fontWeight: 'bold' }}>
                        Status
                      </TableCell>
                      <TableCell align="right" style={{ minWidth: '100px', fontWeight: 'bold' }}>
                        Last Modified On
                      </TableCell>
                      <TableCell align="right" style={{ minWidth: '100px', fontWeight: 'bold' }}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow hover key={row.stockId}>
                        <TableCell align="left">{row.accessoryName}</TableCell>
                        <TableCell align="left">{row.size}</TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">{row.status}</TableCell>
                        <TableCell align="right">{moment(row.modifiedOn).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                        <TableCell align={'right'}>
                          <Stack spacing={2}>
                            <Grid container spacing={1}>
                              <Grid item xs={6}>
                                <Button variant="contained" color="primary" onClick={() => setSelectedStock(row)}>
                                  Add Stock
                                </Button>
                              </Grid>
                              <Grid item xs={6}>
                                <Button
                                  variant="contained"
                                  color={row.status === 'Active' ? 'error' : 'success'}
                                  onClick={() => handleStatusToggle(row.stockId, row.status)}
                                >
                                  {row.status === 'Active' ? 'Inactivate' : 'Activate'}
                                </Button>
                              </Grid>
                            </Grid>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <Box height={20} />
            

            <Modal
              open={!!selectedStock}
              onClose={() => {
                setSelectedStock(null);
                setNewQuantity('');
              }}
            >
              <Box sx={style}>
                <Typography variant="h6" gutterBottom>
                  Update Stock
                </Typography>
                {selectedStock && (
                  <>
                    <TextField
                      fullWidth
                      label="Accessory Name"
                      value={selectedStock.accessoryName}
                      InputProps={{ readOnly: true }}
                      margin="dense"
                    />
                    <TextField
                      fullWidth
                      label="Size"
                      value={selectedStock.size}
                      InputProps={{ readOnly: true }}
                      margin="dense"
                    />
                    <TextField
                      fullWidth
                      label="Status"
                      value={selectedStock.status}
                      InputProps={{ readOnly: true }}
                      margin="dense"
                    />
                    <TextField
                      fullWidth
                      label="Last Modified"
                      value={selectedStock.modifiedOn}
                      InputProps={{ readOnly: true }}
                      margin="dense"
                    />
                    <TextField
                      fullWidth
                      label="Current Stock"
                      value={selectedStock.quantity}
                      InputProps={{ readOnly: true }}
                      margin="dense"
                    />
                    <TextField
                      fullWidth
                      label="New Quantity to Add"
                      type="number"
                      placeholder="Enter quantity to add"
                      color="primary"
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(e.target.value)}
                      margin="dense"
                    />
                    <TextField
                      fullWidth
                      label="Total Stock After Update"
                      value={
                        newQuantity && !isNaN(newQuantity)
                          ? parseInt(selectedStock.quantity) + parseInt(newQuantity)
                          : selectedStock.quantity
                      }
                      InputProps={{ readOnly: true }}
                      margin="dense"
                    />
                    <Box mt={2} textAlign="right">
                      <Button
                        variant="contained"
                        onClick={async () => {
                          if (!newQuantity || isNaN(newQuantity) || parseInt(newQuantity) <= 0) {
                            Swal.fire('Invalid Input', 'Please enter a valid quantity greater than 0.', 'warning');
                            return;
                          }

                          try {
                            await axios.put(
                              `http://localhost:3001/api/configurations/updateStockQuantity/${selectedStock.stockId}`,
                              {
                                quantityToAdd: parseInt(newQuantity),
                              }
                            );

                            await fetchStocks(); // Refresh the data

                            Swal.fire({
                              title: 'Success!',
                              text: `Stock updated successfully. New total: ${
                                parseInt(selectedStock.quantity) + parseInt(newQuantity)
                              }`,
                              icon: 'success',
                              confirmButtonText: 'Okay',
                            });

                            setSelectedStock(null);
                            setNewQuantity('');
                          } catch (error) {
                            console.error('Stock update failed:', error);
                            Swal.fire('Error', 'Failed to update stock quantity.', 'error');
                          }
                        }}
                      >
                        Confirm Update
                      </Button>
                    </Box>
                  </>
                )}
              </Box>
            </Modal>

            <Box height={20} />
          </Box>
        </Box>
      </div>
    </>
  );
}
export default EditStocks;
