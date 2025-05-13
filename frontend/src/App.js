import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import OurStory from './pages/OurStory.jsx';
import ContactUs from './pages/ContactUs';
import TermsConditions from './pages/TermsConditions';
import HappyCustomer from './pages/HappyCustomer';
import Profile from './pages/Profile';

import Login from './pages/Login';
import Register from './pages/Register';
import InitialRegister from './pages/InitialRegister';

import AdminHome from './admin/AdminHome';
import AdminOrder from './admin/AdminOrders';
import AdminAccessories from './admin/AdminAccessories';
import AddAccessory from './admin/adminAccessory/AddAccessory';
import AdminCategories from './admin/AdminCategories';
import AdminGiftboxes from './admin/AdminGiftboxes.jsx';
// import ViewGiftbox from "./admin/adminGiftbox/ViewGiftbox.jsx";
import AdminEmployees from './admin/AdminEmployees.jsx';
import AdminCustomers from './admin/AdminCustomers.jsx';
import CustomerList from './admin/adminCustomer/CustomerList.jsx';
import Configurations from './admin/adminConfigurations/Configurations.jsx';
import EditStocks from './admin/adminConfigurations/EditStocks.jsx';

import CustomerHome from './customer/CustomerHome';
import AccessoryView from './customer/customerAccessory/AccessoryView';
import CustomGiftboxes from './customer/customerGiftbox/CustomGiftboxesList.jsx';
import CustomerTabs from './customer/customerOrder/CustomerTabs.jsx';
import Giftboxes from './customer/customerGiftbox/MyGiftboxesList.jsx';
import MyGiftbox from './customer/customerGiftbox/MyGiftbox.jsx';
import Orders from './customer/customerOrder/MyOrders.jsx';
import Cart from './customer/customerOrder/MyCart.jsx';
import Favorites from './customer/MyFavorites.jsx';
import Settings from './customer/Settings.jsx';
import BuyGiftbox from './customer/customerOrder/BuyGiftbox.jsx';
import OrderPayment from './customer/customerOrder/OrderPayment.jsx';
import CateWiseAccessoriesPage from './pages/CateWiseAccessoriesPage.jsx';

import EditEmployee from './admin/adminEmployee/EditEmployee.jsx';
import ViewEmployee from './admin/adminEmployee/ViewEmployee.jsx';
import ManageEmployees from './admin/adminEmployee/ManageEmployees.jsx';

import EmployeeHome from './employee/EmployeeHome.jsx';
import EmployeeOrders from './employee/EmployeeOrders.jsx';
import EmployeeCategories from './employee/EmployeeCategories.jsx';
import EmployeeGiftboxes from './employee/EmployeeGiftboxes.jsx';
import EmployeeAccessories from './employee/EmployeeAccessories.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        {/* <Route path="/" exact element={<CustomerHome />} /> */}
        <Route path="/our-story" exact element={<OurStory />} />
        <Route path="/contact-us" exact element={<ContactUs />} />
        <Route path="/terms-and-services" exact element={<TermsConditions />} />
        <Route path="/happy-customers" exact element={<HappyCustomer />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/initialRegister" exact element={<InitialRegister />} />

        <Route path="/admin/home" exact element={<AdminHome />} />
        <Route path="/admin/order" exact element={<AdminOrder />} />

        <Route path="/admin/accessories" exact element={<AdminAccessories />} />
        <Route path="/admin/accessory/add" exact element={<AddAccessory />} />
        <Route path="/admin/categories" exact element={<AdminCategories />} />
        <Route path="/admin/giftboxes" exact element={<AdminGiftboxes />} />
        <Route path="/admin/configurations" exact element={<Configurations />} />
        <Route path="/admin/configurations/editStocks" exact element={<EditStocks />} />

        {/* Admin employee routes */}
        <Route path="/admin/employees" exact element={<AdminEmployees />} />
        {/* <Route path="/admin/employees/edit/:employeeId" element={<EditEmployee />} /> */}
        <Route path="/admin/employees/view/:employeeId" element={<ViewEmployee />} />
        <Route path="/admin/manageEmployees" exact element={<ManageEmployees />} />

        <Route path="/admin/customers" element={<AdminCustomers />} />

        <Route path="/customer/home" exact element={<CustomerHome />} />
        {/* <Route path="/customer/accessoryView" exact element={<AccessoryView />} /> */}
        <Route path="/customer/accessoryView/:accessoryId" element={<AccessoryView />} />

        <Route path="/customer/customerTabs" element={<CustomerTabs />} />
        <Route path="/customer/ourProducts" element={<CustomGiftboxes />} />
        <Route path="/customer/giftboxes" element={<Giftboxes />} />
        <Route path="/customer/giftboxes/view/:giftboxId" element={<MyGiftbox />} />
        <Route path="/customer/orders" element={<Orders />} />
        <Route path="/customer/cart" element={<Cart />} />
        <Route path="/customer/favorites" element={<Favorites />} />
        <Route path="/customer/settings" element={<Settings />} />

        <Route path="/customer/cart/:giftboxId" element={<BuyGiftbox />} />
        <Route path="/customer/order/orderPayment/:orderId" element={<OrderPayment />} />

        <Route path="/admin/customerList" element={<CustomerList />} />

        {/* Employee */}
        <Route path="/employee/home" exact element={<EmployeeHome />} />
        <Route path="/employee/order" exact element={<EmployeeOrders />} />
        <Route path="/employee/categories" exact element={<EmployeeCategories />} />
        <Route path="/employee/giftboxes" exact element={<EmployeeGiftboxes />} />
        <Route path="/employee/accessories" exact element={<EmployeeAccessories />} />

        <Route path="/category/:category" element={<CateWiseAccessoriesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
