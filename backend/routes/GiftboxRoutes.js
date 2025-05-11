import express from "express";
import { getGiftbox, addGiftbox, createMyGiftbox, getBoxColors, getCustomizedGiftbox, getGiftboxById, getMyGiftboxes, deleteGiftbox, updateGiftbox, getGiftboxAccessories, removeAccessoryFromGiftbox, getBoxColorByGiftboxId, getGiftboxColorById, updateGiftboxAccessories,putBoxcolorId } from "../controllers/Giftbox.js";

const router = express.Router();

router.get("/getGiftbox", getGiftbox);
router.post("/addGiftbox", addGiftbox);
router.post("/createMyGiftbox", createMyGiftbox);
router.get("/getBoxColors", getBoxColors);
router.get("/getGiftboxColorById/:bid", getGiftboxColorById);
router.get("/getBoxColorByGiftboxId/:gid", getBoxColorByGiftboxId);
router.get("/getCustomizedGiftbox", getCustomizedGiftbox);
router.get("/getMyGiftboxes/:id", getMyGiftboxes);//getting gift boxes created by the logged user
router.get("/getGiftboxById/:gid", getGiftboxById);//getting gift box details by giftbox id
router.delete("/deleteGiftbox/:id", deleteGiftbox);
router.put("/updateGiftbox/:gid", updateGiftbox);
router.get("/getGiftboxAccessories/:gid", getGiftboxAccessories);
router.post("/updateGiftboxAccessories", updateGiftboxAccessories);
router.delete("/removeAccessoryFromGiftbox/:gid/:aid", removeAccessoryFromGiftbox);
router.put("/putBoxcolorId/:gid", putBoxcolorId);

// router.get("/getGiftboxTotalValue/:gid", getGiftboxTotalValue);

//router.post("/createGiftbox", createGiftbox);
// router.put("/:id", updateCategory);
// router.delete("/:id", deleteCategory);

export default router