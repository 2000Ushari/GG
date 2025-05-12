import { Grid, IconButton, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
// import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import axios from 'axios';

function AddCategory({ open, closeEvent }) {
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

  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');

  const [error, setError] = useState('');

  // const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setCategoryDescription(event.target.value);
  };

  const handleSubmit = () => {
    // Basic validations
    if (!categoryName || !categoryDescription) {
      setError('Please fill in all required fields.');
      return;
    }

    // Make POST request to backend
    fetch('http://localhost:3001/api/category/addCategory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categoryName,
        categoryDescription,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add category');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Category created:', data);
        Swal.fire('Success!', 'Category added successfully.', 'success');
        // Close the modal after success
        closeEvent();
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error adding category:', error);
        Swal.fire('Error!', 'Failed to add the category.', 'error');
        // Close the modal even if there's an error
        closeEvent();
      });
  };

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
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Modal
      open={open}
      onClose={closeEvent}
      aria-labelledby="add-category-modal-title"
      aria-describedby="add-category-modal-description"
      style={backdropStyle}
    >
      <Box sx={modalStyle}>
        <IconButton style={{ position: 'absolute', top: 10, right: 10 }} onClick={closeEvent}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" align="center" id="add-category-modal-title">
          Add Category
        </Typography>

        <Box height={20}></Box>
        <Grid container spacing={2}>
          {/* <Grid item xs={12}>
          <Autocomplete
            value={selectedCategory}
            onChange={(event, newValue) => {
              setSelectedCategory(newValue);
            }}
            id="category-select"
            options={categories}
            getOptionLabel={(option) => option.categoryName}
            renderInput={(params) => (
              <TextField {...params} label="Category" variant="outlined" size="small" />
            )}
          />
        </Grid> */}

          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Category Name"
              variant="outlined"
              size="small"
              value={categoryName}
              onChange={handleNameChange}
              sx={{ width: '100%' }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              size="small"
              value={categoryDescription}
              onChange={handleDescriptionChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>

          <br />
          {error && (
            <Typography variant="body2" color="error" align="center">
              {error}
            </Typography>
          )}
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              <Button variant="contained" onClick={handleSubmit}>
                Submit Category
              </Button>
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ m: 2 }}></Box>
      </Box>
    </Modal>
  );
}

export default AddCategory;
