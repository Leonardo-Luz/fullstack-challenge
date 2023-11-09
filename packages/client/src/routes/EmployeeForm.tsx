import '../styles/table.css';
import '../styles/form.css';

import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { employeeTypeProps } from "../types/employeetype";

const EmployeeForm = () =>
{
    let id: number | undefined = NaN;
    
    const navigate = useNavigate();

    const [employee , setEmployee] = useState({
        employeeid: 0,
        name: '',
        cellnum: '',
        email: '',
        employeetypeid: 0,
        situation: true
    });

    const [showError , setShowError] = useState<boolean>(false);

    const [errorLog, setErrorlog] = useState({
        employeeid: 'employeeid is required',
        name: 'name is required',
        cellnum: '',
        email: '',
        employeetypeid: 'employeetypeid is required',
        situation: ''
    })

    const [employeetype, setEmployeeType] = useState<employeeTypeProps>();

    const [ loading, setLoading ] = useState(false);

    const getEmployeeTypebyId = async () =>
    {
        await fetch(`http://10.0.0.239:3001/employeetype/${id}`)
        .then((res) => res.json()
            .then((data: employeeTypeProps) => {
                    
                setEmployeeType(data);
                
                setLoading(true);
        })
        )
    }

    const handleForm = (e: React.FormEvent<HTMLInputElement>) =>
    {
        const newEmployee = {...employee};
        const newErrorLog = {...errorLog};

        const parameter = e.currentTarget.id as 
            'employeeid' | 
            'name' | 
            'cellnum' | 
            'email' | 
            'employeetypeid' | 
            'situation';

        if((e.currentTarget.value === null || e.currentTarget.value === undefined || e.currentTarget.value === '') && ( parameter !== "email" && parameter !== 'cellnum'))
        {
            newErrorLog[parameter] = `${parameter} is required`
            setErrorlog(newErrorLog);
        }
        else
        {            
            newErrorLog[parameter] = ''
            setErrorlog(newErrorLog);
        }

        if(parameter === 'employeeid')
            newEmployee[parameter] = parseInt(e.currentTarget.value);
        else if(parameter === 'employeetypeid')
        {
            id = parseInt(e.currentTarget.value)
            getEmployeeTypebyId();
            newEmployee[parameter] = parseInt(e.currentTarget.value);
        }
        else if(parameter === 'name' || parameter ==='email' || parameter === 'cellnum')
            newEmployee[parameter] = e.currentTarget.value;
        else if(parameter === 'situation')
            newEmployee[parameter] = e.currentTarget.checked;
        
        setEmployee(newEmployee);
    }

    const validation = (e: React.MouseEvent) =>
    {
        e.preventDefault();

        if
        (
            errorLog.name !== '' || 
            errorLog.cellnum !== '' ||
            errorLog.email !== '' ||
            errorLog.employeeid !== '' ||
            errorLog.employeetypeid !== '' ||
            errorLog.situation !== ''
        )
        {
            setShowError(true);

            return;
        }

        createEmployee();
    }

    const createEmployee = async () =>
    {
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
                <label><p>ID:</p><input required min={0}  placeholder="0" className="field" type="number" onChange={(e)=>handleForm(e)} id="employeeid" defaultValue={employee.employeeid || undefined}/></label>
                {
                    (errorLog.employeeid !== '' && showError ) && 
                    <label><p>{errorLog.employeeid}</p></label>
                }

                <label><p>Name:</p><input required placeholder="John Doe" className="field" type="text" onChange={(e)=>handleForm(e)} id="name" defaultValue={employee.name}/></label>
                {
                    (errorLog.name !== '' && showError) && 
                    <label><p>{errorLog.name}</p></label>
                }

                <label><p>Number:</p><input placeholder="(55) 51 99999-9999" className="field" type="text" onChange={(e)=>handleForm(e)} id="cellnum" defaultValue={employee.cellnum}/></label>
                <label><p>Email:</p><input placeholder="exemple@exemple.com" className="field" type="text" onChange={(e)=>handleForm(e)} id="email" defaultValue={employee.email}/></label>
                
                <label><p>Type ID:</p><input required min={0} placeholder="0 - admin" className="field" type="number" onChange={(e)=>handleForm(e)} id="employeetypeid" defaultValue={employee.employeetypeid || undefined}/></label>
                {
                    ((errorLog.employeetypeid !== '' && showError )&& <label><p>{errorLog.employeetypeid}</p></label>) ||
                    ((errorLog.employeetypeid === '' && loading === true && employeetype && employeetype.description === undefined) && <label><p>Not Found</p></label>) ||
                    ((errorLog.employeetypeid === '' && loading === true && employeetype) && <label><p>{employeetype.employeetypeid + ' - ' + employeetype.description}</p></label>)
                }

                <label><p>Situation:</p><input defaultChecked className="check" type="checkbox" onChange={(e)=>handleForm(e)} id="situation" defaultValue={employee.situation.toString()}/></label>

                <hr/>
            
                <div className="buttons">
                    <button onClick={ (e) => validation(e) } type="submit" >Submit</button>
                    <button onClick={ () => navigate('/employee') }>Cancel</button>
                </div>

            </form>
        </div>
    )
}

export default EmployeeForm;