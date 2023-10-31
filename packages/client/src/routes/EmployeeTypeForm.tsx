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

    const [showError , setShowError] = useState<boolean>(false);

    const [errorLog, setErrorlog] = useState({
        employeetypeid: 'employeetypeid is required',
        description: 'description is required',
        situation: ''
    })    

    const handleForm = (e: React.FormEvent<HTMLInputElement>) =>
    {
        const newEmployeeType = {...employeetype};
        const newErrorLog = {...errorLog};

        const parameter = e.currentTarget.id as 'employeetypeid' | 'description' | 'situation';

        //check if id is taken
        if((e.currentTarget.value === null || e.currentTarget.value === undefined || e.currentTarget.value === ''))
        {
            newErrorLog[parameter] = `${parameter} is required`
            setErrorlog(newErrorLog);
        }
        else
        {            
            newErrorLog[parameter] = ''
            setErrorlog(newErrorLog);
        }

        if(parameter === 'employeetypeid')
            newEmployeeType[parameter] = parseInt(e.currentTarget.value);
        else if(parameter === 'description')
            newEmployeeType[parameter] = e.currentTarget.value;
        else if(parameter === 'situation')
            newEmployeeType[parameter] = e.currentTarget.checked;


        setEmployeeType(newEmployeeType);
    }

    const validation = (e: React.MouseEvent) =>
    {
        if(
            errorLog.description !== '' || 
            errorLog.employeetypeid !== '' ||
            errorLog.situation !== ''
        )
        {
            e.preventDefault();
            
            setShowError(true);

            return;
        }
        e.preventDefault();

        createEmployeeType();
    }    

    const createEmployeeType = async () =>
    {
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
                <label><p>ID:</p><input className="field" placeholder="0" type="number" onChange={(e)=>handleForm(e)} id="employeetypeid" defaultValue={employeetype.employeetypeid || undefined}/></label>
                {(errorLog.employeetypeid !== '' && showError ) && <label><p>{errorLog.employeetypeid}</p></label>}
                <label><p>Descrição:</p><input placeholder="admin..." className="field" type="text" onChange={(e)=>handleForm(e)} id="description" defaultValue={employeetype.description}/></label>
                {(errorLog.description !== '' && showError ) && <label><p>{errorLog.description}</p></label>}
                <label><p>Situação:</p><input defaultChecked className="check" type="checkbox" onChange={(e)=>handleForm(e)} id="situation" defaultValue={employeetype.situation.toString()}/></label>

                <hr/>

                <div className="buttons"><button type="submit" onClick={(e) => validation(e)}>Submit</button><button onClick={ () => navigate('/employeetype')}>Cancel</button></div>
            </form>
        </div>
    )
}

export default EmployeeTypeForm;