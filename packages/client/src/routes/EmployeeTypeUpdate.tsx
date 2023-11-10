import '../styles/table.css';
import '../styles/form.css';

import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import { employeeTypeProps } from "../types/employeetype";

const EmployeeTypeUpdate = ( ) =>
{
    const {id} = useParams();
    
    const navigate = useNavigate();

    const [ loading , setLoading] = useState(false);

    const defaultEmployeeType =  {
        employeetypeid: 0,
        description: '',
        situation: false,
        createdAt: null,
        updatedAt: null,
    } as employeeTypeProps
    
    const [showLog , setShowLog] = useState<boolean>(false);

    //form validation errors
    const [errorLog, setErrorlog] = useState({
        description: '',
        situation: ''
    })    

    const [employeetype , setEmployeeType] = useState(defaultEmployeeType);

    const getEmployeeTypebyId = async (): Promise<void> =>
    {
        await fetch(`http://localhost:3001/employeetype/${id}`)
        .then((res) => { res.json()
            .then((data: employeeTypeProps) =>
            {
                setEmployeeType(data);
                setLoading(true);
            })
        })
    }

    // eslint-disable-next-line
    useEffect(() => { getEmployeeTypebyId() }, [] ); //fix
    
    const handleForm = (e: React.FormEvent<HTMLInputElement>) =>
    {
        const newEmployeeType = {...employeetype};
        const newErrorLog = {...errorLog};

        //form input target
        const parameter = e.currentTarget.id as 
            'description' | 
            'situation';

        //parse form values
        if(parameter === 'description') //string
            newEmployeeType[parameter] = e.currentTarget.value; 
        else if(parameter === 'situation') //boolean
            newEmployeeType[parameter] = e.currentTarget.checked;

        if
        (
            e.currentTarget.value === null || 
            e.currentTarget.value === undefined || 
            e.currentTarget.value === ''
        ) //check if value is null
        {
            newErrorLog[parameter] = `${parameter} is required`
            setErrorlog(newErrorLog);
        }
        else //no invalid value
        {       
            newErrorLog[parameter] = ''
            setErrorlog(newErrorLog);
        }

        setEmployeeType(newEmployeeType);
    }

    const validation = (e: React.MouseEvent) =>
    {
        e.preventDefault();

        if
        (
            errorLog.description !== '' || 
            errorLog.situation !== ''
        ) //check for form errors
        {
            setShowLog(true);

            return;
        }

        updateEmployeeType();
    }   

    const updateEmployeeType = async ( ) =>
    {
        await fetch(`http://localhost:3001/employeetype/${id}`, {
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
            {
                loading /* wait fetch employee data */ && <form id="form">

                    <h3>Employee Type Update</h3>

                    <hr/>

                    <label><p>ID:</p><input className="field" placeholder="0" type="number" id='id' value={employeetype.employeetypeid}/></label>
                    <label><p>Descrição:</p><input placeholder="admin..." className="field" type="text" onChange={(e)=>handleForm(e)} id="description" defaultValue={employeetype.description}/></label>
                    { // Description invalid value log
                    ( errorLog.description !== '' && showLog ) && 
                    <label><p>{ errorLog.description }</p></label>
                    }

                    <label><p>Situação:</p><input className="check" type="checkbox" onChange={(e)=>handleForm(e)} id="situation" checked={employeetype.situation}/></label>

                    <label><p>Last Update:</p><input placeholder="admin..." className="field" type="text" id='createdat' value={employeetype.updatedAt?.toString()}/></label>
                    <label><p>Created At:</p><input placeholder="admin..." className="field" type="text" id='updatedat' value={employeetype.createdAt?.toString()}/></label>

                    <hr/>

                    <div className="buttons">
                        <button onClick={ (e) => validation(e) }>Update</button>
                        <button onClick={ () => navigate('/employeetype') }>Cancel</button>
                    </div>

                </form>
            }
        </div>
    )
}

export default EmployeeTypeUpdate;