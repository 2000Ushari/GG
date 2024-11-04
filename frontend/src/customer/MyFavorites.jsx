// import React, { useEffect, useState } from "react";
// import Box from "@mui/material/Box";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// import NavbarCustomerAfterSignedIn from "./customerComponent/NavbarCustomerAfterSignedIn";
// import CustomerSidenav from "./customerComponent/CustomerSidenav";
// import FavoriteCard from "./FavoriteCard" // Assuming you have an AccessoryCard component to display the accessories

// function MyFavorites() {
//   const navigate = useNavigate();
//   const [customerId, setCustomerId] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [favorites, setFavorites] = useState([]); // State to store fetched favorite accessories

//   // Authentication check
//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/auth/authenticated", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (res.data.authenticated && res.data.user.role === "customer") {
//           setUserId(res.data.user.id); // Set user data if authenticated
//         } else {
//           navigate("/login"); // Redirect to login if not authenticated
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [navigate]);

//   // Fetch customerId after userId is set
//   useEffect(() => {
//     if (userId) {
//       getCustomerIdByUserId(userId);
//     }
//   }, [userId]);

//   // Fetch favorites after customerId is set
//   useEffect(() => {
//     if (customerId) {
//       getFavorites(customerId);
//       console.log("favorites:", favorites); // Add this to see if favorites are fetched correctly
//     }
//   }, [customerId]);

//   const getCustomerIdByUserId = async (userId) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/user/getCustomerIdByUserId/${userId}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch customer ID");
//       }
//       const data = await response.json();
//       setCustomerId(data.customerId); // Set customerId state correctly here
//     } catch (error) {
//       console.error("Error fetching customer ID:", error);
//     }
//   };

//   // Fetch favorites of the logged user
//   const getFavorites = async (customerId) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/accessory/getFavorites/${customerId}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch favorites");
//       }
//       const favoritesData = await response.json();
//       setFavorites(favoritesData); // Store fetched favorites in state
//     } catch (error) {
//       console.error("Error fetching favorites:", error);
//     }
//   };

//   useEffect(() => {
//     getFavorites();
//   }, []);

//   return (
//     <>
//       <NavbarCustomerAfterSignedIn />
//       <Box height={30} />
//       <Box sx={{ display: "flex" }}>
//         <CustomerSidenav />
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <h1>My Favorites</h1>
//           <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
//             {favorites.length > 0 ? (
//               favorites.map((favorite) => (
//                 <FavoriteCard key={favorite.accessoryId} accessoryDetails={favorite} customerId={customerId} />
//               ))
//             ) : (
//               <p>No favorites yet!</p>
//             )}
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// }

// export default MyFavorites;

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarCustomerAfterSignedIn from "./customerComponent/NavbarCustomerAfterSignedIn";
import CustomerSidenav from "./customerComponent/CustomerSidenav";
import FavoriteCard from "./FavoriteCard"; // Assuming you have an AccessoryCard component to display the accessories

function MyFavorites() {
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [favorites, setFavorites] = useState([]); // Store favorite accessories
  const [loading, setLoading] = useState(true); // Loading state

  // Authentication check
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/authenticated", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.authenticated && res.data.user.role === "customer") {
          setUserId(res.data.user.id); // Set user ID if authenticated
        } else {
          navigate("/login"); // Redirect to login if not authenticated
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  // Fetch customerId using userId
  useEffect(() => {
    if (userId) {
      getCustomerIdByUserId(userId);
    }
  }, [userId]);

  // Fetch customerId by userId
  const getCustomerIdByUserId = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/user/getCustomerIdByUserId/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch customer ID");
      }
      const data = await response.json();
      setCustomerId(data.customerId); // Set customerId state
    } catch (error) {
      console.error("Error fetching customer ID:", error);
    }
  };

  // Fetch favorites using customerId
  useEffect(() => {
    if (customerId) {
      fetchFavorites(customerId);
    }
  }, [customerId]);

  // Function to fetch the favorite accessories
  const fetchFavorites = async (customerId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/accessory/getFavorites/${customerId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch favorites");
      }
      const favoritesData = await response.json();
      setFavorites(favoritesData.favorites); // Set favorites
      console.log("#########Response", favoritesData.favorites);
      //console.log("#########Response",favoritesData.favorites[0]);
      setLoading(false); // Set loading to false
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarCustomerAfterSignedIn />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <CustomerSidenav />
        {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>My Favorites</h1>
          {favorites.map((favorite) => (
            <p>{favorite.accessoryId}</p>
          ))}
        </Box> */}

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>My Favorites</h1>
          {loading ? (
            <p>Loading favorites...</p>
          ) : (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {favorites.length > 0 ? (
                favorites.map((favorite) => (
                  <FavoriteCard
                    key={favorite.accessoryId}
                    accessoryId={favorite.accessoryId} // Send only the accessoryId to fetch details in FavoriteCard
                    customerId={customerId} // Pass customerId to FavoriteCard
                  />
                ))
              ) : (
                <p>No favorites yet!</p>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

export default MyFavorites;
