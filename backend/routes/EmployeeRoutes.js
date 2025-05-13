import express from 'express';
import { getEmployees, addEmployee, updateEmployee, getEmployeeById } from '../controllers/Employee.js';

const router = express.Router();

router.get('/getEmployees', getEmployees);
router.post('/addEmployee', addEmployee);
// router.get("/:id", getEmployeeById);
router.get('/getEmployeeById/:id', getEmployeeById);
// router.delete("/:id", deleteEmployee);
router.put('/updateEmployee/:employeeId', updateEmployee);

export default router;
