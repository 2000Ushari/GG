import React from "react";
import Navbar from "../components/Navbar";
import CustomerSidenav from "../customer/customerComponent/CustomerSidenav";
import CustomerFooter from "../customer/customerComponent/CustomerFooter";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import StarIcon from '@mui/icons-material/Star';
import "../Dash.css";

const testimonials = [
  {
    name: "Rashmi Dissanayake",
    comment: "The gift box I ordered from The Glitter Gallery was absolutely stunning! It arrived on time and made my sister’s birthday extra special. Thank you for the beautiful presentation and excellent service!",
    rating: 5,
    avatar: "/images/testimonials/user1.jpg"
  },
  {
    name: "Nadeesha Perera",
    comment: "I was amazed by the detail and care put into the packaging. The items were high quality and the recipient loved every bit of it. Highly recommended!",
    rating: 5,
    avatar: "/images/testimonials/user2.jpg"
  },
  {
    name: "Sanduni Jayasinghe",
    comment: "The service was fast, friendly, and the gift box was better than I expected. Will definitely order again. Thank you Glitter Gallery!",
    rating: 5,
    avatar: "/images/testimonials/user3.jpg"
  }
];

export default function HappyCustomer() {
  return (
    <div className="bgcolor">
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <CustomerSidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 5, bgcolor: "#f5f5f5" }}>

          <Typography variant="h3" align="center" gutterBottom fontWeight={600}>
            Customer Testimonials
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
            See what our customers are saying about their experience with The Glitter Gallery.
          </Typography>

          <Grid container spacing={4} sx={{ mt: 5 }}>
            {testimonials.map((review, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ p: 3, minHeight: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <Avatar src={review.avatar} alt={review.name} sx={{ width: 70, height: 70, mb: 2 }} />
                  <Typography variant="h6" fontWeight={600}>{review.name}</Typography>
                  <Box sx={{ display: 'flex', mb: 1 }}>
                    {[...Array(review.rating)].map((_, i) => (
                      <StarIcon key={i} fontSize="small" color="warning" />
                    ))}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {review.comment}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 8 }}>
            <Typography variant="h6" align="center">
              Want to share your experience?
            </Typography>
            <Typography variant="body1" align="center">
              Visit our Facebook page and leave us a review: <br />
              <a
                href="https://www.facebook.com/profile.php?id=61550834740376"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#3b5998', fontWeight: 'bold' }}
              >
                The Glitter Gallery on Facebook
              </a>
            </Typography>
          </Box>

          <Box sx={{ mt: 8 }}>
            <CustomerFooter />
          </Box>

        </Box>
      </Box>
    </div>
  );
}