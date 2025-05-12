import express from 'express';
import { getDistricts, getDeliveryRate, updateDeliveryRate, getStockDetails, updateStockStatus, updateStockQuantity, getSizes, addSize } from '../controllers/AdminConfigs.js';

const router = express.Router();

router.get('/getDistricts', getDistricts);
router.get('/getDeliveryRate', getDeliveryRate);
router.post('/updateDeliveryRate/:rate', updateDeliveryRate);

router.get('/getStockDetails', getStockDetails);
router.put('/updateStockStatus/:stockId', updateStockStatus);
router.put('/updateStockQuantity/:stockId', updateStockQuantity);

router.get('/getSizes', getSizes);
router.post('/addSize', addSize);



export default router;
