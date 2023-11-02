import { Request , Response } from "express"
import { employeeRequestBody } from "../types/employee";
import { employeeModel } from "../models/employee";
import { createEmployee, deleteEmployee, getEmployeeById, getEmployees, updateEmployee } from "../service/employee.service";

export const getEmployeesHandler = async ( req: Request, res: Response ): Promise<Response> =>
{
    try
    {
        const response = await getEmployees( employeeModel );
        

        return res.status(200).json(response);
    }
    catch (e)
    {
        console.log(e);

        return res.status(500).json('Server Error');
    }
}

export const getEmployeeByIdHandler  = async ( req: Request, res: Response ): Promise<Response> =>
{
    
    try
    {
        const id = parseInt(req.params.id);

        const response = await getEmployeeById(id , employeeModel);
        
        if(response != null)
            return res.status(200).json(response);
        else
            return res.status(404).json('Not found');
    }
    catch (e)
    {
        console.log(e);

        return res.status(500).json('Server Error'); 
    }
}

export const createEmployeeHandler  = async ( req: Request<{}, any, employeeRequestBody> , res: Response ): Promise<Response> =>
{
    try
    {
        const body = req.body; 

        await createEmployee( employeeModel ,
        {
            ...body
        })

        return res.status(200).json({
            message: 'Employee successfully created', 
            body: { 
                employee: { 
                    ...body,
                }
            }
        });
    } 
    catch (e)
    {
        console.log(e);

        return res.status(500).json('Server Error');
    }
}

export const deleteEmployeeHandler  = async ( req: Request, res: Response ): Promise<Response> =>
{
    try
    {
        const id = parseInt(req.params.id);

        const response = await getEmployeeById(id, employeeModel);
        
        if(response != null)
        {
            deleteEmployee(response);

            return res.status(200).json(`User ${id} successfully deleted`);
        }
        else
            return res.status(404).json('Not found');
    }
    catch (e)
    {
        console.log(e);

        return res.status(500).json('Server Error'); 
    }
}

export const updateEmployeeHandler  = async ( req: Request<{ id:string }, any, employeeRequestBody> , res: Response ): Promise<Response> =>
{
    try
    {
        const id = parseInt(req.params.id);

        const { name , cellnum , email , employeetypeid, situation } = req.body; 

        const employee = await getEmployeeById(id, employeeModel);

        
        if(employee != null)
        {
            employee.name = name;
            employee.cellnum = cellnum;
            employee.email = email;
            employee.employeetypeid = employeetypeid;
            employee.situation = situation;

            await updateEmployee(employee);

            return res.status(200).json(`Employee ${id} successfully updated`);
        }
        else
            return res.status(404).json('Not found');
    }
    catch (e)
    {
        console.log(e);

        return res.status(500).json('Server Error');
    }
}