import express from "express";
import { getCategory, addCategory, updateCategory, deleteCategory } from "../controllers/Category.js";

const router = express.Router();

router.get("/getCategory", getCategory);
router.post("/addCategory", addCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router