import { ModelStatic } from "sequelize";

import { employeetypeI } from "../models/employee";

export const getEmployees = async ( employeeModel: ModelStatic<employeetypeI> ) =>
{
    return await employeeModel.findAll();
}

export const getEmployeeById  = async ( id:number , employeeModel:ModelStatic<employeetypeI> ) =>
{
    return await employeeModel.findByPk(id);
}

export const createEmployee  = async ( employeeModel:ModelStatic<employeetypeI> , body: any ) =>
{
    return employeeModel.build({ ...body }).save();
}

export const deleteEmployee  = async ( employee: any )=>
{
        return employee.destroy();
}

export const updateEmployee  = async ( employee: any ) =>
{
        return await employee.save();
}