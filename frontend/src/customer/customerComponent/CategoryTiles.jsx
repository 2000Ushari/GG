// import React from "react";
// import Slider from "react-slick";
// import { Box, Typography } from "@mui/material";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import Bottles from "../images/categories/bottles.jpeg";
// import Hairbands from "../images/categories/hairBands.jpeg";
// import Stationeries from "../images/categories/stationeries.jpeg";
// import Bracelets from "../images/categories/bracelets.jpg";
// import Chocolates from "../images/categories/chocolates.jpg";
// import Dreamcatchers from "../images/categories/dreamcatchers.jpg";
// import Earrings from "../images/categories/earrings1.jpg";
// import Elasticbands from "../images/categories/elasticHairBands2.jpg";
// import Hairpins from "../images/categories/hairPins.jpg";
// import Keytags from "../images/categories/keytags.jpg";
// import Mugs from "../images/categories/mugs.jpg";
// import Necklaces from "../images/categories/necklaces2.jpg";
// import Rings from "../images/categories/rings.jpg";
// import Scrunchies from "../images/categories/scrunchies.jpg";
// import Flowers from "../images/categories/flowers.png";

// import { styled } from "@mui/material/styles";
// import ButtonBase from "@mui/material/ButtonBase";

// // const images = [
// //   { id: 1, url: Bottles, title: 'Bottles' },
// //   { id: 2, url: Hairbands, title: 'Hair-bands' },
// //   { id: 3, url: Stationeries, title: 'Stationeries' },
// //   // Add other images here...
// // ];

// const images = [
//   {
//     id: 1,
//     url: Bottles,
//     title: "Bottles",
//     width: "15%",
//   },
//   {
//     id: 2,
//     url: Necklaces,
//     title: "Necklaces",
//     width: "15%",
//   },
//   {
//     id: 3,
//     url: Earrings,
//     title: "Earrings",
//     width: "15%",
//   },
//   {
//     id: 4,
//     url: Hairbands,
//     title: "Hair-bands",
//     width: "15%",
//   },
//   {
//     id: 5,
//     url: Scrunchies,
//     title: "Scrunchies",
//     width: "15%",
//   },
//   {
//     id: 6,
//     url: Stationeries,
//     title: "Stationeries",
//     width: "15%",
//   },
//   {
//     id: 7,
//     url: Chocolates,
//     title: "Chocolates & Sweets",
//     width: "15%"
//   },
//   {
//     id: 8,
//     url: Dreamcatchers,
//     title: "Dream-catchers",
//     width: "15%"
//   },
//   {
//     id: 9,
//     url: Elasticbands,
//     title: "Elastic-hair-bands",
//     width: "15%",
//   },
//   {
//     id: 10,
//     url: Bracelets,
//     title: "Bracelets",
//     width: "15%",
//   },
//   {
//     id: 11,
//     url: Mugs,
//     title: "Mugs & Glasses",
//     width: "15%",
//   },
//   {
//     id: 12,
//     url: Keytags,
//     title: "Key-tags",
//     width: "15%"
//   },
//   {
//     id: 13,
//     url: Rings,
//     title: "Rings",
//     width: "15%",
//   },
//   {
//     id: 14,
//     url: Hairpins,
//     title: "Hair-pins",
//     width: "15%",
//   },
//   {
//     id: 15,
//     url: Flowers,
//     title: "Flowers",
//     width: "15%",
//   },
// ];

