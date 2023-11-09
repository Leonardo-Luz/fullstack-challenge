import './employeeTypeStyle.css';

import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import EmployeeTypeSearch from "../components/database/DatabaseSearch";
import EmployeeTypeRow from "../components/employeetype/EmployeeTypeRow";

import { employeeTypeProps } from "../types/employeetype";

const Employeetype = () =>
{
    const { id } = useParams();

    const [ employeeTypes , setEmployeeTypes ] = useState<employeeTypeProps[] | null>(null);

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
        <div>
            <h1 className="form-hr">Employee Type List</h1>

            <div className="screen">
                <EmployeeTypeSearch database="/employeetype/"/>
                {
                    (employeeTypes && id && <EmployeeTypeRow employeeTypes={employeeTypes} filtered={id}/>) ||
                    (employeeTypes && <EmployeeTypeRow employeeTypes={employeeTypes} />)
                }
            </div>
        </div>
    )
}

export default Employeetype;