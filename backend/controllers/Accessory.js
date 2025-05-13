import connection from '../dbConnection.js';
import { AccessoryService } from '../services/AccessoryService.js';

const getAccessory = async (req, res) => {
  try {
    const accessories = await AccessoryService.getAccessories();
    if (accessories) {
      res.status(200).json(accessories[0]);
    }
  } catch (error) {
    console.error('Error fetching accessories:', error);
    res.status(500).json({ error: error.message });
  }
};

const getAccessoryById = async (req, res) => {
  const id = req.params.aid;
  try {
    const accessory = await AccessoryService.getAccessoryById(id);
    if (accessory && accessory[0].length > 0) {
      res.status(200).json(accessory[0][0]);
    } else {
      res.status(400).json({ error: 'Accessory not found' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

// const addAccessory = async (req, res) => {
//   try {
//     console.log("Adding accessory:", req.body);
//     const result = await AccessoryService.addAccessory(req.body);
//     if (result) {
//       console.log("Accessory added successfully", {
//         ...req.body,
//       });
//       res.status(201).json({
//         message: "Accessory added successfully",
//         ...req.body,
//       });
//     } else {
//       res.status(400).json({ error: "Error adding accessory" });
//     }
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

const addAccessory = async (req, res) => {
  try {
    const { sizes } = req.body; // sizes should be an array of { sizeId, quantity } pairs
    console.log('Adding accessory with sizes:', req.body);

    const accessoryId = await AccessoryService.addAccessory(req.body, sizes);
    if (accessoryId) {
      console.log('Accessory added successfully with accessoryId:', accessoryId);
      res.status(201).json({
        message: 'Accessory and stock updated successfully',
        accessoryId,
        ...req.body,
      });
    } else {
      res.status(400).json({ error: 'Error adding accessory' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const updateAccessory = async (req, res) => {
  try {
    const result = await AccessoryService.updateAccessory(req.params.id, req.body);
    if (result && result[0][0].affectedRows > 0) {
      res.status(200).json({ message: 'Accessory updated successfully' });
    } else {
      res.status(400).json({ error: 'Error updating accessory' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const deleteAccessory = async (req, res) => {
  try {
    const result = await AccessoryService.deleteAccessory(req.params.id);
    if (result && result[0][0].affectedRows > 0) {
      res.status(200).json({ message: 'Accessory deleted successfully' });
    } else {
      res.status(400).json({ error: 'Error deleting accessory' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const getSizeId = (req, res) => {
  const accessoryId = req.params.id;
  const query = 'SELECT sizeId FROM stock WHERE accessoryId = ?';
  connection.query(query, [accessoryId], (err, result) => {
    if (err) {
      console.error('Error fetching sizeIds:', err);
      return res.status(500).json({ message: 'Error fetching sizeIds' });
    } else {
      if (result.length > 0) {
        const sizeIds = result.map((row) => row.sizeId);
        res.status(200).json(sizeIds);
      } else {
        res.status(400).json({ message: 'No items found' });
      }
    }
  });
};

const getSizes = (req, res) => {
  const query = 'SELECT * FROM sizes';
  connection.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching sizes:', err);
      return res.status(500).json({ message: 'Error fetching sizes' });
    } else {
      res.status(200).send(result);
    }
  });
};

const addFavorites = async (req, res) => {
  try {
    console.log('Adding favorite:', req.body);
    const result = await AccessoryService.addToFavorites(req.body);
    if (result) {
      console.log('favorite added successfully', {
        ...req.body,
      });
      res.status(201).json({
        message: 'favorite added successfully',
        ...req.body,
      });
    } else {
      res.status(400).json({ error: 'Error adding favorite' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

// const removeFromFavorites = async (req, res) => {
//   const { customerId, accessoryId } = req.params;

//   try {
//     // Check if customerId and accessoryId are provided
//     if (!customerId || !accessoryId) {
//       return res.status(400).json({ error: "Customer ID and Accessory ID are required." });
//     }

//     // Call the service function to remove the accessory from favorites
//     const result = await AccessoryService.removeFromFavorites({ customerId, accessoryId });

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Favorite not found or already removed." });
//     }

//     res.status(200).json({ message: "Accessory successfully removed from favorites." });
//   } catch (error) {
//     console.error("Error removing accessory from favorites:", error);
//     res.status(500).json({ error: "An error occurred while removing the accessory from favorites." });
//   }
// };

// AccessoryController.js
const removeFromFavorites = async (req, res) => {
  const { customerId, accessoryId } = req.body; // Now retrieving from req.body for POST

  try {
    if (!customerId || !accessoryId) {
      return res.status(400).json({ error: 'Customer ID and Accessory ID are required.' });
    }

    // Call the service function to remove the accessory from favorites
    const result = await AccessoryService.removeFromFavorites({
      customerId,
      accessoryId,
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Favorite not found or already removed.' });
    }

    res.status(200).json({ message: 'Accessory successfully removed from favorites.' });
  } catch (error) {
    console.error('Error removing accessory from favorites:', error);
    res.status(500).json({
      error: 'An error occurred while removing the accessory from favorites.',
    });
  }
};

// async function checkCapacity(giftbox, accessoryId, quantity) {
//   // Check if the giftbox' capacity of 10000 units is exceeded with the new accessory unit * quantity added
//   const currentCapacity = [giftbox][0].giftboxCapacity ?? 0;
//   const newUnitCapacity =
//     quantity * (await AccessoryServicegetAccessoryById(accessoryId).units);
//   const isGiftBoxCapacityExceeded = currentCapacity + newUnitCapacity > 10000;

//   return isGiftBoxCapacityExceeded;
// }

async function checkCapacity(giftbox, accessoryId, quantity) {
  // Check if the giftbox's capacity of 10,000 units is exceeded with the new accessory unit * quantity added
  const currentCapacity = giftbox[0]?.giftboxCapacity ?? 0;

  // Ensure `AccessoryService.getAccessoryById` is awaited to get the correct units
  const accessoryData = await AccessoryService.getAccessoryById(accessoryId);
  const newUnitCapacity = quantity * (accessoryData[0][0]?.units || 0);

  const isGiftBoxCapacityExceeded = currentCapacity + newUnitCapacity > 10000;

  return isGiftBoxCapacityExceeded;
}

const addAccessoryToMyGiftbox = async (req, res) => {
  const { giftboxId, accessoryId, quantity, sizeId } = req.body;
  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: 'Quantity is required' });
  }

  if (!giftboxId || !accessoryId) {
    return res.status(400).json({ message: 'Giftbox ID and Accessory ID are required' });
  }

  if (!sizeId) {
    sizeId = 1;
  }

  // check if the product has enough quantity for the accessory
  const query = 'SELECT * FROM stock WHERE accessoryId = ? AND sizeId = ?';
  const [stock] = await connection.promise().query(query, [accessoryId, sizeId]);
  if (stock.length === 0 || stock[0].stockQuantity < quantity) {
    return res.status(400).json({ message: 'Not enough stock for the accessory' });
  }

  try {
    // Check if the giftbox exists
    const giftboxQuery = 'SELECT * FROM giftbox WHERE giftboxId = ?';
    const [giftbox] = await connection.promise().query(giftboxQuery, [giftboxId]);

    if (giftbox.length === 0) {
      return res.status(404).json({ message: 'Giftbox not found' });
    }

    // Check if the giftbox is full
    const isGiftBoxCapacityExceeded = await checkCapacity(giftbox, accessoryId, quantity);
    if (isGiftBoxCapacityExceeded) {
      return res.status(400).json({
        message: 'Giftbox capacity exceeded (10,000 units), Please create a new giftbox!',
      });
    }

    // Check if the accessory, giftbox combination already exists, if so, update the quantity
    const checkQuery = `SELECT * FROM giftboxaccessories WHERE giftboxId = ? AND accessoryId = ? AND sizeId = ?`;
    const [checkResult] = await connection.promise().query(checkQuery, [giftboxId, accessoryId, sizeId]);

    if (checkResult.length > 0) {
      // True if the accessory is already in the giftbox, then update the quantity
      const updateQuery = `UPDATE giftboxaccessories SET quantity = quantity + ? WHERE giftboxId = ? AND accessoryId = ? AND sizeId = ?`;

      const updateResult = await connection.promise().query(updateQuery, [quantity, giftboxId, accessoryId, sizeId]);

      if (updateResult[0].affectedRows === 0) {
        return res.status(400).json({ message: 'Error updating accessory quantity in giftbox' });
      } else {
        // Reduce the quantity from the stock
        const stockQuery = `UPDATE stock SET quantity = quantity - ? WHERE accessoryId = ? AND sizeId = ?`;
        await connection.promise().query(stockQuery, [quantity, accessoryId, sizeId]);

        const accessoryDetails = await AccessoryService.getAccessoryById(accessoryId);
        console.log('Accessory details', accessoryDetails[0][0]);
        // update the giftbox capacity
        const updateCapacityQuery = `UPDATE giftbox SET giftboxCapacity = giftboxCapacity + ? WHERE giftboxId = ?`;
        await connection.promise().query(updateCapacityQuery, [quantity * accessoryDetails[0][0].units, giftboxId]);
        console.log('Accessory capacity updated in giftbox');

        res.status(200).json({
          message: 'Accessory quantity updated in giftbox successfully',
          ...req.body,
        });
        console.log('Accessory quantity updated in giftbox successfully', {
          ...req.body,
        });
      }
    } else {
      const insertQuery = `INSERT INTO giftboxaccessories (giftboxId, accessoryId, quantity, sizeId) VALUES (?, ?, ?,?)`;

      // Insert the accessory into the giftbox
      const result = await connection.promise().query(insertQuery, [giftboxId, accessoryId, quantity, sizeId]);

      if (result[0].affectedRows === 0) {
        return res.status(400).json({ message: 'Error adding accessory to giftbox' });
      } else {
        // Reduce the quantity from the stock
        const stockQuery = `UPDATE stock SET quantity = quantity - ? WHERE accessoryId = ? AND sizeId = ?`;
        await connection.promise().query(stockQuery, [quantity, accessoryId, sizeId]);

        // update the giftbox capacity
        const updateCapacityQuery = `UPDATE giftbox SET giftboxCapacity = giftboxCapacity + ? WHERE giftboxId = ?`;
        await connection
          .promise()
          .query(updateCapacityQuery, [
            quantity * (await AccessoryService.getAccessoryById(accessoryId).units),
            giftboxId,
          ]);
        console.log('Accessory capacity updated in giftbox');

        res.status(200).json({
          message: 'Accessory added to giftbox successfully',
          id: result[0].insertId,
          ...req.body,
        });
        console.log('Accessory added to giftbox successfully', {
          id: result[0].insertId,
          ...req.body,
        });
      }
    }
  } catch (error) {
    console.error('Error adding accessory to giftbox:', error); // Detailed error logging
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const checkIfFavorite = async (req, res) => {
  const { customerId, accessoryId } = req.params;

  try {
    // Ensure both customerId and accessoryId are provided
    if (!customerId || !accessoryId) {
      return res.status(400).json({ error: 'customerId and accessoryId are required.' });
    }

    // Use the service to check if the accessory is in favorites
    const isFavorite = await AccessoryService.checkIfFavorite({
      customerId,
      accessoryId,
    });

    res.status(200).json({ isFavorite });
  } catch (error) {
    console.error('Error checking if accessory is favorite:', error);
    res.status(500).json({
      error: 'Internal server error. Could not check favorite status.',
    });
  }
};

// const getSizeBySizeId = async (req, res) => {
//   const sizeId = req.params.id;
//   try {
//     const result = await AccessoryService.getSizeBySizeId(sizeId);
//     if (accessories) {
//       res.status(200).json(accessories[0]);
//     }
//   } catch (error) {
//     console.error("Error fetching accessories:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

const getSizeBySizeId = async (req, res) => {
  const sizeId = req.params.id;
  try {
    const result = await AccessoryService.getSizeBySizeId(sizeId);

    if (result && result.length > 0) {
      // Return the size details
      res.status(200).json(result[0][0]);
    } else {
      // If no size is found for the given sizeId
      res.status(404).json({ error: 'Size not found' });
    }
  } catch (error) {
    console.error('Error fetching size details:', error);
    res.status(500).json({ error: error.message });
  }
};

const addToStock = async (req, res) => {
  try {
    const result = await AccessoryService.addStock(req.body);
    if (result) {
      console.log('Stock added successfully', {
        ...req.body,
      });
      res.status(201).json({
        message: 'Stock added successfully',
        ...req.body,
      });
    } else {
      res.status(400).json({ error: 'Error adding stock' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const getFavorites = async (req, res) => {
  const customerId = req.params.customerId;

  try {
    if (!customerId) {
      throw new Error('Please provide a valid customer ID.');
    }

    const favorites = await AccessoryService.getFavorites(customerId);

    if (favorites.length === 0) {
      return res.status(404).json({ message: 'No favorites found for this customer.' });
    }

    res.status(200).json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: error.message });
  }
};

// //getAccessoryByCategory function
// const getAccessoryByCategory = async (req, res) => {
//   const categoryId = req.params.cid;
//   try {
//     const accessories = await AccessoryService.getAccessoryByCategory(categoryId);
//     if (accessories) {
//       res.status(200).json(accessories[0]);
//     }
//   } catch (error) {
//     console.error("Error fetching accessories:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

const getAccessoryByCategory = async (req, res) => {
  const categoryId = req.params.cid;
  try {
    const accessories = await AccessoryService.getAccessoryByCategory(categoryId);
    console.log('Fetched Accessories Data:', accessories);
    if (accessories && accessories[0]) {
      res.status(200).json(accessories[0]);
    } else {
      res.status(404).json({ message: 'No accessories found.' });
    }
  } catch (error) {
    console.error('Error fetching accessories:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update accessory status
export const updateAccessoryStatus = async (req, res) => {
  const { accessoryId } = req.params;
  const { acsStatus } = req.body;

  if (!accessoryId || !acsStatus) {
    return res.status(400).json({ error: 'Missing accessoryId or acsStatus' });
  }

  try {
    await AccessoryService.updateAccessoryStatus(accessoryId, acsStatus);
    res.status(200).json({ message: 'Accessory status updated successfully' });
  } catch (error) {
    console.error('Error updating accessory status:', error);
    res.status(500).json({ error: 'Failed to update accessory status' });
  }
};

export {
  getAccessory,
  getAccessoryById,
  addAccessory,
  updateAccessory,
  deleteAccessory,
  getSizeId,
  getSizes,
  addFavorites,
  removeFromFavorites,
  addAccessoryToMyGiftbox,
  getSizeBySizeId,
  addToStock,
  checkIfFavorite,
  getFavorites,
  getAccessoryByCategory,
};
