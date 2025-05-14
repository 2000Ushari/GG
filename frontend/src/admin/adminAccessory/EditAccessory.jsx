
import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Autocomplete,
  IconButton,
} from '@mui/material';
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
        if (!res.data.authenticated || res.data.user.role !== 'admin') {
          navigate('/login');
        }
      })
      .catch((err) => console.error(err));
  }, [navigate]);

  const [accessoryData, setAccessoryData] = useState({
    accessoryName: '',
    accessoryPrice: '',
    accessoryDescription: '',
    capacityUnits: '',
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
        capacityUnits: accessory.capacityUnits || '',
        accessoryColor: accessory.accessoryColor || '',
        selectedCategory: accessory.categoryId || null,
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

  const validateInputs = () => {
    const {
      accessoryName,
      accessoryDescription,
      accessoryColor,
      accessoryPrice,
      capacityUnits,
      selectedCategory,
    } = accessoryData;

    if (
      !accessoryName ||
      !accessoryDescription ||
      !accessoryColor ||
      accessoryPrice === '' ||
      capacityUnits === '' ||
      !selectedCategory
    ) {
      setError('Please fill in all required fields.');
      return false;
    }

    if (isNaN(accessoryPrice) || isNaN(capacityUnits)) {
      setError('Price and Units must be valid numbers.');
      return false;
    }

    if (Number(accessoryPrice) < 0 || Number(capacityUnits) < 0) {
      setError('Price and Units must be non-negative.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    try {
      const response = await fetch(`http://localhost:3001/api/accessory/${accessoryID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessoryName: accessoryData.accessoryName,
          accessoryDescription: accessoryData.accessoryDescription,
          accessoryColor: accessoryData.accessoryColor,
          accessoryPrice: Number(accessoryData.accessoryPrice),
          capacityUnits: Number(accessoryData.capacityUnits),
          categoryId: accessoryData.selectedCategory?.categoryId || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update accessory');
      }

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
        <IconButton sx={{ position: 'absolute', top: 10, right: 10 }} onClick={closeEvent}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" align="center" gutterBottom>
          Update Accessory
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              value={accessoryData.selectedCategory}
              onChange={handleCategoryChange}
              options={categories}
              getOptionLabel={(option) => option.categoryName || ''}
              renderInput={(params) => (
                <TextField {...params} label="Category" variant="outlined" size="small" fullWidth />
              )}
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
              label="Color"
              variant="outlined"
              size="small"
              value={accessoryData.accessoryColor}
              onChange={(e) => handleInputChange(e, 'accessoryColor')}
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
          <Grid item xs={6}>
            <TextField
              label="Capacity in Units"
              variant="outlined"
              size="small"
              type="number"
              value={accessoryData.capacityUnits}
              onChange={(e) => handleInputChange(e, 'capacityUnits')}
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
              rows={3}
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography variant="body2" color="error" align="center">
                {error}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12} textAlign="center">
            <Button variant="contained" onClick={handleSubmit}>
              Update
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default EditAccessory;
