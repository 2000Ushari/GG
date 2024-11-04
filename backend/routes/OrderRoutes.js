import express from "express"; 
import { getOrder, updateOrder, addShippingAddress, getDistricts, getDeliveryFee, getWrappingFee, placeOrder, getOrderById, getOrdersByCustomerId } from "../controllers/Order.js";

const router = express.Router();

router.get("/getOrder", getOrder);
router.get("/getOrderById/:oid", getOrderById);
router.get("/updateOrder", updateOrder);
router.post("/addShippingAddress", addShippingAddress);
router.get("/getDistricts", getDistricts);
router.get("/getDeliveryFee/:selectedDistrict", getDeliveryFee);
router.get("/getWrappingFee/:gid", getWrappingFee);
router.post("/placeOrder", placeOrder);
router.get("/getOrdersByCustomerId/:cid", getOrdersByCustomerId);

export default router;