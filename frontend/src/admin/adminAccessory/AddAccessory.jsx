// import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   Grid,
//   Typography,
//   Box,
//   TextField,
//   Autocomplete,
//   CircularProgress,
//   Button,
//   FormGroup,
//   Checkbox,
//   FormControlLabel,
//   Switch,
// } from '@mui/material';
// import { green } from '@mui/material/colors';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// import AdminNavbar from '../adminComponents/AdminNavbar';
// import AdminSidenav from '../adminComponents/AdminSidenav';

// export default function AddAccessory() {
//   const navigate = useNavigate();
//   const [accessoryName, setAccessoryName] = useState('');
//   const [accessoryPrice, setAccessoryPrice] = useState('');
//   const [accessoryDescription, setAccessoryDescription] = useState('');
//   const [accessoryColor, setAccessoryColor] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [error, setError] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [units, setUnits] = useState('');

//   const [sizesAvailable, setSizesAvailable] = useState(false);
//   const [sizes, setSizes] = useState([]);
//   const [selectedSizes, setSelectedSizes] = useState({});

//   useEffect(() => {
//     axios
//       .get('http://localhost:3001/api/auth/authenticated', {
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (!(res.data.authenticated && res.data.user.role === 'admin')) {
//           navigate('/login');
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         navigate('/login');
//       });

//     fetchCategories();
//     fetchSizes();
//   }, [navigate]);

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/api/category/getCategory');
//       if (!response.ok) {
//         throw new Error('Failed to fetch categories');
//       }
//       const data = await response.json();
//       setCategories(data);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const fetchSizes = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/api/accessory/getSizes/all');
//       if (!response.ok) {
//         throw new Error('Failed to fetch sizes');
//       }
//       const data = await response.json();
//       setSizes(data);
//     } catch (error) {
//       console.error('Error fetching sizes:', error);
//     }
//   };

//   const handleClick = async () => {
//     if (!loading) {
//       setSuccess(false);
//       setLoading(true);
//       try {
//         const accessoryData = {
//           accessoryName,
//           accessoryDescription,
//           accessoryColor,
//           accessoryPrice,
//           units,
//           categoryId: selectedCategory?.categoryId,
//         };

//         // Handle stock data based on size selection
//         const stockData = sizesAvailable
//           ? Object.entries(selectedSizes).map(([sizeId, quantity]) => ({
//               sizeId: parseInt(sizeId, 10),
//               quantity: parseInt(quantity, 10),
//             }))
//           : [{ sizeId: 1, quantity: parseInt(quantity, 10) }];

//         const response = await axios.post('http://localhost:3001/api/accessory/addAccessory', {
//           ...accessoryData,
//           sizes: stockData,
//         });

//         if (response.status === 201) {
//           Swal.fire('Success!', 'Accessory added successfully.', 'success');
//           setSuccess(true);
//           navigate('/admin/accessories');
//         } else {
//           throw new Error('Failed to add accessory');
//         }
//       } catch (error) {
//         console.error('Error adding accessory:', error);
//         Swal.fire('Error!', 'Failed to add the accessory.', 'error');
//         setError(error.message);
//       } finally {
//         setTimeout(() => {
//           setLoading(false);
//         }, 1000);
//       }
//     }
//   };

//   const handleSizeQuantityChange = (sizeId) => (event) => {
//     setSelectedSizes((prevSizes) => ({
//       ...prevSizes,
//       [sizeId]: event.target.value,
//     }));
//   };

//   const buttonSx = {
//     ...(success && {
//       bgcolor: green[500],
//       '&:hover': {
//         bgcolor: green[700],
//       },
//     }),
//   };

//   return (
//     <div className="bgcolor">
//       <AdminNavbar />
//       <Box height={60} />
//       <Box sx={{ display: 'flex' }}>
//         <AdminSidenav />
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <Typography gutterBottom variant="h5" component="div" sx={{ marginLeft: '10px', fontWeight: 'bold' }}>
//             Accessories
//           </Typography>
//           <Card sx={{ padding: 2 }}>
//             <Typography variant="h6" align="left" marginLeft={2} color="grey">
//               Add Accessory
//             </Typography>
//             <Box height={20} />
//             <Grid container spacing={2} padding={2}>
//               {/* Basic Accessory Details */}
//               <Grid item xs={6}>
//                 <TextField
//                   label="Accessory Name"
//                   variant="outlined"
//                   size="small"
//                   value={accessoryName}
//                   onChange={(e) => setAccessoryName(e.target.value)}
//                   fullWidth
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   label="Accessory Price"
//                   variant="outlined"
//                   size="small"
//                   type="number"
//                   value={accessoryPrice}
//                   onChange={(e) => setAccessoryPrice(e.target.value)}
//                   fullWidth
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   label="Description"
//                   variant="outlined"
//                   size="small"
//                   value={accessoryDescription}
//                   onChange={(e) => setAccessoryDescription(e.target.value)}
//                   fullWidth
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   label="Accessory Color"
//                   variant="outlined"
//                   size="small"
//                   type="text"
//                   value={accessoryColor}
//                   onChange={(e) => setAccessoryColor(e.target.value)}
//                   fullWidth
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <Autocomplete
//                   options={categories}
//                   getOptionLabel={(option) => option.categoryName || ''}
//                   value={selectedCategory}
//                   onChange={(event, newValue) => setSelectedCategory(newValue)}
//                   renderInput={(params) => <TextField {...params} label="Category" variant="outlined" size="small" />}
//                   fullWidth
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   label="Units"
//                   variant="outlined"
//                   size="small"
//                   type="number"
//                   value={units}
//                   onChange={(e) => setUnits(e.target.value)}
//                   fullWidth
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   label="Quantity"
//                   variant="outlined"
//                   size="small"
//                   type="number"
//                   value={quantity}
//                   onChange={(e) => setQuantity(e.target.value)}
//                   fullWidth
//                   disabled={sizesAvailable}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <FormGroup>
//                   <FormControlLabel
//                     control={<Switch checked={sizesAvailable} onChange={(e) => setSizesAvailable(e.target.checked)} />}
//                     label="Sizes available"
//                   />
//                 </FormGroup>
//               </Grid>

//               {/* Dynamic Size Quantity Input */}
//               <Grid item xs={12}>
//                 <FormGroup>
//                   {sizesAvailable &&
//                     sizes.map(({ sizeId, size }) => (
//                       <Grid item xs={12} key={sizeId} sx={{ marginBottom: 2 }}>
//                         <FormControlLabel
//                           control={
//                             <Checkbox
//                               checked={Boolean(selectedSizes[sizeId])}
//                               onChange={handleSizeQuantityChange(sizeId)}
//                             />
//                           }
//                           label={size}
//                         />
//                         <TextField
//                           label="Quantity"
//                           variant="outlined"
//                           size="small"
//                           type="number"
//                           value={selectedSizes[sizeId] || ''}
//                           onChange={handleSizeQuantityChange(sizeId)}
//                           fullWidth
//                           disabled={!Boolean(selectedSizes[sizeId])}
//                         />
//                       </Grid>
//                     ))}
//                 </FormGroup>
//               </Grid>

//               <Grid item xs={12}>
//                 <Box sx={{ position: 'relative' }}>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     sx={buttonSx}
//                     disabled={loading}
//                     onClick={handleClick}
//                     fullWidth
//                   >
//                     Proceed
//                   </Button>
//                   {loading && (
//                     <CircularProgress
//                       size={24}
//                       sx={{
//                         color: green[500],
//                         position: 'absolute',
//                         top: '50%',
//                         left: '50%',
//                         marginTop: '-12px',
//                         marginLeft: '-12px',
//                       }}
//                     />
//                   )}
//                 </Box>
//               </Grid>
//             </Grid>
//           </Card>
//         </Box>
//       </Box>
//     </div>
//   );
// }

// This is a revised version of your AddAccessory component based on the requirements.
// Main changes:
// 1. Removed the inline quantity field.
// 2. Replaced the toggle switch with radio buttons.
// 3. Showed a modal when "Has Sizes?" is answered.

import React, { useState, useEffect } from 'react';
import {
  Card,
  Grid,
  Typography,
  Box,
  TextField,
  Autocomplete,
  CircularProgress,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Modal,
} from '@mui/material';
import { green } from '@mui/material/colors';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import AdminNavbar from '../adminComponents/AdminNavbar';
import AdminSidenav from '../adminComponents/AdminSidenav';

export default function AddAccessory() {
  const navigate = useNavigate();
  const [accessoryName, setAccessoryName] = useState('');
  const [accessoryPrice, setAccessoryPrice] = useState('');
  const [accessoryDescription, setAccessoryDescription] = useState('');
  const [accessoryColor, setAccessoryColor] = useState('');
  const [units, setUnits] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [hasSizes, setHasSizes] = useState(null); // 'yes' or 'no'
  const [sizes, setSizes] = useState([]);
  const [sizeQuantities, setSizeQuantities] = useState({});
  const [naQuantity, setNaQuantity] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/auth/authenticated', { withCredentials: true })
      .then((res) => {
        if (!(res.data.authenticated && res.data.user.role === 'admin')) {
          navigate('/login');
        }
      })
      .catch(() => navigate('/login'));

    fetchCategories();
    fetchSizes();
  }, [navigate]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/category/getCategory');
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchSizes = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/accessory/getSizes/all');
      const data = await response.json();
      setSizes(data);
    } catch (err) {
      console.error('Error fetching sizes:', err);
    }
  };

  const handleClick = async () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      try {
        const accessoryData = {
          accessoryName,
          accessoryDescription,
          accessoryColor,
          accessoryPrice,
          units,
          categoryId: selectedCategory?.categoryId,
        };

        let stockData = [];
        if (hasSizes === 'yes') {
          stockData = Object.entries(sizeQuantities).map(([sizeId, qty]) => ({
            sizeId: parseInt(sizeId, 10),
            quantity: parseInt(qty, 10),
          }));
        } else if (hasSizes === 'no') {
          stockData = [{ sizeId: 1, quantity: parseInt(naQuantity, 10) }];
        }

        const response = await axios.post('http://localhost:3001/api/accessory/addAccessory', {
          ...accessoryData,
          sizes: stockData,
        });

        if (response.status === 201) {
          Swal.fire('Success!', 'Accessory added successfully.', 'success');
          setSuccess(true);
          navigate('/admin/accessories');
        } else {
          throw new Error('Failed to add accessory');
        }
      } catch (error) {
        console.error('Error adding accessory:', error);
        Swal.fire('Error!', 'Failed to add the accessory.', 'error');
        setError(error.message);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    }
  };

  const handleModalSubmit = () => {
    setModalOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="bgcolor">
      <AdminNavbar />
      <Box height={60} />
      <Box sx={{ display: 'flex' }}>
        <AdminSidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Accessories
          </Typography>
          <Card sx={{ padding: 2 }}>
            <Typography variant="h6" color="grey" mb={2}>
              Add Accessory
            </Typography>
            <Grid container spacing={2}>
              {/* Fields */}
              <Grid item xs={6}>
                <TextField
                  label="Accessory Name"
                  size="small"
                  value={accessoryName}
                  onChange={(e) => setAccessoryName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Accessory Price"
                  size="small"
                  type="number"
                  value={accessoryPrice}
                  onChange={(e) => setAccessoryPrice(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Description"
                  size="small"
                  value={accessoryDescription}
                  onChange={(e) => setAccessoryDescription(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Accessory Color"
                  size="small"
                  value={accessoryColor}
                  onChange={(e) => setAccessoryColor(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  options={categories}
                  getOptionLabel={(option) => option.categoryName || ''}
                  value={selectedCategory}
                  onChange={(event, newValue) => setSelectedCategory(newValue)}
                  renderInput={(params) => <TextField {...params} label="Category" size="small" />}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Units"
                  size="small"
                  type="number"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  fullWidth
                />
              </Grid>

              {/* Radio Buttons */}
              <Grid item xs={12}>
                <Typography variant="subtitle1">Has Sizes?</Typography>
                <RadioGroup
                  row
                  value={hasSizes}
                  onChange={(e) => {
                    setHasSizes(e.target.value);
                    setModalOpen(true);
                  }}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ position: 'relative' }}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ ...(success && { bgcolor: green[500], '&:hover': { bgcolor: green[700] } }) }}
                    onClick={handleClick}
                    disabled={loading}
                  >
                    Proceed
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: green[500],
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        mt: '-12px',
                        ml: '-12px',
                      }}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Card>

          {/* Modal */}
          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <Box sx={style}>
              {hasSizes === 'yes' ? (
                <>
                  <Typography variant="h6" mb={2}>
                    Enter Quantity for Each Size
                  </Typography>
                  {sizes.map(({ sizeId, size }) => (
                    <TextField
                      key={sizeId}
                      label={size}
                      type="number"
                      size="small"
                      value={sizeQuantities[sizeId] || ''}
                      onChange={(e) => setSizeQuantities({ ...sizeQuantities, [sizeId]: e.target.value })}
                      fullWidth
                      sx={{ mb: 2 }}
                    />
                  ))}
                </>
              ) : (
                <>
                  <Typography variant="h6" mb={2}>
                    Enter Quantity for N/A Size
                  </Typography>
                  <TextField
                    label="Quantity"
                    type="number"
                    size="small"
                    value={naQuantity}
                    onChange={(e) => setNaQuantity(e.target.value)}
                    fullWidth
                  />
                </>
              )}
              <Button variant="contained" onClick={handleModalSubmit} sx={{ mt: 2 }}>
                Save
              </Button>
            </Box>
          </Modal>
        </Box>
      </Box>
    </div>
  );
}
