import express from "express";
import { getHash } from "../controllers/Payment.js";

const router = express.Router();

router.post("/getHash", getHash);

export default router;