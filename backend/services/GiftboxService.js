import connection from "../dbConnection.js";

export class GiftboxService {
  static async getGiftboxById(giftboxId) {
    try {
      if (!giftboxId) {
        throw new Error("Please provide a valid giftbox ID.");
      }
      const query = "SELECT * FROM giftbox WHERE giftboxId = ?";
      return await connection.promise().query(query, [giftboxId]);
    } catch (error) {
      console.error("Error fetching giftbox details:", error);
      throw error;
    }
  }

  // static async updateGiftbox(giftboxId) {
  //     try {
  //       if (!giftboxId) {
  //         throw new Error("Please provide a valid giftbox ID.");
  //       }
  //       const query = `UPDATE giftbox SET giftboxName = ?, noteContent = ?, giftboxColor = ?, giftboxPrice = ?, accessoryId = ? WHERE giftboxId = ?`;
  //       return await connection.promise().query(query, [giftboxId]);
  //     } catch (error) {
  //       console.error("Error updating giftbox:", error);
  //       throw error;
  //     }
  // }

  static async updateGiftbox( //meka my giftbox krnna...otherwise patalenw
    giftboxId,
    giftboxName,
    giftboxDescription,
    noteContent,
    giftboxPrice
  ) {
    if (!giftboxId || !giftboxName) {
      throw new Error("Please provide a valid giftbox ID and name.");
    }
    try {
      const query = `
        UPDATE giftbox
        SET
          giftboxName = ?,
          giftboxDescription = ?,
          noteContent = ?,
          giftboxPrice = ?
        WHERE giftboxId = ?
      `;
      return await connection
        .promise()
        .query(query, [
          giftboxName,
          giftboxDescription,
          noteContent,
          giftboxPrice,
          giftboxId,
        ]);
    } catch (error) {
      console.error("Error updating giftbox:", error);
      throw error;
    }
  }

  static async getBoxColors() {
    try {
      const query = "SELECT * FROM boxcolor";
      const [result] = await connection.promise().query(query);
      return result;
    } catch (error) {
      console.error("Error fetching box colors:", error);
      throw new Error("Error fetching box colors.");
    }
  }

  static async getGiftboxColorById(boxColorId){
    try{
      if(!boxColorId){
        throw new Error("Please provide a valid box color ID.");
      }
      const query = "SELECT * FROM boxcolor WHERE boxColorId = ?";
      return await connection.promise().query(query, [boxColorId]);
    } catch (error) {
      console.error("Error fetching box color:", error);
      throw error;
    }
  }

  static async getBoxColorByGiftboxId(giftboxId) {
    try {
      if (!giftboxId) {
        throw new Error("Please provide a valid giftbox ID.");
      }
      const query = `
        SELECT boxcolor.boxColorId, boxcolor.color
        FROM boxcolor
        JOIN giftbox ON giftbox.boxColorId = boxcolor.boxColorId
        WHERE giftbox.giftboxId = ?
      `;
      return await connection.promise().query(query, [giftboxId]);
    } catch (error) {
      console.error("Error fetching box color:", error);
      throw error;
    }
  }


  static async getGiftboxAccessories(giftboxId) {
    try {
      if (!giftboxId) {
        throw new Error("Please provide a valid giftbox ID.");
      }
      const query = `
        SELECT 
            accessory.accessoryId, 
            accessory.accessoryDescription, 
            accessory.accessoryName, 
            accessory.accessoryColor, 
            accessory.accessoryPrice, 
            accessory.averageRating,
            giftboxaccessories.sizeId,
            giftboxaccessories.quantity
        FROM 
            accessory
        JOIN 
            giftboxaccessories ON giftboxaccessories.accessoryId = accessory.accessoryId
        WHERE 
            giftboxaccessories.giftboxId = ?;

        `;
      return await connection.promise().query(query, [giftboxId]);
    } catch (error) {
      console.error("Error fetching giftbox details:", error);
      throw error;
    }
  }


