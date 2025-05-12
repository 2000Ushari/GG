

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
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

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

function SizesTable() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [newSize, setNewSize] = useState('');

  const fetchSizes = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/configurations/getSizes');
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error('Error fetching sizes:', error);
    }
  };

  const addNewSize = async () => {
    if (!newSize || newSize.trim() === '') {
      Swal.fire("Invalid Input", "Please enter a valid size (e.g., XS, S, M, XL).", "warning");
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/configurations/addSize', {
        size: newSize.trim().toUpperCase()
      });
      Swal.fire("Success", "New size added successfully!", "success");
      setNewSize('');
      setOpen(false);
      fetchSizes();
    } catch (error) {
      if (error.response?.status === 409) {
        Swal.fire("Duplicate", "This size already exists.", "info");
      } else {
        Swal.fire("Error", "Failed to add size.", "error");
      }
    }
  };

  const exportToExcel = () => {
    const formattedData = rows.map(row => ({
      "Size ID": row.sizeId,
      "Size": row.size
    }));
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sizes");

    const now = new Date();
    const timestamp = now.toLocaleDateString('en-GB').split('/').reverse().join('-') + '_' +
      now.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '-');
    const fileName = `Sizes_${timestamp}.xlsx`;

    XLSX.writeFile(workbook, fileName);
    Swal.fire("Downloaded", "Excel file has been downloaded.", "success");
  };

  useEffect(() => {
    fetchSizes();
  }, []);

  return (
    <>
      <Paper sx={{ width: '50%', overflow: 'hidden' }}>
        <Box height={15} />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Size ID</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Size</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow hover key={row.sizeId}>
                  <TableCell>{row.sizeId}</TableCell>
                  <TableCell>{row.size}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box sx={{ mt: 3, ml: 1 }}>
        <Button variant="contained" onClick={() => setOpen(true)} sx={{ mr: 2 }}>
          Add New Size
        </Button>
        <Button variant="outlined" color="success" onClick={exportToExcel}>
          Export
        </Button>
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Add New Size
          </Typography>
          <TextField
            fullWidth
            label="Size (e.g., XS, S, M, L, XL)"
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" onClick={addNewSize}>Add</Button>
        </Box>
      </Modal>
    </>
  );
}

export default SizesTable;
