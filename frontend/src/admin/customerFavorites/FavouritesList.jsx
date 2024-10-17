import { Box, Grid, Stack, Typography, Card, CardContent } from '@mui/material';
import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

function FavouritesList() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 2 }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h6">My Favourites</Typography>
        </Grid>
        {/* <Grid item>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            color="secondary"
            // onClick={handleOpenAddGiftboxModal}
          >
            Create New Gift Box
          </Button>
        </Grid> */}
      </Grid>
      <Box sx={{ marginTop: 4 }}>
        <Grid container spacing={2}>
          {/* Example cards, replace with actual card content */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Accesssoy 1</Typography>
                <Typography variant="body2">Blah Blah Blah.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">acs 2</Typography>
                <Typography variant="body2">Blah blah blah</Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Add more cards as needed */}
        </Grid>
      </Box>
    </Box>
  );
}

export default FavouritesList;
