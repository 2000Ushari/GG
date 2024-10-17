import express from "express";
import { getOrder, updateOrder } from "../controllers/Order.js";

const router = express.Router();

router.get("/getOrder", getOrder);
router.get("/updateOrder", updateOrder);

export default router;