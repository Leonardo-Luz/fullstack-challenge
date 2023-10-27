import { useEffect, useState } from "react";
import { employeeTypeProps } from "../types/employeetype";
import EmployeeTypeSearch from "../components/database/DatabaseSearch";
import EmployeeTypeRow from "../components/employeetype/EmployeeTypeRow";
import './employeeTypeStyle.css';

import { useParams } from 'react-router-dom';

const Employeetype = () =>
{
    const [ employeetype , setEmployeetype ] = useState<employeeTypeProps | null>(null);

    const [ employeeTypes , setEmployeeTypes ] = useState<employeeTypeProps[] | null>(null);

    const { id } = useParams();

    const getEmployeeTypeById = async ( id: number ): Promise<void> =>
    {
        await fetch(`http://10.0.0.239:3001/employeetype/${id}`)
        .then( ( res ) => 
        {
            res.json()
            .then((data) => {
                setEmployeetype(data);
            })
        })
    }    

    const getEmployeeTypes = async (): Promise<void> =>
    {
        await fetch(`http://10.0.0.239:3001/employeetype`)
        .then( ( res ) => 
        {
            res.json()
            .then((data) => {
                setEmployeeTypes(data);
            })
        })
    }    

    useEffect( () => { getEmployeeTypes() }, []);

    return(
        <div className="screen">
            <EmployeeTypeSearch database="/employeetype/"/>
            {
                (employeeTypes && id && <EmployeeTypeRow employeeTypes={employeeTypes} filteredId={parseInt(id)}/>) ||
                (employeeTypes && <EmployeeTypeRow employeeTypes={employeeTypes} />)
            }
        </div>
    )
}

export default Employeetype;