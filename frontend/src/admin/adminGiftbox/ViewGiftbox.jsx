import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Box, Grid, TextField, Button, Typography, Autocomplete, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";

const ViewGiftbox = ({ closeEvent, open, giftboxID, giftbox }) => {
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

  const [giftboxData, setGiftboxData] = useState({
    giftboxName: "",
    noteContent: "",
    giftboxColor: "",
    giftboxPrice: "",
    accessories: [{ accessory: null, quantity: 1, price: 0 }],
  });
  const [accessories, setAccessories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAccessories();

    if (giftbox) {
      setGiftboxData({
        giftboxName: giftbox.giftboxName || "",
        noteContent: giftbox.noteContent || "",
        giftboxColor: giftbox.giftboxColor || "",
        giftboxPrice: giftbox.giftboxPrice || "",
        accessories: giftbox.accessories || [""],
      });
    }
  }, [giftbox]);

  const fetchAccessories = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/accessory/getAccessories");
      if (!response.ok) {
        throw new Error("Failed to fetch accessories");
      }
      const data = await response.json();
      setAccessories(data);
    } catch (error) {
      console.error("Error fetching accessories:", error);
      setError("Error fetching accessories.");
    }
  };

  
  return (
    <Modal
      open={open}
      onClose={closeEvent}
      aria-labelledby="edit-giftbox-modal-title"
      aria-describedby="edit-giftbox-modal-description"
      style={{ backdropFilter: 'blur(3px)', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', borderRadius: 4, boxShadow: 24, p: 4 }}>
        <IconButton style={{ position: "absolute", top: 10, right: 10 }} onClick={closeEvent}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" align="center" id="edit-giftbox-modal-title">
          View Giftbox
        </Typography>
        <Box height={20}></Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Giftbox Name"
              variant="outlined"
              size="small"
              value={giftboxData.giftboxName}
            //   onChange={(e) => handleInputChange(e, "giftboxName")}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Color"
              variant="outlined"
              size="small"
              value={giftboxData.giftboxColor}
            //   onChange={(e) => handleInputChange(e, "giftboxColor")}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Price"
              variant="outlined"
              size="small"
              type="number"
              value={giftboxData.giftboxPrice}
            //   onChange={(e) => handleInputChange(e, "giftboxPrice")}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Note Content"
              variant="outlined"
              size="small"
              value={giftboxData.noteContent}
            //   onChange={(e) => handleInputChange(e, "noteContent")}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Accessories</Typography>
            {giftboxData.accessories.map((accessoryItem, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={5}>
                  <Autocomplete
                    value={accessoryItem.accessory}
                    // onChange={(event, newValue) => handleAccessoryChange(index, "accessory", newValue)}
                    // options={accessories}
                    getOptionLabel={(option) => option.accessoryName}
                    renderInput={(params) => <TextField {...params} label="Accessory" variant="outlined" size="small" />}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Quantity"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={accessoryItem.quantity}
                    // onChange={(e) => handleAccessoryChange(index, "quantity", e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Price"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={accessoryItem.accessory ? accessoryItem.accessory.accessoryPrice * accessoryItem.quantity : ""}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </Grid>
                {/* <Grid item xs={1}>
                  <IconButton onClick={() => handleRemoveAccessory(index)}>
                    <CloseIcon />
                  </IconButton>
                </Grid> */}
              </Grid>
            ))}
            {/* <Button variant="contained" onClick={handleAddAccessory} fullWidth style={{ marginTop: "10px" }}>
              Add Accessory
            </Button> */}
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography variant="body2" color="error" align="center">
                {error}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              {/* <Button variant="contained" onClick={handleSubmit}>
                Update
              </Button> */}
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ m: 2 }}></Box>
      </Box>
    </Modal>
  );
};

export default ViewGiftbox;
