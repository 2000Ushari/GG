import React, { useEffect, useState } from 'react';
//import { useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Divider, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CustomerOrderCancelledTable(closeEvent) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [rows, setRows] = useState([]); //rows: Holds the order data fetched from the API.

  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState('');
  const [userId, setUserId] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Authentication check
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/auth/authenticated', {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.authenticated && res.data.user.role === 'customer') {
          setUserId(res.data.user.id);
          console.log(userId);
        } else {
          navigate('/login');
        }
      })
      .catch((err) => {
        console.error('Error during authentication:', err);
      });
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      // Only fetch customer ID if userId is defined
      const fetchCustomerIdByUserId = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/user/getCustomerIdByUserId/${userId}`);
          setCustomerId(response.data.customerId);
        } catch (error) {
          console.error('Error fetching customer ID:', error);
        }
      };

      fetchCustomerIdByUserId();
    }
  }, [userId]);

  useEffect(() => {
    if (customerId) {
      // Only fetch orders if customerId is defined
      console.log('Fetching orders for customerId:', customerId);
      const fetchOrders = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/order/getCancelledOrdersByCustomerId/${customerId}`
          );
          setRows(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };
      fetchOrders();
    }
  }, [customerId]);

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Box height={10} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            marginRight: '20px',
          }}
        ></div>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: '100px' }}>
                  OrderID
                </TableCell>
                {/* <TableCell align="left" style={{ minWidth: "100px" }}>
                  Customer Email
                </TableCell> */}
                <TableCell align="left" style={{ minWidth: '100px' }}>
                  Gift Box ID
                </TableCell>
                <TableCell align="left" style={{ minWidth: '100px' }}>
                  Quantity
                </TableCell>
                <TableCell align="left" style={{ minWidth: '100px' }}>
                  Price(LKR)
                </TableCell>
                <TableCell align="left" style={{ minWidth: '100px' }}>
                  Order Date
                </TableCell>
                <TableCell align="left" style={{ minWidth: '100px' }}>
                  Due Date
                </TableCell>
                <TableCell align="left" style={{ minWidth: '100px' }}>
                  Status
                </TableCell>
                {/* <TableCell align="left" style={{ minWidth: "100px" }}>
                  Action
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell key={row.id} align={'left'}>
                    {row.orderId}
                  </TableCell>
                  {/* <TableCell key={row.id} align={"left"}>
                      {row.customerId}
                    </TableCell> */}
                  <TableCell key={row.id} align={'left'}>
                    {row.giftboxId}
                  </TableCell>
                  <TableCell key={row.id} align={'left'}>
                    {row.quantity}
                  </TableCell>
                  <TableCell key={row.id} align={'left'}>
                    {row.price}
                  </TableCell>
                  <TableCell key={row.id} align={'left'}>
                    {row.orderDate}
                  </TableCell>
                  <TableCell key={row.id} align={'left'}>
                    {row.dueDate}
                  </TableCell>
                  <TableCell key={row.id} align={'left'}>
                    {row.orderStatus}
                  </TableCell>
                  {/* <TableCell align={"left"}>
                      <Stack spacing={2}>
                        <CancelIcon
                          style={{
                            fontSize: "20px",
                            color: "#02294F",
                            cursor: "pointer",
                          }}
                          className="cursor-pointer"
                          onClick={() => handleOrderCancel(row.orderId)}
                        />
                      </Stack>
                    </TableCell> */}
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
