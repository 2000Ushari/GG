import React from "react";
import { useState, useEffect } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import Swal from "sweetalert2";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// function CreateMyGiftbox({ open, closeEvent }) {
//   const navigate = useNavigate();

//     // Authentication check
//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/auth/authenticated", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (res.data.authenticated && res.data.user.role === "customer") {
//           // setUser(res.data.user); // Set user data if authenticated
//           // customerId(res.data.user.id);
//         } else {
//           navigate("/login"); // Redirect to login if not authenticated
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [navigate]);

//     const modalStyle = {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: 600,
//         bgcolor: 'background.paper',
//         borderRadius: 4,
//         boxShadow: 24,
//         p: 4,
//       };

//       const backdropStyle = {
//         backdropFilter: 'blur(3px)', // Light black background with a blur effect
//         backgroundColor: 'rgba(0, 0, 0, 0.6)',
//       };

//       const [giftboxName, setGiftboxName] = useState("");
//       const [giftboxType, setGiftboxType] = useState("");
//       const [giftboxDescription, setGiftboxDescription] = useState("");
//     //   const [giftboxPrice, setGiftboxPrice] = useState("");
//       const [noteContent, setNoteContent] = useState("");
//       const [boxColor, setBoxColor] = useState("");
//     //   const [giftboxCapacity, setGiftboxCapacity] = useState("");

//     const [error, setError] = useState("");

//     const handleGiftboxNameChange = (event) => {
//         setGiftboxName(event.target.value);
//     };

//     // const handleGidboxTypeChange = (event) => {
//     //     setGiftboxType(event.target.value);
//     // };

//     const handleGiftboxDescriptionChange = (event) => {
//         setGiftboxDescription(event.target.value);
//     };

//     const handleNoteContentChange = (event) => {
//         setNoteContent(event.target.value);
//     };

//     const handleBoxColorChange = (event) => {
//         setBoxColor(event.target.value);
//     };

//     const handleSubmit = () => {
//         // Validation
//         if (!giftboxName) {
//           setError("Please provide a name for the giftbox.");
//           return;
//         }

//         // Make POST request to backend
//         fetch("http://localhost:3001/api/customer/createMyGiftbox", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             giftboxName,
//             giftboxType,
//             giftboxDescription,
//             noteContent,
//             boxColor,
//             // giftboxPrice,
//             // giftboxCapacity,
//           }),
//         })
//           .then((response) => {
//             if (!response.ok) {
//               throw new Error("Failed to create giftbox");
//             }
//             return response.json();
//           })
//           .then((data) => {
//             console.log("Giftbox created:", data);
//             Swal.fire("Success!", "Gift box created successfully.", "success");
//             // Close the modal after success
//             closeEvent();
//             window.location.reload();
//           })
//           .catch((error) => {
//             console.error("Error creating giftbox:", error);
//             Swal.fire("Error!", "Failed to create the giftbox Please try again.", "error");
//             // Close the modal even if there's an error
//             closeEvent();
//           });
//       };

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
//         <Typography variant="h5" align="center" id="create-giftbox-modal-title">
//           Add Employee
//         </Typography>
//         <Box height={20}></Box>
//         <Grid container spacing={2}>
//           <Grid item xs={6}>
//             <TextField
//               id="giftbox-name"
//               label="Gift box Name"
//               variant="outlined"
//               size="small"
//               value={giftboxName} placeholder="Enter giftbox name"
//               onChange={handleGiftboxNameChange}
//               sx={{ width: "100%" }}
//             />
//           </Grid>

//           <Grid item xs={6}>
//             <TextField
//               id="giftbox-description"
//               label="Gift box description"
//               variant="outlined"
//               size="medium" placeholder="Enter giftbox description"
//               value={giftboxDescription}
//               onChange={handleGiftboxDescriptionChange}
//               sx={{ width: "100%" }}
//             />
//           </Grid>

//           <Grid item xs={6}>
//       <Autocomplete
//         //options={boxColorOptions}
//         value={boxColor}
//         onChange={(event, newValue) => setBoxColor(newValue)}  // Corrected this line
//         renderInput={(params) => (
//           <TextField
//             {...params} // This spreads all the necessary props to the TextField
//             label="Box color options"
//             variant="outlined"
//             size="small"
//             fullWidth
//           />
//         )}
//       />

//           {error && (
//             <Typography variant="body2" color="error" align="center">
//               {error}
//             </Typography>
//           )}
//           <Grid item xs={12}>
//             <Typography variant="h5" align="center">
//               <Button variant="contained" onClick={handleSubmit}>
//                 Create a Giftbox
//               </Button>
//             </Typography>
//           </Grid>
//         </Grid>

