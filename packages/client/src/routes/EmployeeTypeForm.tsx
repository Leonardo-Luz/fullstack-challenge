import { useState } from "react";
import '../styles/table.css';
import '../styles/form.css';

import { useNavigate } from 'react-router-dom';

const EmployeeTypeForm = () =>
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

        if(parameter === 'employeetypeid')
            newEmployeeType[parameter] = parseInt(e.currentTarget.value);
        else if(parameter === 'description')
            newEmployeeType[parameter] = e.currentTarget.value;
        else if(parameter === 'situation')
            newEmployeeType[parameter] = e.currentTarget.checked;


        setEmployeeType(newEmployeeType);
    }

    const createEmployeeType = async (e: React.MouseEvent) =>
    {
        e.preventDefault();

        await fetch('http://10.0.0.239:3001/employeetype', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeetype)            
        })

        navigate('/employeetype');
    }

    return(
        <div>
            <form id="form">

                <h3>Employee Type Registration</h3>

                <hr/>
                <label><p>ID:</p><input className="field" placeholder="0" type="number" onChange={(e)=>handleForm(e)} id="employeetypeid" value={employeetype.employeetypeid || undefined}/></label>
                <label><p>Descrição:</p><input placeholder="admin..." className="field" type="text" onChange={(e)=>handleForm(e)} id="description" value={employeetype.description}/></label>
                <label><p>Situação:</p><input defaultChecked className="check" type="checkbox" onChange={(e)=>handleForm(e)} id="situation" value={employeetype.situation.toString()}/></label>

                <hr/>

                <button onClick={(e) => createEmployeeType(e)}>Submit</button>
            </form>
        </div>
    )
}

export default EmployeeTypeForm;