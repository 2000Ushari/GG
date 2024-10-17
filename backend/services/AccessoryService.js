import connection from "../dbConnection.js";

export class AccessoryService {
  static async getAccessories() {
    try {
      const query = "SELECT * FROM accessory";
      return await connection.promise().query(query);
    } catch (error) {
      console.error("Error fetching accessories:", error);
      throw error;
    }
  }

  static async getAccessoryById(accessoryId) {
    try {
      if (!accessoryId) {
        throw new Error("Please provide a valid accessory ID.");
      }
      const query = "SELECT * FROM accessory WHERE accessoryId = ?";
      return await connection.promise().query(query, [accessoryId]);
    } catch (error) {
      console.error("Error fetching accessory details:", error);
      throw error;
    }
  }

  static async addAccessory(accessory) {
    try {
      const {
        accessoryName,
        accessoryDescription,
        accessoryColor,
        accessoryQuantity,
        accessoryPrice,
        categoryId,
      } = accessory;

      // Validation
      if (
        !accessoryName ||
        !accessoryDescription ||
        !accessoryColor ||
        !accessoryQuantity ||
        !accessoryPrice ||
        !categoryId
      ) {
        throw new Error(
          "Please provide name, description, color, quantity, price, and categoryId."
        );
      }

      // Additional Validation
      if (accessoryPrice < 0 || accessoryQuantity < 0) {
        throw new Error("Price and quantity must be non-negative.");
      }

      // Insert the new accessory into the database
      const query = `
                INSERT INTO accessory (accessoryName, accessoryDescription, accessoryColor, accessoryQuantity, accessoryPrice, categoryId)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
      return await connection
        .promise()
        .query(query, [
          accessoryName,
          accessoryDescription,
          accessoryColor,
          accessoryQuantity,
          accessoryPrice,
          categoryId,
        ]);
    } catch (error) {
      console.error("Error adding accessory:", error);
      throw error;
    }
  }

  static async updateAccessory(accessoryId, accessory) {
    try {
      const {
        accessoryName,
        accessoryDescription,
        accessoryColor,
        accessoryQuantity,
        accessoryPrice,
        categoryId,
      } = accessory;

      if ((await this.getAccessoryById(accessoryId)).length === 0) {
        throw new Error("Accessory not found");
      }

      // Validation
      if (
        !accessoryName ||
        !accessoryDescription ||
        !accessoryColor ||
        !accessoryQuantity ||
        !accessoryPrice ||
        !categoryId
      ) {
        throw new Error(
          "Please provide name, description, color, quantity, price, and categoryId."
        );
      }

      // Additional Validation
      if (accessoryPrice < 0 || accessoryQuantity < 0) {
        throw new Error("Price and quantity must be non-negative.");
      }

      // Update the accessory in the database
      const query = `
                UPDATE accessory
                SET accessoryName = ?, accessoryDescription = ?, accessoryColor = ?, accessoryQuantity = ?, accessoryPrice = ?, categoryId = ?
                WHERE accessoryId = ?
            `;
      return await connection
        .promise()
        .query(query, [
          accessoryName,
          accessoryDescription,
          accessoryColor,
          accessoryQuantity,
          accessoryPrice,
          categoryId,
          accessoryId,
        ]);
    } catch (error) {
      console.error("Error updating accessory:", error);
      throw error;
    }
  }

  static async deleteAccessory(accessoryId) {
    try {
      if (!accessoryId || accessoryId <= 0) {
        throw new Error("Please provide a valid accessory ID.");
      }

      if ((await this.getAccessoryById(accessoryId)).length === 0) {
        throw new Error("Accessory not found");
      }

      // Delete the accessory from the database
      const query = "DELETE FROM accessory WHERE accessoryId = ?";
      return await connection.promise().query(query, [accessoryId]);
    } catch (error) {
      console.error("Error deleting accessory:", error);
      throw error;
    }
  }

  static async getSizeBySizeId(sizeId) {
    try {
      if (!sizeId || sizeId <= 0) {
        throw new Error("Please provide a valid size ID.");
      }

      const query = "SELECT * FROM sizes WHERE sizeId = ?";
      return await connection.promise().query(query, [sizeId]);
    } catch (error) {
      console.error("Error fetching size details:", error);
      throw error;
    }
  }
}
