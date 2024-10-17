import connection from "../dbConnection.js";

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

const getGiftboxById = (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM giftbox WHERE giftboxId = ?";
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
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
  const { giftboxName, noteContent, giftboxColor, giftboxPrice, accessories } =
    req.body;
  console.log(
    giftboxName,
    noteContent,
    giftboxColor,
    giftboxPrice,
    accessories,
    Array.isArray(accessories)
  );
  // Validation
  if (
    !giftboxName ||
    !noteContent ||
    !giftboxColor ||
    !giftboxPrice ||
    !accessories ||
    !Array.isArray(accessories)
  ) {
    return res
      .status(400)
      .json({
        error:
          "Please provide name, note content, color, price, and the accessory/accessories with quantities.",
      });
  }

  // Start transaction
  connection.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ error: "Error starting transaction." });
    }

    // Insert the new giftbox into the database
    const giftboxQuery = `
          INSERT INTO giftbox (giftboxName, noteContent, giftboxColor, giftboxPrice)
          VALUES (?, ?, ?, ?)
      `;
    connection.query(
      giftboxQuery,
      [giftboxName, noteContent, giftboxColor, giftboxPrice],
      (err, result) => {
        if (err) {
          return connection.rollback(() => {
            console.error("Error adding giftbox:", err);
            res.status(500).json({ error: "Error adding giftbox." });
          });
        }

        const giftboxId = result.insertId;

        // Insert each accessory into giftbox_accessories
        const accessoriesQuery = `
              INSERT INTO giftboxaccessories (giftboxId, accessoryId, quantity)
              VALUES ?
          `;
        //map each item in accessories array to an array of values for the query
        const accessoriesValues = accessories.map((item) => [
          giftboxId,
          item.accessory.accessoryId,
          item.quantity,
        ]);
        console.log(accessoriesValues);
        connection.query(accessoriesQuery, [accessoriesValues], (err) => {
          if (err) {
            return connection.rollback(() => {
              console.error("Error adding accessories to giftbox:", err);
              res
                .status(500)
                .json({ error: "Error adding accessories to giftbox." });
            });
          }

          // Commit transaction
          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                console.error("Error committing transaction:", err);
                res
                  .status(500)
                  .json({ error: "Error committing transaction." });
              });
            }

            res
              .status(201)
              .json({
                id: giftboxId,
                giftboxName,
                noteContent,
                giftboxColor,
                giftboxPrice,
                accessories,
              });
          });
        });
      }
    );
  });
};

const updateGiftbox = (req, res) => {
  const giftboxId = req.params.id;
  const {
    giftboxName,
    giftboxDescription,
    giftboxColor,
    giftboxQuantity,
    giftboxPrice,
    categoryId,
  } = req.body;
  const query = `
      UPDATE giftbox
      SET
        giftboxName = ?,
        giftboxDescription = ?,
        giftboxColor = ?,
        giftboxQuantity = ?,
        giftboxPrice = ?,
        categoryId = ?
      WHERE giftboxID = ?
    `;
  connection.query(
    query,
    [
      giftboxName,
      giftboxDescription,
      giftboxColor,
      giftboxQuantity,
      giftboxPrice,
      categoryId,
      giftboxId,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating giftbox:", err);
        res.status(500).json({ error: "Error updating giftbox" });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Giftbox not found" });
        return;
      }
      res.status(200).json({ message: "Giftbox updated successfully" });
    }
  );
};

const deleteGiftbox = (req, res) => {
  try {
    const giftboxId = req.params.id;

    if (!giftboxId) {
      return res.status(400).json({ error: "giftbox ID is required." });
    }

    const query = "DELETE FROM giftbox WHERE giftboxId = ?";
    connection.query(query, [giftboxId], (err, result) => {
      if (err) {
        console.error("Error deleting giftbox:", err);
        return res.status(500).json({ error: "Failed to delete giftbox." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Giftbox not found." });
      }

      res.json({ message: "Giftbox deleted successfully." });
    });
  } catch (error) {
    console.error("Error in deleteGiftbox function:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const createMyGiftbox = (req, res) => {
  const { giftboxName, userId, giftboxDescription, noteContent, boxColorId } = req.body;
  console.log(giftboxName, userId, giftboxDescription, noteContent, boxColorId);

  // Validation
  if (!giftboxName) {
    return res
      .status(400)
      .json({ error: "Please provide a name for the giftbox." });
  }

  // Insert the new giftbox into the database
  const giftboxQuery = `
        INSERT INTO giftbox (giftboxName, userId, giftboxDescription, noteContent, boxColorId)
        VALUES (?, ?, ?, ?, ?)
    `;
  connection.query(
    giftboxQuery,
    [
      giftboxName,
      userId,
      giftboxDescription || null, // Corrected order of parameters
      noteContent || null,
      boxColorId || null,
    ],
    (err, result) => {
      if (err) {
        console.error("Error adding giftbox:", err);
        return res.status(500).json({ error: "Error adding giftbox." });
      }

      const giftboxId = result.insertId;
      res
        .status(201)
        .json({
          giftboxId,
          userId,
          giftboxName,
          noteContent,
          boxColorId,
          giftboxDescription,
        });
    }
  );
};

export const getBoxColors = (req, res) => {
  const query = "SELECT * FROM boxcolor";
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error fetching box colors." });
    } else {
      res.status(200).json(result);
    }
  });
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

const getMyGiftboxes = (req, res) => {
  const query = "SELECT * FROM giftbox WHERE userId = ?";
  connection.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error fetching giftboxes." });
    } else {
      res.status(200).json(result);
    }
  });
};



export {
  getGiftbox,
  getGiftboxById,
  addGiftbox,
  updateGiftbox,
  deleteGiftbox,
  createMyGiftbox,
  getCustomizedGiftbox,
  getMyGiftboxes
};
