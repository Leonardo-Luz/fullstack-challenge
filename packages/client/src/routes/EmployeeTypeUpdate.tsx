import React, { useEffect, useState } from "react";
import '../styles/table.css';
import '../styles/form.css';
import { employeeTypeProps } from "../types/employeetype";

import { useNavigate, useParams } from 'react-router-dom';

const EmployeeTypeUpdate = ( ) =>
{
    const navigate = useNavigate();

    const {id} = useParams();

    const [ loading , setLoading] = useState(false);

    const data_type =  {
        employeetypeid: 0,
        description: '',
        situation: false,
        createdAt: null,
        updatedAt: null,
    } as employeeTypeProps

    const getEmployeeTypebyId = async (): Promise<void> =>
    {
        await fetch(`http://10.0.0.239:3001/employeetype/${id}`)
        .then((res) => { res.json()
            .then((data: employeeTypeProps) =>
            {                
                setEmployeeType(data);
                setLoading(true);
            })
        })
    }

    
    const [employeetype , setEmployeeType] = useState(data_type);

    // eslint-disable-next-line
    useEffect(() => { getEmployeeTypebyId() }, [] ); //fix
    
    
    const handleForm = (e: React.FormEvent<HTMLInputElement>) =>
    {
        const newEmployeeType = {...employeetype};
        const parameter = e.currentTarget.id as 'description' | 'situation';

        if(parameter === 'description')
            newEmployeeType[parameter] = e.currentTarget.value;
        else if(parameter === 'situation')
            newEmployeeType[parameter] = e.currentTarget.checked;


        setEmployeeType(newEmployeeType);
    }


    const updateEmployeeType = async ( e: React.MouseEvent ) =>
    {
        e.preventDefault();

        await fetch(`http://10.0.0.239:3001/employeetype/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeetype)            
        })

        navigate('/employeetype');
    }

    return(
        <div>
            {loading && <form id="form">

                <h3>Employee Type Update</h3>

                <hr/>
                <label><p>ID:</p><input className="field" placeholder="0" type="number" value={employeetype.employeetypeid}/></label>
                <label><p>Descrição:</p><input placeholder="admin..." className="field" type="text" onChange={(e)=>handleForm(e)} id="description" defaultValue={employeetype.description}/></label>
                <label><p>Situação:</p><input className="check" type="checkbox" onChange={(e)=>handleForm(e)} id="situation" checked={employeetype.situation}/></label>

                <label><p>Last Update:</p><input placeholder="admin..." className="field" type="text" value={employeetype.updatedAt?.toString()}/></label>
                <label><p>Created At:</p><input placeholder="admin..." className="field" type="text" value={employeetype.createdAt?.toString()}/></label>

                <hr/>

                <div className="buttons"><button onClick={(e) => updateEmployeeType(e)}>Update</button><button onClick={ () => navigate('/employeetype')}>Cancel</button></div>
            </form>}
        </div>
    )
}

export default EmployeeTypeUpdate;