import express from 'express';
import { initialRegister, login, logout, getUserDetails } from '../controllers/Authentication.js';

const router = express.Router();

router.post('/initialRegister', initialRegister);
router.post('/login', login);
router.post('/logout', logout);
router.get('/getUserDetails/:id', getUserDetails);

export default router;
