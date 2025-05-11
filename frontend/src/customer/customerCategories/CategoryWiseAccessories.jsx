//before customer logs in and selects a category, this page will show all the accessories in that category
import React from 'react';
import { Box, Grid } from '@mui/material';
import CustomerCarousal from '../components/CustomerCarousal';
import NavbarCustomerAfterSignedIn from '../customerComponent/NavbarCustomerAfterSignedIn';
import CustomerSidenav from '../customerComponent/CustomerSidenav';

const CustomCard = styled(Card)({
  position: 'relative',
  minWidth: 180,
  minHeight: 400,
  width: 250,
  height: 350,
  cursor: 'pointer',
  '&:hover .addButton': {
    display: 'block',
  },
});

function CategoryWiseAccessories() {
  const { category } = useParams(); // Get category from URL
  const [categoryId, setCategoryId] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/category/getCategoryByName/${category}`)
      .then((response) => {
        console.log('Category response:', response.data);
        if (response.data && response.data[0]) {
          setCategoryId(response.data[0].categoryId);
          console.log(response.data[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching categoryId:', error);
      });
  }, [category]);

  useEffect(() => {
    if (categoryId) {
      console.log('Sending request with categoryId:', categoryId);
      axios
        .get(`http://localhost:3001/api/accessory/getAccessoryByCategory/${categoryId}`)
        .then((response) => {
          setAccessories(response.data);
          console.log('Accessories response:', accessories);
        })
        .catch((error) => {
          console.error('Error fetching accessories:', error);
        });
    }
  }, [categoryId]);

  const handleCardClick = () => {
    navigate(`/customer/accessoryView/${accessories[0].accessoryId}`);
    window.location.reload(); // Reloads the page when accessory card is clicked
  };

  return (
    //     <>
    //       <div>CategoryWiseAccessories</div>
    //       <div className="bgcolor">
    //         {/* Pass the handleLogout function as a prop to Navbar */}
    //         <NavbarCustomerAfterSignedIn handleLogout={handleLogout} />
    //         <Box height={60} />
    //         <Box sx={{ display: "flex" }}>
    //           <CustomerSidenav />
    //       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    //         <Grid container spacing={1} sx={{ justifyContent: "center" }}>
    //           <Box sx={{ display: "flex" }}>
    //             <Grid item xs={12}>
    //               <Box sx={{ display: "flex", justifyContent: "center" }}>
    //                 <CustomerCarousal />
    //               </Box>
    //             </Grid>
    //           </Box>
    //         </Grid>
    //       </Box>
    //         </Box>
    //     </div>
    //     </>
    //   );
    // }
    <>
      <div className="bgcolor">
        <NavbarCustomer />
        <Box height={50} />
        <Box maxWidth={1200} mx="auto" mt={4}>
          <CategoryTiles />
          <Typography variant="h4" align="center" gutterBottom>
            {category}
          </Typography>
          {accessories.length === 0 && (
            <Typography variant="h6" align="center" gutterBottom>
              No accessories available in this category.
            </Typography>
          )}
          <Grid container spacing={3}>
            {accessories.map((accessory) => (
              <Grid item xs={12} sm={6} md={4} key={accessory.id}>
                <CustomCard key={accessories[0].accessoryId} onClick={handleCardClick}>
                  <CardMedia
                    component="img"
                    height="194"
                    image={accessories[0].image || Flowers}
                    alt={accessories[0].accessoryName}
                  />
                  {/* <AddButton className="addButton">Add to Giftbox</AddButton> */}
                  <CardContent>
                    <Typography variant="h6" color="black" gutterBottom>
                      {accessories[0].accessoryName}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Rs. {accessories[0].accessoryPrice}
                    </Typography>
                  </CardContent>
                  {/* <CardActions sx={{ justifyContent: 'space-between' }} disableSpacing>
                      <Rating value={accessoryDetails.averageRating || 0} readOnly />
                        <IconButton
                          aria-label="add to favorites"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddOrRemoveFromFavorites();
                          }}
                        >
                          <Checkbox
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite color="error" />}
                            checked={isFavorite} // Check state to show favorite or not
                          />
                        </IconButton>
                      </CardActions> */}
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </>
  );
}
export default CategoryWiseAccessories;
