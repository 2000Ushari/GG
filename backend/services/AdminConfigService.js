import connection from '../dbConnection.js';

export class AdminConfigService {

  //Delivery rates and districts
  static async getDistricts() {
    try {
      const query = 'SELECT * FROM delivery_districts';
      return await connection.promise().query(query);
    } catch (error) {
      console.error('Error fetching districts:', error);
      throw error;
    }
  }

  //get rate per km from db
  static async getDeliveryRate() {
    try {
      const query = 'SELECT * FROM delivery_rates';
      return await connection.promise().query(query);
    } catch (error) {
      console.error('Error fetching rate per km:', error);
      throw error;
    }
  }

  // update rate per km and rate comes in the url params
  static async updateDeliveryRate(rate) {
    try {
      const query = 'UPDATE delivery_rates SET ratePerOneKm = ?';
      await connection.promise().query(query, [rate]);
    } catch (error) {
      console.error('Error updating rate per km:', error);
      throw error;
    }
  }

  //stock details
  //get all stock details
  static async getStockDetails() {
    try {
      const query =  `
      SELECT 
        s.stockId, 
        a.accessoryName, 
        z.size, 
        s.quantity,
        s.modifiedOn,
        s.status
      FROM stock s
      JOIN accessory a ON s.accessoryId = a.accessoryId
      JOIN sizes z ON s.sizeId = z.sizeId`;
      return await connection.promise().query(query);
    } catch (error) {
      console.error('Error fetching stock details:', error);
      throw error;
    }
  }

  //update stock status by admin
  static async updateStockStatus(stockId, status) {
    try {
      const query = "UPDATE stock SET status = ? WHERE stockId = ?";
      await connection.promise().query(query, [status, stockId]);
    } catch (error) {
      console.error("Error updating stock status:", error);
      throw error;
    }
  }


//update stock quantity by admin
    static async updateStockQuantity(stockId, quantityToAdd) {
    try {
      const query = `
        UPDATE stock
        SET quantity = quantity + ?
        WHERE stockId = ?
      `;
      await connection.promise().query(query, [quantityToAdd, stockId]);
    } catch (error) {
      console.error('Error updating stock quantity:', error);
      throw error;
    }
  }

  //get the sizes from the db
  static async getSizes() {
    try {
      const query = 'SELECT * FROM sizes';
      return await connection.promise().query(query);
    } catch (error) {
      console.error('Error fetching sizes:', error);
      throw error;
    }
  }

    static async addSize(size) {
    const query = `INSERT INTO sizes (size) VALUES (?)`;
    await connection.promise().query(query, [size]);
  }

}

