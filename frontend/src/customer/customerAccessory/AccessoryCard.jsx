
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Checkbox from '@mui/material/Checkbox';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // SweetAlert for confirmation dialog
import Flowers from '../../images/categories/flowers.png'; // Replace with actual default image

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

const AddButton = styled(Button)({
  position: 'absolute',
  top: 0,
  width: '100%',
  borderRadius: 0,
  display: 'none',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});

function AccessoryCard({ accessoryDetails, customerId }) {
  const [value, setValue] = useState(accessoryDetails.rating || 4);
  const [isFavorite, setIsFavorite] = useState(false); // New state to check if the accessory is a favorite
  const navigate = useNavigate();
  //  const customerID = customerId;

  useEffect(() => {
    // console.log("customerId:", customerID); // Add this to see if userId is correctly passed.
    // console.log("accessoryDetails:", accessoryDetails.accessoryId); // Add this to see if accessoryDetails is correctly passed.
  }, [customerId, accessoryDetails.accessoryId]);

  useEffect(() => {
    // Check if the accessory is already in the user's favorites when the component loads
    const checkIfFavorite = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/accessory/checkIfFavorite/${customerId}/${accessoryDetails.accessoryId}`,
          { method: 'GET' }
        );
        const data = await response.json();
        setIsFavorite(data.isFavorite); // Assuming the API returns { isFavorite: true/false }
      } catch (error) {
        console.error('Error checking if accessory is favorite:', error);
      }
    };

    checkIfFavorite();
  }, [customerId, accessoryDetails.accessoryId]);

  const handleAddOrRemoveFromFavorites = async () => {
    try {
      const action = isFavorite ? 'remove from' : 'add to';
      const result = await Swal.fire({
        title: `${isFavorite ? 'Remove from Favorites?' : 'Add to Favorites?'}`,
        text: `Do you want to ${action} favorites?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: `Yes, ${isFavorite ? 'remove' : 'add'} it!`,
        cancelButtonText: 'No, cancel',
      });

      if (result.isConfirmed) {
        const endpoint = isFavorite
          ? 'http://localhost:3001/api/accessory/removeFromFavorites'
          : 'http://localhost:3001/api/accessory/addToFavorites';

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerId: customerId,
            accessoryId: accessoryDetails.accessoryId,
          }),
        });

        // Check if the response is ok
        if (!response.ok) {
          const errorMessage = await response.text(); // Or response.json() depending on your API response
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
        }

        Swal.fire(
          `${isFavorite ? 'Removed!' : 'Added!'}`,
          `This accessory has been ${isFavorite ? 'removed from' : 'added to'} your favorites.`,
          'success'
        );

        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
      Swal.fire(
        'Error!',
        `Could not ${isFavorite ? 'remove' : 'add'} the accessory to favorites. ${error.message}`,
        'error'
      );
    }
  };

  const handleCardClick = () => {
    navigate(`/customer/accessoryView/${accessoryDetails.accessoryId}`);
    window.location.reload(); // Reloads the page when accessory card is clicked
  };

  return (
    <CustomCard key={accessoryDetails.accessoryId} onClick={handleCardClick}>
      <CardMedia
        component="img"
        height="194"
        image={accessoryDetails.image || Flowers}
        alt={accessoryDetails.accessoryName}
      />
      <AddButton className="addButton">Add to Giftbox</AddButton>
      <CardContent>
        <Typography variant="h6" color="black" gutterBottom>
          {accessoryDetails.accessoryName}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Rs. {accessoryDetails.accessoryPrice}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }} disableSpacing>
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
      </CardActions>
    </CustomCard>
  );
}

export default AccessoryCard;
