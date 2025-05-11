import React from 'react';
import Sidenav from '../components/Sidenav';
import Navbar from '../components/Navbar';
import AccordianDash from '../components/AccordianDash';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import '../Dash.css';
import CardMedia from '@mui/material/CardMedia';
import earringImage from '../images/accessories/ear1.jpg';
import Images from '../components/Images';
import Carousal from '../components/Carousal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Countup from 'react-countup';

import NavbarCustomer from '../customer/customerComponent/Navbar';
import CategoryTiles from '../customer/customerComponent/CategoryTiles';
import CustomerFooter from '../customer/customerComponent/CustomerFooter';
import AccessoryCard from '../customer/customerAccessory/AccessoryCard';

export default function Home() {
  const [accessories, setAccessories] = useState([]);
  const navigate = useNavigate();

  // Show all accessories in cards on the customer homepage
  const fetchAccessories = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/accessory/getAccessory');
      if (!response.ok) {
        throw new Error('Failed to fetch accessories');
      }
      const data = await response.json();
      setAccessories(data);
    } catch (error) {
      console.error('Error fetching accessories:', error);
    }
  };

  useEffect(() => {
    fetchAccessories();
  }, []);

  // Get random accessories from the fetched data
  const getRandomAccessories = (accessories, count) => {
    const shuffled = accessories.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomAccessories = getRandomAccessories(accessories, 12);

  return (
    <>
      <div className="bgcolor">
        <NavbarCustomer />
        <Box height={50} />
        <Box sx={{ display: 'flex' }}>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card sx={{ height: 92 + 'vh', flexGrow: 1 }}>
                  <CardContent align="center">
                    <Carousal />
                  </CardContent>
                </Card>
              </Grid>
              <br />
              <Grid item xs={12}>
                <CategoryTiles />
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={2} direction={'row'}>
                  {/* <Card
                    sx={{ minWidth: 49 + "%", height: 200 }}
                    className="gradientyellowish"
                  >
                    <CardContent>
                      <div className="iconstyle">
                        <CreditCardIcon />
                      </div>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ color: "#ffffff" }}
                      >
                        $ <Countup delay={0.4} end={500} duration={0.6} />
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        sx={{ color: "#ccd1d1" }}
                      >
                        Total Earning
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Share</Button>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card> */}
                  <Card sx={{ minWidth: 49 + '%', height: 200 }} className="gradientpurpleish">
                    <CardContent>
                      <div className="iconstyle">
                        <ShoppingBagIcon />
                      </div>
                      <Typography gutterBottom variant="h5" component="div" sx={{ color: '#ffffff' }}>
                        {/* $900.00 */}
                        $ <Countup delay={0.4} end={900} duration={0.6} />
                      </Typography>
                      <Typography gutterBottom variant="body2" component="div" sx={{ color: '#ccd1d1' }}>
                        Total Order
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Share</Button>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={2}>
                  {/* <Card className="gradientpurpleish">
                    <Stack spacing={2} direction="row">
                      <div className="iconstyle">
                        <StorefrontIcon />
                      </div>
                      <div className="paddingall">
                        <span className="pricetitle">$203K</span>
                        <br />
                        <span className="pricesubtitle">Total Income</span>
                      </div>
                    </Stack>
                  </Card> */}
                  <Card sx={{ maxWidth: 345 }}>
                    <Stack spacing={2} direction="row">
                      <div className="iconstyleblack">
                        <StorefrontIcon />
                      </div>
                      <div className="paddingall">
                        <span className="pricetitle">$203K</span>
                        <br />
                        <span className="pricesubtitle">Total Income</span>
                      </div>
                    </Stack>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
            <Box height={20} />
            <Grid container spacing={2}>
              {/* <Grid item xs={8}>
                <Card sx={{ height: 200 + "vh" }}>
                  <CardContent>
                    <Images />
                  </CardContent>
                </Card>
              </Grid> */}

              <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap" justifyContent={'space-evenly'}>
                {randomAccessories.map((accessory) => (
                  // Navigate to accessory card and pass accessory details and customerId
                  // console.log("customerId:", customerId),
                  // console.log("accessory:", accessory),

                  <AccessoryCard
                    key={accessory.accessoryId}
                    accessoryDetails={accessory}
                    // userId={userId} // Pass userId for the API calls
                    //customerId={customerId} // Pass customerId for favorites handling
                  />
                ))}
              </Stack>

              <Grid item xs={4}>
                <Card sx={{ height: 60 + 'vh' }}>
                  <CardContent>
                    <div className="paddingall">
                      <span className="pricetitle">Popular Products</span>
                    </div>
                    <AccordianDash />
                  </CardContent>
                </Card>
                {/* practice */}
                <br />
                {/* <Box sx={{ flexGrow: 1 }}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      sx={{ height: 140 }}
                      image={earringImage}
                      title="ear1"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Lizard
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Share</Button>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </Box> */}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <CustomerFooter />
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
}
