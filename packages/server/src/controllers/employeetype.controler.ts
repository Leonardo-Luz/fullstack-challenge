import { Request , Response, json } from "express"
import { employeeTypeRequestBody } from "../types/employeetype";

import db from "../database/config";

export const getEmployeeTypes = async ( req: Request, res: Response ): Promise<Response> =>
{
    try
    {
        const response = await db.Pool?.query('SELECT * FROM employeetype');
        
        return res.status(200).json(response?.rows);
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

        const response = await db.Pool?.query(`SELECT * FROM employeetype WHERE employeetypeid = ${id}`);
        
        return res.status(200).json(response?.rows);
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

    const response  = db.Pool?.query
    (
        'INSERT INTO employeetype (employeetypeid, description, situation) VALUES ($1, $2, $3)',
        [employeetypeid , description , situation]
    );

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

        await db.Pool?.query(`DELETE FROM employeetype WHERE employeetypeid = ${id}`);
        
        return res.status(200).json(`User ${id} successfully deleted`);
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

        await db.Pool?.query
        (
            'UPDATE employeetype SET description = $1, situation = $2 WHERE employeetypeid = $3',
            [description , situation , id]
        );
        
        return res.status(200).json(`Employee Type ${id} successfully updated`);
    }
    catch (e)
    {
        console.log(e);

        return res.status(500).json('Server Error');
    }
}