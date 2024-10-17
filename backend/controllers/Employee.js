import connection from "../dbConnection.js";

const getEmployee = (req, res) => {
    const query = "SELECT * FROM employee";
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
};

const getEmployeeById = (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM employee WHERE employeeId = ?";
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result[0]);
        }
    });
};


const addEmployee = (req, res) => {
    const { employeeFirstName, employeeLastName, employeeContact, employeeGender, employeeNIC, employeeAddress, workingStatus } = req.body;
  
    // Validation
    if (!employeeFirstName || !employeeLastName || !employeeContact || !employeeGender || !employeeNIC || !employeeAddress || !workingStatus) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
    }
  
    // Insert the new employee into the database
    const query = `
      INSERT INTO employee (employeeFirstName, employeeLastName, employeeContact, employeeGender, employeeNIC, employeeAddress, workingStatus)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    connection.query(query, [employeeFirstName, employeeLastName, employeeContact, employeeGender, employeeNIC, employeeAddress, workingStatus], (err, result) => {
        if (err) {
            console.error('Error adding employee:', err);
            return res.status(500).json({ error: 'Error adding employee.' });
        }
  
        // Return the newly created employee ID
        const employeeId = result.insertId;
  
        res.status(201).json({ id: employeeId, employeeFirstName, employeeLastName, employeeContact, employeeGender, employeeNIC, employeeAddress, workingStatus });
    });
};

const updateEmployee = (req, res) => {
    const employeeId = req.params.id;
    const { employeeFirstName, employeeLastName, employeeContact, employeeGender, employeeNIC, employeeAddress, workingStatus } = req.body;
    const query = `
      UPDATE employee
      SET
        employeeFirstName = ?,
        employeeLastName = ?,
        employeeContact = ?,
        employeeGender = ?,
        employeeNIC = ?,
        employeeAddress = ?,
        workingStatus = ?
      WHERE employeeId = ?
    `;
    connection.query(query, [employeeFirstName, employeeLastName, employeeContact, employeeGender, employeeNIC, employeeAddress, workingStatus, employeeId], (err, result) => {
        if (err) {
            console.error('Error updating employee:', err);
            res.status(500).json({ error: 'Error updating employee' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Employee not found' });
            return;
        }
        res.status(200).json({ message: 'Employee updated successfully' });
    });
};

// const deleteEmployee = (req, res) => {
//     try {
//         const employeeId = req.params.id;
  
//         if (!employeeId) {
//             return res.status(400).json({ error: "Employee ID is required." });
//         }
  
//         const query = "DELETE FROM employee WHERE employeeId = ?";
//         connection.query(query, [employeeId], (err, result) => {
//             if (err) {
//                 console.error("Error deleting employee:", err);
//                 return res.status(500).json({ error: "Failed to delete employee." });
//             }
  
//             if (result.affectedRows === 0) {
//                 return res.status(404).json({ error: "Employee not found." });
//             }
  
//             res.json({ message: "Employee deleted successfully." });
//         });
//     } catch (error) {
//         console.error("Error in deleteEmployee function:", error);
//         res.status(500).json({ error: "Internal server error." });
//     }
// };

export { getEmployee, getEmployeeById, addEmployee, updateEmployee };
