import React from "react";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Carousal1 from "../images/carousal/carousal1.jpg"
import Carousal2 from "../images/carousal/carousal2.jpg"
import Carousal3 from "../images/carousal/carousal3.jpg"
import Carousal5 from "../images/carousal/carousal6.jpg"
import "../Dash.css";

import CustomerSidenav from "../customer/customerComponent/CustomerSidenav";
import CustomerFooter from "../customer/customerComponent/CustomerFooter";

const content = [
  {
    title: "Our Story",
    text: `Our journey began with a spark — a desire to transform gifting into something more personal and emotionally resonant. From humble beginnings, we've grown into a team of passionate curators, designers, and dreamers committed to making each gift box a heartfelt surprise.`,
    image: Carousal1,
  },
  {
    title: "What We Do",
    text: `We specialize in crafting personalized gift boxes that suit every moment and milestone — from birthdays, anniversaries, and festive occasions to corporate events and special thank-you tokens. Our team meticulously selects each item to ensure quality, aesthetics, and sentiment.`,
    image: Carousal2,
  },
  {
    title: "Sustainable & Local",
    text: `We proudly collaborate with local artisans and sustainable brands, ensuring our gift boxes are both ethical and elegant. Supporting small businesses and environmentally friendly practices is at the heart of what we do.`,
    image: Carousal3,
  },
  {
    title: "Why Choose Us",
    text: `From creative packaging to timely delivery, we strive for excellence in every aspect. Our commitment to quality, personalization, and customer delight sets us apart as your ideal gifting partner.`,
    image: Carousal5,
  },
];

export default function OurStory() {
  return (
    <div className="bgcolor">
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <CustomerSidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 5, bgcolor: "#f5f5f5" }}>
          <Box sx={{ mt: 8}}>
            <Typography variant="h2" align="center" gutterBottom fontFamily={"garamond"} fontWeight={700}>
              The Glitter Gallery
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
              Discover the heart and soul behind our personalized gift boxes.
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              We believe that every gift should tell a story, and we are here to help you share yours.
            </Typography>
          </Box>

          {content.map((section, index) => (
            <Grid
              container
              spacing={4}
              alignItems="center"
              sx={{ my: 5 }}
              direction={index % 2 === 0 ? "row" : "row-reverse"}
              key={index}
            >
              <Grid item xs={12} md={6}>
                <CardMedia
                  component="img"
                  image={section.image}
                  alt={section.title}
                  sx={{ width: "100%", height: 350, borderRadius: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ p: 3, boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {section.title}
                    </Typography>
                    <Typography variant="body1">
                      {section.text}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12}>
                        <CustomerFooter />
                      </Grid>

        </Box>
      </Box>
    </div>
  );
}