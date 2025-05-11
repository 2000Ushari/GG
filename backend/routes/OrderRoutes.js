import express from 'express';
import {
  getOrder,
  updateOrder,
  addShippingAddress,
  getDistricts,
  getDeliveryFee,
  getWrappingFee,
  placeOrder,
  getOrderById,
  getOrdersByCustomerId,
  updateOrderStatusAfterPaid,
  updateOrderStatusWhenCancelled,
  getOrderHistoryByCustomerId,
  getCancelledOrdersByCustomerId,
} from '../controllers/Order.js';

const router = express.Router();

router.get('/getOrder', getOrder);
router.get('/getOrderById/:oid', getOrderById);
router.get('/updateOrder', updateOrder);
router.post('/addShippingAddress', addShippingAddress);
router.get('/getDistricts', getDistricts);
router.get('/getDeliveryFee/:selectedDistrict', getDeliveryFee);
router.get('/getWrappingFee/:gid', getWrappingFee);
router.post('/placeOrder', placeOrder);
router.get('/getOrdersByCustomerId/:cid', getOrdersByCustomerId);
router.put('/updateOrderStatusAfterPaid/:oid', updateOrderStatusAfterPaid);
router.put('/updateOrderStatusWhenCancelled/:oid', updateOrderStatusWhenCancelled);
router.get('/getOrderHistoryByCustomerId/:cid', getOrderHistoryByCustomerId);
router.get('/getCancelledOrdersByCustomerId/:cid', getCancelledOrdersByCustomerId);

export default router;
