import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import OrderRoutes from './routes/OrderRoutes.js';
import AccessoryRoutes from './routes/AccessoryRoutes.js';
import CategoryRoutes from './routes/CategoryRoutes.js';
import GiftboxRoutes from './routes/GiftboxRoutes.js';
import EmployeeRoutes from './routes/EmployeeRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
import AuthenticationRoutes from './routes/AuthenticationRoutes.js';
import CustomerRoutes from './routes/CustomerRoutes.js';
import DashboardRoutes from './routes/DashboardRoutes.js';
import PaymentRoutes from './routes/PaymentRoutes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: "secretcode",
    resave: false, // Set to false to avoid unnecessary session resaving
    saveUninitialized: false, // Set to false to avoid saving uninitialized sessions
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // Cookie expiry time
}));

app.use(
    cors({
        origin: "http://localhost:3000", // Frontend port
        credentials: true, // Allow credentials
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.get("/api/auth/authenticated", (req, res) => {
    if (req.session.user) {
        res.json({ authenticated: true, user: req.session.user });
    } else {
        res.json({ authenticated: false });
    }
});


app.use("/api/order", OrderRoutes);
app.use("/api/accessory", AccessoryRoutes);
app.use("/api/category", CategoryRoutes);
app.use("/api/giftbox", GiftboxRoutes);
app.use("/api/authentication", AuthenticationRoutes);
app.use("/api/employee", EmployeeRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/customer", CustomerRoutes);
app.use("/api/dashboard", DashboardRoutes);
app.use("/api/payment", PaymentRoutes);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});