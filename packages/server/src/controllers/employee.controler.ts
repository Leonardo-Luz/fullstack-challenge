import { Request , Response, json } from "express"
import { employeeRequestBody } from "../types/employee";

import db from "../config";

export const getEmployees = async ( req: Request, res: Response ): Promise<Response> =>
{
    try
    {
        const response = await db.Pool?.query('SELECT * FROM employee');
        
        return res.status(200).json(response?.rows);
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

        const response = await db.Pool?.query(`SELECT * FROM employee WHERE employeeid = ${id}`);
        
        return res.status(200).json(response?.rows);
    }
    catch (e)
    {
        console.log(e);

        return res.status(500).json('Server Error'); 
    }
}

export const createEmployee  = async ( req: Request<{}, any, employeeRequestBody> , res: Response ): Promise<Response> =>
{ 
    const { employeeid , name , cellnum , email , employeetypeid, situation } = req.body; 

    db.Pool?.query
    (
        'INSERT INTO employee (employeeid, name , cellnum , email ,  employeetypeid, situation) VALUES ( $1, $2, $3, $4, $5, $6 )', 
        [employeeid , name , cellnum , email , employeetypeid , situation]
    );

    return res.status(200).json({
        message: 'Employee successfully created', 
        body: { 
            employee: { 
                employeeid,
                name,
                employeetypeid,
                situation
            }
        }
    });
}

export const deleteEmployee  = async ( req: Request, res: Response ): Promise<Response> =>
{
    
    try
    {
        const id = parseInt(req.params.id);

        await db.Pool?.query(`DELETE FROM employee WHERE employeeid = ${id}`);
        
        return res.status(200).json(`User ${id} successfully deleted`);
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

        const { name , employeetypeid , situation } = req.body;

        await db.Pool?.query
        (
            'UPDATE employee SET name = $1, employeetypeid = $2 situation = $3 WHERE employeeid = $4',
            [name , employeetypeid , situation , id]
        );
        
        return res.status(200).json(`Employee ${id} successfully updated`);
    }
    catch (e)
    {
        console.log(e);

        return res.status(500).json('Server Error');
    }
}