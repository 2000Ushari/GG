// import { Grid, IconButton, Typography } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import CloseIcon from "@mui/icons-material/Close";
// import Swal from "sweetalert2";
// import Autocomplete from "@mui/material/Autocomplete";
// import { Navigate } from "react-router-dom";
// import Modal from "@mui/material/Modal";

// function CreateGiftbox({ open, closeEvent }) {

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


//   const [giftboxName, setGiftboxName] = useState("");
//   const [giftboxPrice, setGiftboxPrice] = useState("");
//   const [giftboxDescription, setGiftboxDescription] = useState("");
//   const [giftboxQuantity, setGiftboxQuantity] = useState("");
//   const [giftboxColor, setGiftboxColor] = useState("");


//   const [error, setError] = useState("");

//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [accessories, setAccessories ] = useState([]);


//   const handleNameChange = (event) => {
//     setGiftboxName(event.target.value);
//   };

//   const handlePriceChange = (event) => {
//     setGiftboxPrice(event.target.value);
//   };

//   const handleDescriptionChange = (event) => {
//     setGiftboxDescription(event.target.value);
//   };

//   const handleQuantityChange = (event) => {
//     setGiftboxQuantity(event.target.value);
//   };

//   const handleColorChange = (event) => {
//     setGiftboxColor(event.target.value);
//   };

//   const handleSubmit = () => {
//     // Make POST request to backend
//     fetch("http://localhost:3001/api/accessory/addAccessory", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         giftboxName,
//         giftboxPrice,
//         giftboxDescription,
//         giftboxQuantity,
//         giftboxColor,
//         categoryId: selectedCategory.categoryId,
//       }),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to add giftbox");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Giftbox created:", data);
//         Swal.fire("Success!", "Giftbox added successfully.", "success");
//         // Close the modal after success
//         closeEvent();
//         window.location.reload();
//       })
//       .catch((error) => {
//         console.error("Error adding giftbox:", error);
//         Swal.fire("Error!", "Failed to add the giftbox.", "error");
//         // Close the modal even if there's an error
//         closeEvent();
//       });
//   };

//   const fetchAccessories = async () => {
//    try {
//     const response = await fetch("http://localhost:3001/api/accessory/getAccessory");
//     if (!response.ok) {
//      throw new Error("Failed to fetch accessories");
//     }
//      const data = await response.json();
//     setAccessories (data);
//    } catch (error) {
//      console.error("Error fetching accessories:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAccessories();
//   }, []);

//   return (
    

// <Modal
//       open={open}
//       onClose={closeEvent}
//       aria-labelledby="add-giftbox-modal-title"
//       aria-describedby="add-giftbox-modal-description"
//       style={backdropStyle}
//     >
//       <Box sx={modalStyle}>
//         <IconButton
//           style={{ position: "absolute", top: 10, right: 10 }}
//           onClick={closeEvent}
//         >
//           <CloseIcon />
//         </IconButton>
//         <Typography variant="h5" align="center" id="add-giftbox-modal-title">
//           Create Gift Box
//         </Typography>
      
//       <Box height={20}></Box>
//       <Grid container spacing={2} >
//       <Grid item xs={12}>
//           <Autocomplete
//             value={selectedCategory}
//             onChange={(event, newValue) => {
//               setSelectedCategory(newValue);
//             }}
//             id="accessory-select"
//             options={accessories}
//             getOptionLabel={(option) => option.accessoryName}
//             renderInput={(params) => (
//               <TextField {...params} label="Accessory" variant="outlined" size="small" />
//             )}
//           />
//         </Grid>

//         <Grid item xs={6}>
//           <TextField
//             id="outlined-basic"
//             label="Giftbox Name"
//             variant="outlined"
//             size="small"
//             value={giftboxName}
//             onChange={handleNameChange}
//             sx={{ width: "100%" }}
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <TextField
//             id="description"
//             label="Description"
//             variant="outlined"
//             size="small"
//             value={giftboxDescription}
//             onChange={handleDescriptionChange}
//             fullWidth
//             multiline
//             rows={4}
//           />
//         </Grid>

