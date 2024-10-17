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

export const getOrderById = (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM order_list WHERE id = ?";
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
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

export default { getOrder, getOrderById, addOrder, updateOrder, deleteOrder}