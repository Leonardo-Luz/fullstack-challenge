import { Request , Response, json } from "express"
import { employeeRequestBody } from "../types/employee";
import { employeeModel } from "../models/employee";

import db from "../config";

export const getEmployees = async ( req: Request, res: Response ): Promise<Response> =>
{
    try
    {
        const response = await employeeModel.findAll();
        

        return res.status(200).json(response);
    }
    catch (e)
    {
        console.log(e);

        return res.status(500).json('Server Error');
    }
}

export const getEmployeeById  = async ( req: Request, res: Response ): Promise<Response> =>
{
    
    try
    {
        const id = parseInt(req.params.id);

        const response = await employeeModel.findByPk(id);
        
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

export const createEmployee  = async ( req: Request<{}, any, employeeRequestBody> , res: Response ): Promise<Response> =>
{
    try
    {
        const { employeeid , name , cellnum , email , employeetypeid, situation } = req.body; 
    
        await employeeModel.create({
            employeeid: employeeid,
            name: name,
            cellnum: cellnum,
            email: email,
            employeetypeid: employeetypeid, 
            situation: situation,
        })
    
        return res.status(200).json({
            message: 'Employee successfully created', 
            body: { 
                employee: { 
                    employeeid,
                    name,
                    cellnum,
                    email,
                    employeetypeid,
                    situation
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

export const deleteEmployee  = async ( req: Request, res: Response ): Promise<Response> =>
{
    try
    {
        const id = parseInt(req.params.id);

        const response = await employeeModel.findByPk(id);
        
        if(response != null)
        {
            response.destroy();

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

export const updateEmployee  = async ( req: Request<{ id:string }, any, employeeRequestBody> , res: Response ): Promise<Response> =>
{
    try
    {
        const id = parseInt(req.params.id);

        const { name , cellnum , email , employeetypeid, situation } = req.body; 

        const response = await employeeModel.findByPk(id);
        
        if(response != null)
        {
            response.name = name;
            response.cellnum = cellnum;
            response.email = email;
            response.employeetypeid = employeetypeid;
            response.situation = situation;

            await response.save();

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