//         <Grid item xs={6}>
//           <TextField
//             id="price"
//             label="Price"
//             variant="outlined"
//             size="small"
//             type="number"
//             value={giftboxPrice}
//             onChange={handlePriceChange}
//             InputProps={{
//               startAdornment: "Rs.",
//             }}
//             fullWidth
//           />
//         </Grid>
        
        

//         <Grid item xs={6}>
//           <TextField
//             id="quantity"
//             label="Quantity"
//             variant="outlined"
//             size="small"
//             type="number"
//             value={giftboxQuantity}
//             onChange={handleQuantityChange}
//             InputProps={{
//               endAdornment: "units",
//             }}
//             fullWidth
//           />
//         </Grid>
        
//         <Grid item xs={12}>
//           <TextField
//             id="color"
//             label="Color"
//             variant="outlined"
//             size="small"
//             value={giftboxColor}
//             onChange={handleColorChange}
//             fullWidth
//           />
//         </Grid>

//         {error && (
//           <Typography variant="body2" color="error" align="center">
//             {error}
//           </Typography>
//         )}
//         <Grid item xs={12}>
//           <Typography variant="h5" align="center">
//             <Button variant="contained" onClick={handleSubmit}>
//               Create
//             </Button>
//           </Typography>
//         </Grid>
//       </Grid>

//       <Box sx={{ m: 2 }}></Box>
//       </Box>
//     </Modal>
//   );
// }

// export default CreateGiftbox;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Grid,
  Autocomplete,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


