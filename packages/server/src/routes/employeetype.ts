import { Router } from "express";
import { createEmployeeType, deleteEmployeeType, getEmployeeTypeById, getEmployeeTypes, updateEmployeeType } from "../controllers/employeetype.controler";

export const router = Router();

router.get('/', getEmployeeTypes );

router.get('/:id', getEmployeeTypeById );

router.post('/', createEmployeeType );

router.put('/:id', updateEmployeeType );

router.delete('/:id', deleteEmployeeType );


