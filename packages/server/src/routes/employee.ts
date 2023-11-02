import { Router } from "express";
import { createEmployeeHandler, deleteEmployeeHandler, getEmployeeByIdHandler, getEmployeesHandler, updateEmployeeHandler } from "../controllers/employee.controler";

export const router = Router();

router.get('/', getEmployeesHandler );

router.get('/:id', getEmployeeByIdHandler );

router.post('/', createEmployeeHandler );

router.put('/:id', updateEmployeeHandler );

router.delete('/:id', deleteEmployeeHandler );

