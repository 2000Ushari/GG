// import React, { useEffect, useState } from "react";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import Stack from "@mui/material/Stack";
// import Box from "@mui/material/Box";
// import DoneIcon from '@mui/icons-material/Done';
// import CancelIcon from '@mui/icons-material/Cancel';
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// //css components
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// export default function CustomerOrderTable() {

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [rows, setRows] = useState([]); //rows: Holds the order data fetched from the API
//   const navigate = useNavigate();
//     const [customerId, setCustomerId] = useState("");
//     const [userId, setUserId] = useState("");

//     // Authentication check
//     useEffect(() => {
//         axios
//           .get("http://localhost:3001/api/auth/authenticated", {
//             withCredentials: true,
//           })
//           .then((res) => {
//             if (res.data.authenticated && res.data.user.role === "customer") {
//               // setUser(res.data.user); // Set user data if authenticated
//               setUserId(res.data.user.id);
//             } else {
//               navigate("/login"); // Redirect to login if not authenticated
//             }
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       }, [navigate]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const fetchCustomerIdByUserId = async () => { 
//     try {
//         const response = await axios.get(`http://localhost:3001/api/customer/getCustomerIdByUserId/${userId}`);
//         setCustomerId(response.data);
//     } catch (error) {
//         console.error("Error fetching customer ID:", error);
//     }
//     }
//     useEffect (() => {
//         fetchCustomerIdByUserId();
//     }, []);

//   const fetchOrders = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/api/order/getOrdersByCustomerId/${customerId}`, // Fetch orders by customer ID
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch orders");
//       }
//       const data = await response.json();
//       setRows(data); 
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);


