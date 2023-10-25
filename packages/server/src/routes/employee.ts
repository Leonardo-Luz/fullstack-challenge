import { Router } from "express";
import { createEmployee, deleteEmployee, getEmployeeById, getEmployees, updateEmployee } from "../controllers/employee.controler";

export const router = Router();

router.get('/', getEmployees );

router.get('/:id', getEmployeeById );

router.post('/', createEmployee );

router.put('/:id', updateEmployee );

router.delete('/:id', deleteEmployee );

