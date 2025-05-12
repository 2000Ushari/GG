import connection from '../dbConnection.js';
import { GiftboxService } from '../services/GiftboxService.js';
import { AccessoryService } from '../services/AccessoryService.js';

const getGiftbox = (req, res) => {
  const query = "SELECT * FROM giftbox WHERE giftboxType='Default'";
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

const getGiftboxById = async (req, res) => {
  const giftboxId = req.params.gid;

  try {
    if (!giftboxId) {
      throw new Error('Please provide a valid giftbox ID.');
    }

    // Await the result from the service
    const [giftbox] = await GiftboxService.getGiftboxById(giftboxId);

    if (giftbox.length === 0) {
      return res.status(404).json({ message: 'No such giftbox existing.' });
    }

    res.status(200).json(giftbox);
  } catch (error) {
    console.error('Error fetching giftbox:', error);
    res.status(500).json({ error: error.message });
  }
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

// const addGiftbox = (req, res) => {
//     const { giftboxName, noteContent, giftboxColor, giftboxPrice, accessoryId } = req.body;

//     // Validation
//     if (!giftboxName || !noteContent || !giftboxColor || !giftboxPrice || !accessoryId) {
//       return res.status(400).json({ error: 'Please provide name, note content, color, price and the accessory/accessories.' });
//     }

//     // Insert the new giftbox into the database
//     const query = `
//       INSERT INTO giftbox (giftboxName, noteContent, giftboxColor, giftboxPrice, accessoryId)
//       VALUES (?, ?, ?, ?, ?, ?)
//     `;
//     connection.query(query, [giftboxName, noteContent, giftboxColor, giftboxPrice, accessoryId], (err, result) => {
//       if (err) {
//         console.error('Error adding giftbox:', err);
//         return res.status(500).json({ error: 'Error adding giftbox.' });
//       }

//       // Return the newly created giftbox ID
//       const giftboxId = result.insertId;

//       res.status(201).json({ id: giftboxName, noteContent, giftboxColor, giftboxPrice, accessoryId });
//     });
//   };

const addGiftbox = (req, res) => {
  const { giftboxName, noteContent, boxColorId, giftboxPrice, accessories } = req.body;
  console.log(giftboxName, noteContent, boxColorId, giftboxPrice, accessories, Array.isArray(accessories));
  // Validation
  if (!giftboxName || !noteContent || !boxColorId || !giftboxPrice || !accessories || !Array.isArray(accessories)) {
    return res.status(400).json({
      error: 'Please provide name, note content, color, price, and the accessory/accessories with quantities.',
    });
  }

  // Start transaction
  connection.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error starting transaction.' });
    }

    // Insert the new giftbox into the database
    const giftboxQuery = `
          INSERT INTO giftbox (giftboxName, noteContent, boxColorId, giftboxPrice)
          VALUES (?, ?, ?, ?)
      `;
    connection.query(giftboxQuery, [giftboxName, noteContent, boxColorId, giftboxPrice], (err, result) => {
      if (err) {
        return connection.rollback(() => {
          console.error('Error adding giftbox:', err);
          res.status(500).json({ error: 'Error adding giftbox.' });
        });
      }

      const giftboxId = result.insertId;

      // Insert each accessory into giftbox_accessories
      const accessoriesQuery = `
              INSERT INTO giftboxaccessories (giftboxId, accessoryId, quantity)
              VALUES ?
          `;
      //map each item in accessories array to an array of values for the query
      const accessoriesValues = accessories.map((item) => [giftboxId, item.accessory.accessoryId, item.quantity]);
      console.log(accessoriesValues);
      connection.query(accessoriesQuery, [accessoriesValues], (err) => {
        if (err) {
          return connection.rollback(() => {
            console.error('Error adding accessories to giftbox:', err);
            res.status(500).json({ error: 'Error adding accessories to giftbox.' });
          });
        }

        // Commit transaction
        connection.commit((err) => {
          if (err) {
            return connection.rollback(() => {
              console.error('Error committing transaction:', err);
              res.status(500).json({ error: 'Error committing transaction.' });
            });
          }

          res.status(201).json({
            id: giftboxId,
            giftboxName,
            noteContent,
            boxColorId,
            giftboxPrice,
            accessories,
          });
        });
      });
    });
  });
};

