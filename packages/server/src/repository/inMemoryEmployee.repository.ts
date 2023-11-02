import { employeeRequestBody } from "../types/employee";

//Not in usage

let itens = [] as employeeRequestBody[];

export const inMemGetEmployees = async ( ) =>
{
    try
    {
        const response = itens;
        
    }
    catch (e)
    {
        console.log(e);
    }
}

export const inMemGetEmployeeById  = async ( id:number ) =>
{
    
    try
    {
        const response = itens.find( (data) => {
            data.employeeid == id
        });
    }
    catch (e)
    {
        console.log(e);
    }
}

export const inMemCreateEmployee  = async (data: employeeRequestBody) =>
{
    try
    {
        const employee = {
            ...data
        } as employeeRequestBody

        itens.push(employee);
    } 
    catch (e)
    {
        console.log(e);
    }
}

export const inMemDeleteEmployee = async ( id:number ) =>
{
    try
    {
        const response = itens.find((data) => {
            data.employeeid == id;
        });
        
        if(response != undefined)
        {
            itens.splice(itens.indexOf(response), 1);
        }
        else
            console.log("Not found");
    }
    catch (e)
    {
        console.log(e);
    }
}

export const inMemUpdateEmployee  = async ( data: employeeRequestBody , id: number ) =>
{
    try
    {
        const employee = itens.find( (data) => {
            data.employeeid == id
        });
        
        if(employee != undefined)
        {
            itens[itens.indexOf(employee)] = data;
        }
        else
            console.log('not found');
    }
    catch (e)
    {
        console.log(e);
    }
}