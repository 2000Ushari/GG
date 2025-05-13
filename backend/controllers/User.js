import connection from '../dbConnection.js';
import { UserService } from '../services/UserService.js';

const getCustomerIdByUserId = async (req, res) => {
  // const { id: userId } = req.params; // Destructuring to correctly get the userId
  const userId = req.params.id;

  try {
    const customer = await UserService.getCustomerIdByUserId(userId); // Fetch from service

    if (customer.length > 0) {
      res.status(200).json(customer[0]); // Return first customerId
    } else {
      res.status(404).json({ message: 'User not found' }); // If no customer found
    }
  } catch (error) {
    console.error('Error fetching customerId:', error);
    res.status(500).json({ error: error.message });
  }
};

const getCustomerEmail = async (req, res) => {
  const { id: userId } = req.params; // Destructuring to correctly get the userId

  try {
    const customer = await UserService.getCustomerEmail(userId); // Fetch from service

    if (customer.length > 0) {
      res.status(200).json(customer[0]); // Return first userEmail
    } else {
      res.status(404).json({ message: 'User not found' }); // If no customer found
    }
  } catch (error) {
    console.error('Error fetching customer email:', error);
    res.status(500).json({ error: error.message });
  }
  
};

export { getCustomerIdByUserId, getCustomerEmail };
