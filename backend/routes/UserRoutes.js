import express from 'express';
import { getCustomerIdByUserId, getCustomerEmail } from '../controllers/User.js';

const router = express.Router();

router.get('/getCustomerIdByUserId/:id', getCustomerIdByUserId);
router.get('/getCustomerEmail/:id', getCustomerEmail);

export default router;
