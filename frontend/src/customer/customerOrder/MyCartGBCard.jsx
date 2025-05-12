import React, { useEffect } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Stack, CardActionArea } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import GiftboxImage from '../../images/giftboxes/giftbox1.jpg'; // Ensure this image path is correct
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const CustomCard = styled(Card)({
  position: 'relative',
  minWidth: 180,
  minHeight: 400,
  width: 200,
  height: 350,
  cursor: 'pointer',
  '&:hover .addButton': {
    display: 'block',
  },
});

const GiftboxCard = ({ giftbox }) => {
  const navigate = useNavigate();

  //   const handleClickMyGB = () => {
  //     // Navigate to the detailed view of the selected giftbox
  //     navigate(`/customer/giftboxes`);
  //   };

  //   const handleClickCheckout = () => {
  //     // Navigate to the checkout page
  //     navigate(`/customer/cart/${giftbox.giftboxId}`);
  //   };

  const handleClickCheckout = () => {
    // Navigate to the checkout page and pass giftboxId to the BuyGiftbox component
    navigate(`/customer/cart/${giftbox.giftboxId}`, {
      state: { giftboxId: giftbox.giftboxId }, //what state does is it passes the giftboxId to the BuyGiftbox component
    });
  };

  return (
    <CustomCard key={giftbox.giftboxId}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={giftbox.giftboxName || 'Giftbox'}
          height="200"
          image={GiftboxImage}
          //   onClick={handleClickMyGB}
        />
        <CardContent sx={{ textAlign: 'left' }}>
          <Typography gutterBottom variant="h6" component="div">
            {giftbox.giftboxName || 'No Name'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rs.{giftbox.giftboxPrice || 'Price Unavailable'}
          </Typography>
          <br />
          <Typography variant="body3" color="text.secondary">
            Created on{' '}
            {giftbox.createdAt
              ? new Date(giftbox.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Date Unavailable'}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Stack direction="row" spacing={1} justifyContent="center">
            <Button
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
              color="secondary"
              onClick={handleClickCheckout}
            >
              Checkout
            </Button>
          </Stack>
        </CardActions>
      </CardActionArea>
    </CustomCard>
  );
};

export default GiftboxCard;
