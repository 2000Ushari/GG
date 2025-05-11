// import React, { useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const PaymentForm = ({ amount }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [processing, setProcessing] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     setProcessing(true);

//     try {
//       // Create payment intent on your server
//       const response = await fetch('http://localhost:3001/api/create-payment-intent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ amount }),
//       });

//       const data = await response.json();

//       const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(
//         data.clientSecret,
//         {
//           payment_method: {
//             card: elements.getElement(CardElement),
//           },
//         }
//       );

//       if (paymentError) {
//         setError(paymentError.message);
//       } else if (paymentIntent.status === 'succeeded') {
//         alert('Payment successful!');
//         // Handle successful payment here
//       }
//     } catch (err) {
//       setError('An error occurred while processing your payment.');
//     }

//     setProcessing(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="payment-form">
//       <div className="form-row">
//         <label>
//           Card details
//           <CardElement
//             options={{
//               style: {
//                 base: {
//                   fontSize: '16px',
//                   color: '#424770',
//                   '::placeholder': {
//                     color: '#aab7c4',
//                   },
//                 },
//                 invalid: {
//                   color: '#9e2146',
//                 },
//               },
//             }}
//           />
//         </label>
//       </div>
//       {error && <div className="error">{error}</div>}
//       <button type="submit" disabled={!stripe || processing}>
//         Pay ${amount}
//       </button>
//     </form>
//   );
// };

// export default PaymentForm;

// PaymentForm.js
// import React, { useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const PaymentForm = ({ amount }) => {
//   const stripe = useStripe();  // Initializes the Stripe object
//   const elements = useElements();  // Accesses Elements for the CardElement
//   const [error, setError] = useState(null);
//   const [processing, setProcessing] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Ensure stripe and elements are loaded
//     if (!stripe || !elements) {
//       return;
//     }

//     setProcessing(true);

//     try {
//       // Fetch payment intent from your backend
//       const response = await fetch('http://localhost:3001/api/create-payment-intent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ amount }),
//       });

//       const data = await response.json();

//       // Confirm the card payment
//       const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(
//         data.clientSecret,
//         {
//           payment_method: {
//             card: elements.getElement(CardElement),
//           },
//         }
//       );

//       if (paymentError) {
//         setError(paymentError.message);
//       } else if (paymentIntent.status === 'succeeded') {
//         alert('Payment successful!');
//       }
//     } catch (err) {
//       setError('An error occurred while processing your payment.');
//     }

//     setProcessing(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="payment-form">
//       <div className="form-row">
//         <label>
//           Card details
//           <CardElement
//             options={{
//               style: {
//                 base: {
//                   fontSize: '16px',
//                   color: '#424770',
//                   '::placeholder': {
//                     color: '#aab7c4',
//                   },
//                 },
//                 invalid: {
//                   color: '#9e2146',
//                 },
//               },
//             }}
//           />
//         </label>
//       </div>
//       {error && <div className="error">{error}</div>}
//       <button type="submit" disabled={!stripe || processing}>
//         Pay ${amount}
//       </button>
//     </form>
//   );
// };

// export default PaymentForm;
