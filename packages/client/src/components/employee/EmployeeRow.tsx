import { employeeProps } from "../../types/employee";
import '../../styles/table.css';
import { useNavigate } from "react-router-dom";

import delete_ico from '../../images/delete.png';
import edit_ico from '../../images/edit.png'

type EmployeeRowProps = {
    employees: employeeProps[] | null;
    filtered?: number | string;
};

const EmployeeRow = ( { employees , filtered }: EmployeeRowProps) =>
{
    const employees_ = employees;

    const navigate = useNavigate();

    let notfound = false;

    const FilterCheck = () =>
    {
        if(employees_)
        for(let i = 0; i < employees_.length; i++)
        {
            if(employees_[i].employeeid.toString() === filtered || employees_[i].name === filtered || employees_[i].email === filtered )            
                return true;
        }

        return false;
    }

    const deleteEmployee = async (id :number) =>
    {
        if(window.confirm(`Are you sure you want to delete the employee with id ${id}`))
        {
            await fetch(`http://10.0.0.239:3001/employee/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            navigate(0);
        }
    }    

    return(
        <table>
            <thead>
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
            <tbody>
            {
                (employees_?.length === 0 && <tr><td className="desc">No data</td></tr>) || 
                (employees_ && employees_.map((data) => { //with filter ?
                    const row = 
                    <tr>
                        <td className="id" onClick={(e)=> {navigator.clipboard.writeText(data.employeeid.toString()); console.log('data copied')}}>{data.employeeid}</td>
                        <td className="desc" onClick={(e)=> {navigator.clipboard.writeText(data.name); console.log('data copied')}}>{data.name}</td>
                        <td className="cell" onClick={(e)=> {navigator.clipboard.writeText(data.cellnum as string); console.log('data copied')}}>{data.cellnum}</td>
                        <td className="mail" onClick={(e)=> {navigator.clipboard.writeText(data.email as string); console.log('data copied')}}>{data.email}</td>
                        <td className="id" onClick={(e)=> {navigator.clipboard.writeText(data.employeetypeid.toString()); console.log('data copied')}}>{data.employeetypeid}</td>
                        <td className="sit" onClick={(e)=> {navigator.clipboard.writeText(data.situation.toString()); console.log('data copied')}}>{(data.situation === true && "Ativo")||(data.situation === false && "Desligado")}</td>
                        <td className="del" onClick={(e)=> {navigate(`/employeeupdate/${data.employeeid}`)}}><img className="ico" src={edit_ico} alt="Edit Icon" ></img></td>
                    <td className="del" onClick={(e)=> {deleteEmployee(data.employeetypeid)}}><img className="ico" src={delete_ico} alt="Delete Icon" ></img></td>
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
                    else return null; 
                }))
            }
            </tbody>
        </table>
    )
}

export default EmployeeRow;