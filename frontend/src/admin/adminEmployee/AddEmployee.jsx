// import { Grid, IconButton, Typography } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import CloseIcon from "@mui/icons-material/Close";
// import Swal from "sweetalert2";
// import Modal from "@mui/material/Modal";
// import Autocomplete from "@mui/material/Autocomplete";

// function AddEmployee({ open, closeEvent }) {

//   const modalStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 600,
//     bgcolor: 'background.paper',
//     borderRadius: 4,
//     boxShadow: 24,
//     p: 4,
//   };

//   const backdropStyle = {
//     backdropFilter: 'blur(3px)', // Light black background with a blur effect
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//   };

//   const [employeeFirstName, setEmployeeFirstName] = useState("");
//   const [employeeLastName, setEmployeeLastName] = useState("");
//   const [employeeContact, setEmployeeContact] = useState("");
//   const [employeeGender, setEmployeeGender] = useState("");
//   const [employeeNIC, setEmployeeNIC] = useState("");
//   const [employeeAddress, setEmployeeAddress] = useState("");
//   const [workingStatus, setWorkingStatus] = useState("");

//   const [error, setError] = useState("");

//   const genderOptions = ["Female", "Male", "Preferred not to mention"];
//   const workingStatusOptions = ["Active", "Inactive"];

//   const handleFirstNameChange = (event) => {
//     setEmployeeFirstName(event.target.value);
//   };

//   const handleLastNameChange = (event) => {
//     setEmployeeLastName(event.target.value);
//   };

//   const handleContactChange = (event) => {
//     setEmployeeContact(event.target.value);
//   };

//   const handleGenderChange = (event) => {
//     setEmployeeGender(event.target.value);
//   };

//   const handleNICChange = (event) => {
//     setEmployeeNIC(event.target.value);
//   };

//   const handleAddressChange = (event) => {
//     setEmployeeAddress(event.target.value);
//   };

//   const handleWorkingStatusChange = (event) => {
//     setWorkingStatus(event.target.value);
//   };

//   const handleSubmit = () => {
//     // Validation
//     if (!employeeFirstName || !employeeLastName || !employeeContact || !employeeGender || !employeeNIC || !employeeAddress || !workingStatus) {
//       setError("Please fill out all fields.");
//       return;
//     }

//     // Make POST request to backend
//     fetch("http://localhost:3001/api/employee/addEmployee", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         employeeFirstName,
//         employeeLastName,
//         employeeContact,
//         employeeGender,
//         employeeNIC,
//         employeeAddress,
//         workingStatus,
//       }),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to add employee");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Employee created:", data);
//         Swal.fire("Success!", "Employee added successfully.", "success");
//         // Close the modal after success
//         closeEvent();
//         window.location.reload();
//       })
//       .catch((error) => {
//         console.error("Error adding employee:", error);
//         Swal.fire("Error!", "Failed to add the employee.", "error");
//         // Close the modal even if there's an error
//         closeEvent();
//       });
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={closeEvent}
//       aria-labelledby="add-employee-modal-title"
//       aria-describedby="add-employee-modal-description"
//       style={backdropStyle}
//     >
//       <Box sx={modalStyle}>
//         <IconButton
//           style={{ position: "absolute", top: 10, right: 10 }}
//           onClick={closeEvent}
//         >
//           <CloseIcon />
//         </IconButton>
//         <Typography variant="h5" align="center" id="add-employee-modal-title">
//           Add Employee
//         </Typography>
//         <Box height={20}></Box>
//         <Grid container spacing={2}>
//           <Grid item xs={6}>
//             <TextField
//               id="first-name"
//               label="First Name"
//               variant="outlined"
//               size="small"
//               value={employeeFirstName}
//               onChange={handleFirstNameChange}
//               sx={{ width: "100%" }}
//             />
//           </Grid>

//           <Grid item xs={6}>
//             <TextField
//               id="last-name"
//               label="Last Name"
//               variant="outlined"
//               size="small"
//               value={employeeLastName}
//               onChange={handleLastNameChange}
//               sx={{ width: "100%" }}
//             />
//           </Grid>

//           <Grid item xs={6}>
//             <TextField
//               id="contact"
//               label="Contact"
//               variant="outlined"
//               size="small"
//               value={employeeContact}
//               onChange={handleContactChange}
//               sx={{ width: "100%" }}
//             />
//           </Grid>

