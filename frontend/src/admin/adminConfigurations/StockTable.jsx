

import React, { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function StockTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deliveryRate, setDeliveryRate] = useState(0);
  const [modifiedOn, setModifiedOn] = useState("");
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [newRate, setNewRate] = useState("");
  const navigate = useNavigate();

  const fetchDistricts = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/configurations/getDistricts");
      if (!response.ok) throw new Error("Failed to fetch districts");
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const fetchDeliveryRate = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/configurations/getDeliveryRate");
      if (response.status === 200) {
        setDeliveryRate(response.data[0].ratePerOneKm);
        setModifiedOn(response.data[0].modifiedOn);
      }
    } catch (error) {
      console.error("Error fetching delivery rate:", error);
    }
  };

  const updateDeliveryRate = async () => {
    if (!newRate || isNaN(newRate) || Number(newRate) <= 0) {
      Swal.fire("Invalid input", "Please enter a valid positive number for the rate.", "warning");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3001/api/configurations/updateDeliveryRate/${newRate}`, {
        ratePerOneKm: newRate,
      });
      if (response.status === 200) {
        Swal.fire("Success", "Rate updated successfully.", "success");
        fetchDeliveryRate();
        setOpen(false);
        setNewRate("");
      }
    } catch (error) {
      console.error("Error updating rate:", error);
      Swal.fire("Error", "Something went wrong while updating.", "error");
    }
  };

  const exportToExcel = () => {
    const formattedData = rows.map(row => ({
      District: row.deliveryDistrictName,
      "Delivery Distance (km)": row.deliveryDistance,
      "Delivery Fee (LKR)": row.deliveryDistance * deliveryRate
    }));
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "District Delivery Rates");
    XLSX.writeFile(workbook, "DistrictDeliveryRates.xlsx");
    Swal.fire("Downloaded", "Excel file has been downloaded.", "success");
  };

  useEffect(() => {
    fetchDistricts();
    fetchDeliveryRate();
  }, []);

  return (
    <>
      <Paper sx={{ width: "30%", overflow: "hidden" }}>
        <Box height={15} />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ fontWeight: "bold" }}>District</TableCell>
                <TableCell align="left" style={{ fontWeight: "bold" }}>Delivery Distance</TableCell>
                <TableCell align="left" style={{ fontWeight: "bold" }}>Delivery Fee (LKR)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell align="left">{row.deliveryDistrictName}</TableCell>
                  <TableCell align="right">{row.deliveryDistance} km</TableCell>
                  <TableCell align="right">{row.deliveryDistance * deliveryRate}.00</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Box height={20} />
      <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>
        Current rate per Km = {deliveryRate} LKR
      </Typography>
      <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>
        Last modified on {modifiedOn}
      </Typography>
      <Box sx={{ ml: 2, mt: 2 }}>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{ mr: 2 }}>
          Change Rate per KM
        </Button>
        <Button variant="outlined" color="success" onClick={exportToExcel}>
          Export
        </Button>
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>Update Delivery Rate per KM</Typography>
          <TextField
            fullWidth
            label="New Rate (LKR)"
            type="number"
            value={newRate}
            onChange={(e) => setNewRate(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" onClick={updateDeliveryRate}>Update</Button>
        </Box>
      </Modal>

      <Box height={20} />
    </>
  );
}

export default DistrictTable;
