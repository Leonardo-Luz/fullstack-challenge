import { Request , Response } from "express"

import { employeetypeModel } from "../models/employeetype";

import { createEmployeeType, deleteEmployeeType, getEmployeeTypeById, getEmployeeTypes, updateEmployeeType } from "../service/employeetype.service";

import { employeeTypeRequestBody } from "../types/employeetype";

export const getEmployeeTypesHandler = async ( req: Request, res: Response ): Promise<Response> =>
{
    try
    {
        const response = await getEmployeeTypes(employeetypeModel);
        
        return res.status(200).json(response);
    }
    catch (e)
    {
        console.log(e);

        return res.status(500).json('Server Error');
    }
}

export const getEmployeeTypeByIdHandler  = async ( req: Request, res: Response ): Promise<Response> =>
{
    
    try
    {
        const id = parseInt(req.params.id);

        const response = await getEmployeeTypeById(id , employeetypeModel);
        
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

export const createEmployeeTypeHandler  = async ( req: Request<{}, any, employeeTypeRequestBody> , res: Response ): Promise<Response> =>
{
    try
    {    
        const { employeetypeid , description , situation } = req.body;

        const response = await getEmployeeTypeById(employeetypeid , employeetypeModel);

        if(response !== null)
            return res.status(409).json('Conflict');

        await createEmployeeType(employeetypeModel ,
        {
            employeetypeid,
            description,
            situation
        })

        return res.status(200).json({
            message: 'Employee Type successfully created',
            body: { 
                employeetype: { 
                    employeetypeid: employeetypeid,
                    description: description,
                    situation: situation
                }
            }
        })

    } 
    catch (e)
    {
        console.log(e);

        return res.status(500).json('Server Error');
    }
}

export const deleteEmployeeTypeHandler  = async ( req: Request, res: Response ): Promise<Response> =>
{
    
    try
    {
        const id = parseInt(req.params.id);

        const response = await getEmployeeTypeById(id , employeetypeModel);

        if(response != null)
        {
            deleteEmployeeType(response);
            
            return res.status(200).json(`User ${id} successfully deleted`);
        }

        return res.status(404).json('Not found');
    }
    catch (e)
    {
        console.log(e);

        return res.status(500).json('Server Error'); 
    }
}

export const updateEmployeeTypeHandler  = async ( req: Request<{ id:string }, any, employeeTypeRequestBody> , res: Response ): Promise<Response> =>
{
    try
    {
        const id = parseInt(req.params.id);

        const { description , situation } = req.body;

        const response = await getEmployeeTypeById(id, employeetypeModel);

        if(response != null)
        {
            response.description = description;
            response.situation = situation;

            await updateEmployeeType(response);
            
            return res.status(200).json(`Employee Type ${id} successfully updated`);
        }

        return res.status(404).json('Not found');        
    }
    catch (e)
    {
        console.log(e);

        return res.status(500).json('Server Error');
    }
}