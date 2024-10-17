// import React from 'react'

// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";

// function AccessorySizes(accessoryId) {


//   return (
    
//     <FormControl>
//     <FormLabel id="demo-row-radio-buttons-group-label">
//       Choose Size
//     </FormLabel>
//     <RadioGroup
//       row
//       aria-labelledby="demo-row-radio-buttons-group-label"
//       name="row-radio-buttons-group"
//     >
//       <FormControlLabel
//         value="XS"
//         control={<Radio />}
//         label="XS"
//       />
//       <FormControlLabel
//         value="S"
//         control={<Radio />}
//         label="S"
//       />
//       <FormControlLabel
//         value="M"
//         control={<Radio />}
//         label="M"
//       />
//       <FormControlLabel
//         value="L"
//         control={<Radio />}
//         label="L"
//       />
//       <FormControlLabel
//         value="XL"
//         control={<Radio />}
//         label="XL"
//       />
//       {/* <FormControlLabel value="disabled" disabled control={<Radio />}label="other"
// /> */}
//     </RadioGroup>
//   </FormControl>
//   )
// }

// export default AccessorySizes

// import React, { useState, useEffect } from 'react';
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";

// function AccessorySizes({ accessoryId }) { // Pass accessoryId as a prop
//   const [sizes, setSizes] = useState([]); // Store available sizes here
//   const [sizeIds, setSizeIds] = useState([]); // Store fetched sizeIds here
//   const [loading, setLoading] = useState(true); // Loading state to handle async operation
//   const [error, setError] = useState(null); // Error state in case fetching sizes fails

//   useEffect(() => {
//     // Fetch sizes from the API based on accessoryId
//     const fetchSizeIds = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/api/accessory/getSizeId/${accessoryId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch accessory sizes");
//         }
//         const data = await response.json();
//         setSizeIds(data); // Set the fetched sizes
//         setLoading(false); // Set loading to false after fetching
//       } catch (err) {
//         console.error(err);
//         setError(err.message); // Set error state in case of failure
//         setLoading(false);
//       }
//     };

//     fetchSizeIds();
//   }, [accessoryId]); // Refetch sizes whenever accessoryId changes

//   const fetchSizes = async () => {
//     try {
//      const response = await fetch("http://localhost:3001/api/accessory/sizes");
//      if (!response.ok) {
//       throw new Error("Failed to fetch categories");
//      }
//       const data = await response.json();
//      setSizes(data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//      }
//    };
 
//    useEffect(() => {
//      fetchSizes();
//    }, []);

//   // If data is still loading
//   if (loading) {
//     return <div>Loading sizes...</div>;
//   }

//   // If there's an error fetching data
//   if (error) {
//     return <div>Error loading sizes: {error}</div>;
//   }

//   // Render the size options based on the fetched sizes
//   return (
//     <FormControl>
//       <FormLabel id="size-radio-buttons-group-label">
//         Choose Size
//       </FormLabel>
//       <RadioGroup
//         row
//         aria-labelledby="size-radio-buttons-group-label"
//         name="size-radio-buttons-group"
//       >
//         {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
//           <FormControlLabel
//             key={size}
//             value={size}
//             control={<Radio />}
//             label={size}
//             disabled={!sizes.includes(size)} // Disable the size if it's not available
//           />
//         ))}
//       </RadioGroup>
//     </FormControl>
//   );
// }

// export default AccessorySizes;



// import React, { useState, useEffect } from 'react';
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";

// function AccessorySizes({ accessoryId }) { 
//   const [sizeIds, setSizeIds] = useState([]);  // To store sizeIds fetched from accessory
//   const [sizes, setSizes] = useState([]);      // To store size details fetched using sizeIds
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Step 1: Fetch the sizeIds for the selected accessory
//   useEffect(() => {
//     const fetchSizeIds = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/api/accessory/getSizeId/${accessoryId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch accessory sizes");
//         }
//         const data = await response.json();
//         setSizeIds(data);  // Store the sizeIds
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching size IDs:", err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchSizeIds();
//   }, [accessoryId]);  // Re-fetch size IDs whenever the accessoryId changes

//   // Step 2: Fetch the actual sizes from the Sizes table based on the sizeIds
//   useEffect(() => {
//     if (sizeIds.length === 0) return;

//     const fetchSizes = async () => {
//       try {
//         // Assuming your API can accept multiple sizeIds to fetch all sizes in one call
//         const response = await fetch(`http://localhost:3001/api/accessory/getSizes`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ sizeIds })  // Sending sizeIds to the backend to fetch all sizes
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch size details");
//         }

//         const data = await response.json();
//         setSizes(data);  // Store fetched size details
//       } catch (error) {
//         console.error("Error fetching sizes:", error);
//         setError(error.message);
//       }
//     };

