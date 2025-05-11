import express from 'express';
import { getEmployee, addEmployee, updateEmployee, getEmployeeById } from '../controllers/Employee.js';

const router = express.Router();

router.get('/getEmployee', getEmployee);
router.post('/addEmployee', addEmployee);
// router.get("/:id", getEmployeeById);
router.get('/getEmployeeById/:id', getEmployeeById);
// router.delete("/:id", deleteEmployee);

export default router;
