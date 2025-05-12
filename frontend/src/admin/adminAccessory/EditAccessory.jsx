import React, { useState, useEffect } from 'react';
import { Modal, Box, Grid, TextField, Button, Typography, Autocomplete, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditAccessory = ({ closeEvent, open, accessoryID, accessory }) => {
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

  const [accessoryData, setAccessoryData] = useState({
    accessoryName: '',
    accessoryPrice: '',
    accessoryDescription: '',
    accessoryQuantity: '',
    accessoryColor: '',
    selectedCategory: null,
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();

    if (accessory) {
      setAccessoryData({
        accessoryName: accessory.accessoryName || '',
        accessoryPrice: accessory.accessoryPrice || '',
        accessoryDescription: accessory.accessoryDescription || '',
        accessoryQuantity: accessory.accessoryQuantity || '',
        accessoryColor: accessory.accessoryColor || '',
        selectedCategory: accessory.categoryId,
      });
    }
  }, [accessory]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/category/getCategory');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Error fetching categories.');
    }
  };

  const handleInputChange = (event, field) => {
    setAccessoryData({ ...accessoryData, [field]: event.target.value });
  };

  const handleCategoryChange = (event, newValue) => {
    setAccessoryData({ ...accessoryData, selectedCategory: newValue });
  };
  const handleSubmit = async () => {
    try {
      // Basic validations
      if (!accessoryData.accessoryName || !accessoryData.accessoryPrice || !accessoryData.selectedCategory) {
        setError('Please fill in all required fields.');
        return;
      }

      // Numeric validations
      if (isNaN(accessoryData.accessoryPrice) || isNaN(accessoryData.accessoryQuantity)) {
        setError('Price and quantity must be numeric values.');
        return;
      }

      const response = await fetch(`http://localhost:3001/api/accessory/${accessoryID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...accessoryData,
          categoryId: accessoryData.selectedCategory ? accessoryData.selectedCategory.categoryId : null,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update accessory');
      }
      const data = await response.json();
      Swal.fire('Success!', 'Accessory updated successfully.', 'success');
      closeEvent();
      window.location.reload();
    } catch (error) {
      console.error('Error updating accessory:', error);
      Swal.fire('Error!', 'Failed to update the accessory.', 'error');
      setError(error.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={closeEvent}
      aria-labelledby="edit-accessory-modal-title"
      aria-describedby="edit-accessory-modal-description"
      style={{ backdropFilter: 'blur(3px)', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton style={{ position: 'absolute', top: 10, right: 10 }} onClick={closeEvent}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" align="center" id="edit-accessory-modal-title">
          Update Accessory
        </Typography>
        <Box height={20}></Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              value={accessoryData.selectedCategory}
              onChange={handleCategoryChange}
              options={categories}
              getOptionLabel={(option) => option.categoryName}
              renderInput={(params) => <TextField {...params} label="Category" variant="outlined" size="small" />}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Accessory Name"
              variant="outlined"
              size="small"
              value={accessoryData.accessoryName}
              onChange={(e) => handleInputChange(e, 'accessoryName')}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Price"
              variant="outlined"
              size="small"
              type="number"
              value={accessoryData.accessoryPrice}
              onChange={(e) => handleInputChange(e, 'accessoryPrice')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              size="small"
              value={accessoryData.accessoryDescription}
              onChange={(e) => handleInputChange(e, 'accessoryDescription')}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Quantity"
              variant="outlined"
              size="small"
              type="number"
              value={accessoryData.accessoryQuantity}
              onChange={(e) => handleInputChange(e, 'accessoryQuantity')}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Color"
              variant="outlined"
              size="small"
              value={accessoryData.accessoryColor}
              onChange={(e) => handleInputChange(e, 'accessoryColor')}
              fullWidth
            />
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
              <Button variant="contained" onClick={handleSubmit}>
                Update
              </Button>
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ m: 2 }}></Box>
      </Box>
    </Modal>
  );
};

export default EditAccessory;