// const updateGiftbox = (req, res) => {
//   const giftboxId = req.params.id;
//   const {
//     giftboxName,
//     giftboxDescription,
//     giftboxColor,
//     giftboxQuantity,
//     giftboxPrice,
//     categoryId,
//   } = req.body;
//   const query = `
//       UPDATE giftbox
//       SET
//         giftboxName = ?,
//         giftboxDescription = ?,
//         giftboxColor = ?,
//         giftboxQuantity = ?,
//         giftboxPrice = ?,
//         categoryId = ?
//       WHERE giftboxID = ?
//     `;
//   connection.query(
//     query,
//     [
//       giftboxName,
//       giftboxDescription,
//       giftboxColor,
//       giftboxQuantity,
//       giftboxPrice,
//       categoryId,
//       giftboxId,
//     ],
//     (err, result) => {
//       if (err) {
//         console.error("Error updating giftbox:", err);
//         res.status(500).json({ error: "Error updating giftbox" });
//         return;
//       }
//       if (result.affectedRows === 0) {
//         res.status(404).json({ error: "Giftbox not found" });
//         return;
//       }
//       res.status(200).json({ message: "Giftbox updated successfully" });
//     }
//   );
// };

const updateGiftbox = async (req, res) => {
  const giftboxId = req.params.gid;
  const { giftboxName, giftboxDescription, noteContent, giftboxPrice } = req.body;

  try {
    // Call the service method with the required parameters
    const [result] = await GiftboxService.updateGiftbox(
      giftboxId,
      giftboxName,
      giftboxDescription,
      noteContent,
      giftboxPrice
    );

    // Check if any rows were affected (i.e., if the giftbox was updated)
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Giftbox not found' });
    }

    res.status(200).json({ message: 'Giftbox updated successfully' });
  } catch (error) {
    console.error('Error updating giftbox:', error);
    res.status(500).json({ error: 'Error updating giftbox' });
  }
};

