import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';

function CustomerList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userId, setUserId] = useState(null);

  const [rows, setRows] = useState([]); //rows: Holds the order data fetched from the API.
  const [row, setRow] = useState([]);

  // Authentication check
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/auth/authenticated', {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.authenticated && res.data.user.role === 'admin') {
          //&&res.data.user.status === "active" kyn ekth blnna oni passe
          // setUser(res.data.user); // Set user data if authenticated
          setUserId(res.data.user.id);
        } else {
          navigate('/login'); // Redirect to login if not authenticated
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  // const fetchCustomers = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/api/user/getCustomerEmail/${userId}`);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch customers");
  //     }
  //     const data = await response.json();
  //     setRows(data);
  //   } catch (error) {
  //     console.error("Error fetching customers:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchCustomers();
  // }, []);

  const fetchCustomerEmail = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/customer/getCustomerDetails');
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };
  useEffect(() => {
    fetchCustomerEmail();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
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
                Customer ID
              </TableCell>
              <TableCell align="left" style={{ minWidth: '100px' }}>
                Customer Email
              </TableCell>
              <TableCell align="left" style={{ minWidth: '100px' }}>
                Customer Name
              </TableCell>
              <TableCell align="left" style={{ minWidth: '100px' }}>
                Contact
              </TableCell>
              {/* <TableCell align="left" style={{ minWidth: "100px" }}>
              Current Status
            </TableCell> */}
              <TableCell align="left" style={{ minWidth: '100px' }}>
                Created At
              </TableCell>
              {/* <TableCell align="left" style={{ minWidth: "100px" }}>
              Due Date
            </TableCell> */}
              <TableCell align="left" style={{ minWidth: '100px' }}>
                Current Status
              </TableCell>
              <TableCell align="left" style={{ minWidth: '100px' }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                <TableCell key={row.id} align={'left'}>
                  {row.customerId}
                </TableCell>
                <TableCell key={row.id} align={'left'}>
                  {row.userEmail}
                </TableCell>
                <TableCell key={row.id} align={'left'}>
                  {row.customerFirstName} {row.customerLastName}
                </TableCell>
                <TableCell key={row.id} align={'left'}>
                  {row.customerContact}
                </TableCell>
                <TableCell key={row.id} align={'left'}>
                  {row.createdAt}
                </TableCell>
                <TableCell key={row.id} align={'left'}>
                  {row.currentStatus}
                </TableCell>
                {/* <TableCell key={row.id} align={"left"}>
                  {row.dueDate}
                </TableCell> */}
                {/* <TableCell key={row.id} align={"left"}>
                  {row.orderStatus}
                </TableCell> */}
                <TableCell align={'left'}>
                  <Stack spacing={2}>
                    <DoneIcon
                      style={{
                        fontSize: '20px',
                        color: '#02294F',
                        cursor: 'pointer',
                      }}
                      className="cursor-pointer"
                      // onClick={() => handleOpenEditModal(row.order_id)} // Pass the order ID to the edit modal
                    />
                    <CancelIcon
                      style={{
                        fontSize: '20px',
                        color: '#02294F',
                        cursor: 'pointer',
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
  );
}

export default CustomerList;
