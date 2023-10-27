import { employeeProps } from "../../types/employee";
import './table.css';

type EmployeeRowProps = {
    employees: employeeProps[] | null;
    filteredId?: number;
};

const EmployeeRow = ( { employees , filteredId }: EmployeeRowProps) =>
{
    const employees_ = employees;

    let notfound = false;

    const FilterCheck = () =>
    {
        if(employees_)
        for(let i = 0; i < employees_.length; i++)
        {
            if(employees_[i].employeeid === filteredId)            
                return true;
        }

        return false;
    }

    return(
        <table>
            <thead><tr><td className="id">id</td><td className="desc">Name</td><td className="sit">situation</td></tr></thead>
            <tbody>
            {
                (employees_ && employees_.map((data) => {
                    if(filteredId === undefined)
                        return <tr><td className="id">{data.employeeid}</td><td className="desc">{data.name}</td><td className="sit">{(data.situation && "Ativo")||(!data.situation && "Desligado")}</td></tr>
                    else if(!FilterCheck() && !notfound)
                    {
                        notfound = true;
                        return <tr><td className="id"></td><td className="desc">not found</td><td className="sit"></td></tr>
                    }
                    else if(filteredId === data.employeeid)
                        return <tr><td className="id">{data.employeeid}</td><td className="desc">{data.name}</td><td className="sit">{(data.situation && "Ativo")||(!data.situation && "Desligado")}</td></tr>
                    else return null; 
                }))
            }
            </tbody>
        </table>
    )
}

export default EmployeeRow;