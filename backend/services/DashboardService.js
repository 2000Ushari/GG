import connection from "../dbConnection.js";

export class DashboardService {
  static async accessoryData() {
    const query = "SELECT accessoryId, accessoryPrice FROM accessory";
    return await connection.promise().query(query);
  }
  catch(error) {
    console.error("Error fetching accessories:", error);
    throw error;
  }

  static async getNumberOfCustomers() {
    const query =
      "SELECT COUNT(DISTINCT customerId) AS distinct_customer_count FROM customer;";
    return await connection.promise().query(query);
  }
  catch(error) {
    console.error("Error fetching No of customers:", error);
    throw error;
  }

  static async getNumberOfAccessories() {
    const query =
      "SELECT COUNT(DISTINCT accessoryId) AS distinct_accessory_count FROM accessory;";
    return await connection.promise().query(query);
  }
  catch(error) {
    console.error("Error fetching No of accessories:", error);
    throw error;
  }

  static async getSales() {
    const query = "SELECT SUM(price) AS total_sales FROM orders;";
    return await connection.promise().query(query);
  }
  catch(error) {
    console.error("Error fetching total sales:", error);
    throw error;
  }
  
}
