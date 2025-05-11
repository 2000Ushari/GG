import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

function Payment({ paymentDetails }) {
  const [customerDetails, setCustomerDetails] = useState({});

  
  const getCustomerDetails  = async () => { 
    try {
        const response = await axios.get(`http://localhost:3001/api/customer/getCustomerDetails/${paymentDetails.userId}`
        );
        setCustomerDetails(response.data);
        console.log(customerDetails);
    } catch (error) {
        console.error("Error fetching customer details:", error);
    }
}
useEffect (() => {
    getCustomerDetails();
}, []);


    const paymentPayload={
        order_id: paymentDetails.item,
        amount: paymentDetails.amount.toString(),
        currency: paymentDetails.currency,
        first_name: customerDetails.customerFirstName,
        last_name: customerDetails.customerLastName,
        email: customerDetails.userEmail,
        phone: customerDetails.customerContact,
        address: paymentDetails.address,
        city: paymentDetails.city,
        country: paymentDetails.country,
        item: paymentDetails.giftbox,
    }
    
  // const handlePayment = async () => {
  //   try {
  //     // Request backend to generate the hash value
  //     const response = await fetch(
  //       "http://localhost:3001/api/payment/getHash",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           order_id: paymentPayload.order_id,
  //           amount: paymentPayload.amount,
  //           currency: paymentPayload.currency,
  //         }),
  //       }
  //     );

  //     if (response.ok) {
  //       const { hash, merchant_id } = await response.json();
  //       console.log("Payment Hash: " + hash);
  //       // Payment configuration
  //       const payment = {
  //         sandbox: true, // Use sandbox for testing
  //         merchant_id: merchant_id,
  //         return_url: "", // Replace with your return URL
  //         cancel_url: "", // Replace with your cancel URL
  //         notify_url: "",
  //         order_id: paymentPayload.order_id,
  //         items: paymentPayload.item,
  //         amount: paymentPayload.amount,
  //         currency: paymentPayload.currency,
  //         first_name: paymentPayload.first_name,
  //         last_name: paymentPayload.last_name,
  //         email: paymentPayload.email,
  //         phone: paymentPayload.phone,
  //         address: paymentPayload.address,
  //         city: paymentPayload.city,
  //         country: paymentPayload.country,
  //         hash: hash,
  //       };

  //       console.log("Payment Payload: ", payment);

  //       // Initialize PayHere payment
  //       // eslint-disable-next-line no-undef
  //       payhere.startPayment(payment);
  //     } else {
  //       console.error("Failed to generate hash for payment.");
  //     }
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };

  const handlePayment = async () => {
    try {
      // Request backend to generate the hash value
      const response = await fetch(
        "http://localhost:3001/api/payment/getHash",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_id: paymentPayload.order_id,
            amount: paymentPayload.amount,
            currency: paymentPayload.currency,
          }),
        }
      );
  
      if (response.ok) {
        const { hash, merchant_id } = await response.json();
        console.log("Payment Hash: " + hash);
  
        // Payment configuration
        const payment = {
          sandbox: true, // Use sandbox for testing
          merchant_id: merchant_id,
          return_url: "", // Replace with your return URL
          cancel_url: "", // Replace with your cancel URL
          notify_url: "",
          order_id: paymentPayload.order_id,
          items: paymentPayload.item,
          amount: paymentPayload.amount,
          currency: paymentPayload.currency,
          first_name: paymentPayload.first_name,
          last_name: paymentPayload.last_name,
          email: paymentPayload.email,
          phone: paymentPayload.phone,
          address: paymentPayload.address,
          city: paymentPayload.city,
          country: paymentPayload.country,
          hash: hash,
        };
  
        console.log("Payment Payload: ", payment);
  
        // Initialize PayHere payment
        // eslint-disable-next-line no-undef
        payhere.startPayment(payment);
  
        // Update order status after payment is initiated
        const updateStatusResponse = await fetch(
          `http://localhost:3001/api/order/updateOrderStatusAfterPaid/${paymentPayload.order_id}`,
          {
            method: "PUT", // Assuming it's a PUT request; adjust if different
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (updateStatusResponse.ok) {
          console.log("Order status updated successfully.");
        } else {
          console.error("Failed to update order status.");
        }
      } else {
        console.error("Failed to generate hash for payment.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  
  return (
    <Box>
      <Button
        id="payhere-payment"
        variant="contained"
        color="success"
        onClick={handlePayment}
      >
        Pay Now!
      </Button>
    </Box>
  );
}

export default Payment;
