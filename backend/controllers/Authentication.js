import connection from "../dbConnection.js";
import bcrypt from "bcrypt";

export const initialRegister = (req, res) => {
    const q = "SELECT * FROM users WHERE userEmail = ?";
  
    connection.query(q, [req.body.email], (err, data) => {
      if (err) return res.json(err);
      if (data.length) return res.status(409).json("User already exists!");
  
      const salt = bcrypt.genSaltSync(10);//salting the password
      const hash = bcrypt.hashSync(req.body.password, salt);
  
      const insertUserQuery =
        "INSERT INTO users (userEmail,userPassword, userRole) VALUES (?, ?, ?)";
      const userValues = [req.body.email, hash, req.body.role];
  
      connection.query(insertUserQuery, userValues, (err, userResult) => {
        if (err) return res.json(err);
        const userid = userResult.insertId;
  
        let insertRoleSpecificQuery;
        let roleSpecificValues;
  
        switch (req.body.role) {
          case "admin":
            insertRoleSpecificQuery = `INSERT INTO admin (userId, adminFirstName, adminLastName) VALUES (?, ?, ?)`;
            roleSpecificValues = [userid, req.body.firstname, req.body.lastname];
            break;
          case "customer":
            insertRoleSpecificQuery = `INSERT INTO customer (userId, customerFirstName, customerLastName) VALUES (?, ?, ?)`;
            roleSpecificValues = [userid, req.body.firstname, req.body.lastname];
            break;
          case "employee":
            insertRoleSpecificQuery = `INSERT INTO employee (userId, employeeFirstName, employeeLastName) VALUES (?, ?, ?)`;
            roleSpecificValues = [userid, req.body.firstname, req.body.lastname];
            break;
          default:
            return res.status(400).json("Invalid role");
        }
  
        connection.query(insertRoleSpecificQuery, roleSpecificValues, (err) => {
          if (err) return res.json(err);
          return res.status(200).json("User registered successfully.");
        });
      });
    });
  };

  export const login = (req, res) => {
    const sql = "SELECT * FROM users WHERE userEmail = ?";
    connection.query(sql, [req.body.email], (err, data) => {
      if (err) {
        return res.json({ error: "Error fetching user data" });
      }
      if (data.length > 0) {
        bcrypt.compare(
          req.body.password.toString(),
          data[0].userPassword,
          (err, response) => {
            if (err) {
              return res.json({ error: "Password comparison error" });
            }
            if (response) {
              req.session.user = { //from the db
                id: data[0].userId,
                email: data[0].userEmail,
                role: data[0].userRole,
              };
              return res.json({ Login: true, user: req.session.user });
            }
            return res.json({ Login: false });
          }
        );
      } else {
        return res.json({ Login: false });
      }
    });
  };

  export const logout = (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        // If there's an error destroying the session
        return res.status(500).json({ error: "Failed to log out" });
      }
      // If the session was successfully destroyed
      return res.json({ logout: true });
    });
  };

  export const getUserDetails = (req, res) => {
    const id = req.params.id;
    const userQuery = "SELECT * FROM users WHERE userId = ?";
    connection.query(userQuery, [id], (err, userResult) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to fetch user details' });
      }
  
      if (userResult.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const user = userResult[0];
      const userRole = user.userRole;
  
      let roleQuery;
      switch (userRole) {
        case 'customer':
          roleQuery = "SELECT * FROM customer WHERE userId = ?";
          break;
        case 'employee':
          roleQuery = "SELECT * FROM employee WHERE userId = ?";
          break;
        case 'admin':
          roleQuery = "SELECT * FROM admin WHERE userId = ?";
          break;
        default:
          return res.status(400).json({ error: 'Invalid user role' });
      }
  
      connection.query(roleQuery, [id], (err, roleResult) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Failed to fetch role details' });
        }
  
        if (roleResult.length === 0) {
          return res.status(404).json({ error: `${userRole} details not found` });
        }
  
        const userDetails = {
          ...user,
          roleDetails: roleResult[0]
        };
  
        res.json(userDetails);
      });
    });
  };