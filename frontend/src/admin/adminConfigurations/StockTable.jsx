

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

  const fetchStocks = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/configurations/getStockDetails");
      if (!response.ok) throw new Error("Failed to fetch stocks");
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };


//exporting the table as a report
const exportToExcel = () => {
  const formattedData = rows.map(row => ({
    "Accessory Name": row.accessoryName,
    "Size": row.size,
    "Current Stocks Available": row.quantity,
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Stock Details");

  // Add timestamp to filename
  const now = new Date();
  const timestamp = now.toLocaleDateString('en-GB').split('/').reverse().join('-') + '_' +
                    now.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '-');

  const fileName = `Stocks_${timestamp}.xlsx`;

  XLSX.writeFile(workbook, fileName);

  Swal.fire("Downloaded", "Excel file has been downloaded.", "success");
};



  useEffect(() => {
  fetchStocks();
}, []);

  return (
    <>
      <Paper sx={{ width: "30%", overflow: "hidden" }}>
        <Box height={15} />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ fontWeight: "bold" }}>Accessory Name</TableCell>
                <TableCell align="left" style={{ fontWeight: "bold" }}>Size</TableCell>
                <TableCell align="left" style={{ fontWeight: "bold" }}>Existing Stock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {rows.map((row) => (
    <TableRow hover key={row.stockId}>
      <TableCell align="left">{row.accessoryName}</TableCell>
      <TableCell align="left">{row.size}</TableCell>
      <TableCell align="right">{row.quantity}</TableCell>
    </TableRow>
  ))}
</TableBody>


          </Table>
        </TableContainer>
      </Paper>
      <Box height={20} />
        <Button variant="contained" color="primary" onClick={() => navigate("/admin/configurations/editStocks")} sx={{ mr: 2 }}>
          Edit Stock
        </Button>
      
        <Button variant="outlined" color="success" onClick={exportToExcel}>
          Export
        </Button>

      <Box height={20} />
    </>
  );
}

export default StockTable;
