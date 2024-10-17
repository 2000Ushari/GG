// import React, { useEffect, useState } from "react";
// import Stack from "@mui/material/Stack";
// import AddIcon from "@mui/icons-material/Add";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Card,
//   CardActions,
//   CardContent,
//   CardMedia,
//   Button,
//   Typography,
//   Box,
//   CardActionArea,
// } from "@mui/material";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Giftbox from "../../images/giftboxes/giftbox1.jpg";
// import Swal from "sweetalert2";

// import CreateMyGiftbox from "./CreateMyGiftbox";
// import NavbarCustomerAfterSignedIn from "../customerComponent/NavbarCustomerAfterSignedIn";
// import CustomerSidenav from "../customerComponent/CustomerSidenav";

// const MyGiftboxesList = () => {
//   const [customerId, setCustomerId] = useState(null);
//   const [giftboxes, setGiftboxes] = useState([]);
//   const [openCreateGBModal, setOpenCreateGBModal] = useState(false);

//   const handleOpenCreateGBModal = () => setOpenCreateGBModal(true);
//   const handleCloseCreateGBModal = () => setOpenCreateGBModal(false);
//   const [selectedGiftbox, setSelectedGiftbox] = useState(null);
//   const [openViewGiftboxModal, setOpenViewGiftboxModal] = useState(false);

//   const navigate = useNavigate();

//   const handleOpenViewGiftboxModal = (giftbox) => {
//     setSelectedGiftbox(giftbox);
//     setOpenViewGiftboxModal(true);
//   };

//   const handleCloseViewGiftboxModal = () => {
//     setOpenViewGiftboxModal(false);
//     setSelectedGiftbox(null); // Reset selected giftbox
//   };

//   // Authentication check
//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/auth/authenticated", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (res.data.authenticated && res.data.user.role === "customer") {
//           // setUser(res.data.user); // Set user data if authenticated
//           setCustomerId(res.data.user.id);
//         } else {
//           navigate("/login"); // Redirect to login if not authenticated
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [navigate]);

//   const fetchMyGiftboxes = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/api/giftbox/getMyGiftboxes/${customerId}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch gift boxes");
//       }
//       const data = await response.json();
//       setGiftboxes(data);
//     } catch (error) {
//       console.error("Error fetching gift boxes:", error);
//     }
//   };

//   useEffect(() => {
//     fetchMyGiftboxes();
//   }, []);

//   const deleteGiftbox = async (giftboxID) => {
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
//           `http://localhost:3001/api/giftbox/${giftboxID}`,
//           {
//             method: "DELETE",
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to delete the giftbox");
//         }

//         // const newRows = rows.filter((row) => row.id !== id);
//         // setRows(newRows);

//         Swal.fire("Deleted!", "Your file has been deleted.", "success");
//         window.location.reload();
//       }
//     } catch (error) {
//       console.error("Error deleting giftbox:", error);
//       Swal.fire("Error!", "Failed to delete the giftbox.", "error");
//     }
//   };

//   return (
//     <>
//       <NavbarCustomerAfterSignedIn />
//       <Box height={30} />
//       <Box sx={{ display: "flex" }}>
//         <CustomerSidenav />
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <h1>My Giftboxes</h1>
//           {/* <p>You don't have any giftboxes yet.Why not create one?</p> Show this if there are nothing in the giftbox parameter */}
//           <Stack direction="row" spacing={2} pr={1.5}>
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={handleOpenCreateGBModal}
//             >
//               Create New Giftbox
//             </Button>
//             <CreateMyGiftbox
//               open={openCreateGBModal}
//               closeEvent={handleCloseCreateGBModal}
//               //customer={currentCustomer}
//               //customerId={currentCustomer.customerId}
//             />
//           </Stack>
//           <div
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               gap: "20px",
//               justifyContent: "left",
//               paddingLeft: "20px",
//             }}
//           >
//             {giftboxes.map((giftbox) => (
//               <Card
//                 key={giftbox.giftboxID}
//                 sx={{
//                   minWidth: 180,
//                   minHeight: 345,
//                   width: 280,
//                   height: "flex", //changed from 345 to 'flex'
//                 }}
//               >
//                 <CardActionArea
//                   onClick={() => handleOpenViewGiftboxModal(giftbox)}
//                 >
//                   <CardMedia
//                     component="img"
//                     alt={giftbox.giftboxName}
//                     height="200"
//                     image={Giftbox}
//                   />
//                   <CardContent sx={{ textAlign: "left" }}>
//                     <Typography gutterBottom variant="h6" component="div">
//                       {giftbox.giftboxName}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Rs.{giftbox.giftboxPrice}
//                     </Typography>
//                   </CardContent>
//                   <CardActions sx={{ justifyContent: "center" }}>
//                     <Stack direction="row" spacing={1} justifyContent="center">
//                       <Button
//                         variant="contained"
//                         startIcon={<AddShoppingCartIcon />}
//                         color="secondary"
//                         // onClick={handleOpenAddToCartboxModal} navigates to add to cart
//                       >
//                         Add to Cart
//                       </Button>
//                       <Button
//                         variant="outlined"
//                         color="error"
//                         align="center"
//                         onClick={() => deleteGiftbox(giftbox.giftboxID)} // Use giftbox.giftboxID here
//                       >
//                         <DeleteIcon />
//                       </Button>
//                     </Stack>
//                   </CardActions>
//                 </CardActionArea>
//               </Card>
//             ))}
//             {/* Show some custom giftboxes and when it clicked show what accessories are inside of it */}
//           </div>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default MyGiftboxesList;

