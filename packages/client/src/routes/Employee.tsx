import { useEffect, useState } from "react";
import { employeeProps } from "../types/employee";
import EmployeeSearch from "../components/database/DatabaseSearch";
import EmployeeRow from "../components/employee/EmployeeRow";
import './employeeStyle.css';

import { useParams } from 'react-router-dom';

const Employee = () =>
{
    // const [ employee , setEmployee ] = useState<employeeProps | null>(null);

    const [ employees , setEmployees ] = useState<employeeProps[] | null>(null);

    const { id } = useParams();

    // const getEmployeeById = async ( id: number ): Promise<void> =>
    // {
    //     await fetch(`http://localhost:3001/employee/${id}`)
    //     .then( ( res ) => 
    //     {
    //         res.json()
    //         .then((data) => {
    //             setEmployee(data);
    //         })
    //     })
    // }    

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
        <div className="screen">
            <EmployeeSearch database="/employee/"/>
            {
                (employees && id && <EmployeeRow employees={employees} filteredId={parseInt(id)}/>) ||
                (employees && <EmployeeRow employees={employees} />)
            }
        </div>
    )
}

export default Employee;