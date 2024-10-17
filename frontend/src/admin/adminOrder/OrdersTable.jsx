import React, { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Divider, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from "react-router-dom";

//css components
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

export default function OrderList( closeEvent) {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [rows, setRows] = useState([]); //rows: Holds the order data fetched from the API.


  //Manage the state of modals for adding and editing orders.
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editOrderId, setEditOrderId] = useState(null);


  const navigate = useNavigate();

   //Functions to open and close the modal for adding a new order.
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleOpenEditModal = (orderId) => {
    setEditOrderId(orderId);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => setOpenEditModal(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        'http://localhost:3001/api/order/getOrder'
      );
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setRows(data); 
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box height={10} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            marginRight: "20px",
          }}
        >
          
        </div>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  OrderID
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Customer Email
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Gift Box ID
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Quantity
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Price
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Order Date
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Due Date
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Status
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                  >
                    <TableCell key={row.id} align={"left"}>
                      {row.orderId}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.customerId}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.giftboxId}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.quantity}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.price}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.orderDate}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.dueDate}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.orderStatus}
                    </TableCell>
                    <TableCell align={"left"}>
                      <Stack spacing={2}>
                        <DoneIcon
                          style={{
                            fontSize: "20px",
                            color: "#02294F",
                            cursor: "pointer",
                          }}
                          className="cursor-pointer"
                          onClick={() => handleOpenEditModal(row.order_id)} // Pass the order ID to the edit modal
                        />
                        <CancelIcon
                          style={{
                            fontSize: "20px",
                            color: "#02294F",
                            cursor: "pointer",
                          }}
                          className="cursor-pointer"
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}