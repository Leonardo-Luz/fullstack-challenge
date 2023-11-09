import '../styles/table.css';
import '../styles/form.css';

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import { employeeProps } from "../types/employee";

const EmployeeUpdate = () =>
{
    const {id} = useParams();
    
    const navigate = useNavigate();

    const [ loading , setLoading ] = useState(false);

    const defaultEmployee =  {
        employeeid: 0,
        cellnum: '',
        email: '',
        employeetypeid: 0,
        name: '',
        situation: false,
        createdAt: null,
        updatedAt: null,
    } as employeeProps
    
    const [employee , setEmployee] = useState(defaultEmployee);

    const getEmployeebyId = async () =>
    {
        await fetch(`http://10.0.0.239:3001/employee/${id}`)
        .then((res) => res.json()
            .then((data) =>
            {                
                setEmployee(data);
                setLoading(true);
            })
        )
    }
    
    // eslint-disable-next-line
    useEffect(() => { getEmployeebyId() }, []); //fix
    
    const handleForm = (e: React.FormEvent<HTMLInputElement>) =>
    {
        const newEmployee = {...employee};

        //form input target
        const parameter = e.currentTarget.id as 
            'employeeid' | 
            'name' | 
            'cellnum' | 
            'email' | 
            'employeetypeid' | 
            'situation';

        //parse form values
        if(parameter === 'employeeid' || parameter === 'employeetypeid') //integer
            newEmployee[parameter] = parseInt(e.currentTarget.value); 
        else if(parameter === 'name' || parameter ==='email' || parameter === 'cellnum') //string
            newEmployee[parameter] = e.currentTarget.value;
        else if(parameter === 'situation') //boolean
            newEmployee[parameter] = e.currentTarget.checked;
        
        setEmployee(newEmployee);
    }

    const updateEmployee = async ( e: React.MouseEvent ) =>
    {
        e.preventDefault();

        await fetch(`http://10.0.0.239:3001/employee/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)            
        })

        navigate('/employee');
    }

    return (
        <div>
            {
                loading /* wait fetch employee data */ && <form id="form">

                    <h3>Employee  Update</h3>

                    <hr/>

                    <label><p>ID:</p><input required min={0}  placeholder="0" className="field" type="number" id="employeeid" value={employee.employeeid}/></label>
                    <label><p>Name:</p><input required placeholder="John Doe" className="field" type="text" onChange={(e)=>handleForm(e)} id="name" defaultValue={employee.name}/></label>
                    <label><p>Number:</p><input placeholder="(55) 51 99999-9999" className="field" type="text" onChange={(e)=>handleForm(e)} id="cellnum" defaultValue={employee.cellnum?.toString()}/></label>
                    <label><p>Email:</p><input placeholder="exemple@exemple.com" className="field" type="text" onChange={(e)=>handleForm(e)} id="email" defaultValue={employee.email?.toString()}/></label>
                    <label><p>Type ID:</p><input required min={0} placeholder="0 - admin" className="field" type="number" value={employee.employeetypeid}/></label>
                    <label><p>Situação:</p><input className="check" type="checkbox" onChange={(e)=>handleForm(e)} id="situation" checked={employee.situation}/></label>

                    <label><p>Last Update:</p><input placeholder="admin..." className="field" type="text" value={employee.updatedAt?.toString()}/></label>
                    <label><p>Created At:</p><input placeholder="admin..." className="field" type="text" value={employee.createdAt?.toString()}/></label>

                    <hr/>

                    <div className="buttons">
                        <button onClick={ (e) => updateEmployee(e) }>Update</button>
                        <button onClick={ () => navigate('/employee') }>Cancel</button>
                    </div>
                    
                </form>
            }
        </div>
    )
}

export default EmployeeUpdate;