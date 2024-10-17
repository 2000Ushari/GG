import express from "express";
import { getAccessory, getAccessoryById, addAccessory, getSizeId, getSizes, addToFavorites, updateAccessory, deleteAccessory, addAccessoryToMyGiftbox, getSizeBySizeId } from "../controllers/Accessory.js";

const router = express.Router();

router.get("/getAccessory", getAccessory);
router.post("/addAccessory", addAccessory);
router.get("/:id", getAccessoryById);
router.get("/getSizeId/:id", getSizeId);
router.get("/getSizes/all", getSizes);
router.post("/addAccessoryToMyGiftbox", addAccessoryToMyGiftbox);
router.get("/size/getSizeBySizeId/:id", getSizeBySizeId);
// router.post("/addToFavorites/:aid/:cid", addToFavorites); 
// router.put("/:id", updateAccessory);
// router.delete("/:id", deleteAccessory);

export default router;