//   return (
//     <>
//       <Paper sx={{ width: "100%", overflow: "hidden" }}>
//         <Box height={10} />
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "20px",
//             marginRight: "20px",
//           }}
//         >
//         </div>
//         <TableContainer sx={{ maxHeight: 440 }}>
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   OrderID
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Gift Box ID
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Quantity
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Price
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Order Date
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Due Date
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Status
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Action
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row) => (
//                   <TableRow
//                     hover
//                     role="checkbox"
//                     tabIndex={-1}
//                     key={row.id}
//                   >
//                     <TableCell key={row.id} align={"left"}>
//                       {row.orderId}
//                     </TableCell>
//                     <TableCell key={row.id} align={"left"}>
//                       {row.giftboxId}
//                     </TableCell>
//                     <TableCell key={row.id} align={"left"}>
//                       {row.quantity}
//                     </TableCell>
//                     <TableCell key={row.id} align={"left"}>
//                       {row.price}
//                     </TableCell>
//                     <TableCell key={row.id} align={"left"}>
//                       {row.orderDate}
//                     </TableCell>
//                     <TableCell key={row.id} align={"left"}>
//                       {row.dueDate}
//                     </TableCell>
//                     <TableCell key={row.id} align={"left"}>
//                       {row.orderStatus}
//                     </TableCell>
//                     <TableCell align={"left"}>
//                       <Stack spacing={2}>
//                         <DoneIcon
//                           style={{
//                             fontSize: "20px",
//                             color: "#02294F",
//                             cursor: "pointer",
//                           }}
//                           className="cursor-pointer"
//                         //   onClick={() => handleOpenEditModal(row.order_id)} // Pass the order ID to the edit modal
//                         />
//                         <CancelIcon
//                           style={{
//                             fontSize: "20px",
//                             color: "#02294F",
//                             cursor: "pointer",
//                           }}
//                           className="cursor-pointer"
//                         />
//                       </Stack>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </>
//   );
// }

// import React, { useEffect, useState } from "react";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import Stack from "@mui/material/Stack";
// import Box from "@mui/material/Box";
// import DoneIcon from '@mui/icons-material/Done';
// import CancelIcon from '@mui/icons-material/Cancel';
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// // CSS components
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// export default function CustomerOrderTable() {

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [rows, setRows] = useState([]); // Holds the order data fetched from the API
//   const navigate = useNavigate();
//   const [customerId, setCustomerId] = useState("");
//   const [userId, setUserId] = useState("");

//    // Authentication check
//    useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/auth/authenticated", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (res.data.authenticated && res.data.user.role === "customer") {
//           setCustomerId(res.data.user.id);
//           console.log(customerId);
//         } else {
//           navigate("/login");
//         }
//       })
//       .catch((err) => {
//         console.error("Error during authentication:", err);
//       });
//   }, [navigate]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const fetchCustomerIdByUserId = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3001/api/customer/getCustomerIdByUserId/${userId}`);
//       setCustomerId(response.data);
//     } catch (error) {
//       console.error("Error fetching customer ID:", error);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchCustomerIdByUserId();
//     }
//   }, [userId]);

//   const fetchOrders = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/api/order/getOrdersByCustomerId/${customerId}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch orders");
//       }
//       const data = await response.json();
//       setRows(data[0]);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };

//   useEffect(() => {
//     if (customerId) {
//       fetchOrders();
//     }
//   }, [customerId]); // Fetch orders only when customerId is set

//   return (
//     <>
//       <Paper sx={{ width: "100%", overflow: "hidden" }}>
//         <Box height={10} />
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "20px",
//             marginRight: "20px",
//           }}
//         >
//         </div>
//         <TableContainer sx={{ maxHeight: 440 }}>
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>OrderID</TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>Gift Box ID</TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>Quantity</TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>Price</TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>Order Date</TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>Due Date</TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>Status</TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row) => (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
//                     <TableCell align={"left"}>{row.orderId}</TableCell>
//                     <TableCell align={"left"}>{row.giftboxId}</TableCell>
//                     <TableCell align={"left"}>{row.quantity}</TableCell>
//                     <TableCell align={"left"}>{row.price}</TableCell>
//                     <TableCell align={"left"}>{row.orderDate}</TableCell>
//                     <TableCell align={"left"}>{row.dueDate}</TableCell>
//                     <TableCell align={"left"}>{row.orderStatus}</TableCell>
//                     <TableCell align={"left"}>
//                       <Stack spacing={2}>
//                         <DoneIcon
//                           style={{ fontSize: "20px", color: "#02294F", cursor: "pointer" }}
//                           className="cursor-pointer"
//                         />
//                         <CancelIcon
//                           style={{ fontSize: "20px", color: "#02294F", cursor: "pointer" }}
//                           className="cursor-pointer"
//                         />
//                       </Stack>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </>
//   );
// }

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
import Swal from "sweetalert2";
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function CustomerOrderTable( closeEvent) {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [rows, setRows] = useState([]); //rows: Holds the order data fetched from the API.

  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState("");
  const [userId, setUserId] = useState("");

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
      .get("http://localhost:3001/api/auth/authenticated", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.authenticated && res.data.user.role === "customer") {
          setUserId(res.data.user.id);
          console.log(userId);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("Error during authentication:", err);
      });
  }, [navigate]);

  useEffect(() => {
    if (userId) { // Only fetch customer ID if userId is defined
      const fetchCustomerIdByUserId = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/user/getCustomerIdByUserId/${userId}`);
          setCustomerId(response.data.customerId);
        } catch (error) {
          console.error("Error fetching customer ID:", error);
        }
      };
  
      fetchCustomerIdByUserId();
    }
  }, [userId]);
  
  useEffect(() => {
    if(customerId) { // Only fetch orders if customerId is defined
      console.log("Fetching orders for customerId:", customerId);
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/order/getOrdersByCustomerId/${customerId}`);
        setRows(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    fetchOrders();
  }
  }, [customerId]);

  const handleOrderCancel = async (orderId) => {
    console.log("Cancelling order with ID:", orderId);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this order? Note that unreasonable cancellations may affect on reimbursement.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes!",
      cancelButtonText: "No",
    });
  
    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3001/api/order/updateOrderStatusWhenCancelled/${orderId}`, {
          method: "PUT",
        });
  
        if (response.ok) {
          // If the cancellation is successful, show a success alert
          Swal.fire("Success", "Order has been cancelled.", "success");
        } else {
          // Show an error alert if the response is not successful
          Swal.fire("Error", "Failed to cancel the order. Please try again.", "error");
        }
      } catch (error) {
        console.error("Error cancelling the order:", error);
        
        // Show an error alert if there's an issue with the request
        Swal.fire("Error", "Failed to cancel the order. Please try again.", "error");
      }
      window.location.reload();
    }
  };
  
  

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
                {/* <TableCell align="left" style={{ minWidth: "100px" }}>
                  Customer Email
                </TableCell> */}
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Gift Box ID
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Quantity
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Price(LKR)
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
                    {/* <TableCell key={row.id} align={"left"}>
                      {row.customerId}
                    </TableCell> */}
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