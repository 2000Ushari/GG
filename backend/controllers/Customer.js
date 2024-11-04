import connection from "../dbConnection.js";
import { CustomerService } from "../services/CustomerService.js";

const getCustomers = async (req, res) => {
    try {
      const customers = await CustomerService.getCustomers();
      if (customers) {
        res.status(200).json(customers[0]);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const getCustomerById = async (req, res) => {
    const customerId = req.params.cid;
  
    try {
      const customers = await CustomerService.getCustomerById(customerId);
      if (customers[0].length > 0) {
        res.status(200).json(customers[0][0]); // Return the first matched customer
      } else {
        res.status(404).json({ message: "Customer not found" });
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      res.status(500).json({ error: error.message });
    }
  }


  const getCustomerDetails = async (req, res) => {
    const userId = req.params.uid;
  
    try {
      const customers = await CustomerService.getCustomerDetails(userId);
      if (customers[0].length > 0) {
        res.status(200).json(customers[0][0]); // Return the first matched customer
      } else {
        res.status(404).json({ message: "Customer not found" });
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      res.status(500).json({ error: error.message });
    }
  };
   


export { getCustomers, getCustomerDetails, getCustomerById };