import connection from "../dbConnection.js";
import { AccessoryService } from "../services/AccessoryService.js";

const getAccessory = async (req, res) => {
  try {
    const accessories = await AccessoryService.getAccessories();
    if (accessories) {
      res.status(200).json(accessories[0]);
    }
  } catch (error) {
    console.error("Error fetching accessories:", error);
    res.status(500).json({ error: error.message });
  }
};

const getAccessoryById = async (req, res) => {
  const id = req.params.id;
  try {
    const accessory = await AccessoryService.getAccessoryById(id);
    if (accessory && accessory[0].length > 0) {
      res.status(200).json(accessory[0][0]);
    } else {
      res.status(400).json({ error: "Accessory not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const addAccessory = async (req, res) => {
  try {
    const result = await AccessoryService.addAccessory(req.body);
    if (result) {
      console.log("Accessory added successfully", {
        id: result[0][0].insertId,
        ...req.body,
      });
      res.status(201).json({
        message: "Accessory added successfully",
        id: result[0][0].insertId,
        ...req.body,
      });
    } else {
      res.status(400).json({ error: "Error adding accessory" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const updateAccessory = async (req, res) => {
  try {
    const result = await AccessoryService.updateAccessory(
      req.params.id,
      req.body
    );
    if (result && result[0][0].affectedRows > 0) {
      res.status(200).json({ message: "Accessory updated successfully" });
    } else {
      res.status(400).json({ error: "Error updating accessory" });
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
      res.status(200).json({ message: "Accessory deleted successfully" });
    } else {
      res.status(400).json({ error: "Error deleting accessory" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const getSizeId = (req, res) => {
  const accessoryId = req.params.id;
  const query = "SELECT sizeId FROM stock WHERE accessoryId = ?";
  connection.query(query, [accessoryId], (err, result) => {
    if (err) {
      console.error("Error fetching sizeIds:", err);
      return res.status(500).json({ message: "Error fetching sizeIds" });
    } else {
      if (result.length > 0) {
        const sizeIds = result.map((row) => row.sizeId);
        res.status(200).json(sizeIds);
      } else {
        res.status(400).json({ message: "No items found" });
      }
    }
  });
};

const getSizes = (req, res) => {
  const query = "SELECT * FROM sizes";
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching sizes:", err);
      return res.status(500).json({ message: "Error fetching sizes" });
    } else {
      res.status(200).send(result);
    }
  });
};

const addToFavorites = async (req, res) => {
  const { aid: accessoryId, cid: customerId } = req.params; // Get accessoryId and customerId from URL

  // // Validation
  // if (!customerId || !accessoryId) {
  //   return res.status(400).json({ message: 'Please provide both customerId and accessoryId.' });
  // }

  try {
    // Insert the favorite into your database
    await connection.query(
      "INSERT INTO favourites (customerId, accessoryId) VALUES (?, ?)",
      [customerId, accessoryId]
    );

    res.status(200).json({ message: "Favorite added successfully!" });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ message: "Failed to add favorite" });
  }
};

const removeFromFavorites = async (req, res) => {
  const { customerId, accessoryId } = req.body;

  try {
    deleteAccessory(customerId, accessoryId);
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ message: "Failed to remove favorite" });
  }
};

const addAccessoryToMyGiftbox = async (req, res) => {
  const { giftboxId, accessoryId, quantity, sizeId } = req.body;
  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: "Quantity is required" });
  }

  if (!giftboxId || !accessoryId) {
    return res
      .status(400)
      .json({ message: "Giftbox ID and Accessory ID are required" });
  }

  if (!sizeId) {
    sizeId = 1;
  }

  // check if the product has enough quantity for the accessory
  const query = "SELECT * FROM stock WHERE accessoryId = ? AND sizeId = ?";
  const [stock] = await connection
    .promise()
    .query(query, [accessoryId, sizeId]);
  if (stock.length === 0 || stock[0].stockQuantity < quantity) {
    return res
      .status(400)
      .json({ message: "Not enough stock for the accessory" });
  }

  try {
    // Check if the giftbox exists
    const giftboxQuery = "SELECT * FROM giftbox WHERE giftboxId = ?";
    const [giftbox] = await connection
      .promise()
      .query(giftboxQuery, [giftboxId]);

    if (giftbox.length === 0) {
      return res.status(404).json({ message: "Giftbox not found" });
    }

    // Check if the accessory, giftbox combination already exists, if so, update the quantity
    const checkQuery = `SELECT * FROM giftboxaccessories WHERE giftboxId = ? AND accessoryId = ? AND sizeId = ?`;
    const [checkResult] = await connection
      .promise()
      .query(checkQuery, [giftboxId, accessoryId, sizeId]);

    if (checkResult.length > 0) {
      // True if the accessory is already in the giftbox, then update the quantity

      const updateQuery = `UPDATE giftboxaccessories SET quantity = quantity + ? WHERE giftboxId = ? AND accessoryId = ? AND sizeId = ?`;

      const updateResult = await connection
        .promise()
        .query(updateQuery, [quantity, giftboxId, accessoryId, sizeId]);

      if (updateResult[0].affectedRows === 0) {
        return res
          .status(400)
          .json({ message: "Error updating accessory quantity in giftbox" });
      } else {
        // Reduce the quantity from the stock
        const stockQuery = `UPDATE stock SET quantity = quantity - ? WHERE accessoryId = ? AND sizeId = ?`;
        await connection
          .promise()
          .query(stockQuery, [quantity, accessoryId, sizeId]);
        res.status(200).json({
          message: "Accessory quantity updated in giftbox successfully",
          ...req.body,
        });
        console.log("Accessory quantity updated in giftbox successfully", {
          ...req.body,
        });
      }
    } else {
      const insertQuery = `INSERT INTO giftboxaccessories (giftboxId, accessoryId, quantity,sizeId) VALUES (?, ?, ?,?)`;

      // Insert the accessory into the giftbox
      const result = await connection
        .promise()
        .query(insertQuery, [giftboxId, accessoryId, quantity,sizeId]);

      if (result[0].affectedRows === 0) {
        return res
          .status(400)
          .json({ message: "Error adding accessory to giftbox" });
      } else {
        // Reduce the quantity from the stock
        const stockQuery = `UPDATE stock SET quantity = quantity - ? WHERE accessoryId = ? AND sizeId = ?`;
        await connection
          .promise()
          .query(stockQuery, [quantity, accessoryId, sizeId]);
        res.status(200).json({
          message: "Accessory added to giftbox successfully",
          id: result[0].insertId,
          ...req.body,
        });
        console.log("Accessory added to giftbox successfully", {
          id: result[0].insertId,
          ...req.body,
        });
      }
    }
  } catch (error) {
    console.error("Error adding accessory to giftbox:", error); // Detailed error logging
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getSizeBySizeId = async (req, res) => {
  try {
    const result = await AccessoryService.getSizeBySizeId(req.params.id);
    if (accessories) {
      res.status(200).json(accessories[0]);
    }
  } catch (error) {
    console.error("Error fetching accessories:", error);
    res.status(500).json({ error: error.message });
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
  addToFavorites,
  removeFromFavorites,
  addAccessoryToMyGiftbox,
  getSizeBySizeId,
};
