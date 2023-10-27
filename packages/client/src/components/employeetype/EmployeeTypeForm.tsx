import { ChangeEvent, useState } from "react";
import { employeeTypeProps } from "../../types/employeetype";
import './table.css';

import { useNavigate } from 'react-router-dom';

type EmployeeTypeRowProps = {
};

const EmployeeTypeForm = ( { }: EmployeeTypeRowProps) =>
{
    const navigate = useNavigate();

    const [employeetype , setEmployeeType] = useState({
        employeetypeid: 0,
        description: '',
        situation: true
    });

    const handleForm = (e: React.FormEvent<HTMLInputElement>) =>
    {
        const newEmployeeType = {...employeetype};
        const parameter = e.currentTarget.id as 'employeetypeid' | 'description' | 'situation';
        console.log(parameter);

        if(parameter == 'employeetypeid')
            newEmployeeType[parameter] = parseInt(e.currentTarget.value);
        else if(parameter == 'description')
            newEmployeeType[parameter] = e.currentTarget.value;
        else if(parameter == 'situation')
            newEmployeeType[parameter] = e.currentTarget.checked;


        setEmployeeType(newEmployeeType);
    }

    const createEmployeeType = async (e: React.MouseEvent) =>
    {
        e.preventDefault();

        const result = await fetch('http://10.0.0.239:3001/employeetype', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeetype)
        })

        const resultJson = await result.json();

        navigate('/');
    }

    return(
        <div>
            <form>
                <input type="number" onChange={(e)=>handleForm(e)} id="employeetypeid" value={employeetype.employeetypeid}/>
                <input type="text" onChange={(e)=>handleForm(e)} id="description" value={employeetype.description}/>
                <input type="checkbox" onChange={(e)=>handleForm(e)} id="situation" value={employeetype.situation.toString()}/>
            
                <button onClick={(e) => createEmployeeType(e)}>Submit</button>
            </form>
        </div>
    )
}

export default EmployeeTypeForm;