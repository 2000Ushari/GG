// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// import TextField from '@mui/material/TextField';
// import * as XLSX from 'xlsx';
// import Swal from 'sweetalert2';
// import Stack from '@mui/material/Stack';
// import Grid from '@mui/material/Grid';
// import moment from 'moment';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// function CapacityTable() {
//   const [rows, setRows] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [capacityInUnits, setCapacityInUnits] = useState('');
//   const [wrappingCharge, setWrappingCharge] = useState('');
//   const [selectedCapacity, setSelectedCapacity] = useState(null);
//   const [editCapacity, setEditCapacity] = useState('');
//   const [editCharge, setEditCharge] = useState('');

//   const fetchCapacities = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/api/configurations/getCapacity');
//       const data = await response.json();
//       setRows(data);
//     } catch (error) {
//       console.error('Error fetching capacities:', error);
//     }
//   };

//   const addNewCapacity = async () => {
//     if (
//       !capacityInUnits ||
//       isNaN(capacityInUnits) ||
//       capacityInUnits <= 0 ||
//       !wrappingCharge ||
//       isNaN(wrappingCharge) ||
//       wrappingCharge < 0
//     ) {
//       Swal.fire('Invalid Input', 'Please enter valid numeric values for both fields.', 'warning');
//       return;
//     }

//     try {
//       await axios.post('http://localhost:3001/api/configurations/addCapacity', {
//         capacityInUnits: parseInt(capacityInUnits),
//         wrappingCharge: parseFloat(wrappingCharge),
//       });
//       Swal.fire('Success', 'New capacity added successfully!', 'success');
//       setCapacityInUnits('');
//       setWrappingCharge('');
//       setOpen(false);
//       fetchCapacities();
//     } catch (error) {
//       if (error.response?.status === 409) {
//         Swal.fire('Duplicate', 'This capacity already exists.', 'info');
//       } else {
//         Swal.fire('Error', 'Failed to add capacity.', 'error');
//       }
//     }
//   };

//   const updateCapacity = async () => {
//     if (
//       !editCapacity ||
//       isNaN(editCapacity) ||
//       editCapacity <= 0 ||
//       !editCharge ||
//       isNaN(editCharge) ||
//       editCharge < 0
//     ) {
//       Swal.fire('Invalid Input', 'Please enter valid numeric values for both fields.', 'warning');
//       return;
//     }
//     try {
//       await axios.put(`http://localhost:3001/api/configurations/updateCapacity/${selectedCapacity.capacityId}`, {
//         capacityInUnits: parseInt(editCapacity),
//         wrappingCharge: parseFloat(editCharge),
//       });

//       Swal.fire('Success', 'Capacity updated successfully!', 'success');
//       setSelectedCapacity(null);
//       setEditCapacity('');
//       setEditCharge('');
//       fetchCapacities();
//     } catch (error) {
//       if (error.response?.status === 409) {
//         Swal.fire('Duplicate', 'This capacity already exists.', 'info');
//       } else {
//         Swal.fire('Error', 'Failed to update capacity.', 'error');
//       }
//     }
//   };

//   //export to excel
// const exportToExcel = () => {
//   const formattedData = rows.map((row) => ({
//     'Capacity In Units': row.capacityInUnits,
//     'Wrapping Charge (LKR)': row.wrappingCharge,
//     'Last Modified On': moment(row.modifiedOn).format('YYYY-MM-DD HH:mm:ss'),
//   }));

//   const worksheet = XLSX.utils.json_to_sheet(formattedData);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, 'Giftbox Capacities');

//   const now = new Date();
//   const timestamp =
//     now.toLocaleDateString('en-GB').split('/').reverse().join('-') +
//     '_' +
//     now.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '-');
//   const fileName = `GiftboxCapacities_${timestamp}.xlsx`;

//   XLSX.writeFile(workbook, fileName);
//   Swal.fire('Downloaded', 'Excel file has been downloaded.', 'success');
// };

//   useEffect(() => {
//     fetchCapacities();
//   }, []);

