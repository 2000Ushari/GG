import React from "react";
import Navbar from "../components/Navbar";
import CustomerSidenav from "../customer/customerComponent/CustomerSidenav";
import CustomerFooter from "../customer/customerComponent/CustomerFooter";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "../Dash.css";

export default function ContactUs() {
  const faqs = [
    {
      question: "Where do you deliver?",
      answer: "We deliver to the shipping address you provided us."
    },
    {
      question: "Is there a delivery charge?",
      answer: "Our delivery charges start at Rs 50 (LKR) and vary depending on the delivery district."
    },
    {
      question: "Do you deliver on weekends and public holidays?",
      answer: "We do deliver on weekends and public holidays."
    },
    {
      question: "What is the order deadline?",
      answer: "For all GlitterGallery products, the order deadline is one day prior to the delivery date. If the order is needed within three days or less, an additional 20% of the order amount will be charged. Orders can only be canceled one week prior to the order delivery date."
    },
    {
      question: "Can I place an order to be delivered on a future date?",
      answer: "Yes, simply add your items to the cart, choose a future delivery date, and place the order."
    },
    {
      question: "Will my gift be delivered on time?",
      answer: "We guarantee that your order will be delivered on the date of your choice."
    }
  ];

  return (
    <div className="bgcolor">
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <CustomerSidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 5, bgcolor: "#f5f5f5" }}>

          <Typography variant="h3" align="center" gutterBottom fontWeight={600}>
            Contact Us
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
            We're here to help and answer any question you might have.
          </Typography>

          <Grid container spacing={5} sx={{ mt: 5 }}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Get in Touch
                  </Typography>
                  <form>
                    <TextField
                      fullWidth
                      label="Your Name"
                      variant="outlined"
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      label="Email Address"
                      variant="outlined"
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      label="Message"
                      multiline
                      rows={4}
                      variant="outlined"
                      margin="normal"
                    />
                    <Button variant="contained" sx={{ mt: 2 }}>
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Contact Information
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOnIcon sx={{ mr: 1 }} />
                    <Typography variant="body1">
                      No. 123, Galle Road, Colombo 03, Sri Lanka
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PhoneIcon sx={{ mr: 1 }} />
                    <Typography variant="body1">
                      +94 77 123 4567
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EmailIcon sx={{ mr: 1 }} />
                    <Typography variant="body1">
                      support@giftboxgallery.com
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Our support team is available from 9 AM to 6 PM on weekdays.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ mt: 8 }}>
            <Typography variant="h4" gutterBottom>
              Frequently Asked Questions (FAQs)
            </Typography>
            <Grid container spacing={3}>
              {faqs.map((faq, index) => (
                <Grid item xs={12} key={index}>
                  <Card sx={{ p: 3, boxShadow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {faq.question}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Grid item xs={12}>
                        <CustomerFooter />
                      </Grid>
        </Box>
      </Box>
    </div>
  );
}
