import { Router } from "express";

import 
{ 
    createEmployeeTypeHandler, 
    deleteEmployeeTypeHandler, 
    getEmployeeTypeByIdHandler, 
    getEmployeeTypesHandler, 
    updateEmployeeTypeHandler 
} from "../controllers/employeetype.controler";

export const router = Router();

router.get('/', getEmployeeTypesHandler );

router.get('/:id', getEmployeeTypeByIdHandler );

router.post('/', createEmployeeTypeHandler );

router.put('/:id', updateEmployeeTypeHandler );

router.delete('/:id', deleteEmployeeTypeHandler );


