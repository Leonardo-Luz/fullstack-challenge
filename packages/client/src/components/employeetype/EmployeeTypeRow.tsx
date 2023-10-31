import { employeeTypeProps } from "../../types/employeetype";
import { useNavigate } from 'react-router-dom'
import '../../styles/table.css';
import { useState , useEffect } from 'react'

import delete_ico from '../../images/delete.png';
import edit_ico from '../../images/edit.png'

type EmployeeTypeRowProps = {
    employeeTypes: employeeTypeProps[] | null;
    filtered?: number | string;
};


const EmployeeTypeRow = ( { employeeTypes , filtered }: EmployeeTypeRowProps) =>
{
    const employeeTypes_ = employeeTypes;

    const navigate = useNavigate();

    let notfound = false;

    const FilterCheck = () =>
    {
        if(employeeTypes_)
        for(let i = 0; i < employeeTypes_.length; i++)
        {
            if(employeeTypes_[i].employeetypeid.toString() === filtered || employeeTypes_[i].description === filtered)            
                return true;
        }

        return false;
    }

    const deleteEmployeeType = async (id :number) =>
    {
        if(window.confirm(`Are you sure you want to delete the employeetype with id ${id} and his employees ?`))
        {
            await fetch(`http://10.0.0.239:3001/employeetype/${id}`, {
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
        const res = document.getElementById('employeetypeTable')?.scrollWidth as number;
        setTableWidth(res);
    }

    useEffect(() => {
        handle();
    })

    window.onresize = () =>
    {
        handle();
    }

    return(
        <table id="employeetypeTable">
            {tableWidith !== undefined && 
            <thead style={{width: tableWidith-2}}>
                <tr>
                    <td className="id">id</td><td className="desc">description</td>
                    <td className="sit">situation</td><td className="sit">update</td>
                    <td className="sit">delete</td>
                </tr>
            </thead>}
            {tableWidith !== undefined &&
            <tbody style={{width: tableWidith-2}}>
            {(employeeTypes_?.length === 0 && <tr><td className="desc">No data</td></tr>) ||
             (employeeTypes_ && employeeTypes_.map((data)=>{
                const row =
                <tr>
                    {/* criar td como objeto ts separado */}
                    <td className="id" title={data.employeetypeid.toString()} onClick={(e)=> {navigator.clipboard.writeText(data.employeetypeid.toString()); console.log('data copied')}}>{data.employeetypeid}</td>
                    <td className="desc" title={data.description.toString()} onClick={(e)=> {navigator.clipboard.writeText(data.description); console.log('data copied')}}>{data.description}</td>
                    <td className="sit" title={((data.situation && "Ativo")||(!data.situation && "Desligado")) as string} onClick={(e)=> {navigator.clipboard.writeText(data.situation.toString()); console.log('data copied')}}>{(data.situation && "Ativo")||(!data.situation && "Desligado")}</td>
                    <td className="del" title="Update" onClick={(e)=> {navigate(`/employeetypeupdate/${data.employeetypeid}`)}}><img className="ico" src={edit_ico} alt="Edit Icon" ></img></td>
                    <td className="del" title="Delete" onClick={(e)=> {deleteEmployeeType(data.employeetypeid)}}><img className="ico" src={delete_ico} alt="Delete Icon" ></img></td>
                </tr>
                if(filtered === undefined)
                    return row
                else if(!FilterCheck() && !notfound)
                {
                    notfound = true;
                    return <tr><td className="desc">not found</td></tr>
                }
                else if(filtered === data.employeetypeid.toString())
                    return row
                else if(filtered === data.description)
                    return row
                else return null
            }))}
            </tbody>}
        </table>
    )
}

export default EmployeeTypeRow;