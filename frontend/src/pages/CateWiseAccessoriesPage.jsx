//After customer logs in and selects a category, this page will show all the accessories in that category
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from '@mui/material/styles/styled';
import Flowers from '../images/accessories/acs3.jpg';

import NavbarCustomer from '../customer/customerComponent/Navbar';
import CategoryTiles from '../customer/customerComponent/CategoryTiles';

const CustomCard = styled(Card)({
  position: 'relative',
  minWidth: 180,
  minHeight: 400,
  width: 250,
  height: 350,
  cursor: 'pointer',
  '&:hover .addButton': {
    display: 'block',
  },
});

const CateWiseAccessoriesPage = () => {
  const { category } = useParams(); // Get category from URL
  const [categoryId, setCategoryId] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [customerId, setCustomerId] = useState(null);

  // Authentication check
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/auth/authenticated', {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.authenticated && res.data.user.role === 'customer') {
          setUser(res.data.user); // Set user data if authenticated
          setCustomerId(res.data.user.id);
        } else {
          navigate('/login'); // Redirect to login if not authenticated
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  // Fetch user details based on customerId
  useEffect(() => {
    if (customerId) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/authentication/getUserDetails/${customerId}`, {
            withCredentials: true,
          });
          if (!response.ok) {
            throw new Error('Failed to fetch user details');
          }
          const data = await response.json();
          setUserDetails(data);
          setUserDetails(response.data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

      fetchUserDetails();
    }
  }, [customerId]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/category/getCategoryByName/${category}`)
      .then((response) => {
        console.log('Category response:', response.data);
        if (response.data && response.data[0]) {
          setCategoryId(response.data[0].categoryId);
          console.log(response.data[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching categoryId:', error);
      });
  }, [category]);

  useEffect(() => {
    if (categoryId) {
      console.log('Sending request with categoryId:', categoryId);
      axios
        .get(`http://localhost:3001/api/accessory/getAccessoryByCategory/${categoryId}`)
        .then((response) => {
          setAccessories(response.data);
          console.log('Accessories response:', accessories);
        })
        .catch((error) => {
          console.error('Error fetching accessories:', error);
        });
    }
  }, [categoryId]);

  const handleCardClick = () => {
    navigate(`/customer/accessoryView/${accessories[0].accessoryId}`);
    window.location.reload(); // Reloads the page when accessory card is clicked
  };

  return (
    <>
      <div className="bgcolor">
        <NavbarCustomer />
        <Box height={50} />
        <Box maxWidth={1200} mx="auto" mt={4}>
          <CategoryTiles />
          <Typography variant="h4" align="center" gutterBottom>
            {category}
          </Typography>
          {accessories.length === 0 && (
            <Typography variant="h6" align="center" gutterBottom>
              No accessories available in this category.
            </Typography>
          )}
          <Grid container spacing={3}>
            {accessories.map((accessory) => (
              <Grid item xs={12} sm={6} md={4} key={accessory.id}>
                <CustomCard key={accessories[0].accessoryId} onClick={handleCardClick}>
                  <CardMedia
                    component="img"
                    height="194"
                    image={accessories[0].image || Flowers}
                    alt={accessories[0].accessoryName}
                  />
                  {/* <AddButton className="addButton">Add to Giftbox</AddButton> */}
                  <CardContent>
                    <Typography variant="h6" color="black" gutterBottom>
                      {accessories[0].accessoryName}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Rs. {accessories[0].accessoryPrice}
                    </Typography>
                  </CardContent>
                  {/* <CardActions sx={{ justifyContent: 'space-between' }} disableSpacing>
                      <Rating value={accessoryDetails.averageRating || 0} readOnly />
                        <IconButton
                          aria-label="add to favorites"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddOrRemoveFromFavorites();
                          }}
                        >
                          <Checkbox
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite color="error" />}
                            checked={isFavorite} // Check state to show favorite or not
                          />
                        </IconButton>
                      </CardActions> */}
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default CateWiseAccessoriesPage;
