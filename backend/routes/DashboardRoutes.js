import express from "express";
import { getAccessoryData, getNumberOfCustomers, getNumberOfAccessories, getSales } from "../controllers/Dashboard.js";

const router = express.Router();

router.get("/getAccessoryData", getAccessoryData);
router.get("/getNumberOfCustomers", getNumberOfCustomers)
router.get("/getNumberOfAccessories", getNumberOfAccessories)
router.get("/getSales", getSales)

export default router;