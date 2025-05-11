import express from "express";
import { getAccessory, getAccessoryById, addAccessory, getSizeId, getSizes, addFavorites, addAccessoryToMyGiftbox, getSizeBySizeId, addToStock, checkIfFavorite, removeFromFavorites, getFavorites, getAccessoryByCategory } from "../controllers/Accessory.js";

const router = express.Router();

router.get("/getAccessory", getAccessory);
router.post("/addAccessory", addAccessory);
router.get("/getAccessoryById/:aid", getAccessoryById);
router.get("/getSizeId/:id", getSizeId);
router.get("/getSizes/all", getSizes);
router.post("/addAccessoryToMyGiftbox", addAccessoryToMyGiftbox);
router.get("/size/getSizeBySizeId/:id", getSizeBySizeId);
router.post("/addToStock", addToStock);
router.post("/addToFavorites", addFavorites); 
router.get('/checkIfFavorite/:customerId/:accessoryId', checkIfFavorite);
router.post('/removeFromFavorites', removeFromFavorites);
router.get("/getFavorites/:customerId", getFavorites);
router.get("/getAccessoryByCategory/:cid", getAccessoryByCategory);

// router.put("/:id", updateAccessory);
// router.delete("/:id", deleteAccessory);

export default router;