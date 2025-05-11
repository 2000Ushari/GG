import connection from '../dbConnection.js';

export const getCategory = (req, res) => {
  const query = 'SELECT * FROM category';
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

export const addCategory = (req, res) => {
  const { categoryName, categoryDescription } = req.body;

  // Validation
  if (!categoryName || !categoryDescription) {
    return res.status(400).json({ error: 'Please provide the category name and description.' });
  }

  // Insert the new category into the database
  const query = `
      INSERT INTO category (categoryName, categoryDescription)
      VALUES (?, ?)
    `;
  connection.query(query, [categoryName, categoryDescription], (err, result) => {
    if (err) {
      console.error('Error adding category:', err);
      return res.status(500).json({ error: 'Error adding category.' });
    }

    // Return the newly created category ID
    const categoryId = result.insertId;

    res.status(201).json({ id: categoryId, categoryName, categoryDescription });
  });
};

export const deleteCategory = (req, res) => {
  //     const query = "DELETE FROM category WHERE id = ?";
  //     connection.query(query, [req.params.id], (err, result) => {
  //         if (err) {
  //             console.log(err);
  //         } else {
  //             res.send(result);
  //         }
  //     });
  // };

  // const deleteAccessory = (req, res) => {
  try {
    const categoryId = req.params.id;

    if (!categoryId) {
      return res.status(400).json({ error: 'Category ID is required.' });
    }

    const query = 'DELETE FROM category WHERE categoryId = ?';
    connection.query(query, [categoryId], (err, result) => {
      if (err) {
        console.error('Error deleting category:', err);
        return res.status(500).json({ error: 'Failed to delete category.' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Category not found.' });
      }

      res.json({ message: 'Category deleted successfully.' });
    });
  } catch (error) {
    console.error('Error in deleteCategory function:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const updateCategory = (req, res) => {
  //     const query = "UPDATE category SET ? WHERE id = ?";
  //     connection.query(query, [req.body, req.params.id], (err, result) => {
  //         if (err) {
  //             console.log(err);
  //         } else {
  //             res.send(result);
  //         }
  //     });
  // };

  // const updateAccessory = (req, res) => {
  const categoryId = req.params.id;
  const { categoryName, categoryDescription } = req.body;
  const query = `
      UPDATE category
      SET
        categoryName = ?,
        categoryDescription = ?
      WHERE categoryID = ?
    `;
  connection.query(query, [categoryName, categoryDescription, categoryId], (err, result) => {
    if (err) {
      console.error('Error updating category:', err);
      res.status(500).json({ error: 'Error updating category' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.status(200).json({ message: 'Category updated successfully' });
  });
};

export const getCategoryByName = (req, res) => {
  const category = req.params.categoryName;
  const query = 'SELECT * FROM category WHERE categoryName = ?';
  connection.query(query, [category], (err, result) => {
    if (err) {
      console.log('Working');
      console.log(category + ' not found');
    } else {
      res.send(result);
    }
  });
};

export default { getCategory, addCategory, updateCategory, deleteCategory, getCategoryByName };
