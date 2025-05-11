import express from 'express';
import { getDistricts, getDeliveryRate, updateDeliveryRate } from '../controllers/AdminConfigs.js';

const router = express.Router();

router.get('/getDistricts', getDistricts);
router.get('/getDeliveryRate', getDeliveryRate);
router.post('/updateDeliveryRate/:rate', updateDeliveryRate);

export default router;
