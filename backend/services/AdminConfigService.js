import connection from '../dbConnection.js';

export class AdminConfigService {
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
}
