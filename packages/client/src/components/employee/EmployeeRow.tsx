import '../../styles/table.css';

import { useNavigate } from "react-router-dom";
import { useState , useEffect } from 'react'

import { employeeProps } from "../../types/employee";

import delete_ico from '../../images/delete.png';
import edit_ico from '../../images/edit.png'

type EmployeeRowProps = {
    employees: employeeProps[] | null;
    filtered?: number | string;
};

const EmployeeRow = ( { employees , filtered }: EmployeeRowProps) =>
{
    const navigate = useNavigate();
    
    const employees_ = employees;

    let notfound = false;

    const FilterCheck = () =>
    {
        if(employees_)
        for(let i = 0; i < employees_.length; i++)
        {
            if
            (
                employees_[i].employeeid.toString() === filtered || 
                employees_[i].name === filtered || employees_[i].email === filtered 
            )            
                return true;
        }

        return false;
    }

    const deleteEmployee = async (id :number) =>
    {
        if
        (
            window.confirm
            (`Are you sure you want to delete the employee with id ${id}`)
        )
        {
            await fetch(`http://localhost:3001/employee/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            navigate(0);
        }
    }

    const [tableWidith , setTableWidth] = useState<number | undefined>(undefined);

    const handle = async () => 
    {
        const res = document.getElementById('employeeTable')?.scrollWidth as number;
        setTableWidth(res);
    }

    useEffect(() => {
        handle();        
    })
    
    window.onresize = () => handle();
    
    return(
        <table id="employeeTable">
            {
                tableWidith !== undefined &&
                <thead style={{width: tableWidith-2}}>
                    <tr>
                        <td className="id">id</td> 
                        <td className="desc">name</td>
                        <td className="cell">cellnum</td>
                        <td className="mail">email</td>
                        <td className="id">type id</td>
                        <td className="sit">situation</td>
                        <td className="sit">update</td>
                        <td className="sit">delete</td>
                    </tr>
                </thead>
            }
            {
                tableWidith !== undefined &&
                <tbody style={{width: tableWidith-2}}>
                    {
                        (employees_?.length === 0 && <tr><td className="desc">No data</td></tr>) ||
                        (employees_ && employees_.map( (data) => { //use filter
                            
                            const row = 
                            <tr>
                                <td className="id" title={data.employeeid.toString()} onClick={()=> {navigator.clipboard.writeText(data.employeeid.toString()); console.log('data copied')}}>{data.employeeid}</td>
                                <td className="desc" title={data.name} onClick={()=> {navigator.clipboard.writeText(data.name); console.log('data copied')}}>{data.name}</td>
                                <td className="cell" title={data.cellnum?.toString()} onClick={()=> {navigator.clipboard.writeText(data.cellnum as string); console.log('data copied')}}>{data.cellnum}</td>
                                <td className="mail" title={data.email?.toString()} onClick={()=> {navigator.clipboard.writeText(data.email as string); console.log('data copied')}}>{data.email}</td>
                                <td className="id" title={data.employeetypeid.toString()} onClick={()=> {navigator.clipboard.writeText(data.employeetypeid.toString()); console.log('data copied')}}>{data.employeetypeid}</td>
                                <td className="sit" title={((data.situation === true && "Ativo")||(data.situation === false && "Desligado")) as string} onClick={()=> {navigator.clipboard.writeText(data.situation.toString()); console.log('data copied')}}>{(data.situation === true && "Ativo")||(data.situation === false && "Desligado")}</td>
                                <td className="del" title='Update' onClick={()=> {navigate(`/employeeupdate/${data.employeeid}`)}}><img className="ico" src={edit_ico} alt="Edit Icon" ></img></td>
                            <td className="del" title="Delete" onClick={()=> {deleteEmployee(data.employeeid)}}><img className="ico" src={delete_ico} alt="Delete Icon" ></img></td>
                            </tr>                    

                            if(filtered === undefined)
                                return row
                            else if(!FilterCheck() && !notfound)
                            {
                                notfound = true;
                                return <tr><td className="desc">not found</td></tr>
                            }
                            else if(filtered === data.employeeid.toString())
                                return row
                            else if(filtered === data.name)
                                return row
                            else if(filtered === data.email)
                                return row                    
                            else 
                                return null; 
                        }))
                    }
                </tbody>
            }
    </table> 
    )
}

export default EmployeeRow;