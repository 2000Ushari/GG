import connection from "../dbConnection.js";

export class UserService {
    static async getCustomerIdByUserId(userId) {
      try {
        const query = "SELECT customerId FROM customer WHERE userId = ?";
        const [result] = await connection.promise().query(query, [userId]); // Use connection to query DB
        return result;
      } catch (error) {
        console.error("Error fetching customerId by userId:", error);
        throw error;
      }
    }

    static async getCustomerEmail(userId) {
      try {
        const query = "SELECT userEmail FROM users WHERE userId = ?";
        const [result] = await connection.promise().query(query, [userId]); // Use connection to query DB
        return result;
      } catch (error) {
        console.error("Error fetching customer email:", error);
        throw error;
      }
  }
  
}