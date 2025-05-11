import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from '@mui/icons-material/HomeOutlined';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasketOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import AccessoryIcon from '@mui/icons-material/CategoryOutlined';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import BadgeIcon from '@mui/icons-material/BadgeOutlined';
import CustomerIcon from '@mui/icons-material/FaceRetouchingNaturalOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccountsOutlined';
import { useNavigate } from "react-router-dom";
import { useAppStore } from '../../appStore';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));



const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function AdminSidenav() {
  const theme = useTheme();
  // const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const open = useAppStore((state) => state.dopen);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box height={30} />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/admin/home")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}  onClick={() => navigate("/admin/order")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <ShoppingBasketIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/admin/categories")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <GridViewIcon />
              </ListItemIcon>
              <ListItemText primary="Categories" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/admin/accessories")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AccessoryIcon />
              </ListItemIcon>
              <ListItemText primary="Accessories" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/admin/giftboxes")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <CardGiftcardIcon />
              </ListItemIcon>
              <ListItemText primary="Gift Boxes" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>


          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/admin/employees")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <BadgeIcon />
              </ListItemIcon>
              <ListItemText primary="Employees" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/admin/customers")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <CustomerIcon />
              </ListItemIcon>
              <ListItemText primary="Customers" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>


          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/admin/configurations")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          
        </List>
      </Drawer>
    </Box>
  );
}