//           <Grid item xs={6}>
//       <Autocomplete
//         options={genderOptions}
//         value={employeeGender}
//         onChange={(event, newValue) => setEmployeeGender(newValue)}  // Corrected this line
//         renderInput={(params) => (
//           <TextField
//             {...params} // This spreads all the necessary props to the TextField
//             label="Gender"
//             variant="outlined"
//             size="small"
//             fullWidth
//           />
//         )}
//       />
//     </Grid>
//           <Grid item xs={6}>
//             <TextField
//               id="nic"
//               label="NIC"
//               variant="outlined"
//               size="small"
//               value={employeeNIC}
//               onChange={handleNICChange}
//               sx={{ width: "100%" }}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               id="address"
//               label="Address"
//               variant="outlined"
//               size="small"
//               value={employeeAddress}
//               onChange={handleAddressChange}
//               fullWidth
//               multiline
//               rows={4}
//             />
//           </Grid>

// <Grid item xs={6}>
//       <Autocomplete
//         options={workingStatusOptions}
//         value={workingStatus}
//         onChange={(event, newValue) => setWorkingStatus(newValue)}
//         renderInput={(params) => (
//           <TextField
//             {...params} // This spreads all the necessary props to the TextField
//             label="Working Status"
//             variant="outlined"
//             size="small"
//             fullWidth
//           />
//         )}
//       />
//     </Grid>

//           {error && (
//             <Typography variant="body2" color="error" align="center">
//               {error}
//             </Typography>
//           )}
//           <Grid item xs={12}>
//             <Typography variant="h5" align="center">
//               <Button variant="contained" onClick={handleSubmit}>
//                 Submit Employee
//               </Button>
//             </Typography>
//           </Grid>
//         </Grid>

//         <Box sx={{ m: 2 }}></Box>

//       </Box>
//     </Modal>
//   );
// }

// export default AddEmployee;

// import { Grid, IconButton, Typography } from "@mui/material";
// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import CloseIcon from "@mui/icons-material/Close";
// import Swal from "sweetalert2";
// import Modal from "@mui/material/Modal";
// import Autocomplete from "@mui/material/Autocomplete";

// function AddEmployee({ open, closeEvent }) {
//   const modalStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 600,
//     bgcolor: 'background.paper',
//     borderRadius: 4,
//     boxShadow: 24,
//     p: 4,
//   };

//   const backdropStyle = {
//     backdropFilter: 'blur(3px)',
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//   };

//   const [employeeFirstName, setEmployeeFirstName] = useState("");
//   const [employeeLastName, setEmployeeLastName] = useState("");
//   const [employeeContact, setEmployeeContact] = useState("");
//   const [employeeGender, setEmployeeGender] = useState("");
//   const [employeeNIC, setEmployeeNIC] = useState("");
//   const [employeeAddress, setEmployeeAddress] = useState("");
//   const [workingStatus, setWorkingStatus] = useState("");
//   // const [employeeImage, setEmployeeImage] = useState(null); // State for the image file

//   const [error, setError] = useState("");

//   const genderOptions = ["Female", "Male", "Preferred not to mention"];
//   const workingStatusOptions = ["Active", "Inactive"];

//   const handleFirstNameChange = (event) => {
//     setEmployeeFirstName(event.target.value);
//   };

//   const handleLastNameChange = (event) => {
//     setEmployeeLastName(event.target.value);
//   };

//   const handleContactChange = (event) => {
//     setEmployeeContact(event.target.value);
//   };

//   // const handleGenderChange = (event) => {
//   //   setEmployeeGender(event.target.value);
//   // };

//   const handleNICChange = (event) => {
//     setEmployeeNIC(event.target.value);
//   };

//   const handleAddressChange = (event) => {
//     setEmployeeAddress(event.target.value);
//   };

//   // const handleWorkingStatusChange = (event) => {
//   //   setWorkingStatus(event.target.value);
//   // };

//   // const handleImageChange = (event) => {
//   //   setEmployeeImage(event.target.files[0]);
//   // };

//   const handleSubmit = () => {
//     if (!employeeFirstName || !employeeLastName || !employeeContact || !employeeGender || !employeeNIC || !employeeAddress || !workingStatus ) {
//       setError("Please fill out all fields.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('employeeFirstName', employeeFirstName);
//     formData.append('employeeLastName', employeeLastName);
//     formData.append('employeeContact', employeeContact);
//     formData.append('employeeGender', employeeGender);
//     formData.append('employeeNIC', employeeNIC);
//     formData.append('employeeAddress', employeeAddress);
//     formData.append('workingStatus', workingStatus);
//     // formData.append('employeeImage', employeeImage);

