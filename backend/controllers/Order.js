import connection from "../dbConnection.js";

export const getOrder = (req, res) => {
  const query = "SELECT * FROM orders";
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

export const getOrderDetails = (req, res) => {
  const query = `SELECT orders.orderId, orders.giftboxId, orders.quantity, orders.price, orders.orderDate, orders.orderStatus, orders.dueDate, customer.email 
    FROM orders 
    INNER JOIN customer 
    ON orders.customerId = customer.customerId;`;

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

export const addShippingAddress = (req, res) => {
  const query = `INSERT INTO orders (shippingAddress, deliveryDistrictId) VALUES (?, ?) WHERE customerId = ?`;
  connection.query(query, [req.body], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

export const getOrderById = (req, res) => {
  const orderId = req.params.oid;

  // Query to get order details by orderId
  const orderQuery = "SELECT * FROM orders WHERE orderId = ?";

  connection.query(orderQuery, [orderId], (err, orderResult) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: "Error fetching order details" });
    }

    if (orderResult.length === 0) {
      return res.status(404).send({ message: "Order not found" });
    }

    // Extract deliveryDistrictId and giftboxId from the order result
    const deliveryDistrictId = orderResult[0].deliveryDistrictId;
    const giftboxId = orderResult[0].giftboxId;

    // Query to get district name by deliveryDistrictId
    const districtQuery = "SELECT deliveryDistrictName FROM delivery_districts WHERE deliveryDistrictId = ?";

    connection.query(districtQuery, [deliveryDistrictId], (districtErr, districtResult) => {
      if (districtErr) {
        console.log(districtErr);
        return res.status(500).send({ error: "Error fetching district details" });
      }

      // Query to get giftbox name by giftboxId
      const giftboxQuery = "SELECT giftboxName FROM giftbox WHERE giftboxId = ?";

      connection.query(giftboxQuery, [giftboxId], (giftboxErr, giftboxResult) => {
        if (giftboxErr) {
          console.log(giftboxErr);
          return res.status(500).send({ error: "Error fetching giftbox details" });
        }

        // Combine order details with district and giftbox name
        const orderDetails = {
          ...orderResult[0],
          deliveryDistrictName: districtResult.length > 0 ? districtResult[0].deliveryDistrictName : null,
          giftboxName: giftboxResult.length > 0 ? giftboxResult[0].giftboxName : null,
        };

        res.send(orderDetails);
      });
    });
  });
};


