import express from 'express';
import {
  getAccessoryData,
  getNumberOfCustomers,
  getNumberOfAccessories,
  getSales,
  getAccessoryVsStock,
  getOrderCountByStatus,
  getOrderCount,
} from '../controllers/Dashboard.js';

const router = express.Router();

router.get('/getAccessoryData', getAccessoryData);
router.get('/getNumberOfCustomers', getNumberOfCustomers);
router.get('/getNumberOfAccessories', getNumberOfAccessories);
router.get('/getSales', getSales);
router.get('/getOrderCount', getOrderCount);
router.get('/getAccessoryVsStock', getAccessoryVsStock);
router.get('/getOrderCountByStatus', getOrderCountByStatus);

export default router;