const AddGiftbox = ({ open, closeEvent }) => {
  const [giftboxData, setGiftboxData] = useState({
    giftboxName: '',
    giftboxPrice: '',
    noteContent: '',
    giftboxColor: '',
    accessories: [{ accessory: null, quantity: 1, price: 0 }],
  });
  const [accessoriesList, setAccessoriesList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const boxColorOptions = ["Black", "Maroon", "Red", "Brown", "Dark Blue", "White"];

  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/authenticated", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.authenticated && res.data.user.role === "admin") {
          // setUser(res.data.user); // Set user data if authenticated
          // customerId(res.data.user.id);
        } else {
          navigate("/login"); // Redirect to login if not authenticated
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  useEffect(() => {
    // Fetch available accessories from the server
    const fetchAccessories = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/accessory/getAccessory');
        if (!response.ok) throw new Error('Failed to fetch accessories');
        const data = await response.json();
        setAccessoriesList(data);
      } catch (error) {
        console.error('Error fetching accessories:', error);
      }
    };
    fetchAccessories();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGiftboxData({ ...giftboxData, [name]: value });
  };

  const handleAccessoryChange = (index, newValue) => {
    const newAccessories = [...giftboxData.accessories];
    newAccessories[index].accessory = newValue;
    newAccessories[index].price = newValue ? newValue.accessoryPrice * newAccessories[index].quantity : 0;
    setGiftboxData({ ...giftboxData, accessories: newAccessories });
    updateTotalPrice(newAccessories);
  };

  const handleQuantityChange = (index, event) => {
    const { value } = event.target;
    const newQuantity = Math.max(1, value); // Ensure the quantity is at least 1
    const newAccessories = [...giftboxData.accessories];
    newAccessories[index].quantity = newQuantity;
    newAccessories[index].price = newAccessories[index].accessory ? newAccessories[index].accessory.accessoryPrice * newQuantity : 0;
    setGiftboxData({ ...giftboxData, accessories: newAccessories });
    updateTotalPrice(newAccessories);
  };

  const handleAddAccessory = () => {
    setGiftboxData({
      ...giftboxData,
      accessories: [...giftboxData.accessories, { accessory: null, quantity: 1, price: 0 }],
    });
  };

  const handleRemoveAccessory = (index) => {
    const newAccessories = giftboxData.accessories.filter((_, i) => i !== index);
    setGiftboxData({ ...giftboxData, accessories: newAccessories });
    updateTotalPrice(newAccessories);
  };

  const updateTotalPrice = (accessories) => {
    const newTotalPrice = accessories.reduce((total, item) => total + (item.price || 0), 0);
    setTotalPrice(newTotalPrice);
  };

  const validateForm = () => {
    if (!giftboxData.giftboxName.trim()) {
      alert('Gift box name is required');
      return false;
    }
    if (isNaN(giftboxData.giftboxPrice) || giftboxData.giftboxPrice <= 0) {
      alert('Gift box price must be a valid number greater than 0');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:3001/api/giftbox/addGiftbox', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(giftboxData),
      });
      if (!response.ok) throw new Error('Failed to create giftbox');
      closeEvent();
      window.location.reload();
    } catch (error) {
      console.error('Error creating giftbox:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={closeEvent}
      aria-labelledby="create-giftbox-modal-title"
      aria-describedby="create-giftbox-modal-description"
      style={{ backdropFilter: 'blur(3px)', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
    >
      <Box sx={{ ...modalStyle }}>
        <IconButton style={{ position: 'absolute', top: 10, right: 10 }} onClick={closeEvent}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" align="center" id="create-giftbox-modal-title">
          Create Gift Box
        </Typography>
        <Box height={20}></Box>
        <TextField
          label="Gift Box Name"
          variant="outlined"
          size="small"
          name="giftboxName"
          value={giftboxData.giftboxName}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Note Content"
          variant="outlined"
          size="small"
          name="noteContent"
          value={giftboxData.noteContent}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={3}
          sx={{ mt: 1.5 }}
        />
        {/* <TextField
          label="Box Color"
          variant="outlined"
          size="small"
          name="giftboxColor"
          value={giftboxData.giftboxColor}
          onChange={handleInputChange}
          fullWidth
          sx={{ mt: 1.5 }}
        /> */}
        <Autocomplete
          options={boxColorOptions}
          value={giftboxData.giftboxColor}
          onChange={(event, newValue) => setGiftboxData({ ...giftboxData, giftboxColor: newValue })}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Box Color"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mt: 1.5 }}
            />
        
          )}
        />

        
        <Typography variant="h6" sx={{ mt: 1 }}>Accessories</Typography>
        
        {giftboxData.accessories.map((accessoryItem, index) => (
          <Grid container spacing={2} key={index} alignItems="center">
            
            <Grid item xs={5}>
              
              <Autocomplete
                value={accessoryItem.accessory}
                onChange={(event, newValue) => handleAccessoryChange(index, newValue)}
                options={accessoriesList}
                getOptionLabel={(option) => option.accessoryName}
                renderInput={(params) => <TextField {...params} label="Accessory" variant="outlined" size="small" 
                sx={{ mt: 1 }} />}
              />
              
            </Grid>
            <Grid item xs={3}>

              <TextField
                label="Quantity"
                variant="outlined"
                size="small"
                type="number"
                value={accessoryItem.quantity}
                onChange={(event) => handleQuantityChange(index, event)}
                InputProps={{
                  endAdornment: "units",
                  inputProps: { min: 1 } // Add min attribute to ensure at least 1
                }}
                fullWidth
                
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Price"
                variant="outlined"
                size="small"
                type="number"
                value={accessoryItem.price}
                InputProps={{ readOnly: true , startAdornment: "Rs.", }}
                fullWidth
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={() => handleRemoveAccessory(index)}>
                <RemoveIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddAccessory}
          sx={{ mt: 2 }}
          size='small'
          color='success'
        >
          Add Accessory
        </Button>
        <Box height={20}></Box>
        <TextField
          label="Estimated Gift Box Price"
          variant="outlined"
          size="small"
          value={totalPrice}
          InputProps={{ readOnly: true, startAdornment: "Rs.", }}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleSubmit} fullWidth>
          Create Gift Box
        </Button>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  maxHeight: '80%',
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
};

export default AddGiftbox;
