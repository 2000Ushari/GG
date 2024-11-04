import express from "express";
import { getCustomers, getCustomerDetails, getCustomerById } from "../controllers/Customer.js";

const router = express.Router();

router.get("/getCustomers", getCustomers);
router.get("/getCustomerDetails/:uid", getCustomerDetails);
router.get("/getCustomerById/:cid", getCustomerById);

export default router;