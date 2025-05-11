// src/components/Images.js
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';

// Function to import all images from a folder
const importAll = (r) => {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
};

// Import all images from the 'images' directory
const images = importAll(require.context('../images/accessories', false, /\.(png|jpe?g|svg)$/));

const Images = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <Grid container spacing={2}>
        {Object.keys(images).map((image, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card style={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt={`Image ${index + 1}`}
                height="140"
                image={images[image]}
                title={`Image ${index + 1}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Image {index + 1}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This is image {index + 1} displayed using React and Material-UI.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Images;