export const addOrder = (req, res) => {
  const query = "INSERT INTO order_list SET ?";
  connection.query(query, [req.body], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

export const updateOrder = (req, res) => {
  const query = "UPDATE order_list SET ? WHERE id = ?";
  connection.query(query, [req.body, req.params.id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

export const deleteOrder = (req, res) => {
  const query = "DELETE FROM order_list WHERE id = ?";
  connection.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

export const getDistricts = (req, res) => {
  const query = "SELECT * FROM delivery_districts";
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

export const getDistrictById = (req, res) => {
  const districtId = req.params.did;
  const query = "SELECT * FROM delivery_districts WHERE deliveryDistrictId = ?";
  connection.query(query, [districtId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

export const getDeliveryFee = (req, res) => {
  const { selectedDistrict } = req.params;

  // Step 1: Retrieve delivery distance for the given district
  connection
    .promise()
    .query(
      `SELECT deliveryDistance FROM delivery_districts WHERE deliveryDistrictName = ?`,
      [selectedDistrict]
    )
    .then(([districtResult]) => {
      if (districtResult.length === 0) {
        return res.status(404).json({ message: "District not found" });
      }

      const deliveryDistance = districtResult[0].deliveryDistance;

      // Step 2: Retrieve rate per kilometer
      return connection
        .promise()
        .query(`SELECT ratePerOneKm FROM delivery_rates LIMIT 1`)
        .then(([rateResult]) => {
          if (rateResult.length === 0) {
            return res.status(404).json({ message: "Rate not found" });
          }

          const ratePerOneKm = rateResult[0].ratePerOneKm;

          // Step 3: Calculate delivery fee
          const deliveryFee = deliveryDistance * ratePerOneKm;

          // Step 4: Send the calculated delivery fee to the frontend
          res.status(200).json({ deliveryFee });
        });
    })
    .catch((error) => {
      console.error("Error calculating delivery fee:", error);
      res.status(500).json({ message: "Server error" });
    });
};

export const getWrappingFee = (req, res) => {
  const giftboxId = req.params.gid;

  // First query to get giftbox capacity based on the given giftbox ID
  const getGiftboxCapacityQuery = `SELECT giftboxCapacity FROM giftbox WHERE giftboxId = ?`;
  connection.query(getGiftboxCapacityQuery, [giftboxId], (err, result) => {
    if (err) {
      console.error("Error fetching giftbox capacity:", err);
      return res
        .status(500)
        .json({ error: "Database error while fetching giftbox capacity." });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Giftbox not found." });
    }

    // Retrieve giftbox capacity from the result
    const giftboxCapacity = result[0].giftboxCapacity;

    // Second query to get the capacities and wrapping fees
    const getCapacityQuery = `SELECT * FROM giftbox_capacity ORDER BY capacityInUnits ASC`;
    connection.query(getCapacityQuery, (err, capacities) => {
      if (err) {
        console.error("Error fetching giftbox capacity limits:", err);
        return res
          .status(500)
          .json({ error: "Database error while fetching capacity limits." });
      }

      let wrappingFee = null;
      let message = "";

      // Determine the wrapping fee based on the giftbox capacity
      if (giftboxCapacity <= capacities[0].capacityInUnits) {
        wrappingFee = capacities[0].wrappingCharge;
      } else if (giftboxCapacity <= capacities[1].capacityInUnits) {
        wrappingFee = capacities[1].wrappingCharge;
      } else if (giftboxCapacity <= capacities[2].capacityInUnits) {
        wrappingFee = capacities[2].wrappingCharge;
      } else {
        message =
          "Giftbox capacity exceeds the maximum capacity, please create a new giftbox!";
      }

      // Send the result back to the client
      if (wrappingFee !== null) {
        res.json({ wrappingFee });
      } else {
        res.status(400).json({ message });
      }
    });
  });
};

export const saveOrder = (req, res) => {
  const {
    giftboxId,
    quantity,
    price,
    orderDate,
    orderStatus,
    dueDate,
    customerId,
  } = req.body;
  const query =
    "INSERT INTO orders (giftboxId, quantity, price, orderDate, orderStatus, dueDate, customerId) VALUES (?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [giftboxId, quantity, price, orderDate, orderStatus, dueDate, customerId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};


export const placeOrder = (req, res) => {
  const {
    giftboxId,
    quantity,
    price,
    orderDate,
    orderStatus,
    dueDate,
    customerId,
    shippingAddress,
    deliveryDistrictId,
  } = req.body;

  const query =
    "INSERT INTO orders (giftboxId, quantity, price, orderDate, orderStatus, dueDate, customerId, shippingAddress, deliveryDistrictId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

  connection.query(
    query,
    [
      giftboxId,
      quantity,
      price,
      orderDate,
      orderStatus,
      dueDate,
      customerId,
      shippingAddress,
      deliveryDistrictId,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error placing order", error: err });
      } else {
        const orderId = result.insertId; // Retrieve the newly created order ID
        res.status(201).send({ message: "Order placed successfully", orderId });
      }
    }
  );
};

export const getOrdersByCustomerId = (req, res) => {
  const customerId = req.params.cid;
  const query = "SELECT * FROM orders WHERE customerId = ?";
  connection.query(query, [customerId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}



export default {
  getOrder,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
  addShippingAddress,
  getOrderDetails,
  getDeliveryFee,
  getWrappingFee,
  getDistricts,
  getDistrictById,
  placeOrder,
  getOrdersByCustomerId,
};