  // static async updateGiftboxAccessories(giftboxId, giftboxAccessories) {
  //   try {
  //     if (!giftboxId || !giftboxAccessories) {
  //       throw new Error("Please provide a valid giftbox ID and accessories.");
  //     }
  
  //     // Prepare promises for updating each accessory's quantity
  //     const updatePromises = giftboxAccessories.map((accessory) => {
  //       const updateQuery = `
  //         UPDATE giftboxaccessories 
  //         SET quantity = ? 
  //         WHERE giftboxId = ? AND accessoryId = ?;
  //       `;
  //       return connection.promise().query(updateQuery, [accessory.quantity, giftboxId, accessory.accessoryId]);
  //     });
  
  //     // Execute all update queries
  //     await Promise.all(updatePromises);
  
  //     // Optionally, you can return a message or result indicating success
  //     return { message: "Giftbox accessories updated successfully." };
  //   } catch (error) {
  //     console.error("Error updating giftbox accessories:", error);
  //     throw error;
  //   }
  // }
  
  static async updateGiftboxAccessories(giftboxId, giftboxAccessories) {
    try {
      if (!giftboxId || !giftboxAccessories) {
        throw new Error("Please provide a valid giftbox ID and accessories.");
      }
  
      // Prepare promises for updating each accessory's quantity
      const updatePromises = giftboxAccessories.map((accessory) => {
        const updateQuery = `
          UPDATE giftboxaccessories 
          SET quantity = ? 
          WHERE giftboxId = ? AND accessoryId = ?;
        `;
        return connection.promise().query(updateQuery, [accessory.quantity, giftboxId, accessory.accessoryId]);
      });
  
      // Execute all accessory update queries
      await Promise.all(updatePromises);
  
      // Update the giftbox price based on the updated accessories
      const updatePriceQuery = `
        UPDATE giftbox g
        SET g.giftboxPrice = (
            SELECT SUM(ga.quantity * a.accessoryPrice)
            FROM giftboxaccessories ga
            JOIN accessory a ON ga.accessoryId = a.accessoryId
            WHERE ga.giftboxId = g.giftboxId
        )
        WHERE g.giftboxId = ?;
      `;
      await connection.promise().query(updatePriceQuery, [giftboxId]);
  
      // Optionally, return a success message
      return { message: "Giftbox accessories and price updated successfully." };
    } catch (error) {
      console.error("Error updating giftbox accessories and price:", error);
      throw error;
    }
  }
  


//   static async getGiftboxTotalValue(giftboxId) {
//     try {
//       if (!giftboxId) {
//         throw new Error("Please provide a valid giftbox ID.");
//       }
//       const query =    `
//       SELECT SUM(a.accessoryPrice * ga.quantity) AS totalGiftboxValue
//       FROM accessory a
//       JOIN giftboxaccessories ga ON ga.accessoryId = a.accessoryId
//       WHERE ga.giftboxId = ?
//       `;
//         return await connection.promise().query(query, [giftboxId]);
//     }
//     catch (error) {
//       console.error("Error fetching giftbox details:", error);
//       throw error;
//     }
// }


static async removeAccessoryFromGiftbox(giftboxId, accessoryId) {
    try {
      if (!giftboxId || !accessoryId) {
        throw new Error("Please provide a valid giftbox ID and accessory ID.");
      }
      const query = "DELETE FROM giftboxaccessories WHERE giftboxId = ? AND accessoryId = ?";
        return await connection.promise().query(query, [giftboxId, accessoryId]);
    } catch (error) {
      console.error("Error removing accessory from giftbox:", error);
      throw error;
    }
}

static async getAllFromGiftboxAccessories (giftboxId) {
  try {
    if (!giftboxId) {
      throw new Error("Please provide a valid giftbox ID.");
    }
    const query = `
      SELECT * FROM giftboxaccessories WHERE giftboxId = ?`
    return await connection.promise().query(query, [giftboxId]);
  } catch (error) {
    console.error("Error fetching giftbox accessories:", error);
    throw error;
  }
}


}
