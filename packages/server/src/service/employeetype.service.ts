import { ModelStatic } from "sequelize";

import { employeetypeI } from "../models/employeetype";

export const getEmployeeTypes = async ( employeeModel: ModelStatic<employeetypeI> ) =>
{
    return await employeeModel.findAll();
}

export const getEmployeeTypeById  = async ( id:number , employeeModel:ModelStatic<employeetypeI> ) =>
{
    return await employeeModel.findByPk(id);
}

export const createEmployeeType  = async ( employeeModel:ModelStatic<employeetypeI> , body: any ) =>
{
    return employeeModel.create({ ...body });
}

export const deleteEmployeeType  = async ( employee: any )=>
{
        return employee.destroy();
}

export const updateEmployeeType  = async ( employee: any ) =>
{
        return await employee.save();
}