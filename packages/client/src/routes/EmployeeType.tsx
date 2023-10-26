import { useEffect, useState } from "react";
import { employeeTypeProps } from "../types/employeetype";
import EmployeeTypeSearch from "../components/employeetype/EmployeeTypeSearch";
import EmployeeTypeRow from "../components/employeetype/EmployeeTypeRow";

const Employeetype = () =>
{
    const [ employeetype , setEmployeetype ] = useState<employeeTypeProps | null>(null);

    const [ employeeTypes , setEmployeeTypes ] = useState<employeeTypeProps[] | null>(null);


    const getEmployeeTypeById = async ( id: number ): Promise<void> =>
    {
        await fetch(`http://localhost:3001/employeetype/${id}`)
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
        await fetch(`http://localhost:3001/employeetype`)
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
            <EmployeeTypeSearch getEmployeeTypeById={getEmployeeTypeById}/>
            {employeeTypes && <EmployeeTypeRow employeeTypes={employeeTypes} />}
            {employeetype && <p>{employeetype.description}</p>}
        </div>
    )
}

export default Employeetype;