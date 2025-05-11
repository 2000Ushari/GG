import connection from '../dbConnection.js';

export class CustomerService {
  static async getCustomers() {
    const query = 'SELECT * FROM customer';
    return await connection.promise().query(query);
  }
  catch(error) {
    console.error('Error fetching accessories:', error);
    throw error;
  }

  static async getCustomerById(customerId) {
    const query = 'SELECT * FROM customer WHERE customerId = ?';
    return await connection.promise().query(query, [customerId]);
  }
  catch(error) {
    console.error('Error fetching customer:', error);
    throw error;
  }

  static async getCustomerDetails(userId) {
    const query = `
      SELECT 
        customer.customerId,
        customer.customerFirstName,
        customer.customerLastName,
        customer.customerContact,
        customer.currentStatus,
        customer.createdAt,
        users.userEmail
      FROM 
        customer
      LEFT JOIN 
        users ON customer.userId = users.userId
      WHERE 
        customer.userId = ?;
    `;

    try {
      return await connection.promise().query(query, [userId]);
    } catch (error) {
      console.error('Error fetching customer details:', error);
      throw error;
    }
  }
}