// const CustomerOrders = () => {
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     responsive: [
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 960,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//     ],
//   };

//   /////
//   const ImageButton = styled(ButtonBase)(({ theme }) => ({
//     position: "relative",
//     height: 200,
//     [theme.breakpoints.down("sm")]: {
//       width: "100% !important", // Overrides inline-style
//       height: 100,
//     },
//     "&:hover, &.Mui-focusVisible": {
//       zIndex: 1,
//       "& .MuiImageBackdrop-root": {
//         opacity: 0.15,
//       },
//       "& .MuiImageMarked-root": {
//         opacity: 0,
//       },
//       "& .MuiTypography-root": {
//         border: "4px solid currentColor",
//       },
//     },
//   }));

//   const ImageSrc = styled("span")({
//     position: "absolute",
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     backgroundSize: "cover",
//     backgroundPosition: "center 40%",
//     // margin: 10,
//   });

//   const Image = styled("span")(({ theme }) => ({
//     position: "absolute",
//     padding: "10px",
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: theme.palette.common.white,
//   }));

//   const ImageBackdrop = styled("span")(({ theme }) => ({
//     position: "absolute",
//     left: 10,
//     right: 10,
//     top: 10,
//     bottom: 10,
//     backgroundColor: theme.palette.common.black,
//     opacity: 0.4,
//     transition: theme.transitions.create("opacity"),
//   }));

//   const ImageMarked = styled("span")(({ theme }) => ({
//     height: 3,
//     width: 18,
//     backgroundColor: theme.palette.common.white,
//     position: "absolute",
//     bottom: -2,
//     left: "calc(50% - 9px)",
//     transition: theme.transitions.create("opacity"),
//   }));

//   ////

//   return (
//     <>
//       <Box maxWidth={1300} mx="auto">
//         <Typography variant="h4" align="center" gutterBottom>
//           Carousal
//         </Typography>
//         <Slider {...settings}>
//           {images.map((image) => (
//             <Box key={image.id}>
//               {/* <img
//                 src={image.url}
//                 alt={image.title}
//                 style={{ width: "100%", height: "auto" }}
//               /> */}
//               <ImageButton
//                 focusRipple
//                 key={image.title}
//                 style={{
//                   width: image.width,
//                 }}
//               >
//                 <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
//                 <ImageBackdrop className="MuiImageBackdrop-root" />
//                 <Image>
//                   <Typography
//                     component="span"
//                     variant="subtitle1"
//                     color="inherit"
//                     sx={{
//                       position: "relative",
//                       p: 4,
//                       pt: 2,
//                       pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
//                     }}
//                   >
//                     {image.title}
//                     <ImageMarked className="MuiImageMarked-root" />
//                   </Typography>
//                 </Image>
//               </ImageButton>
//               {/* <Typography variant="body2" align="center">
//                 {image.title}
//               </Typography> */}
//             </Box>
//           ))}
//         </Slider>
//       </Box>
//       <br />

//       {/* <Box
//         sx={{ display: "flex", flexWrap: "wrap", minWidth: 300, width: "100%" }}
//       >
//         {images.map((image) => (
//           <ImageButton
//             focusRipple
//             key={image.title}
//             style={{
//               width: image.width,
//             }}
//           >
//             <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
//             <ImageBackdrop className="MuiImageBackdrop-root" />
//             <Image>
//               <Typography
//                 component="span"
//                 variant="subtitle1"
//                 color="inherit"
//                 sx={{
//                   position: "relative",
//                   p: 4,
//                   pt: 2,
//                   pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
//                 }}
//               >
//                 {image.title}
//                 <ImageMarked className="MuiImageMarked-root" />
//               </Typography>
//             </Image>
//           </ImageButton>
//         ))}
//       </Box> */}
//     </>
//   );
// };

// export default CustomerOrders;

import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

import Bottles from '../../images/categories/bottles.jpeg';
import Hairbands from '../../images/categories/hairBands.jpeg';
import Stationeries from '../../images/categories/stationeries.jpeg';
import Bracelets from '../../images/categories/bracelets.jpg';
import Chocolates from '../../images/categories/chocolates.jpg';
import Dreamcatchers from '../../images/categories/dreamcatchers.jpg';
import Earrings from '../../images/categories/earrings1.jpg';
import Elasticbands from '../../images/categories/elasticHairBands2.jpg';
import Hairpins from '../../images/categories/hairPins.jpg';
import Keytags from '../../images/categories/keytags.jpg';
import Mugs from '../../images/categories/mugs.jpg';
import Necklaces from '../../images/categories/necklaces2.jpg';
import Rings from '../../images/categories/rings.jpg';
import Scrunchies from '../../images/categories/scrunchies.jpg';
import Flowers from '../../images/categories/flowers.png';

import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

const images = [
  { id: 1, url: Bottles, title: 'Bottles' },
  { id: 2, url: Necklaces, title: 'Necklaces' },
  { id: 3, url: Earrings, title: 'Earrings' },
  { id: 4, url: Hairbands, title: 'Hair-bands' },
  { id: 5, url: Scrunchies, title: 'Scrunchies' },
  { id: 6, url: Stationeries, title: 'Stationeries' },
  { id: 7, url: Chocolates, title: 'Chocolates & Sweets' },
  { id: 8, url: Dreamcatchers, title: 'Dream-catchers' },
  { id: 9, url: Elasticbands, title: 'Elastic-hair-bands' },
  { id: 10, url: Bracelets, title: 'Bracelets' },
  { id: 11, url: Mugs, title: 'Mugs & Glasses' },
  { id: 12, url: Keytags, title: 'Key-tags' },
  { id: 13, url: Rings, title: 'Rings' },
  { id: 14, url: Hairpins, title: 'Hair-pins' },
  { id: 15, url: Flowers, title: 'Flowers' },
];

const CategoryTiles = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryTitle) => {
    navigate(`/category/${categoryTitle}`); // Navigate with category title
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    width: '100%',
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
  }));

  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: 10,
  });

  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  }));

  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
    margin: 20,
  }));

  const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  }));

  return (
    <>
      <Box maxWidth={1200} mx="auto">
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          backgroundColor="lightgrey"
          padding="10px"
          borderRadius={2}
        >
          Categories
        </Typography>
        <Slider {...settings}>
          {images.map((image) => (
            <Box key={image.id} padding={1}>
              <ImageButton
                focusRipple
                key={image.title}
                onClick={() => handleCategoryClick(image.title)} // Handle click
              >
                <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      position: 'relative',
                      p: 2,
                      pt: 2,
                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                  >
                    {image.title}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>
              </ImageButton>
            </Box>
          ))}
        </Slider>
      </Box>
    </>
  );
};

export default CategoryTiles;