import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  CardActionArea,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import Giftbox from "../../images/giftboxes/giftbox1.jpg";
import Swal from "sweetalert2";

import CreateMyGiftbox from "./CreateMyGiftbox";
import NavbarCustomerAfterSignedIn from "../customerComponent/NavbarCustomerAfterSignedIn";
import CustomerSidenav from "../customerComponent/CustomerSidenav";

const MyGiftboxesList = () => {
  const [customerId, setCustomerId] = useState(null);
  const [giftboxes, setGiftboxes] = useState([]);
  const [openCreateGBModal, setOpenCreateGBModal] = useState(false);

  const handleOpenCreateGBModal = () => setOpenCreateGBModal(true);
  const handleCloseCreateGBModal = () => setOpenCreateGBModal(false);
  const [selectedGiftbox, setSelectedGiftbox] = useState(null);
  const [openViewGiftboxModal, setOpenViewGiftboxModal] = useState(false);

  const navigate = useNavigate();

  const handleOpenViewGiftboxModal = (giftbox) => {
    setSelectedGiftbox(giftbox);
    setOpenViewGiftboxModal(true);
  };

  const handleCloseViewGiftboxModal = () => {
    setOpenViewGiftboxModal(false);
    setSelectedGiftbox(null); // Reset selected giftbox
  };

  // Authentication check
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/authenticated", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.authenticated && res.data.user.role === "customer") {
          setCustomerId(res.data.user.id);
        } else {
          navigate("/login"); // Redirect to login if not authenticated
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  // Fetch giftboxes after customerId is set
  const fetchMyGiftboxes = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/giftbox/getMyGiftboxes/${customerId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch gift boxes");
      }
      const data = await response.json();
      setGiftboxes(data);
    } catch (error) {
      console.error("Error fetching gift boxes:", error);
    }
  };

  // Fetch giftboxes only after customerId is available
  useEffect(() => {
    if (customerId) {
      fetchMyGiftboxes();
    }
  }, [customerId]);

  const deleteGiftbox = async (giftboxID) => {
    try {
      const confirmed = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirmed.isConfirmed) {
        const response = await fetch(
          `http://localhost:3001/api/giftbox/${giftboxID}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete the giftbox");
        }

        // Update state to remove the deleted giftbox without refreshing the page
        setGiftboxes((prevGiftboxes) =>
          prevGiftboxes.filter((giftbox) => giftbox.giftboxID !== giftboxID)
        );

        Swal.fire("Deleted!", "Your giftbox has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting giftbox:", error);
      Swal.fire("Error!", "Failed to delete the giftbox.", "error");
    }
  };

  return (
    <>
      <NavbarCustomerAfterSignedIn />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <CustomerSidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>My Giftboxes</h1>
          <Stack direction="row" spacing={2} pr={1.5}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenCreateGBModal}
            >
              Create New Giftbox
            </Button>
            <CreateMyGiftbox
              open={openCreateGBModal}
              closeEvent={handleCloseCreateGBModal}
            />
          </Stack>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "left",
              paddingLeft: "20px",
            }}
          >
            {giftboxes.map((giftbox) => (
              <Card
                key={giftbox.giftboxID}
                sx={{
                  minWidth: 180,
                  minHeight: 345,
                  width: 280,
                  height: "flex",
                }}
              >
                <CardActionArea
                  onClick={() => handleOpenViewGiftboxModal(giftbox)}
                >
                  <CardMedia
                    component="img"
                    alt={giftbox.giftboxName}
                    height="200"
                    image={Giftbox}
                  />
                  <CardContent sx={{ textAlign: "left" }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {giftbox.giftboxName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Rs.{giftbox.giftboxPrice}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button
                        variant="contained"
                        startIcon={<AddShoppingCartIcon />}
                        color="secondary"
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        align="center"
                        onClick={() => deleteGiftbox(giftbox.giftboxID)}
                      >
                        <DeleteIcon />
                      </Button>
                    </Stack>
                  </CardActions>
                </CardActionArea>
              </Card>
            ))}
          </div>
        </Box>
      </Box>
    </>
  );
};

export default MyGiftboxesList;

