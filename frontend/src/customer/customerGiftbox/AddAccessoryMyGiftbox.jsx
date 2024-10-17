import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // To access the passed data and navigation

const AddAccessoryMyGiftbox = () => {
  const location = useLocation(); // Get the passed state from the previous component
  const navigate = useNavigate();

  const { giftbox, selectedAccessory } = location.state || {}; // Destructure the passed data

  // Handle logic to add the accessory to the giftbox (API call, etc.)
  const handleAddAccessory = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/accessory/addAccessoryToMyGiftbox', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          giftboxId: giftbox.giftboxId,
          accessoryId: selectedAccessory.accessoryId,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add accessory to giftbox');
      }

      const result = await response.json();
      console.log('Accessory added:', result);
      
      // Navigate back or show a success message
      navigate('/my-giftboxes'); // Redirect to the list of giftboxes
    } catch (error) {
      console.error('Error adding accessory:', error);
    }
  };

  return (
    <div>
      <h2>Add Accessory to Giftbox</h2>
      <p>Giftbox: {giftbox?.giftboxName}</p>
      <p>Accessory: {selectedAccessory?.accessoryName}</p>
      
    </div>
  );
};

export default AddAccessoryMyGiftbox;
