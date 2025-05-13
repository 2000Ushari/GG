import express from 'express';
import { initialRegister, login, logout, getUserDetails, registerEmployee } from '../controllers/Authentication.js';

const router = express.Router();

router.post('/initialRegister', initialRegister);
router.post('/login', login);
router.post('/logout', logout);
router.get('/getUserDetails/:id', getUserDetails);
router.post('/registerEmployee', registerEmployee);


export default router;
