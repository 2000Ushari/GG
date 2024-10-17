// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import session from 'express-session';

// import OrderRoutes from './routes/OrderRoutes.js';
// import AccessoryRoutes from './routes/AccessoryRoutes.js';
// import CategoryRoutes from './routes/CategoryRoutes.js';
// import GiftboxRoutes from './routes/GiftboxRoutes.js';
// import EmployeeRoutes from './routes/EmployeeRoutes.js';
// import AuthenticationRoutes from './routes/AuthenticationRoutes.js';

// const app = express();

// app.use(express.json());
// app.use(cookieParser());

// app.use(session({
//     secret : "secretcode",
//     resave : true,
//     saveUninitialized : true,
//     cookie : {maxAge : 24 * 60 * 60 * 1000}//cookie expiry time
// }));

// app.use(
//     cors({
//       origin: "http://localhost:3000", //frontend port
//       credentials: true,
//       methods: ["GET", "POST", "PUT", "DELETE"],
//     })
//   );

// app.get("/api/auth/authenticated", (req, res) => {
//     if (req.session.user) {
//       res.json({ authenticated: true, user: req.session.user });
//     } else {
//       res.json({ authenticated: false });
//     }
//   });

// app.use("/api/order", OrderRoutes);
// app.use("/api/accessory", AccessoryRoutes);
// app.use("/api/category", CategoryRoutes);
// app.use("/api/giftbox", GiftboxRoutes);
// app.use("/api/authentication", AuthenticationRoutes);
// app.use("/api/employee", EmployeeRoutes);



// app.listen(3001, () => {
//     console.log('Server is running on port 3001');
// });

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import OrderRoutes from './routes/OrderRoutes.js';
import AccessoryRoutes from './routes/AccessoryRoutes.js';
import CategoryRoutes from './routes/CategoryRoutes.js';
import GiftboxRoutes from './routes/GiftboxRoutes.js';
import EmployeeRoutes from './routes/EmployeeRoutes.js';
import AuthenticationRoutes from './routes/AuthenticationRoutes.js';

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

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});