//         <Box sx={{ m: 2 }}></Box>
//         </Grid>
//       </Box>
//     </Modal>
//   );
// }

// export default CreateMyGiftbox

function CreateMyGiftbox({ open, closeEvent }) {
  const [giftboxName, setGiftboxName] = useState("");
  const [giftboxDescription, setGiftboxDescription] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [boxColor, setBoxColor] = useState("");
  const [error, setError] = useState("");

  const [selectedBoxColor, setSelectedBoxColor] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
  };

  const backdropStyle = {
    backdropFilter: "blur(3px)", // Light black background with a blur effect
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  };

// Authentication check
useEffect(() => {
  axios
    .get("http://localhost:3001/api/auth/authenticated", {
      withCredentials: true,
    })
    .then((res) => {
      if (res.data.authenticated && res.data.user.role === "customer") {
        // setUser(res.data.user); // Set user data if authenticated
        setCustomerId(res.data.user.id); // Correctly set customer ID
      } else {
        navigate("/login"); // Redirect to login if not authenticated
      }
    })
    .catch((err) => {
      console.log(err);
    });
}, [navigate]);

  const handleGiftboxNameChange = (event) => {
    setGiftboxName(event.target.value);
  };

  const handleGiftboxDescriptionChange = (event) => {
    setGiftboxDescription(event.target.value);
  };

  const handleNoteContentChange = (event) => {
    setNoteContent(event.target.value);
  };

  const handleSubmit = () => {
    // Validation
    if (!giftboxName) {
      setError("Please provide a name for the giftbox.");
      return;
    }

    // Make POST request to backend
    fetch("http://localhost:3001/api/giftbox/createMyGiftbox", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        giftboxName,
        userId: customerId, // Send the customer ID
        giftboxDescription,
        noteContent,
        boxColorId: selectedBoxColor?.boxColorId || null, // Send the selected color ID
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create giftbox");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Giftbox created:", data);
        Swal.fire("Success!", "Gift box created successfully.", "success");
        closeEvent();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error creating giftbox:", error);
        Swal.fire(
          "Error!",
          "Failed to create the giftbox. Please try again.",
          "error"
        );
        closeEvent();
      });
  };

  const fetchBoxColors = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/giftbox/getboxColors");
      if (!response.ok) {
        throw new Error("Failed to fetch box colors");
      }
      const data = await response.json();
      setBoxColor(data); // Ensure data is an array
    } catch (error) {
      console.error("Error fetching box colors:", error);
    }
  };
  
  useEffect(() => {
    fetchBoxColors();
  }, []);

  return (
    <Modal
      open={open}
      onClose={closeEvent}
      aria-labelledby="create-giftbox-modal-title"
      aria-describedby="create-giftbox-modal-description"
      style={backdropStyle}
    >
      <Box sx={modalStyle}>
        <IconButton
          style={{ position: "absolute", top: 10, right: 10 }}
          onClick={closeEvent}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" align="center" id="create-giftbox-modal-title">
          Create Giftbox
        </Typography>
        <Box height={20}></Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="giftbox-name"
              label="Gift box Name"
              variant="outlined"
              size="small"
              value={giftboxName}
              placeholder="Enter giftbox name"
              onChange={handleGiftboxNameChange}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={6}>
          <Autocomplete
            value={selectedBoxColor}
            onChange={(event, newValue) => setSelectedBoxColor(newValue)}
            id="boxColor-select"
            options={boxColor || []} // Ensure options is an array
            getOptionLabel={(option) => option.color} // Adjust this based on your data structure
            renderInput={(params) => (
              <TextField
                {...params}
                label="Box Color"
                variant="outlined"
                size="small"
              />
            )}
          />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="giftbox-description"
              label="Gift box description"
              variant="outlined"
              size="medium"
              placeholder="Enter giftbox description"
              value={giftboxDescription}
              onChange={handleGiftboxDescriptionChange}
              sx={{ width: "100%" }}
              multiline
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="noteContent"
              label="Gift box Note"
              variant="outlined"
              size="medium"
              placeholder="Enter you gift box note"
              value={noteContent}
              onChange={handleNoteContentChange}
              sx={{ width: "100%" }}
              multiline
            />
          </Grid>

          {error && (
            <Typography variant="body2" color="error" align="center">
              {error}
            </Typography>
          )}
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              <Button variant="contained" onClick={handleSubmit}>
                Create a Giftbox
              </Button>
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ m: 2 }}></Box>
      </Box>
    </Modal>
  );
}

export default CreateMyGiftbox;
