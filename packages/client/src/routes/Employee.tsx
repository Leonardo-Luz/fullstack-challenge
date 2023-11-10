import './employeeTypeStyle.css';

import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import EmployeeSearch from "../components/database/DatabaseSearch";
import EmployeeRow from "../components/employee/EmployeeRow";

import { employeeProps } from "../types/employee";

const Employee = () =>
{
    const { id } = useParams(); 

    const [ employees , setEmployees ] = useState<employeeProps[] | null>(null);

    const getEmployees = async (): Promise<void> =>
    {
        await fetch(`http://localhost:3001/employee`)
        .then( ( res ) => 
        {
            res.json()
                .then((data) => {
                    setEmployees(data);
                })
        })
    }    

    useEffect( () => { getEmployees() }, []);

    return(
        <div>
            <h1 className="form-hr">Employee List</h1>
            
            <div className="screen">
            <EmployeeSearch database="/employee/"/>
            {
                (employees && id && <EmployeeRow employees={employees} filtered={id}/>) ||
                (employees && <EmployeeRow employees={employees} />)
            }
            </div>
        </div>
    )
}

export default Employee;