//     fetchSizes();
//   }, [sizeIds]);  // Re-fetch sizes whenever sizeIds are updated

//   // Loading or Error state handling
//   if (loading) {
//     return <div>Loading sizes...</div>;
//   }

//   if (error) {
//     return <div>Error loading sizes: {error}</div>;
//   }

//   // Step 3: Render the available sizes as radio buttons, disabling unavailable sizes
//   return (
//     <FormControl>
//       <FormLabel id="size-radio-buttons-group-label">
//         Choose Size
//       </FormLabel>
//       <RadioGroup
//         row
//         aria-labelledby="size-radio-buttons-group-label"
//         name="size-radio-buttons-group"
//       >
//         {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
//           <FormControlLabel
//             key={size}
//             value={size}
//             control={<Radio />}
//             label={size}
//             disabled={!sizes.includes(size)}  // Disable the size if it's not available
//           />
//         ))}
//       </RadioGroup>
//     </FormControl>
//   );
// }

// export default AccessorySizes;

// import React, { useState, useEffect } from 'react';
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";

// function AccessorySizes({ accessoryId }) { 
//   const [sizeIds, setSizeIds] = useState([]);  // To store sizeIds fetched from accessory
//   const [sizes, setSizes] = useState([]);      // To store size details fetched using sizeIds
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // // Step 1: Fetch the sizeIds for the selected accessory
//   // useEffect(() => {
//   //   console.log("Accessory ID:", accessoryId);  // Log accessoryId to check its value

//   //   const fetchSizeIds = async () => {
//   //     try {
//   //       const response = await fetch(`http://localhost:3001/api/accessory/getSizeId/${accessoryId}`);
//   //       if (!response.ok) {
//   //         throw new Error("Failed to fetch accessory size IDs");
//   //       }
//   //       const data = await response.json();
//   //       setSizeIds(data);  // Store the sizeIds
//   //       setLoading(false);
//   //     } catch (err) {
//   //       console.error("Error fetching size IDs:", err);
//   //       setError(err.message);
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchSizeIds();
//   // }, [accessoryId]);  // Re-fetch size IDs whenever the accessoryId changes

//   useEffect(() => {
//     const fetchSizeIds = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/api/accessory/getSizeId/${accessoryId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch accessory size IDs");
//         }
//         const data = await response.json();
//         console.log("Fetched size IDs:", data);  // Check if the correct array is being fetched
//         setSizeIds(data);  // Store the sizeIds
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching size IDs:", err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };
  
//     fetchSizeIds();
//   }, [accessoryId]);
  

//   // Step 2: Fetch the actual sizes from the Sizes table based on the sizeIds
//   useEffect(() => {
//     if (sizeIds.length === 0) return;

//     const fetchSizes = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/api/accessory/getSizes`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ sizeIds })  // Sending sizeIds to the backend to fetch all sizes
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch size details");
//         }

//         const data = await response.json();
//         setSizes(data);  // Store fetched size details
//       } catch (error) {
//         console.error("Error fetching sizes:", error);
//         setError(error.message);
//       }
//     };

//     fetchSizes();
//   }, [sizeIds]);  // Re-fetch sizes whenever sizeIds are updated

//   // Loading or Error state handling
//   if (loading) {
//     return <div>Loading sizes...</div>;
//   }

//   if (error) {
//     return <div>Error loading sizes: {error}</div>;
//   }

//   // Step 3: Render the available sizes as radio buttons, disabling unavailable sizes
//   return (
//     <FormControl>
//       <FormLabel id="size-radio-buttons-group-label">
//         Choose Size
//       </FormLabel>
//       <RadioGroup
//         row
//         aria-labelledby="size-radio-buttons-group-label"
//         name="size-radio-buttons-group"
//       >
//         {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
//           <FormControlLabel
//             key={size}
//             value={size}
//             control={<Radio />}
//             label={size}
//             disabled={!sizes.map(s => s.size).includes(size)}  // Disable the size if it's not available
//           />
//         ))}
//       </RadioGroup>
//     </FormControl>
//   );
// }

// export default AccessorySizes;

// import React, { useState, useEffect } from 'react';
// import { RadioGroup, Radio, FormControl, FormControlLabel, FormLabel } from '@mui/material';

// function AccessorySizes({ accessoryId }) {
//   const [sizeIds, setSizeIds] = useState([]);  // To store sizeIds fetched from accessory
//   const [sizes, setSizes] = useState([]);      // To store size details fetched using sizeIds
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Step 1: Fetch the sizeIds for the selected accessory
//   useEffect(() => {
    
