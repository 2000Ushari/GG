import React, { useState, useEffect } from 'react';
import { Modal, Box, Grid, TextField, Button, Typography, Autocomplete, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditCategory = ({ closeEvent, open, categoryID, category }) => {
  const [categoryData, setCategoryData] = useState({
    categoryName: '',
    categoryPrice: '',
    categoryDescription: '',
    categoryQuantity: '',
    categoryColor: '',
    selectedCategory: null,
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    fetchCategories();

    if (category) {
      setCategoryData({
        categoryName: category.categoryName || '',
        categoryPrice: category.categoryPrice || '',
        categoryDescription: category.categoryDescription || '',
        categoryQuantity: category.categoryQuantity || '',
        categoryColor: category.categoryColor || '',
        selectedCategory: category.categoryId,
      });
    }
  }, [category]);

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
    setCategoryData({ ...categoryData, [field]: event.target.value });
  };

  const handleCategoryChange = (event, newValue) => {
    setCategoryData({ ...categoryData, selectedCategory: newValue });
  };
  const handleSubmit = async () => {
    try {
      // Basic validations
      if (!categoryData.categoryName || !categoryData.categoryDescription) {
        setError('Please fill in all required fields.');
        return;
      }

      const response = await fetch(`http://localhost:3001/api/category/${categoryID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...categoryData,
          // categoryId: categoryData.selectedCategory ? categoryData.selectedCategory.categoryId : null,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update category');
      }
      const data = await response.json();
      Swal.fire('Success!', 'Category updated successfully.', 'success');
      closeEvent();
      window.location.reload();
    } catch (error) {
      console.error('Error updating category:', error);
      Swal.fire('Error!', 'Failed to update the category.', 'error');
      setError(error.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={closeEvent}
      aria-labelledby="edit-category-modal-title"
      aria-describedby="edit-category-modal-description"
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
        <Typography variant="h5" align="center" id="edit-category-modal-title">
          Update Category
        </Typography>
        <Box height={20}></Box>
        <Grid container spacing={2}>
          {/* <Grid item xs={12}>
            <Autocomplete
              value={categoryData.selectedCategory}
              onChange={handleCategoryChange}
              options={categories}
              getOptionLabel={(option) => option.categoryName}
              renderInput={(params) => <TextField {...params} label="Category" variant="outlined" size="small" />}
            />
          </Grid> */}
          <Grid item xs={12}>
            <TextField
              label="Category Name"
              variant="outlined"
              size="small"
              value={categoryData.categoryName}
              onChange={(e) => handleInputChange(e, 'categoryName')}
              fullWidth
            />
          </Grid>
          {/* <Grid item xs={6}>
            <TextField
              label="Price"
              variant="outlined"
              size="small"
              type="number"
              value={categoryData.categoryPrice}
              onChange={(e) => handleInputChange(e, "categoryPrice")}
              fullWidth
            />
          </Grid> */}
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              size="small"
              value={categoryData.categoryDescription}
              onChange={(e) => handleInputChange(e, 'categoryDescription')}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          {/* <Grid item xs={6}>
            <TextField
              label="Quantity"
              variant="outlined"
              size="small"
              type="number"
              value={categoryData.categoryQuantity}
              onChange={(e) => handleInputChange(e, "categoryQuantity")}
              fullWidth
            />
          </Grid> */}
          {/* <Grid item xs={6}>
            <TextField
              label="Color"
              variant="outlined"
              size="small"
              value={categoryData.categoryColor}
              onChange={(e) => handleInputChange(e, "categoryColor")}
              fullWidth
            />
          </Grid> */}
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

export default EditCategory;