//   return (
//     <>
//       <Paper sx={{ width: '60%', overflow: 'hidden' }}>
//         <Box height={15} />
//         <TableContainer sx={{ maxHeight: 440 }}>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow>
//                 <TableCell style={{ fontWeight: 'bold' }}>Capacity In Units</TableCell>
//                 <TableCell style={{ fontWeight: 'bold' }}>Wrapping Charge (LKR)</TableCell>
//                 <TableCell style={{ fontWeight: 'bold' }}>Last Modified On</TableCell>
//                 <TableCell align="right" style={{ fontWeight: 'bold' }}>
//                   Action
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows.map((row) => (
//                 <TableRow hover key={row.capacityId}>
//                   <TableCell>{row.capacityInUnits}</TableCell>
//                   <TableCell align="right">{row.wrappingCharge}.00</TableCell>
//                   <TableCell align="right">{moment(row.modifiedOn).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
//                   <TableCell align="right">
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={() => {
//                         setSelectedCapacity(row);
//                         setEditCapacity(row.capacityInUnits);
//                         setEditCharge(row.wrappingCharge);
//                       }}
//                     >
//                       Update
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>

//       <Box sx={{ mt: 3, ml: 1 }}>
//         <Button variant="contained" onClick={() => setOpen(true)} sx={{ mr: 2 }}>
//           Add New Capacity
//         </Button>
//         <Button variant="outlined" color="success" onClick={exportToExcel}>
//           Export
//         </Button>
//       </Box>

//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box sx={style}>
//           <Typography variant="h6" gutterBottom>
//             Add New Capacity
//           </Typography>
//           <TextField
//             fullWidth
//             label="Capacity In Units"
//             type="number"
//             value={capacityInUnits}
//             onChange={(e) => setCapacityInUnits(e.target.value)}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Wrapping Charge (LKR)"
//             type="number"
//             value={wrappingCharge}
//             onChange={(e) => setWrappingCharge(e.target.value)}
//             margin="normal"
//           />
//           <Button variant="contained" onClick={addNewCapacity}>
//             Add
//           </Button>
//         </Box>
//       </Modal>

//       <Modal open={!!selectedCapacity} onClose={() => setSelectedCapacity(null)}>
//         <Box sx={style}>
//           <Typography variant="h6" gutterBottom>
//             Update Capacity
//           </Typography>
//           <TextField
//             fullWidth
//             label="Capacity In Units"
//             type="number"
//             value={editCapacity}
//             onChange={(e) => setEditCapacity(e.target.value)}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Wrapping Charge (LKR)"
//             type="number"
//             value={editCharge}
//             onChange={(e) => setEditCharge(e.target.value)}
//             margin="normal"
//           />
//           <Box mt={2} textAlign="right">
//             <Button variant="contained" onClick={updateCapacity}>
//               Update
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </>
//   );
// }

// export default CapacityTable;

// =========================
// FRONTEND: CapacityTable.jsx (with Duplicate Check on Add Only)
// =========================

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
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import moment from 'moment';

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

function CapacityTable() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [capacityInUnits, setCapacityInUnits] = useState('');
  const [wrappingCharge, setWrappingCharge] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState(null);
  const [editCapacity, setEditCapacity] = useState('');
  const [editCharge, setEditCharge] = useState('');

  const fetchCapacities = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/configurations/getCapacity');
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error('Error fetching capacities:', error);
    }
  };

  const addNewCapacity = async () => {
    if (
      !capacityInUnits ||
      isNaN(capacityInUnits) ||
      capacityInUnits <= 0 ||
      !wrappingCharge ||
      isNaN(wrappingCharge) ||
      wrappingCharge < 0
    ) {
      Swal.fire('Invalid Input', 'Please enter valid numeric values for both fields.', 'warning');
      return;
    }

    try {
      const exists = rows.some((row) => parseInt(row.capacityInUnits) === parseInt(capacityInUnits));
      if (exists) {
        Swal.fire('Duplicate', 'This capacity already exists.', 'info');
        return;
      }

      await axios.post('http://localhost:3001/api/configurations/addCapacity', {
        capacityInUnits: parseInt(capacityInUnits),
        wrappingCharge: parseFloat(wrappingCharge),
      });
      Swal.fire('Success', 'New capacity added successfully!', 'success');
      setCapacityInUnits('');
      setWrappingCharge('');
      setOpen(false);
      fetchCapacities();
    } catch (error) {
      Swal.fire('Error', 'Failed to add capacity.', 'error');
    }
  };

  const updateCapacity = async () => {
    if (
      !editCapacity ||
      isNaN(editCapacity) ||
      editCapacity <= 0 ||
      !editCharge ||
      isNaN(editCharge) ||
      editCharge < 0
    ) {
      Swal.fire('Invalid Input', 'Please enter valid numeric values for both fields.', 'warning');
      return;
    }

    try {
      await axios.put(`http://localhost:3001/api/configurations/updateCapacity/${selectedCapacity.giftboxCapacityId}`, {
        capacityInUnits: parseInt(editCapacity),
        wrappingCharge: parseFloat(editCharge),
      });

      Swal.fire('Success', 'Capacity updated successfully!', 'success');
      setSelectedCapacity(null);
      setEditCapacity('');
      setEditCharge('');
      fetchCapacities();
    } catch (error) {
      Swal.fire('Error', 'Failed to update capacity.', 'error');
    }
  };

  //export to excel
  const exportToExcel = () => {
    const formattedData = rows.map((row) => ({
      'Capacity In Units': row.capacityInUnits,
      'Wrapping Charge (LKR)': row.wrappingCharge,
      'Last Modified On': moment(row.modifiedOn).format('YYYY-MM-DD HH:mm:ss'),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Giftbox Capacities');

    const now = new Date();
    const timestamp =
      now.toLocaleDateString('en-GB').split('/').reverse().join('-') +
      '_' +
      now.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '-');
    const fileName = `GiftboxCapacities_${timestamp}.xlsx`;

    XLSX.writeFile(workbook, fileName);
    Swal.fire('Downloaded', 'Excel file has been downloaded.', 'success');
  };

  useEffect(() => {
    fetchCapacities();
  }, []);

  return (
    <>
      <Paper sx={{ width: '60%', overflow: 'hidden' }}>
        <Box height={15} />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Capacity In Units</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Wrapping Charge (LKR)</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Last Modified On</TableCell>
                <TableCell align="right" style={{ fontWeight: 'bold' }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow hover key={row.giftboxCapacityId}>
                  <TableCell>{row.capacityInUnits}</TableCell>
                  <TableCell align="right">{row.wrappingCharge}.00</TableCell>
                  <TableCell align="right">{moment(row.modifiedOn).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setSelectedCapacity(row);
                        setEditCapacity(row.capacityInUnits);
                        setEditCharge(row.wrappingCharge);
                      }}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box sx={{ mt: 3, ml: 1 }}>
        <Button variant="contained" onClick={() => setOpen(true)} sx={{ mr: 2 }}>
          Add New Capacity
        </Button>
        <Button variant="outlined" color="success" onClick={exportToExcel}>
          Export
        </Button>
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Add New Capacity
          </Typography>
          <TextField
            fullWidth
            label="Capacity In Units"
            type="number"
            value={capacityInUnits}
            onChange={(e) => setCapacityInUnits(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Wrapping Charge (LKR)"
            type="number"
            value={wrappingCharge}
            onChange={(e) => setWrappingCharge(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" onClick={addNewCapacity}>
            Add
          </Button>
        </Box>
      </Modal>

      <Modal open={!!selectedCapacity} onClose={() => setSelectedCapacity(null)}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Update Capacity
          </Typography>
          <TextField
            fullWidth
            label="Capacity In Units"
            type="number"
            value={editCapacity}
            onChange={(e) => setEditCapacity(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Wrapping Charge (LKR)"
            type="number"
            value={editCharge}
            onChange={(e) => setEditCharge(e.target.value)}
            margin="normal"
          />
          <Box mt={2} textAlign="right">
            <Button variant="contained" onClick={updateCapacity}>
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default CapacityTable;
