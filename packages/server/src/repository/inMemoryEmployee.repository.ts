import { now } from "sequelize/lib/utils";

import { employeeRequestBody } from "../types/employee";

//in mem crud for test

export type InMemoryEmployeeProps = {
    inMemGetEmployees: () => any;
    inMemGetEmployeeById: (id : number) => any;
    inMemCreateEmployee: (data: employeeRequestBody) => any; 
    inMemDeleteEmployee: (id : number) => any; 
    inMemUpdateEmployee: (data: employeeRequestBody, id: number) => any; 
}

export class InMemoryEmployee {
    itens = [] as employeeRequestBody[];

    inMemGetEmployees = async ( ) =>
    {
        try
        {
            const response = this.itens;

            return response;
        }
        catch (e)
        {
            console.log(e);
        }
    }

    inMemGetEmployeeById  = async ( id:number ) =>
    {
        
        try
        {
            const response = this.itens.find( (data) => {
                data.employeeid == id
            });

            return response;
        }
        catch (e)
        {
            console.log(e);
        }
    }

    inMemCreateEmployee  = async (data: employeeRequestBody) =>
    {
        try
        {
            const employee = {
                ...data
            } as employeeRequestBody

            employee.createdAt = now('postgres');
            employee.updatedAt = now('postgres');
    
            this.itens.push(employee);

            return employee;
        } 
        catch (e)
        {
            console.log(e);
        }
    }

    inMemDeleteEmployee = async ( id:number ) =>
    {
        try
        {
            const response = this.itens.find((data) => {
                data.employeeid == id;
            });
            
            if(response != undefined)
            {
                this.itens.splice(this.itens.indexOf(response), 1);

                return response;
            }
            else
                console.log("Not found");
        }
        catch (e)
        {
            console.log(e);
        }
    }

    inMemUpdateEmployee  = async ( data: employeeRequestBody , id: number ) =>
    {
        try
        {
            const employee = this.itens.find( (data) => {
                data.employeeid == id
            });
            
            if(employee != undefined)
            {
                employee.updatedAt = now('postgres');
                this.itens[this.itens.indexOf(employee)] = data;

                return employee;
            }
            else
                console.log('not found');
        }
        catch (e)
        {
            console.log(e);
        }
    }
}





