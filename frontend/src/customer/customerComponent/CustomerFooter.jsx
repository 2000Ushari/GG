import React from "react";
import { Box, Grid, Typography, Link, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#333",
  color: "#fff",
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

const CustomerFooter = () => {
  return (
    <FooterContainer>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            The Glitter Gallery
          </Typography>
          <Typography variant="body1" color="lightgray">
            Your one-stop shop for beautiful gifts and accessories.
          </Typography>
          <Box mt={2}>
            <Typography variant="subtitle1" gutterBottom>
              Quick Links
            </Typography>
            
            <Link href="/contact-us" color="lightgray" display="block" underline="none" >
              Contact Us
            </Link>
            <Link href="/terms-and-services" color="lightgray" display="block" underline="none">
              Terms and Services
            </Link>
            <Link href="/our-story" color="lightgray" display="block" underline="none">
              Our Story
            </Link>
            <Link href="/happy-customers" color="lightgray" display="block" underline="none">
              Happy Customers
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" gutterBottom>
            Follow Us 
          </Typography>
          <Box>
            <IconButton
              component="a"
              href="https://www.facebook.com"
              target="_blank"
              color="inherit"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.instagram.com"
              target="_blank"
              color="inherit"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.whatsapp.com"
              target="_blank"
              color="inherit"
            >
              <WhatsAppIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </FooterContainer>
  );
};

export default CustomerFooter;