const deleteGiftbox = (req, res) => {
  try {
    const giftboxId = req.params.id;

    if (!giftboxId) {
      return res.status(400).json({ error: 'giftbox ID is required.' });
    }

    const query = 'DELETE FROM giftbox WHERE giftboxId = ?';
    connection.query(query, [giftboxId], (err, result) => {
      if (err) {
        console.error('Error deleting giftbox:', err);
        return res.status(500).json({ error: 'Failed to delete giftbox.' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Giftbox not found.' });
      }

      res.json({ message: 'Giftbox deleted successfully.' });
    });
  } catch (error) {
    console.error('Error in deleteGiftbox function:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// const createMyGiftbox = (req, res) => {
//   const { giftboxName, userId, giftboxDescription, noteContent, boxColorId } = req.body;
//   console.log(giftboxName, userId, giftboxDescription, noteContent, boxColorId);

//   // Validation
//   if (!giftboxName) {
//     return res
//       .status(400)
//       .json({ error: "Please provide a name for the giftbox." });
//   }

//   // Insert the new giftbox into the database
//   const giftboxQuery = `
//         INSERT INTO giftbox (giftboxName, userId, giftboxDescription, noteContent, boxColorId)
//         VALUES (?, ?, ?, ?, ?)
//     `;
//   connection.query(
//     giftboxQuery,
//     [
//       giftboxName,
//       userId,
//       giftboxDescription || null, // Corrected order of parameters
//       noteContent || null,
//       boxColorId || null,
//     ],
//     (err, result) => {
//       if (err) {
//         console.error("Error adding giftbox:", err);
//         return res.status(500).json({ error: "Error adding giftbox." });
//       }

//       const giftboxId = result.insertId;
//       res
//         .status(201)
//         .json({
//           giftboxId,
//           userId,
//           giftboxName,
//           noteContent,
//           boxColorId,
//           giftboxDescription,
//         });
//     }
//   );
// };

const createMyGiftbox = (req, res) => {
  const { giftboxName, userId, giftboxDescription, noteContent, boxColorId } = req.body;
  const giftboxType = 'Customized';
  console.log(giftboxName, userId, giftboxDescription, noteContent, boxColorId);

  // Validation
  if (!giftboxName) {
    return res.status(400).json({ error: 'Please provide a name for the giftbox.' });
  }

  // Insert the new giftbox into the database
  const giftboxQuery = `
    INSERT INTO giftbox (giftboxName, userId, giftboxType, giftboxDescription, noteContent, boxColorId)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    giftboxQuery,
    [
      giftboxName,
      userId,
      giftboxType,
      giftboxDescription || null, // Corrected order of parameters
      noteContent || null,
      boxColorId || null,
    ],
    (err, result) => {
      if (err) {
        console.error('Error adding giftbox:', err);
        return res.status(500).json({ error: 'Error adding giftbox.' });
      }

      const giftboxId = result.insertId;

      // Update giftboxPrice for the newly created giftbox
      const updatePriceQuery = `
        UPDATE giftbox g
        SET g.giftboxPrice = (
          SELECT COALESCE(SUM(ga.quantity * a.accessoryPrice), 0)
          FROM giftboxaccessories ga
          JOIN accessory a ON ga.accessoryId = a.accessoryId
          WHERE ga.giftboxId = g.giftboxId
        )
        WHERE g.giftboxId = ?;
      `;

      connection.query(updatePriceQuery, [giftboxId], (updateErr) => {
        if (updateErr) {
          console.error('Error updating giftbox price:', updateErr);
          return res.status(500).json({ error: 'Error updating giftbox price.' });
        }

        // Send response after successful insertion and price update
        res.status(201).json({
          giftboxId,
          userId,
          giftboxName,
          giftboxType,
          noteContent,
          boxColorId,
          giftboxDescription,
        });
      });
    }
  );
};

export const getBoxColors = async (req, res) => {
  try {
    const colors = await GiftboxService.getBoxColors();
    res.status(200).json(colors);
  } catch (error) {
    console.error('Error fetching box colors:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getBoxColorByGiftboxId = async (req, res) => {
  try {
    const giftboxId = req.params.gid;

    if (!giftboxId) {
      throw new Error('Please provide a valid giftbox ID.');
    }

    const colors = await GiftboxService.getBoxColorByGiftboxId(giftboxId);
    res.status(200).json(colors[0]);
  } catch (error) {
    console.error('Error fetching box color by giftbox ID:', error);
    res.status(500).json({ error: error.message });
  }
};

const getGiftboxColorById = async (req, res) => {
  const boxColorId = req.params.bid;

  try {
    if (!boxColorId) {
      throw new Error('Please provide a valid box color ID.');
    }

    const [boxColor] = await GiftboxService.getGiftboxColorById(boxColorId);

    if (boxColor.length === 0) {
      return res.status(404).json({ message: 'No such box color existing.' });
    }
    res.status(200).json(boxColor);
  } catch (error) {
    console.error('Error fetching box color:', error);
    res.status(500).json({ error: error.message });
  }
};

const getCustomizedGiftbox = (req, res) => {
  const query = "SELECT * FROM giftbox WHERE giftboxType = 'Customized'";
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

const putBoxcolorId = (req, res) => {
  const giftboxId = req.params.gid;
  const boxColorId = req.body.boxcolorId;
  const query = 'UPDATE giftbox SET boxColorId = ? WHERE giftboxId = ?';
  connection.query(query, [boxColorId, giftboxId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

const getMyGiftboxes = (req, res) => {
  const userId = req.params.id;

  // Update giftboxPrice for all giftboxes associated with the user before fetching
  const updatePriceQuery = `
    UPDATE giftbox g
    SET g.giftboxPrice = (
      SELECT COALESCE(SUM(ga.quantity * a.accessoryPrice), 0)
      FROM giftboxaccessories ga
      JOIN accessory a ON ga.accessoryId = a.accessoryId
      WHERE ga.giftboxId = g.giftboxId
    )
    WHERE g.userId = ?;
  `;

  connection.query(updatePriceQuery, [userId], (updateErr) => {
    if (updateErr) {
      console.error('Error updating giftbox prices:', updateErr);
      return res.status(500).json({ error: 'Error updating giftbox prices.' });
    }

    // Fetch all giftboxes for the user after updating prices
    const query = 'SELECT * FROM giftbox WHERE userId = ?';
    connection.query(query, [userId], (err, result) => {
      if (err) {
        console.error('Error fetching giftboxes:', err);
        return res.status(500).json({ error: 'Error fetching giftboxes.' });
      }

      res.status(200).json(result);
    });
  });
};

const getGiftboxAccessories = async (req, res) => {
  try {
    const giftboxId = req.params.gid;

    if (!giftboxId) {
      throw new Error('Please provide a valid giftbox ID.');
    }

    const accessories = await GiftboxService.getGiftboxAccessories(giftboxId);
    res.status(200).json(accessories[0]);
  } catch (error) {
    console.error('Error fetching giftbox accessories:', error);
    res.status(500).json({ error: error.message });
  }
};

// const getGiftboxTotalValue = async (req, res) => {
//   const giftboxId = req.params.gid;

//   try {
//     // Validate that giftboxId is provided
//     if (!giftboxId) {
//       return res.status(400).json({ error: "Giftbox ID is required." });
//     }

//     // Call the service method to get the total value
//     const [result] = await GiftboxService.getGiftboxTotalValue(giftboxId);

//     // Check if the result contains any data
//     if (result && result.length > 0) {
//       const totalValue = result[0].totalGiftboxValue || 0; // Default to 0 if no accessories
//       res.status(200).json({ totalGiftboxValue: totalValue });
//     } else {
//       res.status(404).json({ message: "Giftbox not found or has no accessories." });
//     }
//   } catch (error) {
//     console.error("Error fetching giftbox total value:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

const removeAccessoryFromGiftbox = async (req, res) => {
  try {
    const accessoryId = req.params.aid;
    const giftboxId = req.params.gid;

    if (!accessoryId || !giftboxId) {
      return res.status(400).json({ error: 'Accessory ID and giftbox ID are required.' });
    }

    const result = await GiftboxService.removeAccessoryFromGiftbox(giftboxId, accessoryId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Accessory not found in giftbox.' });
    }

    const accessoryDetails = await AccessoryService.getAccessoryById(accessoryId);
    console.log('Accessory details', accessoryDetails[0][0]);

    const accessoryInGiftbox = await GiftboxService.getAllFromGiftboxAccessories(giftboxId);
    console.log('Accessory in giftbox', accessoryInGiftbox[0][0]);
    // update the giftbox capacity
    const updateCapacityQuery = `UPDATE giftbox SET giftboxCapacity = giftboxCapacity - ? WHERE giftboxId = ?`;
    await connection
      .promise()
      .query(updateCapacityQuery, [accessoryInGiftbox[0][0].quantity * accessoryDetails[0][0].units, giftboxId]);
    console.log('Accessory capacity updated in giftbox');

    res.status(200).json({ message: 'Accessory removed from giftbox successfully.' });
  } catch (error) {
    console.error('Error removing accessory from giftbox:', error);
    res.status(500).json({ error: error.message });
  }
};

// export const updateGiftboxAccessories = async (req, res) => {

//   const { giftboxId, giftboxAccessories } = req.body;
// console.log("giftboxAccessories", giftboxAccessories);
//   try {
//     // Call the service method to update the giftbox accessories
//     await GiftboxService.updateGiftboxAccessories(giftboxId, giftboxAccessories);

//     res.status(200).json({ message: "Giftbox accessories updated successfully." });

//   } then {    const query = `UPDATE giftbox g
//     JOIN (
//       SELECT SUM(ga.quantity * a.units) AS totalUnits
//       FROM giftboxaccessories ga
//       JOIN accessory a ON ga.accessoryId = a.accessoryId
//       WHERE ga.giftboxId = ?
//     ) AS subquery ON g.giftboxId = ?
//     SET g.giftboxCapacity = subquery.totalUnits;`
//         console.log("Accessory capacity updated in giftbox");

//   }catch (error) {
//     console.error("Error updating giftbox accessories:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

export const updateGiftboxAccessories = async (req, res) => {
  const { giftboxId, giftboxAccessories } = req.body;
  console.log('giftboxAccessories', giftboxAccessories);

  try {
    // Call the service method to update the giftbox accessories
    await GiftboxService.updateGiftboxAccessories(giftboxId, giftboxAccessories);

    // Update the giftbox capacity based on the updated accessories
    const updateCapacityQuery = `
      UPDATE giftbox g
      JOIN (
        SELECT SUM(ga.quantity * a.units) AS totalUnits
        FROM giftboxaccessories ga
        JOIN accessory a ON ga.accessoryId = a.accessoryId
        WHERE ga.giftboxId = ?
      ) AS subquery ON g.giftboxId = ?
      SET g.giftboxCapacity = subquery.totalUnits;
    `;

    await connection.promise().query(updateCapacityQuery, [giftboxId, giftboxId]);

    console.log('Accessory capacity updated in giftbox');

    res.status(200).json({ message: 'Giftbox accessories updated successfully.' });
  } catch (error) {
    console.error('Error updating giftbox accessories:', error);
    res.status(500).json({ error: error.message });
  }
};

export {
  getGiftbox,
  getGiftboxById,
  addGiftbox,
  updateGiftbox,
  deleteGiftbox,
  createMyGiftbox,
  getCustomizedGiftbox,
  getMyGiftboxes,
  getGiftboxAccessories,
  putBoxcolorId,
  removeAccessoryFromGiftbox,
  getGiftboxColorById,
};
