import React from "react";
import Navbar from "../components/Navbar";
import CustomerSidenav from "../customer/customerComponent/CustomerSidenav";
import CustomerFooter from "../customer/customerComponent/CustomerFooter";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import "../Dash.css";

export default function TermsConditions() {
  return (
    <div className="bgcolor">
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <CustomerSidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 5, bgcolor: "#f5f5f5" }}>
          <Typography variant="h3" align="center" gutterBottom fontWeight={600}>
            Terms & Conditions
          </Typography>

          <Typography variant="body1" gutterBottom>
            Please read these terms and conditions carefully before using our website.
            By accessing or using our website, you agree to be bound by these terms and conditions.
            If you do not agree with any part of these terms, please do not use our website.
          </Typography>

          {[
            {
              title: "1. Acceptance of Terms",
              content: "By using our website, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions."
            },
            {
              title: "2. Changes to Terms",
              content: "We reserve the right to modify these terms and conditions at any time. Any changes will be effective immediately upon posting on our website. Your continued use of the website after any changes constitutes your acceptance of the new terms."
            },
            {
              title: "3. User Accounts",
              content: "You may be required to create an account to access certain features of our website. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account."
            },
            {
              title: "4. Product Information",
              content: "We strive to provide accurate product information, including descriptions, images, and prices. However, we do not warrant that the information is error-free, complete, or current. We reserve the right to correct any errors and change or update information at any time without prior notice."
            },
            {
              title: "5. Orders and Payments",
              content: "All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in product information, or suspected fraud. Payment must be made in full at the time of order placement."
            },
            {
              title: "6. Shipping and Delivery",
              content: "We will make every effort to deliver your order on time. However, we are not responsible for delays caused by circumstances beyond our control, including but not limited to weather conditions, transportation issues, or acts of God."
            },
            {
              title: "7. Returns and Refunds",
              content: "We want you to be satisfied with your purchase. If you are not completely satisfied, please contact us within 7 days of receiving your order to initiate a return or exchange. Please refer to our Return Policy for more details."
            },
            {
              title: "8. Limitation of Liability",
              content: "To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of our website or products."
            },
            {
              title: "9. Governing Law",
              content: "These terms and conditions shall be governed by and construed in accordance with the laws of Sri Lanka. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Sri Lanka."
            },
            {
              title: "10. Contact Us",
              content: "If you have any questions or concerns about these terms and conditions, please contact us."
            }
          ].map((section, idx) => (
            <Box key={idx} sx={{ mt: 4 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {section.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {section.content}
              </Typography>
            </Box>
          ))}

          <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body1" color="text.secondary">
              <PhoneIcon sx={{ verticalAlign: "middle", mr: 1 }} /> +94 123456789
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <EmailIcon sx={{ verticalAlign: "middle", mr: 1 }} /> info@giftboxgallery.com
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