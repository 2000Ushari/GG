import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InitialRegister from "./pages/InitialRegister";

import AdminHome from "./admin/AdminHome";
import AdminOrder from "./admin/AdminOrders";
import AdminAccessories from "./admin/AdminAccessories"; 
// import AddAccessory from "./admin/adminAccessory/AddAccessory";
import AdminCategories from "./admin/AdminCategories";
import AdminGiftboxes from "./admin/AdminGiftboxes.jsx";
// import ViewGiftbox from "./admin/adminGiftbox/ViewGiftbox.jsx";
import AdminEmployees from "./admin/AdminEmployees.jsx";
import AdminCustomers from "./admin/AdminCustomers.jsx";

import CustomerHome from "./customer/CustomerHome";
import AccessoryView from "./customer/customerAccessory/AccessoryView";
import GiftboxView from "./customer/customerGiftbox/GiftboxView.jsx";
import CustomGiftboxes from "./customer/customerGiftbox/CustomGiftboxesList.jsx";
import CustomerTabs from "./customer/CustomerTabs.jsx";
import Giftboxes from "./customer/customerGiftbox/MyGiftboxesList.jsx";
import Orders from "./customer/customerOrder/MyOrders.jsx";
import Cart from "./customer/customerOrder/MyCart.jsx";
import Favorites from "./customer/MyFavorites.jsx";
import Settings from "./customer/Settings.jsx";

import EditEmployee from "./admin/adminEmployee/EditEmployee.jsx";
import ViewEmployee from "./admin/adminEmployee/ViewEmployee.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        {/* <Route path="/" exact element={<CustomerHome />} /> */}
        <Route path="/about" exact element={<About />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/login" exact element={<Login />} /> 
        <Route path="/register" exact element={<Register />} />
        <Route path="/initialRegister" exact element={<InitialRegister />} />

        <Route path="/admin/home" exact element={<AdminHome />} />
        <Route path="/admin/order" exact element={<AdminOrder />} />
        
        <Route path="/admin/accessories" exact element={<AdminAccessories />} />
        {/* <Route path="/admin/accessories/addAccessory" exact element={<AddAccessory />} /> */}
        <Route path="/admin/categories" exact element={<AdminCategories />} />
        <Route path="/admin/giftboxes" exact element={<AdminGiftboxes />} /> 


        {/* Admin employee routes */}
        <Route path="/admin/employees" exact element={<AdminEmployees />} />
        {/* <Route path="/admin/employees/edit/:employeeId" element={<EditEmployee />} /> */}
        <Route path="/admin/employees/view/:employeeId" element={<ViewEmployee />} />


        <Route path="/admin/customers" element={<AdminCustomers />} />

        <Route path="/customer/home" exact element={<CustomerHome />} />
        {/* <Route path="/customer/accessoryView" exact element={<AccessoryView />} /> */}
        <Route path="/customer/accessoryView/:accessoryId" element={<AccessoryView />} />
        
        <Route path="/customer/customerTabs" element={<CustomerTabs />} />
        <Route path="/customer/ourProducts" element={<CustomGiftboxes />} />
        <Route path="/customer/giftboxes" element={<Giftboxes />} />
        <Route path="/customer/orders" element={<Orders />} />
        <Route path="/customer/cart" element={<Cart />} />
        <Route path="/customer/favorites" element={<Favorites />} />
        <Route path="/customer/settings" element={<Settings />} />

        <Route path="/giftboxView" element={<GiftboxView />} />

        
        

      </Routes>
    </BrowserRouter>
  )
}
