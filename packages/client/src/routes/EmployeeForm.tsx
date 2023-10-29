import { useState } from "react";
import '../styles/table.css';
import '../styles/form.css';

import { useNavigate } from 'react-router-dom';

const EmployeeForm = () =>
{
    const navigate = useNavigate();

    const [employee , setEmployee] = useState({
        employeeid: 0,
        name: '',
        cellnum: '',
        email: '',
        employeetypeid: 0,
        situation: true
    });

    const handleForm = (e: React.FormEvent<HTMLInputElement>) =>
    {
        const newEmployee = {...employee};
        const parameter = e.currentTarget.id as 'employeeid' | 'name' | 'cellnum' | 'email' | 'employeetypeid' | 'situation';
        console.log(parameter);

        if(parameter === 'employeeid' || parameter === 'employeetypeid')
            newEmployee[parameter] = parseInt(e.currentTarget.value);
        else if(parameter === 'name' || parameter ==='email' || parameter === 'cellnum')
            newEmployee[parameter] = e.currentTarget.value;
        else if(parameter === 'situation')
        {
            newEmployee[parameter] = e.currentTarget.checked;
        }


        setEmployee(newEmployee);
    }

    const createEmployee = async (e: React.MouseEvent) =>
    {
        e.preventDefault();

        await fetch('http://10.0.0.239:3001/employee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        })

        navigate('/employee');
    }

    return(
        <div>
            <form id="form">
                <h3>Employee Registration</h3>

                <hr/>
                {/* cant input 0 in number type */}
                <label><p>ID:</p><input required min={0}  placeholder="0" className="field" type="number" onChange={(e)=>handleForm(e)} id="employeeid" value={employee.employeeid || undefined}/></label>
                <label><p>Name:</p><input required placeholder="John Doe" className="field" type="text" onChange={(e)=>handleForm(e)} id="name" value={employee.name}/></label>
                <label><p>Number:</p><input placeholder="(55) 51 99999-9999" className="field" type="text" onChange={(e)=>handleForm(e)} id="cellnum" value={employee.cellnum}/></label>
                <label><p>Email:</p><input placeholder="exemple@exemple.com" className="field" type="text" onChange={(e)=>handleForm(e)} id="email" value={employee.email}/></label>
                <label><p>Type ID:</p><input required min={0} placeholder="0 - admin" className="field" type="number" onChange={(e)=>handleForm(e)} id="employeetypeid" value={employee.employeetypeid || undefined}/></label>                
                <label><p>Situation:</p><input defaultChecked className="check" type="checkbox" onChange={(e)=>handleForm(e)} id="situation" value={employee.situation.toString()}/></label>

                <hr/>
            
                <button onClick={(e) => createEmployee(e)}>Submit</button>
            </form>
        </div>
    )
}

export default EmployeeForm;