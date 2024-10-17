import express from "express";
import { getGiftbox, addGiftbox, createMyGiftbox, getBoxColors, getCustomizedGiftbox, getMyGiftboxes, deleteGiftbox } from "../controllers/Giftbox.js";

const router = express.Router();

router.get("/getGiftbox", getGiftbox);
router.post("/addGiftbox", addGiftbox);
router.post("/createMyGiftbox", createMyGiftbox);
router.get("/getBoxColors", getBoxColors);
router.get("/getCustomizedGiftbox", getCustomizedGiftbox);
router.get("/getMyGiftboxes/:id", getMyGiftboxes);
router.delete("/deleteGiftbox/:id", deleteGiftbox);

//router.post("/createGiftbox", createGiftbox);
// router.put("/:id", updateCategory);
// router.delete("/:id", deleteCategory);

export default router