//     const fetchSizeIds = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/api/accessory/getSizeId/${accessoryId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch accessory size IDs");
//         }
//         const data = await response.json();
//         console.log("Fetched size IDs:", data);  // Check if the correct array is being fetched
//         setSizeIds(data);  // Store the sizeIds
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching size IDs:", err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchSizeIds();
//   }, [accessoryId]);

//   // Step 2: Fetch the actual sizes from the Sizes table based on the sizeIds
//   useEffect(() => {
//     if (sizeIds.length === 0) return;  // Avoid fetching if no sizeIds

//     const fetchSizes = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/api/accessory/getSizes/all`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch size details");
//         }

//         const allSizes = await response.json();
//         console.log("All sizes:", allSizes);  // Debug all sizes

//         // Filter the sizes to include only those with IDs in sizeIds
//         const availableSizes = allSizes.filter(size => sizeIds.includes(size.sizeId));
//         console.log("Filtered available sizes:", availableSizes);  // Debug filtered sizes

//         setSizes(availableSizes);  // Store the filtered sizes
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching sizes:", error);
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchSizes();
//   }, [sizeIds]);  // Re-fetch sizes whenever sizeIds are updated

//   // Loading or Error state handling
//   if (loading) {
//     return <div>Loading sizes...</div>;
//   }

//   if (error) {
//     return <div>Error loading sizes: {error}</div>;
//   }

//   // Step 3: Render the available sizes as radio buttons, only showing the sizes returned by the API
//   return (
//     <FormControl>
//       <FormLabel id="size-radio-buttons-group-label">
//         Choose Size
//       </FormLabel>
//       <RadioGroup
//         row
//         aria-labelledby="size-radio-buttons-group-label"
//         name="size-radio-buttons-group"
//       >
//         {sizes.map((size) => (
//           <FormControlLabel
//             key={size.sizeId}  // Ensure you have a unique key for each size
//             value={size.size}  // Use the actual size value from the API response
//             control={<Radio />}
//             label={size.size}  // Display the size (e.g., 'XS', 'S', 'M', etc.)
//           />
//         ))}
//       </RadioGroup>
//     </FormControl>
//   );
// }

// export default AccessorySizes;


import React, { useState, useEffect } from 'react';
import { RadioGroup, Radio, FormControl, FormControlLabel, FormLabel } from '@mui/material';

function AccessorySizes({ accessoryId, onAccessoryClick }) {  // Added onAccessoryClick for handling click event
  const [sizeIds, setSizeIds] = useState([]);  // To store sizeIds fetched from accessory
  const [sizes, setSizes] = useState([]);      // To store size details fetched using sizeIds
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Step 1: Fetch the sizeIds for the selected accessory
  useEffect(() => {
    const fetchSizeIds = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/accessory/getSizeId/${accessoryId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch accessory size IDs");
        }
        const data = await response.json();
        console.log("Fetched size IDs:", data);  // Check if the correct array is being fetched
        setSizeIds(data);  // Store the sizeIds
        setLoading(false);
      } catch (err) {
        console.error("Error fetching size IDs:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSizeIds();
  }, [accessoryId]);

  // Step 2: Fetch the actual sizes from the Sizes table based on the sizeIds
  useEffect(() => {
    if (sizeIds.length === 0) return;  // Avoid fetching if no sizeIds

    const fetchSizes = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/accessory/getSizes/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch size details");
        }

        const allSizes = await response.json();
        console.log("All sizes:", allSizes);  // Debug all sizes

        // Filter the sizes to include only those with IDs in sizeIds
        const availableSizes = allSizes.filter(size => sizeIds.includes(size.sizeId));
        console.log("Filtered available sizes:", availableSizes);  // Debug filtered sizes

        setSizes(availableSizes);  // Store the filtered sizes
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sizes:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSizes();
  }, [sizeIds]);  // Re-fetch sizes whenever sizeIds are updated

  // Loading or Error state handling
  if (loading) {
    return <div>Loading sizes...</div>;
  }

  if (error) {
    return <div>Error loading sizes: {error}</div>;
  }

  // Step 3: Handle No Sizes Available
  if (sizes.length === 0) {
    return(null);
  }

  // Step 4: Render the available sizes as radio buttons
  return (
    <FormControl>
      <FormLabel id="size-radio-buttons-group-label">
        Choose Size
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="size-radio-buttons-group-label"
        name="size-radio-buttons-group"
      >
        {sizes.map((size) => (
          <FormControlLabel
            key={size.sizeId}  // Ensure you have a unique key for each size
            value={size.size}  // Use the actual size value from the API response
            control={<Radio />}
            label={size.size}  // Display the size (e.g., 'XS', 'S', 'M', etc.)
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default AccessorySizes;
