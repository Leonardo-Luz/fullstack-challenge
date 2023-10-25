import { Request , Response } from "express"
import { employeeTypeRequestBody } from "../types/employeetype";
import { employeetypeModel } from "../models/employeetype";
 
export const getEmployeeTypes = async ( req: Request, res: Response ): Promise<Response> =>
{
    try
    {
        const response = await employeetypeModel.findAll();
        
        return res.status(200).json(response);
    }
    catch (e)
    {
        console.log(e);

        return res.status(500).json('Server Error');
    }
}

export const getEmployeeTypeById  = async ( req: Request, res: Response ): Promise<Response> =>
{
    
    try
    {
        const id = parseInt(req.params.id);

        const response = await employeetypeModel.findByPk(id);
        
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

export const createEmployeeType  = async ( req: Request<{}, any, employeeTypeRequestBody> , res: Response ): Promise<Response> =>
{
    const { employeetypeid , description , situation } = req.body;

    await employeetypeModel.create({
        employeetypeid: employeetypeid,
        description: description,
        situation: situation,
    });

    return res.status(200).json({
        message: 'Employee Type successfully created',
        body: { 
            employeetype: { 
                employeetypeid,
                description,
                situation 
            }
        }
    });
}

export const deleteEmployeeType  = async ( req: Request, res: Response ): Promise<Response> =>
{
    
    try
    {
        const id = parseInt(req.params.id);

        const response = await employeetypeModel.findByPk(id);

        if(response != null)
        {
            response.destroy();
            
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

export const updateEmployeeType  = async ( req: Request<{ id:string }, any, employeeTypeRequestBody> , res: Response ): Promise<Response> =>
{
    try
    {
        const id = parseInt(req.params.id);

        const { description , situation } = req.body;

        const response = await employeetypeModel.findByPk(id);

        if(response != null)
        {
            response.description = description;
            response.situation = situation;

            await response.save();
            
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