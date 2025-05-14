import connection from '../dbConnection.js';

export class AccessoryService {
  static async getAccessories() {
    try {
      const query = 'SELECT * FROM accessory';
      return await connection.promise().query(query);
    } catch (error) {
      console.error('Error fetching accessories:', error);
      throw error;
    }
  }

  static async getAccessoryById(accessoryId) {
    try {
      if (!accessoryId) {
        throw new Error('Please provide a valid accessory ID.');
      }
      const query = 'SELECT * FROM accessory WHERE accessoryId = ?';
      return await connection.promise().query(query, [accessoryId]);
    } catch (error) {
      console.error('Error fetching accessory details:', error);
      throw error;
    }
  }

  // static async addAccessory(accessory) {
  //   try {
  //     const {
  //       accessoryName,
  //       accessoryDescription,
  //       accessoryColor,
  //       accessoryPrice,
  //       units,
  //       categoryId,
  //     } = accessory;
  //     console.log("Adding accessory:", accessory);
  //     console.log(accessoryName, accessoryDescription, accessoryColor, accessoryPrice, units, categoryId);
  //     // Validation
  //     if (
  //       !accessoryName ||
  //       !accessoryDescription ||
  //       !accessoryColor ||
  //       !units ||
  //       !accessoryPrice ||
  //       !categoryId
  //     ) {
  //       throw new Error(
  //         "Please provide name, description, color, units, price, and categoryId."
  //       );
  //     }

  //     // Additional Validation
  //     if (accessoryPrice < 0 || units < 0) {
  //       throw new Error("Price and units can not be negative.");
  //     }

  //     // Insert the new accessory into the database
  //     const query = `
  //               INSERT INTO accessory (accessoryName, accessoryDescription, accessoryColor, accessoryPrice,units, categoryId)
  //               VALUES (?, ?, ?, ?, ?, ?)
  //           `;
  //     return await connection
  //       .promise()
  //       .query(query, [
  //         accessoryName,
  //         accessoryDescription,
  //         accessoryColor,
  //         accessoryPrice,
  //         units,
  //         categoryId,
  //       ]);
  //   } catch (error) {
  //     console.error("Error adding accessory:", error);
  //     throw error;
  //   }
  // }

