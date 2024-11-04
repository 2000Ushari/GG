import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import axios from "axios";

import NecklaceImage from "../../images/accessories/earring2.jpg";

const ECategoryList = () => {
  const [categories, setCategories] = useState([]);
//   const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
//   const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/authenticated", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.authenticated && res.data.user.role === "employee") {
          // setUser(res.data.user); // Set user data if authenticated
          // customerId(res.data.user.id);
        } else {
          navigate("/login"); // Redirect to login if not authenticated
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);


  const fetchAccessories = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/category/getCategory"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch accessories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching accessories:", error);
    }
  };

  useEffect(() => {
    fetchAccessories();
  }, []);

//   const handleOpenAddCategoryModal = () => setOpenAddCategoryModal(true);
//   const handleCloseAddCategoryModal = () => setOpenAddCategoryModal(false);

//   const handleOpenEditCategoryModal = (category) => {
//     setSelectedCategory(category);
//     setOpenEditCategoryModal(true);
//   };

//   const handleCloseEditCategoryModal = () => {
//     setOpenEditCategoryModal(false);
//     setSelectedCategory(null); // Reset selected category
//   };

//   const deleteCategory = async (categoryID) => {
//     try {
//       const confirmed = await Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!",
//       });

//       if (confirmed.isConfirmed) {
//         const response = await fetch(
//           `http://localhost:3001/api/category/${categoryID}`,
//           {
//             method: "DELETE",
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to delete the category");
//         }

//         // const newRows = rows.filter((row) => row.id !== id);
//         // setRows(newRows);

//         Swal.fire("Deleted!", "Your file has been deleted.", "success");
//         window.location.reload();
//       }
//     } catch (error) {
//       console.error("Error deleting category:", error);
//       Swal.fire("Error!", "Failed to delete the category.", "error");
//     }
//   };

  return (
    <>
      <Card>
        <Box height={30} />
        <Grid item xs={12}>
          <Card sx={{ height: "flex", flexGrow: 1, paddingBottom: 3}}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                marginRight: "20px",
              }}
            >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                sx={{ width: 300, marginLeft: "20px" }}
                renderInput={(params) => (
                  <TextField {...params} label="Search by name" />
                )}
              />
              {/* <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleOpenAddCategoryModal}
                >
                  Add Category
                </Button>
                <AddCategory
                  open={openAddCategoryModal}
                  closeEvent={handleCloseAddCategoryModal}
                />
              </Stack> */}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "left",
                paddingLeft: "20px",
              }}
            >
              {categories.map((category) => (
                <Card
                  key={category.categoryID}
                  sx={{
                    minWidth: 280,
                    minHeight: 400,
                    width: 380,
                    height: 350,
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={category.categoryName}
                    height="200"
                    image={NecklaceImage}
                  />
                  <CardContent sx={{ textAlign: "left" }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {category.categoryName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary"  >
                      {category.categoryDescription}
                    </Typography>
                  </CardContent>
                  {/* <CardActions sx={{ justifyContent: "center" }}>
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => handleOpenEditCategoryModal(category)}
                      >
                        Edit
                      </Button>
                      {selectedCategory && (
                        <EditCategory
                          open={openEditCategoryModal}
                          closeEvent={handleCloseEditCategoryModal}
                          category={selectedCategory}
                          categoryID={selectedCategory.categoryId}
                        />
                      )}

                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => deleteCategory(category.categoryId)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </CardActions> */}
                </Card>
              ))}
            </div>
          </Card>
        </Grid>
      </Card>
    </>
  );
};

export default ECategoryList;