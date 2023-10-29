import { useEffect, useState } from "react";
import { employeeProps } from "../types/employee";
import EmployeeSearch from "../components/database/DatabaseSearch";
import EmployeeRow from "../components/employee/EmployeeRow";
import './employeeTypeStyle.css';

import { useParams } from 'react-router-dom';

const Employee = () =>
{
    const [ employees , setEmployees ] = useState<employeeProps[] | null>(null);

    const { id } = useParams(); 

    const getEmployees = async (): Promise<void> =>
    {
        await fetch(`http://10.0.0.239:3001/employee`)
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