  static async addAccessory(accessory, sizes) {
    try {
      const { accessoryName, accessoryDescription, accessoryColor, accessoryPrice, units, categoryId, quantity } =
        accessory;

      console.log(sizes);

      // Validation for accessory details
      if (!accessoryName || !accessoryDescription || !accessoryColor || !units || !accessoryPrice || !categoryId) {
        throw new Error('Please provide name, description, color, units, price, and categoryId.');
      }

      // Validate either quantity or sizes  is provided, but not both
      if (quantity > 0 && sizes.length > 0) {
        throw new Error('Please provide either units or sizes, but not both.');
      }

      if (accessoryPrice < 0 || units < 0) {
        throw new Error('Price and units cannot be negative.');
      }

      // Insert the accessory and get the accessoryId
      const query = `
                INSERT INTO accessory (accessoryName, accessoryDescription, accessoryColor, accessoryPrice, units, categoryId)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
      const [result] = await connection
        .promise()
        .query(query, [accessoryName, accessoryDescription, accessoryColor, accessoryPrice, units, categoryId]);

      const accessoryId = result.insertId;

      console.log('New accessoryId:', accessoryId);

      // Insert each size and quantity combination into the stock table
      const stockQuery = `INSERT INTO stock (accessoryId, sizeId, quantity) VALUES (?, ?, ?)`;
      const stockPromises = sizes.map(({ sizeId, quantity }) =>
        connection.promise().query(stockQuery, [accessoryId, sizeId, quantity])
      );

      await Promise.all(stockPromises); // Wait for all stock inserts to complete

      return accessoryId;
    } catch (error) {
      console.error('Error adding accessory:', error);
      throw error;
    }
  }

  // static async updateAccessory(accessoryId, accessory) {
  //   try {
  //     const { accessoryName, accessoryDescription, accessoryColor, accessoryPrice, categoryId } =
  //       accessory;

  //     if ((await this.getAccessoryById(accessoryId)).length === 0) {
  //       throw new Error('Accessory not found');
  //     }

  //     // Validation
  //     if (
  //       !accessoryName ||
  //       !accessoryDescription ||
  //       !accessoryColor ||
  //       !accessoryPrice ||
  //       !categoryId
  //     ) {
  //       throw new Error('Please provide name, description, color, quantity, price, and categoryId.');
  //     }

  //     // Additional Validation
  //     if (accessoryPrice < 0 ) {
  //       throw new Error('Price and quantity must be non-negative.');
  //     }

  //     // Update the accessory in the database
  //     const query = `
  //               UPDATE accessory
  //               SET accessoryName = ?, accessoryDescription = ?, accessoryColor = ?, accessoryPrice = ?, categoryId = ?
  //               WHERE accessoryId = ?
  //           `;
  //     return await connection
  //       .promise()
  //       .query(query, [
  //         accessoryName,
  //         accessoryDescription,
  //         accessoryColor,
  //         accessoryPrice,
  //         categoryId,
  //         accessoryId,
  //       ]);
  //   } catch (error) {
  //     console.error('Error updating accessory:', error);
  //     throw error;
  //   }
  // }


  static async updateAccessory(accessoryId, accessory) {
  try {
    const {
      accessoryName,
      accessoryDescription,
      accessoryColor,
      accessoryPrice,
      capacityUnits,
      categoryId
    } = accessory;

    // Validate presence of all fields
    if (
      !accessoryName ||
      !accessoryDescription ||
      !accessoryColor ||
      accessoryPrice == null ||
      capacityUnits == null ||
      !categoryId
    ) {
      throw new Error('Please provide all required fields: name, description, color, price, units, and categoryId.');
    }

    // Additional validation
    if (accessoryPrice < 0 || capacityUnits < 0) {
      throw new Error('Price and units must be non-negative.');
    }

    // Check if accessory exists
    const [existing] = await connection
      .promise()
      .query('SELECT * FROM accessory WHERE accessoryId = ?', [accessoryId]);

    if (existing.length === 0) {
      throw new Error('Accessory not found');
    }

    // Update query
    const query = `
      UPDATE accessory
      SET accessoryName = ?, accessoryDescription = ?, accessoryColor = ?, accessoryPrice = ?, capacityUnits = ?, categoryId = ?
      WHERE accessoryId = ?
    `;

    const [result] = await connection
      .promise()
      .query(query, [
        accessoryName,
        accessoryDescription,
        accessoryColor,
        accessoryPrice,
        capacityUnits,
        categoryId,
        accessoryId,
      ]);

    return result;

  } catch (error) {
    console.error('Service Error updating accessory:', error);
    throw error;
  }
}


  static async deleteAccessory(accessoryId) {
    try {
      if (!accessoryId || accessoryId <= 0) {
        throw new Error('Please provide a valid accessory ID.');
      }

      if ((await this.getAccessoryById(accessoryId)).length === 0) {
        throw new Error('Accessory not found');
      }

      // Delete the accessory from the database
      const query = 'DELETE FROM accessory WHERE accessoryId = ?';
      return await connection.promise().query(query, [accessoryId]);
    } catch (error) {
      console.error('Error deleting accessory:', error);
      throw error;
    }
  }

  static async getSizeBySizeId(sizeId) {
    try {
      if (!sizeId || sizeId <= 0) {
        throw new Error('Please provide a valid size ID.');
      }

      const query = 'SELECT * FROM sizes WHERE sizeId = ?';
      return await connection.promise().query(query, [sizeId]);
    } catch (error) {
      console.error('Error fetching size details:', error);
      throw error;
    }
  }

  static async addStock(accessory) {
    try {
      const { accessoryId, sizeId, quantity } = accessory;
      console.log('Adding accessory size with quantity:', accessory);
      console.log(accessoryId, sizeId, quantity);
      // Validation
      if (!accessoryId || !sizeId || !quantity) {
        throw new Error('Please provide Accessory Id , size Id and the quantity.');
      }

      // Additional Validation
      if (quantity < 0 || !Number.isInteger(quantity)) {
        throw new Error('Quantity must be a positive integer and cannot be negative or decimal.');
      }

      // Insert the new accessory into the database
      const query = `
                INSERT INTO stock (accessoryId, sizeId, quantity)
                VALUES (?, ?, ?)
            `;
      return await connection.promise().query(query, [accessoryId, sizeId, quantity]);
    } catch (error) {
      console.error('Error adding accessory to the stock:', error);
      throw error;
    }
  }

  static async addToFavorites(favorite) {
    try {
      const { accessoryId, customerId } = favorite;

      // Validation for accessoryId and customerId
      if (!accessoryId || !customerId) {
        throw new Error('Please provide accessoryId and customerId.');
      }

      // Check if customer exists
      const [customer] = await connection.promise().query(`SELECT * FROM customer WHERE customerId = ?`, [customerId]);

      if (customer.length === 0) {
        throw new Error('Customer not found.');
      }

      // Check if accessory exists
      const [accessory] = await connection
        .promise()
        .query(`SELECT * FROM accessory WHERE accessoryId = ?`, [accessoryId]);

      if (accessory.length === 0) {
        throw new Error('Accessory not found.');
      }

      // Insert the favorite into the database
      const query = `INSERT INTO favorites (accessoryId, customerId) VALUES (?, ?)`;
      return await connection.promise().query(query, [accessoryId, customerId]);
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  }

  // static async removeFromFavorites(removeFavorite) {
  //   try {
  //     const { accessoryId, customerId } = removeFavorite;

  //     // Validation for accessoryId and customerId
  //     if (!accessoryId || !customerId) {
  //       throw new Error("Please provide accessoryId and customerId.");
  //     }

  //     // Check if customer exists
  //     const [customer] = await connection
  //       .promise()
  //       .query(`SELECT * FROM customer WHERE customerId = ?`, [customerId]);

  //     if (customer.length === 0) {
  //       throw new Error("Customer not found.");
  //     }

  //     // Check if accessory exists
  //     const [accessory] = await connection
  //       .promise()
  //       .query(`SELECT * FROM accessory WHERE accessoryId = ?`, [accessoryId]);

  //     if (accessory.length === 0) {
  //       throw new Error("Accessory not found.");
  //     }

  //     // Delete the favorite from the database
  //     const query = `DELETE FROM favorites WHERE accessoryId = ? AND customerId = ?`;
  //     return await connection.promise().query(query, [accessoryId, customerId]);
  //   } catch (error) {
  //     console.error("Error removing favorite:", error);
  //     throw error;
  //   }
  // }

  // AccessoryService.js
  static async removeFromFavorites(removeFavorite) {
    try {
      const { accessoryId, customerId } = removeFavorite;

      if (!accessoryId || !customerId) {
        throw new Error('Please provide accessoryId and customerId.');
      }

      // Check if customer exists
      const [customer] = await connection.promise().query(`SELECT * FROM customer WHERE customerId = ?`, [customerId]);

      if (customer.length === 0) {
        throw new Error('Customer not found.');
      }

      // Check if accessory exists
      const [accessory] = await connection
        .promise()
        .query(`SELECT * FROM accessory WHERE accessoryId = ?`, [accessoryId]);

      if (accessory.length === 0) {
        throw new Error('Accessory not found.');
      }

      // Delete the favorite from the database
      const query = `DELETE FROM favorites WHERE accessoryId = ? AND customerId = ?`;
      return await connection.promise().query(query, [accessoryId, customerId]);
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  }

  static async checkIfFavorite(favorite) {
    try {
      const { accessoryId, customerId } = favorite;

      // Validation for accessoryId and customerId
      if (!accessoryId || !customerId) {
        throw new Error('Please provide accessoryId and customerId.');
      }

      const query = `SELECT * FROM favorites WHERE accessoryId = ? AND customerId = ?`;
      const [result] = await connection.promise().query(query, [accessoryId, customerId]);

      // Return a boolean based on whether a favorite exists
      return result.length > 0;
    } catch (error) {
      console.error('Error checking if favorite exists:', error);
      throw error;
    }
  }

  //get favorites by customer id
  static async getFavorites(customerId) {
    try {
      if (!customerId) {
        throw new Error('Please provide a valid customer ID.');
      }

      // Check if customer exists
      const [customer] = await connection.promise().query(`SELECT * FROM customer WHERE customerId = ?`, [customerId]);

      if (customer.length === 0) {
        throw new Error('Customer not found.');
      }

      //check if the customer has any favorites
      // const query = `SELECT * FROM favorites WHERE customerId = ?`;
      // return await connection.promise().query(query, [customerId]);

      const query = `SELECT * FROM favorites WHERE customerId = ?`;
      const [favorites] = await connection.promise().query(query, [customerId]);

      // Return the favorites directly as JSON objects
      return { favorites };
    } catch (error) {
      console.error('Error checking if favorite exists:', error);
      throw error;
    }
  }

  // getAccessoryByCategory service
  static async getAccessoryByCategory(categoryId) {
    try {
      if (!categoryId) {
        throw new Error('Please provide a valid category ID.');
      }

      const query = 'SELECT * FROM accessory WHERE categoryId = ?';
      return await connection.promise().query(query, [categoryId]);
    } catch (error) {
      console.error('Error fetching accessories by category:', error);
      throw error;
    }
  }

  static async updateAccessoryStatus(accessoryId, acsStatus) {
    const query = 'UPDATE accessory SET acsStatus = ? WHERE accessoryId = ?';
    await connection.promise().query(query, [acsStatus, accessoryId]);
  }
  
}