//     fetch("http://localhost:3001/api/employee/addEmployee", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to add employee");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Employee created:", data);
//         Swal.fire("Success!", "Employee added successfully.", "success");
//         closeEvent();
//         window.location.reload();
//       })
//       .catch((error) => {
//         console.error("Error adding employee:", error);
//         Swal.fire("Error!", "Failed to add the employee.", "error");
//         closeEvent();
//       });
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={closeEvent}
//       aria-labelledby="add-employee-modal-title"
//       aria-describedby="add-employee-modal-description"
//       style={backdropStyle}
//     >
//       <Box sx={modalStyle}>
//         <IconButton
//           style={{ position: "absolute", top: 10, right: 10 }}
//           onClick={closeEvent}
//         >
//           <CloseIcon />
//         </IconButton>
//         <Typography variant="h5" align="center" id="add-employee-modal-title">
//           Add Employee
//         </Typography>
//         <Box height={20}></Box>
//         <Grid container spacing={2}>

//         {/* <Grid item xs={12}>
//             <TextField
//               id="employee-image"
//               label="Employee Image"
//               type="file"
//               variant="outlined"
//               size="small"
//               onChange={handleImageChange}
//               sx={{ width: "100%", height: "100%" }}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid> */}
//           <Grid item xs={6}>
//             <TextField
//               id="first-name"
//               label="First Name"
//               variant="outlined"
//               size="small"
//               value={employeeFirstName}
//               onChange={handleFirstNameChange}
//               sx={{ width: "100%" }}
//             />
//           </Grid>

//           <Grid item xs={6}>
//             <TextField
//               id="last-name"
//               label="Last Name"
//               variant="outlined"
//               size="small"
//               value={employeeLastName}
//               onChange={handleLastNameChange}
//               sx={{ width: "100%" }}
//             />
//           </Grid>

//           <Grid item xs={6}>
//             <TextField
//               id="contact"
//               label="Contact"
//               variant="outlined"
//               size="small"
//               value={employeeContact}
//               onChange={handleContactChange}
//               sx={{ width: "100%" }}
//             />
//           </Grid>

//           <Grid item xs={6}>
//             <Autocomplete
//               options={genderOptions}
//               value={employeeGender}
//               onChange={(event, newValue) => setEmployeeGender(newValue)}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Gender"
//                   variant="outlined"
//                   size="small"
//                   fullWidth
//                 />
//               )}
//             />
//           </Grid>

//           <Grid item xs={6}>
//             <TextField
//               id="nic"
//               label="NIC"
//               variant="outlined"
//               size="small"
//               value={employeeNIC}
//               onChange={handleNICChange}
//               sx={{ width: "100%" }}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               id="address"
//               label="Address"
//               variant="outlined"
//               size="small"
//               value={employeeAddress}
//               onChange={handleAddressChange}
//               fullWidth
//               multiline
//               rows={3}
//             />
//           </Grid>

//           <Grid item xs={6}>
//             <Autocomplete
//               options={workingStatusOptions}
//               value={workingStatus}
//               onChange={(event, newValue) => setWorkingStatus(newValue)}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Working Status"
//                   variant="outlined"
//                   size="small"
//                   fullWidth
//                 />
//               )}
//             />
//           </Grid>

//           {error && (
//             <Typography variant="body2" color="error" align="center">
//               {error}
//             </Typography>
//           )}

//           <Grid item xs={12}>
//             <Typography variant="h5" align="center">
//               <Button variant="contained" onClick={handleSubmit}>
//                 Submit Employee
//               </Button>
//             </Typography>
//           </Grid>
//         </Grid>

//         <Box sx={{ m: 2 }}></Box>
//       </Box>
//     </Modal>
//   );
// }

// export default AddEmployee;

