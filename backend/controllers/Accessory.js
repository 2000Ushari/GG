import connection from "../dbConnection.js";

const getAccessory = (req, res) => {
    const query = "SELECT * FROM accessory";
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
};

const getAccessoryById = (req, res) => {
  console.log("getAccessoryById");
    const id = req.params.id;
    console.log(id);
    const query = "SELECT * FROM accessory WHERE accessoryId = ?";
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result[0]);        }
    });
};

// export const addAccessory = (req, res) => {
//     const query = "INSERT INTO accessory (accessoryName, accessoryDescription, accessoryColor, accessoryPrice, categoryId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW()); "
//     connection.query(query, [req.body], (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     });
// };  

const addAccessory = (req, res) => {
  const { accessoryName, accessoryDescription, accessoryColor, accessoryQuantity, accessoryPrice, categoryId } = req.body;

  // Validation
  if (!accessoryName || !accessoryDescription || !accessoryColor || !accessoryQuantity || !accessoryPrice || !categoryId) {
    return res.status(400).json({ error: 'Please provide name, description, color, quantity, price, and categoryId.' });
  }

  // Additional Validation
  if (accessoryPrice < 0 || accessoryQuantity < 0) {
    return res.status(400).json({ error: 'Price and quantity must be non-negative.' });
  }

  // Insert the new accessory into the database
  const query = `
    INSERT INTO accessory (accessoryName, accessoryDescription, accessoryColor, accessoryQuantity, accessoryPrice, categoryId)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  connection.query(query, [accessoryName, accessoryDescription, accessoryColor, accessoryQuantity, accessoryPrice, categoryId], (err, result) => {
    if (err) {
      console.error('Error adding accessory:', err);
      return res.status(500).json({ error: 'Error adding accessory.' });
    }

    // Return the newly created accessory ID
    const accessoryId = result.insertId;
    res.status(201).json({ id: accessoryId, accessoryName, accessoryDescription, accessoryColor, accessoryQuantity, accessoryPrice, categoryId });
  });
};


  const updateAccessory = (req, res) => {
    const accessoryId = req.params.id;
    const { accessoryName, accessoryDescription, accessoryColor, accessoryQuantity, accessoryPrice, categoryId } = req.body;
    const query = `
      UPDATE accessory
      SET
        accessoryName = ?,
        accessoryDescription = ?,
        accessoryColor = ?,
        accessoryQuantity = ?,
        accessoryPrice = ?,
        categoryId = ?
      WHERE accessoryID = ?
    `;
    connection.query(query, [accessoryName, accessoryDescription, accessoryColor, accessoryQuantity, accessoryPrice, categoryId, accessoryId], (err, result) => {
        if (err) {
            console.error('Error updating accessory:', err);
            res.status(500).json({ error: 'Error updating accessory' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Accessory not found' });
            return;
        }
        res.status(200).json({ message: 'Accessory updated successfully' });
    });
};
  

const deleteAccessory = (req, res) => {
    try {
      const accessoryId = req.params.id;
  
      if (!accessoryId) {
        return res.status(400).json({ error: "Accessory ID is required." });
      }
  
      const query = "DELETE FROM accessory WHERE accessoryId = ?";
      connection.query(query, [accessoryId], (err, result) => {
        if (err) {
          console.error("Error deleting accessory:", err);
          return res.status(500).json({ error: "Failed to delete accessory." });
        }
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Accessory not found." });
        }
  
        res.json({ message: "Accessory deleted successfully." });
      });
    } catch (error) {
      console.error("Error in deleteAccessory function:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };
  
// const getSizeId = (req, res) => {
//     const query = "SELECT * FROM sizesaccessories WHERE accessoryId";
//     connection.query(query, (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     });
// };

// const getSizes = (req, res) => {
//   // Get sizeIds from the request body
//   const { sizeIds } = req.body; // Assuming you're sending the array of sizeIds in the request body

//   // Check if sizeIds is provided and is an array
//   if (!sizeIds || !Array.isArray(sizeIds) || sizeIds.length === 0) {
//       return res.status(400).json({ message: 'No sizeIds provided' });
//   }

//   // Create SQL query to fetch sizes based on multiple sizeIds using IN clause
//   const query = `SELECT * FROM sizesaccessories WHERE sizeId IN (?)`;

//   // Execute the query with sizeIds as the parameter
//   connection.query(query, [sizeIds], (err, result) => {
//       if (err) {
//           console.log(err);
//           return res.status(500).json({ message: 'Error fetching sizes' });
//       } else {
//           res.send(result); // Send the result back to the client
//       }
//   });
// };


// Modified getSizeId API to fetch sizeIds based on accessoryId
// const getSizeId = (req, res) => {
//   const accessoryId = req.params.accessoryId; // Get accessoryId from the request parameters
//   const query = "SELECT sizeId FROM sizesaccessories WHERE accessoryId = ?";

//   connection.query(query, [accessoryId], (err, result) => {
//       if (err) {
//           console.log(err);
//           return res.status(500).json({ message: 'Error fetching sizeIds' });
//       } else {
//           // Extract sizeIds into an array from the result
//           const sizeIds = result.map(row => row.sizeId);
//           res.send(sizeIds); // Send the array of sizeIds to the client
//       }
//   });
// };

const getSizeId = (req, res) => {
  const accessoryId = req.params.id;
  console.log("Accessory ID received:", accessoryId); // Debugging log
  
  const query = "SELECT sizeId FROM sizesaccessories WHERE accessoryId = ?";

  connection.query(query, [accessoryId], (err, result) => {
    if (err) {
      console.error("Error fetching sizeIds:", err);
      return res.status(500).json({ message: 'Error fetching sizeIds' });
    } else {
      if (result.length > 0) {
        const sizeIds = result.map(row => row.sizeId);
        res.json(sizeIds);
      } else {
        res.json([]); 
      }
    }
  });
};


const getSizes = (req, res) => {
  const query = "SELECT * FROM sizes";
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching sizes:", err);
      return res.status(500).json({ message: 'Error fetching sizes' });
    } else {
      console.log(result);
      res.send(result);
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
      await connection.query('INSERT INTO favourites (customerId, accessoryId) VALUES (?, ?)', [customerId, accessoryId]);
  
      res.status(200).json({ message: 'Favorite added successfully!' });
    } catch (error) {
      console.error('Error adding favorite:', error);
      res.status(500).json({ message: 'Failed to add favorite' });
    }
  };
  

const removeFromFavorites = async (req, res) => {
  const { customerId, accessoryId } = req.body;

  try { deleteAccessory(customerId, accessoryId); }
  catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ message: 'Failed to remove favorite' });
  }
};


const addAccessoryToMyGiftbox = async (req, res) => {
  const { giftboxId, accessoryId, qty = 1 } = req.body;

  // check if the product has enough quantity for the accessory
  const accessory = await connection.promise().query('SELECT * FROM accessory WHERE accessoryId = ?', [accessoryId]);
  if(accessory.accessoryQuantity < qty && qty >= 1) {
    return res.status(400).json({ message: 'Not enough quantity of accessory available' });
  }

  if (!giftboxId || !accessoryId) {
    return res.status(400).json({ message: 'Giftbox ID and Accessory ID are required' });
  }

  try {
    // Check if the giftbox exists
    const giftboxQuery = 'SELECT * FROM giftbox WHERE giftboxId = ?';
    const [giftbox] = await connection.promise().query(giftboxQuery, [giftboxId]);

    if (giftbox.length === 0) {
      return res.status(404).json({ message: 'Giftbox not found' });
    }

    // Check if the accessory exists
    const accessoryQuery = 'SELECT * FROM accessory WHERE accessoryId = ?';
    const [accessory] = await connection.promise().query(accessoryQuery, [accessoryId]);

    if (accessory.length === 0) {
      return res.status(404).json({ message: 'Accessory not found' });
    }

    // Log SQL insert query for debugging
    const insertQuery = `INSERT INTO giftboxaccessories (giftboxId, accessoryId) VALUES (?, ?)`;
    console.log("Insert Query:", insertQuery, [giftboxId, accessoryId]);

    // Insert the accessory into the giftbox
    await connection.promise().query(insertQuery, [giftboxId, accessoryId]);

    res.status(200).json({ message: 'Accessory added to giftbox successfully' });
  } catch (error) {
    console.error('Error adding accessory to giftbox:', error); // Detailed error logging
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};




export { getAccessory, getAccessoryById, addAccessory, updateAccessory, deleteAccessory, getSizeId, getSizes, addToFavorites, removeFromFavorites, addAccessoryToMyGiftbox };