import * as React from 'react';
import { Grid, IconButton, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import Modal from '@mui/material/Modal';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

function AddEmployee({ open, closeEvent }) {
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/auth/authenticated', {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.authenticated && res.data.user.role === 'admin') {
          // setUser(res.data.user); // Set user data if authenticated
          // customerId(res.data.user.id);
        } else {
          navigate('/login'); // Redirect to login if not authenticated
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
  };

  const backdropStyle = {
    backdropFilter: 'blur(3px)', // Light black background with a blur effect
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  };

  const [employeeFirstName, setEmployeeFirstName] = useState('');
  const [employeeLastName, setEmployeeLastName] = useState('');
  const [employeeContact, setEmployeeContact] = useState('');
  const [employeeGender, setEmployeeGender] = useState('');
  const [employeeNIC, setEmployeeNIC] = useState('');
  const [employeeAddress, setEmployeeAddress] = useState('');
  const [workingStatus, setWorkingStatus] = useState('');

  const [error, setError] = useState('');

  const genderOptions = ['Female', 'Male', 'Preferred not to mention'];
  const workingStatusOptions = ['Active', 'Inactive'];

  const handleFirstNameChange = (event) => {
    setEmployeeFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setEmployeeLastName(event.target.value);
  };

  const handleContactChange = (event) => {
    setEmployeeContact(event.target.value);
  };

  // const handleGenderChange = (event) => {
  //   setEmployeeGender(event.target.value);
  // };

  const handleNICChange = (event) => {
    setEmployeeNIC(event.target.value);
  };

  const handleAddressChange = (event) => {
    setEmployeeAddress(event.target.value);
  };

  // const handleWorkingStatusChange = (event) => {
  //   setWorkingStatus(event.target.value);
  // };

  const handleSubmit = () => {
    // Validation
    if (
      !employeeFirstName ||
      !employeeLastName ||
      !employeeContact ||
      !employeeGender ||
      !employeeNIC ||
      !employeeAddress ||
      !workingStatus
    ) {
      setError('Please fill out all fields.');
      return;
    }

    // Make POST request to backend
    fetch('http://localhost:3001/api/employee/addEmployee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employeeFirstName,
        employeeLastName,
        employeeContact,
        employeeGender,
        employeeNIC,
        employeeAddress,
        workingStatus,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add employee');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Employee created:', data);
        Swal.fire('Success!', 'Employee added successfully.', 'success');
        // Close the modal after success
        closeEvent();
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error adding employee:', error);
        Swal.fire('Error!', 'Failed to add the employee.', 'error');
        // Close the modal even if there's an error
        closeEvent();
      });
  };

  return (
    <Modal
      open={open}
      onClose={closeEvent}
      aria-labelledby="add-employee-modal-title"
      aria-describedby="add-employee-modal-description"
      style={backdropStyle}
    >
      <Box sx={modalStyle}>
        <IconButton style={{ position: 'absolute', top: 10, right: 10 }} onClick={closeEvent}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" align="center" id="add-employee-modal-title">
          Add Employee
        </Typography>
        <Box height={20}></Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="first-name"
              label="First Name"
              variant="outlined"
              size="small"
              value={employeeFirstName}
              onChange={handleFirstNameChange}
              sx={{ width: '100%' }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="last-name"
              label="Last Name"
              variant="outlined"
              size="small"
              value={employeeLastName}
              onChange={handleLastNameChange}
              sx={{ width: '100%' }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="contact"
              label="Contact"
              variant="outlined"
              size="small"
              value={employeeContact}
              onChange={handleContactChange}
              sx={{ width: '100%' }}
            />
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              options={genderOptions}
              value={employeeGender}
              onChange={(event, newValue) => setEmployeeGender(newValue)} // Corrected this line
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
          <Grid item xs={6}>
            <TextField
              id="nic"
              label="NIC"
              variant="outlined"
              size="small"
              value={employeeNIC}
              onChange={handleNICChange}
              sx={{ width: '100%' }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="address"
              label="Address"
              variant="outlined"
              size="small"
              value={employeeAddress}
              onChange={handleAddressChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              options={workingStatusOptions}
              value={workingStatus}
              onChange={(event, newValue) => setWorkingStatus(newValue)}
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
          {/* <Grid item xs={12}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={['DateRangePicker']}
      >
        <DemoItem component="DateRangePicker">
          <DateRangePicker calendars={1} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
    </Grid> */}

          {error && (
            <Typography variant="body2" color="error" align="center">
              {error}
            </Typography>
          )}
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              <Button variant="contained" onClick={handleSubmit}>
                Submit Employee
              </Button>
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ m: 2 }}></Box>
      </Box>
    </Modal>
  );
}

export default AddEmployee;
